// Efek animasi fade-in saat scroll
document.addEventListener("scroll", function () {
  const elements = document.querySelectorAll(".fade-in");
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    // Tambahkan kelas 'show' jika elemen masuk ke dalam viewport
    if (position < windowHeight - 100) {
      el.classList.add("show");
    } else {
      // Opsional: Hapus kelas 'show' jika elemen keluar dari viewport (untuk efek berulang)
      // el.classList.remove("show");
    }
  });
});

const video = document.getElementById('hidden-video');
if (video) {
  video.addEventListener('canplaythrough', () => {
    video.play(); // Pastikan memutar
  });
}

// Fungsionalitas Pencarian Produk
document.addEventListener("DOMContentLoaded", function() {
  const searchInput = document.getElementById("searchInput");
  const searchButton = document.getElementById("searchButton");
  const productGrid = document.getElementById("productGrid");
  const allProductCards = productGrid ? productGrid.querySelectorAll(".card") : []; // Ambil semua kartu produk, dengan pengecekan null

  if (searchInput) {
  searchInput.addEventListener('input', performSearch); // Pencarian real-time
  searchInput.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
      performSearch();
    }
  });
}
if (searchButton) {
  searchButton.addEventListener('click', performSearch);
}

  // Fungsi untuk melakukan pencarian
  function performSearch() {
  const searchTerm = searchInput.value.toLowerCase().trim(); // Tambahkan .trim() untuk menghapus spasi ekstra
  const cards = productGrid.querySelectorAll('.card');

  cards.forEach(card => {
    const productName = card.querySelector('h3').textContent.toLowerCase();
    const productDesc = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : ''; // Cek jika <p> ada
    const isVisible = productName.includes(searchTerm) || productDesc.includes(searchTerm);
    card.style.display = isVisible ? 'flex' : 'none'; // Pastikan menggunakan 'flex' sesuai CSS grid
  });

  // Opsional: Tampilkan pesan jika tidak ada hasil
  const visibleCards = Array.from(cards).filter(card => card.style.display !== 'none');
  if (visibleCards.length === 0 && searchTerm) {
    // Tambahkan elemen pesan jika belum ada
    let noResult = document.getElementById('noResult');
    if (!noResult) {
      noResult = document.createElement('p');
      noResult.id = 'noResult';
      noResult.textContent = 'Tidak ada produk yang cocok dengan pencarian Anda.';
      noResult.style.textAlign = 'center';
      noResult.style.color = '#e60000';
      productGrid.appendChild(noResult);
    }
    noResult.style.display = 'block';
  } else {
    const noResult = document.getElementById('noResult');
    if (noResult) noResult.style.display = 'none';
  }
}

  // Event listener untuk tombol pencarian
  if (searchButton) searchButton.addEventListener("click", performSearch);

  // Event listener untuk input pencarian (saat menekan Enter)
  if (searchInput) searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      performSearch();
    }
  });

  // Tambahkan event listener untuk membuka modal saat klik pada card (untuk fungsi "lihat detail")
  allProductCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id'); // Asumsikan card memiliki atribut data-id yang sesuai dengan productData
      if (id) openProductModal(id);
    });
  });
});

// Staggered Animation untuk Judul Elegan (Minimal JS)
document.addEventListener("DOMContentLoaded", function() {
  const title = document.querySelector(".elegant-title");
  if (title && !title.querySelector('.stagger-letter')) {
    // Split teks menjadi span untuk stagger
    const text = title.textContent;
    title.innerHTML = text.split('').map((char, index) => 
      `<span class="stagger-letter" style="animation-delay: ${index * 0.08}s;">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('');
  }

  // Scroll Effect untuk Hero (Subtle Shrink)
  window.addEventListener("scroll", function() {
    const hero = document.querySelector(".elegant-hero");
    if (hero) {
      if (window.scrollY > 50) {
        hero.classList.add("scrolled");
      } else {
        hero.classList.remove("scrolled");
      }
    }
  });

  // Hover Event untuk Teaser (Sudah CSS, tapi tambah click jika perlu)
  const teaser = document.querySelector(".teaser-product");
  if (teaser) {
    teaser.addEventListener("click", function() {
      // Opsional: Scroll ke produk terkait atau modal
      const produkSection = document.querySelector("#produk");
      if (produkSection) produkSection.scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Tambahan: Parallax untuk Hero
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.elegant-hero');
    if (hero) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
  });

  // Staggered Fade untuk Sections (Lebih Menarik)
  const sections = document.querySelectorAll('.fade-in');
  sections.forEach((section, index) => {
    section.style.transitionDelay = `${index * 0.2}s`;
  });
});

// Data Produk (Hardcode untuk demo; bisa di-fetch dari API)
const productData = {
  1: {
    title: "Air Jordan 4 Retro 'Rare Air'",
    price: "Rp 3.329.000",
    description: "Step into a classic. This AJ4 throws it back with nubuck leather and suede. Iconic design elements from the original, like floating eyestays and mesh-inspired accents, feel just as fresh as they did in '89.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/703a9488-068b-4bff-bcd7-60d9b9fb0e9f/AIR+JORDAN+4+RETRO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4e0be7bf-0728-42b2-8385-cb8ca54a01d9/AIR+JORDAN+4+RETRO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/07f8cd37-abae-467c-a097-e7938e99a023/AIR+JORDAN+4+RETRO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e711920b-820b-4aed-992c-dc1c82a73a0e/AIR+JORDAN+4+RETRO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/07f8cd37-abae-467c-a097-e7938e99a023/AIR+JORDAN+4+RETRO.png"
    ],
    specs: [
      "Size: 40-48.5",
      "Colour Shown: Black/Deep Royal Blue/Dark Smoke Grey/Fire Red",
      "Style: FV5029-003",
      "Country/Region of Origin: China"
    ]
  },
  2: {
    title: "Air Jordan 5 Retro",
    price: "Rp 3.269.000",
    description: "The AJ5 is a win however you look at it. A mash-up of leather and textiles keeps this pair looking crisp. We kept the Nike Air cushioning, iconic lace lock and shark-tooth midsole shapes from the original. Are you ready to step into a legend?",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b9ebd29f-db15-4ec4-95c2-2759047befdb/AIR+JORDAN+5+RETRO+OG.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/8d150935-beb1-4443-9345-531d0df77bfc/AIR+JORDAN+5+RETRO+OG.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/473d958a-8795-443e-a85c-f3512a8d44b2/AIR+JORDAN+5+RETRO+OG.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/a03e0aba-6046-4cbd-8495-0a720ff4639e/AIR+JORDAN+5+RETRO+OG.png",
      ""
    ],
    specs: [
      "Size: 38-48.5",
      "Colour Shown: White/Black/Fire Red",
      "Style: HQ7978-101",
      "Country/Region of Origin: China"
    ]
  },
  3: {
    title: "Air Jordan MVP 92",
    price: "Rp 2.249.000",
    description: "How do you top the AJ7? You reimagine it with a low-top silhouette. We started with the layered upper and iconic midsole that turned the original into an instant classic. Then we added textile accents and a padded, low-cut collar to give you a fresh, modern look.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/35fe070d-71fd-4ce2-8244-cd1a165f5619/JORDAN+MVP+92.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/4053a4be-6d0f-479d-9175-cba1a62bcd95/JORDAN+MVP+92.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e600bdb2-e5b4-4d05-ac8b-426eaab9d081/JORDAN+MVP+92.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ba059f7f-4ea3-4150-8f7b-c37686d674bf/JORDAN+MVP+92.png",
      ""
    ],
    specs: [
      "Size: 38-48.5",
      "Colour Shown: Black/Anthracite/Gym Red",
      "Style: HQ3950-006",
      "Country/Region of Origin: China"
    ]
  },
  4: {
    title: "Luka .77 PF 'Gone Camping'",
    price: "Rp 1.549.000",
    description: "When Luka's not on the court, there's a good chance he's gone camping. This Luka .77 celebrates that pastime with a rugged design that helps you take your game outdoors. High abrasion mesh and a full-length rubber outsole stand up to concrete and asphalt, giving you a shoe that can handle any court.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/ad4782c5-823f-42f8-9d69-9c79d534fd97/JORDAN+LUKA+.77+PF.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0660db16-7cab-4963-b5b3-bb1f9e878c0f/JORDAN+LUKA+.77+PF.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/9979965c-9b08-4e66-b63e-b8c51738468b/JORDAN+LUKA+.77+PF.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/63e7f41c-2eed-4e01-9e4d-f195cd7bde61/JORDAN+LUKA+.77+PF.png",
      ""
    ],
    specs: [
      "Size: 40-48.5",
      "Colour Shown: Light Silver/Black/Coconut Milk/Hyper Crimson",
      "Style: HF0819-003",
      "Country/Region of Origin: Vietnam"
    ]
  },
  5: {
    title: "Air Jordan 1 Low Travis Scott x Fragment",
    price: "Rp 32.249.000",
    description: "It's the rare sneaker that satisfies the 'rule of three'—sometimes, having three minds is greater than one. In the case of Jordan Brand, Travis Scott and Hiroshi Fujiwara's Fragment Design, it was a case of three masterminds coming together to collaborate on not just any Air Jordan, but the beloved Air Jordan 1—a model both the Houston rapper and the Japanese designer have tapped for past Jordan Brand link-ups. Their Air Jordan 1 Low colourway comes in familiar colour blocking schemes, but with special touches only Scott and Fujiwara could've conjured up. On top of an aged midsole with matching Sail laces, fresh Military Blue accents the heel, collar and insole, providing a new flavour for a classic make-up. And no need for double-takes at the Sail Swoosh—it's indeed backwards—now a signature Scott touch for his Air Jordan 1 designs. But if anyone on the street rubbernecks while you're rocking this collab, they'll know who's responsible: Cactus Jack and Fragment Design logos are embossed on the left and right heels, respectively, leaving their modern marks on this time-tested silhouette.",
    images: [
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/2b2ba3c5-44aa-4071-a85c-72fb84a29d36/air-jordan-1-low-travis-scott-x-fragment-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/c93e8b7a-81f6-4bb4-a1a6-734240341ca3/air-jordan-1-low-travis-scott-x-fragment-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/6da12027-0a9a-4d1d-869a-2feebfc0bd83/air-jordan-1-low-travis-scott-x-fragment-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/c93e8b7a-81f6-4bb4-a1a6-734240341ca3/air-jordan-1-low-travis-scott-x-fragment-release-date.jpg",
      "",
      ""
    ],
    specs: [
      "Size: 40-48.5",
      "Colour Shown: Blue/White/Black",
      "Style: DM7866-140",
      "Country/Region of Origin: China"
    ]
  },
  6: {
    title: "Air Jordan 1 Low x Travis Scott Reverse Olive",
    price: "Rp 32.249.000",
    description: "Flipping the script once again, Travis Scott returns to leave another lasting imprint on the AJ1 Low. Primed for the season, this balanced edition mixes premium leather with a warm, neutral palette. The Sail overlays wrap the Medium Olive upper for a smooth, earthy finish. Scott's signature backwards Swoosh logos are paired with stitched University Red details, creating another timeless icon.",
    images: [
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/84d5c9bc-6dd2-49c7-ae36-dd4251cd0c60/air-jordan-1-low-x-travis-scott-reverse-olive-dm7866-200-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/dfa4f91e-8a7e-45e5-959c-04dd0110234e/air-jordan-1-low-x-travis-scott-reverse-olive-dm7866-200-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/9bcbf68a-70ba-4b17-bf62-fc7d3b6c8cd8/air-jordan-1-low-x-travis-scott-reverse-olive-dm7866-200-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/760492cd-af99-4090-906f-ee4b8681d7bc/air-jordan-1-low-x-travis-scott-reverse-olive-dm7866-200-release-date.jpg",
      ""
    ],
    specs: [
      "Size: 40-48.5",
      "Colour Shown: Olive/White/Black",
      "Style: DM7866-200",
      "Country/Region of Origin: China"
    ]
  },
  7: {
    title: "ir Force 1 Mid x Off-White ™️White",
    price: "Rp 3.799.000",
    description: "Virgil Abloh's legacy continues with the Air Force 1 Mid. Celebrating 40 years of AF-1, he re-imagined the legendary silhouette through the futurist lens. Lightweight, airy mesh with woodgrain pattern brings an utilitarian edge, while the spiked outsole connects directly to the ISPA philosophy of 'Improvise. Scavenge. Protect. Adapt'. And as always, Virgil left room for others to be creative—the design pairs traditional laces with a secondary set that loops through Flywire cables. The result: a modernised and experimental reflection on history's most revered shoe.",
    images: [
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/ce1bd32f-e53b-449c-80bd-96c033f94983/air-force-1-mid-x-off-white-%E2%84%A2%EF%B8%8F-white-do6290-100-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/15473c7b-f761-4a95-a68f-5e978bdda07a/air-force-1-mid-x-off-white-%E2%84%A2%EF%B8%8F-white-do6290-100-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/7068f417-b0dd-435f-99db-253d8385d83d/air-force-1-mid-x-off-white-%E2%84%A2%EF%B8%8F-white-do6290-100-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/3e8cae13-ba6c-40d6-86b2-572ef1f15789/air-force-1-mid-x-off-white-%E2%84%A2%EF%B8%8F-white-do6290-100-release-date.jpg",
      ""
    ],
    specs: [
      "Size: 38-48.5",
      "Colour Shown: Grey/White/Orange/Blue",
      "Style: DO6290-100",
      "Country/Region of Origin: China"
    ]
  },
  8: {
    title: "LDWaffle x sacai x Fragment Light Smoke Grey",
    price: "Rp 8.349.000",
    description: "Chitose Abe of sacai and Hiroshi Fujiwara of Fragment have collaborated several times, both with each other and Nike in the past—and for this effort, they revisit the LDWaffle, a fusion of two iconic silhouettes, the Waffle Daybreak and LDV. This edition mixes signature features from both brands, such as double tongues, shoelaces and Swooshes blending with logo hits from all three outfits. For the upper, Fujiwara chose a specific shade of grey—Light Smoke Grey in this case—in mesh and premium suede to create a look that's equal parts bold and understated. With such masterful precision in design and intent, this stylistic mash-up is a modern classic.",
    images: [
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/dc7919e3-86ee-495e-899c-b99ab6f2a232/ldwaffle-x-sacai-x-fragment-light-smoke-grey-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/49686299-76d4-4da9-b358-8f9e16e56e42/ldwaffle-x-sacai-x-fragment-light-smoke-grey-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/ad168ef3-4448-4888-9fd7-9b8c6a70ea3e/ldwaffle-x-sacai-x-fragment-light-smoke-grey-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/d61c347c-f0ed-4ee2-920f-d61ba7c66acb/ldwaffle-x-sacai-x-fragment-light-smoke-grey-release-date.jpg",
      ""
    ],
    specs: [
      "Size: 40-48.5",
      "Colour Shown: White/Smoke Grey",
      "Style: DH2684-001",
      "Country/Region of Origin: China"
    ]
  },
};

// Modal Functions
let currentProductId = null;
let currentImageIndex = 0;

function openProductModal(id) {
  currentProductId = id;
  const product = productData[id];
  if (!product) return;

  // Update Modal Content
  document.getElementById('productTitle').textContent = product.title;
  document.getElementById('productPrice').textContent = product.price;
  document.getElementById('productDescription').textContent = product.description;

  const specsList = document.querySelector('.specs');
  specsList.innerHTML = product.specs.map(spec => `<li>${spec}</li>`).join('');

  // Setup Carousel
  setupCarousel(product.images);

  // Show Modal
  document.getElementById('productModal').style.display = 'block';
  document.body.style.overflow = 'hidden'; // Prevent scroll
}

function closeProductModal() {
  document.getElementById('productModal').style.display = 'none';
  document.body.style.overflow = 'auto';
  currentImageIndex = 0;
}

function setupCarousel(images) {
  const carousel = document.getElementById('carouselImages');
  const dotsContainer = document.getElementById('carouselDots');
  carousel.innerHTML = images.map(img => `<img src="${img}" alt="Product Image">`).join('');
  dotsContainer.innerHTML = images.map((_, index) => `<span class="dot" onclick="goToImage(${index})"></span>`).join('');

  // Set initial position
  showImage(currentImageIndex);

  // Event Listeners for Arrows
  document.querySelector('.prev').onclick = () => changeImage(-1);
  document.querySelector('.next').onclick = () => changeImage(1);
}

function showImage(index) {
  const images = document.querySelectorAll('#carouselImages img');
  const dots = document.querySelectorAll('.dot');
  images.forEach((img, i) => img.style.transform = `translateX(${(i - index) * 100}%)`);
  dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
}

function changeImage(direction) {
  const images = Object.keys(productData[currentProductId].images).length;
  currentImageIndex = (currentImageIndex + direction + images) % images;
  showImage(currentImageIndex);
}

function goToImage(index) {
  currentImageIndex = index;
  showImage(index);
}

// Close Modal Events
document.querySelector('.close').onclick = closeProductModal;
document.getElementById('productModal').onclick = (e) => {
  if (e.target.id === 'productModal') closeProductModal();
};
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeProductModal();
});

// Buy Button (Demo: Alert atau redirect)
document.querySelector('.buy-btn').onclick = () => {
  alert('Redirect ke checkout untuk ' + productData[currentProductId]?.title);
  // Atau: window.location.href = '/checkout?id=' + currentProductId;
};

// Integrasi dengan Existing JS (Tambahkan di DOMContentLoaded)
document.addEventListener('DOMContentLoaded', function() {
  // Existing code for search, fade-in, etc.
  
  // Tambahan: Parallax untuk Hero
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.elegant-hero');
    if (hero) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
    }
  });

  // Staggered Fade untuk Sections (Lebih Menarik)
  const sections = document.querySelectorAll('.fade-in');
  sections.forEach((section, index) => {
    section.style.transitionDelay = `${index * 0.2}s`;
  });
});

// Fungsi Navigasi Saling Berhubungan - Pindah Halaman + Smooth Scroll
function handleNavigation(e, link) {
  e.preventDefault(); // Prevent default link behavior
  const href = link.getAttribute('href');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  if (href.startsWith('#')) {
    // Same page scroll (e.g., #new di index.html)
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    return;
  }
  
  if (href.includes('#')) {
    // Different page + scroll (e.g., men.html#shoes)
    const [page, hash] = href.split('#');
    const targetPage = page || currentPage;
    const targetId = hash ? `#${hash}` : '';
    
    // Show loading
    document.body.classList.add('loading');
    const spinner = document.querySelector('.navigation-spinner') || createNavigationSpinner();
    spinner.style.display = 'block';
    
    // Pindah halaman
    window.location.href = targetPage + targetId;
  } else {
    // Simple page change (e.g., men.html)
    document.body.classList.add('loading');
    const spinner = document.querySelector('.navigation-spinner') || createNavigationSpinner();
    spinner.style.display = 'block';
    
    window.location.href = href;
  }
}

// Helper: Create Navigation Spinner
function createNavigationSpinner() {
  let spinner = document.querySelector('.navigation-spinner');
  if (!spinner) {
    spinner = document.createElement('div');
    spinner.className = 'navigation-spinner';
    document.body.appendChild(spinner);
  }
  return spinner;
}

// Event Listeners untuk Semua Nav Links
document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('.nav-links a, .submenu a, .submenu-level-2 a, .footer-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => handleNavigation(e, link));
  });
  
  // Hide spinner on page load (untuk kasus refresh)
  const spinner = document.querySelector('.navigation-spinner');
  if (spinner) spinner.style.display = 'none';
  
  // Existing code (loadProductsByCategory, hamburger, modal, touch events, dll.) - sudah ada di script sebelumnya
});

// Optional: Hide spinner on pageshow (untuk back/forward browser)
window.addEventListener('pageshow', () => {
  const spinner = document.querySelector('.navigation-spinner');
  if (spinner) spinner.style.display = 'none';
  document.body.classList.remove('loading');
});

// Update loadProductsByCategory untuk support sub-filter (e.g., 'apparel-tops')
function loadProductsByCategory(category = 'all', searchQuery = '', subFilter = '') {
  // ... existing filter code ...
  let products = Object.values(productData).filter(p => {
    let match = (category === 'all' || p.category === category);
    if (subFilter) {
      // Contoh: jika subFilter = 'tops', filter berdasarkan tag di productData
      match = match && p.tags && p.tags.includes(subFilter);
    }
    // ... search filter ...
    return match;
  });
  // ... rest of function ...
}

// Di handleNavigation, parse subFilter dari href (e.g., men.html#apparel-tops → subFilter = 'tops')
function handleNavigation(e, link) {
  // ... existing code ...
  if (href.includes('#')) {
    const [page, hash] = href.split('#');
    const targetPage = page || currentPage;
    const targetId = hash ? `#${hash}` : '';
    
    // Parse subFilter if needed (e.g., #apparel-tops)
    let subFilter = '';
    if (hash && hash.includes('-')) {
      subFilter = hash.split('-')[1]; // e.g., 'tops' from 'apparel-tops'
    }
    
    // Show loading and navigate
    document.body.classList.add('loading');
    const spinner = document.querySelector('.navigation-spinner') || createNavigationSpinner();
    spinner.style.display = 'block';
    
    // After navigate, load with subFilter (via URL params or sessionStorage)
    sessionStorage.setItem('subFilter', subFilter);
    window.location.href = targetPage + targetId;
  }
  // ... 
}

// Di loadProductsByCategory, check sessionStorage
const subFilter = sessionStorage.getItem('subFilter') || '';
loadProductsByCategory(currentCategory, '', subFilter);
sessionStorage.removeItem('subFilter'); // Clear after load
