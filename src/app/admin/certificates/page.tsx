import CertificationCard from '@/components/certifications/card';
import CertificatesDashboard from '@/components/dashboard/certificates';
import { getCertificates } from '@/lib/supabase/fetch/getCertificates';
import Link from 'next/link';

export default async function CertificatePage() {
  const certificates = await getCertificates();

  return (
    <div>
      <h2 className="text-4xl MADEMellow font-light text-brand-350">
        Certificates{' '}
        <Link href="/admin/certificates/new">
          <div className="text-xl underline">Create New</div>
        </Link>
      </h2>
      <CertificatesDashboard certificatesProp={certificates} />
    </div>
  );
}
export const revalidate = 10; // revalidate this segment every 60 seconds
