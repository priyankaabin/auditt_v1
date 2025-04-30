import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';
import { environment } from '../config/environment';

// Create Supabase client
export const supabase = createClient<Database>(
  environment.supabase.url,
  environment.supabase.anonKey,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true
    }
  }
);