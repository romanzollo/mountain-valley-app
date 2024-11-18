import { createClient } from '@supabase/supabase-js';
const supabaseUrl = 'https://bziutcdwmcgruciwuwxb.supabase.co';
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ6aXV0Y2R3bWNncnVjaXd1d3hiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzE3ODg0NjksImV4cCI6MjA0NzM2NDQ2OX0.uIbSEZNjIy7Hs2kg3Gd2DBUtdjFUEUsEpzTl4-a4U7M';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
