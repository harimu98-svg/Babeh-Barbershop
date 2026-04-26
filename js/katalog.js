// Katalog Model Rambut
const SUPABASE_URL = 'https://intzwjmlypmopzauxeqt.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImludHp3am1seXBtb3B6YXV4ZXF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ3MTc5MTIsImV4cCI6MjA3MDI5MzkxMn0.VwwVEDdHtYP5gui4epTcNfLXhPkmfFbRVb5y8mrXJiM';
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

let currentKatalogImages = [];
let currentKatalogIndex = 0;

function renderKatalog(container) {
  container.innerHTML = `
    <div class="max-w-7xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold text-purple-800 mb-2">Katalog Model Rambut</h2>
        <p class="text-gray-500">Inspirasi gaya ramput terbaru untuk Anda</p>
      </div>
      
      <!-- Kategori Menu -->
      <div class="flex flex-wrap justify-center gap-3 mb-8">
        <button class="katalog-cat-btn bg-purple-600 text-white px-4 py-2 rounded-full" data-cat="Best Haircut">Best Haircut</button>
        <button class="katalog-cat-btn bg-gray-200 text-gray-700 px-4 py-2 rounded-full" data-cat="Kids Haircut">Kids Haircut</button>
        <button class="katalog-cat-btn bg-gray-200 text-gray-700 px-4 py-2 rounded-full" data-cat="All Collections">All Collections</button>
        <button class="katalog-cat-btn bg-gray-200 text-gray-700 px-4 py-2 rounded-full" data-cat="Celebrity Haircut">Celebrity</button>
        <button class="katalog-cat-btn bg-gray-200 text-gray-700 px-4 py-2 rounded-full" data-cat="Football Players Haircut">Football Players</button>
        <button class="katalog-cat-btn bg-gray-200 text-gray-700 px-4 py-2 rounded-full" data-cat="Other Service">Other Service</button>
      </div>
      
      <!-- Loading -->
      <div id="katalogLoading" class="text-center py-20">
        <i class="fas fa-spinner fa-spin text-4xl text-purple-600"></i>
        <p class="mt-4 text-gray-500">Memuat koleksi...</p>
      </div>
      
      <!-- Gallery Grid -->
      <div id="katalogGrid" class="grid grid-cols-2 md:grid-cols-4 gap-4 hidden"></div>
    </div>
  `;
  
  // Load default kategori
  loadKatalogCategory('Best Haircut');
  
  // Event listeners untuk kategori
  document.querySelectorAll('.katalog-cat-btn').forEach(btn => {
    btn.addEventListener('click', async () => {
      // Update active style
      document.querySelectorAll('.katalog-cat-btn').forEach(b => {
        b.classList.remove('bg-purple-600', 'text-white');
        b.classList.add('bg-gray-200', 'text-gray-700');
      });
      btn.classList.remove('bg-gray-200', 'text-gray-700');
      btn.classList.add('bg-purple-600', 'text-white');
      
      const category = btn.getAttribute('data-cat');
      await loadKatalogCategory(category);
    });
  });
}

async function loadKatalogCategory(category) {
  const loading = document.getElementById('katalogLoading');
  const grid = document.getElementById('katalogGrid');
  
  loading.classList.remove('hidden');
  grid.classList.add('hidden');
  
  try {
    const { data, error } = await supabase
      .from('model_rambut')
      .select('*')
      .eq('kategori', category);
    
    if (error) throw error;
    
    if (!data || data.length === 0) {
      grid.innerHTML = `<div class="col-span-full text-center py-12">
        <i class="fas fa-image text-4xl text-gray-400 mb-2"></i>
        <p class="text-gray-500">Belum ada foto di koleksi ${category}</p>
      </div>`;
    } else {
      currentKatalogImages = data.map(item => ({
        url: item.link_url_bucket,
        nomor: item.nomor,
        nama: item.nama_model_rambut
      }));
      
      grid.innerHTML = currentKatalogImages.map((item, idx) => `
        <div class="gallery-item relative overflow-hidden rounded-xl shadow-md bg-white aspect-square cursor-pointer" data-index="${idx}">
          <img src="${item.url}" alt="${item.nama}" class="w-full h-full object-cover" loading="lazy"
               onerror="this.onerror=null; this.src='https://placehold.co/400x400/1e293b/ffffff?text=No+Image';">
          <div class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-3">
            <p class="text-white text-sm font-semibold truncate">${item.nomor} - ${item.nama}</p>
          </div>
        </div>
      `).join('');
      
      // Add click event
      document.querySelectorAll('#katalogGrid .gallery-item').forEach(item => {
        item.addEventListener('click', () => {
          const index = parseInt(item.getAttribute('data-index'));
          openKatalogFullscreen(index);
        });
      });
    }
    
    loading.classList.add('hidden');
    grid.classList.remove('hidden');
  } catch (err) {
    console.error('Error:', err);
    loading.innerHTML = `<div class="text-center py-12"><i class="fas fa-exclamation-triangle text-4xl text-red-500 mb-2"></i><p class="text-gray-500">Gagal memuat data</p></div>`;
  }
}

function openKatalogFullscreen(index) {
  if (!currentKatalogImages.length) return;
  currentKatalogIndex = index;
  const item = currentKatalogImages[currentKatalogIndex];
  const modal = document.getElementById('fullscreenModal');
  const img = document.getElementById('fullscreenImg');
  const name = document.getElementById('fullscreenName');
  const counter = document.getElementById('imageCounter');
  
  img.src = item.url;
  name.innerText = `${item.nomor} - ${item.nama}`;
  counter.innerText = `${index+1} / ${currentKatalogImages.length}`;
  modal.classList.remove('hidden');
  document.body.classList.add('no-scroll');
}

// Tambahkan event listener untuk fullscreen
document.addEventListener('DOMContentLoaded', () => {
  const prevBtn = document.getElementById('prevImageBtn');
  const nextBtn = document.getElementById('nextImageBtn');
  const closeBtns = ['closeFullscreenBtn', 'closeFullscreenXBtn'];
  
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentKatalogImages.length) {
        currentKatalogIndex = (currentKatalogIndex - 1 + currentKatalogImages.length) % currentKatalogImages.length;
        const item = currentKatalogImages[currentKatalogIndex];
        document.getElementById('fullscreenImg').src = item.url;
        document.getElementById('fullscreenName').innerText = `${item.nomor} - ${item.nama}`;
        document.getElementById('imageCounter').innerText = `${currentKatalogIndex+1} / ${currentKatalogImages.length}`;
      }
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentKatalogImages.length) {
        currentKatalogIndex = (currentKatalogIndex + 1) % currentKatalogImages.length;
        const item = currentKatalogImages[currentKatalogIndex];
        document.getElementById('fullscreenImg').src = item.url;
        document.getElementById('fullscreenName').innerText = `${item.nomor} - ${item.nama}`;
        document.getElementById('imageCounter').innerText = `${currentKatalogIndex+1} / ${currentKatalogImages.length}`;
      }
    });
  }
  
  closeBtns.forEach(id => {
    const btn = document.getElementById(id);
    if (btn) {
      btn.addEventListener('click', () => {
        document.getElementById('fullscreenModal').classList.add('hidden');
        document.body.classList.remove('no-scroll');
      });
    }
  });
});
