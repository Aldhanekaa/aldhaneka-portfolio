'use client';

import { useRef, useState } from 'react';
import { MediasT } from './editor';
import Select from 'react-select';
import { OptionI } from './CTAs/relations.types';
import generateRandomStr from '@/lib/generateRandomStr';

const mediaTypes: OptionI[] = [
  { value: 'iframe', name: 'Iframe (YT, DOCS)', type: 'iframe' },
  { value: 'image', name: 'Image (from local)', type: 'image' },
];
const formatOption = (data: OptionI) => (
  <div className="">
    <span>{data.name}</span>
  </div>
);

export type EditorMediasT = MediasT & {
  file: File | undefined;
};

export default function EditorMedia({
  setMediaNotSaved,
  saveMedia,
  saveMediaError,
  mediasProps,
}: {
  saveMedia: (medias: Array<EditorMediasT>) => void;
  setMediaNotSaved: () => void;
  saveMediaError?: string;
  mediasProps?: Array<MediasT>;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [medias, setMedias] = useState<Array<EditorMediasT>>(() => {
    if (mediasProps) {
      return mediasProps.map((media) => {
        return { ...media, file: undefined };
      });
    }
    return [];
  });
  const [selectedMedia, setSelectedMedia] = useState<number>();

  const [imageFile, setImageFile] = useState<{
    src: string;
    name: string;
    file?: File;
  }>({
    src: '',
    name: '',
  });

  const [inputs, setInputs] = useState<{
    title: string;
    src: string;
    type: 'iframe' | 'image';
  }>({
    title: '',
    src: '',
    type: 'iframe',
  });

  const handleFileInputChange = () => {
    if (inputs.type == 'image') {
      const file =
        fileInputRef.current?.files && fileInputRef.current?.files[0];

      if (file) {
        //   console.log(file);
        const objectUrl = URL.createObjectURL(file);

        setImageFile({
          src: objectUrl,
          name: file.name,
          file: file,
        });
      }
    }
  };

  const addNewMedia = () => {
    setMediaNotSaved();
    if (selectedMedia) {
      let newMedias = medias;
      newMedias[selectedMedia].title = inputs.title;
      newMedias[selectedMedia].type = inputs.type;
      newMedias[selectedMedia].src = inputs.src;
      newMedias[selectedMedia].file = imageFile.file;
      setMedias(newMedias);
    } else {
      let newMedias = medias;
      newMedias.push({
        id: generateRandomStr(),
        title: inputs.title,
        src: inputs.type == 'iframe' ? inputs.src : imageFile.src,
        type: inputs.type,
        file: inputs.type == 'iframe' ? undefined : imageFile.file,
      });
      setMedias(newMedias);
      setInputs({
        title: '',
        src: '',
        type: inputs.type,
      });
      setImageFile({
        src: '',
        name: '',
        file: undefined,
      });
    }
  };

  const deleteSelectedMedia = () => {
    setMediaNotSaved();
    if (selectedMedia != undefined) {
      console.log('oyy');
      let newMedias = medias;
      newMedias.splice(selectedMedia);
      setSelectedMedia(undefined);
      setMedias(newMedias);
    }
  };

  const selectMedia = (i: number) => {
    if (selectedMedia == i) {
      setSelectedMedia(undefined);
      setInputs({
        title: '',
        src: '',
        type: inputs.type,
      });
    } else {
      setSelectedMedia(i);
      setInputs({
        type: medias[i].type,
        src: medias[i].src,
        title: medias[i].title,
      });
    }
  };

  const moveMedia = (title: string, inc: number) => {
    if (selectedMedia != undefined) setSelectedMedia(undefined);

    const mediasClone = medias;
    const mediaIndex = mediasClone.findIndex((media) => media.title == title);
    const currentMedia = mediasClone.splice(mediaIndex, 1);
    // console.log(currentMedia, mediasClone, mediasClone.slice(0, mediaIndex));
    setMediaNotSaved();

    setMedias([
      ...medias.slice(0, mediaIndex + inc),
      ...currentMedia,
      ...medias.slice(mediaIndex + inc),
    ]);
  };

  return (
    <div className="col-span-6">
      <div className="w-full grid grid-cols-6 gap-3">
        <div className="col-span-3">
          <label className="mb-3 MADEMellow text-xl font-light" htmlFor="tags">
            Project Medias
          </label>
          <p>PLEASE DO NOT HAVE SAME TITLE</p>
          <div className="w-full flex flex-col">
            {medias.map((media, i) => (
              <div
                key={`${media.title}_${i}`}
                className={`${
                  i == selectedMedia
                    ? 'bg-brand-200 text-brand-50'
                    : 'bg-brand-50'
                } px-4 py-4 grid grid-cols-9`}
              >
                <div className=" col-span-1 flex flex-col ">
                  <div
                    onClick={() => {
                      moveMedia(media.title, -1);
                    }}
                    className=" cursor-pointer"
                  >
                    <span className="material-symbols-outlined">
                      expand_less
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      moveMedia(media.title, +1);
                    }}
                    className=" cursor-pointer"
                  >
                    <span className="material-symbols-outlined">
                      expand_more
                    </span>
                  </div>
                </div>
                <div
                  onClick={() => {
                    selectMedia(i);
                  }}
                  className=" col-span-7 flex flex-col cursor-pointer"
                >
                  <p>{media.title}</p>
                  <p>{media.src}</p>
                </div>
                <div className="col-span-1">
                  <p>{media.type}</p>
                </div>
              </div>
            ))}
          </div>

          {/* <form> */}
          <div className="w-full grid grid-cols-5 bg-brand-50">
            <input
              type="text"
              placeholder="Title"
              className="bg-brand-50 col-span-3  border-2 rounded-md"
              onChange={(e) => {
                setInputs({
                  ...inputs,
                  title: e.target.value,
                });
              }}
              value={inputs.title}
            ></input>
            <Select<OptionI, false>
              options={mediaTypes}
              formatOptionLabel={formatOption}
              name="category"
              id="category"
              defaultValue={mediaTypes[0]}
              className="col-span-2"
              onChange={(e) => {
                console.log(e);
                if (e && e.value)
                  setInputs({
                    ...inputs,
                    // @ts-ignore
                    type: e.value,
                  });
              }}
            />
            {inputs.type == 'iframe' ? (
              <input
                ref={fileInputRef}
                type={`text`}
                value={inputs.src}
                placeholder={'iframe url here'}
                className="bg-brand-50 col-span-5  border-2 rounded-md"
                onChange={(e) => {
                  setInputs({
                    ...inputs,
                    src: e.target.value,
                  });
                }}
              ></input>
            ) : (
              <>
                <input
                  ref={fileInputRef}
                  max={'50mb'}
                  accept=".png, .jpg, .jpeg"
                  type={'file'}
                  className="bg-brand-50 col-span-5  border-2 rounded-md"
                  onInput={handleFileInputChange}
                ></input>
                <p className="col-span-5">{imageFile.name}</p>
              </>
            )}

            {/* <input type="file"></input> */}
            <div
              className="col-span-4 bg-brand-200 text-brand-50"
              onClick={addNewMedia}
            >
              {selectedMedia != undefined ? 'Modify' : 'Add'}
            </div>
            <div
              onClick={deleteSelectedMedia}
              className={`${
                selectedMedia != undefined ? 'opacity-100' : 'opacity-30'
              } col-span-1 bg-brand-300 text-brand-50`}
            >
              Delete
            </div>
            <div
              onClick={() => {
                saveMedia(medias);
              }}
              className={` col-span-5 bg-brand-300 text-brand-50`}
            >
              Save
            </div>
            <p className="col-span-5 text-red-700">{saveMediaError}</p>
          </div>
          {/* </form> */}
        </div>
        <div className="col-span-3 flex justify-center items-center bg-brand-50">
          Preview Here
          {/* <img width="100%" src={imageFile.src}></img> */}
        </div>
      </div>
    </div>
  );
}
