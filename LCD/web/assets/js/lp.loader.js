
import { queryData,loadStyle,loadCSS } from "./lp.utils.js"

Promise.all([queryData("config/lang.json")]).then(config => {
    const [ languageConf,themeConf ] = config;
    const html = document.querySelector('html');
    html.setAttribute("data-bs-language", languageConf.lang);
    html.setAttribute("data-bs-theme", "dark");// or default
    html.setAttribute("data-bs-theme-active", "default");

    loadCSS(`assets/css/theme-active-default.css`).then(link => {
        document.body.style.display = "block";
        html.dispatchEvent(new Event("loaded"));
    });

});