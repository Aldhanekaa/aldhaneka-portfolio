import CertificatesEditor from '@/components/certifications/editor';
import { supabase } from '@/lib/supabase/client';

export default async function ModifyCertificate({
  params,
}: {
  params: {
    id: string;
  };
}) {
  let { data: certificates, error } = await supabase
    .from('certificates')
    .select('*')
    .eq('id', params.id);

  if (certificates == null) {
    return <div>Not found</div>;
  }

  return (
    <CertificatesEditor
      certificates={certificates[0] ? certificates[0] : undefined}
    />
  );
}

export const revalidate = 5; // revalidate this segment every 60 seconds
