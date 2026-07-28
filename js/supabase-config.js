// supabase-config.js - Single Supabase Client Instance

// Konfigurasi Supabase
const SUPABASE_URL = 'https://intzwjmlypmopzauxeqt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHp3am1seXBtb3B6YXV4ZXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTc5MTIsImV4cCI6MjA3MDI5MzkxMn0.VwwVEDdHtYP5gui4epTcNfLXhPkmfFbRVb5y8mrXJiM';

// Buat single instance Supabase client
let supabaseInstance = null;

function getSupabaseClient() {
  if (supabaseInstance) {
    return supabaseInstance;
  }
  
  // Cek apakah Supabase tersedia di window
  if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    try {
      supabaseInstance = window.supabase.createClient(
        SUPABASE_URL, 
        SUPABASE_ANON_KEY,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false
          }
        }
      );
      console.log('✅ Supabase client single instance berhasil diinisialisasi');
      return supabaseInstance;
    } catch (error) {
      console.error('❌ Gagal membuat Supabase client:', error);
      return null;
    }
  }
  
  console.error('❌ Supabase library tidak tersedia');
  return null;
}

// Ekspos ke global
window.getSupabaseClient = getSupabaseClient;
window.supabaseInstance = getSupabaseClient();

console.log('📦 Supabase Config loaded - Single Instance');
