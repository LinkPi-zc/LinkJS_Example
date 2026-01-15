import vue from "../assets/js/vue.build.js?hash=879ea7dbc";
import {alertMsg, confirm, func,} from '../assets/js/lp.utils.js?hash=e82520f08'
import {useDiskConf} from "../assets/js/vue.hooks.js?hash=89523e901";

const {ref, reactive, onMounted} = vue;

const usbOptionComponent = {
    template: `<a :class="['nav-link lp-usb-ctx',{'active':hadMountDisk}]" data-bs-toggle="dropdown">
                    <div class="lp-usb-drive">
                        <div class="lp-usb-body"></div>
                        <div class="lp-usb-metal"></div>
                        <div class="lp-usb-hole"></div>
                    </div>
                </a>
                <div class="dropdown">
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li v-if="hadMountDisk">
                            <a class="dropdown-item" href="javascript:;" @click="unInstallDisk">
                                <span class="material-symbols-outlined me-2">
                                    <i class="fa-solid fa-arrow-up-from-bracket me-2"></i>
                                    <cn>弹出设备</cn>
                                    <en>Uninstall</en>
                                </span>
                            </a>
                        </li>
                        <li v-if="hadMountDisk"><hr></li>
                        <li v-if="Object.keys(diskConf).length > 0 && diskConf.used==='local'">
                            <a class="dropdown-item" href="javascript:;" @click="formatDisk">
                                <span class="material-symbols-outlined me-2">
                                    <i class="fa-solid fa-circle-nodes me-2"></i>
                                    <cn>格式化</cn>
                                    <en>Format Disk</en>
                                </span>
                            </a>
                        </li>
                        <li v-if="Object.keys(diskConf).length > 0 && diskConf.used==='local'"><hr></li>
                        <li>
                            <a class="dropdown-item" href="javascript:;" @click="turnMountDisk">
                                <span class="material-symbols-outlined me-2">
                                    <i class="fa-solid fa-right-left me-2"></i>
                                    <cn>切换挂载</cn>
                                    <en>Change Disk</en>
                                </span>
                            </a>
                        </li>
                        <li v-if="hadMountDisk"><hr></li>
                        <li v-if="hadMountDisk">
                            <a class="dropdown-item text-center" href="javascript:;">
                                <span class="material-symbols-outlined me-2">
                                    <cn>已用</cn><en>Used</en>
                                    {{hadMountInfo.used + ' / ' + hadMountInfo.total}}
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>`,
    setup(props, context) {

        const hadMountInfo = reactive({});
        const hadMountDisk = ref(false);
        const {diskConf, handleDiskConf, updateDiskConf} = useDiskConf();

        const unInstallDisk = () => {
            confirm({
                title: '<cn>卸载磁盘</cn><en>UnInstall Disk</en>',
                content: '<cn>是否卸载磁盘，请确保没有处于录制状态</cn><en>Whether to uninstall the disk, please make sure it is not in the recording state</en>',
                buttons: {
                    ok: {
                        text: "<cn>卸载</cn><en>Confirm</en>",
                        btnClass: 'btn-primary',
                        action: () => {
                            func("/system/umountDisk").then(res => {
                                alertMsg(res.msg, res.status);
                            })
                        }
                    },
                    cancel: {
                        text: "<cn>取消</cn><en>Cancel</en>",
                        action: () => {
                        }
                    }
                }
            });
        }

        const formatDisk = () => {
            confirm({
                title: '<cn>格式化磁盘</cn><en>Formatted Disk</en>',
                content: `<div class="row">
                            <div class="col-lg-11">
                            <div class="row mt-2">
                                    <div class="col-lg-3 lp-align-center">
                                        <label>
                                            <cn>目标磁盘</cn>
                                            <en>Disk</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-9">
                                        <select class="form-select" id="targetDisk"></select>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-lg-3 lp-align-center">
                                        <label>
                                            <cn>磁盘格式</cn>
                                            <en>Format</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-9">
                                        <select class="form-select" id="diskFormat">
                                            <option value="ext4">EXT4</option>
                                            <option value="fat32">FAT32</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="row mt-2">
                                    <div class="col-lg-3 lp-align-center">
                                        <label>
                                            <cn>登录密码</cn>
                                            <en>Password</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-9">
                                        <input class="form-control" type="password" id="formatPasswd" autocomplete="off">
                                    </div>
                                </div>
                                <div class="row mt-4">
                                    <div class="col-lg-12 p-0">
                                        <label class="ms-3">
                                            <cn>Tip: 格式化将清空磁盘数据，且不可逆转，请谨慎操作。</cn>
                                            <en>Tip: Formatting will erase disk data and is irreversible.</en>
                                        </label>
                                    </div>
                                </div>
                            </div>
                          </div>`,
                buttons: {
                    ok: {
                        text: "<cn>格式化</cn><en>Format</en>",
                        btnClass: 'btn-primary',
                        action: () => {
                            const formatPasswd = document.querySelector("#formatPasswd").value;
                            func("/system/formatReady", {"psd": formatPasswd}).then(res => {
                                return new Promise((resolve, reject) => {
                                    if (res.status === "error") {
                                        alertMsg(res.msg, res.status);
                                        reject();
                                        return;
                                    }
                                    resolve();
                                })
                            }).then(() => {
                                const targetDisk = document.querySelector("#targetDisk").value;
                                const diskFormat = document.querySelector("#diskFormat").value;
                                const notify = alertMsg("<cn>正在格式化，请勿关闭此页面</cn><en>Do not close this page while formatting</en>", "success", 99999999);
                                func("/system/formatDisk", {"disk": targetDisk, "format": diskFormat});
                                let interval = setInterval(() => {
                                    func("/system/checkFormatProgress").then(res => {
                                        if (res.data === 0) {
                                            clearInterval(interval);
                                            notify.remove();
                                            setTimeout(() => alertMsg(res.msg, res.status), 600);
                                        }
                                    })
                                }, 5000);
                            })
                        }
                    },
                    cancel: {
                        text: "<cn>取消</cn><en>Cancel</en>",
                        action: () => {
                        }
                    }
                },
                onOpenBefore: () => {
                    func("/system/getLocalDisk").then(result => {
                        const html = document.querySelector("html");
                        const lang = html.getAttribute("data-bs-language");
                        result.data.forEach(item => {
                            const option = document.createElement('option');
                            option.value = item.name;
                            if (item.name === "/dev/mmcblk0p6") {
                                if (lang === "cn")
                                    item.name = "机身存储";
                                else
                                    item.name = "device storage";
                            }
                            option.text = item.name + "( " + item.size + " )";
                            document.querySelector('#targetDisk').add(option);
                        })
                    })
                }
            });
        }

        const checkMountDisk = () => {
            func("/system/getMountDiskSpace").then(res => {
                Object.assign(hadMountInfo, res.data);
                hadMountDisk.value = (res.status === "success");
            })
            setTimeout(checkMountDisk, 1000);
        }

        const turnMountDisk = () => {
            const html = document.querySelector("html");
            const lang = html.getAttribute("data-bs-language");
            const jc = confirm({
                title: '<cn>磁盘挂载</cn><en>Mount Disk</en>',
                content: `<div class="row">
                              <div class="col-lg-12">
                                    <div class="row mt-3">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>类型</cn>
                                                <en>Type</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-7">
                                            <select class="form-select" id="mount_device">
                                                 <option value="shared">${lang === "cn" ? "网络磁盘" : "net disk"}</option>
                                                 <option value="local">${lang === "cn" ? "移动磁盘" : "usb disk"}</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-3 local-device">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>设备</cn>
                                                <en>Device</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-7">
                                            <select class="form-select" id="local_devices"></select>
                                        </div>
                                    </div>
                                    <div class="row mt-3 share-device">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>协议</cn>
                                                <en>Protocol</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-7">
                                            <select class="form-select" id="shared_protocol">
                                                 <option value="cifs">${lang === "cn" ? "cifs (windows共享目录)" : "cifs (windows shared directory)"}</option>
                                                 <option value="nfs">nfs</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row mt-3 share-device">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>IP地址</cn>
                                                <en>IP Address</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-7">
                                            <input class="form-control" id="shared_ip">
                                        </div>
                                    </div>
                                    <div class="row mt-3 cifs-auth share-device">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>用户名<small style="color: gray;font-size: 11px;">(选填)</small></cn>
                                                <en>Username</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-7">
                                            <input class="form-control" id="shared_uname">
                                        </div>
                                    </div>
                                    <div class="row mt-3 cifs-auth share-device">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>密码<small style="color: gray;font-size: 11px;">(选填)</small></cn>
                                                <en>Password</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-7">
                                            <input class="form-control" id="shared_passwd" type="password">
                                        </div>
                                    </div>
                                    <div class="row mt-3 share-device">
                                        <div class="col-lg-3 offset-lg-1 lp-align-center">
                                            <label>
                                                <cn>挂载路径</cn>
                                                <en>Mount Path</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-7">
                                            <input class="form-control" id="shared_path">
                                        </div>
                                    </div>
                                    <div class="row" style="padding-top: 30px;padding-left: 30px;color: gray">
                                        <label class="col-lg-12">
                                            <cn>Tip: 更换挂载设备时，请确保没有处于录制状态</cn>
                                            <en>Tip: Make sure that you are not recording when you change the mounted device</en>
                                        </label>
                                    </div>
                              </div>  
                          </div>`,
                buttons: {
                    ok: {
                        text: "<cn>挂载</cn><en>Mount</en>",
                        btnClass: 'btn-primary',
                        action: () => {
                            updateDiskConf({
                                enable: true,
                                used: document.querySelector('#mount_device').value,
                                shared: {
                                    ip: document.querySelector('#shared_ip').value,
                                    type: document.querySelector('#shared_protocol').value,
                                    path: document.querySelector('#shared_path').value,
                                    auth: {
                                        uname: document.querySelector('#shared_uname').value,
                                        passwd: document.querySelector('#shared_passwd').value,
                                    }
                                },
                                local: {
                                    device: document.querySelector('#local_devices').value
                                }
                            }).then(async () => {
                                handleDiskConf();
                                alertMsg("<cn>磁盘检测中，请稍后...</cn><en>Disk checking, please wait...</en>", "success");
                                const result = await func("/system/mountDisk");
                                if (result.status === "success")
                                    jc.close();
                                setTimeout(() => alertMsg(result.msg, result.status), 600);
                            });
                            return false;
                        }
                    },
                    cancel: {
                        text: "<cn>取消</cn><en>Cancel</en>",
                        action: () => {
                        }
                    }
                },
                onOpenBefore: () => {
                    const display = (type, protocol) => {
                        const shareElements = document.querySelectorAll('.share-device');
                        const localElements = document.querySelectorAll('.local-device');
                        shareElements.forEach(element => element.style.display = 'none');
                        localElements.forEach(element => element.style.display = 'none');
                        if (type === "shared") {
                            shareElements.forEach(element => element.style.display = '');
                            const cifsAuthElements = document.querySelectorAll('.cifs-auth');
                            document.querySelector('#shared_protocol').value = protocol;
                            cifsAuthElements.forEach(element => element.style.display = 'none');
                            if (protocol === 'cifs')
                                cifsAuthElements.forEach(element => element.style.display = '');
                            return;
                        }
                        localElements.forEach(element => element.style.display = '');
                    }

                    func("/system/getLocalDisk").then(result => {
                        const html = document.querySelector("html");
                        const lang = html.getAttribute("data-bs-language");
                        result.data.forEach(item => {
                            const option = document.createElement('option');
                            option.value = item.name;
                            if (item.name === "/dev/mmcblk0p6") {
                                if (lang === "cn")
                                    item.name = "机身存储";
                                else
                                    item.name = "device storage";
                            }
                            option.text = item.name + "( " + item.size + " )";
                            document.querySelector('#local_devices').add(option);
                        })
                    })

                    document.querySelector('#mount_device').value = diskConf.used;
                    document.querySelector('#local_devices').value = diskConf.local.device;
                    document.querySelector('#shared_protocol').value = diskConf.shared.type;
                    document.querySelector('#shared_uname').value = diskConf.shared.auth.uname;
                    document.querySelector('#shared_passwd').value = diskConf.shared.auth.passwd;
                    document.querySelector('#shared_ip').value = diskConf.shared.ip;
                    document.querySelector('#shared_path').value = diskConf.shared.path;
                    display(diskConf.used, diskConf.shared.type);
                    document.querySelector('#mount_device').addEventListener('change', () => {
                        const type = document.querySelector('#mount_device').value;
                        display(type, "cifs");
                    });
                    document.querySelector('#shared_protocol').addEventListener('change', () => {
                        const protocol = document.querySelector('#shared_protocol').value;
                        display("shared", protocol);
                    });
                }
            });
        }

        onMounted(checkMountDisk);
        return {hadMountInfo, hadMountDisk, diskConf, unInstallDisk, formatDisk, turnMountDisk}
    }
}

export default usbOptionComponent;