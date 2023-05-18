import { useSupabase } from '@/app/supabase-provider';
import generateRandomStr from '@/lib/generateRandomStr';
import { JournalT, Json } from '@/lib/supabase/types/index.types';
import { useFormik } from 'formik';
import { useState } from 'react';
import { OptionI } from '../projects/CTAs/relations.types';

import Select from 'react-select';

import * as Yup from 'yup';
import EditorThumbnail from '../editorThumbnail';
import TipTapEditor from './tiptapEditor';
import { UploadJournal } from './uploadJournal';

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  desc: Yup.string().min(10, 'Too Short!').required('Required'),
  category: Yup.object().required('Category is required!'),
  tags: Yup.array().required('Tags is required!'),
  content: Yup.string().required('Content is required!'),

  thumbnail: Yup.string().required('Required!'),
});

export type JournalEditorT = {
  category?: OptionI;
  content: string;
  created_at: string;
  desc: string;
  id: string;
  tags?: OptionI[];
  title: string;
  thumbnail: string;
};
const InitialValues: JournalEditorT = {
  category: undefined,
  content: '',
  created_at: '',
  title: '',
  desc: '',
  id: '',
  tags: undefined,
  thumbnail: '',
};

const formatOption = (data: OptionI) => (
  <div className="">
    <span>{data.name}</span>
  </div>
);

export default function JournalEditor({
  journalProps,
  tags,
  categories,
}: {
  journalProps?: JournalT | null;

  tags: readonly OptionI[];
  categories: readonly OptionI[];
}) {
  const { supabase } = useSupabase();
  const [savedDB, setSavedDB] = useState(() => {
    if (journalProps) {
      return true;
    }
    return false;
  });

  const [loading, setLoading] = useState(false);
  const [journalId] = useState(() => {
    if (journalProps?.id) {
      return journalProps.id;
    }
    return generateRandomStr();
  });

  const [thumbnailFile, setThumbnailFile] = useState<File | undefined>();

  const [previousThumbnailFileName, setPreviousThumbnailFileName] =
    useState<string>('');

  const formik = useFormik({
    initialValues: Object.assign(
      { ...InitialValues },
      journalProps && {
        ...InitialValues,
        ...journalProps,
        tags:
          journalProps.tags &&
          journalProps.tags.map((tag) => {
            const tagSplit = tag.split('.');
            const name = tagSplit[1];

            return {
              name: name,
              value: tag,
              type: 'Tags',
            };
          }),
        category: {
          name: journalProps.category,
          value: journalProps.category,
          type: 'Categories',
        },
      }
    ),
    validationSchema: validationSchema,
    async onSubmit(values, helper) {
      setLoading(true);

      try {
        let uploadName: string = '';
        if (thumbnailFile) {
          uploadName = `${journalId}/${thumbnailFile.name}`;
        } else {
          uploadName = formik.values.thumbnail;
        }
        // console.log(values.thumbnail);

        const response = await UploadJournal({
          journalId: journalId,
          thumbnailFile: thumbnailFile,
          thumbnailName: values.thumbnail,
          supabase: supabase,
          previousThumbnail: previousThumbnailFileName,
          values: values,
          savedDB,
        });

        if (response == 'success' && savedDB == false) {
          setPreviousThumbnailFileName(uploadName);
          setSavedDB(true);
        }
      } catch {}

      setLoading(false);
    },
  });

  console.log(formik.errors);

  return (
    <div>
      <h2 className="text-6xl MADEMellow font-light text-brand-350">
        {savedDB ? 'Modify' : 'Write'} Journal
      </h2>

      <form
        onSubmit={formik.handleSubmit}
        className="mt-14 grid grid-cols-6 w-3/5 gap-3 gap-y-10"
      >
        <div className="col-span-3 flex flex-col">
          <label className="mb-3 MADEMellow text-xl font-light" htmlFor="title">
            Journal Title
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
            Journal Desc
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
          {/* @ts-ignore */}
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
          {/* @ts-ignore */}
          <p className=" text-red-500">{formik.errors.tags}</p>
        </div>
        <EditorThumbnail
          thumbnailSrc={formik.values.thumbnail}
          setThumbnailFile={setThumbnailFile}
          setThumbnailName={formik.setFieldValue}
          projectId={journalId}
          thumbnailError={formik.errors.thumbnail}
        />

        <TipTapEditor
          setContent={(e: string) => {
            formik.setFieldValue('content', e);
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
