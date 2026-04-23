'use client';

import { useState } from 'react';
import clsx from 'clsx';
import { FormGroup, Input } from '@ug-gov/frontend-components';
import type { PaymentConfig } from './applyConfig';

export type PaymentMethod = 'mtn_momo' | 'airtel_money' | 'card' | 'prn';

export const PAYMENT_METHODS: Array<{
  id: PaymentMethod;
  title: string;
  blurb: string;
}> = [
  {
    id: 'mtn_momo',
    title: 'MTN Mobile Money',
    blurb: 'Pay from your MTN line — a prompt to confirm will be sent to your phone.',
  },
  {
    id: 'airtel_money',
    title: 'Airtel Money',
    blurb: 'Pay from your Airtel line — a prompt to confirm will be sent to your phone.',
  },
  {
    id: 'card',
    title: 'Visa or Mastercard',
    blurb: 'Debit or credit card — secure processing via the national payment gateway.',
  },
  {
    id: 'prn',
    title: 'Bank deposit (URA PRN)',
    blurb: 'Get a Payment Registration Number to pay at any commercial bank or agent within 7 days.',
  },
];

export function PaymentStep({
  config,
  errors,
  hidden,
  stepNum,
  stepTotal,
}: {
  config: PaymentConfig;
  errors: Record<string, string>;
  hidden?: boolean;
  stepNum: number;
  stepTotal: number;
}) {
  const [method, setMethod] = useState<PaymentMethod | ''>('');

  return (
    <fieldset className="uggov-fieldset uggov-payment" hidden={hidden}>
      <span className="uggov-fieldset__step">
        Step {stepNum} of {stepTotal}
      </span>
      <legend className="uggov-fieldset__legend" tabIndex={-1}>
        Payment
      </legend>
      <p className="uggov-fieldset__hint">
        Review the charges and choose how you want to pay.
      </p>

      {/* Cost summary */}
      <div className="uggov-payment__summary">
        <div className="uggov-payment__summary-head">
          <div className="uggov-payment__summary-label">Amount to pay</div>
          <div className="uggov-payment__summary-amount">{config.amount}</div>
        </div>
        {config.breakdown && config.breakdown.length > 0 && (
          <dl className="uggov-payment__breakdown">
            {config.breakdown.map((row) => (
              <div key={row.label} className="uggov-payment__breakdown-row">
                <dt>{row.label}</dt>
                <dd>{row.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      {/* Method selector */}
      <div className="uggov-payment__methods" role="radiogroup" aria-labelledby="pm-label">
        <span id="pm-label" className="uggov-payment__section-label">
          Payment method
        </span>
        {PAYMENT_METHODS.map((m) => (
          <label
            key={m.id}
            className={clsx('uggov-payment__method', method === m.id && 'is-selected')}
          >
            <input
              type="radio"
              name="paymentMethod"
              value={m.id}
              checked={method === m.id}
              onChange={() => setMethod(m.id)}
            />
            <span className="uggov-payment__method-body">
              <span className="uggov-payment__method-title">{m.title}</span>
              <span className="uggov-payment__method-blurb">{m.blurb}</span>
            </span>
          </label>
        ))}
        {errors.paymentMethod && (
          <div
            id="field-paymentMethod"
            className="uggov-form-group__error"
            style={{ marginTop: '8px' }}
          >
            <span className="uggov-visually-hidden">Error: </span>
            {errors.paymentMethod}
          </div>
        )}
      </div>

      {/* Method-specific fields */}
      {(method === 'mtn_momo' || method === 'airtel_money') && (
        <div className="uggov-payment__detail">
          <FormGroup
            label="Mobile money number"
            hint="+256 701 234 567 or 0701 234 567"
            error={errors.paymentPhone}
          >
            <Input
              id="field-paymentPhone"
              name="paymentPhone"
              type="tel"
              inputMode="tel"
              width="md"
            />
          </FormGroup>
        </div>
      )}

      {method === 'card' && (
        <div className="uggov-payment__detail">
          <FormGroup label="Card number" error={errors.cardNumber}>
            <Input
              id="field-cardNumber"
              name="cardNumber"
              type="text"
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="0000 0000 0000 0000"
              width="lg"
            />
          </FormGroup>
          <div className="uggov-form-row">
            <FormGroup label="Expiry (MM/YY)" error={errors.cardExpiry}>
              <Input
                id="field-cardExpiry"
                name="cardExpiry"
                type="text"
                inputMode="numeric"
                autoComplete="cc-exp"
                placeholder="MM/YY"
                width="sm"
              />
            </FormGroup>
            <FormGroup label="CVV" hint="3 or 4 digits on the back of the card" error={errors.cardCvv}>
              <Input
                id="field-cardCvv"
                name="cardCvv"
                type="text"
                inputMode="numeric"
                autoComplete="cc-csc"
                placeholder="123"
                width="sm"
              />
            </FormGroup>
          </div>
          <FormGroup label="Cardholder name" error={errors.cardName}>
            <Input
              id="field-cardName"
              name="cardName"
              type="text"
              autoComplete="cc-name"
              width="lg"
            />
          </FormGroup>
        </div>
      )}

      {method === 'prn' && (
        <div className="uggov-payment__note">
          <strong>How bank deposit works</strong>
          <p>
            When you submit, a Uganda Revenue Authority <strong>Payment Registration Number (PRN)</strong>{' '}
            will be generated. Show or quote this PRN at any commercial bank, mobile money agent
            registered with URA, or the URA portal to complete payment. Your application will move
            forward once payment clears — usually within 1 working day.
          </p>
        </div>
      )}
    </fieldset>
  );
}

const CARD_NUMBER_RE = /^\d{13,19}$/;
const CARD_EXPIRY_RE = /^(0[1-9]|1[0-2])\/\d{2}$/;
const CARD_CVV_RE = /^\d{3,4}$/;
const UG_PHONE_NORMALISED = /^(?:\+?256\d{9}|0\d{9})$/;

export function validatePaymentStep(data: Record<string, string>): Record<string, string> {
  const errs: Record<string, string> = {};
  const method = data.paymentMethod as PaymentMethod | undefined;

  if (!method) {
    errs.paymentMethod = 'Choose a payment method';
    return errs;
  }

  if (method === 'mtn_momo' || method === 'airtel_money') {
    const phone = (data.paymentPhone ?? '').replace(/[\s-]/g, '');
    if (!phone) {
      errs.paymentPhone = 'Enter your mobile money number';
    } else if (!UG_PHONE_NORMALISED.test(phone)) {
      errs.paymentPhone = 'Enter a valid Ugandan phone number — e.g. +256 701 234 567 or 0701 234 567';
    }
    return errs;
  }

  if (method === 'card') {
    const number = (data.cardNumber ?? '').replace(/[\s-]/g, '');
    if (!CARD_NUMBER_RE.test(number)) {
      errs.cardNumber = 'Enter a valid card number — 13 to 19 digits';
    }
    if (!CARD_EXPIRY_RE.test(data.cardExpiry ?? '')) {
      errs.cardExpiry = 'Enter expiry as MM/YY';
    } else {
      const [mm, yy] = (data.cardExpiry ?? '').split('/');
      const now = new Date();
      const expMonth = Number.parseInt(mm!, 10);
      const expYear = 2000 + Number.parseInt(yy!, 10);
      const expiry = new Date(expYear, expMonth, 0, 23, 59, 59);
      if (expiry < now) errs.cardExpiry = 'Card has expired';
    }
    if (!CARD_CVV_RE.test(data.cardCvv ?? '')) {
      errs.cardCvv = 'Enter the 3 or 4-digit CVV';
    }
    if (!data.cardName || data.cardName.trim().length < 2) {
      errs.cardName = 'Enter the cardholder name';
    }
    return errs;
  }

  // prn: no extra fields
  return errs;
}

export function paymentFieldNames(): string[] {
  return [
    'paymentMethod',
    'paymentPhone',
    'cardNumber',
    'cardExpiry',
    'cardCvv',
    'cardName',
  ];
}

export function paymentFieldLabel(name: string): string {
  const map: Record<string, string> = {
    paymentMethod: 'Payment method',
    paymentPhone: 'Mobile money number',
    cardNumber: 'Card number',
    cardExpiry: 'Card expiry',
    cardCvv: 'Card CVV',
    cardName: 'Cardholder name',
  };
  return map[name] ?? name;
}
