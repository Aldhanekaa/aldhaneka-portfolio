'use client';
import Link from 'next/link';
import GoogleUICircle from '../googleUICircle';
import { ProjectT } from '@/lib/supabase/types/index.types';
import { useState } from 'react';

export default function ProjectCard({ project }: { project: ProjectT }) {
  const [viewDesc, setViewDesc] = useState(false);

  return (
    <div className=" col-span-3 bg-brand-150 rounded-3xl">
      <div className="w-full relative rounded-3xl overflow-hidden border-brand-350 border-2">
        {project.thumbnail ? (
          <img className="w-full" src={project.thumbnail}></img>
        ) : (
          <div className="w-full h-32">Loading Thumbnail...</div>
        )}
        <div
          className={`w-full h-full ${
            viewDesc ? 'bg-brand-350' : 'bg-transparent'
          } z-0 px-10 pb-4 duration-500 text-brand-300 rounded-xl absolute bottom-0 flex justify-between flex-col`}
        >
          <div className="h-full pt-10 text-brand-150">
            {viewDesc && <p>{project.desc}</p>}
          </div>
          <div className="flex justify-end">
            <div
              onClick={() => {
                setViewDesc(!viewDesc);
              }}
              className="w-14 flex justify-center items-center relative cursor-pointer group"
            >
              <GoogleUICircle
                className={`${
                  viewDesc ? 'fill-brand-150' : 'fill-brand-350'
                } h-full group-hover:rotate-6 duration-150`}
              />
              <div
                className={`${
                  viewDesc
                    ? 'rotate-45 text-brand-350'
                    : 'rotate-0 text-brand-150'
                } text-2xl absolute top-0 bottom-0 right-0 left-0 flex justify-center items-center duration-300`}
              >
                <span className="material-symbols-outlined">add</span>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full MADEMellow font-normal grid grid-cols-7 px-5 py-5">
        <span
          // className={`col-span-6 text-brand-350 flex items-center ${
          //   textClassName ? textClassName : 'text-2xl lg:text-4xl'
          // }`}
          className={`col-span-6 text-brand-350 flex items-center text-2xl lg:text-4xl`}
        >
          {project.title}
        </span>
        <div className="col-span-1 flex justify-end">
          <div
            // onClick={() => {
            //   setClickedInfo(!clickedInfo);
            // }}
            className="w-full md:h-full flex justify-center items-center relative cursor-pointer group"
          >
            <Link href={`/project/${project.id}`}>
              <div
                className={`absolute top-0 bottom-0 right-0 left-0 text-brand-300 text-3xl flex justify-center items-center duration-300`}
              >
                <span className="material-symbols-outlined">arrow_outward</span>{' '}
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
