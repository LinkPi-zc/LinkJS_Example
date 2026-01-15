import vue from "../assets/js/vue.build.js?hash=879ea7dbc";
const {ref, watchEffect, onMounted} = vue;

const multipleSelectComponent = {
    template: `<select class="form-select" v-model="selectValue" @change="onSelectChange" ref="selectEle">
                    <slot></slot>
               </select>`,
    props: {
        value1: {
            type: [Number, String, Boolean],
            default: 0
        },
        value2: {
            type: [Number, String, Boolean],
            default: 0
        },
        split: {
            type: String,
            default: 0
        },
        addVal: {
            type: Boolean,
            default: true
        }
    },
    setup(props, context) {

        let selectValue = ref("");
        let selectEle = ref(null);

        watchEffect(() => {
            selectValue.value = props.value1 + props.split + props.value2;
        })

        const parseValue = (value) => {
            if (value === "true" || value === "false") {
                return JSON.parse(value);
            }
            return isNaN(Number(value)) ? value : Number(value);
        };

        const onSelectChange = () => {
            let [value1, value2] = selectValue.value.split(props.split);
            context.emit('update:value1', parseValue(value1));
            context.emit('update:value2', parseValue(value2));
            context.emit('select-change', parseValue(value1), parseValue(value2));
        }

        onMounted(() => {
            selectValue.value = props.value1 + props.split + props.value2;
            if (selectEle.value) {
                let valueExists = false;
                for (let i = 0; i < selectEle.value.options.length; i++) {
                    if (selectValue.value === selectEle.value.options[i].value)
                        valueExists = true;
                }
                if (!valueExists && props.addVal) {
                    const opt = new Option(selectValue.value, selectValue.value);
                    opt.selected = true;
                    selectEle.value.add(opt);
                }
            }
        })

        return {selectValue, onSelectChange, selectEle}
    }
};

export default multipleSelectComponent;