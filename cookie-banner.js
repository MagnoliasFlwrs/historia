(function () {
    const banner = document.querySelector('.cookie-banner');
    if (!banner) return;

    const showMore = banner.querySelector('.show-more');
    const hiddenContent = banner.querySelector('.hidden-content');
    const consentBtn = banner.querySelector('.consent-btn');

    const labelMore = 'Подробнее >>';
    const labelLess = '<< Свернуть';

    function hideBanner() {
        banner.hidden = true;
        banner.style.display = 'none';
    }

    showMore?.addEventListener('click', () => {
        if (!hiddenContent) return;
        const expanded = hiddenContent.style.display === 'block';
        if (expanded) {
            hiddenContent.style.display = '';
            showMore.textContent = labelMore;
        } else {
            hiddenContent.style.display = 'block';
            showMore.textContent = labelLess;
        }
    });

    consentBtn?.addEventListener('click', () => {
        hideBanner();
    });
})();
