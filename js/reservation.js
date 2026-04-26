// Reservasi / Booking
function renderReservation(container) {
  container.innerHTML = `
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold text-purple-800 mb-2">Reservasi & Booking</h2>
        <p class="text-gray-500">Isi form berikut untuk melakukan reservasi</p>
      </div>
      
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <form id="reservationForm" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Nama Lengkap</label>
              <input type="text" id="nama" required class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">No. WhatsApp</label>
              <input type="tel" id="wa" required class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Pilih Layanan</label>
              <select id="service" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="Haircut Classic">Haircut Classic - Rp50.000</option>
                <option value="Haircut + Hair Wash">Haircut + Hair Wash - Rp70.000</option>
                <option value="Beard Shaving">Beard Shaving - Rp35.000</option>
                <option value="Hair Tattoo">Hair Tattoo - Rp100.000</option>
                <option value="Royal Package">Royal Package - Rp200.000</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Pilih Barber</label>
              <select id="barber" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option value="Dimas Pratama">Dimas Pratama - Master Barber</option>
                <option value="Rizki Hidayat">Rizki Hidayat - Hair Stylist</option>
                <option value="Andi Wijaya">Andi Wijaya - Color Specialist</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Tanggal</label>
              <input type="date" id="tanggal" required class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700 mb-2">Jam</label>
              <select id="jam" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
                <option>10:00</option><option>11:00</option><option>13:00</option>
                <option>14:00</option><option>15:00</option><option>16:00</option>
                <option>17:00</option><option>18:00</option><option>19:00</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-sm font-semibold text-slate-700 mb-2">Catatan (Opsional)</label>
            <textarea id="catatan" rows="3" class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
          </div>
          <button type="submit" class="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition">
            <i class="fab fa-whatsapp mr-2"></i> Kirim Reservasi via WhatsApp
          </button>
        </form>
      </div>
    </div>
  `;
  
  // Handle form submission
  document.getElementById('reservationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const nama = document.getElementById('nama').value;
    const wa = document.getElementById('wa').value;
    const service = document.getElementById('service').value;
    const barber = document.getElementById('barber').value;
    const tanggal = document.getElementById('tanggal').value;
    const jam = document.getElementById('jam').value;
    const catatan = document.getElementById('catatan').value;
    
    const message = `Halo Babeh Barbershop!%0A%0ASaya ingin melakukan reservasi:%0A%0ANama: ${nama}%0ANo WA: ${wa}%0ALayanan: ${service}%0ABarber: ${barber}%0ATanggal: ${tanggal}%0AJam: ${jam}%0ACatatan: ${catatan}%0A%0ATerima kasih.`;
    
    window.open(`https://wa.me/6281234567890?text=${message}`, '_blank');
  });
}
