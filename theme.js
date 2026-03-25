(function () {
    const STORAGE_KEY = 'historia-theme';
    const body = document.body;
    const input = document.getElementById('theme-toggle');

    const applyTheme = (isDark) => {
        body.classList.toggle('light-theme', !isDark);
        body.classList.toggle('dark-theme', isDark);
        if (input) input.checked = isDark;
        try {
            localStorage.setItem(STORAGE_KEY, isDark ? 'dark' : 'light');
        } catch {}
    };

    const readStoredTheme = () => {
        try {
            return localStorage.getItem(STORAGE_KEY);
        } catch {
            return null;
        }
    };

    const stored = readStoredTheme();
    if (stored === 'dark') {
        applyTheme(true);
    } else if (stored === 'light') {
        applyTheme(false);
    } else if (input) {
        input.checked = body.classList.contains('dark-theme');
    }

    input?.addEventListener('change', () => {
        applyTheme(input.checked);
    });
})();
