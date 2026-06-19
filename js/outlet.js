// outlet.js - Halaman Outlet Babeh Barbershop

// Mengambil data outlet dari Supabase
let outletSupabaseClient = null;
let outletsData = [];

// Konfigurasi Supabase - PASTIKAN INI BENAR
const OUTLET_SUPABASE_URL = 'https://intzwjmlypmopzauxeqt.supabase.co';
const OUTLET_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHp3am1seXBtb3B6YXV4ZXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTc5MTIsImV4cCI6MjA3MDI5MzkxMn0.VwwVEDdHtYP5gui4epTcNfLXhPkmfFbRVb5y8mrXJiM';

// Fungsi untuk mendapatkan Supabase client
function getOutletSupabaseClient() {
  if (outletSupabaseClient) return outletSupabaseClient;
  
  // Cek apakah Supabase tersedia di window
  if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    try {
      outletSupabaseClient = window.supabase.createClient(
        OUTLET_SUPABASE_URL, 
        OUTLET_SUPABASE_ANON_KEY,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false
          }
        }
      );
      console.log('✅ Supabase client untuk Outlet berhasil diinisialisasi');
      return outletSupabaseClient;
    } catch (error) {
      console.error('❌ Gagal membuat Supabase client:', error);
      return null;
    }
  }
  
  console.error('❌ Supabase library tidak tersedia');
  return null;
}

// Fungsi untuk mengambil data outlet dari Supabase
async function fetchOutlets() {
  const client = getOutletSupabaseClient();
  if (!client) {
    console.error('❌ Supabase client tidak tersedia, menggunakan data dummy');
    return getDummyOutlets();
  }
  
  try {
    console.log('📋 Mengambil data outlet dari database...');
    
    const { data, error } = await client
      .from('outlet')
      .select('*')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Error fetching outlets:', error);
      console.log('⚠️ Menggunakan data dummy sebagai fallback');
      return getDummyOutlets();
    }
    
    if (data && data.length > 0) {
      console.log(`✅ Ditemukan ${data.length} outlet dari database`);
      data.forEach((outlet, idx) => {
        console.log(`   ${idx + 1}. ${outlet.outlet} - reservation: ${outlet.reservation}`);
      });
      return data;
    }
    
    console.log('⚠️ Tidak ada data outlet di database, menggunakan data dummy');
    return getDummyOutlets();
  } catch (err) {
    console.error('❌ Database error:', err);
    console.log('⚠️ Menggunakan data dummy sebagai fallback');
    return getDummyOutlets();
  }
}

// Data dummy jika Supabase tidak bisa diakses
function getDummyOutlets() {
  console.log('📦 Menggunakan data dummy outlet');
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
    },
    {
      outlet: 'Babeh Barbershop Pondok Indah',
      alamat: 'Pondok Indah Mall Lt. 2, Jakarta Selatan',
      jam_buka: '10:00',
      jam_tutup: '22:00',
      reservation: 'true',
      map: 'https://maps.google.com/?q=Pondok+Indah+Mall+Jakarta+Selatan'
    },
    {
      outlet: 'Babeh Barbershop Kelapa Gading',
      alamat: 'Mall Kelapa Gading Lt. 3, Jakarta Utara',
      jam_buka: '10:00',
      jam_tutup: '21:00',
      reservation: 'false',
      map: 'https://maps.google.com/?q=Mall+Kelapa+Gading+Jakarta+Utara'
    },
    {
      outlet: 'Babeh Barbershop Bintaro',
      alamat: 'Bintaro Exchange Mall, Tangerang Selatan',
      jam_buka: '09:00',
      jam_tutup: '20:00',
      reservation: 'true',
      map: 'https://maps.google.com/?q=Bintaro+Exchange+Tangerang+Selatan'
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
      <div class="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <i class="fas fa-store-alt text-3xl"></i>
          </div>
          <div>
            <h2 class="text-3xl font-bold">Outlet Babeh Barbershop</h2>
            <p class="text-purple-200 mt-1">Kunjungi outlet terdekat Anda</p>
          </div>
        </div>
      </div>
      
      <!-- Statistik Outlet -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-2xl shadow-xl p-4 text-center">
          <div class="text-2xl font-bold text-purple-600">${outletsData.length}</div>
          <div class="text-gray-500 text-sm">Total Outlet</div>
        </div>
        <div class="bg-white rounded-2xl shadow-xl p-4 text-center">
          <div class="text-2xl font-bold text-green-600">${outletsData.filter(o => o.reservation === 'true' || o.reservation === true).length}</div>
          <div class="text-gray-500 text-sm">Reservasi Tersedia</div>
        </div>
        <div class="bg-white rounded-2xl shadow-xl p-4 text-center">
          <div class="text-2xl font-bold text-blue-600">${new Set(outletsData.map(o => o.jam_buka)).size}</div>
          <div class="text-gray-500 text-sm">Varian Jam Buka</div>
        </div>
        <div class="bg-white rounded-2xl shadow-xl p-4 text-center">
          <div class="text-2xl font-bold text-orange-600">${outletsData.length * 3}+</div>
          <div class="text-gray-500 text-sm">Barber Profesional</div>
        </div>
      </div>
      
      <!-- Grid Outlet -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${outletsData.map((outlet, index) => {
          const reservationStatus = outlet.reservation === 'true' || outlet.reservation === true;
          const colors = ['from-purple-500 to-purple-700', 'from-blue-500 to-blue-700', 'from-green-500 to-green-700', 'from-red-500 to-red-700', 'from-orange-500 to-orange-700', 'from-pink-500 to-pink-700'];
          const colorIndex = index % colors.length;
          
          return `
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 outlet-card">
            <div class="bg-gradient-to-r ${colors[colorIndex]} p-4">
              <div class="flex items-center justify-between">
                <h3 class="text-xl font-bold text-white flex items-center gap-2">
                  <i class="fas fa-store text-white"></i>
                  ${escapeHtml(outlet.outlet)}
                </h3>
                ${reservationStatus ? 
                  `<span class="bg-green-400/30 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    <i class="fas fa-check-circle mr-1"></i> Bisa Booking
                  </span>` : 
                  `<span class="bg-red-400/30 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                    <i class="fas fa-times-circle mr-1"></i> Walk-in Only
                  </span>`
                }
              </div>
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
                    <i class="fas fa-calendar-check mr-1"></i> Status Reservasi
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
              
              <div class="mt-4 grid grid-cols-2 gap-2">
                <button onclick="window.open('${escapeHtml(outlet.map)}', '_blank')" 
                        class="bg-purple-100 text-purple-700 py-2 rounded-xl font-semibold hover:bg-purple-200 transition flex items-center justify-center gap-2 text-sm">
                  <i class="fas fa-map-marker-alt"></i> Maps
                </button>
                ${reservationStatus ? 
                  `<button onclick="redirectToMenu('reservation')" 
                          class="bg-purple-600 text-white py-2 rounded-xl font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2 text-sm">
                    <i class="fas fa-calendar-alt"></i> Booking
                  </button>` : 
                  `<button onclick="window.open('https://wa.me/6281234567890?text=Halo%20Babeh%20Barbershop%2C%20saya%20mau%20tanya%20tentang%20outlet%20${encodeURIComponent(outlet.outlet)}', '_blank')" 
                          class="bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm">
                    <i class="fab fa-whatsapp"></i> Chat
                  </button>`
                }
              </div>
            </div>
          </div>
          `;
        }).join('')}
      </div>
      
      <!-- Footer Info -->
      <div class="mt-8 bg-white rounded-2xl shadow-xl p-6 text-center">
        <p class="text-gray-500 text-sm">
          <i class="fas fa-info-circle text-purple-600 mr-2"></i>
          Untuk informasi lebih lanjut, silakan hubungi admin melalui WhatsApp atau kunjungi outlet terdekat.
        </p>
        <div class="flex justify-center gap-4 mt-4">
          <button onclick="window.open('https://wa.me/6281234567890', '_blank')" 
                  class="bg-green-600 text-white px-6 py-2 rounded-xl font-semibold hover:bg-green-700 transition flex items-center gap-2">
            <i class="fab fa-whatsapp"></i> Chat Admin
          </button>
          <button onclick="redirectToMenu('tentang-kami')" 
                  class="bg-purple-100 text-purple-700 px-6 py-2 rounded-xl font-semibold hover:bg-purple-200 transition flex items-center gap-2">
            <i class="fas fa-arrow-left"></i> Kembali
          </button>
        </div>
      </div>
    </div>
  `;
}

// Fungsi untuk redirect ke menu tertentu
function redirectToMenu(menu) {
  // Cari tombol menu dengan data-menu yang sesuai
  const menuBtn = document.querySelector(`.menu-btn[data-menu="${menu}"]`);
  if (menuBtn) {
    menuBtn.click();
  } else {
    // Fallback: coba cari di mobile menu
    const mobileBtn = document.querySelector(`.mobile-menu-btn[data-menu="${menu}"]`);
    if (mobileBtn) {
      mobileBtn.click();
    }
  }
}

// Ekspos fungsi ke global
window.redirectToMenu = redirectToMenu;

console.log('📁 Modul Outlet siap digunakan!');
