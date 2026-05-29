import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ninulpxcmdkpmjgmmmqa.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable_ka9rr5g-A51MRWcbaS_ljQ_VH9XVfAt';

export const supabase = createBrowserClient(supabaseUrl, supabaseAnonKey);
