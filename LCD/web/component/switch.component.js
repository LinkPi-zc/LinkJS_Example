import vue from "../assets/js/vue.build.js";
import $ from "../assets/plugins/jquery/jquery.esm.js";
import '../assets/plugins/switch/js/bootstrap-switch.min.js';

const {ref,toRefs,watch,onMounted} = vue;

const bootstrapSwitchComponent = {
    template: `<input type="checkbox" class="switch form-control" ref="bs_switch">`,
    props: {
        modelValue: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: "small" //normal
        }
    },
    setup(props, context) {

        const {modelValue, size} = toRefs(props);
        const bs_switch = ref(null);

        watch(modelValue, () => {
            $(bs_switch.value).bootstrapSwitch('state', modelValue.value, true);
        })

        onMounted(() => {
            $(bs_switch.value).bootstrapSwitch({
                "state": props.modelValue,
                "size": size.value,
                onInit(dom, event, state) {
                    $(bs_switch.value).on('focus.bootstrapSwitch', () => {
                        this.$wrapper.removeClass("bootstrap-switch-focused")
                    })
                },
                onSwitchChange(event, state) {
                    context.emit('update:modelValue', state);
                    context.emit('switch-change', state);
                }
            })
        })
        return {bs_switch}
    }
};

export default bootstrapSwitchComponent;