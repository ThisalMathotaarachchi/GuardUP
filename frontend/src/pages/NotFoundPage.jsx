import { Link } from 'react-router-dom';
import { ShieldOff } from 'lucide-react';
import PageShell from '../components/common/PageShell';

export default function NotFoundPage() {
  return (
    <PageShell variant="default" className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6 text-center">
        <div className="mx-auto flex size-16 items-center justify-center rounded-full glass-card">
          <ShieldOff className="size-8 text-accent-purple" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold page-heading">Page not found</h1>
          <p className="page-subheading">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <Link to="/" className="btn-primary inline-flex">
          Back to home
        </Link>
      </div>
    </PageShell>
  );
}
