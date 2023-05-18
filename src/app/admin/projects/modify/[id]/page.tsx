import ProjectEditorWrapper from '@/components/dashboard/projects/editorWrapper';
import { supabase } from '@/lib/supabase/client';

export default async function ModifyProject({
  params,
}: {
  params: {
    id: string;
  };
}) {
  let { data: project, error } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id);

  let { data: project_tags, error: projectTagsError } = await supabase
    .from('project_tags')
    .select('*');

  let { data: project_categories, error: projectCategoriesError } =
    await supabase.from('project_categories').select('*');

  return (
    <ProjectEditorWrapper
      projectProps={project && project[0]}
      categoriesProps={project_categories}
      tagsProps={project_tags}
    />
  );
}
export const revalidate = 1; // revalidate this segment every 60 seconds
