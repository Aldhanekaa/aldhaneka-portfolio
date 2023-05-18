'use client';

import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

export default function LayoutSearch() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      searchInput: '',
    },
    onSubmit(values, formikHelpers) {
      console.log(values);
    },
  });

  return (
    <form
      className="col-span-4  md:col-span-3 xl:col-span-2"
      onSubmit={formik.handleSubmit}
    >
      <input
        type="text"
        name="searchInput"
        id="searchInput"
        placeholder="What Are You Looking For?"
        className="px-3 text-end w-full h-full bg-transparent rounded-full border-2 border-brand-350"
      />
    </form>
  );
}
