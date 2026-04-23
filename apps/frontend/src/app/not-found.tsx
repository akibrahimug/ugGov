import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="uggov-content-layout">
      <div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Page not found</h1>
        <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
          If you typed the web address, check it is correct.
        </p>
        <p style={{ fontSize: '1.125rem', marginBottom: '1.5rem' }}>
          If you pasted the web address, check you copied the whole address.
        </p>
        <p>
          <Link href="/" className="uggov-link">
            Go back to the GOV.UG home page
          </Link>
        </p>
      </div>
    </div>
  );
}
