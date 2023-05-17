'use client';
import { useSupabase } from '@/app/supabase-provider';
import { CategoryT, RowsT } from '@/lib/supabase/types/index.types';
import { useFormik } from 'formik';
import { useEffect, useState } from 'react';

import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  input: Yup.string()
    .min(4, 'Too short')
    .max(20, 'Maximum Reached')
    .required('Required'),
});

export default function CTAModifier({
  row,
  col_name,
}: {
  row: RowsT;
  col_name: string;
}) {
  const supabase = useSupabase();
  const [onLoading, setLoading] = useState(false);
  const [pageData, setPageData] = useState<{
    datas: any[];
    fetched: boolean;
  }>({
    datas: [],
    fetched: false,
  });

  const fetchData = async () => {
    let { data: project_categories, error } = await supabase.supabase
      .from(row)
      .select('*');

    setPageData({
      fetched: true,
      datas: project_categories || [],
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const formik = useFormik({
    initialValues: {
      input: '',
    },
    validationSchema: validationSchema,
    async onSubmit(values, helper) {
      setLoading(true);

      const { data, error } = await supabase.supabase
        .from(row)

        // @ts-ignore
        .insert([{ [col_name]: values.input }]);

      if (error) {
        alert('ERROR OCCURED WHEN TRYING TO INSERT CATEGORY\n CHECK CONSOLE');
        console.log(
          'ERROR OCCURED WHEN TRYING TO INSERT CATEGORY ',
          JSON.stringify(error)
        );
      } else {
        let newC = pageData.datas;
        newC.push({
          [col_name]: values.input,
        });
        setPageData({
          fetched: true,
          datas: newC,
        });
        helper.setFieldValue('input', '');
      }

      setLoading(false);
    },
  });

  const onDeleteCategory = async (new_name: string) => {
    const { data, error } = await supabase.supabase
      .from(row)
      .delete()
      .eq(col_name, new_name);

    if (error) {
      alert(`ERROR OCCURED, ${JSON.stringify(error)}`);
    } else {
      if (pageData.datas) {
        setPageData({
          fetched: true,
          datas: pageData.datas.filter(
            (category) => category[col_name] != new_name
          ),
        });
      }
    }
  };

  return (
    <div>
      <section className="mt-12 mb-4">
        <div className="flex flex-col gap-3">
          {pageData.datas?.map((data, i) => (
            <div
              key={i}
              className="flex justify-between bg-brand-100 w-full px-5 py-4 rounded-lg "
            >
              <div className=" text-brand-300">
                <div className="bg-brand-100">{data[col_name]}</div>{' '}
              </div>
              <div
                className="text-red-600 cursor-pointer"
                onClick={() => {
                  onDeleteCategory(data[col_name]);
                }}
              >
                <span className="material-symbols-outlined">delete</span>
              </div>
            </div>
          ))}

          {pageData.datas.length == 0 && <div>There is no data yet :(</div>}
        </div>
      </section>
      <form onSubmit={formik.handleSubmit}>
        <input
          id="input"
          name="input"
          onChange={formik.handleChange}
          value={formik.values.input}
          className="w-full px-4 py-2"
          placeholder="Add New Data"
        ></input>
        <p>{formik.errors.input}</p>
        <button
          type="submit"
          className="mt-4 px-6 py-3 bg-brand-200 text-brand-50 rounded-lg"
        >
          Add
        </button>
        <button className="mt-4 px-6 py-3 ml-2">Refresh</button>
      </form>
    </div>
  );
}
