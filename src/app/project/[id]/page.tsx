import ProjectsHero from '@/components/pages/projects/hero';
import ProjectNavbar from '@/components/pages/projects/projectNavbar';
import ProjectPageWrapper from '@/components/pages/projects/projectPageWrapper';
import { supabase } from '@/lib/supabase/client';

export default async function ProjectPage({
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

  //   console.log('project', project);

  if (project == null || project[0] == undefined) {
    return (
      <div className="w-full">
        <ProjectNavbar />

        <ProjectsHero
          title="404 Not Found"
          desc={'The project you are looking for is not valid :('}
        >
          .
        </ProjectsHero>
      </div>
    );
  }
  return (
    <>
      <ProjectNavbar />
      <ProjectPageWrapper project={project[0]} />;
    </>
  );
}

export const revalidate = 5; // revalidate this segment every 60 seconds
