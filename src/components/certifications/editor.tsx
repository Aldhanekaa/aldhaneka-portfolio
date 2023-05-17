'use client';

import { useSupabase } from '@/app/supabase-provider';
import UploadCertificate from '@/lib/supabase/certificates/upload';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import * as Yup from 'yup';

export type CertificateT = {
  title: string;
  desc: string;
  imageSize: 0;
  file: string;
  fileName: string;
  received_at: string;
};

export type CertificateFileT = {
  src: string;
  file?: File;
  name: string;
};

const NewCertificateValidation = Yup.object().shape({
  title: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  desc: Yup.string().min(5, 'Too Short!').required('Required'),
  imageSize: Yup.number().max(1024 * 1024, ''),
  fileName: Yup.string().min(5, 'Too Short!').required('Required!'),
  received_at: Yup.string().required('Required!'),
});

let InitialValues: CertificateT = {
  title: '',
  desc: '',
  imageSize: 0,
  file: '',
  fileName: '',
  received_at: '',
};

export default function CertificatesEditor({
  certificates,
}: {
  certificates?: {
    id: number;
    title: string;
    desc: string;
    received_at: string;
    img_src: string;
  };
}) {
  const { supabase } = useSupabase();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setLoading] = useState<boolean>(false);

  const [imageFile, setImageFile] = useState<CertificateFileT>({
    src: '',
    name: '',
  });

  const router = useRouter();

  useEffect(() => {
    if (certificates) {
      setImageFile({
        ...imageFile,
        src: certificates.img_src,
      });
    }
  }, []);

  const formik = useFormik<CertificateT>({
    initialValues: Object.assign(
      { ...InitialValues },
      certificates && {
        ...InitialValues,
        ...certificates,
        fileName:
          certificates.img_src.split('/')[
            certificates.img_src.split('/').length - 1
          ],
      }
    ),
    validationSchema: NewCertificateValidation,
    onSubmit: async (values, helper) => {
      setLoading(true);

      if (certificates == undefined) {
        UploadCertificate({
          values,
          setFieldError: helper.setFieldError,
          supabase,
          push: router.push,
          imageFile,
        });
      } else {
        const { data, error } = await supabase
          .from('certificates')
          .update({
            desc: values.desc,
            title: values.title,
            received_at: values.received_at,
          })
          .eq('id', certificates.id.toString());

        if (error) {
          alert('ERROR OCCURED when trying to modify data, check console');
          console.log(
            `ERROR OCCURED when trying to modify data! \n${JSON.stringify(
              error
            )}`
          );
        } else {
          alert('success modified data!');
        }
      }

      setLoading(false);
    },
  });

  const handleFileInputChange = () => {
    const file = fileInputRef.current?.files && fileInputRef.current?.files[0];

    if (file) {
      console.log(file);
      const objectUrl = URL.createObjectURL(file);

      setImageFile({
        src: objectUrl,
        name: file.name,
        file: file,
      });
    }
  };

  console.log(formik.errors);

  return (
    <div>
      <h2 className="text-6xl MADEMellow font-light text-brand-350">
        {certificates ? 'Modify' : 'Upload'} Certificate
      </h2>

      {certificates && (
        <div className="mt-10">
          NOTES : Once You've Uploaded The Certificate, You Can't Modify The
          Photo, Delete It Instead.
        </div>
      )}

      <form
        className="mt-14 grid grid-cols-6 w-3/5 gap-3"
        onSubmit={formik.handleSubmit}
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
          <label className="mb-3 MADEMellow text-xl font-light">
            Description
          </label>
          <input
            className="bg-brand-50 border-brand-350 border-2 rounded-md"
            id="desc"
            name="desc"
            onChange={formik.handleChange}
            value={formik.values.desc}
          ></input>
          <p className=" text-red-500">{formik.errors.desc}</p>
        </div>

        {certificates == undefined && (
          <>
            <div className="col-span-3 flex flex-col">
              <label className="mb-3 MADEMellow text-xl font-light">
                Image
              </label>
              <input
                type="file"
                max={'50mb'}
                accept=".png, .jpg, .jpeg"
                className="bg-brand-50 border-brand-350 border-2 rounded-md"
                ref={fileInputRef}
                onInput={handleFileInputChange}
              ></input>
              <p className=" text-red-500">{formik.errors.file}</p>
            </div>
            <div className="col-span-3 flex flex-col">
              <label className="mb-3 MADEMellow text-xl font-light">
                File Name
              </label>
              <input
                className="bg-brand-50 border-brand-350 border-2 rounded-md"
                id="fileName"
                name="fileName"
                onChange={formik.handleChange}
                value={formik.values.fileName}
              ></input>
              <p className=" text-red-500">{formik.errors.fileName}</p>
            </div>
          </>
        )}

        <div className="col-span-3 flex flex-col">
          <label className="mb-3 MADEMellow text-xl font-light">
            Certificate Preview
          </label>
          <img src={imageFile.src}></img>
        </div>
        <div className="col-span-3 flex flex-col">
          <input
            type="date"
            className="bg-brand-50 border-brand-350 border-2 rounded-md"
            id="received_at"
            name="received_at"
            onChange={formik.handleChange}
            value={formik.values.received_at}
          />
          <p className=" text-red-500">{formik.errors.received_at}</p>
        </div>
        <div className="col-span-3 flex flex-col justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full  py-3 text-brand-50 bg-brand-350 ${
              isLoading ? 'text-brand-200' : 'text-brand-350'
            }`}
          >
            {isLoading ? 'Loading...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}
