/* ============================================
   LOKASI.JS - Script Halaman Lokasi Pasar
   ============================================ */

// Daftar query pencarian Google Maps untuk tiap lokasi (Waingapu)
const mapLocations = [
  'Pasar+Ikan+Segar+WGP',
  'Ikan+Segar+Laut+Selatan+RHANA+NDIMA'
];

// Warna border aktif untuk masing-masing kartu lokasi
const activeColors = ['#0077B6', '#2ECC71'];

function selectLocation(index) {
  // 1. Highlight kartu yang dipilih
  const cards = document.querySelectorAll('.location-card');
  cards.forEach((card, i) => {
    if (i === index) {
      card.style.borderColor = activeColors[i];
      card.style.borderWidth = '2px';
      // Memberi shadow sesuai warna kartu (ditambah 1F di akhir hex untuk opacity ~12%)
      card.style.boxShadow = `0 8px 24px ${activeColors[i]}1F`; 
    } else {
      card.style.borderColor = 'transparent';
      card.style.borderWidth = '2px'; // Samakan width agar tidak terjadi loncat layout
      card.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
    }
  });

  // 2. Ganti src iframe Google Maps
  // ID disesuaikan dengan HTML terbaru
  const mapIframe = document.getElementById('google-maps-frame');
  if (mapIframe && mapLocations[index]) {
    mapIframe.src = `https://maps.google.com/maps?q=${mapLocations[index]}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
  }

  // 3. Scroll ke peta agar pengguna bisa melihat perubahan map
  const mapSection = document.getElementById('map-container');
  if(mapSection) mapSection.scrollIntoView({ behavior: 'smooth' });

  // 4. Toast notifikasi
  const name = cards[index]?.querySelector('.location-name')?.textContent || '';
  showToast('Lokasi Dipilih', name);
}