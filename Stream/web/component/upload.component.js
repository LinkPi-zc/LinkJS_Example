import vue from "../assets/js/vue.build.js";
import $ from "../assets/plugins/jquery/jquery.esm.js";
import mutationObserver from '../assets/plugins/polyfill/mutationobserver.esm.js'

const {ref, toRefs, watch, onMounted} = vue;

const uploadComponent = {
    template: `<div :class="['modal',{'fade':modalFade===undefined ? false : JSON.parse(modalFade)}]"  tabindex="-1" aria-hidden="true" ref="modal">
                    <div class="modal-dialog modal-lg modal-dialog-centered">
                      <div class="modal-content">
                        <div class="modal-header">
                          <h5 class="modal-title">{{modalTitle}}</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                           <input type="file" ref="uploadFile" name="uploadFile" multiple />
                        </div>
                      </div>
                    </div>
               </div>`,
    props: {
        modalTitle: {
            type: String,
            default: ""
        },
        modalShow: {
            type: Boolean,
            default: false
        },
        modalFade: {
            type: Boolean,
            default: false
        },
        uploadTip: {
            type: String,
            default: ""
        },
        uploadAction: {
            type: String,
            default: ""
        },
        uploadAllow: {
            type: Array,
            default: ""
        },
        uploadCount: {
            type: [Number, String],
            default: 1
        }
    },
    setup(props, context) {

        const {modalShow, modalFade, uploadAllow} = toRefs(props);

        const state = {
            modal: ref(null),
            modalTitle: ref(""),
            uploadFile: ref(null),
            uploadTip: "",
            show: false,
            bsModal: {},
            uploadLang: "zh"
        }

        watch(modalShow, () => {
            if (Object.keys(state.bsModal).length === 0) {
                updateLangText();
                initBsModal();
                initUploadFile();
            }
            state.show = !state.show;
            if (state.show)
                state.bsModal.show();
            else
                state.bsModal.hide();
        })

        const initBsModal = () => {
            state.bsModal = new bootstrap.Modal(state.modal.value);
            if (modalShow.value) {
                state.bsModal.show();
                state.show = true;
            } else {
                state.bsModal.hide();
                state.show = false;
            }
            state.modal.value.addEventListener('hide.bs.modal', () => {
                state.show = false;
                context.emit('update:modelShow', false);
            });
        }

        const updateLangText = () => {
            const html = document.querySelector('html');
            let lang = html.getAttribute('data-bs-language');
            const [tip1, tip2] = props.uploadTip.split("&");
            if (lang === "cn" || tip2 === undefined)
                state.uploadTip = tip1;
            else
                state.uploadTip = tip2;

            const [title1, title2] = props.modalTitle.split("&");
            if (lang === "cn" || title2 === undefined)
                state.modalTitle.value = title1;
            else
                state.modalTitle.value = title2;

            state.uploadLang = lang;
            if (lang === "cn")
                state.uploadLang = "zh";
        }

        const initUploadFile = () => {
            $(state.uploadFile.value).fileinput({
                language: state.uploadLang,
                theme: "fa6",
                dropZoneTitle: state.uploadTip,
                showClose: false,
                browseClass: "btn btn-primary btn-df",
                allowedFileExtensions: uploadAllow.value,
                uploadUrl: props.uploadAction,
                maxFileCount: isNaN(Number(props.uploadCount)) ? 1 : Number(props.uploadCount)
            });

            $(state.uploadFile.value).on('fileuploaded', function (event, data) {
                state.bsModal.hide();
                state.show = false;
                $(state.uploadFile.value).fileinput('clear');
                context.emit("upload-success", data)
            });

            $(state.uploadFile.value).on('fileuploaderror', function (event, data, msg) {
                if (data.jqXHR.responseText) {
                    var errMsg = eval(data.jqXHR.responseText);
                    context.emit("upload-error", errMsg);
                }
            });
        }

        onMounted(() => {
            const html = document.querySelector('html');
            html.addEventListener("loaded", () => {
                updateLangText();
                initBsModal();
                initUploadFile();
            })
            const observer = new mutationObserver(() => {
                updateLangText();
            });
            const config = {
                attributes: true,
                attributeFilter: ["data-bs-language"],
                subtree: false
            };
            observer.observe(html, config);
        })

        return {...state, modalFade}
    }
}

export default uploadComponent;