import Footer from '@/components/pages/footer';
import ProjectsHero from '@/components/pages/projects/hero';
import ProjectRelationWrapper from '@/components/pages/projects/projectRelationWrapper';
import RelationTagsRenderer from '@/components/pages/projects/relationTagsRenderer';
import { supabase } from '@/lib/supabase/client';

export default async function ProjectRelationPage({
  params,
}: {
  params: {
    id: string;
  };
}) {
  let { data: relation, error } = await supabase
    .from('projects_relations')
    .select('*')
    .eq('relation_name', params.id.replace('%20', ' '));

  // console.log('relation', relation);
  if (relation != null && relation[0] != null) {
    return (
      <div className="w-full">
        {relation[0].desc && (
          <ProjectsHero
            title={
              relation[0].category
                ? relation[0].category
                : relation[0].relation_name
            }
            desc={relation[0].desc}
          >
            .
          </ProjectsHero>
        )}

        <ProjectRelationWrapper relation={relation[0]} />
        <Footer />
      </div>
    );
  } else {
    return (
      <div className="w-full">
        <ProjectsHero
          title="404 Not Found"
          desc={'The relation you are looking for is not valid :('}
        >
          .
        </ProjectsHero>
      </div>
    );
  }
}

export const revalidate = 5; // revalidate this segment every 60 seconds
