import { supabase } from '@/lib/supabase/client';

export async function getCertificates() {
  const certificates = await supabase.from('certificates').select('*');
  console.log('CERTIFICATES', certificates);
  return certificates;
}
