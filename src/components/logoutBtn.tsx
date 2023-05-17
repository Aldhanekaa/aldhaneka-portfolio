'use client';
import { useSupabase } from '@/app/supabase-provider';

export default function LogoutBtn() {
  const supabase = useSupabase();

  return (
    <div
      className="col-span-1 border-b-2 text-end"
      onClick={() => {
        supabase.supabase.auth.signOut();
      }}
    >
      Logout
    </div>
  );
}
