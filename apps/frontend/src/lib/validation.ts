/** Lightweight field-level validators for the mocked forms. */

export type FieldKind =
  | 'text'
  | 'email'
  | 'tel'
  | 'url'
  | 'date'
  | 'select'
  | 'textarea'
  | 'nin';

export interface FieldRule {
  name: string;
  label: string;
  kind: FieldKind;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  /** Custom error when the base rules pass but a domain check fails. */
  validator?: (value: string) => string | undefined;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const URL_RE = /^https?:\/\/[^\s]+$/i;
/** Demo-friendly NIN rule: letters and digits only, up to 12 characters. */
const NIN_RE = /^[A-Za-z0-9]{1,12}$/;

/**
 * Ugandan mobile phone. Accepts:
 *   +256 7XX XXX XXX   (international, with or without spaces/dashes)
 *   256 7XX XXX XXX    (international, no plus)
 *   0 7XX XXX XXX      (local, with or without spaces/dashes)
 *   07XXXXXXXX         (local, no separators — 10 digits)
 *
 * Normalises by stripping whitespace and dashes first.
 */
function isUgandanMobile(raw: string): boolean {
  const n = raw.replace(/[\s-]/g, '');
  return /^\+?256\d{9}$/.test(n) || /^0\d{9}$/.test(n);
}

export function validateField(rule: FieldRule, raw: unknown): string | undefined {
  const value = typeof raw === 'string' ? raw.trim() : '';

  if (rule.required && value === '') {
    return `Enter your ${rule.label.toLowerCase()}`;
  }
  if (value === '') return undefined; // optional field, nothing to validate

  if (rule.minLength && value.length < rule.minLength) {
    return `${rule.label} must be at least ${rule.minLength} characters`;
  }
  if (rule.maxLength && value.length > rule.maxLength) {
    return `${rule.label} must be ${rule.maxLength} characters or fewer`;
  }

  switch (rule.kind) {
    case 'email':
      if (!EMAIL_RE.test(value)) return 'Enter an email address in the correct format';
      break;
    case 'tel':
      if (!isUgandanMobile(value)) {
        return 'Enter a valid Ugandan phone number — e.g. +256 701 234 567 or 0701 234 567';
      }
      break;
    case 'url':
      if (!URL_RE.test(value)) return 'Enter a full web address starting with http:// or https://';
      break;
    case 'nin':
      if (!NIN_RE.test(value)) return 'NIN can only contain letters and numbers, up to 12 characters';
      break;
    case 'date': {
      const d = new Date(value);
      if (Number.isNaN(d.getTime())) return 'Enter a valid date';
      if (rule.name === 'dob' && d > new Date()) return 'Date of birth cannot be in the future';
      break;
    }
  }

  return rule.validator?.(value);
}

export function validateAll(
  rules: FieldRule[],
  data: Record<string, unknown>,
): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const rule of rules) {
    const err = validateField(rule, data[rule.name]);
    if (err) errors[rule.name] = err;
  }
  return errors;
}

export function formDataToObject(form: HTMLFormElement): Record<string, string> {
  const data: Record<string, string> = {};
  const fd = new FormData(form);
  for (const [key, value] of fd.entries()) {
    if (typeof value === 'string') data[key] = value;
  }
  return data;
}
