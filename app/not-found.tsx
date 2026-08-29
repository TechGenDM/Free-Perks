import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="error-page" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
      <h1>404 — Not Found</h1>
      <p style={{ marginTop: '1rem' }}>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" style={{ display: 'inline-block', marginTop: '1.5rem' }}>
        ← Back to FreePerks
      </Link>
    </div>
  );
}
