import JournalEditorWrapper from '@/components/dashboard/journals/editorWrapper';
import { supabase } from '@/lib/supabase/client';

export default async function NewJournalPage() {
  let { data: journal_tags, error: projectTagsError } = await supabase
    .from('journal_tags')
    .select('*');

  let { data: journal_categories, error: projectCategoriesError } =
    await supabase.from('journal_categories').select('*');

  return (
    <JournalEditorWrapper
      tagsProps={journal_tags}
      categoriesProps={journal_categories}
    />
  );
}
export const revalidate = 1; // revalidate this segment every 60 seconds
