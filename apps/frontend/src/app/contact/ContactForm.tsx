'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import {
  Button,
  FormGroup,
  Input,
  Select,
  Textarea,
} from '@ug-gov/frontend-components';
import { validateAll, type FieldRule } from '@/lib/validation';
import { ErrorSummary, type ErrorSummaryEntry } from '@/components/ErrorSummary';

export interface ContactOrgOption {
  id: string;
  title: string;
}

const RULES: FieldRule[] = [
  { name: 'name', label: 'Full name', kind: 'text', required: true, minLength: 2 },
  { name: 'email', label: 'Email address', kind: 'email', required: true },
  { name: 'phone', label: 'Phone number', kind: 'tel' },
  { name: 'topic', label: 'Topic', kind: 'select', required: true },
  { name: 'organisation', label: 'Related organisation', kind: 'select' },
  { name: 'message', label: 'Message', kind: 'textarea', required: true, minLength: 10 },
];

export function ContactForm({ orgs }: { orgs: ContactOrgOption[] }) {
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const summaryRef = useRef<HTMLDivElement>(null);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: Record<string, string> = {};
    new FormData(e.currentTarget).forEach((v, k) => {
      if (typeof v === 'string') data[k] = v;
    });
    const found = validateAll(RULES, data);
    setErrors(found);
    if (Object.keys(found).length > 0) {
      requestAnimationFrame(() => {
        summaryRef.current?.focus();
        summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return;
    }
    const rand = Math.floor(Math.random() * 1_000_000).toString().padStart(6, '0');
    setReference(`GOVUG-${new Date().getFullYear()}-${rand}`);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="uggov-form-success">
        <h2 className="uggov-form-success__title">Thank you</h2>
        <p className="uggov-form-success__lede">
          Your message has been sent. A response will typically arrive within 5 working days.
        </p>
        <div className="uggov-form-success__reference">
          <div className="uggov-form-success__reference-label">Reference</div>
          <div className="uggov-form-success__reference-value">{reference}</div>
        </div>
        <div className="uggov-flex-row">
          <Link href="/" className="uggov-button uggov-button--primary uggov-button--base">
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  const entries: ErrorSummaryEntry[] = RULES.filter((r) => errors[r.name]).map((r) => ({
    field: r.name,
    label: r.label,
    message: errors[r.name] as string,
  }));

  return (
    <form onSubmit={onSubmit} noValidate>
      <ErrorSummary ref={summaryRef} entries={entries} />

      <fieldset className="uggov-fieldset">
        <span className="uggov-fieldset__step">Step 1 of 2</span>
        <legend className="uggov-fieldset__legend">Your details</legend>
        <div className="uggov-fieldset__body">
          <FormGroup label="Full name" error={errors.name}>
            <Input id="field-name" name="name" type="text" width="lg" />
          </FormGroup>
          <FormGroup
            label="Email address"
            hint="We will reply to this address"
            error={errors.email}
          >
            <Input id="field-email" name="email" type="email" width="lg" />
          </FormGroup>
          <FormGroup
            label="Phone number"
            hint="+256 701 234 567 or 0701 234 567"
            optional
            error={errors.phone}
          >
            <Input id="field-phone" name="phone" type="tel" width="md" />
          </FormGroup>
        </div>
      </fieldset>

      <fieldset className="uggov-fieldset">
        <span className="uggov-fieldset__step">Step 2 of 2</span>
        <legend className="uggov-fieldset__legend">What is your enquiry about?</legend>
        <div className="uggov-fieldset__body">
          <FormGroup label="Topic" error={errors.topic}>
            <Select id="field-topic" name="topic" defaultValue="">
              <option value="">Please select</option>
              <option value="service">A specific service</option>
              <option value="organisation">A specific ministry or agency</option>
              <option value="site">GOV.UG website feedback</option>
              <option value="press">Press / media enquiry</option>
              <option value="other">Something else</option>
            </Select>
          </FormGroup>
          <FormGroup
            label="Related organisation"
            hint="Leave blank if unsure"
            optional
            error={errors.organisation}
          >
            <Select id="field-organisation" name="organisation" defaultValue="">
              <option value="">— None —</option>
              {orgs.map((o) => (
                <option key={o.id} value={o.id}>
                  {o.title}
                </option>
              ))}
            </Select>
          </FormGroup>
          <FormGroup label="Your message" error={errors.message}>
            <Textarea id="field-message" name="message" rows={6} />
          </FormGroup>
        </div>
      </fieldset>

      <div className="uggov-form-actions">
        <Button type="submit" variant="primary" size="lg">
          Send message
        </Button>
      </div>
    </form>
  );
}
