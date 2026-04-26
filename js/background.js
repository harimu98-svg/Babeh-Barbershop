// Background / Profil Barbershop
function renderBackground(container) {
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
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
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
      
      <!-- Jam Operasional -->
      <div class="bg-white rounded-2xl shadow-xl p-6 mt-8">
        <h3 class="text-2xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <i class="fas fa-clock text-purple-600"></i> Jam Operasional
        </h3>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <p class="font-semibold text-slate-700">Senin - Jumat</p>
            <p class="text-gray-500">10:00 - 21:00</p>
          </div>
          <div>
            <p class="font-semibold text-slate-700">Sabtu - Minggu</p>
            <p class="text-gray-500">09:00 - 22:00</p>
          </div>
        </div>
      </div>
    </div>
  `;
}
