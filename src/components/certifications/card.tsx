'use client';
import { CertificatesT } from '@/lib/supabase/types/index.types';
import GoogleUICircle from '../googleUICircle';
import { useEffect, useState } from 'react';

export default function CertificationCard({
  title,
  img_src,
  desc,
  textClassName,
}: CertificatesT & {
  textClassName?: string;
}) {
  const [clickedInfo, setClickedInfo] = useState<boolean>(false);

  return (
    <div className="col-span-3 bg-brand-150 rounded-3xl">
      <div className="w-full relative rounded-xl overflow-hidden border-brand-350 border-2">
        <img className="w-full" src={img_src}></img>
        <div
          className={`${
            clickedInfo ? 'opacity-100 z-10' : 'opacity-0 -z-10'
          } px-10 py-10 duration-500 text-brand-300 bg-brand-150 border-2 rounded-xl absolute top-0 w-full h-full`}
        >
          <p className=" break-words">{desc}</p>
        </div>
      </div>
      <div className="w-full MADEMellow font-normal grid grid-cols-7 px-5 py-5">
        <span
          className={`col-span-6 text-brand-350 flex items-center ${
            textClassName ? textClassName : 'text-2xl lg:text-4xl'
          }`}
        >
          {title}
        </span>
        <div className="col-span-1 flex justify-end">
          <div
            onClick={() => {
              setClickedInfo(!clickedInfo);
            }}
            className="w-full md:h-full flex justify-center items-center relative cursor-pointer group"
          >
            <GoogleUICircle className="fill-brand-350 h-full group-hover:rotate-6 duration-150" />
            <div
              className={`absolute top-0 bottom-0 right-0 left-0 text-brand-150 flex justify-center items-center duration-300 ${
                clickedInfo ? 'rotate-45' : 'rotate-0'
              }`}
            >
              <span className="material-symbols-outlined">add</span>{' '}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
