import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Student = {
  id: string;
  full_name: string;
  national_id: string;
  grade: string;
  section: string;
  dob: string;
  phone: string;
  address: string;
  status: 'منتظم' | 'منقطع' | 'محول';
  image_url?: string;
  created_at?: string;
};

export type Log = {
  id: string;
  action: string;
  details: any;
  user_id: string;
  created_at: string;
};
