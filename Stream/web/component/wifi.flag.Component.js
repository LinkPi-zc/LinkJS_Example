import vue from "../assets/js/vue.build.js?hash=879ea7dbc";

const wifiFlagComponent = {
    template: `<div>
                    <div v-if="icon === 'wifi'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wifi" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 18l.01 0" />
                            <path d="M9.172 15.172a4 4 0 0 1 5.656 0" />
                            <path d="M6.343 12.343a8 8 0 0 1 11.314 0" />
                            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" />
                        </svg>
                    </div>
                    <div v-if="icon === 'wifi-1'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wifi" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 18l.01 0" :stroke="color"/>
                            <path d="M9.172 15.172a4 4 0 0 1 5.656 0"/>
                            <path d="M6.343 12.343a8 8 0 0 1 11.314 0"/>
                            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" />
                        </svg>
                    </div>
                    <div v-if="icon === 'wifi-2'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wifi" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 18l.01 0" :stroke="color"/>
                            <path d="M9.172 15.172a4 4 0 0 1 5.656 0" :stroke="color"/>
                            <path d="M6.343 12.343a8 8 0 0 1 11.314 0"/>
                            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" />
                        </svg>
                    </div>
                    <div v-if="icon === 'wifi-3'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wifi" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 18l.01 0" :stroke="color"/>
                            <path d="M9.172 15.172a4 4 0 0 1 5.656 0" :stroke="color"/>
                            <path d="M6.343 12.343a8 8 0 0 1 11.314 0" :stroke="color"/>
                            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" />
                        </svg>
                    </div>
                    <div v-if="icon === 'wifi-4'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wifi" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 18l.01 0" :stroke="color"/>
                            <path d="M9.172 15.172a4 4 0 0 1 5.656 0" :stroke="color"/>
                            <path d="M6.343 12.343a8 8 0 0 1 11.314 0" :stroke="color"/>
                            <path d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0" :stroke="color"/>
                        </svg>
                    </div>
                    <div v-if="icon === 'wifi-off'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-wifi-off" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M12 18l.01 0" />
                            <path d="M9.172 15.172a4 4 0 0 1 5.656 0" />
                            <path d="M6.343 12.343a7.963 7.963 0 0 1 3.864 -2.14m4.163 .155a7.965 7.965 0 0 1 3.287 2" />
                            <path d="M3.515 9.515a12 12 0 0 1 3.544 -2.455m3.101 -.92a12 12 0 0 1 10.325 3.374" />
                            <path d="M3 3l18 18" />
                        </svg>
                    </div>  
               </div>`,
    props: {
        icon: {
            type: String,
            default: "wifi"
        },
        width: {
            type: Number,
            default: 20
        },
        height: {
            type: Number,
            default: 20
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
            default: "#cccccc"
        }
    }
}

export default wifiFlagComponent;