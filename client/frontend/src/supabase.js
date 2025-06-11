import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ekqgiltudracufpsmzxy.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVrcWdpbHR1ZHJhY3VmcHNtenh5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NTc0MjYsImV4cCI6MjA2NTIzMzQyNn0.PzTjnApgFGahH1ezWNHfEJlXBXz9U3UIwo1nUw83TJA';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
