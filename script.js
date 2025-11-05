// Efek animasi fade-in saat scroll (dipercepat dengan threshold lebih besar)
document.addEventListener("scroll", function () {
  const elements = document.querySelectorAll(".fade-in");
  const windowHeight = window.innerHeight;

  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    // Ubah threshold dari -100 ke -200 agar muncul lebih cepat saat scroll
    if (position < windowHeight - 200) {
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

  // Staggered Fade untuk Sections (dipercepat dengan delay lebih kecil)
  const sections = document.querySelectorAll('.fade-in');
  sections.forEach((section, index) => {
    section.style.transitionDelay = `${index * 0.1}s`; // Ubah dari 0.2s ke 0.1s agar lebih cepat
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
    title: "Nike Air Windbreaker",
    price: "Rp 1.169.000",
    description: "This premium tracksuit jacket is crafted from lightweight, swishy material and has a roomy fit—just like the vintage versions. The water-repellent finish helps keep you dry in wet weather.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/c116c6eb-e1c2-40b6-9807-a96d20aca96b/AS+M+NIKE+AIR+WOVEN+TRACK+JACK.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/d19cd1b3-a453-4178-8053-d501f9b58db6/AS+M+NIKE+AIR+WOVEN+TRACK+JACK.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/de1cfbb3-ce1e-4000-95b7-c9ad8d71e963/AS+M+NIKE+AIR+WOVEN+TRACK+JACK.png",
    ],
    specs: [
      "Size: S-XXL",
      "Colour Shown: Light Army/Black/Black",
      "Style: HV0881-320",
      "Country/Region of Origin: Vietnam"
    ]
  },
  3: {
    title: "Nike x Stussy",
    price: "Rp 1.799.000",
    description: "Every 'fit needs a T-shirt. Up your game with this fresh take on the wardrobe staple. Its relaxed fit, soft cotton and bold graphics mix comfort with style.",
    images: [
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/3cbe2d86-07c5-4932-80ca-8fb61424a48f/nike-x-st%C3%BCssy-apparel-accessories-collection-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/93c9b7a4-1b8a-499e-b155-d2fd6ae10e32/nike-x-st%C3%BCssy-apparel-accessories-collection-release-date.jpg",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/de1cfbb3-ce1e-4000-95b7-c9ad8d71e963/AS+M+NIKE+AIR+WOVEN+TRACK+JACK.png",
    ],
    specs: [
      "Size: S-XXL",
      "Colour Shown: White/Black",
      "Style: HV0881-320",
      "Country/Region of Origin: China"
    ]
  },
  4: {
    title: "Travis Scott x Fragment",
    price: "Rp 32.249.000",
    description: "It's the rare sneaker that satisfies the 'rule of three'—sometimes, having three minds is greater than one. In the case of Jordan Brand, Travis Scott and Hiroshi Fujiwara's Fragment Design, it was a case of three masterminds coming together to collaborate on not just any Air Jordan, but the beloved Air Jordan 1—a model both the Houston rapper and the Japanese designer have tapped for past Jordan Brand link-ups. Their Air Jordan 1 Low colourway comes in familiar colour blocking schemes, but with special touches only Scott and Fujiwara could've conjured up. On top of an aged midsole with matching Sail laces, fresh Military Blue accents the heel, collar and insole, providing a new flavour for a classic make-up. And no need for double-takes at the Sail Swoosh—it's indeed backwards—now a signature Scott touch for his Air Jordan 1 designs. But if anyone on the street rubbernecks while you're rocking this collab, they'll know who's responsible: Cactus Jack and Fragment Design logos are embossed on the left and right heels, respectively, leaving their modern marks on this time-tested silhouette.",
    images: [
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/15b77901-eb6e-46a8-8c2e-76beb0b5b42a/air-jordan-1-low-travis-scott-x-fragment-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/68fae8b2-21c2-4842-942a-52e264345a37/air-jordan-1-low-travis-scott-x-fragment-release-date.jpg",
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
  5: {
    title: "Nike Tech Fleece",
    price: "Rp 1.899.000",
    description: "This colour-block version of the iconic Tech Windrunner is crafted with cool and crinkly nylon-blended fabric that's sweat wicking and slightly stretchy. A relaxed fit, articulation at the elbows and an adjustable full-coverage hood provide comfortable coverage.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/86e7e8a3-1960-4128-a3b6-29f21ccd2c30/AS+M+NK+TECH+WVN+PRO+WR+FZ+JAC.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/19feea25-4c01-4e17-94b5-df4515baecca/AS+M+NK+TECH+WVN+PRO+WR+FZ+JAC.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/8961c556-8e44-4145-8db6-89a1d9b6127f/AS+M+NK+TECH+WVN+PRO+WR+FZ+JAC.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/cb206cfa-b4a0-4ddb-af28-dec51ee20f97/AS+M+NK+TECH+WVN+PRO+WR+FZ+JAC.png",
      "",
    ],
    specs: [
      "Size: S-XXL",
      "Colour Shown: Black/Obsidian/Black",
      "Style: IH8462-010",
      "Country/Region of Origin: China"
    ]
  },
  6: {
    title: "Barcelona Jersey 25/26 Home",
    price: "Rp 1.379.000",
    description: "F.C. Barcelona's 2025/26 home shirt updates one of the most recognisable looks in football. Their iconic Blaugrana is fused with movement-inspired graphics and bright, energetic accents to celebrate their fans' unity and devotion to the club.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/0cedbb91-e653-48e5-b436-c37bbc410d0d/FCB+M+NK+DFADV+JSY+SS+MATCH+HM.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/92964f46-5217-43b4-a1f4-e0b6e0e8c4ee/FCB+M+NK+DFADV+JSY+SS+MATCH+HM.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/f8c59ad4-348f-4670-b229-81411130b68e/FCB+M+NK+DFADV+JSY+SS+MATCH+HM.png",
      "",
      ""
    ],
    specs: [
      "S-XXL",
      "Colour Shown: Deep Royal Blue/Deep Royal Blue/Noble Red/Midwest Gold",
      "Style: HJ4611-456",
      "Country/Region of Origin: Laos, Thailand"
    ]
  },
  7: {
    title: "Nike Brasilia 9.5",
    price: "Rp 419.000",
    description: "Good things come in small packages, especially when that package is the Nike Brasilia Duffel Bag. Fill it with your gear and stay organised on your next trip to the gym or a daytime adventure. A side compartment stores shoes and sweaty clothes separate, while inner and outer pockets help you stay organised. This product is made from at least 50% recycled polyester fibres.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/fb6daa15-5908-4c98-b8e7-112a4aabc1f0/NK+BRSLA+XS+DUFF+-+9.5+%2825L%29.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/d90a1681-c799-486c-9d8f-bf863bfe1c0b/NK+BRSLA+XS+DUFF+-+9.5+%2825L%29.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/2aa5ae54-202d-4630-8b9f-e0c020f9ee8f/NK+BRSLA+XS+DUFF+-+9.5+%2825L%29.png",
      "",
      ""
    ],
    specs: [
      "Colour Shown: Burnt Sunrise/Black/Black",
      "Style: DM3977-825",
      "Country/Region of Origin: Indonesia"
    ]
  },
  8: {
    title: "Jordan Essentials",
    price: "Rp 849.000",
    description: "Sturdy woven canvas gives these classic trousers a structured feel. A stretchy elastic waistband with internal drawcord lets you fine-tune your perfect fit, while a faux fly adds a traditional look.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/06b5a38c-614c-4319-b3d3-b157fe6e1a51/M+J+BRK+WVN+PANT.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/5ed16adc-5bd3-455d-87df-e0051243603d/M+J+BRK+WVN+PANT.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/3d22d1f6-b4cb-40a1-8f5c-198467018d7b/M+J+BRK+WVN+PANT.png",
      "",
      ""
    ],
    specs: [
      "Size: S-XXL",
      "Colour Shown: Black/Anthracite",
      "Style: HF9329-010",
      "Country/Region of Origin: Vietnam"
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