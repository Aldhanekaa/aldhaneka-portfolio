'use client';
import { useSupabase } from '@/app/supabase-provider';
import A_Personal_Logo from '@/components/aldhaneka_personal_logo_bg';
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { headers, cookies } from 'next/headers';

export default async function LoginPage() {
  const SupabaseClient = useSupabase();

  async function signInWithGoogle() {
    const { data, error } = await SupabaseClient.supabase.auth.signInWithOAuth({
      provider: 'google',
    });

    console.log(data);
  }

  return (
    <div className="w-screen h-screen pt-32">
      <div className="w-full container mx-auto flex flex-col items-center ">
        <A_Personal_Logo />
        <h1 className="text-5xl mt-24 text-brand-350 MADEMellow">Login</h1>
        <button
          onClick={() => {
            signInWithGoogle();
          }}
          className=" mt-20 MADEMellow font-light text-2xl py-4 px-8 bg-brand-150 rounded-2xl text-brand-200"
        >
          Login with <span className="font-normal">Google</span>
        </button>
      </div>
    </div>
  );
}
