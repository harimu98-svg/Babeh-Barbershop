// Barberman / Barber Profile
async function renderBarberman(container) {
  // Pastikan container valid
  if (!container) {
    console.error('Container tidak ditemukan');
    return;
  }

  // Menampilkan loading state
  container.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold text-purple-800 mb-2">Meet Our Barbers</h2>
        <p class="text-gray-500">Tim profesional yang siap memberikan pelayanan terbaik</p>
      </div>
      <div class="flex justify-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    </div>
  `;

  try {
    // Cek apakah supabase tersedia
    if (typeof supabase === 'undefined') {
      throw new Error('Supabase tidak terdefinisi. Pastikan library supabase sudah di-load.');
    }

    console.log('Mengambil data barberman dari Supabase...');

    // Ambil data dari Supabase
    const { data: barbers, error } = await supabase
      .from('karyawan')
      .select('*')
      .eq('role', 'barberman');

    // Log untuk debugging
    console.log('Data dari Supabase:', { barbers, error });

    if (error) {
      console.error('Error detail:', error);
      throw new Error(`Error dari Supabase: ${error.message || JSON.stringify(error)}`);
    }

    if (!barbers || barbers.length === 0) {
      container.innerHTML = `
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl font-bold text-purple-800 mb-2">Meet Our Barbers</h2>
            <p class="text-gray-500">Tim profesional yang siap memberikan pelayanan terbaik</p>
          </div>
          <div class="text-center py-12">
            <p class="text-gray-500">Belum ada barberman yang tersedia saat ini.</p>
            <p class="text-gray-400 text-sm mt-2">Pastikan tabel karyawan memiliki data dengan role = 'barberman'</p>
          </div>
        </div>
      `;
      return;
    }

    // Render data barberman
    container.innerHTML = `
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-purple-800 mb-2">Meet Our Barbers</h2>
          <p class="text-gray-500">Tim profesional yang siap memberikan pelayanan terbaik</p>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          ${barbers.map(barber => {
            // Validasi URL foto
            let photoUrl = barber.photo_url;
            
            // Jika photo_url tidak lengkap, tambahkan base URL
            if (photoUrl && !photoUrl.startsWith('http')) {
              // Asumsikan ini adalah path relatif di bucket
              const baseUrl = 'https://intzwjmlypmopzauxeqt.supabase.co/storage/v1/object/public/fotokaryawan/';
              photoUrl = baseUrl + photoUrl.replace(/^\/+/, ''); // Remove leading slash
            }
            
            return `
            <div class="barberman-card bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div class="h-56 overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center relative">
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
              <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-slate-800">${barber.nama_karyawan || 'Nama tidak tersedia'}</h3>
                <p class="text-purple-600 font-semibold mt-1">${barber.spesialisasi || 'Spesialisasi tidak tersedia'}</p>
                <div class="mt-2 space-y-1">
                  <p class="text-gray-500 text-sm">
                    <i class="fas fa-store text-purple-400 mr-1"></i>
                    Outlet: ${barber.outlet || '-'}
                  </p>
                  <p class="text-gray-500 text-sm">
                    <i class="fas fa-clock text-purple-400 mr-1"></i>
                    Pengalaman: ${barber.pengalaman || '-'}
                  </p>
                </div>
                <button class="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition transform hover:scale-105">
                  <i class="fas fa-calendar-check mr-2"></i>
                  Book This Barber
                </button>
              </div>
            </div>
          `}).join('')}
        </div>
        
        <div class="mt-10 text-center">
          <button onclick="document.querySelector('[data-menu=\\'reservation\\']').click()" 
                  class="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition transform hover:scale-105">
            <i class="fas fa-cut mr-2"></i>
            Buat Reservasi
          </button>
        </div>
      </div>
    `;

  } catch (error) {
    console.error('Error lengkap:', error);
    
    // Tampilkan error detail di UI untuk debugging
    container.innerHTML = `
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-purple-800 mb-2">Meet Our Barbers</h2>
          <p class="text-gray-500">Tim profesional yang siap memberikan pelayanan terbaik</p>
        </div>
        <div class="text-center py-12">
          <div class="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
            <i class="fas fa-exclamation-triangle text-red-500 text-3xl mb-3"></i>
            <p class="text-red-600 font-semibold">⚠️ Gagal memuat data barberman</p>
            <p class="text-red-500 text-sm mt-2">${error.message || 'Terjadi kesalahan yang tidak diketahui'}</p>
            <button onclick="renderBarberman(document.querySelector('#barberman-container') || document.querySelector('.barberman-section'))" 
                    class="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
              <i class="fas fa-sync mr-2"></i>
              Muat Ulang
            </button>
          </div>
        </div>
      </div>
    `;
  }
}

// Fungsi untuk inisialisasi dengan container ID
async function initBarberman(containerId = 'barberman-container') {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container dengan ID "${containerId}" tidak ditemukan`);
    return;
  }
  await renderBarberman(container);
}

// Fungsi untuk cek koneksi Supabase
async function checkSupabaseConnection() {
  try {
    if (typeof supabase === 'undefined') {
      console.error('Supabase tidak terdefinisi');
      return false;
    }
    
    const { data, error } = await supabase
      .from('karyawan')
      .select('count')
      .limit(1);
      
    if (error) {
      console.error('Gagal konek ke Supabase:', error);
      return false;
    }
    
    console.log('Koneksi Supabase berhasil');
    return true;
  } catch (error) {
    console.error('Error cek koneksi:', error);
    return false;
  }
}

// Auto-run ketika halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
  // Cari container dengan berbagai kemungkinan ID/class
  const container = document.getElementById('barberman-container') || 
                   document.querySelector('.barberman-section') ||
                   document.querySelector('[data-barberman]');
  
  if (container) {
    renderBarberman(container);
  } else {
    console.warn('Container barberman tidak ditemukan. Pastikan ada elemen dengan ID "barberman-container"');
  }
});
