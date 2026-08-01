// Price & Services
let priceServicesData = [];
let priceServicesOutletFilter = '';

async function renderPriceServices(container) {
  // Tampilkan loading
  container.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <div class="text-center py-20">
        <i class="fas fa-spinner fa-spin text-4xl text-purple-600"></i>
        <p class="mt-4 text-gray-500">Memuat data layanan...</p>
      </div>
    </div>
  `;
  
  // Ambil data dari Supabase
  const supabase = window.getSupabaseClient ? window.getSupabaseClient() : null;
  
  if (!supabase) {
    console.error('❌ Supabase client tidak tersedia');
    showDummyPriceServices(container);
    return;
  }
  
  try {
    console.log('📋 Mengambil data layanan reservasi...');
    
    const { data, error } = await supabase
      .from('layanan_reservasi')
      .select('*')
      .order('harga', { ascending: true }); // Urutkan dari harga termurah
    
    if (error) {
      console.error('Error fetching services:', error);
      showDummyPriceServices(container);
      return;
    }
    
    if (data && data.length > 0) {
      console.log(`✅ Ditemukan ${data.length} layanan`);
      priceServicesData = data;
      renderPriceServicesContent(container);
    } else {
      console.log('⚠️ Tidak ada data layanan, menggunakan dummy');
      showDummyPriceServices(container);
    }
  } catch (err) {
    console.error('❌ Database error:', err);
    showDummyPriceServices(container);
  }
}

function showDummyPriceServices(container) {
  const dummyServices = [
    { outlet: 'Babeh Barbershop Pusat', layanan: 'Beard Shaving', harga: 35000, waktu: '20 menit', deskripsi: 'Cukur jenggot' },
    { outlet: 'Babeh Barbershop Pusat', layanan: 'Haircut Classic', harga: 50000, waktu: '30 menit', deskripsi: 'Potong rambut klasik' },
    { outlet: 'Babeh Barbershop Pusat', layanan: 'Haircut + Hair Wash', harga: 70000, waktu: '45 menit', deskripsi: 'Potong rambut + cuci rambut' },
    { outlet: 'Babeh Barbershop Cabang', layanan: 'Hair Tattoo', harga: 100000, waktu: '60 menit', deskripsi: 'Tato rambut' },
    { outlet: 'Babeh Barbershop Cabang', layanan: 'Hair Coloring', harga: 150000, waktu: '90 menit', deskripsi: 'Pewarnaan rambut' },
    { outlet: 'Babeh Barbershop Cabang', layanan: 'Royal Package', harga: 200000, waktu: '120 menit', deskripsi: 'Paket lengkap' },
  ];
  priceServicesData = dummyServices;
  renderPriceServicesContent(container);
}

function renderPriceServicesContent(container) {
  // Ambil daftar outlet unik
  const outlets = [...new Set(priceServicesData.map(s => s.outlet))];
  
  // Filter berdasarkan outlet yang dipilih
  const filteredData = priceServicesOutletFilter 
    ? priceServicesData.filter(s => s.outlet === priceServicesOutletFilter)
    : priceServicesData;
  
  container.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold text-purple-800 mb-2">Price & Services</h2>
        <p class="text-gray-500">Layanan terbaik dengan harga terjangkau</p>
        <p class="text-sm text-gray-400 mt-2 max-w-2xl mx-auto">
          <i class="fas fa-info-circle text-purple-500 mr-1"></i>
          Harga service yang tertera hanya untuk layanan booking/reservasi, 
          untuk layanan langsung datang (walk in) di Outlet Babeh Barbershop lebih beragam dan harga jauh lebih murah.
        </p>
      </div>
      
      <!-- Filter Outlet - Posisi Tengah -->
      <div class="bg-white rounded-2xl shadow-xl p-4 mb-6 max-w-md mx-auto">
        <div class="flex flex-col md:flex-row gap-4 items-center justify-center">
          <label class="font-semibold text-slate-700">Filter Outlet:</label>
          <select id="priceOutletFilter" class="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 flex-1 min-w-[200px]">
            <option value="">Semua Outlet</option>
            ${outlets.map(o => `<option value="${o}">${o}</option>`).join('')}
          </select>
        </div>
      </div>
      
      <!-- Services by Outlet -->
      ${outlets.filter(o => !priceServicesOutletFilter || o === priceServicesOutletFilter).map(outlet => {
        const outletServices = priceServicesData
          .filter(s => s.outlet === outlet)
          .sort((a, b) => a.harga - b.harga); // Urutkan dari termurah
        
        return `
          <div class="mb-8">
            <div class="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl shadow-xl p-4 mb-4 text-white text-center">
              <h3 class="text-xl font-bold flex items-center justify-center gap-2">
                <i class="fas fa-store"></i> ${outlet}
              </h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${outletServices.map(service => `
                <div class="service-card bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                  <div class="flex items-center gap-4">
                    <div class="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center flex-shrink-0">
                      <i class="fas fa-cut text-purple-600 text-2xl"></i>
                    </div>
                    <div class="flex-1">
                      <h4 class="text-lg font-bold text-slate-800">${service.layanan}</h4>
                      <p class="text-gray-500 text-sm">
                        <i class="far fa-clock text-purple-500 mr-1"></i>
                        Estimasi waktu: ${service.waktu}
                      </p>
                      ${service.deskripsi ? `<p class="text-gray-400 text-xs mt-1">${service.deskripsi}</p>` : ''}
                    </div>
                    <div class="text-right">
                      <p class="text-2xl font-bold text-purple-600">Rp ${service.harga.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }).join('')}
      
      <!-- Tombol Aksi -->
      <div class="mt-8 bg-gradient-to-r from-purple-100 to-purple-50 rounded-2xl p-6 text-center">
        <p class="text-gray-600 text-sm mb-4">*Harga sudah termasuk pajak. Untuk reservasi silakan hubungi kami.</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button onclick="redirectToMenu('reservation')" 
                  class="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition inline-flex items-center justify-center gap-2">
            <i class="fas fa-calendar-check"></i> Reservasi Sekarang
          </button>
          <button onclick="window.open('https://wa.me/6282210017083', '_blank')" 
                  class="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition inline-flex items-center justify-center gap-2">
            <i class="fab fa-whatsapp"></i> Chat Admin
          </button>
        </div>
      </div>
    </div>
  `;
  
  // Event listener untuk filter
  document.getElementById('priceOutletFilter')?.addEventListener('change', (e) => {
    priceServicesOutletFilter = e.target.value;
    renderPriceServicesContent(container);
  });
}

// Fungsi redirect ke menu
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

// Ekspos ke global
window.redirectToMenu = redirectToMenu;

console.log('📁 Modul Price & Services siap digunakan!');
