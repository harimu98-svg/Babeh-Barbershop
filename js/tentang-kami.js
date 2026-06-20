// Tentang Kami - Babeh Barbershop
// Halaman utama dengan card yang bisa diklik dan berwarna-warni

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
           <p class="text-lg md:text-xl opacity-90">
          <i>Right Man On The Right Place</i>
          </p>
          </div>
        </div>
      </div>
      
      <!-- Tentang Kami -->
<div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
  <h3 class="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
    <i class="fas fa-info-circle text-purple-600"></i> Tentang Kami
  </h3>
  <p class="text-gray-600 leading-relaxed mb-4">
    Babeh Barbershop hadir sebagai solusi kebutuhan pangkas rambut pria modern. 
    Dengan konsep Classic-Modern dan pelayanan profesional, kami berkomitmen memberikan 
    pengalaman terbaik bagi setiap pelanggan, dengan harga terjangkau untuk semua kalangan.
  </p>
  <p class="text-gray-600 leading-relaxed mb-4">
    Didirikan pada tahun 2016, Babeh Barbershop telah melayani ribuan pelanggan 
    dengan berbagai gaya rambut sesuai tren terkini. Barberman kami yang berpengalaman 
    siap memberikan rekomendasi gaya rambut terbaik untuk Anda.
  </p>
  <p class="text-gray-600 leading-relaxed mb-4">
    Saat ini Babeh Barbershop telah memiliki Outlet yang tersebar di sekitar Depok dan Tangerang Selatan.
  </p>
  <p class="text-gray-600 leading-relaxed">
    Segera daftar Babeh Barbershop Digital Membercard Exclusive, gratis tanpa biaya, 
    proses cepat langsung jadi, nikmati berbagai promo dan keuntungan lainya.
  </p>
</div>
      
      <!-- Card Keunggulan (5 item berwarna-warni yang bisa diklik) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        <!-- Barber Profesional -> barberman.js -->
        <div class="bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl shadow-xl p-4 text-center cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-white service-card" 
             onclick="redirectToMenu('barberman')">
          <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <i class="fas fa-cut text-white text-xl"></i>
          </div>
          <h4 class="text-md font-bold mb-1">Barber Profesional</h4>
          <p class="text-purple-200 text-xs">Tim berpengalaman & tersertifikasi</p>
          <div class="mt-2 text-white/80 text-xs font-semibold">
            Klik untuk lihat <i class="fas fa-arrow-right ml-1"></i>
          </div>
        </div>
        
        <!-- Harga Terjangkau -> price-services.js -->
        <div class="bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-xl p-4 text-center cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-white service-card" 
             onclick="redirectToMenu('price-services')">
          <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <i class="fas fa-tag text-white text-xl"></i>
          </div>
          <h4 class="text-md font-bold mb-1">Harga Terjangkau</h4>
          <p class="text-blue-200 text-xs">Kualitas premium harga bersahabat</p>
          <div class="mt-2 text-white/80 text-xs font-semibold">
            Klik untuk lihat <i class="fas fa-arrow-right ml-1"></i>
          </div>
        </div>
        
        <!-- Booking Online -> reservation.js -->
        <div class="bg-gradient-to-br from-green-500 to-green-700 rounded-2xl shadow-xl p-4 text-center cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-white service-card" 
             onclick="redirectToMenu('reservation')">
          <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <i class="fas fa-calendar-check text-white text-xl"></i>
          </div>
          <h4 class="text-md font-bold mb-1">Booking Online</h4>
          <p class="text-green-200 text-xs">Reservasi/Booking online mudah</p>
          <div class="mt-2 text-white/80 text-xs font-semibold">
            Klik untuk reservasi <i class="fas fa-arrow-right ml-1"></i>
          </div>
        </div>
        
     <!-- Membercard Exclusive -> membercard.js -->
<div class="bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl shadow-xl p-4 text-center cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-white service-card" 
     onclick="redirectToMenu('membercard')">
  <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
    <i class="fas fa-id-card text-white text-xl"></i>
  </div>
  <h4 class="text-md font-bold mb-1">Membercard Exclusive</h4>
  <p class="text-orange-200 text-xs">Program member spesial</p>
  <div class="mt-2 text-white/80 text-xs font-semibold">
    Klik untuk daftar <i class="fas fa-arrow-right ml-1"></i>
  </div>
</div>
        
        <!-- Multi Outlet -> outlet.js -->
        <div class="bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl shadow-xl p-4 text-center cursor-pointer hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 text-white service-card" 
             onclick="redirectToMenu('outlet')">
          <div class="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 backdrop-blur-sm">
            <i class="fas fa-store-alt text-white text-xl"></i>
          </div>
          <h4 class="text-md font-bold mb-1">Multi Outlet</h4>
          <p class="text-pink-200 text-xs">Banyak outlet tersebar di kota</p>
          <div class="mt-2 text-white/80 text-xs font-semibold">
            Klik untuk lihat <i class="fas fa-arrow-right ml-1"></i>
          </div>
        </div>
      </div>
      
      <!-- Tombol Reservasi & Chat Admin -->
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <h3 class="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <i class="fas fa-handshake text-purple-600"></i> Butuh Bantuan?
        </h3>
        <p class="text-gray-500 mb-6">Hubungi kami untuk informasi atau pertanyaan lainnya</p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   
          <!-- Tombol Chat Admin -->
           <button onclick="window.open('https://wa.me/6281234567890', '_blank')" 
            class="bg-green-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-700 transition flex items-center justify-center gap-2">
      <i class="fab fa-whatsapp text-xl"></i> Chat Admin
    </button>
        </div>
        
        <!-- Info Tambahan -->
        <div class="mt-4 p-4 bg-purple-50 rounded-xl flex items-center gap-3">
          <i class="fas fa-clock text-purple-600"></i>
          <span class="text-gray-600 text-sm">Jam operasional: Senin - Minggu (09:00 - 22:00)</span>
        </div>
      </div>
    </div>
  `;
}

// Ekspos fungsi redirectToMenu ke global
window.redirectToMenu = redirectToMenu;

console.log('📁 Modul Tentang Kami siap digunakan! - Updated with colorful cards');
