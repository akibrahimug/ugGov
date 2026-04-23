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

const RULES: FieldRule[] = [
  { name: 'type', label: 'Type of problem', kind: 'select', required: true },
  { name: 'pageUrl', label: 'Page URL', kind: 'url' },
  { name: 'description', label: 'Description', kind: 'textarea', required: true, minLength: 10 },
  { name: 'email', label: 'Email address', kind: 'email' },
];

export function FeedbackForm() {
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
    setReference(`GOVUG-FB-${new Date().getFullYear()}-${rand}`);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (submitted) {
    return (
      <div className="uggov-form-success">
        <h2 className="uggov-form-success__title">Thanks for your feedback</h2>
        <p className="uggov-form-success__lede">
          Your report has been logged. The GOV.UG team reviews every submission weekly.
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
        <legend className="uggov-fieldset__legend">What happened?</legend>
        <div className="uggov-fieldset__body">
          <FormGroup label="Type of problem" error={errors.type}>
            <Select id="field-type" name="type" defaultValue="">
              <option value="">Please select</option>
              <option value="content">Incorrect or out-of-date information</option>
              <option value="broken">A link or feature is broken</option>
              <option value="accessibility">Accessibility issue</option>
              <option value="security">Security concern</option>
              <option value="other">Something else</option>
            </Select>
          </FormGroup>
          <FormGroup
            label="Page URL"
            hint="If the issue relates to a specific page, paste its web address"
            optional
            error={errors.pageUrl}
          >
            <Input
              id="field-pageUrl"
              name="pageUrl"
              type="url"
              placeholder="https://www.gov.ug/..."
              width="lg"
            />
          </FormGroup>
          <FormGroup
            label="Describe the issue"
            hint="Include what you were trying to do and what went wrong"
            error={errors.description}
          >
            <Textarea id="field-description" name="description" rows={6} />
          </FormGroup>
        </div>
      </fieldset>

      <fieldset className="uggov-fieldset">
        <span className="uggov-fieldset__step">Step 2 of 2</span>
        <legend className="uggov-fieldset__legend">How can we reach you?</legend>
        <p className="uggov-fieldset__hint">Only used to follow up on your report.</p>
        <div className="uggov-fieldset__body">
          <FormGroup label="Email address" optional error={errors.email}>
            <Input id="field-email" name="email" type="email" width="lg" />
          </FormGroup>
        </div>
      </fieldset>

      <div className="uggov-form-actions">
        <Button type="submit" variant="primary" size="lg">
          Report problem
        </Button>
      </div>
    </form>
  );
}
