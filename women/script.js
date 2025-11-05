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
    title: "Nike Air'",
    price: "Rp 1.169.000",
    description: "This premium tracksuit jacket is crafted from lightweight, swishy material and has a roomy fit—just like the vintage versions. The water-repellent finish helps keep you dry in wet weather.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/4c9602b6-8dd2-49fe-a2f0-4696663fa8bf/AS+M+NIKE+AIR+WOVEN+TRACK+JACK.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/d16ed4ae-2f60-4d97-886d-2cca14684007/AS+M+NIKE+AIR+WOVEN+TRACK+JACK.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/139d9015-e611-43cd-bf08-10139d0e1806/AS+M+NIKE+AIR+WOVEN+TRACK+JACK.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/139d9015-e611-43cd-bf08-10139d0e1806/AS+M+NIKE+AIR+WOVEN+TRACK+JACK.png",
      ""
    ],
    specs: [
      "Size: S-2XL",
      "Colour Shown: Black/White/Black",
      "Style: HV0881-010",
      "Country/Region of Origin: Vietnam"
    ]
  },
  2: {
    title: "Nike Sportswear Men's Full-Zip Swoosh Jacket",
    price: "Rp 2.409.000",
    description: "The Nike Sportswear Jacket makes a statement with oversized branding in a reversible design, so you can change up the look as you go. It features French terry and taffeta fabric to help keep you warm when the weather gets chilly.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/87eeb46c-2711-447f-9657-28bb5141117a/AS+M+NSW+VW+SWSH+FULL+ZIP+JKT.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/949acd55-9411-41c5-9e40-1a45411a821a/AS+M+NSW+VW+SWSH+FULL+ZIP+JKT.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/b9d4a32e-ee71-4391-9206-0e901672af9c/AS+M+NSW+VW+SWSH+FULL+ZIP+JKT.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/74bfcc63-81b2-44e9-a309-0908ae6d6658/AS+M+NSW+VW+SWSH+FULL+ZIP+JKT.png",
      ""
    ],
    specs: [
      "Size: S-2XL",
      "Colour Shown: Black/Sail/Black/Sail",
      "Style: BQ6546-011",
      "Country/Region of Origin: Vietnam"
    ]
  },
  3: {
    title: "Nike x Stüssy Full-Zip Washed Fleece Hoodie",
    price: "Rp 1.599.000",
    description: "Shake off the chill and elevate your essentials with this washed, full-zip heavyweight fleece hoodie. The roomy design throws it back to the signature Stüssy streetwear styles you know and love. Snag the matching fleece trousers to complete the uniform look.",
    images: [
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/1e222c08-9b70-4937-ab2f-f34b5b9b0b49/nike-x-st%C3%BCssy-apparel-collection-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/1988e441-abf2-45a1-a42e-8489f73c049b/nike-x-st%C3%BCssy-apparel-collection-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/ea9877d2-ca9e-408b-bf70-a890af6e82c4/nike-x-st%C3%BCssy-apparel-collection-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/cfaa1740-ae42-40c7-a1cf-2048b6e707ba/nike-x-st%C3%BCssy-apparel-collection-release-date.jpg",
      ""
    ],
    specs: [
      "Size: S-2XL",
      "Colour Shown: Black/White",
      "Style: FJ9176-010",
      "Country/Region of Origin: Vietnam"
    ]
  },
  4: {
    title: "Nike x Stussy T-Shirt White",
    price: "Rp 1.799.000",
    description: "Every 'fit needs a T-shirt. Up your game with this fresh take on the wardrobe staple. Its relaxed fit, soft cotton and bold graphics mix comfort with style.",
    images: [
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/3cbe2d86-07c5-4932-80ca-8fb61424a48f/nike-x-st%C3%BCssy-apparel-accessories-collection-release-date.jpg",
      "https://static.nike.com/a/images/w_1280,q_auto,f_auto/93c9b7a4-1b8a-499e-b155-d2fd6ae10e32/nike-x-st%C3%BCssy-apparel-accessories-collection-release-date.jpg",
      ""
    ],
    specs: [
      "Size: S-2XL",
      "Colour Shown: White/Black",
      "Style: HV0881-320",
      "Country/Region of Origin: China"
    ]
  },
  5: {
    title: "Jordan Brooklyn Fleece Men's Oversized Pullover Hoodie",
    price: "Rp 849.000",
    description: "We love a good hoodie. This one prioritises comfort with an oversized fit and midweight brushed fleece that feels extra-soft on the inside.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/50e5473a-c932-425a-b577-a663c8c415be/M+J+BRK+OVS+PO+HD.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/e245dc37-bad6-48e5-acf2-a23374f8c1d5/M+J+BRK+OVS+PO+HD.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/0622cf43-d938-47da-b71f-50b27ea0a4bc/M+J+BRK+OVS+PO+HD.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto,u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/2aca4f94-0736-4a17-b26a-9506998b1ec6/M+J+BRK+OVS+PO+HD.png",
      ""
    ],
    specs: [
      "Size: S-XXL",
      "Colour Shown: Black/Sail",
      "Style: IB7235-010",
      "Country/Region of Origin: China"
    ]
  },
  6: {
    title: "Nike Sportswear Premium Essentials Men's Oversized T-shirt",
    price: "Rp 569.000",
    description: "This tee offers an embroidered logo on the chest and oversized fit through the body. The midweight cotton feels soft and slightly structured for durable, daily comfort.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/7f0ff7d4-7db0-4d5b-8c85-784b5733bb52/AS+M+NSW+TEE+OS+PREM+ESSNTL+FA.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/a246bf00-266c-422b-bff8-ff19bb38ae8e/AS+M+NSW+TEE+OS+PREM+ESSNTL+FA.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/2be0455e-33a3-4e5e-97de-b387f026dd16/AS+M+NSW+TEE+OS+PREM+ESSNTL+FA.png",
      "",
      ""
    ],
    specs: [
      "Size: S-2XL",
      "Colour Shown: Black",
      "Style: HF9607-010",
      "Country/Region of Origin: China"
    ]
  },
  7: {
    title: "Nike Sportswear Women's Mid-Rise Wide-Leg Tracksuit Bottoms",
    price: "Rp 849.000",
    description: "We're reimagining classic tracksuit bottoms. The midweight knit and super-wide legs combine to bring effortless drape to your look.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/f741fe1f-4142-43e4-9635-01b62072ac33/AS+W+NSW+WIDE+LEG+TRACK+PNT.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/3e2ebf18-1634-4303-a47d-d92fc60baadf/AS+W+NSW+WIDE+LEG+TRACK+PNT.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/0aff5773-7ba9-46b9-87ba-31f5e7678b35/AS+W+NSW+WIDE+LEG+TRACK+PNT.png",
      "",
      ""
    ],
    specs: [
      "Size: XS-XL",
      "Colour Shown: Black/Black/Sail",
      "Style: IH8515-010",
      "Country/Region of Origin: Vietnam"
    ]
  },
  8: {
    title: "Nike ACG 'Smith Summit' Men's Zip Cargo Trousers",
    price: "Rp 2.299.000",
    description: "Aiming to maximise comfort and versatility, we updated the fit of our Smith Summit cargo trousers to be wider through the legs than previous versions. They're made from water-repellent, UV-protecting fabric, and easily zip off to convert to shorts.",
    images: [
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/79b9bdf9-30bb-4f61-92fc-f6331fa6a7e9/AS+M+ACG+ZIP+SMITH+SMMIT+CRGO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/8149d358-2d17-43cf-91b0-138d3197664d/AS+M+ACG+ZIP+SMITH+SMMIT+CRGO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/3833c7b8-f0e0-40e9-bf86-70584bed1245/AS+M+ACG+ZIP+SMITH+SMMIT+CRGO.png",
      "https://static.nike.com/a/images/t_web_pdp_535_v2/f_auto/d864f6b2-e6f1-4496-93f2-f55e35b628c6/AS+M+ACG+ZIP+SMITH+SMMIT+CRGO.png",
      ""
    ],
    specs: [
      "Size: XS-XXL",
      "Colour Shown: Black/Anthracite/Summit White",
      "Style: HV0592-010",
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