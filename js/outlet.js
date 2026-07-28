// barberman.js - Halaman Barberman Babeh Barbershop

// Mengambil data barberman dari Supabase
let barbermanSupabaseClient = null;
let barbermanData = [];

// Konfigurasi Supabase - SAMA dengan outlet.js
const BARBERMAN_SUPABASE_URL = 'https://intzwjmlypmopzauxeqt.supabase.co';
const BARBERMAN_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHp3am1seXBtb3B6YXV4ZXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTc5MTIsImV4cCI6MjA3MDI5MzkxMn0.VwwVEDdHtYP5gui4epTcNfLXhPkmfFbRVb5y8mrXJiM';

// Fungsi untuk mendapatkan Supabase client
function getBarbermanSupabaseClient() {
  if (barbermanSupabaseClient) return barbermanSupabaseClient;
  
  // Cek apakah Supabase tersedia di window
  if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    try {
      barbermanSupabaseClient = window.supabase.createClient(
        BARBERMAN_SUPABASE_URL, 
        BARBERMAN_SUPABASE_ANON_KEY,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false
          }
        }
      );
      console.log('✅ Supabase client untuk Barberman berhasil diinisialisasi');
      return barbermanSupabaseClient;
    } catch (error) {
      console.error('❌ Gagal membuat Supabase client:', error);
      return null;
    }
  }
  
  console.error('❌ Supabase library tidak tersedia');
  return null;
}

// Fungsi untuk mengambil data barberman dari Supabase
async function fetchBarberman() {
  const client = getBarbermanSupabaseClient();
  if (!client) {
    console.error('❌ Supabase client tidak tersedia, menggunakan data dummy');
    return getDummyBarberman();
  }
  
  try {
    console.log('📋 Mengambil data barberman dari database...');
    
    const { data, error } = await client
      .from('karyawan')
      .select('*')
      .eq('role', 'barberman')
      .order('id', { ascending: true });
    
    if (error) {
      console.error('Error fetching barberman:', error);
      console.log('⚠️ Menggunakan data dummy sebagai fallback');
      return getDummyBarberman();
    }
    
    if (data && data.length > 0) {
      console.log(`✅ Ditemukan ${data.length} barberman dari database`);
      data.forEach((barber, idx) => {
        console.log(`   ${idx + 1}. ${barber.nama_karyawan} - ${barber.spesialisasi}`);
      });
      return data;
    }
    
    console.log('⚠️ Tidak ada data barberman di database, menggunakan data dummy');
    return getDummyBarberman();
  } catch (err) {
    console.error('❌ Database error:', err);
    console.log('⚠️ Menggunakan data dummy sebagai fallback');
    return getDummyBarberman();
  }
}

// Data dummy jika Supabase tidak bisa diakses
function getDummyBarberman() {
  console.log('📦 Menggunakan data dummy barberman');
  return [
    {
      nama_karyawan: 'Dimas Pratama',
      spesialisasi: 'Master Barber',
      outlet: 'Babeh Barbershop Pusat',
      pengalaman: '8 tahun',
      photo_url: 'barber1.jpg'
    },
    {
      nama_karyawan: 'Rizki Hidayat',
      spesialisasi: 'Hair Stylist',
      outlet: 'Babeh Barbershop Cabang',
      pengalaman: '5 tahun',
      photo_url: 'barber2.jpg'
    },
    {
      nama_karyawan: 'Andi Wijaya',
      spesialisasi: 'Color Specialist',
      outlet: 'Babeh Barbershop Express',
      pengalaman: '6 tahun',
      photo_url: 'barber3.jpg'
    }
  ];
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Render halaman Barberman
async function renderBarberman(container) {
  // Tampilkan loading
  container.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <div class="text-center py-20">
        <i class="fas fa-spinner fa-spin text-4xl text-purple-600"></i>
        <p class="mt-4 text-gray-500">Memuat data barberman...</p>
      </div>
    </div>
  `;
  
  // Ambil data barberman
  barbermanData = await fetchBarberman();
  
  // Render konten
  container.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <!-- Header Barberman -->
      <div class="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <i class="fas fa-users text-3xl"></i>
          </div>
          <div>
            <h2 class="text-3xl font-bold">Meet Our Barbers</h2>
            <p class="text-purple-200 mt-1">Tim profesional yang siap memberikan pelayanan terbaik</p>
          </div>
        </div>
      </div>
      
      <!-- Statistik Barberman -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div class="bg-white rounded-2xl shadow-xl p-4 text-center">
          <div class="text-2xl font-bold text-purple-600">${barbermanData.length}</div>
          <div class="text-gray-500 text-sm">Total Barber</div>
        </div>
        <div class="bg-white rounded-2xl shadow-xl p-4 text-center">
          <div class="text-2xl font-bold text-blue-600">${new Set(barbermanData.map(b => b.spesialisasi)).size}</div>
          <div class="text-gray-500 text-sm">Spesialisasi</div>
        </div>
        <div class="bg-white rounded-2xl shadow-xl p-4 text-center">
          <div class="text-2xl font-bold text-green-600">${new Set(barbermanData.map(b => b.outlet)).size}</div>
          <div class="text-gray-500 text-sm">Outlet</div>
        </div>
        <div class="bg-white rounded-2xl shadow-xl p-4 text-center">
          <div class="text-2xl font-bold text-orange-600">${barbermanData.reduce((acc, b) => acc + parseInt(b.pengalaman || 0), 0) || '-'}</div>
          <div class="text-gray-500 text-sm">Total Pengalaman</div>
        </div>
      </div>
      
      <!-- Grid Barberman -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${barbermanData.map((barber, index) => {
          // Validasi URL foto
          let photoUrl = barber.photo_url;
          if (photoUrl && !photoUrl.startsWith('http')) {
            const baseUrl = 'https://intzwjmlypmopzauxeqt.supabase.co/storage/v1/object/public/fotokaryawan/';
            photoUrl = baseUrl + photoUrl.replace(/^\/+/, '');
          }
          
          const colors = ['from-purple-500 to-purple-700', 'from-blue-500 to-blue-700', 'from-green-500 to-green-700', 'from-red-500 to-red-700', 'from-orange-500 to-orange-700', 'from-pink-500 to-pink-700'];
          const colorIndex = index % colors.length;
          
          return `
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 barberman-card">
            <div class="h-64 overflow-hidden bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center relative">
              ${photoUrl ? 
                `<img src="${photoUrl}" alt="${barber.nama_karyawan || 'Barberman'}" 
                     class="w-full h-full object-cover" 
                     onerror="this.onerror=null; this.parentElement.innerHTML = '<div class=\\'text-center text-white\\'><i class=\\'fas fa-user-tie text-6xl mb-2\\'></i><p class=\\'text-sm\\'>Foto tidak tersedia</p></div>';">` :
                `<div class="text-center text-white">
                  <i class="fas fa-user-tie text-6xl mb-2"></i>
                  <p class="text-sm">Foto tidak tersedia</p>
                </div>`
              }
            </div>
            <div class="p-5 text-center">
              <h3 class="text-xl font-bold text-slate-800">${escapeHtml(barber.nama_karyawan || 'Nama tidak tersedia')}</h3>
              <p class="text-purple-600 font-semibold mt-1">${escapeHtml(barber.spesialisasi || 'Spesialisasi tidak tersedia')}</p>
              
              <div class="mt-3 space-y-2 text-left">
                <div class="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span class="text-gray-500 text-sm">
                    <i class="fas fa-store text-purple-400 mr-2"></i> Outlet
                  </span>
                  <span class="font-medium text-slate-700 text-sm">${escapeHtml(barber.outlet || '-')}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-500 text-sm">
                    <i class="fas fa-clock text-purple-400 mr-2"></i> Pengalaman
                  </span>
                  <span class="font-medium text-slate-700 text-sm">${escapeHtml(barber.pengalaman || '-')}</span>
                </div>
              </div>
              
              <div class="mt-4 grid grid-cols-2 gap-2">
                <button onclick="redirectToMenu('reservation')" 
                        class="bg-purple-600 text-white py-2 rounded-xl font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2 text-sm">
                  <i class="fas fa-calendar-check"></i> Book Now
                </button>
                <button onclick="window.open('https://wa.me/6281234567890?text=Halo%20Babeh%20Barbershop%2C%20saya%20mau%20booking%20dengan%20${encodeURIComponent(barber.nama_karyawan || 'Barberman')}', '_blank')" 
                        class="bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm">
                  <i class="fab fa-whatsapp"></i> Chat
                </button>
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
          Untuk informasi lebih lanjut atau booking, silakan hubungi kami melalui WhatsApp atau gunakan fitur reservasi.
        </p>
        <div class="flex flex-col sm:flex-row justify-center gap-4 mt-4">
          <button onclick="window.open('https://wa.me/6281234567890', '_blank')" 
                  class="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
            <i class="fab fa-whatsapp text-xl"></i> Chat Admin
          </button>
          <button onclick="redirectToMenu('reservation')" 
                  class="bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2">
            <i class="fas fa-calendar-alt text-xl"></i> Buat Reservasi
          </button>
        </div>
      </div>
    </div>
  `;
  
  console.log(`✅ Halaman Barberman selesai dirender dengan ${barbermanData.length} data`);
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

console.log('📁 Modul Barberman siap digunakan!');
