// Barberman / Barber Profile
function renderBarberman(container) {
  const barbers = [
    { name: "Dimas Pratama", specialty: "Master Barber", experience: "8 tahun", icon: "fa-user-tie", image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?w=200&h=200&fit=crop" },
    { name: "Rizki Hidayat", specialty: "Hair Stylist", experience: "5 tahun", icon: "fa-user", image: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&h=200&fit=crop" },
    { name: "Andi Wijaya", specialty: "Color Specialist", experience: "6 tahun", icon: "fa-user-graduate", image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?w=200&h=200&fit=crop" }
  ];
  
  container.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold text-purple-800 mb-2">Meet Our Barbers</h2>
        <p class="text-gray-500">Tim profesional yang siap memberikan pelayanan terbaik</p>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        ${barbers.map(barber => `
          <div class="barberman-card bg-white rounded-2xl shadow-xl overflow-hidden">
            <div class="h-56 overflow-hidden bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
              <img src="${barber.image}" alt="${barber.name}" class="w-full h-full object-cover" 
                   onerror="this.onerror=null; this.parentElement.innerHTML = '<i class=\'fas ${barber.icon} text-white text-6xl\'></i>';">
            </div>
            <div class="p-6 text-center">
              <h3 class="text-xl font-bold text-slate-800">${barber.name}</h3>
              <p class="text-purple-600 font-semibold mt-1">${barber.specialty}</p>
              <p class="text-gray-500 text-sm mt-2">Pengalaman ${barber.experience}</p>
              <button class="mt-4 bg-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition">
                Book This Barber
              </button>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="mt-8 text-center">
        <button onclick="document.querySelector('[data-menu=\'reservation\']').click()" 
                class="bg-gradient-to-r from-purple-600 to-purple-800 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition">
          Buat Reservasi
        </button>
      </div>
    </div>
  `;
}
