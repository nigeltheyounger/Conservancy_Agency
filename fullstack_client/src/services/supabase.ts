import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

// Get environment variables with fallbacks
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project-id.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key';


if (import.meta.env.DEV) {
  console.log('Supabase URL:', supabaseUrl ? '✅ Configured' : '❌ Missing');
  console.log('Supabase Anon Key:', supabaseAnonKey ? '✅ Configured' : '❌ Missing');
}

// Create Supabase client with error handling
let supabase: SupabaseClient<Database>;
try {
  supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  });
} catch (error) {
  console.error('Failed to initialize Supabase client:', error);
  throw new Error('Failed to initialize Supabase client. Please check your environment variables.');
}

export { supabase };

// Authentication helper functions
export const signUp = async (email: string, password: string) => {
  return supabase.auth.signUp({ email, password });
};

export const signIn = async (email: string, password: string) => {
  return supabase.auth.signInWithPassword({ email, password });
};

export const signOut = async () => {
  return supabase.auth.signOut();
};

export const resetPassword = async (email: string) => {
  return supabase.auth.resetPasswordForEmail(email);
};

// Profile functions
export const getProfile = async (userId: string) => {
  return supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
};

export const updateProfile = async (userId: string, updates: any) => {
  return supabase
    .from('profiles')
    .update(updates)
    .eq('id', userId);
};

// File upload helper
export const uploadFile = async (bucket: string, path: string, file: File) => {
  return supabase.storage
    .from(bucket)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: true
    });
};