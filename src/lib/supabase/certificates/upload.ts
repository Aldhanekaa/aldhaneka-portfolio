import {
  CertificateFileT,
  CertificateT,
} from '@/components/certifications/editor';
import generateRandomStr from '@/lib/generateRandomStr';
import { SupabaseClient } from '@supabase/supabase-js';
import { NavigateOptions } from 'next/dist/shared/lib/app-router-context';

export default async function UploadCertificate({
  values,
  imageFile,
  supabase,
  push,
  setFieldError,
}: {
  values: CertificateT;
  imageFile: CertificateFileT;
  supabase: SupabaseClient;
  push: (href: string, options?: NavigateOptions | undefined) => void;
  setFieldError: (field: string, message: string | undefined) => void;
}) {
  const id = generateRandomStr();
  let { src, file, name } = imageFile;

  //   console.log(values.received_at);

  if (file) {
    let fileNameSplits = name.split('.');

    const uploadName = `${id}_${values.fileName}`;
    const { data, error } = await supabase.storage
      .from('certificates')
      .upload(uploadName, file);

    if (error == null) {
      push('/admin/certificates');
    } else {
      alert(
        `ERROR OCCURED WHEN UPLOAD IMG\n
             CHECK CONSOLE ; ${JSON.stringify(error)}`
      );
      console.log(`ERROR: ${error}`);
    }

    const { error: errorUpload } = await supabase.from('certificates').insert({
      title: values.title,
      desc: values.desc,
      img_src: `https://xjxaegaoqextzpdpisoh.supabase.co/storage/v1/object/public/certificates/${uploadName}`,
      received_at: values.received_at,
    });
    // console.log(errorUpload);
    if (errorUpload == null) {
      push('/admin/certificates');
    } else {
      alert(`ERROR OCCURED: CHECK CONSOLE ; ${JSON.stringify(error)}`);
      console.log(`ERROR: ${errorUpload}`);
    }
  } else {
    setFieldError('file', 'Uploading file is required.');
  }
}
