'use client';

import Link from 'next/link';
import { Button } from '@ug-gov/frontend-components';

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="uggov-content-layout">
      <div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Sorry, there is a problem</h1>
        <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
          Try refreshing the page or come back in a few minutes.
        </p>
        <div className="uggov-flex-row">
          <Button onClick={() => reset()}>Try again</Button>
          <Link href="/" className="uggov-link">
            Return to home
          </Link>
        </div>
      </div>
    </div>
  );
}
