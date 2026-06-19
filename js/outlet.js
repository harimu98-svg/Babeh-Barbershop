// outlet.js - Halaman Outlet Babeh Barbershop

// Mengambil data outlet dari Supabase
let outletSupabaseClient = null;
let outletsData = [];

// Konfigurasi Supabase
const OUTLET_SUPABASE_URL = 'https://intzwjmlypmopzauxeqt.supabase.co';
const OUTLET_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHp3am1seXBtb3B6YXV4ZXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTc5MTIsImV4cCI6MjA3MDI5MzkxMn0.VwwVEDdHtYP5gui4epTcNfLxhPkmfFbRVb5y8mrXJiM';

// Fungsi untuk mendapatkan Supabase client
function getOutletSupabaseClient() {
  if (outletSupabaseClient) return outletSupabaseClient;
  
  if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    outletSupabaseClient = window.supabase.createClient(OUTLET_SUPABASE_URL, OUTLET_SUPABASE_ANON_KEY);
    console.log('✅ Supabase client untuk Outlet berhasil diinisialisasi');
    return outletSupabaseClient;
  }
  
  console.error('❌ Supabase library tidak tersedia');
  return null;
}

// Fungsi untuk mengambil data outlet dari Supabase
async function fetchOutlets() {
  const client = getOutletSupabaseClient();
  if (!client) {
    console.error('❌ Supabase client tidak tersedia');
    return [];
  }
  
  try {
    console.log('📋 Mengambil data outlet dari database...');
    
    const { data, error } = await client
      .from('outlet')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Error fetching outlets:', error);
      return [];
    }
    
    if (data && data.length > 0) {
      console.log(`✅ Ditemukan ${data.length} outlet`);
      data.forEach((outlet, idx) => {
        console.log(`   ${idx + 1}. ${outlet.outlet} - reservation: ${outlet.reservation}`);
      });
      return data;
    }
    
    console.log('⚠️ Tidak ada data outlet, menggunakan data dummy');
    return getDummyOutlets();
  } catch (err) {
    console.error('Database error:', err);
    return getDummyOutlets();
  }
}

// Data dummy jika Supabase kosong
function getDummyOutlets() {
  return [
    {
      outlet: 'Babeh Barbershop Pusat',
      alamat: 'Jl. Raya No. 123, Jakarta Selatan',
      jam_buka: '09:00',
      jam_tutup: '21:00',
      reservation: 'true',
      map: 'https://maps.google.com/?q=Jl.+Raya+No.+123+Jakarta+Selatan'
    },
    {
      outlet: 'Babeh Barbershop Cabang',
      alamat: 'Jl. Boulevard No. 45, Jakarta Utara',
      jam_buka: '10:00',
      jam_tutup: '22:00',
      reservation: 'true',
      map: 'https://maps.google.com/?q=Jl.+Boulevard+No.+45+Jakarta+Utara'
    },
    {
      outlet: 'Babeh Barbershop Express',
      alamat: 'Mall Grand Indonesia Lt. 3, Jakarta Pusat',
      jam_buka: '10:00',
      jam_tutup: '20:00',
      reservation: 'false',
      map: 'https://maps.google.com/?q=Mall+Grand+Indonesia+Jakarta+Pusat'
    }
  ];
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Render halaman Outlet
async function renderOutlet(container) {
  // Tampilkan loading
  container.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <div class="text-center py-20">
        <i class="fas fa-spinner fa-spin text-4xl text-purple-600"></i>
        <p class="mt-4 text-gray-500">Memuat data outlet...</p>
      </div>
    </div>
  `;
  
  // Ambil data outlet
  outletsData = await fetchOutlets();
  
  // Render konten
  container.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <!-- Header Outlet -->
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
        <h2 class="text-3xl font-bold text-purple-800 mb-2 flex items-center gap-3">
          <i class="fas fa-store-alt text-purple-600"></i> 
          Outlet Babeh Barbershop
        </h2>
        <p class="text-gray-500">Kunjungi outlet terdekat Anda</p>
      </div>
      
      <!-- Grid Outlet -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${outletsData.map(outlet => {
          const reservationStatus = outlet.reservation === 'true' || outlet.reservation === true;
          
          return `
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="bg-gradient-to-r from-purple-600 to-purple-800 p-4">
              <h3 class="text-xl font-bold text-white flex items-center gap-2">
                <i class="fas fa-store text-white"></i>
                ${escapeHtml(outlet.outlet)}
              </h3>
            </div>
            <div class="p-5">
              <div class="mb-4">
                <p class="text-gray-600 flex items-start gap-2">
                  <i class="fas fa-map-marker-alt text-purple-600 mt-1"></i>
                  <span>${escapeHtml(outlet.alamat)}</span>
                </p>
              </div>
              
              <div class="space-y-2 border-t border-gray-100 pt-4">
                <div class="flex justify-between items-center">
                  <span class="text-gray-500 text-sm">
                    <i class="far fa-calendar-alt mr-1"></i> Hari Buka
                  </span>
                  <span class="font-semibold text-slate-700">Senin - Minggu</span>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-gray-500 text-sm">
                    <i class="far fa-clock mr-1"></i> Jam Operasional
                  </span>
                  <span class="font-semibold text-slate-700">${escapeHtml(outlet.jam_buka)} - ${escapeHtml(outlet.jam_tutup)}</span>
                </div>
                
                <div class="flex justify-between items-center">
                  <span class="text-gray-500 text-sm">
                    <i class="fas fa-calendar-check mr-1"></i> Reservasi
                  </span>
                  ${reservationStatus ? 
                    `<span class="text-green-600 font-semibold text-sm">
                      <i class="fas fa-check-circle mr-1"></i> Tersedia
                     </span>` : 
                    `<span class="text-red-600 font-semibold text-sm">
                      <i class="fas fa-times-circle mr-1"></i> Tidak Tersedia
                     </span>`
                  }
                </div>
              </div>
              
              <button onclick="window.open('${escapeHtml(outlet.map)}', '_blank')" 
                      class="mt-4 w-full bg-purple-100 text-purple-700 py-2 rounded-xl font-semibold hover:bg-purple-200 transition flex items-center justify-center gap-2">
                <i class="fas fa-map-marker-alt"></i> Lihat di Google Maps
              </button>
            </div>
          </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
}

console.log('📁 Modul Outlet siap digunakan!');
