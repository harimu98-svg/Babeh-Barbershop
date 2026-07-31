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
      .order('outlet', { ascending: true });
    
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
    { outlet: 'Babeh Barbershop Pusat', layanan: 'Haircut Classic', harga: 50000, waktu: '30 menit', deskripsi: 'Potong rambut klasik' },
    { outlet: 'Babeh Barbershop Pusat', layanan: 'Haircut + Hair Wash', harga: 70000, waktu: '45 menit', deskripsi: 'Potong rambut + cuci rambut' },
    { outlet: 'Babeh Barbershop Cabang', layanan: 'Beard Shaving', harga: 35000, waktu: '20 menit', deskripsi: 'Cukur jenggot' },
    { outlet: 'Babeh Barbershop Cabang', layanan: 'Hair Tattoo', harga: 100000, waktu: '60 menit', deskripsi: 'Tato rambut' },
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
      </div>
      
      <!-- Filter Outlet -->
      <div class="bg-white rounded-2xl shadow-xl p-4 mb-6">
        <div class="flex flex-col md:flex-row gap-4 items-center">
          <label class="font-semibold text-slate-700">Filter Outlet:</label>
          <select id="priceOutletFilter" class="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 flex-1">
            <option value="">Semua Outlet</option>
            ${outlets.map(o => `<option value="${o}">${o}</option>`).join('')}
          </select>
        </div>
      </div>
      
      <!-- Services by Outlet -->
      ${outlets.filter(o => !priceServicesOutletFilter || o === priceServicesOutletFilter).map(outlet => {
        const outletServices = priceServicesData.filter(s => s.outlet === outlet);
        return `
          <div class="mb-8">
            <div class="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl shadow-xl p-4 mb-4 text-white">
              <h3 class="text-xl font-bold flex items-center gap-2">
                <i class="fas fa-store"></i> ${outlet}
              </h3>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              ${outletServices.map(service => `
                <div class="service-card bg-white rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all duration-300">
                  <div class="flex items-center gap-4">
                    <div class="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                      <i class="fas fa-cut text-purple-600 text-2xl"></i>
                    </div>
                    <div class="flex-1">
                      <h4 class="text-lg font-bold text-slate-800">${service.layanan}</h4>
                      <p class="text-gray-500 text-sm">${service.waktu}</p>
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
      
      <div class="mt-8 bg-gradient-to-r from-purple-100 to-purple-50 rounded-2xl p-6 text-center">
        <p class="text-gray-600">*Harga sudah termasuk pajak. Untuk reservasi silakan hubungi kami.</p>
        <button onclick="window.location.hash='reservation'" 
                class="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition">
          Reservasi Sekarang
        </button>
      </div>
    </div>
  `;
  
  // Event listener untuk filter
  document.getElementById('priceOutletFilter')?.addEventListener('change', (e) => {
    priceServicesOutletFilter = e.target.value;
    renderPriceServicesContent(container);
  });
}

console.log('📁 Modul Price & Services siap digunakan!');
