(function () {
    const closeAllSelects = (except) => {
        document.querySelectorAll('.catalog-select.is-open').forEach((el) => {
            if (el !== except) {
                el.classList.remove('is-open');
                const t = el.querySelector('.catalog-select__trigger');
                const p = el.querySelector('.catalog-select__panel');
                t?.setAttribute('aria-expanded', 'false');
                if (p) p.hidden = true;
            }
        });
    };

    const updateMultiTrigger = (wrap) => {
        const triggerValue = wrap.querySelector('[data-select-value]');
        const panel = wrap.querySelector('.catalog-select__panel');
        if (!triggerValue || !panel) return;
        const ph = wrap.dataset.placeholder || 'Выбрать';
        const checked = panel.querySelectorAll('input[type="checkbox"]:checked');
        if (!checked.length) {
            triggerValue.textContent = ph;
            return;
        }
        const parts = [...checked].map((cb) => {
            const lab = cb.closest('label');
            const t = lab?.querySelector('.catalog-opt-text');
            return t ? t.textContent.trim() : '';
        }).filter(Boolean);
        triggerValue.textContent = parts.length > 3 ? `${parts.slice(0, 3).join(', ')}…` : parts.join(', ');
    };

    document.querySelectorAll('.catalog-select').forEach((wrap) => {
        const trigger = wrap.querySelector('.catalog-select__trigger');
        const panel = wrap.querySelector('.catalog-select__panel');
        if (!trigger || !panel) return;

        wrap.addEventListener('click', (e) => e.stopPropagation());

        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            const open = !wrap.classList.contains('is-open');
            closeAllSelects(open ? wrap : null);
            wrap.classList.toggle('is-open', open);
            trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
            panel.hidden = !open;
        });

        panel.querySelectorAll('.catalog-select__option').forEach((opt) => {
            opt.addEventListener('click', () => {
                panel.querySelectorAll('.catalog-select__option').forEach((o) => o.classList.remove('is-selected'));
                opt.classList.add('is-selected');
                const val = wrap.querySelector('[data-select-value]');
                const label =
                    opt.dataset.label ||
                    opt.querySelector('span')?.textContent.trim() ||
                    '';
                if (val) val.textContent = label;
                wrap.classList.remove('is-open');
                trigger.setAttribute('aria-expanded', 'false');
                panel.hidden = true;
            });
        });

        const hasBoxes = panel.querySelector('input[type="checkbox"]');
        if (hasBoxes) {
            panel.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
                cb.addEventListener('change', () => updateMultiTrigger(wrap));
            });
            updateMultiTrigger(wrap);
        }
    });

    document.addEventListener('click', () => closeAllSelects(null));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeAllSelects(null);
    });

    const titleBtn = document.querySelector('.catalog-title-btn');
    const titleDrop = document.querySelector('.catalog-title-dropdown');
    if (titleBtn && titleDrop) {
        const stop = (e) => e.stopPropagation();
        titleBtn.addEventListener('click', (e) => {
            stop(e);
            const open = titleDrop.hidden;
            titleDrop.hidden = !open;
            titleBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        titleDrop.addEventListener('click', stop);
        document.addEventListener('click', () => {
            titleDrop.hidden = true;
            titleBtn.setAttribute('aria-expanded', 'false');
        });
    }

    document.querySelectorAll('.catalog-tag').forEach((tag) => {
        tag.addEventListener('click', (e) => {
            const remove = e.target.closest('.catalog-tag__remove');
            if (remove) {
                e.stopPropagation();
                tag.classList.remove('catalog-tag--active');
                tag.querySelectorAll('.catalog-tag__remove').forEach((n) => n.remove());
                return;
            }
            if (tag.classList.contains('catalog-tag--all')) {
                document.querySelectorAll('.catalog-tag:not(.catalog-tag--all)').forEach((t) => {
                    t.classList.remove('catalog-tag--active');
                    t.querySelectorAll('.catalog-tag__remove').forEach((n) => n.remove());
                });
                return;
            }
            tag.classList.toggle('catalog-tag--active');
            if (tag.classList.contains('catalog-tag--active') && !tag.querySelector('.catalog-tag__remove')) {
                const x = document.createElement('span');
                x.className = 'catalog-tag__remove';
                x.setAttribute('aria-label', 'Убрать фильтр');
                x.textContent = '×';
                tag.appendChild(x);
            }
            if (!tag.classList.contains('catalog-tag--active')) {
                tag.querySelectorAll('.catalog-tag__remove').forEach((n) => n.remove());
            }
        });
    });

    const mobileFilter = document.querySelector('.catalog-mobile-filter');
    const mobileBar = document.querySelector('.catalog-mobile-bar');
    const mobileBarChevron = document.querySelector('.catalog-mobile-bar__chevron');
    const mobilePanel = document.querySelector('.catalog-mobile-panel');
    const mobileReset = document.querySelector('.catalog-mobile-reset');
    const setMobilePanelOpen = (open) => {
        if (!mobilePanel) return;
        mobilePanel.hidden = !open;
        mobileBar?.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (mobileBarChevron) mobileBarChevron.textContent = open ? '−' : '+';
        if (mobileReset) mobileReset.hidden = !open;
        mobileFilter?.classList.toggle('is-open', open);
    };
    const toggleMobilePanelFromBar = (e) => {
        if (!mobilePanel || !mobileBar) return;
        if (e.target instanceof Element && e.target.closest('.catalog-mobile-reset')) return;
        setMobilePanelOpen(mobilePanel.hidden);
    };
    if (mobilePanel && mobileBar) {
        mobileBar.addEventListener('click', toggleMobilePanelFromBar);
        mobileBar.addEventListener('keydown', (e) => {
            if (e.target !== mobileBar) return;
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setMobilePanelOpen(mobilePanel.hidden);
            }
        });
    }

    if (mobileReset && mobilePanel) {
        mobileReset.addEventListener('click', (e) => {
            e.stopPropagation();
            mobilePanel.querySelectorAll('input[type="checkbox"]').forEach((cb) => {
                cb.checked = false;
            });
            mobilePanel.querySelectorAll('.catalog-select').forEach((w) => updateMultiTrigger(w));
        });
    }
})();
