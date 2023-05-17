import { createClient } from '@supabase/supabase-js';
import { Database } from './types/index.types';

export const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUP_URL || '',
  process.env.NEXT_PUBLIC_SUP_A_KEY || ''
);
