// Reservasi / Booking
let reservationServices = [];
let reservationBarbers = [];
let reservationOutlets = [];

// ============================================
// KONFIGURASI WHATSAPP API
// ============================================

const WA_API_URL = 'https://waha-yetv8qi4e3zk.anakit.sumopod.my.id/api/sendText';
const WA_API_KEY = 'sfcoGbpdLDkGZhKw2rx8sbb14vf4d8V6';

// ============================================
// FUNGSI SEND WHATSAPP
// ============================================

async function sendWhatsAppNotification(phoneNumber, message) {
    try {
        if (!phoneNumber) {
            console.warn('No phone number provided');
            return false;
        }
        
        // Format nomor WA: 
        // - Jika sudah mengandung @c.us atau @g.us, gunakan langsung
        // - Jika tidak, format ke 62xxx@c.us
        let formattedPhone = phoneNumber.trim();
        
        // Cek apakah sudah ada @c.us atau @g.us
        if (!formattedPhone.includes('@c.us') && !formattedPhone.includes('@g.us')) {
            // Format personal number: 0xxx -> 62xxx
            formattedPhone = formattedPhone.replace(/^0/, '62').replace(/^\+62/, '62').replace(/[^0-9]/g, '');
            formattedPhone += '@c.us';
        }
        
        console.log(`📱 Sending WA to: ${formattedPhone}`);
        
        const response = await fetch(WA_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Api-Key': WA_API_KEY
            },
            body: JSON.stringify({
                session: 'Session1',
                chatId: formattedPhone,
                text: message
            })
        });
        
        if (!response.ok) {
            throw new Error(`WhatsApp API error: ${response.status}`);
        }
        
        console.log('✅ WhatsApp notification sent to:', phoneNumber);
        return true;
        
    } catch (error) {
        console.error('❌ WhatsApp notification error:', error);
        return false;
    }
}

// ============================================
// FUNGSI UTAMA RENDER RESERVASI
// ============================================

async function renderReservation(container) {
  // Tampilkan loading
  container.innerHTML = `
    <div class="max-w-4xl mx-auto">
      <div class="text-center py-20">
        <i class="fas fa-spinner fa-spin text-4xl text-purple-600"></i>
        <p class="mt-4 text-gray-500">Memuat form reservasi...</p>
      </div>
    </div>
  `;
  
  const supabase = window.getSupabaseClient ? window.getSupabaseClient() : null;
  
  if (!supabase) {
    console.error('❌ Supabase client tidak tersedia');
    showDummyReservationForm(container);
    return;
  }
  
  try {
    console.log('📋 Mengambil data untuk form reservasi...');
    
    // 1. Ambil data layanan
    const { data: services, error: servicesError } = await supabase
      .from('layanan_reservasi')
      .select('*')
      .order('outlet', { ascending: true });
    
    if (servicesError) throw servicesError;
    reservationServices = services || [];
    
    // 2. Ambil data barberman
    const { data: barbers, error: barbersError } = await supabase
      .from('karyawan')
      .select('*')
      .eq('role', 'barberman')
      .eq('reservasi', true)
      .order('nama_karyawan', { ascending: true });
    
    if (barbersError) throw barbersError;
    reservationBarbers = barbers || [];
    
    // 3. Ambil daftar outlet unik
    reservationOutlets = [...new Set(reservationServices.map(s => s.outlet))];
    
    renderReservationForm(container);
    
  } catch (err) {
    console.error('❌ Error:', err);
    showDummyReservationForm(container);
  }
}

// ============================================
// DUMMY DATA (FALLBACK)
// ============================================

function showDummyReservationForm(container) {
  reservationServices = [
    { outlet: 'Babeh Barbershop Pusat', layanan: 'Haircut Classic', harga: 50000, waktu: '30 menit' },
    { outlet: 'Babeh Barbershop Pusat', layanan: 'Haircut + Hair Wash', harga: 70000, waktu: '45 menit' },
    { outlet: 'Babeh Barbershop Cabang', layanan: 'Beard Shaving', harga: 35000, waktu: '20 menit' },
  ];
  reservationOutlets = [...new Set(reservationServices.map(s => s.outlet))];
  reservationBarbers = [
    { nama_karyawan: 'Dimas Pratama', spesialisasi: 'Master Barber', outlet: 'Babeh Barbershop Pusat', nomor_wa: '6282210017083' },
    { nama_karyawan: 'Rizki Hidayat', spesialisasi: 'Hair Stylist', outlet: 'Babeh Barbershop Cabang', nomor_wa: '6282210017083' },
  ];
  renderReservationForm(container);
}

// ============================================
// RENDER FORM RESERVASI
// ============================================

function renderReservationForm(container) {
  // Dapatkan hari ini untuk min date
  const today = new Date().toISOString().split('T')[0];
  
  // Generate jam (09:00 - 20:00)
  const hours = [];
  for (let i = 9; i <= 20; i++) {
    hours.push(`${String(i).padStart(2, '0')}:00`);
  }
  
  container.innerHTML = `
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold text-purple-800 mb-2">Reservasi & Booking</h2>
        <p class="text-gray-500">Isi form berikut untuk melakukan reservasi</p>
      </div>
      
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <form id="reservationForm" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Nama Lengkap -->
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap <span class="text-red-500">*</span></label>
              <input type="text" id="namaCustomer" required 
                     class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            
            <!-- No WhatsApp -->
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">No. WhatsApp <span class="text-red-500">*</span></label>
              <input type="tel" id="waCustomer" required placeholder="08xx-xxxx-xxxx" 
                     class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
              <p class="text-xs text-gray-400 mt-1">Contoh: 0812-3456-7890</p>
            </div>
            
            <!-- Pilih Outlet -->
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Pilih Outlet <span class="text-red-500">*</span></label>
              <select id="outletSelect" required class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="">-- Pilih Outlet --</option>
                ${reservationOutlets.map(o => `<option value="${o}">${o}</option>`).join('')}
              </select>
            </div>
            
            <!-- Pilih Layanan -->
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Pilih Layanan <span class="text-red-500">*</span></label>
              <select id="layananSelect" required class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="">-- Pilih Layanan --</option>
              </select>
            </div>
            
            <!-- Pilih Barberman -->
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Pilih Barberman <span class="text-red-500">*</span></label>
              <select id="barbermanSelect" required class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="">-- Pilih Barberman --</option>
              </select>
            </div>
            
            <!-- Tanggal -->
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Tanggal <span class="text-red-500">*</span></label>
              <input type="date" id="tanggalReservasi" min="${today}" required 
                     class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            
            <!-- Jam -->
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Jam <span class="text-red-500">*</span></label>
              <select id="jamReservasi" required class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="">-- Pilih Jam --</option>
                ${hours.map(h => `<option value="${h}">${h}</option>`).join('')}
              </select>
            </div>
          </div>
          
          <!-- Catatan -->
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Catatan (Opsional)</label>
            <textarea id="catatanReservasi" rows="3" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
          </div>
          
          <button type="submit" id="submitReservasiBtn" 
                  class="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition">
            <i class="fas fa-paper-plane mr-2"></i> Submit Reservasi
          </button>
        </form>
      </div>
    </div>
  `;
  
  // ============ EVENT LISTENERS ============
  
  // 1. Ketika outlet berubah, update layanan
  document.getElementById('outletSelect')?.addEventListener('change', function() {
    const outlet = this.value;
    const layananSelect = document.getElementById('layananSelect');
    const barbermanSelect = document.getElementById('barbermanSelect');
    
    // Update layanan
    const services = reservationServices.filter(s => s.outlet === outlet);
    layananSelect.innerHTML = '<option value="">-- Pilih Layanan --</option>';
    services.forEach(s => {
      layananSelect.innerHTML += `<option value="${s.layanan}" data-harga="${s.harga}" data-waktu="${s.waktu}">${s.layanan} - Rp ${s.harga.toLocaleString()}</option>`;
    });
    
    // Update barberman berdasarkan outlet
    const barbers = reservationBarbers.filter(b => b.outlet === outlet);
    barbermanSelect.innerHTML = '<option value="">-- Pilih Barberman --</option>';
    barbers.forEach(b => {
      barbermanSelect.innerHTML += `<option value="${b.nama_karyawan}" data-wa="${b.nomor_wa || ''}">${b.nama_karyawan} - ${b.spesialisasi || ''}</option>`;
    });
  });
  
  // 2. Validasi ketersediaan saat tanggal/jam/barberman berubah
  const validateAvailability = async () => {
    const barberman = document.getElementById('barbermanSelect').value;
    const tanggal = document.getElementById('tanggalReservasi').value;
    const jam = document.getElementById('jamReservasi').value;
    
    if (!barberman || !tanggal || !jam) return true;
    
    const supabase = window.getSupabaseClient ? window.getSupabaseClient() : null;
    if (!supabase) return true;
    
    try {
      const { data, error } = await supabase
        .from('reservasi')
        .select('*')
        .eq('barberman', barberman)
        .eq('tanggal_reservasi', tanggal)
        .eq('jam', jam)
        .in('status', ['menunggu_pembayaran', 'pembayaran_berhasil', 'active']);
      
      if (error) throw error;
      
      if (data && data.length > 0) {
        alert('❌ Maaf, barberman ini sudah memiliki reservasi pada jam dan tanggal tersebut. Silakan pilih barberman/jam/hari lain.');
        return false;
      }
      return true;
    } catch (err) {
      console.error('Error checking availability:', err);
      return true;
    }
  };
  
  // Event listener untuk cek ketersediaan
  document.getElementById('barbermanSelect')?.addEventListener('change', validateAvailability);
  document.getElementById('tanggalReservasi')?.addEventListener('change', validateAvailability);
  document.getElementById('jamReservasi')?.addEventListener('change', validateAvailability);
  
  // 3. Submit form
  document.getElementById('reservationForm')?.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const nama = document.getElementById('namaCustomer').value.trim();
    const wa = document.getElementById('waCustomer').value.trim();
    const outlet = document.getElementById('outletSelect').value;
    const layanan = document.getElementById('layananSelect').value;
    const barberman = document.getElementById('barbermanSelect').value;
    const tanggal = document.getElementById('tanggalReservasi').value;
    const jam = document.getElementById('jamReservasi').value;
    const catatan = document.getElementById('catatanReservasi').value.trim();
    
    // Validasi
    if (!nama || !wa || !outlet || !layanan || !barberman || !tanggal || !jam) {
      alert('⚠️ Semua field wajib diisi!');
      return;
    }
    
    // Cek ketersediaan
    const available = await validateAvailability();
    if (!available) return;
    
    // Dapatkan harga
    const layananSelect = document.getElementById('layananSelect');
    const selectedOption = layananSelect.options[layananSelect.selectedIndex];
    const harga = parseInt(selectedOption?.dataset?.harga || 0);
    
    // Format tanggal
    const dateObj = new Date(tanggal + 'T00:00:00');
    const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][dateObj.getDay()];
    const tanggalFormatted = dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    
    // Tampilkan summary
    showReservationSummary({
      nama, wa, outlet, layanan, barberman, tanggal, jam, catatan,
      hari, tanggalFormatted, harga
    });
  });
}

// ============================================
// RESERVATION SUMMARY
// ============================================

function showReservationSummary(data) {
  // Hapus modal jika sudah ada
  const existingModal = document.getElementById('summaryModal');
  if (existingModal) existingModal.remove();
  
  const modal = document.createElement('div');
  modal.id = 'summaryModal';
  modal.className = 'fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
      <div class="text-center mb-4">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
          <i class="fas fa-check-circle text-green-600 text-3xl"></i>
        </div>
        <h3 class="text-2xl font-bold text-slate-800">Konfirmasi Reservasi</h3>
        <p class="text-gray-500 text-sm">Periksa kembali data reservasi Anda</p>
      </div>
      
      <div class="space-y-2 bg-gray-50 rounded-xl p-4 mb-4">
        <div class="flex justify-between"><span class="text-gray-500">Nama</span><span class="font-semibold">${data.nama}</span></div>
        <div class="flex justify-between"><span class="text-gray-500">WhatsApp</span><span class="font-semibold">${data.wa}</span></div>
        <div class="flex justify-between"><span class="text-gray-500">Outlet</span><span class="font-semibold">${data.outlet}</span></div>
        <div class="flex justify-between"><span class="text-gray-500">Layanan</span><span class="font-semibold">${data.layanan}</span></div>
        <div class="flex justify-between"><span class="text-gray-500">Barberman</span><span class="font-semibold">${data.barberman}</span></div>
        <div class="flex justify-between"><span class="text-gray-500">Tanggal</span><span class="font-semibold">${data.tanggalFormatted} (${data.hari})</span></div>
        <div class="flex justify-between"><span class="text-gray-500">Jam</span><span class="font-semibold">${data.jam}</span></div>
        ${data.catatan ? `<div class="flex justify-between"><span class="text-gray-500">Catatan</span><span class="font-semibold text-sm">${data.catatan}</span></div>` : ''}
        <div class="border-t border-gray-200 pt-2 mt-2">
          <div class="flex justify-between"><span class="text-lg font-bold">Total</span><span class="text-2xl font-bold text-purple-600">Rp ${data.harga.toLocaleString()}</span></div>
        </div>
      </div>
      
      <div class="flex gap-3">
        <button id="cancelSummaryBtn" class="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition">
          Cancel
        </button>
        <button id="confirmBayarBtn" class="flex-1 bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition">
          <i class="fas fa-check mr-2"></i> Bayar
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Event listeners
  document.getElementById('cancelSummaryBtn')?.addEventListener('click', () => {
    modal.remove();
  });
  
  document.getElementById('confirmBayarBtn')?.addEventListener('click', () => {
    modal.remove();
    showQRISPayment(data);
  });
}

// ============================================
// QRIS PAYMENT
// ============================================

function showQRISPayment(data) {
  let counter = 180; // 3 menit
  let timerInterval;
  
  const modal = document.createElement('div');
  modal.id = 'qrisModal';
  modal.className = 'fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="bg-white rounded-2xl max-w-md w-full p-6">
      <div class="text-center mb-4">
        <h3 class="text-2xl font-bold text-slate-800">Scan QRIS untuk Pembayaran</h3>
        <p class="text-gray-500 text-sm">Total pembayaran: <span class="font-bold text-purple-600 text-xl">Rp ${data.harga.toLocaleString()}</span></p>
      </div>
      
      <div class="flex justify-center mb-4">
        <img src="images/qris.jpg" alt="QRIS" 
             class="w-64 h-64 object-contain border-2 border-gray-200 rounded-xl p-2"
             onerror="this.onerror=null; this.parentElement.innerHTML = '<div class=\\'w-64 h-64 bg-gray-200 rounded-xl flex items-center justify-center text-gray-500\\'>QRIS tidak tersedia</div>'">
      </div>
      
      <div class="text-center mb-4">
        <p class="text-sm text-gray-600">Segera lakukan pembayaran dalam:</p>
        <div id="timerDisplay" class="text-3xl font-bold text-red-600">03:00</div>
        <p class="text-xs text-gray-400 mt-1">Pembayaran akan kadaluarsa jika melewati batas waktu</p>
      </div>
      
      <div class="flex gap-3">
        <button id="cancelPaymentBtn" class="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition">
          Cancel
        </button>
        <button id="confirmPaymentBtn" class="flex-1 bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 transition">
          <i class="fas fa-check mr-2"></i> Saya Sudah Bayar
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Timer
  const timerDisplay = document.getElementById('timerDisplay');
  timerInterval = setInterval(() => {
    counter--;
    const minutes = Math.floor(counter / 60);
    const seconds = counter % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    if (counter <= 30) {
      timerDisplay.classList.add('text-red-600', 'animate-pulse');
    }
    
    if (counter <= 0) {
      clearInterval(timerInterval);
      alert('⏰ Waktu pembayaran telah habis! Silakan ulangi reservasi.');
      modal.remove();
    }
  }, 1000);
  
  // Cancel
  document.getElementById('cancelPaymentBtn')?.addEventListener('click', () => {
    clearInterval(timerInterval);
    modal.remove();
  });
  
  // Confirm Payment - Simpan ke database
  document.getElementById('confirmPaymentBtn')?.addEventListener('click', async () => {
    clearInterval(timerInterval);
    modal.remove();
    
    // Simpan reservasi ke database
    await saveReservation(data);
  });
}

// ============================================
// SAVE RESERVATION TO DATABASE
// ============================================

async function saveReservation(data) {
  const supabase = window.getSupabaseClient ? window.getSupabaseClient() : null;
  
  if (!supabase) {
    alert('❌ Database tidak tersedia. Silakan coba lagi.');
    return;
  }
  
  try {
    // Format tanggal
    const dateObj = new Date(data.tanggal + 'T00:00:00');
    const hari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'][dateObj.getDay()];
    const tanggalFormatted = dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });
    
    const reservationData = {
      tanggal_reservasi: data.tanggal,
      nama_customer: data.nama,
      no_wa_customer: data.wa,
      outlet: data.outlet,
      barberman: data.barberman,
      hari: hari,
      tanggal: tanggalFormatted,
      jam: data.jam,
      layanan: data.layanan,
      harga: data.harga,
      dp: 0,
      status: 'menunggu_pembayaran',
      catatan: data.catatan || ''
    };
    
    console.log('📝 Menyimpan reservasi:', reservationData);
    
    const { data: savedData, error } = await supabase
      .from('reservasi')
      .insert([reservationData])
      .select();
    
    if (error) throw error;
    
    if (savedData && savedData.length > 0) {
      const reservasi = savedData[0];
      
      // Tampilkan sukses
      showSuccessModal(reservasi, data);
      
      // Kirim WhatsApp ke semua pihak
      await sendAllWhatsAppNotifications(reservasi, data);
    }
    
  } catch (err) {
    console.error('❌ Error saving reservation:', err);
    alert('❌ Gagal menyimpan reservasi. Silakan coba lagi.');
  }
}

// ============================================
// SUCCESS MODAL
// ============================================

function showSuccessModal(reservasi, data) {
  const modal = document.createElement('div');
  modal.id = 'successModal';
  modal.className = 'fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4';
  modal.innerHTML = `
    <div class="bg-white rounded-2xl max-w-md w-full p-6">
      <div class="text-center">
        <div class="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <i class="fas fa-check-circle text-green-600 text-4xl"></i>
        </div>
        <h3 class="text-2xl font-bold text-slate-800">Reservasi Berhasil!</h3>
        <p class="text-gray-500 mt-2">Kode Reservasi: <span class="font-bold text-purple-600">${reservasi.kode_reservasi || 'BRB-' + Date.now()}</span></p>
        <p class="text-gray-400 text-sm mt-1">Status: <span class="text-yellow-600 font-semibold">Menunggu Pembayaran</span></p>
        
        <div class="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mt-4 text-left">
          <p class="text-sm text-yellow-800">
            <i class="fas fa-info-circle mr-2"></i>
            Admin akan memverifikasi pembayaran Anda. 
            Anda akan menerima konfirmasi via WhatsApp.
          </p>
        </div>
        
        <button onclick="this.closest('#successModal').remove()" 
                class="mt-4 w-full bg-purple-600 text-white py-3 rounded-xl font-semibold hover:bg-purple-700 transition">
          <i class="fas fa-check mr-2"></i> Selesai
        </button>
      </div>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  // Auto close after 10 seconds
  setTimeout(() => {
    const modalEl = document.getElementById('successModal');
    if (modalEl) modalEl.remove();
  }, 10000);
}

// ============================================
// SEND ALL WHATSAPP NOTIFICATIONS
// ============================================

async function sendAllWhatsAppNotifications(reservasi, data) {
  const supabase = window.getSupabaseClient ? window.getSupabaseClient() : null;
  if (!supabase) {
    console.warn('⚠️ Supabase not available for WA notifications');
    return;
  }
  
  try {
    // 1. Dapatkan nomor WA barberman dari tabel karyawan
    const { data: barberData } = await supabase
      .from('karyawan')
      .select('nomor_wa, nama_karyawan')
      .eq('nama_karyawan', data.barberman)
      .single();
    
    // 2. Dapatkan nomor WA group dari tabel outlet
    const { data: outletData } = await supabase
      .from('outlet')
      .select('group_wa, whatsapp')  // group_wa untuk group
      .eq('outlet', data.outlet)
      .single();
    
    const kodeReservasi = reservasi.kode_reservasi || 'BRB-' + Date.now();
    
    // ========== PESAN UNTUK CUSTOMER ==========
    const customerMessage = `*✅ RESERVASI Babeh Barbershop BERHASIL!*

Halo *${data.nama}*,

Reservasi Anda telah kami terima dengan detail:

📋 *Kode Reservasi:* ${kodeReservasi}
📅 *Tanggal:* ${data.tanggalFormatted} (${data.hari})
🕐 *Jam:* ${data.jam}
✂️ *Layanan:* ${data.layanan}
💇 *Barberman:* ${data.barberman}
📍 *Outlet:* ${data.outlet}
💰 *Total:* Rp ${data.harga.toLocaleString()}

*⚠️ PENTING:*
• Pastikan Anda standby 5 menit SEBELUM waktu reservasi
• Jika lewat 15 menit belum hadir, reservasi akan otomatis dibatalkan
• Bawa bukti pembayaran saat datang

Terima kasih telah mempercayakan gaya rambut Anda kepada Babeh Barbershop! ✨

_*Babeh Barbershop - Gaya Rambut untuk Semua*_`;

    // ========== PESAN UNTUK BARBERMAN ==========
    const barbermanMessage = `*📢 RESERVASI BARU Babeh Barbershop!*

Halo *${data.barberman}*,

Anda mendapatkan reservasi baru:

📋 *Kode:* ${kodeReservasi}
👤 *Customer:* ${data.nama}
📱 *WA Customer:* ${data.wa}
📅 *Tanggal:* ${data.tanggalFormatted} (${data.hari})
🕐 *Jam:* ${data.jam}
✂️ *Layanan:* ${data.layanan}
📍 *Outlet:* ${data.outlet}

*⚠️ CATATAN UNTUK BARBERMAN:*
• Pastikan Anda standby 5 menit SEBELUM waktu reservasi
• Siapkan alat dan bahan yang diperlukan
• Jika customer tidak hadir 15 menit, hubungi admin

Terima kasih! 🙌`;

    // ========== PESAN UNTUK GROUP WA ==========
    const groupMessage = `*📢 RESERVASI BARU Babeh Barbershop!*

Reservasi baru masuk:

📋 *Kode:* ${kodeReservasi}
👤 *Customer:* ${data.nama}
📱 *WA Customer:* ${data.wa}
💇 *Barberman:* ${data.barberman}
📅 *Tanggal:* ${data.tanggalFormatted} (${data.hari})
🕐 *Jam:* ${data.jam}
✂️ *Layanan:* ${data.layanan}
📍 *Outlet:* ${data.outlet}
💰 *Total:* Rp ${data.harga.toLocaleString()}

Mohon koordinasi untuk persiapan. Terima kasih! 🙌`;

    // ========== KIRIM PESAN ==========
    
    // 1. Kirim ke Customer
    if (data.wa) {
      await sendWhatsAppNotification(data.wa, customerMessage);
    }
    
    // 2. Kirim ke Barberman
    if (barberData?.nomor_wa) {
      await sendWhatsAppNotification(barberData.nomor_wa, barbermanMessage);
    }
    
    // 3. Kirim ke Group WA (langsung dari kolom group_wa - sudah format @g.us)
    if (outletData?.group_wa) {
      // group_wa sudah dalam format: 62811159429-1533260196@g.us
      await sendWhatsAppNotification(outletData.group_wa, groupMessage);
    }
    
    
    console.log('✅ Semua WhatsApp notifications terkirim!');
    
  } catch (err) {
    console.error('❌ Error sending WhatsApp notifications:', err);
  }
}

console.log('📁 Modul Reservation siap digunakan!');
