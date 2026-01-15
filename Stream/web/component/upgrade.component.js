import vue from "../assets/js/vue.build.js?hash=879ea7dbc";
import {alertMsg, axios_post,func, rebootConfirm} from '../assets/js/lp.utils.js?hash=e82520f08'

const {ref, reactive, toRefs, watchEffect, computed, onMounted} = vue;

const upgradeComponent = {
    template: `<div :class="['modal',{'fade':modalFade===undefined ? false : JSON.parse(modalFade)}]" data-bs-backdrop="static" tabindex="-1" aria-hidden="true" ref="modal">
                <div class="modal-dialog modal-lg modal-dialog-centered">
                    <div :class="['modal-content front',{'front0':!showLog},{'front180':showLog}]">
                        <div class="modal-header">
                            <h5 class="modal-title">
                                <cn>升级包</cn>
                                <en>Upgrade</en>
                            </h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body px-3">
                            <table class="table table-bordered">
                                <thead>
                                <tr>
                                    <th>
                                        <cn>序号</cn>
                                        <en>Num</en>
                                    </th>
                                    <th>
                                        <cn>名称</cn>
                                        <en>Name</en>
                                    </th>
                                    <th>
                                        <cn>版本</cn>
                                        <en>Build</en>
                                    </th>
                                    <th>
                                        <cn>日期</cn>
                                        <en>Date</en>
                                    </th>
                                    <th>
                                        <cn>级别</cn>
                                        <en>Impact</en>
                                    </th>
                                    <th>
                                        <cn>日志</cn>
                                        <en>Log</en>
                                    </th>
                                    <th>
                                        <cn>操作</cn>
                                        <en>Option</en>
                                    </th>
                                    <th>
                                        <cn>下载</cn>
                                        <en>Download</en>
                                    </th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="(item,index) in systemPatchs" :key="item.id">
                                    <td>{{index+1}}</td>
                                    <td>{{item.name}}</td>
                                    <td>{{item.build}}</td>
                                    <td>{{item.sys_ver}}</td>
                                    <td v-if="item.impact === '1'" class="lp-color-red">
                                        <cn>重要</cn>
                                        <en>impact</en>
                                    </td>
                                    <td v-else>
                                        <cn>普通</cn>
                                        <en>normal</en>
                                    </td>
                                    <td>
                                        <a class="lp-cursor-pointer" @click="showPatchVersionLog(index)">
                                            <cn>更新日志</cn>
                                            <en>Show logs</en>
                                        </a>
                                    </td>
                                    <td>
                                        <a v-if="item.allow" class="lp-cursor-pointer" @click="handleUpdatePatch(index)">
                                            <div v-if="upgradePatch.id === item.id && hadUpdate">{{updatePercent}}%</div>
                                            <div v-else>
                                                <cn>更新</cn>
                                                <en>Update</en>
                                            </div>
                                        </a>
                                        <a v-else>/</a>
                                    </td>
                                    <td>
                                        <a v-if="item.allow" class="lp-cursor-pointer" @click="handleDownloadPatch(index)">
                                            <cn>下载</cn>
                                            <en>Download</en>
                                        </a>
                                        <a v-else>/</a>
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                            <div class="row mt-4 mb-2">
                                <div class="col-lg-12">
                                    <cn>Tip：级别标记为<cn style="color: red">重要</cn>的升级包不能跳过，更新之后才能继续更新。</cn>
                                    <en>Tip：Upgrade packages marked as <en style="color: red">impact</en> cannot be skipped and can only be updated after they have been updated</en>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div :class="['modal-content rear',{'rear180':!showLog},{'rear0':showLog}]">
                        <div v-if="Object.keys(showLogPatch).length > 0">
                            <div class="modal-header">
                                <h5 class="modal-title">
                                    Build {{showLogPatch.sys_ver}}
                                </h5>
                                <button type="button" class="btn-close" @click="hidePatchVersionLog"></button>
                            </div>
                            <div class="modal-body">
                                <ul>
                                    <li class="mt-2" v-for="(it,idx) in handleVersionLogs" :key="idx" style="font-size: 15px;white-space:pre-wrap;">{{it}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`,
    props: {
        modalShow: {
            type: Boolean,
            default: false
        },
        modalFade: {
            type: Boolean,
            default: true
        },
        checkUpgrade: {
            type: Boolean,
            default: false
        },
        patchSn: {
            type: String,
            default: ""
        }
    },
    setup(props, context) {

        const {modalFade, checkUpgrade, patchSn} = toRefs(props);

        const state = {
            modal: ref(null),
            checkUpgrade: ref(false),
            systemPatchs: reactive([]),
            showLog: ref(false),
            showLogPatch: ref({}),
            hadUpdate: ref(false),
            updatePercent: ref(0),
            upgradePatch: ref({}),
            facAliase: "",
            bsModal: {},
        }

        watchEffect(async () => {
            if (checkUpgrade.value) {
                let result = await func("/upgrade/checkHelpNet");
                if (result.status === "error") {
                    alertMsg(result.msg, "error");
                    return;
                }

                if (!patchSn.value) {
                    result = await func("/upgrade/getSystemAliase");
                    if (result.status === "error") {
                        alertMsg(result.msg, "error");
                        context.emit('update:checkUpgrade', false);
                        return;
                    }
                    if (result.data.length === 0) {
                        alertMsg("<cn>已经是最新版本</cn><en>It is the latest version</en>", "success");
                        context.emit('update:checkUpgrade', false);
                        return;
                    }
                    state.facAliase = result.data[0].aliase;

                    result = await func("/upgrade/getAllSystemPatch");
                    if (result.status === "error") {
                        alertMsg(result.msg, "error");
                        context.emit('update:checkUpgrade', false);
                        return;
                    }
                    if (result.data.length === 0) {
                        alertMsg("<cn>已经是最新版本</cn><en>It is the latest version</en>", "success");
                        context.emit('update:checkUpgrade', false);
                        return;
                    }
                    state.systemPatchs.splice(0);
                    state.systemPatchs.push(...result.data);
                    let hadImpact = false;
                    for (let i = 0; i < state.systemPatchs.length; i++) {
                        state.systemPatchs[i].allow = true;
                        if (!hadImpact) {
                            const impact = state.systemPatchs[i].impact;
                            hadImpact = impact === "1";
                        } else {
                            state.systemPatchs[i].allow = false;
                        }
                    }
                    state.bsModal.show();
                } else {
                    let result = await func("/upgrade/getSystemAliase");
                    if (result.status === "error") {
                        alertMsg(result.msg, "error");
                        context.emit('update:checkUpgrade', false);
                        return;
                    }
                    if (result.data.length === 0) {
                        alertMsg("<cn>无效固件编号</cn><en>Invalid upgrade sn</en>", "error");
                        context.emit('update:checkUpgrade', false);
                        return;
                    }
                    state.facAliase = result.data[0].aliase;

                    result = await func("/upgrade/getSystemPatchBySn", {"sn": patchSn.value});
                    if (result.data.length === 0) {
                        alertMsg("<cn>无效固件编号</cn><en>Invalid upgrade sn</en>", "error");
                        context.emit('update:checkUpgrade', false);
                        return;
                    }
                    state.systemPatchs.splice(0);
                    state.systemPatchs.push(...result.data);
                    let hadImpact = false;
                    for (let i = 0; i < state.systemPatchs.length; i++) {
                        state.systemPatchs[i].allow = true;
                        if (!hadImpact) {
                            const impact = state.systemPatchs[i].impact;
                            hadImpact = impact === "1";
                        } else {
                            state.systemPatchs[i].allow = false;
                        }
                    }
                    state.bsModal.show();
                }
            }
        })

        const handleVersionLogs = computed(() => {
            const regex = /[\r\n\t]/g;
            state.showLogPatch.value.description = state.showLogPatch.value.description.replace(regex, "");
            return state.showLogPatch.value.description.split(";").filter((item) => {
                return item !== "";
            })
        })

        const showPatchVersionLog = idx => {
            state.showLogPatch.value = state.systemPatchs[idx];
            state.showLog.value = true;
        }

        const hidePatchVersionLog = () => {
            state.showLog.value = false;
        }

        const getUpdateFileSize = async name => {
            const params = {
                "action": "get_file_size",
                "name": name
            };
            const data = await axios_post("/link/upgrade.php", params);
            return data.size;
        };

        const handleUpdatePatch = idx => {
            if (state.hadUpdate.value)
                return;

            state.upgradePatch.value = state.systemPatchs[idx];
            const patch = state.systemPatchs[idx];
            const chip = patch.chip;
            let name = patch.name;
            let type = "update";
            if (name.indexOf("_sn_") > 0) {
                name = name.replace("_sn_", "_" + state.facAliase + "_");
                type = "sn";
            } else {
                name = name.replace("_", "_" + state.facAliase + "_");
                type = "update";
            }

            const params = {
                action: "update", name: name,
                chip: chip, type: type
            }

            axios_post('/link/upgrade.php', params)
                .then(async data => {
                    const total = Number(data.size);
                    state.hadUpdate.value = true;
                    state.updatePercent.value = 0;
                    if (total > 0) {
                        const timerId = setInterval(async function () {
                            const size = await getUpdateFileSize(name);
                            state.updatePercent.value = parseInt(size / total * 100);
                            if (size >= total) {
                                clearInterval(timerId);
                                state.bsModal.hide();
                                context.emit('update:checkUpgrade', false);
                                state.hadUpdate.value = false;
                                state.upgradePatch.value = {};
                                rebootConfirm('下载完成，是否立即重启系统完成更新？');
                            }
                        }, 1000);
                    }
                })
        }

        const handleDownloadPatch = idx => {
            state.upgradePatch.value = state.systemPatchs[idx];
            const patch = state.systemPatchs[idx];
            const chip = patch.chip;
            let name = patch.name;
            let type = "update";
            if (name.indexOf("_sn_") > 0) {
                name = name.replace("_sn_", "_" + state.facAliase + "_");
                type = "sn";
            } else {
                name = name.replace("_", "_" + state.facAliase + "_");
                type = "update";
            }

            const url = "http://help.linkpi.cn:5735/upgrade/" + chip + "/" + type + "/" + name;
            const downName = "";
            const a = document.createElement('a');
            const e = document.createEvent('MouseEvents');
            e.initEvent('click', false, false);
            a.href = url;
            a.download = downName;
            a.dispatchEvent(e);
        }

        onMounted(() => {
            state.bsModal = new bootstrap.Modal(state.modal.value);
            state.modal.value.addEventListener('hide.bs.modal', () => {
                context.emit('update:modelShow', false);
                context.emit('update:checkUpgrade', false);
            });
        })
        return {
            ...state,
            modalFade,
            handleVersionLogs,
            showPatchVersionLog,
            hidePatchVersionLog,
            handleUpdatePatch,
            handleDownloadPatch
        }
    }
}

export default upgradeComponent;