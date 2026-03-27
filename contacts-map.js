(function () {
    const container = document.querySelector('.map-container');
    if (!container) return;

    const iframe = container.querySelector('#contacts-map');
    const buttons = container.querySelectorAll('.map-button');
    if (!iframe || !buttons.length) return;

    const zoom = 16;
    const baseUrl = 'https://yandex.by/map-widget/v1/';

    function setMap(lon, lat) {
        const params = new URLSearchParams({
            ll: `${lon},${lat}`,
            z: String(zoom),
            pt: `${lon},${lat}~pm2rdm`,
        });
        iframe.src = `${baseUrl}?${params.toString()}`;
    }

    buttons.forEach((button) => {
        button.addEventListener('click', () => {
            const { lat, lon } = button.dataset;
            if (lat === undefined || lon === undefined) return;
            setMap(lon, lat);
            buttons.forEach((b) => b.classList.remove('active'));
            button.classList.add('active');
        });
    });
})();
