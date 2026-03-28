(function () {
    const form = document.querySelector('.order-form');
    const message = document.querySelector('.order-message');
    const submitBtn = document.querySelector('.order-submit');

    if (!form || !message) return;

    const phoneInput = form.querySelector('.order-phone');
    const paymentButtons = form.querySelectorAll('.payment button');
    const requiredInputs = form.querySelectorAll('.required');

    function phoneDigits(value) {
        let d = value.replace(/\D/g, '');
        if (d.startsWith('375')) d = d.slice(3);
        return d.slice(0, 9);
    }

    function isPhoneComplete(value) {
        return phoneDigits(value).length === 9;
    }

    function formatPhone(d) {
        if (!d.length) return '';
        let s = `+375(${d.slice(0, 2)}`;
        if (d.length <= 2) return s;
        s += `) ${d.slice(2, 5)}`;
        if (d.length <= 5) return s;
        s += `-${d.slice(5, 7)}`;
        if (d.length <= 7) return s;
        s += `-${d.slice(7, 9)}`;
        return s;
    }

    if (phoneInput) {
        phoneInput.setAttribute('inputmode', 'numeric');
        phoneInput.setAttribute('autocomplete', 'tel');

        phoneInput.addEventListener('focus', () => {
            if (!phoneInput.value.trim()) {
                phoneInput.value = '+375(';
            }
        });

        phoneInput.addEventListener('blur', () => {
            const v = phoneInput.value.trim();
            if (v === '+375(' || v === '+375') {
                phoneInput.value = '';
            }
        });

        phoneInput.addEventListener('input', () => {
            const d = phoneDigits(phoneInput.value);
            phoneInput.value = formatPhone(d);
            phoneInput.classList.remove('error');
        });
    }

    paymentButtons.forEach((btn) => {
        btn.type = 'button';
        btn.addEventListener('click', () => {
            paymentButtons.forEach((b) => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    requiredInputs.forEach((inp) => {
        if (inp === phoneInput) return;
        inp.addEventListener('input', () => inp.classList.remove('error'));
    });

    function validate() {
        let ok = true;
        requiredInputs.forEach((inp) => {
            let valid;
            if (inp === phoneInput) {
                valid = isPhoneComplete(inp.value);
            } else {
                valid = inp.value.trim().length > 0;
            }
            inp.classList.toggle('error', !valid);
            if (!valid) ok = false;
        });
        return ok;
    }

    function openMessage() {
        message.classList.add('open');
    }

    function closeMessage() {
        message.classList.remove('open');
    }

    if (submitBtn) {
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (!validate()) return;
            openMessage();
        });
    }

    message.querySelector('.close-icon')?.addEventListener('click', closeMessage);
    message.querySelector('.message-content button')?.addEventListener('click', closeMessage);
})();
