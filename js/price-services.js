// Price & Services
function renderPriceServices(container) {
  const services = [
    { name: "Haircut Classic", price: "Rp 50.000", duration: "30 menit", icon: "fa-cut" },
    { name: "Haircut + Hair Wash", price: "Rp 70.000", duration: "45 menit", icon: "fa-hand-holding-water" },
    { name: "Beard Shaving", price: "Rp 35.000", duration: "20 menit", icon: "fa-hand-paper" },
    { name: "Hair Tattoo", price: "Rp 100.000", duration: "60 menit", icon: "fa-paintbrush" },
    { name: "Hair Coloring", price: "Rp 150.000", duration: "90 menit", icon: "fa-palette" },
    { name: "Royal Package", price: "Rp 200.000", duration: "120 menit", icon: "fa-crown" }
  ];
  
  container.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold text-purple-800 mb-2">Price & Services</h2>
        <p class="text-gray-500">Layanan terbaik dengan harga terjangkau</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${services.map(service => `
          <div class="service-card bg-white rounded-2xl shadow-xl p-6 cursor-pointer">
            <div class="flex items-center gap-4">
              <div class="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl flex items-center justify-center">
                <i class="fas ${service.icon} text-purple-600 text-2xl"></i>
              </div>
              <div class="flex-1">
                <h3 class="text-xl font-bold text-slate-800">${service.name}</h3>
                <p class="text-gray-500 text-sm">${service.duration}</p>
              </div>
              <div class="text-right">
                <p class="text-2xl font-bold text-purple-600">${service.price}</p>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="mt-8 bg-gradient-to-r from-purple-100 to-purple-50 rounded-2xl p-6 text-center">
        <p class="text-gray-600">*Harga sudah termasuk pajak. Untuk reservasi silakan hubungi kami.</p>
        <button onclick="document.querySelector('[data-menu=\'reservation\']').click()" 
                class="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition">
          Reservasi Sekarang
        </button>
      </div>
    </div>
  `;
}
