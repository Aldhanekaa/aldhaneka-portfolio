import { months } from '@/components/journals/card';
import { ProjectT } from '@/lib/supabase/types/index.types';
import { useState } from 'react';
import ProjectMediaManager from './projectMediaManager';
import Link from 'next/link';

export default function ProjectPageWrapper({ project }: { project: ProjectT }) {
  const completedAtDate = new Date(project.completed_at);

  return (
    <div className="w-full">
      <div
        className="w-full container_px border-2 border-brand-350"
        style={{
          background: '#FFF9ED',
          borderBottomRightRadius: '70px',
          borderBottomLeftRadius: '70px',
        }}
      >
        <div className="w-full grid grid-cols-9 pt-64 pb-28">
          <ProjectMediaManager
            //  @ts-ignore
            medias={project.medias}
          />

          <div className="col-span-5 flex flex-col justify-center">
            <Link href={'/projects/'} className="mb-4 underline">
              /projects/
            </Link>
            <p>
              {completedAtDate.getDay()} {months[completedAtDate.getMonth()]}{' '}
              {completedAtDate.getFullYear()}
            </p>
            <h1 className="MADEMellow text-8xl text-brand-350">
              {project.title}
            </h1>
            <p className="MADEMellow mt-5 font-light text-3xl  text-brand-300">
              {project.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
