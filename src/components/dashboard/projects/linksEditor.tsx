import Select from 'react-select';
import { OptionI } from './CTAs/relations.types';
import { title } from 'process';
import { LinkPlatform, LinkT } from './editor';
import { useState } from 'react';
import generateRandomStr from '@/lib/generateRandomStr';

const linksOption: OptionI[] = [
  {
    name: 'GitHub',
    value: 'GitHub',
    type: 'link',
  },
  {
    name: 'Google Drive',
    value: 'GoogleDrive',
    type: 'link',
  },
  {
    name: 'Youtube',
    value: 'Youtube',
    type: 'link',
  },
];

const formatOption = (data: OptionI) => (
  <div className="">
    <span>{data.name}</span>
  </div>
);

export default function LinksEditor({
  links,
  setLinks,
}: {
  links: LinkT[] | null;
  setLinks: (input: LinkT[] | null) => void;
}) {
  const [selectedMedia, setSelectedMedia] = useState<number>();
  const [inputs, setInputs] = useState<{
    title: string;
    src: string;
    type: LinkPlatform;
  }>({
    title: '',
    src: '',
    type: 'GitHub',
  });

  const addNewLink = () => {
    if (selectedMedia) {
    } else {
      let newLinks = links;
      if (newLinks) {
        newLinks?.push({
          id: generateRandomStr(),
          title: inputs.title,
          src: inputs.src,
          type: inputs.type,
        });
        setInputs({
          title: '',
          src: '',
          type: 'GitHub',
        });
        setLinks(newLinks);
      }

      //   if (newLinks)
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
      if (links) {
        setSelectedMedia(i);
        setInputs({
          type: links[i].type,
          src: links[i].src,
          title: links[i].title,
        });
      }
    }
  };

  const deleteSelectedMedia = () => {
    if (selectedMedia != undefined) {
      console.log('oyy');
      let newLinks = links;

      if (newLinks) {
        newLinks.splice(selectedMedia);
        setSelectedMedia(undefined);
        setLinks(newLinks);
      }
    }
  };

  const moveMedia = (id: string, inc: number) => {
    if (selectedMedia != undefined) setSelectedMedia(undefined);

    const linksClone = links;
    if (linksClone) {
      const mediaIndex = linksClone.findIndex((link) => link.id == id);
      const currentMedia = linksClone.splice(mediaIndex, 1);
      // console.log(currentMedia, mediasClone, mediasClone.slice(0, mediaIndex));

      setLinks([
        ...links.slice(0, mediaIndex + inc),
        ...currentMedia,
        ...links.slice(mediaIndex + inc),
      ]);
    }
  };

  return (
    <>
      <div className=" col-span-3">
        <label className="mb-3 MADEMellow text-xl font-light" htmlFor="tags">
          Project Links
        </label>

        <div className="w-full flex flex-col my-3">
          {links &&
            links.map((link, i) => (
              <div
                key={`${link.title}_${i}`}
                className={`${
                  i == selectedMedia
                    ? 'bg-brand-200 text-brand-50'
                    : 'bg-brand-50'
                } px-4 py-4 grid grid-cols-9`}
              >
                <div className=" col-span-1 flex flex-col ">
                  <div
                    onClick={() => {
                      moveMedia(link.id, -1);
                    }}
                    className=" cursor-pointer"
                  >
                    <span className="material-symbols-outlined">
                      expand_less
                    </span>
                  </div>
                  <div
                    onClick={() => {
                      moveMedia(link.id, +1);
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
                  <p>{link.title}</p>
                  <p>{link.src}</p>
                </div>
                <div className="col-span-1">
                  <p>{link.type}</p>
                </div>
              </div>
            ))}
        </div>

        <div>
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

              //   value={inputs.title}
            ></input>
            <Select<OptionI, false>
              options={linksOption}
              name="category"
              id="category"
              defaultValue={linksOption[0]}
              className="col-span-2"
              formatOptionLabel={formatOption}
              value={{
                name: inputs.type,
                value: inputs.type,
                type: 'link',
              }}
              onChange={(e) => {
                if (e) {
                  setInputs({
                    ...inputs,
                    // @ts-ignore
                    type: e.value,
                  });
                }
              }}
            />
            <input
              type="text"
              placeholder="links"
              className="bg-brand-50 col-span-6  border-2 rounded-md"
              onChange={(e) => {
                setInputs({
                  ...inputs,
                  src: e.target.value,
                });
              }}
              value={inputs.src}
            />
            <button
              onClick={addNewLink}
              className={` col-span-4 bg-brand-200 text-brand-50`}
            >
              Add
            </button>
            <button
              onClick={deleteSelectedMedia}
              className={`${
                selectedMedia != undefined ? 'opacity-100' : 'opacity-30'
              } col-span-1 text-center cursor-pointer bg-brand-300 text-brand-50`}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      <div className=" col-span-3"></div>
    </>
  );
}
