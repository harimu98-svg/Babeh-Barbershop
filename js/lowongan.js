// Lowongan Kerja
function renderLowongan(container) {
  const jobs = [
    { title: "Senior Barber", type: "Full Time", salary: "Rp 5.000.000 - Rp 8.000.000", requirement: "Pengalaman minimal 3 tahun, memiliki sertifikasi barber", icon: "fa-user-tie" },
    { title: "Junior Barber", type: "Full Time", salary: "Rp 3.000.000 - Rp 5.000.000", requirement: "Fresh graduate dipersilakan, memiliki passion di bidang barber", icon: "fa-user" },
    { title: "Customer Service", type: "Part Time", salary: "Rp 2.000.000 - Rp 3.000.000", requirement: "Ramah, komunikatif, menguasai WA & sosial media", icon: "fa-headset" },
    { title: "Barber Assistant", type: "Internship", salary: "Rp 1.500.000", requirement: "Sedang mencari pengalaman di bidang barbershop", icon: "fa-graduation-cap" }
  ];
  
  container.innerHTML = `
    <div class="max-w-6xl mx-auto">
      <div class="text-center mb-8">
        <h2 class="text-3xl md:text-4xl font-bold text-purple-800 mb-2">Lowongan Kerja</h2>
        <p class="text-gray-500">Bergabung bersama tim profesional Babeh Barbershop</p>
      </div>
      
      <div class="space-y-6">
        ${jobs.map(job => `
          <div class="job-card bg-white rounded-2xl shadow-xl p-6">
            <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div class="flex items-center gap-4">
                <div class="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center">
                  <i class="fas ${job.icon} text-purple-600 text-2xl"></i>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-slate-800">${job.title}</h3>
                  <p class="text-purple-600 font-semibold">${job.type}</p>
                </div>
              </div>
              <div>
                <p class="text-gray-500">💰 ${job.salary}</p>
              </div>
              <button class="apply-btn bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition" 
                      data-job="${job.title}">
                Lamar Sekarang
              </button>
            </div>
            <div class="mt-4 pt-4 border-t border-gray-100">
              <p class="text-gray-600"><span class="font-semibold">Persyaratan:</span> ${job.requirement}</p>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="mt-8 bg-purple-50 rounded-2xl p-6 text-center">
        <h3 class="font-bold text-slate-800 mb-2">Kirim Lamaran</h3>
        <p class="text-gray-600 mb-4">Kirim CV dan Portfolio Anda ke email kami</p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button id="emailApplyBtn" class="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-purple-700 transition">
            <i class="fas fa-envelope mr-2"></i> Email: career@babeh.com
          </button>
          <button id="waApplyBtn" class="bg-green-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-green-700 transition">
            <i class="fab fa-whatsapp mr-2"></i> WhatsApp: 0812-3456-7890
          </button>
        </div>
      </div>
    </div>
  `;
  
  document.querySelectorAll('.apply-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const job = btn.getAttribute('data-job');
      window.open(`https://wa.me/6281234567890?text=Halo%20Babeh%20Barbershop%2C%20saya%20tertarik%20melamar%20posisi%20${encodeURIComponent(job)}`, '_blank');
    });
  });
  
  document.getElementById('emailApplyBtn')?.addEventListener('click', () => {
    window.location.href = 'mailto:career@babeh.com?subject=Lamaran Kerja Babeh Barbershop';
  });
  
  document.getElementById('waApplyBtn')?.addEventListener('click', () => {
    window.open('https://wa.me/6281234567890?text=Halo%20Babeh%20Barbershop%2C%20saya%20tertarik%20melamar%20pekerjaan%20di%20Babeh%20Barbershop', '_blank');
  });
}
