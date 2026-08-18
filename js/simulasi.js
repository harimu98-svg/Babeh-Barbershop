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
    step: 'select' // 'select' | 'selfie' | 'generating' | 'result'
};

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
// RENDER KATALOG UNTUK SIMULASI (mini grid)
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

            // Hapus active sebelumnya
            grid.querySelectorAll('.simulasi-katalog-item').forEach(i => i.classList.remove('border-purple-400', 'bg-purple-50'));
            el.classList.add('border-purple-400', 'bg-purple-50');

            // Simpan model yang dipilih
            simulasiState.modelDataUrl = url;
            simulasiState.modelName = nama;
            simulasiState.modelNomor = nomor;

            // Tampilkan preview
            showSimulasiModelPreview(url, `${nomor} - ${nama}`);

            // Tampilkan tombol next
            document.getElementById('simulasiNextToSelfie').classList.remove('hidden');
        });
    });
}

// ============================================================
// EVENT LISTENER - INIT SIMULASI
// ============================================================
function initSimulasi() {
    // === CARD SIMULASI DI MENU ===
    document.getElementById('simulasiMenuCard')?.addEventListener('click', () => {
        // Reset state
        simulasiState.modelDataUrl = null;
        simulasiState.modelName = null;
        simulasiState.modelNomor = null;
        document.getElementById('simulasiModelPreview').classList.add('hidden');
        document.getElementById('simulasiNextToSelfie').classList.add('hidden');
        document.getElementById('simulasiKatalogGrid').classList.add('hidden');
        document.getElementById('simulasiUploadArea').classList.add('hidden');
        document.getElementById('simulasiUploadInput').value = '';
        document.getElementById('simulasiUploadPreview').classList.add('hidden');
        document.getElementById('simulasiUploadName').textContent = '';

        openSimulasi();
    });

    // === TOMBOL BACK ===
    document.getElementById('simulasiBackBtn')?.addEventListener('click', () => {
        const menuContainer = document.getElementById('katalogMenuContainer');
        const simulasiView = document.getElementById('simulasiView');
        if (menuContainer) menuContainer.classList.remove('hidden');
        if (simulasiView) simulasiView.classList.add('hidden');
    });

    // === PILIH DARI KATALOG ===
    document.getElementById('simulasiPilihDariKatalog')?.addEventListener('click', async () => {
        const grid = document.getElementById('simulasiKatalogGrid');
        const uploadArea = document.getElementById('simulasiUploadArea');

        if (grid) grid.classList.toggle('hidden');
        if (uploadArea) uploadArea.classList.add('hidden');

        // Reset upload
        document.getElementById('simulasiUploadInput').value = '';
        document.getElementById('simulasiUploadPreview').classList.add('hidden');
        document.getElementById('simulasiUploadName').textContent = '';

        // Jika grid kosong, load data dari Supabase
        if (grid && grid.children.length === 0) {
            // Ambil data dari katalog yang sudah dimuat
            if (window.currentKatalogImages && window.currentKatalogImages.length > 0) {
                renderSimulasiKatalog(window.currentKatalogImages);
            } else {
                // Coba ambil dari Supabase untuk kategori Best Haircut
                const supabase = getKatalogSupabaseClient();
                if (supabase) {
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

        // Reset grid selection
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

            // Preview
            const preview = document.getElementById('simulasiUploadPreview');
            const nameEl = document.getElementById('simulasiUploadName');
            if (preview) {
                preview.src = dataUrl;
                preview.classList.remove('hidden');
            }
            if (nameEl) nameEl.textContent = `✅ ${file.name}`;

            // Tampilkan preview model
            showSimulasiModelPreview(dataUrl, file.name);
            document.getElementById('simulasiNextToSelfie').classList.remove('hidden');
        };
        reader.readAsDataURL(file);
    });

    // === TOMBOL NEXT TO SELFIE ===
    document.getElementById('simulasiNextToSelfie')?.addEventListener('click', () => {
        if (!simulasiState.modelDataUrl) {
            alert('Silakan pilih model rambut terlebih dahulu!');
            return;
        }
        showSimulasiStep('selfie');
        document.getElementById('simulasiGenerateBtn').disabled = true;
    });

    // === BACK TO SELECT ===
    document.getElementById('simulasiBackToSelect')?.addEventListener('click', () => {
        showSimulasiStep('select');
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

            // Preview
            const preview = document.getElementById('simulasiSelfiePreview');
            const nameEl = document.getElementById('simulasiSelfieName');
            if (preview) {
                preview.src = dataUrl;
                preview.classList.remove('hidden');
            }
            if (nameEl) nameEl.textContent = `✅ ${file.name}`;

            // Enable generate button
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

        // Konversi modelDataUrl ke base64 jika belum
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

        // Mulai generate
        showSimulasiStep('generating');
        document.getElementById('simulasiGeneratingStatus').textContent = 'AI sedang menggambar model rambut baru...';
        document.getElementById('simulasiProgressBar').style.width = '10%';

        try {
            // Panggil Netlify Function
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

            // Ambil gambar dari response
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

            // Tampilkan hasil
            simulasiState.resultImageBase64 = imageBase64;
            showSimulasiResult(imageBase64);

        } catch (error) {
            console.error('❌ Error:', error);
            alert('Gagal generate: ' + error.message);
            showSimulasiStep('selfie');
        }
    });

    // === TOMBOL GENERATE DARI GALLERY ===
    document.addEventListener('click', function(e) {
        const btn = e.target.closest('.simulasi-from-gallery-btn');
        if (btn) {
            const url = btn.dataset.url;
            const nama = btn.dataset.nama;
            const nomor = btn.dataset.nomor;

            // Ambil base64 dari URL
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
                        showSimulasiStep('select');
                        document.getElementById('simulasiNextToSelfie').classList.remove('hidden');
                    };
                    reader.readAsDataURL(blob);
                })
                .catch(err => {
                    alert('Gagal memuat gambar: ' + err.message);
                });
        }
    });
}

// ============================================================
// TAMPILKAN HASIL
// ============================================================
function showSimulasiResult(imageBase64) {
    showSimulasiStep('result');

    const img = document.getElementById('simulasiResultImg');
    const downloadBtn = document.getElementById('simulasiDownloadBtn');
    const tryAgainBtn = document.getElementById('simulasiTryAgainBtn');
    const doneBtn = document.getElementById('simulasiDoneBtn');

    if (img) img.src = `data:image/jpeg;base64,${imageBase64}`;

    // Download
    downloadBtn?.addEventListener('click', function() {
        const link = document.createElement('a');
        link.download = `simulasi-rambut-${simulasiState.modelNomor || 'custom'}.jpg`;
        link.href = `data:image/jpeg;base64,${imageBase64}`;
        link.click();
    });

    // Try Again
    tryAgainBtn?.addEventListener('click', () => {
        showSimulasiStep('selfie');
        document.getElementById('simulasiSelfieInput').value = '';
        document.getElementById('simulasiSelfiePreview').classList.add('hidden');
        document.getElementById('simulasiSelfieName').textContent = '';
        simulasiState.selfieBase64 = null;
        simulasiState.selfieDataUrl = null;
        document.getElementById('simulasiGenerateBtn').disabled = true;
    });

    // Done -> Back to menu
    doneBtn?.addEventListener('click', () => {
        const menuContainer = document.getElementById('katalogMenuContainer');
        const simulasiView = document.getElementById('simulasiView');
        if (menuContainer) menuContainer.classList.remove('hidden');
        if (simulasiView) simulasiView.classList.add('hidden');
        // Reset state
        simulasiState.step = 'select';
        simulasiState.resultImageBase64 = null;
        simulasiState.selfieBase64 = null;
        simulasiState.selfieDataUrl = null;
        showSimulasiStep('select');
        document.getElementById('simulasiModelPreview').classList.add('hidden');
        document.getElementById('simulasiNextToSelfie').classList.add('hidden');
    });
}

// ============================================================
// INISIALISASI
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    // Tunggu katalog.js selesai render
    setTimeout(initSimulasi, 500);
});

console.log('📁 Modul Simulasi Model Rambut siap digunakan!');
