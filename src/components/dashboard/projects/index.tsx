'use client';
import { useSupabase } from '@/app/supabase-provider';
import ProjectCard from '@/components/projects/card';
import { JournalT, ProjectT } from '@/lib/supabase/types/index.types';
import { MediasT } from './editor';
import { useState } from 'react';
import Link from 'next/link';

export default function ProjectsDashboard({
  projectsProps,
}: {
  projectsProps: ProjectT[] | null;
}) {
  const [projects, setProjects] = useState(() => projectsProps);
  const { supabase } = useSupabase();
  const deleteProject = async (projectParam: ProjectT) => {
    let deleteFiles: string[] = [];

    if (projectParam.thumbnail) {
      let thumbnailFileName = projectParam.thumbnail.replace(
        'https://xjxaegaoqextzpdpisoh.supabase.co/storage/v1/object/public/projects/',
        ''
      );
      console.log(thumbnailFileName);
      deleteFiles.push(thumbnailFileName);
    }

    // @ts-ignore
    let medias: MediasT[] = projectParam.medias;
    for (let i = 0; i < medias.length; i++) {
      let media = medias[i];

      if (media.type == 'image') {
        let mediaFileName = media.src.replace(
          'https://xjxaegaoqextzpdpisoh.supabase.co/storage/v1/object/public/projects/',
          ''
        );
        deleteFiles.push(mediaFileName);
      }
    }

    const { error: deleteFilesError } = await supabase.storage
      .from('projects')
      .remove(deleteFiles);

    if (deleteFilesError) {
      alert('deleteThumbnailError!');
      console.log('deleteThumbnailError ', deleteFilesError);
    }

    const { data, error: deleteRowError } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectParam.id);
    if (deleteRowError) {
      alert('deleteRowError!');
      console.log('deleteRowError ', deleteRowError);
    } else {
      if (projects)
        setProjects(
          projects?.filter((project) => project.id != projectParam.id)
        );
    }
  };

  return (
    <div className="w-full grid grid-cols-9 gap-5 mt-24">
      {projects?.map((project) => (
        <div key={project.id} className="col-span-3 grid grid-cols-3">
          <div className="col-span-3 mb-3">
            <Link href={`/admin/projects/modify/${project.id}`}>
              <button className="px-3 py-3 bg-brand-400 text-brand-500">
                Modify
              </button>
            </Link>
            <button
              onClick={() => {
                deleteProject(project);
              }}
              className="px-3 py-3 bg-red-400 text-red-50"
            >
              Delete
            </button>
          </div>
          <ProjectCard project={project} />
        </div>
      ))}
      {projects && projects.length == 0 && <div>No data here :(</div>}
    </div>
  );
}
