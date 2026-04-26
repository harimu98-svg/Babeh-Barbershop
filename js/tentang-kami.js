// Tentang Kami - Babeh Barbershop
// Mengambil data outlet dari Supabase

let outletSupabaseClient = null;
let outletsData = [];

// Konfigurasi Supabase
const TENTANG_SUPABASE_URL = 'https://intzwjmlypmopzauxeqt.supabase.co';
const TENTANG_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHp3am1seXBtb3B6YXV4ZXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTc5MTIsImV4cCI6MjA3MDI5MzkxMn0.VwwVEDdHtYP5gui4epTcNfLXhPkmfFbRVb5y8mrXJiM';

// Fungsi untuk mendapatkan Supabase client
function getTentangSupabaseClient() {
  if (outletSupabaseClient) return outletSupabaseClient;
  
  if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    outletSupabaseClient = window.supabase.createClient(TENTANG_SUPABASE_URL, TENTANG_SUPABASE_ANON_KEY);
    console.log('✅ Supabase client untuk Tentang Kami berhasil diinisialisasi');
    return outletSupabaseClient;
  }
  
  console.error('❌ Supabase library tidak tersedia');
  return null;
}

// Fungsi untuk mengambil data outlet dari Supabase
async function fetchOutlets() {
  const client = getTentangSupabaseClient();
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
        console.log(`   ${idx + 1}. ${outlet.outlet} - ${outlet.alamat}`);
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
      reservasi: 'Ya'
    },
    {
      outlet: 'Babeh Barbershop Cabang',
      alamat: 'Jl. Boulevard No. 45, Jakarta Utara',
      jam_buka: '10:00',
      jam_tutup: '22:00',
      reservasi: 'Ya'
    },
    {
      outlet: 'Babeh Barbershop Express',
      alamat: 'Mall Grand Indonesia Lt. 3, Jakarta Pusat',
      jam_buka: '10:00',
      jam_tutup: '20:00',
      reservasi: 'Tidak'
    }
  ];
}

// Render halaman Tentang Kami
async function renderTentangKami(container) {
  // Tampilkan loading
  container.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <div class="text-center py-20">
        <i class="fas fa-spinner fa-spin text-4xl text-purple-600"></i>
        <p class="mt-4 text-gray-500">Memuat data...</p>
      </div>
    </div>
  `;
  
  // Ambil data outlet
  outletsData = await fetchOutlets();
  
  // Render konten
  container.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <!-- Hero Section -->
      <div class="relative rounded-2xl overflow-hidden mb-12 shadow-2xl">
        <img src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=1200&h=400&fit=crop" alt="Barbershop" class="w-full h-64 md:h-96 object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
          <div class="p-8 text-white">
            <h2 class="text-3xl md:text-5xl font-bold mb-2">Babeh Barbershop</h2>
            <p class="text-lg md:text-xl opacity-90">Premium Barber & Men's Grooming</p>
          </div>
        </div>
      </div>
      
      <!-- Tentang Kami -->
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
        <h3 class="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <i class="fas fa-info-circle text-purple-600"></i> Tentang Kami
        </h3>
        <p class="text-gray-600 leading-relaxed mb-4">
          Babeh Barbershop hadir sebagai solusi kebutuhan grooming pria modern. 
          Dengan konsep premium dan pelayanan profesional, kami berkomitmen memberikan 
          pengalaman terbaik bagi setiap pelanggan.
        </p>
        <p class="text-gray-600 leading-relaxed">
          Didirikan pada tahun 2020, Babeh Barbershop telah melayani ribuan pelanggan 
          dengan berbagai gaya rambut sesuai tren terkini. Barber kami yang berpengalaman 
          siap memberikan rekomendasi gaya terbaik untuk Anda.
        </p>
      </div>
      
      <!-- Keunggulan -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white rounded-2xl shadow-xl p-6 text-center">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-cut text-purple-600 text-2xl"></i>
          </div>
          <h4 class="text-xl font-bold text-slate-800 mb-2">Barber Profesional</h4>
          <p class="text-gray-500">Tim barber berpengalaman dan tersertifikasi</p>
        </div>
        <div class="bg-white rounded-2xl shadow-xl p-6 text-center">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-spray-can text-purple-600 text-2xl"></i>
          </div>
          <h4 class="text-xl font-bold text-slate-800 mb-2">Produk Premium</h4>
          <p class="text-gray-500">Menggunakan produk berkualitas tinggi</p>
        </div>
        <div class="bg-white rounded-2xl shadow-xl p-6 text-center">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-clock text-purple-600 text-2xl"></i>
          </div>
          <h4 class="text-xl font-bold text-slate-800 mb-2">Fleksibel Waktu</h4>
          <p class="text-gray-500">Buka setiap hari dengan jam operasional fleksibel</p>
        </div>
      </div>
      
      <!-- Outlet & Jam Operasional (dari database) -->
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h3 class="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <i class="fas fa-store text-purple-600"></i> Outlet & Jam Operasional
        </h3>
        <p class="text-gray-500 mb-6">Kunjungi outlet terdekat Anda</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          ${outletsData.map(outlet => `
            <div class="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition">
              <div class="flex items-start gap-3 mb-3">
                <div class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <i class="fas fa-store text-purple-600"></i>
                </div>
                <div>
                  <h4 class="font-bold text-slate-800 text-lg">${escapeHtml(outlet.outlet)}</h4>
                  <p class="text-gray-500 text-sm mt-1">${escapeHtml(outlet.alamat)}</p>
                </div>
              </div>
              <div class="border-t border-gray-100 pt-3 mt-2">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-gray-500 text-sm">
                    <i class="far fa-clock mr-1"></i> Jam Operasional
                  </span>
                  <span class="font-semibold text-slate-700">${escapeHtml(outlet.jam_buka)} - ${escapeHtml(outlet.jam_tutup)}</span>
                </div>
                <div class="flex justify-between items-center">
                  <span class="text-gray-500 text-sm">
                    <i class="fas fa-calendar-check mr-1"></i> Reservasi
                  </span>
                  <span class="${outlet.reservasi === 'Ya' ? 'text-green-600' : 'text-red-600'} font-semibold">
                    ${outlet.reservasi === 'Ya' ? '<i class="fas fa-check-circle mr-1"></i> Bisa Reservasi' : '<i class="fas fa-times-circle mr-1"></i> Walk-in Only'}
                  </span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
        
        <!-- Call to Action -->
        <div class="mt-6 p-4 bg-purple-50 rounded-xl text-center">
          <p class="text-gray-600">
            <i class="fas fa-info-circle text-purple-600 mr-1"></i>
            Untuk reservasi, silakan gunakan menu <strong>Reservasi/Booking</strong> atau hubungi WhatsApp admin.
          </p>
        </div>
      </div>
    </div>
  `;
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

console.log('📁 Modul Tentang Kami siap digunakan!');
