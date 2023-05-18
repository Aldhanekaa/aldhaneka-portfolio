import ProjectCard from '@/components/projects/card';
import { supabase } from '@/lib/supabase/client';
import { ProjectT } from '@/lib/supabase/types/index.types';
import Link from 'next/link';

export default async function RelationTagsRenderer({
  tag,
  category,
  isRelationCategory,
}: {
  tag: string;
  category?: string | null;
  isRelationCategory: boolean;
}) {
  console.log(isRelationCategory);
  let projects: ProjectT[] | null;
  if (isRelationCategory) {
    let res = await supabase
      .from('projects')
      .select('*')
      .eq('category', category)
      .contains('tags', [tag]);
    projects = res.data;

    console.log('projects', category, 'tag:', tag, projects);
  } else {
    let res = await supabase
      .from('projects')
      .select('*')
      .contains('tags', [tag]);

    projects = res.data;

    console.log('projects basic', tag);
  }

  if (projects != null) {
    return (
      <div className="container_px py-32">
        <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 gap-10">
          <div className="col-span-3 md:col-span-6 lg:col-span-9 text-4xl">
            {tag.split('.')[1]}{' '}
            {/* <Link href={`/projects/${tag.split('.')[1]}`} className=" text-lg">
              View More
            </Link> */}
          </div>
          {projects.length != 0 ? (
            projects.map((projectParam) => (
              <ProjectCard project={projectParam}></ProjectCard>
            ))
          ) : (
            <div>No Dat Available Me?</div>
          )}
        </div>
      </div>
    );
  } else {
    return <div className="container_px py-32">We Are not able to find it</div>;
  }
}
