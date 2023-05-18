import Select from 'react-select';
import {
  CategoryI,
  GroupedCategoriesOption,
  GroupedOption,
  GroupedTagsOption,
  OptionI,
  RelationOptionI,
  TagsI,
  groupedOptions,
} from './relations.types';
import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useSupabase } from '@/app/supabase-provider';

const formatGroupLabel = (
  data: GroupedCategoriesOption | GroupedTagsOption
) => (
  <div>
    <span>{data.label}</span>
    {/* <span>{data.options.length}</span> */}
  </div>
);

const formatGroupOption = (data: OptionI) => (
  <div className="">
    <span>{data.name}</span>
  </div>
);

const formatOption = (data: OptionI) => (
  <div className="">
    <span>{data.name}</span>
  </div>
);

const validationSchema = Yup.object().shape({
  desc: Yup.string().min(5, 'Too Short').required('Required!'),
  selectedTags: Yup.array().required('Required!'),
  groupFamily: Yup.object<OptionI>().required('Required!'),
  parent: Yup.object().when('groupFamily.', (groupFamily, schema) => {
    if (groupFamily[0] && groupFamily[0].type == 'Tags') {
      return schema.required('This is required!');
    }
    return schema;
  }),
});

const initVal = {
  desc: '',
  selectedTags: undefined,
  groupFamily: undefined,
  parent: undefined,
};
export default function RelationEditor({
  tags,
  groupedOptions,
  relations,
  insertNewRelationIntoList,
}: {
  tags: readonly OptionI[];
  groupedOptions: groupedOptions | undefined;
  relations: readonly RelationOptionI[];
  insertNewRelationIntoList?: (relationObj: RelationOptionI) => void;
}) {
  const [show, setShow] = useState(false);
  const { supabase } = useSupabase();
  const formik = useFormik<{
    desc: string;
    selectedTags?: OptionI[];
    groupFamily?: OptionI;
    parent?: RelationOptionI;
  }>({
    initialValues: initVal,
    validationSchema: validationSchema,
    async onSubmit(values, formikHelpers) {
      // console.log(values);

      if (
        values.groupFamily &&
        values.groupFamily.name &&
        values.selectedTags
      ) {
        let structure: { category?: string | null; tag?: string | null } = {};

        if (values.groupFamily.type == 'Categories') {
          structure.category = values.groupFamily.name;
          structure.tag = null;
        } else {
          structure.tag = values.groupFamily.name;
          structure.category = null;
        }

        const { data, error } = await supabase
          .from('projects_relations')
          .insert([
            {
              relation_name: values.groupFamily.name,
              ...structure,
              desc: values.desc,
              tags: values.selectedTags.map((tag) => tag.value),
              parent: values.parent?.name,
            },
          ]);

        if (error) {
          alert(
            'Error occured when try to create new relation, check console '
          );
          console.log(
            'ERROR OCCURED WHEN TRY TO CREATE RELATION \n',
            JSON.stringify(error)
          );
        } else {
          alert('Success create relation!');

          formik.setValues(initVal);

          // insertNewRelationIntoList({
          //   name: values.groupFamily.name,
          //   value: values.groupFamily.name,
          //   ...structure,
          //   type: structure.category ? 'Categories' : 'Tags',
          // });
        }
      }
    },
  });

  return (
    <div className=" mt-10 border-brand-300 border-t-2 px-2 py-3">
      <div
        onClick={() => {
          setShow(!show);
        }}
        className="text-2xl mb-4 flex justify-between cursor-pointer"
      >
        <h2>Editor</h2>
        <div>
          <span className="material-symbols-outlined">
            {show ? 'expand_more' : 'expand_less'}
          </span>
        </div>
      </div>
      {show && (
        <form onSubmit={formik.handleSubmit} className="grid grid-cols-6 gap-6">
          <div className="col-span-6">
            <p>Select Group Family</p>

            <Select<OptionI, false, GroupedTagsOption>
              options={groupedOptions}
              formatGroupLabel={formatGroupLabel}
              formatOptionLabel={formatGroupOption}
              name="groupFamily"
              id="groupFamily"
              value={formik.values.groupFamily}
              onChange={(e) => {
                console.log('ggg', e);
                formik.setFieldValue('groupFamily', e);
              }}
            />
            <p>{formik.errors.groupFamily}</p>
          </div>
          <div className="col-span-3">
            <p>Select Tags</p>
            {tags && (
              <Select<OptionI, true>
                isMulti
                options={
                  formik.values.groupFamily?.type == 'Tags'
                    ? tags.filter(
                        (tag) => tag.name != formik.values.groupFamily?.name
                      )
                    : tags
                }
                formatOptionLabel={formatOption}
                onChange={(e) => {
                  formik.setFieldValue('selectedTags', e);
                  console.log(e, formik.values, formik.errors);
                }}
                value={formik.values.selectedTags}
              ></Select>
            )}
            <p>{formik.errors.selectedTags}</p>
          </div>
          <div className="col-span-3">
            <p>Select Description</p>

            <input
              name="desc"
              id="desc"
              onChange={formik.handleChange}
              value={formik.values.desc}
              className="w-full px-4 py-2"
              placeholder="Add New Data"
            ></input>
            <p>{formik.errors.desc}</p>
          </div>
          {formik.values.groupFamily?.type == 'Tags' && (
            <div className="col-span-3">
              <p>Select Parent</p>

              <Select<RelationOptionI, false>
                options={relations.filter(
                  (relation) => relation.type == 'Categories'
                )}
                formatOptionLabel={formatOption}
                onChange={(e) => {
                  console.log(e);
                  formik.setFieldValue('parent', e);
                }}
                value={formik.values.parent}
              ></Select>
              <p>{formik.errors.parent}</p>
            </div>
          )}
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-brand-200 text-brand-50 rounded-lg"
          >
            Add
          </button>
          <button className="mt-4 px-6 py-3 ml-2">Refresh</button>
        </form>
      )}
    </div>
  );
}
