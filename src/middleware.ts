import { Database } from '@/lib/supabase/types/index.types';
import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';

import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  console.log('MIDDLE WARE!');

  const res = NextResponse.next();
  const supabase = createMiddlewareSupabaseClient<Database>(
    { req, res },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUP_URL || '',
      supabaseKey: process.env.NEXT_PUBLIC_SUP_A_KEY || '',
    }
  );
  const session = await supabase.auth.getSession();
  let user = session.data.session?.user;
  const valid_email = process.env.VALID_EMAIL?.split(',');

  const url = req.nextUrl.clone();

  if (req.nextUrl.pathname == '/login' && user) {
    if (user.email && valid_email?.includes(user.email)) {
      url.pathname = '/admin';
      return NextResponse.rewrite(url);
    } else {
      return res;
    }
  }

  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (user) {
      console.log(session.data.session?.user);
      if (user.email && valid_email?.includes(user.email)) {
        return res;
      } else {
        res.cookies.set('supabase-auth-token', '');
        url.pathname = '/login';

        return NextResponse.rewrite(url);
      }
    } else {
      url.pathname = '/login';

      return NextResponse.rewrite(url);
    }
  }
  return res;
}
