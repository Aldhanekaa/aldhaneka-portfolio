'use client';
import { ProjectT } from '@/lib/supabase/types/index.types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { OptionI } from './CTAs/relations.types';

import Select from 'react-select';
import EditorMedia, { EditorMediasT } from './editorMedia';
import { useSupabase } from '@/app/supabase-provider';
import { useState } from 'react';
import generateRandomStr from '@/lib/generateRandomStr';
import { UploadProject } from './uploadProject';
import { UploadMedias } from './uploadMedias';
import LinksEditor from './linksEditor';
import EditorThumbnail from '../editorThumbnail';

const formatOption = (data: OptionI) => (
  <div className="">
    <span>{data.name}</span>
  </div>
);

export type LinkPlatform = 'GitHub' | 'GoogleDrive' | 'Youtube';
export type LinkT = {
  id: string;
  title: string;
  src: string;
  type: LinkPlatform;
};
export type MediasT = {
  id: string;
  title: string;
  src: string;
  type: 'iframe' | 'image';
};
export type EditorT = {
  category?: OptionI;
  completed_at: string;
  desc: string;
  // id: number;
  links: Array<LinkT> | null;
  medias: Array<MediasT>;
  started_at: string | undefined;
  tags?: OptionI[];
  thumbnail: string;
  title: string;
  saveMedia: boolean;
};

let InitialValues: EditorT = {
  category: undefined,

  started_at: undefined,
  completed_at: '',

  desc: '',
  links: [],
  medias: [],
  tags: undefined,
  thumbnail: '',
  title: '',
  saveMedia: false,
};

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  desc: Yup.string().min(10, 'Too Short!').required('Required'),
  category: Yup.object().required('Category is required!'),
  tags: Yup.array().required('Tags is required!'),
  links: Yup.array(),

  medias: Yup.array().required(
    'Media is required to show visual experience. (embedding)'
  ),

  completed_at: Yup.string().required('This is required!'),
  started_at: Yup.string(),

  thumbnail: Yup.string(),
  saveMedia: Yup.boolean()
    .oneOf([true], `It's required to save!`)
    .required("It's required to save!"),
});

export default function ProjectEditor({
  tags,
  categories,
  projectProps,
}: {
  projectProps?: ProjectT | null;

  tags: readonly OptionI[];
  categories: readonly OptionI[];
}) {
  const [loading, setLoading] = useState(false);
  // console.log(projectProps);
  const [projectId] = useState(() => {
    if (projectProps?.id) {
      return projectProps.id;
    }
    return generateRandomStr();
  });
  const [thumbnailFile, setThumbnailFile] = useState<File | undefined>();

  const [previousThumbnailFileName, setPreviousThumbnailFileName] =
    useState<string>('');

  const { supabase } = useSupabase();

  const [previousMedias, setPreviousMedias] = useState<Array<MediasT>>([]);
  const [medias, setMedias] = useState<Array<EditorMediasT>>([]);
  const [savedDB, setSavedDB] = useState(() => {
    if (projectProps) {
      return true;
    }

    return false;
  });

  const formik = useFormik<EditorT>({
    initialValues: Object.assign(
      { ...InitialValues },
      projectProps && {
        ...InitialValues,
        ...projectProps,
        tags: projectProps.tags.map((tag) => {
          const tagSplit = tag.split('.');
          const name = tagSplit[1];

          return {
            name: name,
            value: tag,
            type: 'Tags',
          };
        }),
        started_at:
          projectProps.started_at == null ? undefined : projectProps.started_at,
        category: {
          name: projectProps.category,
          value: projectProps.category,
          type: 'Categories',
        },
      }
    ),
    validationSchema: validationSchema,
    async onSubmit(values, formikHelpers) {
      setLoading(true);
      if (values.tags) {
        const mediasReady = await UploadMedias({
          supabase: supabase,
          projectId: projectId,
          medias: medias,
          previousMedias: previousMedias,
        });
        setPreviousMedias(mediasReady);

        try {
          let uploadName: string = '';
          if (thumbnailFile) {
            uploadName = `${projectId}/${thumbnailFile.name}`;
          } else {
            uploadName = formik.values.thumbnail;
          }
          // console.log(values.thumbnail);

          console.log('mediasReady', mediasReady);
          const response = await UploadProject({
            projectId: projectId,
            thumbnailFile: thumbnailFile,
            thumbnailName: values.thumbnail,
            supabase: supabase,
            previousThumbnail: previousThumbnailFileName,
            values: values,
            medias: mediasReady,
            savedDB,
          });

          if (response == 'success' && savedDB == false) {
            setPreviousThumbnailFileName(uploadName);
            setSavedDB(true);
          }
        } catch {}
      }
      setLoading(false);
    },
  });

  const saveMedia = (medias: Array<EditorMediasT>) => {
    console.log('SET', medias);
    setMedias(medias);
    formik.setFieldValue('saveMedia', true);
  };

  const setMediaNotSaved = () => {
    if (formik.values.saveMedia == true) {
      formik.setFieldValue('saveMedia', false);
    }
  };

  console.log(formik.values);

  return (
    <div>
      <h2 className="text-6xl MADEMellow font-light text-brand-350">
        {savedDB ? 'Modify' : 'Upload'} Project
      </h2>

      <form
        onSubmit={formik.handleSubmit}
        className="mt-14 grid grid-cols-6 w-3/5 gap-3 gap-y-10"
      >
        <div className="col-span-3 flex flex-col">
          <label className="mb-3 MADEMellow text-xl font-light" htmlFor="title">
            Title
          </label>
          <input
            className="bg-brand-50 border-brand-350 border-2 rounded-md"
            id="title"
            name="title"
            onChange={formik.handleChange}
            value={formik.values.title}
          ></input>
          <p className=" text-red-500">{formik.errors.title}</p>
        </div>
        <div className="col-span-3 flex flex-col">
          <label className="mb-3 MADEMellow text-xl font-light" htmlFor="desc">
            Project Description
          </label>
          <textarea
            className="bg-brand-50 border-brand-350 border-2 rounded-md"
            id="desc"
            name="desc"
            onChange={formik.handleChange}
            value={formik.values.desc}
          ></textarea>
          <p className=" text-red-500">{formik.errors.desc}</p>
        </div>
        <div className="col-span-3 flex flex-col">
          <label
            className="mb-3 MADEMellow text-xl font-light"
            htmlFor="started_at"
          >
            Started At
          </label>
          <input
            type="date"
            className="bg-brand-50 border-brand-350 border-2 rounded-md"
            id="started_at"
            name="started_at"
            onChange={formik.handleChange}
            value={formik.values.started_at || ''}
          ></input>
          <p className=" text-red-500">{formik.errors.started_at}</p>
        </div>
        <div className="col-span-3 flex flex-col">
          <label
            className="mb-3 MADEMellow text-xl font-light"
            htmlFor="completed_at"
          >
            Completed At
          </label>
          <input
            type="date"
            className="bg-brand-50 border-brand-350 border-2 rounded-md"
            id="completed_at"
            name="completed_at"
            onChange={formik.handleChange}
            value={formik.values.completed_at || ''}
          ></input>
          <p className=" text-red-500">{formik.errors.completed_at}</p>
        </div>
        <div className="col-span-3 flex flex-col">
          <label
            className="mb-3 MADEMellow text-xl font-light"
            htmlFor="category"
          >
            Project Category
          </label>
          <Select<OptionI, false>
            options={categories}
            formatOptionLabel={formatOption}
            name="category"
            id="category"
            value={formik.values.category}
            onChange={(e) => {
              console.log('ggg', e);
              formik.setFieldValue('category', e);
            }}
          />
          <p className=" text-red-500">{formik.errors.category}</p>
        </div>
        <div className="col-span-3 flex flex-col">
          <label className="mb-3 MADEMellow text-xl font-light" htmlFor="tags">
            Project Tags
          </label>
          <Select<OptionI, true>
            isMulti
            options={tags}
            formatOptionLabel={formatOption}
            name="tags"
            id="tags"
            value={formik.values.tags}
            onChange={(e) => {
              console.log('ggg', e);
              formik.setFieldValue('tags', e);
            }}
          />
          <p className=" text-red-500">{formik.errors.tags}</p>
        </div>
        <EditorMedia
          saveMedia={saveMedia}
          setMediaNotSaved={setMediaNotSaved}
          saveMediaError={formik.errors.saveMedia}
          // @ts-ignore
          mediasProps={projectProps?.medias}
        />
        <EditorThumbnail
          thumbnailSrc={formik.values.thumbnail}
          setThumbnailFile={setThumbnailFile}
          setThumbnailName={formik.setFieldValue}
          projectId={projectId}
          thumbnailError={formik.errors.thumbnail}
        />
        <LinksEditor
          links={formik.values.links}
          setLinks={(input: LinkT[] | null) => {
            formik.setFieldValue('links', input);
          }}
        />
        <button
          type="submit"
          className="col-span-6 bg-brand-100 rounded-lg py-2 text-brand-300"
        >
          {loading ? 'Loading..' : savedDB ? 'Modify!' : 'Add'}
        </button>
      </form>
    </div>
  );
}
