import vue from "./vue.build.js";
import {alertMsg,clearReactiveObject,deepCopy,func,querySystemConfig,rpc2,arrayContains} from "./lp.utils.js";

const { ref,reactive,onMounted } = vue;

export const useHardwareConf = () => {
    const hardwareConf = reactive({});
    const handleHardwareConf = () => {
        querySystemConfig("hardware.json").then((conf)=>{
            if(conf.hasOwnProperty("function")) {
                if(!conf.function.hasOwnProperty("upgrade"))
                    conf.function.upgrade = true;
                if(!conf.function.hasOwnProperty("language"))
                    conf.function.language = true;
                if(!conf.function.hasOwnProperty("ipv6"))
                    conf.function.ipv6 = true;
            }
            Object.assign(hardwareConf, conf);
        })
    }
    const updateHardwareConf = (tip = "tip") => {
        return new Promise((resolve,reject) => {
            func("/conf/updateHardwareConf",hardwareConf).then(data => {
                if ( data.status !== "success" ) {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }
    onMounted(handleHardwareConf);
    return { hardwareConf,updateHardwareConf }
}

export const useNetManagerConf = (tip = "tip") => {

    const formatMac = mac => {
        mac = mac.toUpperCase();
        mac = mac.replace(/[\'\"\\\/\b\f\n\r\t]/g, '');
        mac = mac.replace(/(.{2})(.{2})(.{2})(.{2})(.{2})(.{2})/, '$1:$2:$3:$4:$5:$6');
        return mac;
    }

    const checkMac = mac => {
        const macRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
        return macRegex.test(mac);
    }

    const netManagerConf = reactive({});

    const handleNetManagerConf = async () => {
        querySystemConfig("netManager.json").then((conf)=>{
            clearReactiveObject(netManagerConf);
            if(!arrayContains(conf.ignore,"sit0"))
                conf.ignore.push("sit0");
            Object.keys(conf.interface).forEach(item => {
                if(conf.interface[item].hasOwnProperty("mac")) {
                    const mac = conf.interface[item].mac;
                    conf.interface[item].mac = formatMac(mac);
                }
                if(!conf.interface[item].hasOwnProperty("ipv6_enable"))
                    conf.interface[item].ipv6_enable = false;
            });
            Object.assign(netManagerConf, conf);
        });
    }

    const updateNetManagerConf = (tip = "tip") => {
        const conf = deepCopy(netManagerConf);
        let isMac = true;
        Object.keys(conf.interface).forEach(item => {
            if(conf.interface[item].hasOwnProperty("mac")) {
                const mac = conf.interface[item].mac;
                if(checkMac(mac))
                    conf.interface[item].mac = mac.toLowerCase().replace(/:/g, '');
                else
                    isMac = false;
            }
        });

        if(!isMac) {
            alertMsg('<cn>Mac地址格式错误</cn><en>Mac address format error</en>', 'error');
            return ;
        }

        return new Promise((resolve,reject)=>{
            rpc2("net.update",[JSON.stringify(conf,null,2)]).then((results) => {
                if(results) {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                } else {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                }
            })
        })
    }
    onMounted(handleNetManagerConf);
    return { netManagerConf,updateNetManagerConf }
}

export const usePasswordConf = () => {
    const updateUserPasswd = (param,tip = "tip") => {
        return new Promise((resolve,reject)=>{
            func("/conf/updatePasswdConf",param).then((data)=>{
                if(data.status === "success") {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg(data.msg, 'success');
                } else {
                    reject();
                    if(tip !== "noTip")
                        alertMsg(data.msg, 'error');
                }
            });
        })
    }
    return { updateUserPasswd }
}

export const useNtpConf = () => {
    const ntpConf= reactive({});
    const handleNtpConf = () => {
        querySystemConfig("ntp.json").then((conf)=>{
            Object.assign(ntpConf,conf)
        })
    }
    const updateNtpConf = (tip = "tip") => {
        return new Promise((resolve,reject) => {
            func("/conf/updateNtpConf", ntpConf).then((data)=>{
                if(data.status === "success") {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                } else {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                }
            });
        })
    }
    onMounted(handleNtpConf);
    return { ntpConf,updateNtpConf }
}

export const useTimezoneConf = () => {
    const timezoneConf= reactive({});
    const handleTimezoneConf = () => {
        querySystemConfig("misc/timezone/tzselect.json").then((conf)=>{
            Object.assign(timezoneConf,conf)
        })
    }
    const updateTimezoneConf = (tip = "tip") => {
        return new Promise((resolve,reject) => {
            func("/conf/updateTimezoneConf", timezoneConf).then((data)=>{
                if(data.status === "success") {
                    resolve();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                } else {
                    reject();
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                }
            });
        })
    }
    onMounted(handleTimezoneConf);
    return { timezoneConf,updateTimezoneConf }
}

export const useWpaConf = () => {
    const wpaConf= reactive([]);
    const handleWpaConf = () => {
        querySystemConfig("wpa.conf").then((conf)=>{
            const networkList = [];
            const regex = /network={([\s\S]*?)}/g;
            let match;
            while ((match = regex.exec(conf)) !== null) {
                const networkObjStr = match[1].trim();
                const lines = networkObjStr.split("\n");
                const networkObj = {};
                for (const line of lines) {
                    let [key, value] = line.split("=");
                    if(value === undefined)
                        continue;
                    value = value.trim();
                    value = value.replace(/^"(.*)"$/, '$1');
                    networkObj[key.trim()] = value;
                }
                networkList.push(networkObj);
            }
            wpaConf.splice(0, wpaConf.length, ...networkList);
        })
    }
    onMounted(handleWpaConf);
    return { wpaConf }
}

export const useVersionConf = () => {
    const versionConf= reactive({});
    const handleVersionConf = () => {
        querySystemConfig("version.json").then((conf)=>{
            Object.assign(versionConf,conf)
        })
    }
    onMounted(()=>{
        handleVersionConf();
    })
    return { versionConf }
}

export const useDiskConf = () => {
    const diskConf = reactive({});
    const handleDiskConf = () => {
        querySystemConfig("misc/disk.json").then(conf => {
            clearReactiveObject(diskConf);
            Object.assign(diskConf,conf)
        })
    }
    const updateDiskConf = conf => {
        return new Promise(async (resolve,reject)=>{
            let result = await func("/conf/updateDiskConf", conf);
            if(result.status === "error") {
                alertMsg(result.msg,result.status);
                reject();
                return;
            }
            resolve();
        });
    }
    onMounted(handleDiskConf);
    return { diskConf,handleDiskConf,updateDiskConf }
}

export const useTailscaleConf = () => {
    const tailscaleConf = reactive({});

    const handleTailscaleConf = () => {
        querySystemConfig("rproxy/tailscale.json").then((conf)=>{
            Object.assign(tailscaleConf, conf);
        })
    }
    const updateTailscaleConf = (tip = "tip") => {
        return new Promise(async (resolve,reject)=>{
            func("/conf/updateTailscaleConf",tailscaleConf).then(data => {
                if ( data.status !== "success" ) {
                    reject(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        });

    }
    onMounted(handleTailscaleConf);
    return { tailscaleConf,updateTailscaleConf }
}

export const useFrpEnableConf = () => {
    const frpEnableConf= ref(false);
    const handleFrpEnableConf = () => {
        querySystemConfig("service.json").then((conf)=>{
            frpEnableConf.value = conf?.frp;
        })
    }
    const updateFrpEnableConf = (tip='tip') => {
        return new Promise((resolve,reject) => {
            func("/conf/updateFrpEnableConf",frpEnableConf.value).then(data => {
                if ( data.status !== "success" ) {
                    reject(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }
    onMounted(handleFrpEnableConf);
    return { frpEnableConf,updateFrpEnableConf }
}

export const useFrpcConf = () => {
    const frpcConf= ref("");
    const handleFrpcConf = () => {
        querySystemConfig("rproxy/frpc.ini").then((conf)=>{
            frpcConf.value = conf;
        })
    }
    const updateFrpcConf = (tip='tip') => {
        return new Promise((resolve,reject) => {
            func("/conf/updateFrpcConf",frpcConf.value).then(data => {
                if ( data.status !== "success" ) {
                    reject(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                } else {
                    resolve(data);
                    if(tip !== "noTip")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                }
            })
        })
    }
    onMounted(handleFrpcConf);
    return { frpcConf,updateFrpcConf }
}


