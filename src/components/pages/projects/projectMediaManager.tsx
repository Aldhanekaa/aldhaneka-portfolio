'use client';

import { useState } from 'react';

export default function ProjectMediaManager({
  medias,
}: {
  medias: {
    id: string;
    src: string;
    type: string;
    title: string;
  }[];
}) {
  const [mediaActive, setMediaActive] = useState(() => {
    return {
      ...medias[0],
      index: 0,
    };
  });

  return (
    <div className="col-span-4 pr-16">
      {mediaActive.type == 'iframe' ? (
        <iframe
          src={mediaActive.src}
          frameBorder="0"
          width="100%"
          height="550px"
          allowFullScreen
          className=" rounded-3xl"
        ></iframe>
      ) : (
        <img src={mediaActive.src} width={'100%'}></img>
      )}

      <div>
        <p className="mt-3 text-2xl">{mediaActive.title}</p>

        <button
          className="h-full text-2xl mr-3"
          onClick={() => {
            let nextIndex = mediaActive.index - 1;

            if (nextIndex < 0) {
              nextIndex = medias.length - 1;
            }

            setMediaActive({
              ...medias[nextIndex],
              index: nextIndex,
            });
          }}
        >
          <span className="material-symbols-outlined rotate-180">
            trending_flat
          </span>
        </button>
        <button
          className="h-full text-2xl"
          onClick={() => {
            let nextIndex = mediaActive.index + 1;

            if (nextIndex >= medias.length) {
              nextIndex = 0;
            }

            setMediaActive({
              ...medias[nextIndex],
              index: nextIndex,
            });
          }}
        >
          <span className="material-symbols-outlined">trending_flat</span>
        </button>
      </div>
    </div>
  );
}
