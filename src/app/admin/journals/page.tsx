import JournalsCTAs from '@/components/dashboard/journals/CTAs';
import Link from 'next/link';

export default function JournalsDashboard() {
  return (
    <div className="h-screen relative">
      <h2 className="text-4xl MADEMellow font-light text-brand-350 ">
        Journals
        <Link href="/admin/journals/new">
          <div className="text-xl underline">Share Your Thoughts.</div>
        </Link>
      </h2>

      <JournalsCTAs />
    </div>
  );
}
