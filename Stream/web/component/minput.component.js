import vue from "../assets/js/vue.build.js?hash=879ea7dbc";
const {ref, toRefs, watchEffect} = vue;

const multipleInputComponent = {
    template: `<input type="text" class="form-control" v-model="selectValue" @change="onInputChange">`,
    props: {
        value1: {
            type: [Number, String],
            default: 0
        },
        value2: {
            type: [Number, String],
            default: 0
        },
        split: {
            type: String,
            default: 0
        }
    },
    setup(props, context) {

        let selectValue = ref("");
        const {value1, value2} = toRefs(props);
        watchEffect(() => {
            const val1 = (typeof value1.value === "string") ? value1.value.trim() : value1.value;
            const val2 = (typeof value2.value === "string") ? value2.value.trim() : value2.value;
            selectValue.value = val1 + props.split + val2;
        })

        const onInputChange = () => {
            let [val1, val2] = selectValue.value.split(props.split);
            val1 = isNaN(Number(val1)) ? val1 : Number(val1);
            val2 = isNaN(Number(val2)) ? val2 : Number(val2);

            if (typeof val1 === "string")
                val1 = val1.trim();
            if (typeof val2 === "string")
                val2 = val2.trim();

            context.emit('update:value1', val1);
            context.emit('update:value2', val2);

            selectValue.value = val1 + props.split + val2;
        }

        return {selectValue, onInputChange}
    }
};

export default multipleInputComponent;