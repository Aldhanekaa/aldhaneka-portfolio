import JournalsPage from '@/components/dashboard/journals';
import JournalsCTAs from '@/components/dashboard/journals/CTAs';
import { supabase } from '@/lib/supabase/client';
import Link from 'next/link';

export default async function JournalsDashboard() {
  let { data: journal_posts, error } = await supabase
    .from('journal_posts')
    .select('*');

  return (
    <div className="h-screen relative">
      <h2 className="text-4xl MADEMellow font-light text-brand-350 ">
        Journals
        <Link href="/admin/journals/new">
          <div className="text-xl underline">Share Your Thoughts.</div>
        </Link>
      </h2>

      <JournalsCTAs />

      <JournalsPage journalsProps={journal_posts} />
    </div>
  );
}
