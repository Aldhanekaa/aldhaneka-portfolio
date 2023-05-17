'use client';

import { Database } from '@/lib/supabase/types/index.types';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { Session, SupabaseClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
// import { useRouter } from 'next/router';
import { createContext, useContext, useEffect, useState } from 'react';

type AuthSession = Session | null;
type SupabaseContext = {
  supabase: SupabaseClient<Database>;
  session: AuthSession;
};
const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
  session,
}: {
  children: React.ReactNode;
  session: AuthSession;
}) {
  const [supabase] = useState(() =>
    createBrowserSupabaseClient({
      supabaseUrl: process.env.NEXT_PUBLIC_SUP_URL || '',
      supabaseKey: process.env.NEXT_PUBLIC_SUP_A_KEY || '',
    })
  );
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      router.refresh();
      // console.log('HEY!', session);
    });

    // supabase.auth.

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  return (
    <Context.Provider
      value={{
        supabase,
        session,
      }}
    >
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context == undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }

  return context;
};
