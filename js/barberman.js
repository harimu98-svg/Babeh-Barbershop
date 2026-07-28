// Barberman / Barber Profile
async function renderBarberman(container) {
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
    // Ambil data dari Supabase
    const { data: barbers, error } = await supabase
      .from('karyawan')
      .select('*')
      .eq('role', 'barberman');

    if (error) throw error;

    if (!barbers || barbers.length === 0) {
      container.innerHTML = `
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-8">
            <h2 class="text-3xl md:text-4xl font-bold text-purple-800 mb-2">Meet Our Barbers</h2>
            <p class="text-gray-500">Tim profesional yang siap memberikan pelayanan terbaik</p>
          </div>
          <div class="text-center py-12">
            <p class="text-gray-500">Belum ada barberman yang tersedia saat ini.</p>
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
          ${barbers.map(barber => `
            <div class="barberman-card bg-white rounded-2xl shadow-xl overflow-hidden">
              <div class="h-56 overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                ${barber.photo_url ? 
                  `<img src="${barber.photo_url}" alt="${barber.nama_karyawan}" class="w-full h-full object-cover" 
                       onerror="this.onerror=null; this.parentElement.innerHTML = '<i class=\\'fas fa-user-tie text-white text-6xl\\'></i>';">` :
                  `<i class="fas fa-user-tie text-white text-6xl"></i>`
                }
              </div>
              <div class="p-6 text-center">
                <h3 class="text-xl font-bold text-slate-800">${barber.nama_karyawan || 'Nama tidak tersedia'}</h3>
                <p class="text-purple-600 font-semibold mt-1">${barber.spesialisasi || 'Spesialisasi tidak tersedia'}</p>
                <p class="text-gray-500 text-sm mt-2">Outlet: ${barber.outlet || '-'}</p>
                <p class="text-gray-500 text-sm">Pengalaman: ${barber.pengalaman || '-'}</p>
                <button class="mt-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition">
                  Book This Barber
                </button>
              </div>
            </div>
          `).join('')}
        </div>
        
        <div class="mt-8 text-center">
          <button onclick="document.querySelector('[data-menu=\\'reservation\\']').click()" 
                  class="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition">
            Buat Reservasi
          </button>
        </div>
      </div>
    `;

  } catch (error) {
    console.error('Error fetching barberman data:', error);
    container.innerHTML = `
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-8">
          <h2 class="text-3xl md:text-4xl font-bold text-purple-800 mb-2">Meet Our Barbers</h2>
          <p class="text-gray-500">Tim profesional yang siap memberikan pelayanan terbaik</p>
        </div>
        <div class="text-center py-12">
          <p class="text-red-500">Gagal memuat data barberman. Silakan coba lagi.</p>
          <button onclick="renderBarberman(document.getElementById('${container.id || 'barberman-container'}'))" 
                  class="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition">
            Muat Ulang
          </button>
        </div>
      </div>
    `;
  }
}
