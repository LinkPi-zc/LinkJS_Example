import vue from "./vue.build.js";
import mutationObserver from "../plugins/polyfill/mutationobserver.esm.js";
const { ref,onMounted } = vue;

export const langFlagComponent = {
    template: `<div>
                    <svg xmlns="http://www.w3.org/2000/svg" :width="width" :height="height" viewBox="0 0 24 24" fill="none" :stroke="stroke" :stroke-width="strokeWidth" stroke-linecap="round" stroke-linejoin="round" :style="style">
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" :fill="color"/>
                      <path d="M3.6 9h16.8" :fill="color"/>
                      <path d="M3.6 15h16.8" :fill="color"/>
                      <path d="M11.5 3a17 17 0 0 0 0 18" :fill="color"/>
                      <path d="M12.5 3a17 17 0 0 1 0 18" :fill="color"/>
                    </svg>
               </div>`,
    props: {
        width: {
            type: Number,
            default: 26
        },
        height: {
            type: Number,
            default: 26
        },
        stroke: {
            type: String,
            default: "#2c3e50"
        },
        strokeWidth: {
            type: Number,
            default: 2
        },
        color: {
            type: String,
            default: ""
        },
        style: {
            type: String,
            default: ""
        }
    },
    setup(props,context) {
        const defTheme = ref("");
        onMounted(()=>{
            const update = () => {
                const theme = html.getAttribute('data-bs-theme');
                defTheme.value = theme;
            }
            const html = document.querySelector('html');
            update();
            const observer = new mutationObserver(() => {
                update();
            });
            const config = {
                attributes: true,
                attributeFilter: ["data-bs-theme"],
                subtree: false
            };
            observer.observe(html, config);
        })

        return { defTheme }
    }
}

