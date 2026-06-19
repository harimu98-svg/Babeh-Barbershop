// Tentang Kami - Babeh Barbershop
// Halaman utama dengan card yang bisa diklik

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

// Render halaman Tentang Kami
async function renderTentangKami(container) {
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
      
      <!-- Card Keunggulan (5 item yang bisa diklik) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <!-- Barber Profesional -> barberman.js -->
        <div class="bg-white rounded-2xl shadow-xl p-4 text-center cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 service-card" 
             onclick="redirectToMenu('barberman')">
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-purple-200 transition">
            <i class="fas fa-cut text-purple-600 text-xl"></i>
          </div>
          <h4 class="text-md font-bold text-slate-800 mb-1">Barber Profesional</h4>
          <p class="text-gray-500 text-xs">Tim berpengalaman & tersertifikasi</p>
          <div class="mt-2 text-purple-600 text-xs font-semibold">
            Klik untuk lihat <i class="fas fa-arrow-right ml-1"></i>
          </div>
        </div>
        
        <!-- Harga Terjangkau -> price-services.js -->
        <div class="bg-white rounded-2xl shadow-xl p-4 text-center cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 service-card" 
             onclick="redirectToMenu('price-services')">
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-tag text-purple-600 text-xl"></i>
          </div>
          <h4 class="text-md font-bold text-slate-800 mb-1">Harga Terjangkau</h4>
          <p class="text-gray-500 text-xs">Kualitas premium harga bersahabat</p>
          <div class="mt-2 text-purple-600 text-xs font-semibold">
            Klik untuk lihat <i class="fas fa-arrow-right ml-1"></i>
          </div>
        </div>
        
        <!-- Booking Online -> reservation.js -->
        <div class="bg-white rounded-2xl shadow-xl p-4 text-center cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 service-card" 
             onclick="redirectToMenu('reservation')">
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-calendar-check text-purple-600 text-xl"></i>
          </div>
          <h4 class="text-md font-bold text-slate-800 mb-1">Booking Online</h4>
          <p class="text-gray-500 text-xs">Reservasi/Booking online mudah</p>
          <div class="mt-2 text-purple-600 text-xs font-semibold">
            Klik untuk reservasi <i class="fas fa-arrow-right ml-1"></i>
          </div>
        </div>
        
        <!-- Membercard Exclusive -->
        <div class="bg-white rounded-2xl shadow-xl p-4 text-center cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 service-card" 
             onclick="alert('Fitur Membercard Exclusive sedang dalam pengembangan!')">
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-id-card text-purple-600 text-xl"></i>
          </div>
          <h4 class="text-md font-bold text-slate-800 mb-1">Membercard Exclusive</h4>
          <p class="text-gray-500 text-xs">Program member spesial</p>
          <div class="mt-2 text-purple-600 text-xs font-semibold">
            Segera hadir <i class="fas fa-arrow-right ml-1"></i>
          </div>
        </div>
        
        <!-- Multi Outlet -> outlet.js -->
        <div class="bg-white rounded-2xl shadow-xl p-4 text-center cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 service-card" 
             onclick="redirectToMenu('outlet')">
          <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i class="fas fa-store-alt text-purple-600 text-xl"></i>
          </div>
          <h4 class="text-md font-bold text-slate-800 mb-1">Multi Outlet</h4>
          <p class="text-gray-500 text-xs">Banyak outlet tersebar di kota</p>
          <div class="mt-2 text-purple-600 text-xs font-semibold">
            Klik untuk lihat <i class="fas fa-arrow-right ml-1"></i>
          </div>
        </div>
      </div>
      
      <!-- Card Katalog Model Rambut -->
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 cursor-pointer hover:shadow-2xl transition-all duration-300" 
           onclick="redirectToMenu('katalog')">
        <div class="flex items-center justify-between">
          <div>
            <h3 class="text-2xl font-bold text-purple-800 mb-2 flex items-center gap-2">
              <i class="fas fa-cut text-purple-600"></i> Katalog Model Rambut
            </h3>
            <p class="text-gray-500">Temukan gaya rambut terbaru dan tren terkini</p>
          </div>
          <div class="bg-purple-100 p-4 rounded-full">
            <i class="fas fa-arrow-right text-purple-600 text-2xl"></i>
          </div>
        </div>
        
        <!-- Preview Gambar Katalog -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          <div class="rounded-xl overflow-hidden h-24 bg-gradient-to-br from-purple-200 to-purple-400 flex items-center justify-center text-white font-bold text-sm">
            <i class="fas fa-cut text-3xl"></i>
          </div>
          <div class="rounded-xl overflow-hidden h-24 bg-gradient-to-br from-blue-200 to-blue-400 flex items-center justify-center text-white font-bold text-sm">
            <i class="fas fa-cut text-3xl"></i>
          </div>
          <div class="rounded-xl overflow-hidden h-24 bg-gradient-to-br from-green-200 to-green-400 flex items-center justify-center text-white font-bold text-sm">
            <i class="fas fa-cut text-3xl"></i>
          </div>
          <div class="rounded-xl overflow-hidden h-24 bg-gradient-to-br from-pink-200 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
            <i class="fas fa-cut text-3xl"></i>
          </div>
        </div>
        
        <div class="mt-4 text-center text-purple-600 font-semibold">
          <i class="fas fa-arrow-right"></i> Klik untuk melihat semua model rambut
        </div>
      </div>
    </div>
  `;
}

// Ekspos fungsi redirectToMenu ke global
window.redirectToMenu = redirectToMenu;

console.log('📁 Modul Tentang Kami siap digunakan! - Updated version');
