import vue from "../assets/js/vue.build.js?hash=879ea7dbc";
import {langFlagComponent} from "../assets/js/vue.flags.js";
import mutationObserver from "../assets/plugins/polyfill/mutationobserver.esm.js";
import {updateSysLanguage} from "../assets/js/lp.utils.js";
const {ref, onMounted} = vue;

const langOptionComponent = {
    template: `<a class="nav-link" data-bs-toggle="dropdown">
                    <lang-flag :width="27" :height="26" :stroke="themeTxtColor" :strokeWidth="1.8" :style="'margin-top:-7px;margin-left:0px'"></lang-flag>
               </a>
               <div class="dropdown">
                   <ul class="dropdown-menu dropdown-menu-end">
                       <li>
                           <a class="dropdown-item" href="javascript:;" @click="updateSysLanguage('cn')">
                               <span class="material-symbols-outlined me-2">
                                   <i class="fa-solid fa-earth-asia me-2"></i>
                                   <cn>简体中文</cn>
                                   <en>简体中文</en>
                               </span>
                           </a>
                       </li>
                       <li><hr></li>
                       <li>
                           <a class="dropdown-item" href="javascript:;" @click="updateSysLanguage('en')">
                               <span class="material-symbols-outlined me-2">
                                   <i class="fa-solid fa-earth-americas me-2"></i>
                                   <cn>English</cn>
                                   <en>English</en>
                               </span>
                           </a>
                       </li>
                   </ul>
               </div>`,
    components: {
        "lang-flag": langFlagComponent
    },
    setup(props, context) {

        const themeTxtColor = ref("");
        const onListenThemeChange = () => {
            const html = document.querySelector('html');
            const observer = new mutationObserver(mutations => {
                mutations.forEach(mutation => {
                    if (mutation.type === 'attributes') {
                        if (mutation.attributeName === "data-bs-theme") {
                            const theme = mutation.target.getAttribute("data-bs-theme");
                            if (theme === "default")
                                themeTxtColor.value = "#000000";
                            if (theme === "dark")
                                themeTxtColor.value = '#adb5bd';
                        }
                    }
                });
            });
            const config = {
                attributes: true,
                attributeFilter: ["data-bs-theme"],
                subtree: false
            };
            observer.observe(html, config);
        }

        onMounted(() => {
            const html = document.querySelector('html');
            const theme = html.getAttribute("data-bs-theme");
            if (theme === "default")
                themeTxtColor.value = "#000000";
            if (theme === "dark")
                themeTxtColor.value = '#adb5bd';
            onListenThemeChange();
        })
        return {themeTxtColor, updateSysLanguage}
    }
}

export default langOptionComponent;