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
import type { ApplyConfig, FieldConfig, FieldsetConfig } from './applyConfig';
import { validateAll, type FieldRule } from '@/lib/validation';
import { ErrorSummary, type ErrorSummaryEntry } from '@/components/ErrorSummary';
import { StepProgress } from '@/components/StepProgress';
import {
  PaymentStep,
  paymentFieldLabel,
  paymentFieldNames,
  validatePaymentStep,
} from './PaymentStep';

function generateReference(prefix: string) {
  const year = new Date().getFullYear();
  const rand = Math.floor(Math.random() * 1_000_000).toString().padStart(6, '0');
  return `${prefix}-${year}-${rand}`;
}

function generatePRN() {
  const rand = Math.floor(Math.random() * 1_000_000_000_000)
    .toString()
    .padStart(12, '0');
  return rand.replace(/(\d{4})(\d{4})(\d{4})/, '$1 $2 $3');
}

function renderField(field: FieldConfig) {
  const baseProps = { id: `field-${field.name}`, name: field.name };
  if (field.kind === 'textarea') {
    return <Textarea {...baseProps} placeholder={field.placeholder} />;
  }
  if (field.kind === 'select') {
    return (
      <Select {...baseProps} defaultValue="">
        {field.options?.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </Select>
    );
  }
  return (
    <Input
      {...baseProps}
      type={field.kind === 'nin' ? 'text' : field.kind}
      placeholder={field.placeholder}
      width={field.width}
      autoCapitalize={field.kind === 'nin' ? 'characters' : undefined}
    />
  );
}

function groupByRow(fields: FieldConfig[]): Array<{ row?: string; fields: FieldConfig[] }> {
  const groups: Array<{ row?: string; fields: FieldConfig[] }> = [];
  for (const field of fields) {
    const last = groups[groups.length - 1];
    if (field.row && last && last.row === field.row) {
      last.fields.push(field);
    } else {
      groups.push({ row: field.row, fields: [field] });
    }
  }
  return groups;
}

function toRules(fields: FieldConfig[]): FieldRule[] {
  return fields.map((f) => ({
    name: f.name,
    label: f.label,
    kind: f.kind,
    required: f.required,
    validator: f.validator,
  }));
}

function readFormData(form: HTMLFormElement): Record<string, string> {
  const data: Record<string, string> = {};
  new FormData(form).forEach((v, k) => {
    if (typeof v === 'string') data[k] = v;
  });
  return data;
}

export function ApplyForm({ config }: { config: ApplyConfig }) {
  const [step, setStep] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState('');
  const [prn, setPrn] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const formRef = useRef<HTMLFormElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);

  const hasPayment = Boolean(config.payment);
  const paymentIdx = config.fieldsets.length;
  const totalSteps = config.fieldsets.length + (hasPayment ? 1 : 0);
  const isFirst = step === 0;
  const isLast = step === totalSteps - 1;
  const onPaymentStep = hasPayment && step === paymentIdx;
  const stepTitles = [
    ...config.fieldsets.map((f) => f.legend),
    ...(hasPayment ? ['Payment'] : []),
  ];

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const validateCurrent = (): boolean => {
    if (!formRef.current) return true;
    const data = readFormData(formRef.current);
    const errs = onPaymentStep
      ? validatePaymentStep(data)
      : validateAll(toRules(config.fieldsets[step]!.fields), data);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      requestAnimationFrame(() => {
        summaryRef.current?.focus();
        summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return false;
    }
    return true;
  };

  const onNext = () => {
    if (!validateCurrent()) return;
    setStep((s) => s + 1);
    setErrors({});
    requestAnimationFrame(scrollTop);
  };

  const onBack = () => {
    setStep((s) => Math.max(0, s - 1));
    setErrors({});
    requestAnimationFrame(scrollTop);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = readFormData(e.currentTarget);

    const contentErrs = validateAll(
      toRules(config.fieldsets.flatMap((fs) => fs.fields)),
      data,
    );
    const paymentErrs = hasPayment ? validatePaymentStep(data) : {};
    const all = { ...contentErrs, ...paymentErrs };
    setErrors(all);

    if (Object.keys(all).length > 0) {
      let errStep = -1;
      for (let i = 0; i < config.fieldsets.length; i += 1) {
        if (config.fieldsets[i]!.fields.some((f) => all[f.name])) {
          errStep = i;
          break;
        }
      }
      if (errStep < 0 && Object.keys(paymentErrs).length > 0) errStep = paymentIdx;
      if (errStep >= 0 && errStep !== step) setStep(errStep);
      requestAnimationFrame(() => {
        summaryRef.current?.focus();
        summaryRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
      return;
    }

    setPaymentMethod(data.paymentMethod ?? '');
    setProcessing(true);
    const ref = generateReference(config.referencePrefix);
    setReference(ref);
    if (data.paymentMethod === 'prn') setPrn(generatePRN());
    window.setTimeout(() => {
      setProcessing(false);
      setSubmitted(true);
      scrollTop();
    }, 1400);
  };

  if (processing) {
    return (
      <div className="uggov-form-success" aria-live="polite">
        <div className="uggov-processing">
          <div className="uggov-processing__spinner" aria-hidden="true" />
          <h2 className="uggov-form-success__title">Confirming your payment</h2>
          <p className="uggov-form-success__lede">
            Please wait — do not close this tab. This usually takes a few seconds.
          </p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="uggov-form-success">
        <h2 className="uggov-form-success__title">{config.successTitle}</h2>
        <p className="uggov-form-success__lede">{config.successLede}</p>

        <div className="uggov-form-success__reference">
          <div className="uggov-form-success__reference-label">Your reference number</div>
          <div className="uggov-form-success__reference-value">{reference}</div>
        </div>

        {hasPayment && paymentMethod && (
          <div className="uggov-form-success__reference" style={{ marginTop: '-0.75rem' }}>
            <div className="uggov-form-success__reference-label">Payment</div>
            <div style={{ fontSize: '1rem' }}>
              {paymentMethod === 'prn' ? (
                <>
                  <div>
                    Pay <strong>{config.payment!.amount}</strong> using this URA PRN within 7 days:
                  </div>
                  <div
                    className="uggov-form-success__reference-value"
                    style={{ marginTop: '0.25rem' }}
                  >
                    {prn}
                  </div>
                </>
              ) : paymentMethod === 'card' ? (
                <span>{config.payment!.amount} — card payment confirmed</span>
              ) : (
                <span>
                  {config.payment!.amount} — confirm the prompt on your{' '}
                  {paymentMethod === 'mtn_momo' ? 'MTN' : 'Airtel'} phone
                </span>
              )}
            </div>
          </div>
        )}

        <h3 className="uggov-form-success__next-heading">What happens next</h3>
        <ol className="uggov-form-success__next-list">
          {config.nextSteps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
        <div className="uggov-flex-row">
          <Link href="/services" className="uggov-button uggov-button--primary uggov-button--base">
            Back to services
          </Link>
          <Link href="/" className="uggov-button uggov-button--secondary uggov-button--base">
            Home
          </Link>
        </div>
      </div>
    );
  }

  const summaryEntries: ErrorSummaryEntry[] = onPaymentStep
    ? paymentFieldNames()
        .filter((n) => errors[n])
        .map((n) => ({ field: n, label: paymentFieldLabel(n), message: errors[n] as string }))
    : toRules(config.fieldsets[step]!.fields)
        .filter((r) => errors[r.name])
        .map((r) => ({ field: r.name, label: r.label, message: errors[r.name] as string }));

  const submitLabel = onPaymentStep && hasPayment
    ? `Pay ${config.payment!.amount}`
    : config.submitLabel;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate>
      <StepProgress steps={stepTitles} current={step} />

      <ErrorSummary ref={summaryRef} entries={summaryEntries} />

      {config.fieldsets.map((fs, i) => {
        const isVisible = i === step;
        return (
          <fieldset key={fs.legend} className="uggov-fieldset" hidden={!isVisible}>
            <span className="uggov-fieldset__step">
              Step {i + 1} of {totalSteps}
            </span>
            <legend className="uggov-fieldset__legend" tabIndex={-1}>
              {fs.legend}
            </legend>
            {fs.hint && <p className="uggov-fieldset__hint">{fs.hint}</p>}
            <div className="uggov-fieldset__body">
              {groupByRow(fs.fields).map((group, ridx) => {
                if (group.fields.length === 1) {
                  const f = group.fields[0] as FieldConfig;
                  return (
                    <FormGroup
                      key={f.name}
                      label={f.label}
                      hint={f.hint}
                      error={isVisible ? errors[f.name] : undefined}
                      optional={!f.required}
                    >
                      {renderField(f)}
                    </FormGroup>
                  );
                }
                return (
                  <div key={`row-${ridx}`} className="uggov-form-row">
                    {group.fields.map((f) => (
                      <FormGroup
                        key={f.name}
                        label={f.label}
                        hint={f.hint}
                        error={isVisible ? errors[f.name] : undefined}
                        optional={!f.required}
                      >
                        {renderField(f)}
                      </FormGroup>
                    ))}
                  </div>
                );
              })}
            </div>
          </fieldset>
        );
      })}

      {hasPayment && (
        <PaymentStep
          config={config.payment!}
          errors={onPaymentStep ? errors : {}}
          hidden={!onPaymentStep}
          stepNum={paymentIdx + 1}
          stepTotal={totalSteps}
        />
      )}

      <div className="uggov-form-actions">
        {!isFirst && (
          <Button type="button" variant="secondary" size="lg" onClick={onBack}>
            Back
          </Button>
        )}
        {!isLast && (
          <Button type="button" variant="primary" size="lg" onClick={onNext}>
            Continue
            <span className="uggov-button__icon" aria-hidden="true">→</span>
          </Button>
        )}
        {isLast && (
          <Button type="submit" variant="primary" size="lg">
            {submitLabel}
          </Button>
        )}
        <Link
          href={`/services/${config.slug}`}
          className="uggov-button uggov-button--ghost uggov-button--lg"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
