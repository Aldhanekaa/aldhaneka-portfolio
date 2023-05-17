import A_Personal_Logo from '@/components/aldhaneka_personal_logo_bg';
import CertificationCard from '@/components/certifications/card';
import { getCertificates } from '@/lib/supabase/fetch/getCertificates';

export default async function CertificatesPage() {
  const certificates = await getCertificates();
  return (
    <div className="w-full pb-32">
      <div
        className="w-full MADEMellow grid grid-rows-4 grid-cols-9 font-normal pt-7 pb-8 px-10"
        style={{
          background:
            'linear-gradient(321.69deg, #F6E7CC -4.32%, #D6CAB6 26.77%, #D6CAB6 60.69%, #F5E6CB 97.07%), #D4D290',
        }}
      >
        <div className="col-span-9 row-span-1">
          <A_Personal_Logo />
        </div>
        <h1 className="col-span-4 row-span-3 pt-28 text-brand-300 text-5xl lg:text-7xl xl:text-9xl">
          Certifications
        </h1>
      </div>

      <div className="w-full mt-20 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-9 px-10 gap-10">
        {certificates.error == null &&
          certificates.data.map((certificate) => (
            <CertificationCard {...certificate} />
          ))}
      </div>
    </div>
  );
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   return {
//     props: {},
//   };
// };

export const revalidate = 60; // revalidate this segment every 60 seconds
