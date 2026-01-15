import vue from "../assets/js/vue.build.js?hash=879ea7dbc";

const loadingButtonComponent = {
    template: `<button type="button" :class="customClass" @click="onButtonClick">
                    <span v-if="hadLoading" class="spinner-border spinner-border-sm"></span>
                    <span v-else >
                        <slot></slot>
                    </span>
                </button>`,
    props: {
        customClass: {
            type: String,
            default: ""
        },
        hadLoading: {
            type: Boolean,
            default: false
        }
    },
    setup(props, context) {

        const onButtonClick = () => {
            context.emit("button-click", "click")
        }

        return {onButtonClick}
    }
}

export default loadingButtonComponent;