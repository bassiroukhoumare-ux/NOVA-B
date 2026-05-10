import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xsigfgozgfjkdvokksup.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhzaWdmZ296Z2Zqa2R2b2trc3VwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzNjgxMTEsImV4cCI6MjA5Mzk0NDExMX0.kJExZ7Adckmcoh2WYZBNucuxNGS0PBtsNF94In6tDRc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
