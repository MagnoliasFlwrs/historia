const searchPanelBtn = document.querySelector('.search-panel-btn');
const overlay = document.querySelector('.overlay');
const searchPanel = document.querySelector('.search-panel');
const searchPanelCloseBtn = document.querySelector('.search-panel .close-icon');

const catalogOpenBtn = document.getElementById('catalog-open-btn');
const catalogModal = document.getElementById('catalog-desktop-modal');
const catalogCloseBtn = catalogModal?.querySelector('.close-btn');

const mobileMenu = document.getElementById('mobile-menu');
const mobileNavTrack = mobileMenu?.querySelector('.mobile-nav-track');
const mobileHead = mobileMenu?.querySelector('.mobile-head');
const burgerBtn = document.querySelector('.burger-btn');
const mobileNavBack = mobileMenu?.querySelector('.mobile-nav-back');
const mobileNavToCatalog = mobileMenu?.querySelector('.mobile-nav-to-catalog');

function setMobileNavDepth(depth) {
    if (!mobileMenu || !mobileNavTrack || !mobileHead) return;
    const d = Math.max(0, Math.min(2, depth));
    mobileMenu.dataset.navDepth = String(d);
    mobileNavTrack.dataset.depth = String(d);
    mobileHead.dataset.showBack = d > 0 ? 'true' : 'false';
}

function resetMobileCatalogNav() {
    if (!mobileMenu) return;
    setMobileNavDepth(0);
    mobileMenu.querySelectorAll('.mobile-sub-list').forEach((ul) => {
        ul.classList.toggle('is-active', ul.dataset.mobileCat === 'suits');
    });
}

function openMobileMenu() {
    if (!mobileMenu) return;
    searchPanel?.classList.remove('open');
    closeCatalogModal();
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    overlay?.classList.add('open');
}

function closeMobileMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('open');
    mobileMenu.setAttribute('aria-hidden', 'true');
    resetMobileCatalogNav();
}

function closeCatalogModal() {
    catalogModal?.classList.remove('open');
    catalogModal?.setAttribute('aria-hidden', 'true');
    catalogOpenBtn?.setAttribute('aria-expanded', 'false');
}

function closeAllOverlays() {
    overlay?.classList.remove('open');
    searchPanel?.classList.remove('open');
    closeCatalogModal();
    closeMobileMenu();
}

searchPanelBtn?.addEventListener('click', () => {
    closeCatalogModal();
    closeMobileMenu();
    overlay?.classList.add('open');
    searchPanel?.classList.add('open');
});

overlay?.addEventListener('click', () => {
    closeAllOverlays();
});

searchPanelCloseBtn?.addEventListener('click', () => {
    closeAllOverlays();
});

catalogOpenBtn?.addEventListener('click', () => {
    if (!catalogModal) return;
    const opening = !catalogModal.classList.contains('open');
    if (opening) {
        searchPanel?.classList.remove('open');
        closeMobileMenu();
        catalogModal.classList.add('open');
        catalogModal.setAttribute('aria-hidden', 'false');
        catalogOpenBtn.setAttribute('aria-expanded', 'true');
        overlay?.classList.add('open');
    } else {
        closeAllOverlays();
    }
});

catalogCloseBtn?.addEventListener('click', () => {
    closeAllOverlays();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeAllOverlays();
});

function setCatalogSubmenu(cat) {
    if (!catalogModal || !cat) return;
    catalogModal.querySelectorAll('.catalog-desktop-modal-list li[data-catalog-cat]').forEach((item) => {
        const on = item.dataset.catalogCat === cat;
        item.classList.toggle('is-active', on);
    });
    catalogModal.querySelectorAll('.catalog-desktop-modal-subpanel').forEach((panel) => {
        const match = panel.id === `catalog-sub-${cat}`;
        panel.classList.toggle('is-active', match);
    });
}

catalogModal?.querySelectorAll('.catalog-desktop-modal-list li[data-catalog-cat]').forEach((item) => {
    item.addEventListener('click', () => setCatalogSubmenu(item.dataset.catalogCat));
    item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setCatalogSubmenu(item.dataset.catalogCat);
        }
    });
});

burgerBtn?.addEventListener('click', () => {
    if (!mobileMenu) return;
    if (mobileMenu.classList.contains('open')) {
        closeAllOverlays();
    } else {
        openMobileMenu();
    }
});

mobileMenu?.querySelector('.burger-close-btn')?.addEventListener('click', () => {
    closeAllOverlays();
});

mobileNavBack?.addEventListener('click', () => {
    if (!mobileMenu) return;
    const depth = Number.parseInt(mobileMenu.dataset.navDepth || '0', 10);
    if (depth === 2) {
        setMobileNavDepth(1);
    } else if (depth === 1) {
        setMobileNavDepth(0);
    }
});

mobileNavToCatalog?.addEventListener('click', () => {
    setMobileNavDepth(1);
});

mobileMenu?.querySelector('.mobile-nav-panel--catalog')?.querySelectorAll('button[data-mobile-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
        const cat = btn.dataset.mobileCat;
        if (!cat || !mobileMenu) return;
        mobileMenu.querySelectorAll('.mobile-sub-list').forEach((ul) => {
            ul.classList.toggle('is-active', ul.dataset.mobileCat === cat);
        });
        setMobileNavDepth(2);
    });
});

const heroSwiperEl = document.querySelector('.hero-swiper-container');
if (heroSwiperEl) {
    const prevEl = document.querySelector('.hero-swiper-button-prev');
    const nextEl = document.querySelector('.hero-swiper-button-next');
    const heroSwiperOptions = {
        slidesPerView: 1.2,
        spaceBetween: 30,
        speed: 400,
        breakpoints: {
            500: {
                slidesPerView: 1.5,
                spaceBetween:30,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 0,
            },
            1025: {
                slidesPerView: 3,
                spaceBetween: 0,
            },
        },
    };
    if (prevEl && nextEl) {
        heroSwiperOptions.navigation = { prevEl, nextEl };
    }
    new Swiper(heroSwiperEl, heroSwiperOptions);
}
