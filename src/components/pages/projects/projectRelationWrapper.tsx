import { ProjectRelationT } from '@/lib/supabase/types/index.types';
import RelationTagsRenderer from './relationTagsRenderer';
// import { useEffect } from 'react';

export default function ProjectRelationWrapper({
  relation,
}: {
  relation: ProjectRelationT;
}) {
  console.log('relation222', relation);
  //   useEffect(() => {}, []);

  return (
    <>
      <div className="w-full">
        {relation.tags.map((tag) => (
          // @ts-ignore
          <RelationTagsRenderer
            tag={tag}
            category={relation.category}
            isRelationCategory={relation.category ? true : false}
          />
        ))}
      </div>
    </>
  );
}
