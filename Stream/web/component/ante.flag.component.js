import vue from "../assets/js/vue.build.js?hash=879ea7dbc";

const antenanFlagComponent = {
    template: `<div>
                    <div v-if="icon === 'antenan'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-antenna-bars-5" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M6 18l0 -3" />
                          <path d="M10 18l0 -6" />
                          <path d="M14 18l0 -9" />
                          <path d="M18 18l0 -12" />
                        </svg>
                    </div>
                    <div v-if="icon === 'antenan-0'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-antenna-bars-5" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M6 18l0 -3" />
                          <path d="M10 18l0 -6" />
                          <path d="M14 18l0 -9" />
                          <path d="M18 18l0 -12" />
                        </svg>
                    </div>
                    <div v-if="icon === 'antenan-1'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-antenna-bars-5" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M6 18l0 -3" :stroke="color"/>
                          <path d="M10 18l0 -6"/>
                          <path d="M14 18l0 -9"/>
                          <path d="M18 18l0 -12" />
                        </svg>
                    </div>
                    <div v-if="icon === 'antenan-2'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-antenna-bars-5" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M6 18l0 -3" :stroke="color"/>
                          <path d="M10 18l0 -6" :stroke="color"/>
                          <path d="M14 18l0 -9" />
                          <path d="M18 18l0 -12" />
                        </svg>
                    </div>
                    <div v-if="icon === 'antenan-3'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-antenna-bars-5" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M6 18l0 -3" :stroke="color"/>
                          <path d="M10 18l0 -6" :stroke="color"/>
                          <path d="M14 18l0 -9" :stroke="color"/>
                          <path d="M18 18l0 -12" />
                        </svg>
                    </div>
                    <div v-if="icon === 'antenan-4'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-antenna-bars-5" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M6 18l0 -3" :stroke="color"/>
                          <path d="M10 18l0 -6" :stroke="color"/>
                          <path d="M14 18l0 -9" :stroke="color"/>
                          <path d="M18 18l0 -12" :stroke="color"/>
                        </svg>
                    </div>
                    <div v-if="icon === 'antenan-off'">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-antenna-bars-off" :width="width" :height="height" viewBox="0 0 24 24" :stroke-width="strokeWidth" :stroke="stroke" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                          <path d="M6 18v-3" />
                          <path d="M10 18v-6" />
                          <path d="M14 18v-4" />
                          <path d="M14 10v-1" />
                          <path d="M18 14v-8" />
                          <path d="M3 3l18 18" />
                        </svg>
                    </div>  
               </div>`,
    props: {
        icon: {
            type: String,
            default: "antenan"
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

export default antenanFlagComponent;