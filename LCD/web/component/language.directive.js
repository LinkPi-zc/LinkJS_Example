import mutationObserver from "../assets/plugins/polyfill/mutationobserver.esm.js";

const languageOptionDirective = {
    mounted(el, binding, vnode) {
        const update = () => {
            const lang = html.getAttribute('data-bs-language');
            el.textContent = el.getAttribute(lang);
        }

        const html = document.querySelector('html');
        update();
        const observer = new mutationObserver(() => {
            update();
        });
        const config = {
            attributes: true,
            attributeFilter: ["data-bs-language"],
            subtree: false
        };
        observer.observe(html, config);
    }
};

export default languageOptionDirective;