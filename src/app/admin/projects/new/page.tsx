import ProjectEditor from '@/components/dashboard/projects/editor';
import ProjectEditorWrapper from '@/components/dashboard/projects/editorWrapper';
import { supabase } from '@/lib/supabase/client';

export default async function UploadNewProject() {
  let { data: project_tags, error: projectTagsError } = await supabase
    .from('project_tags')
    .select('*');

  let { data: project_categories, error: projectCategoriesError } =
    await supabase.from('project_categories').select('*');

  return (
    <ProjectEditorWrapper
      categoriesProps={project_categories}
      tagsProps={project_tags}
    />
  );
}
