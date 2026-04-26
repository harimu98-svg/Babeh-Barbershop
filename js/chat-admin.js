// Chat Admin via WhatsApp
function renderChat(container) {
  container.innerHTML = `
    <div class="max-w-4xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold text-purple-800 mb-2">Chat Admin</h2>
        <p class="text-gray-500">Hubungi kami untuk konsultasi atau informasi lebih lanjut</p>
      </div>
      
      <div class="bg-white rounded-2xl shadow-xl p-6 md:p-8">
        <div class="flex flex-col md:flex-row gap-8">
          <div class="flex-1 text-center">
            <div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fab fa-whatsapp text-green-600 text-5xl"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">WhatsApp Admin</h3>
            <p class="text-gray-500 mb-4">Fast response, chat langsung dengan admin</p>
            <button id="whatsappBtn" class="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition inline-flex items-center gap-2">
              <i class="fab fa-whatsapp"></i> Chat Sekarang
            </button>
          </div>
          
          <div class="flex-1 text-center">
            <div class="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i class="fas fa-phone-alt text-red-600 text-5xl"></i>
            </div>
            <h3 class="text-xl font-bold text-slate-800 mb-2">Telepon</h3>
            <p class="text-gray-500 mb-4">Senin - Minggu, 09:00 - 22:00</p>
            <button id="callBtn" class="bg-red-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-red-700 transition inline-flex items-center gap-2">
              <i class="fas fa-phone-alt"></i> (021) 1234-5678
            </button>
          </div>
        </div>
        
        <div class="mt-8 pt-8 border-t border-gray-200">
          <h3 class="text-lg font-bold text-slate-800 mb-4 text-center">Atau kirim pesan langsung</h3>
          <form id="quickMessageForm" class="space-y-4">
            <div>
              <input type="text" id="quickName" placeholder="Nama Anda" required class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500">
            </div>
            <div>
              <textarea id="quickMessage" rows="4" placeholder="Pesan Anda..." required class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"></textarea>
            </div>
            <button type="submit" class="w-full bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition">
              <i class="fab fa-whatsapp mr-2"></i> Kirim Pesan via WhatsApp
            </button>
          </form>
        </div>
        
        <div class="mt-6 text-center text-gray-500 text-sm">
          <p>Atau kunjungi kami di:</p>
          <div class="flex justify-center gap-4 mt-3">
            <a href="#" class="text-gray-400 hover:text-purple-600 text-2xl"><i class="fab fa-instagram"></i></a>
            <a href="#" class="text-gray-400 hover:text-purple-600 text-2xl"><i class="fab fa-facebook"></i></a>
            <a href="#" class="text-gray-400 hover:text-purple-600 text-2xl"><i class="fab fa-tiktok"></i></a>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.getElementById('whatsappBtn')?.addEventListener('click', () => {
    window.open('https://wa.me/6281234567890?text=Halo%20Babeh%20Barbershop%2C%20saya%20mau%20konsultasi', '_blank');
  });
  
  document.getElementById('callBtn')?.addEventListener('click', () => {
    window.location.href = 'tel:02112345678';
  });
  
  document.getElementById('quickMessageForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('quickName').value;
    const message = document.getElementById('quickMessage').value;
    const fullMessage = `Halo Babeh Barbershop!%0A%0ANama: ${name}%0A%0APesan: ${message}`;
    window.open(`https://wa.me/6281234567890?text=${fullMessage}`, '_blank');
  });
}
