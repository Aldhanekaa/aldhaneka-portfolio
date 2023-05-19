import JournalWrapper from '@/components/pages/journals/journalWrapper';
import { supabase } from '@/lib/supabase/client';

export default async function JournalPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  let { data: journal, error } = await supabase
    .from('journal_posts')
    .select('*')
    .eq('id', params.id);

  console.log(journal);

  if (journal != null && journal[0] != undefined)
    return <JournalWrapper journal={journal[0]} />;

  return <div>not found</div>;
}
export const revalidate = 5; // revalidate this segment every 60 seconds
