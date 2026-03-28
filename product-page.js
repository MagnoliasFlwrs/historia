(function () {
    const galleryRoot = document.querySelector('.product-images .swiper-container');
    const similarEl = document.querySelector('.product-similar-swiper');

    function galleryMiniDirection() {
        return window.matchMedia('(max-width: 1300px)').matches ? 'horizontal' : 'vertical';
    }

    function pauseMainGalleryVideos(root) {
        if (!root) return;
        root.querySelectorAll('.gallery .product-gallery-video').forEach((v) => {
            v.pause();
        });
    }

    function syncMainGalleryVideo(swiper) {
        const root = swiper.el?.closest('.swiper-container');
        pauseMainGalleryVideos(root);
        const slide = swiper.slides[swiper.activeIndex];
        const video = slide?.querySelector('.product-gallery-video');
        if (video) {
            video.play().catch(() => {});
        }
    }

    if (galleryRoot && typeof Swiper !== 'undefined') {
        const miniEl = galleryRoot.querySelector('.gallery-mini');
        const mainEl = galleryRoot.querySelector('.gallery');

        if (miniEl && mainEl) {
            const prevBtn = miniEl.querySelector('.gallery-mini-button-prev');
            const nextBtn = miniEl.querySelector('.gallery-mini-button-next');

            const miniSwiper = new Swiper(miniEl, {
                direction: galleryMiniDirection(),
                slidesPerView: 1.5,
                spaceBetween: 10,
                watchSlidesProgress: true,
                navigation: {
                    prevEl: prevBtn,
                    nextEl: nextBtn,
                },
                breakpoints: {
                    600: { slidesPerView: 2.3 },
                    1024: { slidesPerView: 3 },
                    1200: { slidesPerView: 4 },
                },
            });

            const mainSwiper = new Swiper(mainEl, {
                spaceBetween: 16,
                thumbs: {
                    swiper: miniSwiper,
                },
                on: {
                    init(swiper) {
                        syncMainGalleryVideo(swiper);
                    },
                    slideChange(swiper) {
                        syncMainGalleryVideo(swiper);
                    },
                },
            });

            const mq = window.matchMedia('(max-width: 1200px)');
            mq.addEventListener('change', () => {
                miniSwiper.changeDirection(galleryMiniDirection());
                miniSwiper.update();
                mainSwiper.update();
            });
        }
    }

    if (similarEl && typeof Swiper !== 'undefined') {
        new Swiper(similarEl, {
            slidesPerView: 1.15,
            spaceBetween: 20,
            breakpoints: {
                600: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            },
        });
    }


    const favoriteLabelAdd = 'Добавить в избранное';
    const favoriteLabelActive = 'В избранном';

    document.querySelectorAll('.product-favorite').forEach((btn) => {
        const label = btn.querySelector('span');
        if (!label) return;
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            const on = btn.classList.contains('active');
            label.textContent = on ? favoriteLabelActive : favoriteLabelAdd;
            btn.setAttribute('aria-pressed', on ? 'true' : 'false');
            btn.setAttribute('aria-label', on ? favoriteLabelActive : favoriteLabelAdd);
        });
    });
})();
