// membercard.js - Halaman Membercard Exclusive Babeh Barbershop

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

// Render halaman Membercard
function renderMembercard(container) {
  container.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <!-- Header Membercard -->
      <div class="bg-gradient-to-r from-orange-500 to-orange-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
        <div class="flex items-center gap-4">
          <div class="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <i class="fas fa-id-card text-3xl"></i>
          </div>
          <div>
            <h2 class="text-3xl font-bold">Membercard Exclusive</h2>
            <p class="text-orange-200 mt-1">Nikmati keuntungan menjadi member Babeh Barbershop</p>
          </div>
        </div>
      </div>

      <!-- Preview Membercard -->
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
        <h3 class="text-2xl font-bold text-orange-700 mb-4 flex items-center gap-2">
          <i class="fas fa-id-card text-orange-500"></i> Membercard Digital
        </h3>
        <p class="text-gray-500 mb-6">Tunjukkan kartu member ini untuk mendapatkan berbagai keuntungan</p>
        
        <div class="flex justify-center">
          <div class="relative group">
            <!-- Membercard Image -->
            <div class="w-full max-w-md rounded-2xl overflow-hidden shadow-2xl transition-transform duration-300 group-hover:scale-105">
              <img src="images/membercard.png" 
                   alt="Babeh Barbershop Membercard" 
                   class="w-full h-auto"
                   onerror="this.onerror=null; this.parentElement.innerHTML = '<div class=\'bg-gradient-to-r from-orange-400 to-orange-600 p-8 rounded-2xl text-center text-white\'><i class=\'fas fa-id-card text-6xl mb-4\'></i><p class=\'text-xl font-bold\'>Babeh Barbershop</p><p class=\'text-sm opacity-80\'>Membercard Exclusive</p><div class=\'mt-4 p-4 bg-white/20 rounded-xl\'><p class=\'text-sm\'>MEM-2024-0001</p><p class=\'text-xs opacity-80\'>Premium Member</p></div></div>'">
            </div>
            <!-- Badge Premium -->
            <div class="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse">
              <i class="fas fa-crown mr-1"></i> PREMIUM
            </div>
          </div>
        </div>
        
        <!-- Member Info -->
        <div class="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-md mx-auto">
          <div class="bg-orange-50 rounded-xl p-3 text-center">
            <div class="text-orange-600 font-bold text-lg">#001</div>
            <div class="text-gray-500 text-xs">Member ID</div>
          </div>
          <div class="bg-orange-50 rounded-xl p-3 text-center">
            <div class="text-orange-600 font-bold text-lg">Premium</div>
            <div class="text-gray-500 text-xs">Tier</div>
          </div>
          <div class="bg-orange-50 rounded-xl p-3 text-center">
            <div class="text-orange-600 font-bold text-lg">10%</div>
            <div class="text-gray-500 text-xs">Diskon</div>
          </div>
          <div class="bg-orange-50 rounded-xl p-3 text-center">
            <div class="text-orange-600 font-bold text-lg">∞</div>
            <div class="text-gray-500 text-xs">Berlaku</div>
          </div>
        </div>
      </div>

      <!-- Keuntungan Membercard -->
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
        <h3 class="text-2xl font-bold text-orange-700 mb-4 flex items-center gap-2">
          <i class="fas fa-gem text-orange-500"></i> Keuntungan Membercard
        </h3>
        <p class="text-gray-500 mb-6">Berbagai keuntungan eksklusif yang bisa Anda dapatkan</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div class="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 hover:shadow-lg transition duration-300">
            <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mb-3">
              <i class="fas fa-percent text-white text-xl"></i>
            </div>
            <h4 class="font-bold text-slate-800 mb-1">Diskon Khusus</h4>
            <p class="text-gray-600 text-sm">Dapatkan diskon 10% untuk setiap layanan di semua outlet</p>
          </div>
          
          <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 hover:shadow-lg transition duration-300">
            <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mb-3">
              <i class="fas fa-gift text-white text-xl"></i>
            </div>
            <h4 class="font-bold text-slate-800 mb-1">Hadiah Ulang Tahun</h4>
            <p class="text-gray-600 text-sm">Dapatkan potongan spesial dan free haircut di bulan ulang tahun</p>
          </div>
          
          <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 hover:shadow-lg transition duration-300">
            <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mb-3">
              <i class="fas fa-star text-white text-xl"></i>
            </div>
            <h4 class="font-bold text-slate-800 mb-1">Poin Reward</h4>
            <p class="text-gray-600 text-sm">Kumpulkan poin dari setiap transaksi untuk ditukar dengan layanan gratis</p>
          </div>
          
          <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 hover:shadow-lg transition duration-300">
            <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mb-3">
              <i class="fas fa-clock text-white text-xl"></i>
            </div>
            <h4 class="font-bold text-slate-800 mb-1">Prioritas Booking</h4>
            <p class="text-gray-600 text-sm">Booking prioritas untuk jam sibuk tanpa perlu antri</p>
          </div>
          
          <div class="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 hover:shadow-lg transition duration-300">
            <div class="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mb-3">
              <i class="fas fa-users text-white text-xl"></i>
            </div>
            <h4 class="font-bold text-slate-800 mb-1">Undang Teman</h4>
            <p class="text-gray-600 text-sm">Dapatkan bonus poin untuk setiap teman yang bergabung</p>
          </div>
          
          <div class="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-5 hover:shadow-lg transition duration-300">
            <div class="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center mb-3">
              <i class="fas fa-crown text-white text-xl"></i>
            </div>
            <h4 class="font-bold text-slate-800 mb-1">Upgrade Tier</h4>
            <p class="text-gray-600 text-sm">Semakin sering menggunakan jasa, semakin tinggi tier dan diskon Anda</p>
          </div>
        </div>
      </div>

      <!-- Promo Spesial Member -->
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
        <h3 class="text-2xl font-bold text-orange-700 mb-4 flex items-center gap-2">
          <i class="fas fa-fire text-orange-500"></i> Promo Spesial Member
        </h3>
        <p class="text-gray-500 mb-6">Promo eksklusif yang hanya tersedia untuk membercard</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="border-2 border-orange-200 rounded-xl p-5 bg-gradient-to-r from-orange-50 to-white relative overflow-hidden">
            <div class="absolute top-0 right-0 bg-orange-500 text-white px-4 py-1 rounded-bl-xl text-sm font-bold">
              HOT!
            </div>
            <div class="flex items-start gap-3">
              <div class="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-scissors text-white text-xl"></i>
              </div>
              <div>
                <h4 class="font-bold text-slate-800">Free Haircut di Bulan Ulang Tahun</h4>
                <p class="text-gray-600 text-sm">Dapatkan potong rambut gratis di bulan ulang tahun Anda</p>
                <span class="inline-block mt-2 bg-orange-100 text-orange-700 text-xs px-3 py-1 rounded-full">Syarat & Ketentuan berlaku</span>
              </div>
            </div>
          </div>
          
          <div class="border-2 border-blue-200 rounded-xl p-5 bg-gradient-to-r from-blue-50 to-white relative overflow-hidden">
            <div class="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 rounded-bl-xl text-sm font-bold">
              NEW!
            </div>
            <div class="flex items-start gap-3">
              <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-users text-white text-xl"></i>
              </div>
              <div>
                <h4 class="font-bold text-slate-800">Buy 5 Get 1 Free</h4>
                <p class="text-gray-600 text-sm">Setiap 5 kali kunjungan, dapatkan 1 layanan gratis</p>
                <span class="inline-block mt-2 bg-blue-100 text-blue-700 text-xs px-3 py-1 rounded-full">Akumulasi poin</span>
              </div>
            </div>
          </div>
          
          <div class="border-2 border-green-200 rounded-xl p-5 bg-gradient-to-r from-green-50 to-white">
            <div class="flex items-start gap-3">
              <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-gift text-white text-xl"></i>
              </div>
              <div>
                <h4 class="font-bold text-slate-800">Bonus Poin 2x Lipat</h4>
                <p class="text-gray-600 text-sm">Dapatkan poin 2x lipat di setiap transaksi akhir pekan</p>
                <span class="inline-block mt-2 bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">Sabtu - Minggu</span>
              </div>
            </div>
          </div>
          
          <div class="border-2 border-purple-200 rounded-xl p-5 bg-gradient-to-r from-purple-50 to-white">
            <div class="flex items-start gap-3">
              <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                <i class="fas fa-tag text-white text-xl"></i>
              </div>
              <div>
                <h4 class="font-bold text-slate-800">Diskon 20% untuk Membercard Premium</h4>
                <p class="text-gray-600 text-sm">Untuk member tier premium, dapatkan diskon 20% setiap transaksi</p>
                <span class="inline-block mt-2 bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full">Tier Premium</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Daftar Membercard -->
      <div class="bg-gradient-to-r from-orange-500 to-orange-700 rounded-2xl shadow-xl p-6 md:p-8 mb-8 text-white">
        <div class="text-center">
          <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <i class="fas fa-user-plus text-4xl"></i>
          </div>
          <h3 class="text-3xl font-bold mb-2">Daftar Membercard Digital Gratis!</h3>
          <p class="text-orange-200 mb-6 max-w-2xl mx-auto">
            Nikmati berbagai promo dan keuntungan eksklusif lainnya. 
            Daftar sekarang dan jadilah bagian dari keluarga Babeh Barbershop!
          </p>
          
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button onclick="window.open('https://wa.me/6281234567890?text=Halo%20Babeh%20Barbershop%2C%20saya%20mau%20daftar%20membercard%20digital', '_blank')" 
                    class="bg-white text-orange-700 px-8 py-3 rounded-xl font-bold hover:shadow-2xl transition duration-300 flex items-center justify-center gap-2">
              <i class="fab fa-whatsapp"></i> Daftar via WhatsApp
            </button>
            <button onclick="redirectToMenu('reservation')" 
                    class="bg-orange-800/50 text-white border-2 border-white/30 px-8 py-3 rounded-xl font-bold hover:bg-orange-800/70 transition duration-300 flex items-center justify-center gap-2">
              <i class="fas fa-calendar-alt"></i> Booking Sekarang
            </button>
          </div>
        </div>
      </div>

      <!-- Tombol Aksi -->
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button onclick="window.open('https://wa.me/6281234567890?text=Halo%20Babeh%20Barbershop%2C%20saya%20mau%20bertanya%20tentang%20membercard', '_blank')" 
                  class="bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-green-500/30 transition-all duration-300 flex items-center justify-center gap-3 group">
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition">
              <i class="fab fa-whatsapp text-xl"></i>
            </div>
            <div class="text-left">
              <div class="font-bold text-lg">Chat Admin</div>
              <div class="text-green-200 text-sm">Tanya tentang membercard</div>
            </div>
            <i class="fas fa-arrow-right ml-auto group-hover:translate-x-1 transition"></i>
          </button>
          
          <button onclick="redirectToMenu('tentang-kami')" 
                  class="bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:shadow-gray-500/30 transition-all duration-300 flex items-center justify-center gap-3 group">
            <div class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:scale-110 transition">
              <i class="fas fa-arrow-left text-xl"></i>
            </div>
            <div class="text-left">
              <div class="font-bold text-lg">Kembali</div>
              <div class="text-gray-300 text-sm">Ke halaman utama</div>
            </div>
            <i class="fas fa-arrow-right ml-auto group-hover:translate-x-1 transition"></i>
          </button>
        </div>
      </div>
    </div>
  `;
}

// Ekspos fungsi ke global
window.renderMembercard = renderMembercard;
window.redirectToMenu = redirectToMenu;

console.log('📁 Modul Membercard siap digunakan!');
