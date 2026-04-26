// Katalog Model Rambut - Babeh Barbershop
// Modifikasi dari file index.html yang ada

let currentKatalogImages = [];
let currentKatalogIndex = 0;
let currentKatalogCategory = 'Best Haircut';

const SUPABASE_URL = 'https://intzwjmlypmopzauxeqt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHp3am1seXBtb3B6YXV4ZXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTc5MTIsImV4cCI6MjA3MDI5MzkxMn0.VwwVEDdHtYP5gui4epTcNfLXhPkmfFbRVb5y8mrXJiM';
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const KATALOG_TABLE = 'model_rambut';

// Mapping kategori
const katalogCategoryMapping = {
  'Best Haircut': 'Best Haircut',
  'Kids Haircut': 'Kids Haircut',
  'All Collection': 'All Collection',
  'Celebrity Haircut': 'Celebrity Haircut',
  'Football Players Haircut': 'Football Players Haircut',
  'Other Service': 'Other Service'
};

// Fungsi untuk render halaman katalog
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
      
      <!-- Kategori Menu -->
      <div class="flex flex-wrap justify-center gap-3 mb-8">
        <button class="katalog-cat-btn active-cat" data-cat="Best Haircut">
          <i class="fas fa-cut mr-1"></i> Best Haircut
        </button>
        <button class="katalog-cat-btn" data-cat="Kids Haircut">
          <i class="fas fa-child mr-1"></i> Kids Haircut
        </button>
        <button class="katalog-cat-btn" data-cat="All Collection">
          <i class="fas fa-layer-group mr-1"></i> All Collection
        </button>
        <button class="katalog-cat-btn" data-cat="Celebrity Haircut">
          <i class="fas fa-star mr-1"></i> Celebrity
        </button>
        <button class="katalog-cat-btn" data-cat="Football Players Haircut">
          <i class="fas fa-futbol mr-1"></i> Football Players
        </button>
        <button class="katalog-cat-btn" data-cat="Other Service">
          <i class="fas fa-concierge-bell mr-1"></i> Other Service
        </button>
      </div>
      
      <!-- Loading -->
      <div id="katalogLoading" class="text-center py-20">
        <i class="fas fa-spinner fa-spin text-4xl text-purple-600"></i>
        <p class="mt-4 text-gray-500">Memuat koleksi...</p>
      </div>
      
      <!-- Gallery Grid -->
      <div id="katalogGrid" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 auto-rows-max hidden"></div>
    </div>
  `;
  
  // Tambahkan style untuk tombol kategori
  const style = document.createElement('style');
  style.textContent = `
    .katalog-cat-btn {
      padding: 10px 20px;
      border-radius: 9999px;
      font-weight: 600;
      transition: all 0.3s ease;
      cursor: pointer;
      background-color: #e5e7eb;
      color: #4b5563;
      border: none;
      font-size: 14px;
      display: inline-flex;
      align-items: center;
      gap: 6px;
    }
    .katalog-cat-btn:hover {
      background-color: #d1d5db;
      transform: translateY(-2px);
    }
    .katalog-cat-btn.active-cat {
      background: linear-gradient(135deg, #7e22ce, #a855f7);
      color: white;
      box-shadow: 0 4px 10px rgba(126, 34, 206, 0.3);
    }
    .katalog-gallery-item {
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      cursor: pointer;
    }
    .katalog-gallery-item:active {
      transform: scale(0.98);
    }
  `;
  document.head.appendChild(style);
  
  // Load default kategori
  loadKatalogCategory('Best Haircut');
  
  // Event listeners untuk kategori
  document.querySelectorAll('.katalog-cat-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      // Update active style
      document.querySelectorAll('.katalog-cat-btn').forEach(b => {
        b.classList.remove('active-cat');
      });
      btn.classList.add('active-cat');
      
      const category = btn.getAttribute('data-cat');
      currentKatalogCategory = category;
      await loadKatalogCategory(category);
    });
  });
}

// Fungsi untuk mengambil data dari database
async function fetchKatalogModelsByCategory(kategori) {
  try {
    console.log(`📋 Mengambil data katalog untuk kategori: ${kategori}`);
    
    const { data, error } = await supabaseClient
      .from(KATALOG_TABLE)
      .select('*')
      .eq('kategori', kategori);
    
    if (error) {
      console.error('Error fetching from database:', error);
      return [];
    }
    
    if (data && data.length > 0) {
      // Urutkan berdasarkan nomor
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

// Fungsi untuk mengurutkan berdasarkan nomor
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

// Fungsi untuk load kategori
async function loadKatalogCategory(category) {
  const loading = document.getElementById('katalogLoading');
  const grid = document.getElementById('katalogGrid');
  
  if (!loading || !grid) return;
  
  loading.classList.remove('hidden');
  grid.classList.add('hidden');
  
  try {
    const models = await fetchKatalogModelsByCategory(category);
    
    if (!models || models.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full text-center py-12 bg-white/50 rounded-2xl">
          <i class="fas fa-image text-4xl text-gray-400 mb-2"></i>
          <p class="text-gray-500">Belum ada foto di koleksi ${category}</p>
          <p class="text-gray-400 text-sm mt-2">Silakan tambahkan data pada tabel model_rambut dengan kategori "${category}"</p>
        </div>
      `;
    } else {
      currentKatalogImages = models.map(model => {
        let imageUrl = model.link_url_bucket;
        if (!imageUrl.startsWith('http')) {
          imageUrl = supabaseClient.storage
            .from('model_rambut')
            .getPublicUrl(imageUrl).data.publicUrl;
        }
        
        return {
          url: imageUrl,
          nomor: model.nomor || '???',
          nama: model.nama_model_rambut || 'Model Rambut',
          informasi: model.informasi || 'Informasi belum tersedia'
        };
      });
      
      grid.innerHTML = currentKatalogImages.map((item, idx) => `
        <div class="katalog-gallery-item relative overflow-hidden rounded-xl shadow-md bg-white aspect-square group cursor-pointer" data-index="${idx}">
          <img src="${item.url}" alt="${item.nama}" class="w-full h-full object-cover rounded-xl" loading="lazy"
               onerror="this.onerror=null; this.src='https://placehold.co/400x400/1e293b/ffffff?text=No+Image';">
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <p class="text-white text-sm font-semibold truncate">${escapeKatalogHtml(item.nomor)} - ${escapeKatalogHtml(item.nama)}</p>
          </div>
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition"></div>
        </div>
      `).join('');
      
      // Add click event untuk setiap gambar
      document.querySelectorAll('.katalog-gallery-item').forEach(item => {
        item.addEventListener('click', () => {
          const index = parseInt(item.getAttribute('data-index'));
          openKatalogFullscreen(index);
        });
      });
    }
    
    loading.classList.add('hidden');
    grid.classList.remove('hidden');
  } catch (err) {
    console.error('Error loading category:', err);
    loading.innerHTML = `
      <div class="text-center py-12">
        <i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-2"></i>
        <p class="text-gray-500">Gagal memuat data. Silakan coba lagi.</p>
      </div>
    `;
  }
}

// Escape HTML
function escapeKatalogHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Fullscreen functions
function openKatalogFullscreen(index) {
  if (!currentKatalogImages.length) return;
  currentKatalogIndex = index;
  const item = currentKatalogImages[currentKatalogIndex];
  
  const modal = document.getElementById('katalogFullscreenModal');
  if (!modal) {
    createKatalogFullscreenModal();
  }
  
  const img = document.getElementById('katalogFullscreenImg');
  const name = document.getElementById('katalogFullscreenName');
  const counter = document.getElementById('katalogImageCounter');
  
  if (img) img.src = item.url;
  if (name) name.innerText = `${item.nomor} - ${item.nama}`;
  if (counter) counter.innerText = `${index + 1} / ${currentKatalogImages.length}`;
  
  const modalElement = document.getElementById('katalogFullscreenModal');
  if (modalElement) {
    modalElement.classList.remove('hidden');
    document.body.classList.add('no-scroll');
  }
}

function createKatalogFullscreenModal() {
  const modalHTML = `
    <div id="katalogFullscreenModal" class="fixed inset-0 z-50 hidden fullscreen-overlay">
      <div class="absolute top-5 left-5 z-50">
        <button id="katalogCloseFullscreenBtn" class="bg-black/50 text-white p-3 rounded-full backdrop-blur-sm hover:bg-black/70 active:scale-95 transition">
          <i class="fas fa-arrow-left text-xl"></i>
        </button>
      </div>
      <div class="absolute top-5 right-5 z-50">
        <button id="katalogCloseFullscreenXBtn" class="bg-black/50 text-white p-3 rounded-full backdrop-blur-sm hover:bg-black/70 active:scale-95 transition">
          <i class="fas fa-times text-xl"></i>
        </button>
      </div>
      
      <div class="w-full h-full flex flex-col items-center justify-center relative">
        <img id="katalogFullscreenImg" class="max-w-[90%] max-h-[75vh] object-contain rounded-xl shadow-2xl" src="" alt="Fullscreen">
        <div id="katalogFullscreenName" class="mt-4 text-white text-xl font-bold bg-black/50 px-6 py-2 rounded-full backdrop-blur-sm">-</div>
        <button id="katalogPrevImageBtn" class="absolute left-3 md:left-6 bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-black/70">
          <i class="fas fa-chevron-left text-2xl"></i>
        </button>
        <button id="katalogNextImageBtn" class="absolute right-3 md:right-6 bg-black/50 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-black/70">
          <i class="fas fa-chevron-right text-2xl"></i>
        </button>
      </div>
      <div class="absolute bottom-5 left-0 right-0 text-center text-white/80 text-sm">
        <span id="katalogImageCounter">0 / 0</span>
      </div>
    </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  
  // Add event listeners
  document.getElementById('katalogCloseFullscreenBtn')?.addEventListener('click', closeKatalogFullscreen);
  document.getElementById('katalogCloseFullscreenXBtn')?.addEventListener('click', closeKatalogFullscreen);
  document.getElementById('katalogPrevImageBtn')?.addEventListener('click', katalogPrevImage);
  document.getElementById('katalogNextImageBtn')?.addEventListener('click', katalogNextImage);
  
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
}

// Tambahkan style fullscreen jika belum ada
if (!document.querySelector('#katalogFullscreenStyle')) {
  const fullscreenStyle = document.createElement('style');
  fullscreenStyle.id = 'katalogFullscreenStyle';
  fullscreenStyle.textContent = `
    .fullscreen-overlay {
      background-color: rgba(0, 0, 0, 0.95);
      backdrop-filter: blur(12px);
    }
    body.no-scroll {
      overflow: hidden;
    }
  `;
  document.head.appendChild(fullscreenStyle);
}

console.log('📁 Modul Katalog Model Rambut siap digunakan!');
