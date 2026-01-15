import vue from "../assets/js/vue.build.js?hash=879ea7dbc";
import {formatTime, isEmpty} from "../assets/js/lp.utils.js";
import * as noUiSlider from "../assets/plugins/nouislider/js/nouislider.esm.js";
const {ref, watch, onMounted} = vue;

const nouiSliderComponent = {
    template: `<div class="slider-wrap lp-cursor-pointer" ref="slider"></div>`,
    props: {
        modelValue: {
            type: [Number, String],
            default: 0
        },
        min: {
            type: Number,
            default: 0
        },
        max: {
            type: Number,
            default: 100
        },
        step: {
            type: Number,
            default: 1
        },
        fix: {
            type: Number,
            default: 0
        },
        funcValue: {
            type: Number,
        },
        format: {
            type: String,
            default: ""
        },
        disable: {
            type: Boolean,
            default: false
        },
        index: {
            type: Number,
            default: 0
        }
    },
    setup(props, context) {
        const slider = ref(null);
        let handle = ref(null);
        let hover = false;
        let isSlide = false;
        const showTooltip = () => {
            let tooltip = handle.value.querySelector(".noUi-tooltip")
            tooltip.style.display = 'block';
            hover = true;
        }

        const hideTooltip = () => {
            let tooltip = handle.value.querySelector(".noUi-tooltip")
            tooltip.style.display = 'none';
            hover = false;
        }

        const formatTooltipValue = value => {
            if (isEmpty(props.format)) {
                if (props.fix === 0)
                    value = parseInt(value);
                else
                    value = parseFloat(value).toFixed(props.fix);
            }

            if (props.format === "time")
                value = formatTime(Math.floor(value));

            return value;
        }

        watch(() => props.modelValue, (newValue, oldValue) => {
            if (slider.value && !isSlide) {
                slider.value.noUiSlider.updateOptions({
                    start: newValue,
                    range: {'min': props.min, 'max': props.max},
                });
                if (!hover)
                    hideTooltip();
            }
        });

        watch(() => props.funcValue, (newValue, oldValue) => {
            if (slider.value && !isSlide) {
                slider.value.noUiSlider.updateOptions({
                    start: newValue,
                    range: {'min': props.min, 'max': props.max},
                });
                if (!hover)
                    hideTooltip();
            }
        });

        watch(() => props.max, (newValue, oldValue) => {
            if (slider.value && !isSlide) {
                slider.value.noUiSlider.updateOptions({
                    range: {'min': props.min, 'max': newValue},
                });
                if (!hover)
                    hideTooltip();
            }
        });

        onMounted(async () => {
            noUiSlider.create(slider.value, {
                start: props.modelValue,
                connect: [true, false],
                tooltips: {
                    to: formatTooltipValue,
                },
                range: {'min': props.min, 'max': props.max},
                step: props.step,
            });

            if (props.disable)
                slider.value.noUiSlider.disable();

            handle.value = slider.value.querySelector('.noUi-handle');
            hideTooltip();

            slider.value.addEventListener('mouseenter', () => {
                showTooltip();
            });

            slider.value.addEventListener('mouseleave', () => {
                hideTooltip();
            });

            slider.value.noUiSlider.on('slide', (values, mark) => {
                isSlide = true;
            });

            // slider.value.noUiSlider.on('end', (values, mark) => {
            //     isSlide = false;
            //     context.emit('update:modelValue', formatTooltipValue(values[mark]));
            //     context.emit('slide-end', formatTooltipValue(values[mark]),props.index);
            // });

            slider.value.noUiSlider.on('change', (values, mark) => {
                isSlide = false;
                context.emit('update:modelValue', formatTooltipValue(values[mark]));
                context.emit('slide-end', formatTooltipValue(values[mark]), props.index);
            });
        })

        return {slider}
    }
};

export default nouiSliderComponent;