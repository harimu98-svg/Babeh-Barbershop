// Katalog Model Rambut - Babeh Barbershop
// ============================================

let currentKatalogImages = [];
let currentKatalogIndex = 0;
let currentKatalogCategory = 'Best Haircut';
let currentKatalogInfo = null;

// Konfigurasi Supabase
const KATALOG_SUPABASE_URL = 'https://intzwjmlypmopzauxeqt.supabase.co';
const KATALOG_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHp3am1seXBtb3B6YXV4ZXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTc5MTIsImV4cCI6MjA3MDI5MzkxMn0.VwwVEDdHtYP5gui4epTcNfLXhPkmfFbRVb5y8mrXJiM';

let katalogSupabaseClient = null;

// Fungsi untuk mendapatkan Supabase client
function getKatalogSupabaseClient() {
  if (katalogSupabaseClient) return katalogSupabaseClient;
  
  if (typeof window.supabase !== 'undefined' && window.supabase.createClient) {
    katalogSupabaseClient = window.supabase.createClient(KATALOG_SUPABASE_URL, KATALOG_SUPABASE_ANON_KEY);
    console.log('✅ Supabase client untuk katalog berhasil diinisialisasi');
    return katalogSupabaseClient;
  }
  
  console.error('❌ Supabase library tidak tersedia');
  return null;
}

// Inisialisasi
setTimeout(() => {
  getKatalogSupabaseClient();
}, 100);

const KATALOG_TABLE = 'model_rambut';

// ============================================
// FUNGSI RENDER KATALOG (dengan gambar menu dari folder images)
// ============================================

function renderKatalog(container) {
  container.innerHTML = `
    <div class="max-w-7xl mx-auto">
      <!-- Header Katalog -->
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold text-purple-800 mb-2">
          <i class="fas fa-cut text-purple-600 mr-2"></i> Katalog Model Rambut
        </h2>
        <p class="text-gray-500">Inspirasi gaya rambut terbaru untuk Anda</p>
      </div>
      
      <!-- Menu Kategori dengan Gambar (seperti index.html) -->
      <div id="katalogMenuContainer" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-6 mb-12">
        <!-- Best Haircut Card -->
        <div class="katalog-menu-card bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition hover:scale-[1.02] active:scale-95" data-cat="Best Haircut">
          <div class="h-48 bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center overflow-hidden">
            <img src="images/Best Haircut.jpg" alt="Best Haircut" class="menu-card-image w-full h-full object-cover" 
                 onerror="this.onerror=null; this.parentElement.innerHTML = '<i class=\'fas fa-cut text-white text-6xl opacity-80\'></i>';">
          </div>
          <div class="p-5">
            <h2 class="text-2xl font-bold text-slate-800">Best Haircut</h2>
            <p class="text-gray-500 mt-1">Koleksi model rambut favorit pelanggan</p>
          </div>
        </div>
        
        <!-- Kids Haircut Card -->
        <div class="katalog-menu-card bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition hover:scale-[1.02] active:scale-95" data-cat="Kids Haircut">
          <div class="h-48 bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center overflow-hidden">
            <img src="images/Kids Haircut.jpg" alt="Kids Haircut" class="menu-card-image w-full h-full object-cover" 
                 onerror="this.onerror=null; this.parentElement.innerHTML = '<i class=\'fas fa-child text-white text-6xl opacity-80\'></i>';">
          </div>
          <div class="p-5">
            <h2 class="text-2xl font-bold text-slate-800">Kids Haircut</h2>
            <p class="text-gray-500 mt-1">Gaya rambut kekinian untuk si kecil</p>
          </div>
        </div>
        
        <!-- All Collection Card -->
        <div class="katalog-menu-card bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition hover:scale-[1.02] active:scale-95" data-cat="All Collection">
          <div class="h-48 bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center overflow-hidden">
            <img src="images/All Collection.jpg" alt="All Collection" class="menu-card-image w-full h-full object-cover" 
                 onerror="this.onerror=null; this.parentElement.innerHTML = '<i class=\'fas fa-layer-group text-white text-6xl opacity-80\'></i>';">
          </div>
          <div class="p-5">
            <h2 class="text-2xl font-bold text-slate-800">All Collection</h2>
            <p class="text-gray-500 mt-1">Semua model rambut eksklusif</p>
          </div>
        </div>
        
        <!-- Celebrity Haircut Card -->
        <div class="katalog-menu-card bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition hover:scale-[1.02] active:scale-95" data-cat="Celebrity Haircut">
          <div class="h-48 bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center overflow-hidden">
            <img src="images/Celebrity Haircut.jpg" alt="Celebrity Haircut" class="menu-card-image w-full h-full object-cover" 
                 onerror="this.onerror=null; this.parentElement.innerHTML = '<i class=\'fas fa-star text-white text-6xl opacity-80\'></i>';">
          </div>
          <div class="p-5">
            <h2 class="text-2xl font-bold text-slate-800">Celebrity Haircut</h2>
            <p class="text-gray-500 mt-1">Model rambut ala selebriti ternama</p>
          </div>
        </div>
        
        <!-- Football Players Haircut Card -->
        <div class="katalog-menu-card bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition hover:scale-[1.02] active:scale-95" data-cat="Football Players Haircut">
          <div class="h-48 bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center overflow-hidden">
            <img src="images/Football Players Haircut.jpg" alt="Football Players Haircut" class="menu-card-image w-full h-full object-cover" 
                 onerror="this.onerror=null; this.parentElement.innerHTML = '<i class=\'fas fa-futbol text-white text-6xl opacity-80\'></i>';">
          </div>
          <div class="p-5">
            <h2 class="text-2xl font-bold text-slate-800">Football Players Haircut</h2>
            <p class="text-gray-500 mt-1">Inspirasi gaya rambut pemain bola</p>
          </div>
        </div>
        
        <!-- Other Service Card -->
        <div class="katalog-menu-card bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition hover:scale-[1.02] active:scale-95" data-cat="Other Service">
          <div class="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden">
            <img src="images/Other Service.jpg" alt="Other Service" class="menu-card-image w-full h-full object-cover" 
                 onerror="this.onerror=null; this.parentElement.innerHTML = '<i class=\'fas fa-concierge-bell text-white text-6xl opacity-80\'></i>';">
          </div>
          <div class="p-5">
            <h2 class="text-2xl font-bold text-slate-800">Other Service</h2>
            <p class="text-gray-500 mt-1">Layanan perawatan rambut lainnya</p>
          </div>
        </div>
      </div>
      
      <!-- Gallery View (setelah klik menu) -->
      <div id="katalogGalleryView" class="hidden">
        <div class="mb-5 flex items-center justify-between">
          <button id="katalogBackToMenuBtn" class="inline-flex items-center gap-2 px-4 py-2 bg-white/80 rounded-full shadow-md border border-gray-200 text-slate-700 font-medium active:scale-95 transition">
            <i class="fas fa-arrow-left"></i> Back to Menu
          </button>
          <span id="katalogGalleryTitle" class="text-lg font-semibold text-slate-700 bg-white/60 px-4 py-1.5 rounded-full shadow-sm"></span>
        </div>
        <div id="katalogImageGrid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-max pb-8 gallery-scroll max-h-[70vh] overflow-y-auto pr-1"></div>
      </div>
    </div>
  `;
  
  // Tambahkan style
  if (!document.querySelector('#katalogStyle')) {
    const style = document.createElement('style');
    style.id = 'katalogStyle';
    style.textContent = `
      .menu-card-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
      }
      .katalog-menu-card:hover .menu-card-image {
        transform: scale(1.05);
      }
      .gallery-scroll {
        scrollbar-width: thin;
        scrollbar-color: #cbd5e1 #f1f5f9;
      }
      .gallery-scroll::-webkit-scrollbar {
        width: 4px;
        height: 4px;
      }
      .gallery-scroll::-webkit-scrollbar-track {
        background: #f1f5f9;
        border-radius: 10px;
      }
      .gallery-scroll::-webkit-scrollbar-thumb {
        background: #cbd5e1;
        border-radius: 10px;
      }
      .katalog-gallery-item {
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        cursor: pointer;
      }
      .katalog-gallery-item:active {
        transform: scale(0.98);
      }
      .fullscreen-overlay {
        background-color: rgba(0, 0, 0, 0.95);
        backdrop-filter: blur(12px);
      }
      body.no-scroll {
        overflow: hidden;
      }
    `;
    document.head.appendChild(style);
  }
  
  // Event listener untuk menu card
  document.querySelectorAll('.katalog-menu-card').forEach(card => {
    card.addEventListener('click', () => {
      const category = card.getAttribute('data-cat');
      if (category) loadKatalogCategory(category);
    });
  });
  
  // Event listener untuk tombol back
  const backBtn = document.getElementById('katalogBackToMenuBtn');
  if (backBtn) {
    backBtn.addEventListener('click', backToKatalogMenu);
  }
}

// ============================================
// FUNGSI DATABASE
// ============================================

async function fetchKatalogModelsByCategory(kategori) {
  const client = getKatalogSupabaseClient();
  if (!client) {
    console.error('❌ Supabase client tidak tersedia');
    return [];
  }
  
  try {
    console.log(`📋 Mengambil data katalog untuk kategori: ${kategori}`);
    
    const { data, error } = await client
      .from(KATALOG_TABLE)
      .select('*')
      .eq('kategori', kategori);
    
    if (error) {
      console.error('Error fetching from database:', error);
      return [];
    }
    
    if (data && data.length > 0) {
      const sortedData = sortKatalogByNomor(data);
      console.log(`✅ Ditemukan ${sortedData.length} data untuk kategori ${kategori}`);
      sortedData.forEach((item, idx) => {
        console.log(`   ${idx + 1}. ${item.nomor} - ${item.nama_model_rambut}`);
      });
      return sortedData;
    }
    
    console.log(`⚠️ Tidak ada data untuk kategori ${kategori}`);
    return [];
  } catch (err) {
    console.error('Database error:', err);
    return [];
  }
}

function sortKatalogByNomor(data) {
  return data.sort((a, b) => {
    const nomorA = a.nomor || '';
    const nomorB = b.nomor || '';
    const matchA = nomorA.match(/^([A-Za-z]+)(\d+)$/);
    const matchB = nomorB.match(/^([A-Za-z]+)(\d+)$/);
    
    if (matchA && matchB) {
      const hurufA = matchA[1];
      const hurufB = matchB[1];
      const angkaA = parseInt(matchA[2], 10);
      const angkaB = parseInt(matchB[2], 10);
      if (hurufA === hurufB) return angkaA - angkaB;
      return hurufA.localeCompare(hurufB);
    }
    return nomorA.localeCompare(nomorB);
  });
}

// ============================================
// FUNGSI LOAD KATEGORI (seperti index.html)
// ============================================

async function loadKatalogCategory(category) {
  const menuContainer = document.getElementById('katalogMenuContainer');
  const galleryView = document.getElementById('katalogGalleryView');
  const galleryTitle = document.getElementById('katalogGalleryTitle');
  const imageGrid = document.getElementById('katalogImageGrid');
  
  if (!menuContainer || !galleryView || !imageGrid) return;
  
  // Tampilkan loading
  galleryTitle.innerText = `${category} ✂️`;
  
  const images = await fetchKatalogModelsByCategory(category);
  currentKatalogImages = images.map(model => {
    let imageUrl = model.link_url_bucket;
    if (!imageUrl.startsWith('http')) {
      const client = getKatalogSupabaseClient();
      if (client) {
        imageUrl = client.storage
          .from('model_rambut')
          .getPublicUrl(imageUrl).data.publicUrl;
      }
    }
    
    return {
      url: imageUrl,
      nomor: model.nomor || '???',
      nama: model.nama_model_rambut || 'Model Rambut',
      informasi: model.informasi || 'Informasi belum tersedia'
    };
  });
  
  renderKatalogGallery(currentKatalogImages);
  
  // Sembunyikan menu, tampilkan gallery
  menuContainer.classList.add('hidden');
  galleryView.classList.remove('hidden');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function renderKatalogGallery(images) {
  const imageGrid = document.getElementById('katalogImageGrid');
  if (!imageGrid) return;
  
  if (!images || images.length === 0) {
    imageGrid.innerHTML = `
      <div class="col-span-full text-center py-12 bg-white/50 rounded-2xl">
        <i class="fas fa-image text-4xl text-gray-400 mb-2"></i>
        <p class="text-gray-500">Belum ada foto di koleksi ini.</p>
        <p class="text-gray-400 text-sm mt-2">Silakan tambahkan data pada tabel model_rambut</p>
      </div>`;
    return;
  }
  
  imageGrid.innerHTML = images.map((item, idx) => `
    <div class="katalog-gallery-item relative overflow-hidden rounded-xl shadow-md bg-white aspect-square group cursor-pointer" data-img-index="${idx}">
      <img src="${item.url}" alt="${item.nama}" class="w-full h-full object-cover rounded-xl" loading="lazy" 
           onerror="this.onerror=null; this.src='https://placehold.co/400x400/1e293b/ffffff?text=No+Image';">
      <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
        <p class="text-white text-sm font-semibold truncate">${escapeKatalogHtml(item.nomor)} - ${escapeKatalogHtml(item.nama)}</p>
      </div>
    </div>
  `).join('');
  
  // Event klik untuk setiap gambar
  document.querySelectorAll('.katalog-gallery-item').forEach(item => {
    item.addEventListener('click', (e) => {
      const index = parseInt(item.getAttribute('data-img-index'));
      if (!isNaN(index)) openKatalogFullscreen(index);
    });
  });
}

function backToKatalogMenu() {
  const menuContainer = document.getElementById('katalogMenuContainer');
  const galleryView = document.getElementById('katalogGalleryView');
  
  if (menuContainer && galleryView) {
    galleryView.classList.add('hidden');
    menuContainer.classList.remove('hidden');
    currentKatalogImages = [];
    closeKatalogFullscreen();
  }
}

function escapeKatalogHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// ============================================
// FUNGSI FULLSCREEN (dengan Informasi seperti index.html)
// ============================================

function openKatalogFullscreen(index) {
  if (!currentKatalogImages.length) return;
  currentKatalogIndex = index;
  const item = currentKatalogImages[currentKatalogIndex];
  
  // Buat modal jika belum ada
  if (!document.getElementById('katalogFullscreenModal')) {
    createKatalogFullscreenModal();
  }
  
  // Update konten modal
  const img = document.getElementById('katalogFullscreenImg');
  const name = document.getElementById('katalogFullscreenName');
  const counter = document.getElementById('katalogImageCounter');
  
  if (img) img.src = item.url;
  if (name) name.innerText = `${item.nomor} - ${item.nama}`;
  if (counter) counter.innerText = `${index + 1} / ${currentKatalogImages.length}`;
  
  // Simpan info untuk tombol informasi
  currentKatalogInfo = item;
  
  const modal = document.getElementById('katalogFullscreenModal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.classList.add('no-scroll');
  }
}

function createKatalogFullscreenModal() {
  if (document.getElementById('katalogFullscreenModal')) return;
  
  const modalHTML = `
    <div id="katalogFullscreenModal" class="fixed inset-0 z-50 hidden fullscreen-overlay">
      <!-- Tombol atas -->
      <div class="absolute top-5 left-5 z-50">
        <button id="katalogCloseFullscreenBtn" class="bg-black/50 text-white p-3 rounded-full backdrop-blur-sm hover:bg-black/70 active:scale-95 transition flex items-center gap-2">
          <i class="fas fa-arrow-left text-xl"></i>
          <span class="hidden sm:inline">Back</span>
        </button>
      </div>
      <div class="absolute top-5 right-5 z-50">
        <button id="katalogCloseFullscreenXBtn" class="bg-black/50 text-white p-3 rounded-full backdrop-blur-sm hover:bg-black/70 active:scale-95 transition">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      
      <!-- Gambar Fullscreen -->
      <div class="w-full h-full flex flex-col items-center justify-center relative">
        <img id="katalogFullscreenImg" class="max-w-[90%] max-h-[65vh] object-contain rounded-xl shadow-2xl" src="" alt="Fullscreen">
        
        <!-- Nama Model di Fullscreen -->
        <div class="mt-6 text-center">
          <div id="katalogFullscreenName" class="text-white text-xl md:text-2xl font-bold bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm inline-block">
            -
          </div>
          <!-- Tombol Informasi -->
          <div class="mt-3">
            <button id="katalogInfoButtonFullscreen" class="info-link bg-amber-600/80 text-white px-6 py-2 rounded-full backdrop-blur-sm hover:bg-amber-700 active:scale-95 transition font-medium text-base">
              <i class="fas fa-info-circle mr-2"></i> Informasi
            </button>
          </div>
        </div>
        
        <!-- Tombol navigasi -->
        <button id="katalogPrevImageBtn" class="absolute left-3 md:left-6 nav-btn text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
          <i class="fas fa-chevron-left text-2xl"></i>
        </button>
        <button id="katalogNextImageBtn" class="absolute right-3 md:right-6 nav-btn text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg">
          <i class="fas fa-chevron-right text-2xl"></i>
        </button>
      </div>
      
      <!-- Indikator -->
      <div class="absolute bottom-5 left-0 right-0 text-center text-white/80 text-sm">
        <span id="katalogImageCounter">0 / 0</span> &nbsp;|&nbsp; Geser atau tekan tombol
      </div>
    </div>
    
    <!-- Modal Informasi (seperti index.html) -->
    <div id="katalogInfoModal" class="fixed inset-0 z-60 hidden bg-black/70 flex items-center justify-center p-4" style="z-index: 60;">
      <div class="bg-white rounded-2xl max-w-md w-full p-6 info-modal">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-xl font-bold text-slate-800">
            <i class="fas fa-info-circle text-amber-600 mr-2"></i>
            Detail Model Rambut
          </h3>
          <button id="katalogCloseInfoModal" class="text-gray-400 hover:text-gray-600">
            <i class="fas fa-times text-xl"></i>
          </button>
        </div>
        <div class="space-y-3">
          <div>
            <p class="text-sm text-gray-500">Nomor Model</p>
            <p id="katalogInfoNomor" class="font-semibold text-slate-700">-</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Nama Model</p>
            <p id="katalogInfoNama" class="font-semibold text-slate-700 text-lg">-</p>
          </div>
          <div>
            <p class="text-sm text-gray-500">Informasi</p>
            <p id="katalogInfoDeskripsi" class="text-slate-600 leading-relaxed whitespace-pre-line">-</p>
          </div>
        </div>
        <button id="katalogCloseInfoModalBtn" class="mt-5 w-full bg-amber-600 text-white py-2 rounded-xl font-semibold hover:bg-amber-700 transition">
          Tutup
        </button>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Style untuk nav-btn dan info-link
  if (!document.querySelector('#katalogNavStyle')) {
    const navStyle = document.createElement('style');
    navStyle.id = 'katalogNavStyle';
    navStyle.textContent = `
      .nav-btn {
        background: rgba(30, 41, 59, 0.85);
        backdrop-filter: blur(8px);
        transition: all 0.2s;
      }
      .nav-btn:active {
        transform: scale(0.94);
        background: rgba(15, 23, 42, 0.95);
      }
      .info-link {
        cursor: pointer;
        transition: all 0.2s;
        display: inline-block;
      }
      .info-link:active {
        transform: scale(0.96);
      }
      .info-modal {
        animation: slideUp 0.3s ease-out;
      }
      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(50px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `;
    document.head.appendChild(navStyle);
  }
  
  // Event Listeners
  document.getElementById('katalogCloseFullscreenBtn')?.addEventListener('click', closeKatalogFullscreen);
  document.getElementById('katalogCloseFullscreenXBtn')?.addEventListener('click', closeKatalogFullscreen);
  document.getElementById('katalogPrevImageBtn')?.addEventListener('click', katalogPrevImage);
  document.getElementById('katalogNextImageBtn')?.addEventListener('click', katalogNextImage);
  document.getElementById('katalogInfoButtonFullscreen')?.addEventListener('click', showKatalogInfo);
  
  // Close info modal
  document.getElementById('katalogCloseInfoModal')?.addEventListener('click', closeKatalogInfoModal);
  document.getElementById('katalogCloseInfoModalBtn')?.addEventListener('click', closeKatalogInfoModal);
  
  // Touch swipe
  let touchStartX = 0;
  const modal = document.getElementById('katalogFullscreenModal');
  modal?.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });
  modal?.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) katalogNextImage();
    else if (touchEndX > touchStartX + 50) katalogPrevImage();
  });
  
  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!modal?.classList.contains('hidden')) {
      if (e.key === 'ArrowLeft') { katalogPrevImage(); e.preventDefault(); }
      else if (e.key === 'ArrowRight') { katalogNextImage(); e.preventDefault(); }
      else if (e.key === 'Escape') { closeKatalogFullscreen(); e.preventDefault(); }
    }
  });
}

function showKatalogInfo() {
  if (currentKatalogInfo) {
    document.getElementById('katalogInfoNomor').innerText = currentKatalogInfo.nomor;
    document.getElementById('katalogInfoNama').innerText = currentKatalogInfo.nama;
    document.getElementById('katalogInfoDeskripsi').innerText = currentKatalogInfo.informasi;
    document.getElementById('katalogInfoModal').classList.remove('hidden');
  }
}

function closeKatalogInfoModal() {
  document.getElementById('katalogInfoModal').classList.add('hidden');
}

function closeKatalogFullscreen() {
  const modal = document.getElementById('katalogFullscreenModal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.classList.remove('no-scroll');
  }
}

function katalogNextImage() {
  if (!currentKatalogImages.length) return;
  currentKatalogIndex = (currentKatalogIndex + 1) % currentKatalogImages.length;
  const item = currentKatalogImages[currentKatalogIndex];
  
  const img = document.getElementById('katalogFullscreenImg');
  const name = document.getElementById('katalogFullscreenName');
  const counter = document.getElementById('katalogImageCounter');
  
  if (img) img.src = item.url;
  if (name) name.innerText = `${item.nomor} - ${item.nama}`;
  if (counter) counter.innerText = `${currentKatalogIndex + 1} / ${currentKatalogImages.length}`;
  
  currentKatalogInfo = item;
}

function katalogPrevImage() {
  if (!currentKatalogImages.length) return;
  currentKatalogIndex = (currentKatalogIndex - 1 + currentKatalogImages.length) % currentKatalogImages.length;
  const item = currentKatalogImages[currentKatalogIndex];
  
  const img = document.getElementById('katalogFullscreenImg');
  const name = document.getElementById('katalogFullscreenName');
  const counter = document.getElementById('katalogImageCounter');
  
  if (img) img.src = item.url;
  if (name) name.innerText = `${item.nomor} - ${item.nama}`;
  if (counter) counter.innerText = `${currentKatalogIndex + 1} / ${currentKatalogImages.length}`;
  
  currentKatalogInfo = item;
}

console.log('📁 Modul Katalog Model Rambut siap digunakan!');
