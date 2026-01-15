/**
 * Bundled by jsDelivr using Rollup v2.79.1 and Terser v5.19.2.
 * Original file: /npm/@ckpack/vue-color@1.5.0/libs/index.js
 *
 * Do NOT use SRI with dynamically generated files! More information: https://www.jsdelivr.com/using-sri-with-dynamic-files
 */
import vue from "../../js/vue.build.js";
const {
    openBlock : e,
    createElementBlock : t,
    normalizeStyle : a,
    resolveComponent : o,
    createElementVNode : l,
    createVNode : i,
    withDirectives : r,
    vModelText : s,
    toDisplayString : n,
    normalizeClass : c,
    createBlock : h,
    createCommentVNode : p,
    vShow : d,
    Fragment : u,
    renderList : v,
    withCtx : g,
    withKeys : b
} = vue;
import {TinyColor as x} from "./tiny.color.esm.js";
import f from "./material.colors.esm.js";

const m = "", w = "medium";

function C(e = {}) {
    return t => {
        const {components: a, componentPrefix: o = m, componentSize: l = w} = e;
        t.config.globalProperties.$VUI = {size: l, prefix: o}, (Array.isArray(a) ? a : Object.values(a)).forEach((e => {
            t.component(`${o}${e.name}`, e)
        }))
    }
}

function k(e, t) {
    void 0 === t && (t = {});
    var a = t.insertAt;
    if (e && "undefined" != typeof document) {
        var o = document.head || document.getElementsByTagName("head")[0], l = document.createElement("style");
        l.type = "text/css", "top" === a && o.firstChild ? o.insertBefore(l, o.firstChild) : o.appendChild(l), l.styleSheet ? l.styleSheet.cssText = e : l.appendChild(document.createTextNode(e))
    }
}

const y = function (e, t) {
    const {componentPrefix: a = m} = t || {};
    e.component(`${a}${this.name}`, this)
}, _ = {};
var F = {
    name: "Checkboard",
    props: {
        size: {type: [Number, String], default: 8},
        white: {type: String, default: "#fff"},
        grey: {type: String, default: "#e6e6e6"}
    },
    computed: {
        bgStyle() {
            return {"background-image": `url(${L(this.white, this.grey, this.size)})`}
        }
    }
};

function L(e, t, a) {
    const o = `${e},${t},${a}`;
    if (_[o]) return _[o];
    const l = function (e, t, a) {
        if ("undefined" == typeof document) return null;
        const o = document.createElement("canvas");
        o.width = o.height = 2 * a;
        const l = o.getContext("2d");
        return l ? (l.fillStyle = e, l.fillRect(0, 0, o.width, o.height), l.fillStyle = t, l.fillRect(0, 0, a, a), l.translate(a, a), l.fillRect(0, 0, a, a), o.toDataURL()) : null
    }(e, t, a);
    return _[o] = l, l
}

k(".vc-checkerboard{background-size:contain;bottom:0;left:0;position:absolute;right:0;top:0}"), F.render = function (o, l, i, r, s, n) {
    return e(), t("div", {class: "vc-checkerboard", style: a(n.bgStyle)}, null, 4)
}, F.__file = "src/components/checkboard/checkboard.vue", F.install = y;
var E = {
    name: "Alpha", components: {Checkboard: F}, props: {value: Object, onChange: Function}, computed: {
        colors() {
            return this.value
        }, gradientColor() {
            const {rgba: e} = this.colors, t = [e.r, e.g, e.b].join(",");
            return `linear-gradient(to right, rgba(${t}, 0) 0%, rgba(${t}, 1) 100%)`
        }
    }, methods: {
        handleChange(e, t) {
            !t && e.preventDefault();
            const {container: a} = this.$refs;
            if (!a) return;
            const o = a.clientWidth, l = a.getBoundingClientRect().left + window.pageXOffset,
                i = (e.pageX || (e.touches ? e.touches[0].pageX : 0)) - l;
            let r;
            r = i < 0 ? 0 : i > o ? 1 : Math.round(100 * i / o) / 100, this.colors.a !== r && this.$emit("change", {
                h: this.colors.hsl.h,
                s: this.colors.hsl.s,
                l: this.colors.hsl.l,
                a: r,
                source: "rgba"
            })
        }, handleMouseDown(e) {
            this.handleChange(e, !0), window.addEventListener("mousemove", this.handleChange), window.addEventListener("mouseup", this.handleMouseUp)
        }, handleMouseUp() {
            this.unbindEventListeners()
        }, unbindEventListeners() {
            window.removeEventListener("mousemove", this.handleChange), window.removeEventListener("mouseup", this.handleMouseUp)
        }
    }
};
const A = {class: "vc-alpha"}, D = {class: "vc-alpha-checkboard-wrap"},
    S = [l("div", {class: "vc-alpha-picker"}, null, -1)];

function B(...e) {
    return new x(...e)
}

function $(e, t) {
    const a = e && e.a;
    let o;
    o = e && e.hsl ? B(e.hsl) : e && e.hex && e.hex.length > 0 ? B(e.hex) : e && e.hsv ? B(e.hsv) : e && e.rgba ? B(e.rgba) : e && e.rgb ? B(e.rgb) : B(e), !o || void 0 !== o._a && null !== o._a || o.setAlpha(a || o.getAlpha());
    const l = o.toHsl(), i = o.toHsv();
    return 0 === l.s && (i.h = l.h = e.h || e.hsl && e.hsl.h || t || 0), i.v < .0164 && (i.h = e.h || e.hsv && e.hsv.h || 0, i.s = e.s || e.hsv && e.hsv.s || 0), l.l < .01 && (l.h = e.h || e.hsl && e.hsl.h || 0, l.s = e.s || e.hsl && e.hsl.s || 0), {
        hsl: l,
        hex: o.toHexString().toUpperCase(),
        hex8: o.toHex8String().toUpperCase(),
        rgba: o.toRgb(),
        hsv: i,
        oldHue: e.h || t || l.h,
        source: e.source,
        a: o.getAlpha()
    }
}

k(".vc-alpha,.vc-alpha-checkboard-wrap{bottom:0;left:0;position:absolute;right:0;top:0}.vc-alpha-checkboard-wrap{overflow:hidden}.vc-alpha-gradient{bottom:0;left:0;position:absolute;right:0;top:0}.vc-alpha-container{cursor:pointer;height:100%;margin:0 3px;position:relative;z-index:2}.vc-alpha-pointer{position:absolute;z-index:2}.vc-alpha-picker{background:#fff;border-radius:1px;box-shadow:0 0 2px rgba(0,0,0,.6);cursor:pointer;height:8px;margin-top:1px;transform:translateX(-2px);width:4px}"), E.render = function (r, s, n, c, h, p) {
    const d = o("Checkboard");
    return e(), t("div", A, [l("div", D, [i(d)]), l("div", {
        class: "vc-alpha-gradient",
        style: a({background: p.gradientColor})
    }, null, 4), l("div", {
        ref: "container",
        class: "vc-alpha-container",
        onMousedown: s[0] || (s[0] = (...e) => p.handleMouseDown && p.handleMouseDown(...e)),
        onTouchmove: s[1] || (s[1] = (...e) => p.handleChange && p.handleChange(...e)),
        onTouchstart: s[2] || (s[2] = (...e) => p.handleChange && p.handleChange(...e))
    }, [l("div", {class: "vc-alpha-pointer", style: a({left: 100 * p.colors.a + "%"})}, S, 4)], 544)])
}, E.__file = "src/components/alpha/alpha.vue", E.install = y;
var z = {
    model: {prop: "modelValue", event: "update:modelValue"}, props: ["modelValue"], data() {
        return {val: $(this.modelValue)}
    }, computed: {
        colors: {
            get() {
                return this.val
            }, set(e) {
                this.val = e, this.$emit("update:modelValue", e)
            }
        }
    }, watch: {
        modelValue(e) {
            this.val = $(e)
        }
    }, methods: {
        colorChange(e, t) {
            this.oldHue = this.colors.hsl.h, this.colors = $(e, t || this.oldHue)
        }, isValidHex: e => B(e).isValid, simpleCheckForValidColor(e) {
            const t = ["r", "g", "b", "a", "h", "s", "l", "v"];
            let a = 0, o = 0;
            for (let l = 0; l < t.length; l++) {
                const i = t[l];
                e[i] && (a++, isNaN(e[i]) || o++)
            }
            if (a === o) return e
        }, paletteUpperCase: e => e.map((e => e.toUpperCase())), isTransparent: e => 0 === B(e).getAlpha()
    }
}, H = {
    name: "EditableInput",
    props: {
        label: String,
        labelText: String,
        desc: String,
        value: [String, Number],
        max: Number,
        min: Number,
        arrowOffset: {type: Number, default: 1}
    },
    computed: {
        val: {
            get() {
                return this.value
            }, set(e) {
                if (!(void 0 !== this.max && +e > this.max)) return e;
                this.$refs.input.value = this.max
            }
        }, labelId() {
            return `input__label__${this.label}__${Math.random().toString().slice(2, 5)}`
        }, labelSpanText() {
            return this.labelText || this.label
        }
    },
    methods: {
        update(e) {
            this.handleChange(e.target.value)
        }, handleChange(e) {
            const t = {};
            t[this.label] = e, (void 0 === t.hex && void 0 === t["#"] || e.length > 5) && this.$emit("change", t)
        }, handleKeyDown(e) {
            let {val: t} = this;
            const a = Number(t);
            if (a) {
                const o = this.arrowOffset || 1;
                38 === e.keyCode && (t = a + o, this.handleChange(t), e.preventDefault()), 40 === e.keyCode && (t = a - o, this.handleChange(t), e.preventDefault())
            }
        }
    }
};
const M = {class: "vc-editable-input"}, I = ["aria-labelledby"], T = ["id", "for"], U = {class: "vc-input__desc"};

function V(e, t, a) {
    return t < a ? e < t ? t : e > a ? a : e : e < a ? a : e > t ? t : e
}

k(".vc-editable-input{position:relative}.vc-input__input{border:0;outline:none;padding:0}.vc-input__label{text-transform:capitalize}"), H.render = function (a, o, i, c, h, p) {
    return e(), t("div", M, [r(l("input", {
        ref: "input",
        "onUpdate:modelValue": o[0] || (o[0] = e => p.val = e),
        "aria-labelledby": p.labelId,
        class: "vc-input__input",
        onKeydown: o[1] || (o[1] = (...e) => p.handleKeyDown && p.handleKeyDown(...e)),
        onInput: o[2] || (o[2] = (...e) => p.update && p.update(...e))
    }, null, 40, I), [[s, p.val]]), l("span", {
        id: p.labelId,
        for: i.label,
        class: "vc-input__label"
    }, n(p.labelSpanText), 9, T), l("span", U, n(i.desc), 1)])
}, H.__file = "src/components/editable-input/editable-input.vue", H.install = y;
var R = {
    name: "Saturation", props: {value: Object}, computed: {
        colors() {
            return this.value
        }, bgColor() {
            return `hsl(${this.colors.hsv.h}, 100%, 50%)`
        }, pointerTop() {
            return -100 * this.colors.hsv.v + 1 + 100 + "%"
        }, pointerLeft() {
            return 100 * this.colors.hsv.s + "%"
        }
    }, methods: {
        handleChange(e, t) {
            !t && e.preventDefault();
            const {container: a} = this.$refs;
            if (!a) return;
            const o = a.clientWidth, l = a.clientHeight, i = a.getBoundingClientRect().left + window.pageXOffset,
                r = a.getBoundingClientRect().top + window.pageYOffset,
                s = e.pageX || (e.touches ? e.touches[0].pageX : 0),
                n = e.pageY || (e.touches ? e.touches[0].pageY : 0), c = V(s - i, 0, o), h = V(n - r, 0, l), p = c / o,
                d = V(-h / l + 1, 0, 1);
            this.onChange({h: this.colors.hsv.h, s: p, v: d, a: this.colors.hsv.a, source: "hsva"})
        }, onChange(e) {
            this.$emit("change", e)
        }, handleMouseDown(e) {
            window.addEventListener("mousemove", this.handleChange), window.addEventListener("mouseup", this.handleChange), window.addEventListener("mouseup", this.handleMouseUp)
        }, handleMouseUp(e) {
            this.unbindEventListeners()
        }, unbindEventListeners() {
            window.removeEventListener("mousemove", this.handleChange), window.removeEventListener("mouseup", this.handleChange), window.removeEventListener("mouseup", this.handleMouseUp)
        }
    }
};
const O = l("div", {class: "vc-saturation--white"}, null, -1), N = l("div", {class: "vc-saturation--black"}, null, -1),
    P = [l("div", {class: "vc-saturation-circle"}, null, -1)];
k(".vc-saturation,.vc-saturation--black,.vc-saturation--white{bottom:0;cursor:pointer;left:0;position:absolute;right:0;top:0}.vc-saturation--white{background:linear-gradient(90deg,#fff,hsla(0,0%,100%,0))}.vc-saturation--black{background:linear-gradient(0deg,#000,transparent)}.vc-saturation-pointer{cursor:pointer;position:absolute}.vc-saturation-circle{border-radius:50%;box-shadow:0 0 0 1.5px #fff,inset 0 0 1px 1px rgba(0,0,0,.3),0 0 1px 2px rgba(0,0,0,.4);cursor:head;height:4px;transform:translate(-2px,-2px);width:4px}"), R.render = function (o, i, r, s, n, c) {
    return e(), t("div", {
        ref: "container",
        class: "vc-saturation",
        style: a({background: c.bgColor}),
        onMousedown: i[0] || (i[0] = (...e) => c.handleMouseDown && c.handleMouseDown(...e)),
        onTouchmove: i[1] || (i[1] = (...e) => c.handleChange && c.handleChange(...e)),
        onTouchstart: i[2] || (i[2] = (...e) => c.handleChange && c.handleChange(...e))
    }, [O, N, l("div", {class: "vc-saturation-pointer", style: a({top: c.pointerTop, left: c.pointerLeft})}, P, 4)], 36)
}, R.__file = "src/components/saturation/saturation.vue", R.install = y;
var X = {
    name: "Hue",
    props: {value: Object, direction: {type: String, default: "horizontal"}},
    data: () => ({oldHue: 0, pullDirection: ""}),
    computed: {
        colors() {
            return this.value
        }, directionClass() {
            return {
                "vc-hue--horizontal": "horizontal" === this.direction,
                "vc-hue--vertical": "vertical" === this.direction
            }
        }, pointerTop() {
            return "vertical" === this.direction ? 0 === this.colors.hsl.h && "right" === this.pullDirection ? 0 : -100 * this.colors.hsl.h / 360 + 100 + "%" : 0
        }, pointerLeft() {
            return "vertical" === this.direction ? 0 : 0 === this.colors.hsl.h && "right" === this.pullDirection ? "100%" : 100 * this.colors.hsl.h / 360 + "%"
        }
    },
    watch: {
        value: {
            handler(e, t) {
                const {h: a} = e.hsl;
                0 !== a && a - this.oldHue > 0 && (this.pullDirection = "right"), 0 !== a && a - this.oldHue < 0 && (this.pullDirection = "left"), this.oldHue = a
            }, deep: !0, immediate: !0
        }
    },
    methods: {
        handleChange(e, t) {
            !t && e.preventDefault();
            const {container: a} = this.$refs;
            if (!a) return;
            const o = a.clientWidth, l = a.clientHeight, i = a.getBoundingClientRect().left + window.pageXOffset,
                r = a.getBoundingClientRect().top + window.pageYOffset,
                s = (e.pageX || (e.touches ? e.touches[0].pageX : 0)) - i,
                n = (e.pageY || (e.touches ? e.touches[0].pageY : 0)) - r;
            let c, h;
            "vertical" === this.direction ? (n < 0 ? c = 360 : n > l ? c = 0 : (h = -100 * n / l + 100, c = 360 * h / 100), this.colors.hsl.h !== c && this.$emit("change", {
                h: c,
                s: this.colors.hsl.s,
                l: this.colors.hsl.l,
                a: this.colors.hsl.a,
                source: "hsl"
            })) : (s < 0 ? c = 0 : s > o ? c = 360 : (h = 100 * s / o, c = 360 * h / 100), this.colors.hsl.h !== c && this.$emit("change", {
                h: c,
                s: this.colors.hsl.s,
                l: this.colors.hsl.l,
                a: this.colors.hsl.a,
                source: "hsl"
            }))
        }, handleMouseDown(e) {
            this.handleChange(e, !0), window.addEventListener("mousemove", this.handleChange), window.addEventListener("mouseup", this.handleChange), window.addEventListener("mouseup", this.handleMouseUp)
        }, handleMouseUp(e) {
            this.unbindEventListeners()
        }, unbindEventListeners() {
            window.removeEventListener("mousemove", this.handleChange), window.removeEventListener("mouseup", this.handleChange), window.removeEventListener("mouseup", this.handleMouseUp)
        }
    }
};
const j = ["aria-valuenow"], K = [l("div", {class: "vc-hue-picker"}, null, -1)];
k(".vc-hue{border-radius:2px;bottom:0;left:0;position:absolute;right:0;top:0}.vc-hue--horizontal{background:linear-gradient(90deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.vc-hue--vertical{background:linear-gradient(0deg,red 0,#ff0 17%,#0f0 33%,#0ff 50%,#00f 67%,#f0f 83%,red)}.vc-hue-container{cursor:pointer;height:100%;margin:0 2px;position:relative}.vc-hue-pointer{position:absolute;z-index:2}.vc-hue-picker{background:#fff;border-radius:1px;box-shadow:0 0 2px rgba(0,0,0,.6);cursor:pointer;height:8px;margin-top:1px;transform:translateX(-2px);width:4px}"), X.render = function (o, i, r, s, n, h) {
    return e(), t("div", {class: c(["vc-hue", [h.directionClass]])}, [l("div", {
        ref: "container",
        class: "vc-hue-container",
        role: "slider",
        "aria-valuenow": h.colors.hsl.h,
        "aria-valuemin": "0",
        "aria-valuemax": "360",
        onMousedown: i[0] || (i[0] = (...e) => h.handleMouseDown && h.handleMouseDown(...e)),
        onTouchmove: i[1] || (i[1] = (...e) => h.handleChange && h.handleChange(...e)),
        onTouchstart: i[2] || (i[2] = (...e) => h.handleChange && h.handleChange(...e))
    }, [l("div", {
        class: "vc-hue-pointer",
        style: a({top: h.pointerTop, left: h.pointerLeft}),
        role: "presentation"
    }, K, 4)], 40, j)], 2)
}, X.__file = "src/components/hue/hue.vue", X.install = y;
var Y = {
    name: "Chrome",
    components: {Saturation: R, Hue: X, Alpha: E, EdIn: H, Checkboard: F},
    mixins: [z],
    props: {
        disableAlpha: {type: Boolean, default: !1},
        disableFields: {type: Boolean, default: !1},
        format: {type: String, default: "hex"}
    },
    data: () => ({fieldsIndex: "hex", highlight: !1}),
    computed: {
        hsl() {
            const {h: e, s: t, l: a} = this.colors.hsl;
            return {h: e.toFixed(), s: `${(100 * t).toFixed()}%`, l: `${(100 * a).toFixed()}%`}
        }, activeColor() {
            const {rgba: e} = this.colors;
            return `rgba(${[e.r, e.g, e.b, e.a].join(",")})`
        }, hasAlpha() {
            return this.colors.a < 1
        }
    },
    watch: {
        format: {
            handler(e) {
                this.fieldsIndex = e
            }, immediate: !0
        }
    },
    methods: {
        childChange(e) {
            this.colorChange(e)
        }, inputChange(e) {
            if (e) if (e.hex) this.isValidHex(e.hex) && this.colorChange({
                hex: e.hex,
                source: "hex"
            }); else if (e.r || e.g || e.b || e.a) this.colorChange({
                r: e.r || this.colors.rgba.r,
                g: e.g || this.colors.rgba.g,
                b: e.b || this.colors.rgba.b,
                a: e.a || this.colors.rgba.a,
                source: "rgba"
            }); else if (e.h || e.s || e.l) {
                const t = e.s ? e.s.replace("%", "") / 100 : this.colors.hsl.s,
                    a = e.l ? e.l.replace("%", "") / 100 : this.colors.hsl.l;
                this.colorChange({h: e.h || this.colors.hsl.h, s: t, l: a, source: "hsl"})
            }
        }, toggleViews() {
            switch (this.fieldsIndex) {
                case"hex":
                    this.fieldsIndex = "rgb" + (this.disableAlpha ? "" : "a");
                    break;
                case"rgb":
                case"rgba":
                    this.fieldsIndex = "hsl" + (this.disableAlpha ? "" : "a");
                    break;
                default:
                    this.fieldsIndex = "hex"
            }
            this.$emit("update:format", this.fieldsIndex)
        }, showHighlight() {
            this.highlight = !0
        }, hideHighlight() {
            this.highlight = !1
        }
    }
};
const q = {class: "vc-chrome-saturation-wrap"}, G = {class: "vc-chrome-body"}, W = {class: "vc-chrome-controls"},
    Z = {class: "vc-chrome-color-wrap"}, J = ["aria-label"], Q = {class: "vc-chrome-sliders"},
    ee = {class: "vc-chrome-hue-wrap"}, te = {key: 0, class: "vc-chrome-alpha-wrap"},
    ae = {key: 0, class: "vc-chrome-fields-wrap"}, oe = {class: "vc-chrome-fields"}, le = {class: "vc-chrome-field"},
    ie = {class: "vc-chrome-fields"}, re = {class: "vc-chrome-field"}, se = {class: "vc-chrome-field"},
    ne = {class: "vc-chrome-field"}, ce = {key: 0, class: "vc-chrome-field"}, he = {class: "vc-chrome-fields"},
    pe = {class: "vc-chrome-field"}, de = {class: "vc-chrome-field"}, ue = {class: "vc-chrome-field"},
    ve = {key: 0, class: "vc-chrome-field"}, ge = {class: "vc-chrome-toggle-icon"}, be = [l("path", {
        fill: "#333",
        d: "M12,18.17L8.83,15L7.42,16.41L12,21L16.59,16.41L15.17,15M12,5.83L15.17,9L16.58,7.59L12,3L7.41,7.59L8.83,9L12,5.83Z"
    }, null, -1)], xe = {class: "vc-chrome-toggle-icon-highlight"};
k(".vc-chrome{background:#fff;background-color:#fff;border-radius:2px;box-shadow:0 0 2px rgba(0,0,0,.3),0 4px 8px rgba(0,0,0,.3);box-sizing:initial;font-family:Menlo;width:225px}.vc-chrome-controls{display:flex}.vc-chrome-color-wrap{position:relative;width:36px}.vc-chrome-active-color{border-radius:15px;height:30px;overflow:hidden;position:relative;width:30px;z-index:1}.vc-chrome-color-wrap .vc-checkerboard{background-size:auto;border-radius:15px;height:30px;width:30px}.vc-chrome-sliders{flex:1}.vc-chrome-fields-wrap{display:flex;padding-top:16px}.vc-chrome-fields{display:flex;flex:1;margin-left:-6px}.vc-chrome-field{padding-left:6px;width:100%}.vc-chrome-toggle-btn{position:relative;text-align:right;width:32px}.vc-chrome-toggle-icon{cursor:pointer;margin-right:-4px;margin-top:12px;position:relative;z-index:2}.vc-chrome-toggle-icon-highlight{background:#eee;border-radius:4px;height:28px;left:12px;position:absolute;top:10px;width:24px}.vc-chrome-hue-wrap{margin-bottom:8px}.vc-chrome-alpha-wrap,.vc-chrome-hue-wrap{height:10px;position:relative}.vc-chrome-alpha-wrap .vc-alpha-gradient,.vc-chrome-hue-wrap .vc-hue{border-radius:2px}.vc-chrome-alpha-wrap .vc-alpha-picker,.vc-chrome-hue-wrap .vc-hue-picker{background-color:#f8f8f8;border-radius:6px;box-shadow:0 1px 4px 0 rgba(0,0,0,.37);height:12px;transform:translate(-6px,-2px);width:12px}.vc-chrome-body{background-color:#fff;padding:16px 16px 12px}.vc-chrome-saturation-wrap{border-radius:2px 2px 0 0;overflow:hidden;padding-bottom:55%;position:relative;width:100%}.vc-chrome-saturation-wrap .vc-saturation-circle{height:12px;width:12px}.vc-chrome-fields .vc-input__input{border:none;border-radius:2px;box-shadow:inset 0 0 0 1px #dadada;color:#333;font-size:11px;height:21px;text-align:center;width:100%}.vc-chrome-fields .vc-input__label{color:#969696;display:block;font-size:11px;line-height:11px;margin-top:12px;text-align:center;text-transform:uppercase}.vc-chrome__disable-alpha .vc-chrome-active-color{height:18px;width:18px}.vc-chrome__disable-alpha .vc-chrome-color-wrap{width:30px}.vc-chrome__disable-alpha .vc-chrome-hue-wrap{margin-bottom:4px;margin-top:4px}"), Y.render = function (s, n, u, v, g, b) {
    const x = o("Saturation"), f = o("Checkboard"), m = o("Hue"), w = o("Alpha"), C = o("EdIn");
    return e(), t("div", {
        role: "application",
        "aria-label": "Chrome color picker",
        class: c(["vc-chrome", [u.disableAlpha ? "vc-chrome__disable-alpha" : ""]])
    }, [l("div", q, [i(x, {
        value: s.colors,
        onChange: b.childChange
    }, null, 8, ["value", "onChange"])]), l("div", G, [l("div", W, [l("div", Z, [l("div", {
        "aria-label": `current color is ${s.colors.hex}`,
        class: "vc-chrome-active-color",
        style: a({background: b.activeColor})
    }, null, 12, J), u.disableAlpha ? p("v-if", !0) : (e(), h(f, {key: 0}))]), l("div", Q, [l("div", ee, [i(m, {
        value: s.colors,
        onChange: b.childChange
    }, null, 8, ["value", "onChange"])]), u.disableAlpha ? p("v-if", !0) : (e(), t("div", te, [i(w, {
        value: s.colors,
        onChange: b.childChange
    }, null, 8, ["value", "onChange"])]))])]), u.disableFields ? p("v-if", !0) : (e(), t("div", ae, [r(l("div", oe, [p(" hex "), l("div", le, [b.hasAlpha ? p("v-if", !0) : (e(), h(C, {
        key: 0,
        label: "hex",
        value: s.colors.hex,
        onChange: b.inputChange
    }, null, 8, ["value", "onChange"])), b.hasAlpha ? (e(), h(C, {
        key: 1,
        label: "hex",
        value: s.colors.hex8,
        onChange: b.inputChange
    }, null, 8, ["value", "onChange"])) : p("v-if", !0)])], 512), [[d, "hex" === g.fieldsIndex]]), r(l("div", ie, [p(" rgba "), l("div", re, [i(C, {
        label: "r",
        value: s.colors.rgba.r,
        onChange: b.inputChange
    }, null, 8, ["value", "onChange"])]), l("div", se, [i(C, {
        label: "g",
        value: s.colors.rgba.g,
        onChange: b.inputChange
    }, null, 8, ["value", "onChange"])]), l("div", ne, [i(C, {
        label: "b",
        value: s.colors.rgba.b,
        onChange: b.inputChange
    }, null, 8, ["value", "onChange"])]), u.disableAlpha ? p("v-if", !0) : (e(), t("div", ce, [i(C, {
        label: "a",
        value: s.colors.a,
        "arrow-offset": .01,
        max: 1,
        onChange: b.inputChange
    }, null, 8, ["value", "arrow-offset", "onChange"])]))], 512), [[d, ["rgb", "rgba"].includes(g.fieldsIndex)]]), r(l("div", he, [p(" hsla "), l("div", pe, [i(C, {
        label: "h",
        value: b.hsl.h,
        onChange: b.inputChange
    }, null, 8, ["value", "onChange"])]), l("div", de, [i(C, {
        label: "s",
        value: b.hsl.s,
        onChange: b.inputChange
    }, null, 8, ["value", "onChange"])]), l("div", ue, [i(C, {
        label: "l",
        value: b.hsl.l,
        onChange: b.inputChange
    }, null, 8, ["value", "onChange"])]), u.disableAlpha ? p("v-if", !0) : (e(), t("div", ve, [i(C, {
        label: "a",
        value: s.colors.a,
        "arrow-offset": .01,
        max: 1,
        onChange: b.inputChange
    }, null, 8, ["value", "arrow-offset", "onChange"])]))], 512), [[d, ["hsl", "hsla"].includes(g.fieldsIndex)]]), p(" btn "), l("div", {
        class: "vc-chrome-toggle-btn",
        role: "button",
        "aria-label": "Change another color definition",
        onClick: n[3] || (n[3] = (...e) => b.toggleViews && b.toggleViews(...e))
    }, [l("div", ge, [(e(), t("svg", {
        style: {width: "24px", height: "24px"},
        viewBox: "0 0 24 24",
        onMouseover: n[0] || (n[0] = (...e) => b.showHighlight && b.showHighlight(...e)),
        onMouseenter: n[1] || (n[1] = (...e) => b.showHighlight && b.showHighlight(...e)),
        onMouseout: n[2] || (n[2] = (...e) => b.hideHighlight && b.hideHighlight(...e))
    }, be, 32))]), r(l("div", xe, null, 512), [[d, g.highlight]])]), p(" btn ")]))])], 2)
}, Y.__file = "src/components/chrome/chrome.vue", Y.install = y;
const fe = ["#4D4D4D", "#999999", "#FFFFFF", "#F44E3B", "#FE9200", "#FCDC00", "#DBDF00", "#A4DD00", "#68CCCA", "#73D8FF", "#AEA1FF", "#FDA1FF", "#333333", "#808080", "#CCCCCC", "#D33115", "#E27300", "#FCC400", "#B0BC00", "#68BC00", "#16A5A5", "#009CE0", "#7B64FF", "#FA28FF", "#000000", "#666666", "#B3B3B3", "#9F0500", "#C45100", "#FB9E00", "#808900", "#194D33", "#0C797D", "#0062B1", "#653294", "#AB149E"];
var me = {
    name: "Compact", mixins: [z], props: {palette: {type: Array, default: () => fe}}, computed: {
        pick() {
            return this.colors.hex.toUpperCase()
        }
    }, methods: {
        handlerClick(e) {
            this.colorChange({hex: e, source: "hex"})
        }
    }
};
const we = {role: "application", "aria-label": "Compact color picker", class: "vc-compact"},
    Ce = {class: "vc-compact-colors", role: "listbox"}, ke = ["aria-label", "aria-selected", "onClick"],
    ye = {class: "vc-compact-dot"};
k(".vc-compact{background-color:#fff;border-radius:2px;box-shadow:0 2px 10px rgba(0,0,0,.12),0 2px 5px rgba(0,0,0,.16);box-sizing:border-box;padding-left:5px;padding-top:5px;width:245px}.vc-compact-colors{margin:0;overflow:hidden;padding:0}.vc-compact-color-item{cursor:pointer;float:left;height:15px;list-style:none;margin-bottom:5px;margin-right:5px;position:relative;width:15px}.vc-compact-color-item--white{box-shadow:inset 0 0 0 1px #ddd}.vc-compact-color-item--white .vc-compact-dot{background:#000}.vc-compact-dot{background:#fff;border-radius:50%;bottom:5px;left:5px;opacity:1;position:absolute;right:5px;top:5px}"), me.render = function (o, i, s, n, h, p) {
    return e(), t("div", we, [l("ul", Ce, [(e(!0), t(u, null, v(o.paletteUpperCase(s.palette), (o => (e(), t("li", {
        key: o,
        role: "option",
        "aria-label": `color:${o}`,
        "aria-selected": o === p.pick,
        class: c(["vc-compact-color-item", {"vc-compact-color-item--white": "#FFFFFF" === o}]),
        style: a({background: o}),
        onClick: e => p.handlerClick(o)
    }, [r(l("div", ye, null, 512), [[d, o === p.pick]])], 14, ke)))), 128))])])
}, me.__file = "src/components/compact/compact.vue", me.install = y;
const _e = ["#FFFFFF", "#F2F2F2", "#E6E6E6", "#D9D9D9", "#CCCCCC", "#BFBFBF", "#B3B3B3", "#A6A6A6", "#999999", "#8C8C8C", "#808080", "#737373", "#666666", "#595959", "#4D4D4D", "#404040", "#333333", "#262626", "#0D0D0D", "#000000"];
var Fe = {
    name: "Grayscale",
    components: {},
    mixins: [z],
    props: {palette: {type: Array, default: () => _e}},
    computed: {
        pick() {
            return this.colors.hex.toUpperCase()
        }
    },
    methods: {
        handlerClick(e) {
            this.colorChange({hex: e, source: "hex"})
        }
    }
};
const Le = {role: "application", "aria-label": "Grayscale color picker", class: "vc-grayscale"},
    Ee = {class: "vc-grayscale-colors", role: "listbox"}, Ae = ["aria-label", "aria-selected", "onClick"],
    De = {class: "vc-grayscale-dot"};
k(".vc-grayscale{background-color:#fff;border-radius:2px;box-shadow:0 2px 15px rgba(0,0,0,.12),0 2px 10px rgba(0,0,0,.16);width:125px}.vc-grayscale-colors{border-radius:2px;margin:0;overflow:hidden;padding:0}.vc-grayscale-color-item{cursor:pointer;float:left;height:25px;list-style:none;position:relative;width:25px}.vc-grayscale-color-item--white .vc-grayscale-dot{background:#000}.vc-grayscale-dot{background:#fff;border-radius:50%;height:6px;left:50%;margin:-3px 0 0 -2px;opacity:1;position:absolute;top:50%;width:6px}"), Fe.render = function (o, i, s, n, h, p) {
    return e(), t("div", Le, [l("ul", Ee, [(e(!0), t(u, null, v(o.paletteUpperCase(s.palette), (o => (e(), t("li", {
        key: o,
        role: "option",
        "aria-label": `Color:${o}`,
        "aria-selected": o === p.pick,
        class: c(["vc-grayscale-color-item", {"vc-grayscale-color-item--white": "#FFFFFF" === o}]),
        style: a({background: o}),
        onClick: e => p.handlerClick(o)
    }, [r(l("div", De, null, 512), [[d, o === p.pick]])], 14, Ae)))), 128))])])
}, Fe.__file = "src/components/grayscale/grayscale.vue", Fe.install = y;
var Se = {
    name: "Material", components: {EdIn: H}, mixins: [z], methods: {
        onChange(e) {
            e && (e.hex ? this.isValidHex(e.hex) && this.colorChange({
                hex: e.hex,
                source: "hex"
            }) : (e.r || e.g || e.b) && this.colorChange({
                r: e.r || this.colors.rgba.r,
                g: e.g || this.colors.rgba.g,
                b: e.b || this.colors.rgba.b,
                a: e.a || this.colors.rgba.a,
                source: "rgba"
            }))
        }
    }
};
const Be = {role: "application", "aria-label": "Material color picker", class: "vc-material"},
    $e = {class: "vc-material-split"}, ze = {class: "vc-material-third"}, He = {class: "vc-material-third"},
    Me = {class: "vc-material-third"};
k(".vc-material{background-color:#fff;border-radius:2px;box-shadow:0 2px 10px rgba(0,0,0,.12),0 2px 5px rgba(0,0,0,.16);font-family:Roboto;height:98px;padding:16px;position:relative;width:98px}.vc-material .vc-input__input{color:#333;font-size:15px;height:30px;margin-top:12px;width:100%}.vc-material .vc-input__label{color:#999;font-size:11px;left:0;position:absolute;text-transform:capitalize;top:0}.vc-material-hex{border-bottom-style:solid;border-bottom-width:2px}.vc-material-split{display:flex;margin-right:-10px;padding-top:11px}.vc-material-third{flex:1;padding-right:10px}"), Se.render = function (r, s, n, c, h, p) {
    const d = o("EdIn");
    return e(), t("div", Be, [i(d, {
        class: "vc-material-hex",
        label: "hex",
        value: r.colors.hex,
        style: a({borderColor: r.colors.hex}),
        onChange: p.onChange
    }, null, 8, ["value", "style", "onChange"]), l("div", $e, [l("div", ze, [i(d, {
        label: "r",
        value: r.colors.rgba.r,
        onChange: p.onChange
    }, null, 8, ["value", "onChange"])]), l("div", He, [i(d, {
        label: "g",
        value: r.colors.rgba.g,
        onChange: p.onChange
    }, null, 8, ["value", "onChange"])]), l("div", Me, [i(d, {
        label: "b",
        value: r.colors.rgba.b,
        onChange: p.onChange
    }, null, 8, ["value", "onChange"])])])])
}, Se.__file = "src/components/material/material.vue", Se.install = y;
var Ie = {
    name: "Photoshop",
    components: {Saturation: R, Hue: X, EdIn: H},
    mixins: [z],
    props: {
        head: {type: String, default: "Color Picker"},
        disableFields: {type: Boolean, default: !1},
        hasResetButton: {type: Boolean, default: !1},
        acceptLabel: {type: String, default: "OK"},
        cancelLabel: {type: String, default: "Cancel"},
        resetLabel: {type: String, default: "Reset"},
        newLabel: {type: String, default: "new"},
        currentLabel: {type: String, default: "current"}
    },
    data: () => ({currentColor: "#FFF"}),
    computed: {
        hsv() {
            const {hsv: e} = this.colors;
            return {h: e.h.toFixed(), s: (100 * e.s).toFixed(), v: (100 * e.v).toFixed()}
        }, hex() {
            const {hex: e} = this.colors;
            return e && e.replace("#", "")
        }
    },
    created() {
        this.currentColor = this.colors.hex
    },
    methods: {
        childChange(e) {
            this.colorChange(e)
        }, inputChange(e) {
            e && (e["#"] ? this.isValidHex(e["#"]) && this.colorChange({
                hex: e["#"],
                source: "hex"
            }) : e.r || e.g || e.b || e.a ? this.colorChange({
                r: e.r || this.colors.rgba.r,
                g: e.g || this.colors.rgba.g,
                b: e.b || this.colors.rgba.b,
                a: e.a || this.colors.rgba.a,
                source: "rgba"
            }) : (e.h || e.s || e.v) && this.colorChange({
                h: e.h || this.colors.hsv.h,
                s: e.s / 100 || this.colors.hsv.s,
                v: e.v / 100 || this.colors.hsv.v,
                source: "hsv"
            }))
        }, clickCurrentColor() {
            this.colorChange({hex: this.currentColor, source: "hex"})
        }, handleAccept() {
            this.$emit("ok")
        }, handleCancel() {
            this.$emit("cancel")
        }, handleReset() {
            this.$emit("reset")
        }
    }
};
const Te = {role: "heading", class: "vc-ps-head"}, Ue = {class: "vc-ps-body"}, Ve = {class: "vc-ps-saturation-wrap"},
    Re = {class: "vc-ps-hue-wrap"},
    Oe = l("div", {class: "vc-ps-hue-pointer"}, [l("i", {class: "vc-ps-hue-pointer--left"}), l("i", {class: "vc-ps-hue-pointer--right"})], -1),
    Ne = {class: "vc-ps-previews"}, Pe = {class: "vc-ps-previews__label"}, Xe = {class: "vc-ps-previews__swatches"},
    je = ["aria-label"], Ke = ["aria-label"], Ye = {class: "vc-ps-previews__label"},
    qe = {key: 0, class: "vc-ps-actions"}, Ge = ["aria-label"], We = ["aria-label"], Ze = {class: "vc-ps-fields"},
    Je = l("div", {class: "vc-ps-fields__divider"}, null, -1),
    Qe = l("div", {class: "vc-ps-fields__divider"}, null, -1);
k('.vc-photoshop{background:#dcdcdc;border-radius:4px;box-shadow:0 0 0 1px rgba(0,0,0,.25),0 8px 16px rgba(0,0,0,.15);box-sizing:initial;font-family:Roboto;width:513px}.vc-photoshop__disable-fields{width:390px}.vc-ps-head{background-image:linear-gradient(-180deg,#f0f0f0,#d4d4d4);border-bottom:1px solid #b1b1b1;border-radius:4px 4px 0 0;box-shadow:inset 0 1px 0 0 hsla(0,0%,100%,.2),inset 0 -1px 0 0 rgba(0,0,0,.02);color:#4d4d4d;font-size:13px;height:23px;line-height:24px;text-align:center}.vc-ps-body{display:flex;padding:15px}.vc-ps-saturation-wrap{border:2px solid #b3b3b3;border-bottom-color:#f0f0f0;height:256px;overflow:hidden;position:relative;width:256px}.vc-ps-saturation-wrap .vc-saturation-circle{height:12px;width:12px}.vc-ps-hue-wrap{border:2px solid #b3b3b3;border-bottom-color:#f0f0f0;height:256px;margin-left:10px;width:19px}.vc-ps-hue-pointer,.vc-ps-hue-wrap{position:relative}.vc-ps-hue-pointer--left,.vc-ps-hue-pointer--right{border-color:transparent transparent transparent #555;border-style:solid;border-width:5px 0 5px 8px;height:0;position:absolute;width:0}.vc-ps-hue-pointer--left:after,.vc-ps-hue-pointer--right:after{border-color:transparent transparent transparent #fff;border-style:solid;border-width:4px 0 4px 6px;content:"";height:0;left:1px;position:absolute;top:1px;transform:translate(-8px,-5px);width:0}.vc-ps-hue-pointer--left{transform:translate(-13px,-4px)}.vc-ps-hue-pointer--right{transform:translate(20px,-4px) rotate(180deg)}.vc-ps-controls{display:flex;margin-left:10px;width:180px}.vc-ps-controls__disable-fields{width:auto}.vc-ps-actions{flex:1;margin-left:20px}.vc-ps-ac-btn{background-image:linear-gradient(-180deg,#fff,#e6e6e6);border:1px solid #878787;border-radius:2px;box-shadow:0 1px 0 0 #eaeaea;color:#000;cursor:pointer;font-size:14px;height:20px;line-height:20px;margin-bottom:10px;text-align:center}.vc-ps-previews{width:60px}.vc-ps-previews__swatches{border:1px solid #b3b3b3;border-bottom-color:#f0f0f0;margin-bottom:2px;margin-top:1px}.vc-ps-previews__pr-color{box-shadow:inset 1px 0 0 #000,inset -1px 0 0 #000,inset 0 1px 0 #000;height:34px}.vc-ps-previews__label{color:#000;font-size:14px;text-align:center}.vc-ps-fields{padding-bottom:9px;padding-top:5px;position:relative;width:80px}.vc-ps-fields .vc-input__input{border:1px solid #888;box-shadow:inset 0 1px 1px rgba(0,0,0,.1),0 1px 0 0 #ececec;font-size:13px;height:18px;margin-bottom:5px;margin-left:40%;margin-right:10px;padding-left:3px;width:40%}.vc-ps-fields .vc-input__desc,.vc-ps-fields .vc-input__label{font-size:13px;height:18px;line-height:22px;position:absolute;text-transform:uppercase;top:0}.vc-ps-fields .vc-input__label{left:0;width:34px}.vc-ps-fields .vc-input__desc{right:0;width:0}.vc-ps-fields__divider{height:5px}.vc-ps-fields__hex .vc-input__input{border:1px solid #888;box-shadow:inset 0 1px 1px rgba(0,0,0,.1),0 1px 0 0 #ececec;font-size:13px;height:18px;margin-bottom:6px;margin-left:20%;padding-left:3px;width:80%}.vc-ps-fields__hex .vc-input__label{font-size:13px;height:18px;left:0;line-height:22px;position:absolute;text-transform:uppercase;top:0;width:14px}'), Ie.render = function (r, s, h, d, u, v) {
    const b = o("Saturation"), x = o("Hue"), f = o("EdIn");
    return e(), t("div", {
        role: "application",
        "aria-label": "PhotoShop color picker",
        class: c(["vc-photoshop", [h.disableFields ? "vc-photoshop__disable-fields" : ""]])
    }, [l("div", Te, n(h.head), 1), l("div", Ue, [l("div", Ve, [i(b, {
        value: r.colors,
        onChange: v.childChange
    }, null, 8, ["value", "onChange"])]), l("div", Re, [i(x, {
        value: r.colors,
        direction: "vertical",
        onChange: v.childChange
    }, {
        default: g((() => [Oe])),
        _: 1
    }, 8, ["value", "onChange"])]), l("div", {class: c(["vc-ps-controls", [h.disableFields ? "vc-ps-controls__disable-fields" : ""]])}, [l("div", Ne, [l("div", Pe, n(h.newLabel), 1), l("div", Xe, [l("div", {
        class: "vc-ps-previews__pr-color",
        "aria-label": `New color is ${r.colors.hex}`,
        style: a({background: r.colors.hex})
    }, null, 12, je), l("div", {
        class: "vc-ps-previews__pr-color",
        "aria-label": `Current color is ${u.currentColor}`,
        style: a({background: u.currentColor}),
        onClick: s[0] || (s[0] = (...e) => v.clickCurrentColor && v.clickCurrentColor(...e))
    }, null, 12, Ke)]), l("div", Ye, n(h.currentLabel), 1)]), h.disableFields ? p("v-if", !0) : (e(), t("div", qe, [l("div", {
        class: "vc-ps-ac-btn",
        role: "button",
        "aria-label": h.acceptLabel,
        onClick: s[1] || (s[1] = (...e) => v.handleAccept && v.handleAccept(...e))
    }, n(h.acceptLabel), 9, Ge), l("div", {
        class: "vc-ps-ac-btn",
        role: "button",
        "aria-label": h.cancelLabel,
        onClick: s[2] || (s[2] = (...e) => v.handleCancel && v.handleCancel(...e))
    }, n(h.cancelLabel), 9, We), l("div", Ze, [p(" hsla "), i(f, {
        label: "h",
        desc: "°",
        value: v.hsv.h,
        onChange: v.inputChange
    }, null, 8, ["value", "onChange"]), i(f, {
        label: "s",
        desc: "%",
        value: v.hsv.s,
        max: 100,
        onChange: v.inputChange
    }, null, 8, ["value", "onChange"]), i(f, {
        label: "v",
        desc: "%",
        value: v.hsv.v,
        max: 100,
        onChange: v.inputChange
    }, null, 8, ["value", "onChange"]), Je, p(" rgba "), i(f, {
        label: "r",
        value: r.colors.rgba.r,
        onChange: v.inputChange
    }, null, 8, ["value", "onChange"]), i(f, {
        label: "g",
        value: r.colors.rgba.g,
        onChange: v.inputChange
    }, null, 8, ["value", "onChange"]), i(f, {
        label: "b",
        value: r.colors.rgba.b,
        onChange: v.inputChange
    }, null, 8, ["value", "onChange"]), Qe, p(" hex "), i(f, {
        label: "#",
        class: "vc-ps-fields__hex",
        value: v.hex,
        onChange: v.inputChange
    }, null, 8, ["value", "onChange"])]), h.hasResetButton ? (e(), t("div", {
        key: 0,
        class: "vc-ps-ac-btn",
        "aria-label": "reset",
        onClick: s[3] || (s[3] = (...e) => v.handleReset && v.handleReset(...e))
    }, n(h.resetLabel), 1)) : p("v-if", !0)]))], 2)])], 2)
}, Ie.__file = "src/components/photoshop/photoshop.vue", Ie.install = y;
const et = ["#D0021B", "#F5A623", "#F8E71C", "#8B572A", "#7ED321", "#417505", "#BD10E0", "#9013FE", "#4A90E2", "#50E3C2", "#B8E986", "#000000", "#4A4A4A", "#9B9B9B", "#FFFFFF", "rgba(0,0,0,0)"];
var tt = {
    name: "Sketch",
    components: {Saturation: R, Hue: X, Alpha: E, EdIn: H, Checkboard: F},
    mixins: [z],
    props: {
        presetColors: {type: Array, default: () => et},
        disableAlpha: {type: Boolean, default: !1},
        disableFields: {type: Boolean, default: !1}
    },
    computed: {
        hex() {
            let e;
            return e = this.colors.a < 1 ? this.colors.hex8 : this.colors.hex, e.replace("#", "")
        }, activeColor() {
            const {rgba: e} = this.colors;
            return `rgba(${[e.r, e.g, e.b, e.a].join(",")})`
        }
    },
    methods: {
        handlePreset(e) {
            this.colorChange(e)
        }, childChange(e) {
            this.colorChange(e)
        }, inputChange(e) {
            e && (e.hex ? this.isValidHex(e.hex) && this.colorChange({
                hex: e.hex,
                source: "hex"
            }) : (e.r || e.g || e.b || e.a) && this.colorChange({
                r: e.r || this.colors.rgba.r,
                g: e.g || this.colors.rgba.g,
                b: e.b || this.colors.rgba.b,
                a: e.a || this.colors.rgba.a,
                source: "rgba"
            }))
        }
    }
};
const at = {class: "vc-sketch-saturation-wrap"}, ot = {class: "vc-sketch-controls"}, lt = {class: "vc-sketch-sliders"},
    it = {class: "vc-sketch-hue-wrap"}, rt = {key: 0, class: "vc-sketch-alpha-wrap"},
    st = {class: "vc-sketch-color-wrap"}, nt = ["aria-label"], ct = {key: 0, class: "vc-sketch-field"},
    ht = {class: "vc-sketch-field--double"}, pt = {class: "vc-sketch-field--single"},
    dt = {class: "vc-sketch-field--single"}, ut = {class: "vc-sketch-field--single"},
    vt = {key: 0, class: "vc-sketch-field--single"},
    gt = {class: "vc-sketch-presets", role: "group", "aria-label": "A color preset, pick one to set as current color"},
    bt = ["aria-label", "onClick"], xt = ["aria-label", "onClick"];
k(".vc-sketch{background:#fff;border-radius:4px;box-shadow:0 0 0 1px rgba(0,0,0,.15),0 8px 16px rgba(0,0,0,.15);box-sizing:initial;padding:10px 10px 0;position:relative;width:200px}.vc-sketch-saturation-wrap{overflow:hidden;padding-bottom:75%;position:relative;width:100%}.vc-sketch-controls{display:flex}.vc-sketch-sliders{flex:1;padding:4px 0}.vc-sketch-sliders .vc-alpha-gradient,.vc-sketch-sliders .vc-hue{border-radius:2px}.vc-sketch-alpha-wrap,.vc-sketch-hue-wrap{height:10px;position:relative}.vc-sketch-alpha-wrap{margin-top:4px;overflow:hidden}.vc-sketch-color-wrap{border-radius:3px;height:24px;margin-left:4px;margin-top:4px;position:relative;width:24px}.vc-sketch-active-color{border-radius:2px;bottom:0;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15),inset 0 0 4px rgba(0,0,0,.25);left:0;position:absolute;right:0;top:0;z-index:2}.vc-sketch-color-wrap .vc-checkerboard{background-size:auto}.vc-sketch-field{display:flex;padding-top:4px}.vc-sketch-field .vc-input__input{border:none;box-shadow:inset 0 0 0 1px #ccc;font-size:10px;padding:4px 0 3px 10%;width:90%}.vc-sketch-field .vc-input__label{color:#222;display:block;font-size:11px;padding-bottom:4px;padding-top:3px;text-align:center;text-transform:capitalize}.vc-sketch-field--single{flex:1;padding-left:6px}.vc-sketch-field--double{flex:2}.vc-sketch-presets{border-top:1px solid #eee;margin-left:-10px;margin-right:-10px;padding-left:10px;padding-top:10px}.vc-sketch-presets-color{cursor:pointer;display:inline-block;height:16px;margin:0 10px 10px 0;overflow:hidden;position:relative;vertical-align:top;width:16px}.vc-sketch-presets-color,.vc-sketch-presets-color .vc-checkerboard{border-radius:3px;box-shadow:inset 0 0 0 1px rgba(0,0,0,.15)}.vc-sketch__disable-alpha .vc-sketch-color-wrap{height:10px}"), tt.render = function (r, s, n, h, d, g) {
    const b = o("Saturation"), x = o("Hue"), f = o("Alpha"), m = o("Checkboard"), w = o("EdIn");
    return e(), t("div", {
        role: "application",
        "aria-label": "Sketch color picker",
        class: c(["vc-sketch", [n.disableAlpha ? "vc-sketch__disable-alpha" : ""]])
    }, [l("div", at, [i(b, {
        value: r.colors,
        onChange: g.childChange
    }, null, 8, ["value", "onChange"])]), l("div", ot, [l("div", lt, [l("div", it, [i(x, {
        value: r.colors,
        onChange: g.childChange
    }, null, 8, ["value", "onChange"])]), n.disableAlpha ? p("v-if", !0) : (e(), t("div", rt, [i(f, {
        value: r.colors,
        onChange: g.childChange
    }, null, 8, ["value", "onChange"])]))]), l("div", st, [l("div", {
        "aria-label": `Current color is ${g.activeColor}`,
        class: "vc-sketch-active-color",
        style: a({background: g.activeColor})
    }, null, 12, nt), i(m)])]), n.disableFields ? p("v-if", !0) : (e(), t("div", ct, [p(" rgba "), l("div", ht, [i(w, {
        label: "hex",
        value: g.hex,
        onChange: g.inputChange
    }, null, 8, ["value", "onChange"])]), l("div", pt, [i(w, {
        label: "r",
        value: r.colors.rgba.r,
        onChange: g.inputChange
    }, null, 8, ["value", "onChange"])]), l("div", dt, [i(w, {
        label: "g",
        value: r.colors.rgba.g,
        onChange: g.inputChange
    }, null, 8, ["value", "onChange"])]), l("div", ut, [i(w, {
        label: "b",
        value: r.colors.rgba.b,
        onChange: g.inputChange
    }, null, 8, ["value", "onChange"])]), n.disableAlpha ? p("v-if", !0) : (e(), t("div", vt, [i(w, {
        label: "a",
        value: r.colors.a,
        "arrow-offset": .01,
        max: 1,
        onChange: g.inputChange
    }, null, 8, ["value", "arrow-offset", "onChange"])]))])), l("div", gt, [(e(!0), t(u, null, v(n.presetColors, (o => (e(), t(u, null, [r.isTransparent(o) ? (e(), t("div", {
        key: o,
        "aria-label": `Color:${o}`,
        class: "vc-sketch-presets-color",
        onClick: e => g.handlePreset(o)
    }, [i(m)], 8, xt)) : (e(), t("div", {
        key: `!${o}`,
        class: "vc-sketch-presets-color",
        "aria-label": `Color:${o}`,
        style: a({background: o}),
        onClick: e => g.handlePreset(o)
    }, null, 12, bt))], 64)))), 256))])], 2)
}, tt.__file = "src/components/sketch/sketch.vue", tt.install = y;
const ft = .5;
var mt = {
    name: "Slider",
    components: {Hue: X},
    mixins: [z],
    props: {
        swatches: {
            type: Array,
            default: () => [{s: ft, l: .8}, {s: ft, l: .65}, {s: ft, l: .5}, {s: ft, l: .35}, {s: ft, l: .2}]
        }
    },
    computed: {
        normalizedSwatches() {
            const {swatches: e} = this;
            return e.map((e => "object" != typeof e ? {s: ft, l: e} : e))
        }
    },
    methods: {
        isActive(e, t) {
            const {hsl: a} = this.colors;
            return 1 === a.l && 1 === e.l || (0 === a.l && 0 === e.l || Math.abs(a.l - e.l) < .01 && Math.abs(a.s - e.s) < .01)
        }, hueChange(e) {
            this.colorChange(e)
        }, handleSwClick(e, t) {
            this.colorChange({h: this.colors.hsl.h, s: t.s, l: t.l, source: "hsl"})
        }
    }
};
const wt = {role: "application", "aria-label": "Slider color picker", class: "vc-slider"},
    Ct = {class: "vc-slider-hue-warp"}, kt = {class: "vc-slider-swatches", role: "group"},
    yt = ["data-index", "aria-label", "onClick"];
k(".vc-slider{position:relative;width:410px}.vc-slider-hue-warp{height:12px;position:relative}.vc-slider-hue-warp .vc-hue-picker{background-color:#f8f8f8;border-radius:6px;box-shadow:0 1px 4px 0 rgba(0,0,0,.37);height:14px;transform:translate(-7px,-2px);width:14px}.vc-slider-swatches{display:flex;margin-top:20px}.vc-slider-swatch{flex:1;margin-right:1px;width:20%}.vc-slider-swatch:first-child{margin-right:1px}.vc-slider-swatch:first-child .vc-slider-swatch-picker{border-radius:2px 0 0 2px}.vc-slider-swatch:last-child{margin-right:0}.vc-slider-swatch:last-child .vc-slider-swatch-picker{border-radius:0 2px 2px 0}.vc-slider-swatch-picker{cursor:pointer;height:12px}.vc-slider-swatch:nth-child(n) .vc-slider-swatch-picker.vc-slider-swatch-picker--active{border-radius:3.6px/2px;transform:scaleY(1.8)}.vc-slider-swatch-picker--white{box-shadow:inset 0 0 0 1px #ddd}.vc-slider-swatch-picker--active.vc-slider-swatch-picker--white{box-shadow:inset 0 0 0 .6px #ddd}"), mt.render = function (r, s, n, h, p, d) {
    const g = o("Hue");
    return e(), t("div", wt, [l("div", Ct, [i(g, {
        value: r.colors,
        onChange: d.hueChange
    }, null, 8, ["value", "onChange"])]), l("div", kt, [(e(!0), t(u, null, v(d.normalizedSwatches, ((o, i) => (e(), t("div", {
        key: i,
        class: "vc-slider-swatch",
        "data-index": i,
        "aria-label": `color:${r.colors.hex}`,
        role: "button",
        onClick: e => d.handleSwClick(i, o)
    }, [l("div", {
        class: c(["vc-slider-swatch-picker", {
            "vc-slider-swatch-picker--active": d.isActive(o, i),
            "vc-slider-swatch-picker--white": 1 === o.l
        }]), style: a({background: `hsl(${r.colors.hsl.h}, ${100 * o.s}%, ${100 * o.l}%)`})
    }, null, 6)], 8, yt)))), 128))])])
}, mt.__file = "src/components/slider/slider.vue", mt.install = y;
const _t = ["red", "pink", "purple", "deepPurple", "indigo", "blue", "lightBlue", "cyan", "teal", "green", "lightGreen", "lime", "yellow", "amber", "orange", "deepOrange", "brown", "blueGrey", "black"],
    Ft = ["900", "700", "500", "300", "100"], Lt = (() => {
        const e = [];
        return _t.forEach((t => {
            let a = [];
            "black" === t.toLowerCase() || "white" === t.toLowerCase() ? a = a.concat(["#000000", "#FFFFFF"]) : Ft.forEach((e => {
                const o = f[t][e];
                a.push(o.toUpperCase())
            })), e.push(a)
        })), e
    })();
var Et = {
    name: "Swatches", mixins: [z], props: {palette: {type: Array, default: () => Lt}}, computed: {
        pick() {
            return this.colors.hex
        }
    }, methods: {
        equal(e) {
            return e.toLowerCase() === this.colors.hex.toLowerCase()
        }, handlerClick(e) {
            this.colorChange({hex: e, source: "hex"})
        }
    }
};
const At = ["data-pick"], Dt = {class: "vc-swatches-box", role: "listbox"},
    St = ["aria-label", "aria-selected", "data-color", "onKeyup", "onClick"], Bt = {class: "vc-swatches-pick"},
    $t = {style: {width: "24px", height: "24px"}, viewBox: "0 0 24 24"},
    zt = [l("path", {d: "M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"}, null, -1)];
k(".vc-swatches{background-color:#fff;box-shadow:0 2px 10px rgba(0,0,0,.12),0 2px 5px rgba(0,0,0,.16);height:240px;overflow-y:scroll;width:320px}.vc-swatches-box{overflow:hidden;padding:16px 0 6px 16px}.vc-swatches-color-group{float:left;margin-right:10px;padding-bottom:10px;width:40px}.vc-swatches-color-it{background:#880e4f;-ms-border-radius:2px 2px 0 0;-moz-border-radius:2px 2px 0 0;-o-border-radius:2px 2px 0 0;-webkit-border-radius:2px 2px 0 0;border-radius:2px 2px 0 0;box-sizing:border-box;cursor:pointer;height:24px;margin-bottom:1px;overflow:hidden;width:40px}.vc-swatches-color--white{border:1px solid #ddd}.vc-swatches-pick{fill:#fff;display:block;margin-left:8px}.vc-swatches-color--white .vc-swatches-pick{fill:#333}"), Et.render = function (o, i, s, n, h, p) {
    return e(), t("div", {
        role: "application",
        "aria-label": "Swatches color picker",
        class: "vc-swatches",
        "data-pick": p.pick
    }, [l("div", Dt, [(e(!0), t(u, null, v(s.palette, ((o, i) => (e(), t("div", {
        key: i,
        class: "vc-swatches-color-group"
    }, [(e(!0), t(u, null, v(o, (o => (e(), t("div", {
        key: o,
        class: c(["vc-swatches-color-it", [{"vc-swatches-color--white": "#FFFFFF" === o}]]),
        role: "option",
        "aria-label": `Color:${o}`,
        "aria-selected": p.equal(o),
        "data-color": o,
        style: a({background: o}),
        tabindex: "0",
        onKeyup: b((e => p.handlerClick(o)), ["enter"]),
        onClick: e => p.handlerClick(o)
    }, [r(l("div", Bt, [(e(), t("svg", $t, zt))], 512), [[d, p.equal(o)]])], 46, St)))), 128))])))), 128))])], 8, At)
}, Et.__file = "src/components/swatches/swatches.vue", Et.install = y;
const Ht = ["#FF6900", "#FCB900", "#7BDCB5", "#00D084", "#8ED1FC", "#0693E3", "#ABB8C3", "#EB144C", "#F78DA7", "#9900EF"];
var Mt = {
    name: "Twitter",
    components: {EditableInput: H},
    mixins: [z],
    props: {
        width: {type: [String, Number], default: 276},
        defaultColors: {type: Array, default: () => Ht},
        triangle: {default: "top-left", validator: e => ["hide", "top-left", "top-right"].includes(e)}
    },
    computed: {
        hsv() {
            const {hsv: e} = this.colors;
            return {h: e.h.toFixed(), s: (100 * e.s).toFixed(), v: (100 * e.v).toFixed()}
        }, hex() {
            const {hex: e} = this.colors;
            return e && e.replace("#", "")
        }
    },
    methods: {
        equal(e) {
            return e.toLowerCase() === this.colors.hex.toLowerCase()
        }, handlerClick(e) {
            this.colorChange({hex: e, source: "hex"})
        }, inputChange(e) {
            e && (e["#"] ? this.isValidHex(e["#"]) && this.colorChange({
                hex: e["#"],
                source: "hex"
            }) : e.r || e.g || e.b || e.a ? this.colorChange({
                r: e.r || this.colors.rgba.r,
                g: e.g || this.colors.rgba.g,
                b: e.b || this.colors.rgba.b,
                a: e.a || this.colors.rgba.a,
                source: "rgba"
            }) : (e.h || e.s || e.v) && this.colorChange({
                h: e.h || this.colors.hsv.h,
                s: e.s / 100 || this.colors.hsv.s,
                v: e.v / 100 || this.colors.hsv.v,
                source: "hsv"
            }))
        }
    }
};
const It = l("div", {class: "vc-twitter-triangle-shadow"}, null, -1),
    Tt = l("div", {class: "vc-twitter-triangle"}, null, -1), Ut = {class: "vc-twitter-body"},
    Vt = ["onKeyup", "onClick"], Rt = l("div", {class: "vc-twitter-hash"}, " # ", -1),
    Ot = l("div", {class: "vc-twitter-clear"}, null, -1);
k(".vc-twitter{background:#fff;border:0 solid rgba(0,0,0,.25);border-radius:4px;box-shadow:0 1px 4px rgba(0,0,0,.25);position:relative}.vc-twitter-triangle{border-color:transparent transparent #fff}.vc-twitter-triangle,.vc-twitter-triangle-shadow{border-style:solid;border-width:0 9px 10px;height:0;position:absolute;width:0}.vc-twitter-triangle-shadow{border-color:transparent transparent rgba(0,0,0,.1)}.vc-twitter-body{padding:15px 9px 9px 15px}.vc-twitter .vc-editable-input{position:relative}.vc-twitter .vc-editable-input input{border:0;border-radius:0 4px 4px 0;box-shadow:inset 0 0 0 1px #f0f0f0;box-sizing:content-box;color:#666;float:left;font-size:14px;height:28px;outline:none;padding:1px 1px 1px 8px;width:100px}.vc-twitter .vc-editable-input span{display:none}.vc-twitter-hash{align-items:center;background:#f0f0f0;border-radius:4px 0 0 4px;color:#98a1a4;display:flex;float:left;height:30px;justify-content:center;width:30px}.vc-twitter-swatch{border-radius:4px;cursor:pointer;float:left;height:30px;margin:0 6px 6px 0;position:relative;width:30px}.vc-twitter-clear{clear:both}.vc-twitter-hide-triangle .vc-twitter-triangle,.vc-twitter-hide-triangle .vc-twitter-triangle-shadow{display:none}.vc-twitter-top-left-triangle .vc-twitter-triangle{left:12px;top:-10px}.vc-twitter-top-left-triangle .vc-twitter-triangle-shadow{left:12px;top:-11px}.vc-twitter-top-right-triangle .vc-twitter-triangle{right:12px;top:-10px}.vc-twitter-top-right-triangle .vc-twitter-triangle-shadow{right:12px;top:-11px}"), Mt.render = function (r, s, n, h, p, d) {
    const g = o("EditableInput");
    return e(), t("div", {
        class: c(["vc-twitter", {
            "vc-twitter-hide-triangle ": "hide" === n.triangle,
            "vc-twitter-top-left-triangle ": "top-left" === n.triangle,
            "vc-twitter-top-right-triangle ": "top-right" === n.triangle
        }]), style: a({width: "number" == typeof n.width ? `${n.width}px` : n.width})
    }, [It, Tt, l("div", Ut, [(e(!0), t(u, null, v(n.defaultColors, ((o, l) => (e(), t("span", {
        key: l,
        class: "vc-twitter-swatch",
        style: a({background: o, boxShadow: `0 0 4px ${d.equal(o) ? o : "transparent"}`}),
        role: "button",
        tabindex: "0",
        onKeyup: b((e => d.handlerClick(o)), ["enter"]),
        onClick: e => d.handlerClick(o)
    }, null, 44, Vt)))), 128)), Rt, i(g, {
        label: "#",
        value: d.hex,
        onChange: d.inputChange
    }, null, 8, ["value", "onChange"]), Ot])], 6)
}, Mt.__file = "src/components/twitter/twitter.vue", Mt.install = y;
const Nt = [E, F, Y, me, H, Fe, X, Se, Ie, R, tt, mt, Et, Mt], Pt = C({components: Nt});
export {
    E as Alpha,
    F as Checkboard,
    Y as Chrome,
    me as Compact,
    H as EditableInput,
    Fe as Grayscale,
    X as Hue,
    Se as Material,
    Ie as Photoshop,
    R as Saturation,
    tt as Sketch,
    mt as Slider,
    Et as Swatches,
    Mt as Twitter,
    Nt as components,
    C as create,
    Pt as default,
    Pt as install
};
//# sourceMappingURL=/sm/fbf79c76576fd89bb0489722166f0f10ddc21ab2133ab963cba4a9ced612a0f0.map