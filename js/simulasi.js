// ============================================================
// SIMULASI.JS - BABEH BARBERSHOP
// Fitur Simulasi Model Rambut dengan Nano Banana 2 Lite
// ============================================================

// ============================================================
// STATE SIMULASI
// ============================================================
const simulasiState = {
    isProcessing: false,
    selfieBase64: null,
    selfieDataUrl: null,
    modelBase64: null,
    modelDataUrl: null,
    modelName: null,
    modelNomor: null,
    resultImageBase64: null,
    step: 'select'
};

// ============================================================
// RENDER VIEW SIMULASI
// ============================================================
function renderSimulasiView() {
    const container = document.getElementById('simulasiContainer');
    if (!container) return;

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

            <!-- Grid katalog untuk simulasi -->
            <div id="simulasiKatalogGrid" class="hidden grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-4 max-h-60 overflow-y-auto p-2 border border-gray-200 rounded-xl"></div>

            <!-- Upload sendiri -->
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

            <!-- Preview model terpilih -->
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
            <p class="text-gray-400 text-sm mt-2">3 sudut pandang (depan, samping, belakang) dalam 1 gambar</p>
        </div>

        <!-- STEP 4: HASIL -->
        <div id="simulasiStepResult" class="hidden bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
            <h3 class="text-xl font-bold text-slate-800 mb-4 text-center">
                <i class="fas fa-check-circle text-green-500 mr-2"></i>Hasil Simulasi
            </h3>
            <div class="flex justify-center">
                <img id="simulasiResultImg" class="max-w-full max-h-[60vh] rounded-xl shadow-lg" />
            </div>
            <div class="text-center text-sm text-gray-500 mt-3">
                <i class="fas fa-info-circle mr-1"></i> 3 sudut pandang: Depan · Samping · Belakang
            </div>
            <div class="flex flex-wrap gap-3 mt-4 justify-center">
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
        </div>
    `;
}

// ============================================================
// BUKA SIMULASI
// ============================================================
function openSimulasi(selectedModel = null) {
    // Sembunyikan menu dan gallery
    const menuContainer = document.getElementById('katalogMenuContainer');
    const galleryView = document.getElementById('katalogGalleryView');
    const simulasiView = document.getElementById('simulasiView');

    if (menuContainer) menuContainer.classList.add('hidden');
    if (galleryView) galleryView.classList.add('hidden');
    if (simulasiView) simulasiView.classList.remove('hidden');

    // Render view simulasi
    renderSimulasiView();

    // Reset state
    simulasiState.step = 'select';
    simulasiState.selfieBase64 = null;
    simulasiState.selfieDataUrl = null;

    // Jika ada model yang dipilih dari gallery
    if (selectedModel) {
        simulasiState.modelDataUrl = selectedModel.url;
        simulasiState.modelBase64 = selectedModel.base64 || null;
        simulasiState.modelName = selectedModel.nama;
        simulasiState.modelNomor = selectedModel.nomor;
        showSimulasiStep('select');
        showSimulasiModelPreview(selectedModel.url, selectedModel.nama);
        document.getElementById('simulasiNextToSelfie').classList.remove('hidden');
    } else {
        showSimulasiStep('select');
        document.getElementById('simulasiNextToSelfie').classList.add('hidden');
    }

    // Scroll ke atas
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Inisialisasi event listener
    initSimulasiEvents();
}

// ============================================================
// TAMPILKAN STEP
// ============================================================
function showSimulasiStep(step) {
    const steps = {
        select: document.getElementById('simulasiStepSelect'),
        selfie: document.getElementById('simulasiStepSelfie'),
        generating: document.getElementById('simulasiStepGenerating'),
        result: document.getElementById('simulasiStepResult')
    };

    Object.keys(steps).forEach(key => {
        if (steps[key]) {
            steps[key].classList.toggle('hidden', key !== step);
        }
    });

    simulasiState.step = step;
}

// ============================================================
// TAMPILKAN PREVIEW MODEL
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

    // Event klik
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

            // Ambil base64 dari URL
            fetch(url)
                .then(res => res.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        simulasiState.modelBase64 = ev.target.result.split(',')[1];
                        showSimulasiModelPreview(url, `${nomor} - ${nama}`);
                        document.getElementById('simulasiNextToSelfie').classList.remove('hidden');
                    };
                    reader.readAsDataURL(blob);
                })
                .catch(() => {
                    showSimulasiModelPreview(url, `${nomor} - ${nama}`);
                    document.getElementById('simulasiNextToSelfie').classList.remove('hidden');
                });
        });
    });
}

// ============================================================
// EVENT LISTENER SIMULASI
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
        document.getElementById('simulasiUploadPreview').classList.add('hidden');
        document.getElementById('simulasiUploadName').textContent = '';

        if (grid && grid.children.length === 0) {
            // Ambil data dari katalog yang sudah dimuat
            if (window.currentKatalogImages && window.currentKatalogImages.length > 0) {
                renderSimulasiKatalog(window.currentKatalogImages);
            } else {
                // Coba ambil dari Supabase
                const supabase = getKatalogSupabaseClient();
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

    // === UPLOAD MODEL ===
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
            document.getElementById('simulasiNextToSelfie').classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    });

    // === CHANGE MODEL ===
    document.getElementById('simulasiChangeModel')?.addEventListener('click', () => {
        document.getElementById('simulasiModelPreview').classList.add('hidden');
        document.getElementById('simulasiNextToSelfie').classList.add('hidden');
        showSimulasiStep('select');
        document.getElementById('simulasiKatalogGrid').classList.add('hidden');
        document.getElementById('simulasiUploadArea').classList.add('hidden');
        simulasiState.modelDataUrl = null;
        simulasiState.modelBase64 = null;
        simulasiState.modelName = null;
    });

    // === UPLOAD SELFIE ===
    document.getElementById('simulasiSelfieInput')?.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (ev) => {
            const dataUrl = ev.target.result;
            const base64 = dataUrl.split(',')[1];

            simulasiState.selfieDataUrl = dataUrl;
            simulasiState.selfieBase64 = base64;

            const preview = document.getElementById('simulasiSelfiePreview');
            const nameEl = document.getElementById('simulasiSelfieName');
            if (preview) {
                preview.src = dataUrl;
                preview.classList.remove('hidden');
            }
            if (nameEl) nameEl.textContent = `✅ ${file.name}`;

            document.getElementById('simulasiGenerateBtn').disabled = false;
        };
        reader.readAsDataURL(file);
    });

    // === GENERATE ===
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
        document.getElementById('simulasiGeneratingStatus').textContent = 'AI sedang menggambar model rambut baru...';
        document.getElementById('simulasiProgressBar').style.width = '10%';

        try {
            const response = await fetch('/.netlify/functions/nano-banana', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    selfieBase64: simulasiState.selfieBase64,
                    modelBase64: simulasiState.modelBase64,
                    modelName: simulasiState.modelName || 'Model Rambut'
                })
            });

            document.getElementById('simulasiProgressBar').style.width = '50%';
            document.getElementById('simulasiGeneratingStatus').textContent = 'Sedang memproses hasil...';

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || `HTTP ${response.status}`);
            }

            const data = await response.json();
            document.getElementById('simulasiProgressBar').style.width = '80%';
            document.getElementById('simulasiGeneratingStatus').textContent = 'Hampir selesai...';

            const parts = data.candidates?.[0]?.content?.parts;
            let imageBase64 = null;
            if (parts) {
                for (const part of parts) {
                    if (part.inline_data && part.inline_data.data) {
                        imageBase64 = part.inline_data.data;
                        break;
                    }
                }
            }

            if (!imageBase64) {
                throw new Error('Tidak ada gambar dalam response AI');
            }

            document.getElementById('simulasiProgressBar').style.width = '100%';
            simulasiState.resultImageBase64 = imageBase64;
            showSimulasiResult(imageBase64);

        } catch (error) {
            console.error('❌ Error:', error);
            alert('Gagal generate: ' + error.message);
            showSimulasiStep('selfie');
        }
    });

    // === TOMBOL DARI GALLERY ===
    document.querySelectorAll('.simulasi-from-gallery-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const url = this.dataset.url;
            const nama = this.dataset.nama;
            const nomor = this.dataset.nomor;

            fetch(url)
                .then(res => res.blob())
                .then(blob => {
                    const reader = new FileReader();
                    reader.onload = (ev) => {
                        const dataUrl = ev.target.result;
                        const base64 = dataUrl.split(',')[1];
                        simulasiState.modelDataUrl = dataUrl;
                        simulasiState.modelBase64 = base64;
                        simulasiState.modelName = nama;
                        simulasiState.modelNomor = nomor;

                        openSimulasi({ url: dataUrl, nama: `${nomor} - ${nama}`, base64: base64, nomor: nomor });
                        document.getElementById('simulasiNextToSelfie').classList.remove('hidden');
                    };
                    reader.readAsDataURL(blob);
                })
                .catch(err => {
                    alert('Gagal memuat gambar: ' + err.message);
                });
        });
    });
}

// ============================================================
// TAMPILKAN HASIL
// ============================================================
function showSimulasiResult(imageBase64) {
    showSimulasiStep('result');

    const img = document.getElementById('simulasiResultImg');
    if (img) img.src = `data:image/jpeg;base64,${imageBase64}`;

    // Download
    document.getElementById('simulasiDownloadBtn')?.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = `simulasi-rambut-${simulasiState.modelNomor || 'custom'}.jpg`;
        link.href = `data:image/jpeg;base64,${imageBase64}`;
        link.click();
    });

    // Try Again
    document.getElementById('simulasiTryAgainBtn')?.addEventListener('click', () => {
        showSimulasiStep('selfie');
        document.getElementById('simulasiSelfieInput').value = '';
        document.getElementById('simulasiSelfiePreview').classList.add('hidden');
        document.getElementById('simulasiSelfieName').textContent = '';
        simulasiState.selfieBase64 = null;
        simulasiState.selfieDataUrl = null;
        document.getElementById('simulasiGenerateBtn').disabled = true;
    });

    // Done
    document.getElementById('simulasiDoneBtn')?.addEventListener('click', () => {
        const menuContainer = document.getElementById('katalogMenuContainer');
        const simulasiView = document.getElementById('simulasiView');
        if (menuContainer) menuContainer.classList.remove('hidden');
        if (simulasiView) simulasiView.classList.add('hidden');
        simulasiState.step = 'select';
        simulasiState.resultImageBase64 = null;
        simulasiState.selfieBase64 = null;
        simulasiState.selfieDataUrl = null;
        showSimulasiStep('select');
        document.getElementById('simulasiModelPreview').classList.add('hidden');
        document.getElementById('simulasiNextToSelfie').classList.add('hidden');
        // Refresh katalog jika perlu
        if (typeof loadKatalogCategory === 'function' && currentKatalogCategory) {
            loadKatalogCategory(currentKatalogCategory);
        }
    });
}

// ============================================================
// INISIALISASI
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        // Render view simulasi di container
        const container = document.getElementById('simulasiContainer');
        if (container) {
            renderSimulasiView();
        }
        console.log('📁 Modul Simulasi Model Rambut siap digunakan!');
    }, 500);
});

// Export fungsi untuk dipanggil dari katalog.js
window.openSimulasi = openSimulasi;
