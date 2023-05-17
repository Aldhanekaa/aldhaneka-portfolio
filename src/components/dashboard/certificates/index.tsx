'use client';
import { useSupabase } from '@/app/supabase-provider';
import CertificationCard from '@/components/certifications/card';
import { CertificatesT } from '@/lib/supabase/types/index.types';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function CertificatesDashboard({
  certificatesProp,
}: {
  certificatesProp: PostgrestSingleResponse<CertificatesT[]>;
}) {
  const [certificates, setCertificates] = useState(() => certificatesProp);
  const { supabase } = useSupabase();

  useEffect(() => {
    const certificatesSubscription = supabase
      .channel('certificate-channels')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'certificates' },
        (payload) => {
          switch (payload.eventType) {
            case 'DELETE':
              let deletedId = payload.old.id;
              // @ts-ignore
              if (payload.old.id) {
                if (certificates.data) {
                  setCertificates({
                    ...certificates,
                    data: certificates.data.filter(
                      (data) => data.id != deletedId
                    ),
                  });
                }
              }
              break;

            default:
              break;
          }
        }
      )
      .subscribe();
    return () => {
      certificatesSubscription.unsubscribe();
    };
  }, []);

  async function deleteCertificate(id: number, img_src: string) {
    const imgSrcSplit = img_src.split('/');
    const imgName = imgSrcSplit[imgSrcSplit.length - 1];

    const { data: deletedImage, error } = await supabase.storage
      .from('certificates')
      .remove([imgName]);

    if (error) {
      alert('ERROR OCCURED WHEN TRYING TO DEL IMAGE, check console');
      console.log('ERRORR: ', JSON.stringify(error));
    }
    const { data, error: errorDeleteRow } = await supabase
      .from('certificates')
      .delete()
      .eq('id', id);

    if (errorDeleteRow) {
      alert('ERROR OCCURED WHEN TRYING TO DEL ROW, check console');
      console.log('ERRORR: ', JSON.stringify(errorDeleteRow));
    }
  }

  console.log(certificates);
  return (
    <div className="mt-10 grid grid-cols-3 gap-10 md:grid-cols-6 lg:grid-cols-9">
      {certificates.error == null &&
        certificates.data.map((certificate, i) => (
          <div key={i} className=" col-span-3">
            <div className="mb-2">
              <Link href={`/admin/certificates/modify/${certificate.id}`}>
                <button className="px-3 py-3 bg-brand-400 text-brand-500">
                  Modify
                </button>
              </Link>
              <button
                onClick={() => {
                  deleteCertificate(certificate.id, certificate.img_src);
                }}
                className="px-3 py-3 bg-red-400 text-red-50"
              >
                Delete
              </button>
            </div>
            <div className="grid gird-cols-3">
              <CertificationCard
                {...certificate}
                textClassName="text-lg lg:text-2xl"
              />
            </div>
          </div>
        ))}
    </div>
  );
}
