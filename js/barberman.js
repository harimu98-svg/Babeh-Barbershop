// barberman.js - Halaman Barberman Babeh Barbershop

let barbermanData = [];

// Fungsi untuk mengambil data barberman dari Supabase
async function fetchBarberman() {
  // Gunakan single instance dari supabase-config.js
  const supabase = window.getSupabaseClient ? window.getSupabaseClient() : null;
  
  if (!supabase) {
    console.error('❌ Supabase client tidak tersedia, menggunakan data dummy');
    return getDummyBarberman();
  }
  
  try {
    console.log('📋 Mengambil data barberman dari database...');
    
    const { data, error } = await supabase
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
        console.log(`   ${idx + 1}. ${barber.nama_karyawan} - ${barber.spesialisasi || 'Spesialisasi belum diisi'}`);
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
  // Jika container tidak ditemukan, coba cari atau buat
  if (!container) {
    console.warn('⚠️ Container tidak ditemukan, mencoba mencari atau membuat...');
    container = document.getElementById('barberman-container');
    
    if (!container) {
      container = document.querySelector('.barberman-section') || 
                  document.querySelector('[data-barberman]');
    }
    
    if (!container) {
      console.log('📦 Membuat container barberman otomatis...');
      container = document.createElement('div');
      container.id = 'barberman-container';
      container.className = 'container mx-auto px-4 py-8';
      
      const mainContent = document.querySelector('main') || document.body;
      const aboutSection = document.querySelector('#tentang-kami, .about-section, [data-section="about"]');
      
      if (aboutSection && aboutSection.parentNode) {
        aboutSection.parentNode.insertBefore(container, aboutSection.nextSibling);
      } else {
        mainContent.appendChild(container);
      }
      
      console.log('✅ Container barberman dibuat otomatis');
    }
  }
  
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
  
  // Render konten - TANPA STATISTIK
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
      
      <!-- Search/Filter Bar -->
      <div class="bg-white rounded-2xl shadow-xl p-4 mb-8">
        <div class="flex flex-col md:flex-row gap-4">
          <div class="flex-1 relative">
            <i class="fas fa-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input type="text" id="searchBarberman" placeholder="Cari barberman berdasarkan nama..." 
                   class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent">
          </div>
          <div class="flex gap-2">
            <select id="filterSpesialisasi" class="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">Semua Spesialisasi</option>
              ${[...new Set(barbermanData.map(b => b.spesialisasi).filter(s => s && s.trim() !== ''))].map(s => 
                `<option value="${escapeHtml(s)}">${escapeHtml(s)}</option>`
              ).join('')}
            </select>
            <select id="filterOutlet" class="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="">Semua Outlet</option>
              ${[...new Set(barbermanData.map(b => b.outlet).filter(o => o && o.trim() !== ''))].map(o => 
                `<option value="${escapeHtml(o)}">${escapeHtml(o)}</option>`
              ).join('')}
            </select>
          </div>
        </div>
      </div>
      
      <!-- Grid Barberman -->
      <div id="barbermanGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${renderBarbermanCards(barbermanData)}
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
  
  // Tambahkan event listener untuk search dan filter
  const searchInput = document.getElementById('searchBarberman');
  const filterSpesialisasi = document.getElementById('filterSpesialisasi');
  const filterOutlet = document.getElementById('filterOutlet');
  
  if (searchInput && filterSpesialisasi && filterOutlet) {
    function filterBarberman() {
      const searchTerm = searchInput.value.toLowerCase();
      const spesialisasi = filterSpesialisasi.value;
      const outlet = filterOutlet.value;
      
      const filtered = barbermanData.filter(barber => {
        const matchName = barber.nama_karyawan?.toLowerCase().includes(searchTerm) || false;
        const matchSpesialisasi = !spesialisasi || barber.spesialisasi === spesialisasi;
        const matchOutlet = !outlet || barber.outlet === outlet;
        return matchName && matchSpesialisasi && matchOutlet;
      });
      
      const grid = document.getElementById('barbermanGrid');
      if (filtered.length === 0) {
        grid.innerHTML = `
          <div class="col-span-full text-center py-12">
            <i class="fas fa-user-slash text-6xl text-gray-300 mb-4"></i>
            <p class="text-gray-500">Tidak ada barberman yang sesuai dengan filter</p>
          </div>
        `;
      } else {
        grid.innerHTML = renderBarbermanCards(filtered);
      }
    }
    
    searchInput.addEventListener('input', filterBarberman);
    filterSpesialisasi.addEventListener('change', filterBarberman);
    filterOutlet.addEventListener('change', filterBarberman);
  }
  
  console.log(`✅ Halaman Barberman selesai dirender dengan ${barbermanData.length} data`);
}

// Fungsi untuk render card barberman
function renderBarbermanCards(barbers) {
  return barbers.map((barber, index) => {
    let photoUrl = barber.photo_url;
    if (photoUrl && !photoUrl.startsWith('http')) {
      const baseUrl = 'https://intzwjmlypmopzauxeqt.supabase.co/storage/v1/object/public/fotokaryawan/';
      photoUrl = baseUrl + photoUrl.replace(/^\/+/, '');
    }
    
    const colors = ['from-purple-500 to-purple-700', 'from-blue-500 to-blue-700', 'from-green-500 to-green-700', 'from-red-500 to-red-700', 'from-orange-500 to-orange-700', 'from-pink-500 to-pink-700'];
    const colorIndex = index % colors.length;
    
    const nama = barber.nama_karyawan || 'Nama tidak tersedia';
    const spesialisasi = barber.spesialisasi || 'Spesialisasi belum diisi';
    const outlet = barber.outlet || 'Outlet belum diisi';
    const pengalaman = barber.pengalaman || 'Pengalaman belum diisi';
    
    return `
    <div class="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 barberman-card">
      <div class="h-64 overflow-hidden bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center relative">
        ${photoUrl ? 
          `<img src="${photoUrl}" alt="${escapeHtml(nama)}" 
               class="w-full h-full object-cover" 
               onerror="this.onerror=null; this.parentElement.innerHTML = '<div class=\\'text-center text-white\\'><i class=\\'fas fa-user-tie text-6xl mb-2\\'></i><p class=\\'text-sm\\'>Foto tidak tersedia</p></div>';">` :
          `<div class="text-center text-white">
            <i class="fas fa-user-tie text-6xl mb-2"></i>
            <p class="text-sm">Foto tidak tersedia</p>
          </div>`
        }
      </div>
      <div class="p-5 text-center">
        <h3 class="text-xl font-bold text-slate-800">${escapeHtml(nama)}</h3>
        <p class="text-purple-600 font-semibold mt-1">${escapeHtml(outlet)}</p>
        
        <div class="mt-3 space-y-2 text-left">
          <div class="flex justify-between items-center border-b border-gray-100 pb-2">
            <span class="text-gray-500 text-sm">
              <i class="fas fa-cut text-purple-400 mr-2"></i> Spesialisasi
            </span>
            <span class="font-medium text-slate-700 text-sm">${escapeHtml(spesialisasi)}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-500 text-sm">
              <i class="fas fa-clock text-purple-400 mr-2"></i> Pengalaman
            </span>
            <span class="font-medium text-slate-700 text-sm">${escapeHtml(pengalaman)}</span>
          </div>
        </div>
        
        <div class="mt-4 grid grid-cols-2 gap-2">
          <button onclick="redirectToMenu('reservation')" 
                  class="bg-purple-600 text-white py-2 rounded-xl font-semibold hover:bg-purple-700 transition flex items-center justify-center gap-2 text-sm">
            <i class="fas fa-calendar-check"></i> Book Now
          </button>
          <button onclick="window.open('https://wa.me/6281234567890?text=Halo%20Babeh%20Barbershop%2C%20saya%20mau%20booking%20dengan%20${encodeURIComponent(nama)}', '_blank')" 
                  class="bg-green-600 text-white py-2 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2 text-sm">
            <i class="fab fa-whatsapp"></i> Chat
          </button>
        </div>
      </div>
    </div>
    `;
  }).join('');
}

// Fungsi untuk redirect ke menu tertentu
function redirectToMenu(menu) {
  const menuBtn = document.querySelector(`.menu-btn[data-menu="${menu}"]`);
  if (menuBtn) {
    menuBtn.click();
  } else {
    const mobileBtn = document.querySelector(`.mobile-menu-btn[data-menu="${menu}"]`);
    if (mobileBtn) {
      mobileBtn.click();
    }
  }
}

// Ekspos fungsi ke global
window.redirectToMenu = redirectToMenu;
window.renderBarberman = renderBarberman;

console.log('📁 Modul Barberman siap digunakan!');
