// ============================================================
// SIMULASI.JS - BABEH BARBERSHOP
// Fitur Simulasi Model Rambut dengan Before/After Slider
// Prioritas: SenseNova (gratis) → fallback Nano Banana
// Output: 1 sudut (tampak depan) saja
// ============================================================

// ============================================================
// STATE SIMULASI
// ============================================================
const simulasiState = {
    isProcessing: false,
    selfieBase64: null,
    selfieDataUrl: null,
    selfieNormalized: null,   // versi 1:1 untuk slider
    modelBase64: null,
    modelDataUrl: null,
    modelName: null,
    modelNomor: null,
    resultImageBase64: null,
    resultNormalized: null,   // versi 1:1 untuk slider
    usedProvider: null,
    step: 'select'
};

// ============================================================
// NORMALISASI GAMBAR KE 1:1 (untuk slider before/after)
// ============================================================
function normalizeToSquare(dataUrl, size = 800) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = 'anonymous';
        img.onload = () => {
            const s = Math.min(img.naturalWidth, img.naturalHeight);
            const sx = (img.naturalWidth - s) / 2;
            const sy = (img.naturalHeight - s) / 2;

            const canvas = document.createElement('canvas');
            canvas.width = size;
            canvas.height = size;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, sx, sy, s, s, 0, 0, size, size);
            resolve(canvas.toDataURL('image/jpeg', 0.9));
        };
        img.onerror = reject;
        img.src = dataUrl;
    });
}

// ============================================================
// RENDER VIEW SIMULASI
// ============================================================
function renderSimulasiView() {
    const container = document.getElementById('simulasiContainer');
    if (!container) {
        console.error('❌ simulasiContainer tidak ditemukan!');
        return;
    }

    container.innerHTML = `
        <!-- STEP 1: PILIH MODEL -->
        <div id="simulasiStepSelect" class="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 class="text-xl font-bold text-slate-800 mb-4">
                <i class="fas fa-cut text-purple-600 mr-2"></i>Pilih Model Rambut
            </h3>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <button id="simulasiPilihDariKatalog" class="flex items-center justify-center gap-2 p-4 bg-purple-50 border-2 border-purple-300 rounded-xl hover:bg-purple-100 transition active:scale-95">
                    <i class="fas fa-images text-purple-600 text-xl"></i>
                    <span class="font-medium text-purple-700">Pilih dari Katalog</span>
                </button>
                <button id="simulasiUploadModel" class="flex items-center justify-center gap-2 p-4 bg-blue-50 border-2 border-blue-300 rounded-xl hover:bg-blue-100 transition active:scale-95">
                    <i class="fas fa-upload text-blue-600 text-xl"></i>
                    <span class="font-medium text-blue-700">Upload Model Sendiri</span>
                </button>
            </div>

            <div id="simulasiKatalogGrid" class="hidden grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-4 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-xl"></div>

            <div id="simulasiUploadArea" class="hidden">
                <div class="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer hover:border-purple-400 transition relative">
                    <i class="fas fa-cloud-upload-alt text-4xl text-gray-400"></i>
                    <p class="text-gray-500 mt-2">Klik atau drag & drop gambar model rambut</p>
                    <p class="text-gray-400 text-sm">JPG, PNG, WEBP</p>
                    <div id="simulasiUploadName" class="text-purple-600 font-medium mt-2"></div>
                    <img id="simulasiUploadPreview" class="max-w-full max-h-40 rounded-lg mt-2 hidden" />
                    <input type="file" id="simulasiUploadInput" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer">
                </div>
            </div>

            <div id="simulasiModelPreview" class="hidden mt-4 p-4 bg-gray-50 rounded-xl flex items-center gap-4">
                <img id="simulasiModelPreviewImg" class="w-20 h-20 object-cover rounded-lg border-2 border-purple-300" />
                <div>
                    <p class="font-semibold text-slate-800" id="simulasiModelPreviewName">-</p>
                    <p class="text-sm text-gray-500">Model terpilih</p>
                </div>
                <button id="simulasiChangeModel" class="ml-auto text-sm text-purple-600 hover:text-purple-800">Ganti</button>
            </div>

            <button id="simulasiNextToSelfie" class="hidden w-full mt-4 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition active:scale-95">
                Lanjut ke Upload Selfie <i class="fas fa-arrow-right ml-2"></i>
            </button>
        </div>

        <!-- STEP 2: UPLOAD SELFIE -->
        <div id="simulasiStepSelfie" class="hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 class="text-xl font-bold text-slate-800 mb-4">
                <i class="fas fa-camera text-purple-600 mr-2"></i>Upload Foto Selfie
            </h3>

            <div class="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-purple-400 transition relative">
                <i class="fas fa-user-circle text-5xl text-gray-400"></i>
                <p class="text-gray-500 mt-3">Upload foto selfie Anda</p>
                <p class="text-gray-400 text-sm">Wajah harus jelas, pencahayaan baik</p>
                <div id="simulasiSelfieName" class="text-purple-600 font-medium mt-2"></div>
                <img id="simulasiSelfiePreview" class="max-w-full max-h-60 rounded-lg mt-3 mx-auto hidden" />
                <input type="file" id="simulasiSelfieInput" accept="image/*" class="absolute inset-0 opacity-0 cursor-pointer">
            </div>

            <div class="flex gap-3 mt-4">
                <button id="simulasiBackToSelect" class="flex-1 py-3 bg-gray-200 text-slate-700 rounded-xl font-semibold hover:bg-gray-300 transition active:scale-95">
                    <i class="fas fa-arrow-left mr-2"></i>Kembali
                </button>
                <button id="simulasiGenerateBtn" class="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:opacity-90 transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                    <i class="fas fa-wand-magic-sparkles mr-2"></i>Simulasikan
                </button>
            </div>
        </div>

        <!-- STEP 3: GENERATING -->
        <div id="simulasiStepGenerating" class="hidden bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg text-center">
            <div class="inline-block animate-spin rounded-full h-16 w-16 border-4 border-purple-500 border-t-transparent"></div>
            <h3 class="text-xl font-bold text-slate-800 mt-4">Sedang Memproses...</h3>
            <p class="text-gray-500 mt-2" id="simulasiGeneratingStatus">AI sedang menggambar model rambut baru</p>
            <div class="mt-4 w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
                <div id="simulasiProgressBar" class="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500" style="width: 0%"></div>
            </div>
            <p class="text-gray-400 text-sm mt-2">Tampak depan · 1 gambar</p>
            <div id="simulasiDebugInfo" class="mt-4 text-left bg-black/5 p-4 rounded-xl text-xs text-gray-600 max-h-40 overflow-auto hidden"></div>
        </div>

        <!-- STEP 4: HASIL (Before/After Slider) -->
        <div id="simulasiStepResult" class="hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 class="text-xl font-bold text-slate-800 mb-2 text-center">
                <i class="fas fa-check-circle text-green-500 mr-2"></i>Hasil Simulasi
            </h3>
             <p class="text-center text-sm text-gray-500 mb-4">
                Geser untuk membandingkan sebelum &amp; sesudah
                <span id="simulasiProviderBadge" class="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full"></span>
            </p>

        
            <!-- Before/After Slider -->
            <div class="ba-wrap" id="simulasiBaWrap">
                <img id="simulasiImgBefore" class="ba-before" alt="Sebelum">
                <img id="simulasiImgAfter" class="ba-after" alt="Sesudah">
                <div class="ba-label before">SEBELUM</div>
                <div class="ba-label after">SESUDAH</div>
                <div class="ba-divider" id="simulasiBaDivider"></div>
                <div class="ba-handle" id="simulasiBaHandle">⇔</div>
            </div>

            <div class="flex flex-wrap gap-3 mt-5 justify-center">
                <button id="simulasiDownloadBtn" class="px-6 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition active:scale-95">
                    <i class="fas fa-download mr-2"></i>Simpan
                </button>
                <button id="simulasiTryAgainBtn" class="px-6 py-2 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition active:scale-95">
                    <i class="fas fa-redo mr-2"></i>Coba Lagi
                </button>
                <button id="simulasiDoneBtn" class="px-6 py-2 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition active:scale-95">
                    <i class="fas fa-check mr-2"></i>Selesai
                </button>
            </div>
             <p class="text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4 text-left leading-relaxed">
                <i class="fas fa-exclamation-triangle mr-1"></i>
                <strong>Disclaimer:</strong> Simulasi AI hanya prediksi untuk memberikan gambaran model rambut, hasil potongan bisa berbeda tergantung jenis dan kondisi rambut, bentuk wajah, dan faktor lainnya.
            </p>
        </div>
    `;

    // Tambahkan style untuk slider (sekali saja)
    if (!document.querySelector('#simulasiSliderStyle')) {
        const style = document.createElement('style');
        style.id = 'simulasiSliderStyle';
        style.textContent = `
            .ba-wrap {
                position: relative;
                width: 100%;
                max-width: 500px;
                margin: 0 auto;
                border-radius: 12px;
                overflow: hidden;
                background: #eee;
                aspect-ratio: 1 / 1;
                user-select: none;
                touch-action: none;
            }
            .ba-wrap img {
                position: absolute;
                top: 0; left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
                pointer-events: none;
            }
            .ba-after {
                clip-path: inset(0 0 0 100%);
            }
            .ba-wrap.animating .ba-after {
                transition: clip-path 2.5s ease-in-out;
            }
            .ba-divider {
                position: absolute;
                top: 0; bottom: 0;
                width: 3px;
                background: #fff;
                left: 100%;
                transform: translateX(-50%);
                box-shadow: 0 0 8px rgba(0,0,0,0.4);
                pointer-events: none;
            }
            .ba-wrap.animating .ba-divider {
                transition: left 2.5s ease-in-out;
            }
            .ba-handle {
                position: absolute;
                top: 50%;
                left: 100%;
                transform: translate(-50%, -50%);
                width: 44px;
                height: 44px;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                cursor: grab;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 18px;
                color: #333;
                z-index: 2;
            }
            .ba-wrap.animating .ba-handle {
                transition: left 2.5s ease-in-out;
            }
            .ba-handle:active { cursor: grabbing; }
            .ba-label {
                position: absolute;
                top: 12px;
                padding: 4px 10px;
                background: rgba(0,0,0,0.55);
                color: #fff;
                font-size: 12px;
                font-weight: 600;
                border-radius: 6px;
                letter-spacing: 0.5px;
                z-index: 3;
            }
            .ba-label.before { left: 12px; }
            .ba-label.after { right: 12px; }
        `;
        document.head.appendChild(style);
    }
}

// ============================================================
// TAMPILKAN STEP
// ============================================================
function showSimulasiStep(step) {
    const steps = ['simulasiStepSelect', 'simulasiStepSelfie', 'simulasiStepGenerating', 'simulasiStepResult'];
    const stepMap = {
        'select': 'simulasiStepSelect',
        'selfie': 'simulasiStepSelfie',
        'generating': 'simulasiStepGenerating',
        'result': 'simulasiStepResult'
    };

    steps.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.classList.toggle('hidden', id !== stepMap[step]);
        }
    });

    simulasiState.step = step;
}

// ============================================================
// PREVIEW MODEL
// ============================================================
function showSimulasiModelPreview(url, name) {
    const container = document.getElementById('simulasiModelPreview');
    const img = document.getElementById('simulasiModelPreviewImg');
    const nameEl = document.getElementById('simulasiModelPreviewName');

    if (container && img && nameEl) {
        container.classList.remove('hidden');
        img.src = url;
        nameEl.textContent = name || 'Model Rambut';
    }
}

// ============================================================
// RENDER KATALOG UNTUK SIMULASI
// ============================================================
function renderSimulasiKatalog(images) {
    const grid = document.getElementById('simulasiKatalogGrid');
    if (!grid) return;

    if (!images || images.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full text-center py-4 text-gray-500">
                <i class="fas fa-image text-2xl mb-2"></i>
                <p>Belum ada model di kategori ini</p>
            </div>`;
        return;
    }

    grid.innerHTML = images.map((item, idx) => `
        <div class="simulasi-katalog-item border-2 border-transparent rounded-xl overflow-hidden cursor-pointer hover:border-purple-400 transition active:scale-95" 
             data-index="${idx}" 
             data-url="${item.url}" 
             data-nama="${item.nama}" 
             data-nomor="${item.nomor}">
            <img src="${item.url}" alt="${item.nama}" class="w-full h-24 object-cover" 
                 onerror="this.src='https://placehold.co/200x200/1e293b/ffffff?text=No+Image'">
            <div class="p-1 text-center text-xs font-medium text-slate-700 truncate">${item.nomor} - ${item.nama}</div>
        </div>
    `).join('');

    grid.querySelectorAll('.simulasi-katalog-item').forEach(el => {
        el.addEventListener('click', () => {
            const url = el.dataset.url;
            const nama = el.dataset.nama;
            const nomor = el.dataset.nomor;

            grid.querySelectorAll('.simulasi-katalog-item').forEach(i => i.classList.remove('border-purple-400', 'bg-purple-50'));
            el.classList.add('border-purple-400', 'bg-purple-50');

            simulasiState.modelDataUrl = url;
            simulasiState.modelName = nama;
            simulasiState.modelNomor = nomor;

            fetch(url)
                .then(res => res.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        simulasiState.modelBase64 = ev.target.result.split(',')[1];
                        showSimulasiModelPreview(url, `${nomor} - ${nama}`);
                        document.getElementById('simulasiNextToSelfie')?.classList.remove('hidden');
                    };
                    reader.readAsDataURL(blob);
                })
                .catch(() => {
                    showSimulasiModelPreview(url, `${nomor} - ${nama}`);
                    document.getElementById('simulasiNextToSelfie')?.classList.remove('hidden');
                });
        });
    });
}

// ============================================================
// BUKA SIMULASI
// ============================================================
function openSimulasi(selectedModel = null) {
    const menuContainer = document.getElementById('katalogMenuContainer');
    const galleryView = document.getElementById('katalogGalleryView');

    if (menuContainer) menuContainer.classList.add('hidden');
    if (galleryView) galleryView.classList.add('hidden');

    let simulasiView = document.getElementById('simulasiView');
    if (!simulasiView) {
        const parent = document.querySelector('.max-w-7xl.mx-auto') || document.body;
        const div = document.createElement('div');
        div.id = 'simulasiView';
        div.className = 'hidden max-w-4xl mx-auto px-4';
        div.innerHTML = '<div id="simulasiContainer"></div>';
        parent.appendChild(div);
        simulasiView = div;
    }

    simulasiView.classList.remove('hidden');
    renderSimulasiView();

    simulasiState.step = 'select';
    simulasiState.selfieBase64 = null;
    simulasiState.selfieDataUrl = null;
    simulasiState.selfieNormalized = null;
    simulasiState.resultImageBase64 = null;
    simulasiState.resultNormalized = null;
    simulasiState.usedProvider = null;

    if (selectedModel) {
        simulasiState.modelDataUrl = selectedModel.url;
        simulasiState.modelBase64 = selectedModel.base64 || null;
        simulasiState.modelName = selectedModel.nama;
        simulasiState.modelNomor = selectedModel.nomor;
        showSimulasiStep('select');
        showSimulasiModelPreview(selectedModel.url, selectedModel.nama);
        document.getElementById('simulasiNextToSelfie')?.classList.remove('hidden');
    } else {
        showSimulasiStep('select');
        document.getElementById('simulasiNextToSelfie')?.classList.add('hidden');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    initSimulasiEvents();
}

// ============================================================
// INIT EVENT LISTENER
// ============================================================
function initSimulasiEvents() {
    // === BACK TO SELECT ===
    document.getElementById('simulasiBackToSelect')?.addEventListener('click', () => {
        showSimulasiStep('select');
    });

    // === NEXT TO SELFIE ===
    document.getElementById('simulasiNextToSelfie')?.addEventListener('click', () => {
        if (!simulasiState.modelDataUrl) {
            alert('Silakan pilih model rambut terlebih dahulu!');
            return;
        }
        showSimulasiStep('selfie');
        document.getElementById('simulasiGenerateBtn').disabled = true;
    });

    // === PILIH DARI KATALOG ===
    document.getElementById('simulasiPilihDariKatalog')?.addEventListener('click', async () => {
        const grid = document.getElementById('simulasiKatalogGrid');
        const uploadArea = document.getElementById('simulasiUploadArea');

        if (grid) grid.classList.toggle('hidden');
        if (uploadArea) uploadArea.classList.add('hidden');

        document.getElementById('simulasiUploadInput').value = '';
        document.getElementById('simulasiUploadPreview')?.classList.add('hidden');
        document.getElementById('simulasiUploadName').textContent = '';

        if (grid && grid.children.length === 0) {
            if (window.currentKatalogImages && window.currentKatalogImages.length > 0) {
                renderSimulasiKatalog(window.currentKatalogImages);
            } else {
                const supabase = window.getSupabaseClient ? window.getSupabaseClient() : null;
                if (supabase) {
                    try {
                        const { data } = await supabase
                            .from('model_rambut')
                            .select('*')
                            .eq('kategori', 'Best Haircut')
                            .limit(20);

                        if (data && data.length > 0) {
                            const images = data.map(item => ({
                                url: supabase.storage.from('model_rambut').getPublicUrl(item.link_url_bucket).data.publicUrl,
                                nomor: item.nomor || '???',
                                nama: item.nama_model_rambut || 'Model Rambut',
                                informasi: item.informasi || ''
                            }));
                            renderSimulasiKatalog(images);
                        }
                    } catch (e) {
                        console.error('Gagal ambil data:', e);
                    }
                }
            }
        }
    });

    // === UPLOAD MODEL SENDIRI ===
    document.getElementById('simulasiUploadModel')?.addEventListener('click', () => {
        const grid = document.getElementById('simulasiKatalogGrid');
        const uploadArea = document.getElementById('simulasiUploadArea');

        if (grid) grid.classList.add('hidden');
        if (uploadArea) uploadArea.classList.toggle('hidden');

        grid?.querySelectorAll('.simulasi-katalog-item').forEach(el => {
            el.classList.remove('border-purple-400', 'bg-purple-50');
        });
    });

    // === UPLOAD MODEL INPUT ===
    document.getElementById('simulasiUploadInput')?.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const dataUrl = ev.target.result;
            const base64 = dataUrl.split(',')[1];

            simulasiState.modelDataUrl = dataUrl;
            simulasiState.modelBase64 = base64;
            simulasiState.modelName = file.name;
            simulasiState.modelNomor = 'Upload';

            const preview = document.getElementById('simulasiUploadPreview');
            const nameEl = document.getElementById('simulasiUploadName');
            if (preview) {
                preview.src = dataUrl;
                preview.classList.remove('hidden');
            }
            if (nameEl) nameEl.textContent = `✅ ${file.name}`;

            showSimulasiModelPreview(dataUrl, file.name);
            document.getElementById('simulasiNextToSelfie')?.classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    });

    // === GANTI MODEL ===
    document.getElementById('simulasiChangeModel')?.addEventListener('click', () => {
        document.getElementById('simulasiModelPreview')?.classList.add('hidden');
        document.getElementById('simulasiNextToSelfie')?.classList.add('hidden');
        showSimulasiStep('select');
        document.getElementById('simulasiKatalogGrid')?.classList.add('hidden');
        document.getElementById('simulasiUploadArea')?.classList.add('hidden');
        simulasiState.modelDataUrl = null;
        simulasiState.modelBase64 = null;
        simulasiState.modelName = null;
    });

    // === UPLOAD SELFIE ===
    document.getElementById('simulasiSelfieInput')?.addEventListener('change', async function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (ev) => {
            const dataUrl = ev.target.result;
            const base64 = dataUrl.split(',')[1];

            simulasiState.selfieDataUrl = dataUrl;
            simulasiState.selfieBase64 = base64;

            // Normalisasi untuk slider before/after
            try {
                simulasiState.selfieNormalized = await normalizeToSquare(dataUrl);
            } catch (e) {
                console.warn('Gagal normalisasi selfie:', e);
                simulasiState.selfieNormalized = dataUrl;
            }

            const preview = document.getElementById('simulasiSelfiePreview');
            const nameEl = document.getElementById('simulasiSelfieName');
            if (preview) {
                preview.src = simulasiState.selfieNormalized;
                preview.classList.remove('hidden');
            }
            if (nameEl) nameEl.textContent = `✅ ${file.name}`;

            document.getElementById('simulasiGenerateBtn').disabled = false;
        };
        reader.readAsDataURL(file);
    });

    // === TOMBOL GENERATE ===
    document.getElementById('simulasiGenerateBtn')?.addEventListener('click', async () => {
        if (!simulasiState.selfieBase64 || !simulasiState.modelDataUrl) {
            alert('Pastikan foto selfie dan model rambut sudah diupload!');
            return;
        }

        if (!simulasiState.modelBase64 && simulasiState.modelDataUrl) {
            try {
                const response = await fetch(simulasiState.modelDataUrl);
                const blob = await response.blob();
                const reader = new FileReader();
                const base64 = await new Promise((resolve) => {
                    reader.onload = () => resolve(reader.result.split(',')[1]);
                    reader.readAsDataURL(blob);
                });
                simulasiState.modelBase64 = base64;
            } catch (e) {
                alert('Gagal memproses gambar model: ' + e.message);
                return;
            }
        }

        showSimulasiStep('generating');

        const statusEl = document.getElementById('simulasiGeneratingStatus');
        const progressEl = document.getElementById('simulasiProgressBar');
        const debugEl = document.getElementById('simulasiDebugInfo');
        if (debugEl) debugEl.classList.remove('hidden');

        let imageBase64 = null;
        let usedProvider = null;

        // === PERCOBAAN 1: SENSENOVA (GRATIS) ===
        try {
            statusEl.textContent = 'Mencoba dengan SenseNova (gratis)...';
            progressEl.style.width = '10%';
            if (debugEl) debugEl.textContent = '📤 [1/2] Mengirim ke SenseNova...';

            const response = await fetch('/.netlify/functions/sensenova', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    selfieBase64: simulasiState.selfieBase64,
                    modelBase64: simulasiState.modelBase64,
                    modelName: simulasiState.modelName || 'Model Rambut'
                })
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}`);
            }

            statusEl.textContent = 'Memproses hasil SenseNova...';
            progressEl.style.width = '50%';

            const data = await response.json();
            console.log('📥 SenseNova response:', JSON.stringify(data).substring(0, 300));

            if (data.data && data.data[0]) {
                if (data.data[0].b64_json) {
                    imageBase64 = data.data[0].b64_json;
                } else if (data.data[0].url) {
                    const imgRes = await fetch(data.data[0].url);
                    const imgBlob = await imgRes.blob();
                    const reader = new FileReader();
                    imageBase64 = await new Promise((resolve) => {
                        reader.onload = () => resolve(reader.result.split(',')[1]);
                        reader.readAsDataURL(imgBlob);
                    });
                }
            }

            if (imageBase64) {
                usedProvider = 'SenseNova (gratis)';
                console.log('✅ Berhasil dengan SenseNova');
            } else {
                throw new Error('SenseNova tidak mengembalikan gambar');
            }

        } catch (err) {
            console.warn('❌ SenseNova gagal:', err.message);
            if (debugEl) debugEl.textContent += `\n❌ SenseNova gagal: ${err.message}`;
        }

        // === PERCOBAAN 2: NANO BANANA (FALLBACK) ===
        if (!imageBase64) {
            try {
                statusEl.textContent = 'SenseNova gagal, mencoba Nano Banana...';
                progressEl.style.width = '60%';
                if (debugEl) debugEl.textContent += '\n📤 [2/2] Mengirim ke Nano Banana...';

                const response = await fetch('/.netlify/functions/nano-banana', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        selfieBase64: simulasiState.selfieBase64,
                        modelBase64: simulasiState.modelBase64,
                        modelName: simulasiState.modelName || 'Model Rambut'
                    })
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP ${response.status}: ${errorText.substring(0, 100)}`);
                }

                const data = await response.json();
                console.log('📥 Nano Banana response:', JSON.stringify(data).substring(0, 300));

                const parts = data.candidates?.[0]?.content?.parts;
                if (parts) {
                    for (const part of parts) {
                        if (part.inlineData && part.inlineData.data) {
                            imageBase64 = part.inlineData.data;
                            break;
                        }
                    }
                }

                if (imageBase64) {
                    usedProvider = 'Nano Banana (fallback)';
                    console.log('✅ Berhasil dengan Nano Banana');
                } else {
                    throw new Error('Nano Banana tidak mengembalikan gambar');
                }

            } catch (err) {
                console.error('❌ Nano Banana gagal:', err.message);
                if (debugEl) debugEl.textContent += `\n❌ Nano Banana gagal: ${err.message}`;
            }
        }

        // === HASIL AKHIR ===
        if (!imageBase64) {
            statusEl.textContent = 'Gagal - kedua provider error';
            alert('Gagal generate: SenseNova dan Nano Banana sama-sama gagal. Coba lagi nanti.');
            showSimulasiStep('selfie');
            return;
        }

        progressEl.style.width = '100%';
        statusEl.textContent = `Selesai! (${usedProvider})`;
        if (debugEl) debugEl.textContent += `\n\n✅ Berhasil via ${usedProvider}`;

        simulasiState.resultImageBase64 = imageBase64;
        simulasiState.usedProvider = usedProvider;

        // Normalisasi hasil untuk slider
        try {
            const resultDataUrl = `data:image/jpeg;base64,${imageBase64}`;
            simulasiState.resultNormalized = await normalizeToSquare(resultDataUrl);
        } catch (e) {
            console.warn('Gagal normalisasi hasil:', e);
            simulasiState.resultNormalized = `data:image/jpeg;base64,${imageBase64}`;
        }

        showSimulasiResult();
    });
}

// ============================================================
// TAMPILKAN HASIL (Before/After Slider)
// ============================================================
function showSimulasiResult() {
    showSimulasiStep('result');

    const imgBefore = document.getElementById('simulasiImgBefore');
    const imgAfter = document.getElementById('simulasiImgAfter');
    const baWrap = document.getElementById('simulasiBaWrap');
    const divider = document.getElementById('simulasiBaDivider');
    const handle = document.getElementById('simulasiBaHandle');

    // Badge provider
    const badge = document.getElementById('simulasiProviderBadge');
    if (badge && simulasiState.usedProvider) {
        badge.textContent = simulasiState.usedProvider;
    }

    // Set gambar
    imgBefore.src = simulasiState.selfieNormalized;
    imgAfter.src = simulasiState.resultNormalized;

    // === SLIDER LOGIC ===
    let sliderPos = 100;   // 0 = sesudah full, 100 = sebelum full
    let isDragging = false;

    function setSlider(pct) {
        sliderPos = Math.max(0, Math.min(100, pct));
        imgAfter.style.clipPath = `inset(0 0 0 ${sliderPos}%)`;
        divider.style.left = sliderPos + '%';
        handle.style.left = sliderPos + '%';
    }

    // Set awal: full SEBELUM
    baWrap.classList.remove('animating');
    setSlider(100);

    // Mouse events
    baWrap.addEventListener('mousedown', (e) => {
        isDragging = true;
        baWrap.classList.remove('animating');
        updateFromEvent(e);
    });
    window.addEventListener('mousemove', (e) => {
        if (isDragging) updateFromEvent(e);
    });
    window.addEventListener('mouseup', () => { isDragging = false; });

    // Touch events
    baWrap.addEventListener('touchstart', (e) => {
        isDragging = true;
        baWrap.classList.remove('animating');
        updateFromEvent(e.touches[0]);
    }, { passive: true });
    window.addEventListener('touchmove', (e) => {
        if (isDragging) updateFromEvent(e.touches[0]);
    }, { passive: true });
    window.addEventListener('touchend', () => { isDragging = false; });

    function updateFromEvent(e) {
        const rect = baWrap.getBoundingClientRect();
        const x = e.clientX - rect.left;
        // Swipe kanan → tampil SESUDAH (slider ke 0)
        // Swipe kiri → tampil SEBELUM (slider ke 100)
        const pct = (1 - x / rect.width) * 100;
        setSlider(pct);
    }

    // Tunggu kedua gambar load, lalu animasi smooth
    let loaded = 0;
    const onLoaded = () => {
        loaded++;
        if (loaded === 2) {
            // Force reflow
            void baWrap.offsetWidth;
            // Animasi otomatis dari before → after
            setTimeout(() => {
                baWrap.classList.add('animating');
                requestAnimationFrame(() => setSlider(0));
            }, 300);
        }
    };
    imgBefore.onload = onLoaded;
    imgAfter.onload = onLoaded;

    // === TOMBOL ===
    document.getElementById('simulasiDownloadBtn')?.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = `simulasi-rambut-${simulasiState.modelNomor || 'custom'}.jpg`;
        link.href = `data:image/jpeg;base64,${simulasiState.resultImageBase64}`;
        link.click();
    });

    document.getElementById('simulasiTryAgainBtn')?.addEventListener('click', () => {
        showSimulasiStep('selfie');
        document.getElementById('simulasiSelfieInput').value = '';
        document.getElementById('simulasiSelfiePreview')?.classList.add('hidden');
        document.getElementById('simulasiSelfieName').textContent = '';
        simulasiState.selfieBase64 = null;
        simulasiState.selfieDataUrl = null;
        simulasiState.selfieNormalized = null;
        document.getElementById('simulasiGenerateBtn').disabled = true;
    });

    document.getElementById('simulasiDoneBtn')?.addEventListener('click', () => {
        const menuContainer = document.getElementById('katalogMenuContainer');
        const simulasiView = document.getElementById('simulasiView');
        if (menuContainer) menuContainer.classList.remove('hidden');
        if (simulasiView) simulasiView.classList.add('hidden');
        simulasiState.step = 'select';
        simulasiState.resultImageBase64 = null;
        simulasiState.resultNormalized = null;
        simulasiState.selfieBase64 = null;
        simulasiState.selfieDataUrl = null;
        simulasiState.selfieNormalized = null;
        showSimulasiStep('select');
        document.getElementById('simulasiModelPreview')?.classList.add('hidden');
        document.getElementById('simulasiNextToSelfie')?.classList.add('hidden');
    });
}

// ============================================================
// EXPORT
// ============================================================
window.openSimulasi = openSimulasi;

console.log('📁 Modul Simulasi (1 sudut, before/after slider) siap!');
