<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./include/head.php") ?>
    <link href="assets/plugins/fileinput/css/fileinput.min.css" rel="stylesheet" >
</head>
<body>
<?php include ("./include/menu.php") ?>
<div data-simplebar class="mb-4">
    <main class="page-content sys" id="app" v-cloak>
        <div class="row">
            <div class="col-lg-6">
                <ul class="nav nav-tabs nav-primary" role="tablist">
                    <li class="nav-item" role="presentation" v-if="Object.keys(netAdapter).length > 0 && Object.keys(netManagerConf).length > 0" v-for="(item,index) in Object.values(netAdapter)" :key="index">
                        <a v-if="netManagerConf.interface.hasOwnProperty(item.dev)" :class="['nav-link',{'active':index===0}]" data-bs-toggle="tab" :href="'#tab'+(index+1)" role="tab" aria-selected="true">
                            <div v-if="item.type === 'lan' || item.type === 'other'" class="d-flex align-items-center">
                                <div class="tab-icon"><i :class="['fa-solid me-1',{'fa-code-merge':index%2===1},{'fa-code-fork':index%2===0}]"></i></i></div>
                                <div class="tab-title">
                                    <cn>网口</cn>
                                    <en>LAN</en>
                                    <span v-if="index > 0">{{index+1}}</span>
                                </div>
                            </div>
                            <div v-if="item.type === 'wifi'" class="d-flex align-items-center">
                                <wifi-flag :icon="'wifi-'+(item.rssi > 3 ? 4 : (item.rssi < 3 ? (item.rssi === 0 ? 1 : 2) : 3))" :width="20" :height="20" :stroke="flagStroke" :color="flagColor" :stroke-width="2.3"></wifi-flag>
                                <div class="tab-title">
                                    <cn>无线网</cn>
                                    <en>WIFI</en>
                                </div>
                            </div>
                            <div v-if="item.type === 'dongle'" class="d-flex align-items-center">
                                <antenan-flag :icon="'antenan-'+(item.rssi > 3 ? 4 : (item.rssi < 3 ? (item.rssi === 0 ? 0 : 2) : 3))" :width="20" :height="20" :stroke="flagStroke" :color="flagColor" :stroke-width="2.3"></antenan-flag>
                                <div class="tab-title">
                                    <cn>移动网络</cn>
                                    <en>Cellular network</en>
                                </div>
                            </div>
                        </a>
                    </li>

                    <li v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.wifi && !Object.values(netAdapter).some(item => item.type === 'wifi')" class="nav-item lp-cursor-pointer" ref="wifiHandler">
                        <a class="nav-link">
                            <div class="d-flex align-items-center">
                                <wifi-flag icon="wifi-off" :width="20" :height="20" :stroke="'#999999'" :stroke-width="2.3"></wifi-flag>
                                <div class="tab-title">
                                    <cn>无线网</cn>
                                    <en>WIFI</en>
                                </div>
                            </div>
                        </a>
                    </li>

                    <li v-if="Object.keys(hardwareConf).length > 0 && ((hardwareConf.function.hasOwnProperty('dongle') && hardwareConf.function.dongle) || !hardwareConf.function.hasOwnProperty('dongle')) && !Object.values(netAdapter).some(item => item.type === 'dongle')" class="nav-item lp-cursor-pointer" ref="antenanHandler">
                        <a class="nav-link">
                            <div class="d-flex align-items-center">
                                <antenan-flag icon="antenan-off" :width="20" :height="20" :stroke="'#999999'" :stroke-width="2.3"></antenan-flag>
                                <div class="tab-title">
                                    <cn>移动网络</cn>
                                    <en>Cellular network</en>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>

                <div class="tab-content py-3 pe-2 ps-2">
                    <div v-if="Object.keys(netAdapter).length > 0 && Object.keys(netManagerConf).length > 0" v-for="(item,index) in Object.values(netAdapter)" :class="['tab-pane fade',{'show active':index===0}]" :key="index" :id="'tab'+(index+1)" role="tabpanel">
                        <div class="row" v-if="netManagerConf.interface.hasOwnProperty(item.dev) && (item.type === 'lan' || item.type === 'other')">
                            <div :class="hadIpv6 ? 'col-lg-6 border-right' : 'col-lg-12'">
                                <div v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.dhcp" class="row mt-3">
                                    <div :class="['lp-align-center',hadIpv6 ? 'col-lg-3' : 'col-lg-2 offset-lg-1']">
                                        <label>
                                            <cn>DHCP</cn>
                                            <en>DHCP</en>
                                        </label>
                                    </div>
                                    <div :class="hadIpv6 ? 'col-lg-9' : 'col-lg-6'">
                                        <bs-switch v-model="netManagerConf.interface[item.dev].dhcp" :size="'normal'"></bs-switch>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div :class="['lp-align-center',hadIpv6 ? 'col-lg-3' : 'col-lg-2 offset-lg-1']">
                                        <label>
                                            <cn>IPV4</cn>
                                            <en>IPV4</en>
                                        </label>
                                    </div>
                                    <div :class="hadIpv6 ? 'col-lg-9' : 'col-lg-6'">
                                        <input class="form-control" v-model.trim.lazy="netManagerConf.interface[item.dev].ip">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div :class="['lp-align-center',hadIpv6 ? 'col-lg-3' : 'col-lg-2 offset-lg-1']">
                                        <label>
                                            <cn>掩码</cn>
                                            <en>Mask</en>
                                        </label>
                                    </div>
                                    <div :class="hadIpv6 ? 'col-lg-9' : 'col-lg-6'">
                                        <input class="form-control" v-model.trim.lazy="netManagerConf.interface[item.dev].mask">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div :class="['lp-align-center',hadIpv6 ? 'col-lg-3' : 'col-lg-2 offset-lg-1']">
                                        <label>
                                            <cn>网关</cn>
                                            <en>Gateway</en>
                                        </label>
                                    </div>
                                    <div :class="hadIpv6 ? 'col-lg-9' : 'col-lg-6'">
                                        <input class="form-control" v-model.trim.lazy="netManagerConf.interface[item.dev].gw">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div :class="['lp-align-center',hadIpv6 ? 'col-lg-3' : 'col-lg-2 offset-lg-1']">
                                        <label>
                                            <cn>DNS</cn>
                                            <en>DNS</en>
                                        </label>
                                    </div>
                                    <div :class="hadIpv6 ? 'col-lg-9' : 'col-lg-6'">
                                        <input class="form-control" v-model.trim.lazy="netManagerConf.interface[item.dev].dns">
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div :class="['lp-align-center',hadIpv6 ? 'col-lg-3' : 'col-lg-2 offset-lg-1']">
                                        <label>
                                            <cn>MAC</cn>
                                            <en>MAC</en>
                                        </label>
                                    </div>
                                    <div :class="hadIpv6 ? 'col-lg-9' : 'col-lg-6'">
                                        <div class="input-group">
                                            <input class="form-control" type="text" :disabled="macLock" v-model.trim.lazy="netManagerConf.interface[item.dev].mac">
                                            <span class="input-group-text input-group-addon lp-cursor-pointer" @click="macLock=!macLock"><i :class="['fa-solid',{'fa-lock':macLock},{'fa-unlock':!macLock}]"></i></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-6" v-if="hadIpv6">
                                <div class="row mt-3">
                                    <div class="col-lg-3 lp-align-center px-0">
                                        <cn>启用IPV6</cn>
                                        <en>IPV6 Enable</en>
                                    </div>
                                    <div class="col-lg-9">
                                        <bs-switch v-model="netManagerConf.interface[item.dev].ipv6_enable" :size="'normal'"></bs-switch>
                                    </div>
                                </div>
                                <div v-if="netManagerConf.interface[item.dev].ipv6 && netManagerConf.interface[item.dev].ipv6.length > 0" v-for="(it,idx) in netManagerConf.interface[item.dev].ipv6" :class="['row',idx===0?'mt-3':'mt-2']">
                                    <div class="col-lg-3 lp-align-center px-0">
                                        <label v-if="idx===0">
                                            <cn>IPV6</cn>
                                            <en>IPV6</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-9">
                                        <div class="input-group">
                                            <input class="form-control" v-model.trim.lazy="it" readonly>
                                            <button class="btn btn-primary input-group-text input-group-addon lp-cursor-pointer" @click="onCopyIpv6Addr(it)">
                                                <i class="fa-regular fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div v-else v-for="(it,idx) in 2" :class="['row',idx===0?'mt-3':'mt-2']">
                                    <div class="col-lg-3 lp-align-center">
                                        <label v-if="idx===0">
                                            <cn>IPV6</cn>
                                            <en>IPV6</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-9">
                                        <div class="input-group">
                                            <input class="form-control" placeholder="2001:db8::1" readonly>
                                            <button class="btn btn-primary input-group-text input-group-addon lp-cursor-pointer" @click="onCopyIpv6Addr(it)">
                                                <i class="fa-regular fa-copy"></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-12">
                                <div class="row mt-4">
                                    <div class="col-lg-12 text-center">
                                        <button type="button" class="btn btn-primary border-3 px-5" @click="updateDefNetwork(item.dev)"><cn>保存</cn><en>Save</en></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="Object.keys(hardwareConf).length > 0 && hardwareConf.function.wifi && netManagerConf.interface.hasOwnProperty(item.dev) && item.type === 'wifi'">
                            <div :class="['row',hadIpv6 ? 'mt-0':'mt-4']">
                                <div :class="['border-right',hadIpv6 ? 'col-lg-5 pt-3':'col-lg-6']">
                                    <div :class="['row',hadIpv6 ? 'mt-5':'mt-4']">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>启用</cn>
                                                <en>Enable</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <bs-switch v-model="netManagerConf.interface[item.dev].enable" :size="'normal'" @switch-change="enableWifi"></bs-switch>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                WIFI
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="input-group">
                                                <select class="form-select" v-model="wifiConnectId">
                                                    <option v-for="(it,idx) in wifiList" :key="idx+10" :value="it.ssid">{{it.ssid}}</option>
                                                </select>
                                                <span class="input-group-text input-group-addon lp-cursor-pointer" @click="refreshWifi"><i :class="['fa-solid fa-arrows-rotate',{'spin':wifiRefresh}]"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-3">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>密码</cn>
                                                <en>Password</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="input-group">
                                                <input class="form-control" :type="!showPasswd.wifipwd ? 'password' : 'text'" v-model.trim.lazy="wifiPassword">
                                                <span class="input-group-text input-group-addon lp-cursor-pointer" @click="showPasswd.wifipwd = !showPasswd.wifipwd"><i :class="['fa-regular',{'fa-eye-slash':!showPasswd.wifipwd},{'fa-eye':showPasswd.wifipwd}]"></i></span>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>状态</cn>
                                                <en>Status</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <label v-if="!netManagerConf.interface[item.dev].enable">
                                                <cn>未启用</cn><en>Disabled</en>
                                            </label>
                                            <label v-else-if="(!item.ssid && wifiPassword) || (!item.linkup && item.ssid)">
                                                <cn class="pointLoading">连接中</cn><en class="pointLoading">connecting</en>
                                            </label>
                                            <label v-else-if="item.linkup && item.ssid">
                                                <cn>已连接</cn><en>connected </en>
                                                {{item.ssid}}
                                            </label>
                                            <label v-else>
                                                <cn>未连接</cn><en>not connected</en>
                                            </label>
                                        </div>
                                    </div>
                                    <div class="row mt-4">
                                        <div class="col-lg-12 text-center">
                                            <button type="button" class="btn border-3 btn-primary px-4 me-2" @click="connectWifi"><cn>连接</cn><en>Connect</en></button>
                                        </div>
                                    </div>
                                </div>
                                <div :class="hadIpv6 ? 'col-lg-7':'col-lg-6'">
                                    <div class="row mt-4" v-if="!hadIpv6">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>DHCP</cn>
                                                <en>DHCP</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <bs-switch v-model="netManagerConf.interface[item.dev].dhcp" :size="'normal'"></bs-switch>
                                        </div>
                                    </div>
                                    <div :class="['row',hadIpv6 ? 'mt-2':'mt-3']">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>IPV4</cn>
                                                <en>IPV4</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <input class="form-control" v-model.trim.lazy="netManagerConf.interface[item.dev].ip">
                                        </div>
                                    </div>
                                    <div :class="['row',hadIpv6 ? 'mt-2':'mt-3']">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>掩码</cn>
                                                <en>Mask</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <input class="form-control" v-model.trim.lazy="netManagerConf.interface[item.dev].mask">
                                        </div>
                                    </div>
                                    <div :class="['row',hadIpv6 ? 'mt-2':'mt-3']">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>网关</cn>
                                                <en>Gateway</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <input class="form-control" v-model.trim.lazy="netManagerConf.interface[item.dev].gw">
                                        </div>
                                    </div>
                                    <div :class="['row',hadIpv6 ? 'mt-2':'mt-3']">
                                        <div class="col-lg-3 lp-align-center">
                                            <label>
                                                <cn>DNS</cn>
                                                <en>DNS</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <input class="form-control" v-model.trim.lazy="netManagerConf.interface[item.dev].dns">
                                        </div>
                                    </div>
                                    <div v-if="hadIpv6 && netManagerConf.interface[item.dev].ipv6 && netManagerConf.interface[item.dev].ipv6.length > 0" v-for="(it,idx) in netManagerConf.interface[item.dev].ipv6" class="row mt-2">
                                        <div class="col-lg-3 lp-align-center">
                                            <label v-if="idx===0">
                                                <cn>IPV6</cn>
                                                <en>IPV6</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="input-group">
                                                <input class="form-control" v-model.trim.lazy="it" readonly>
                                                <button class="btn btn-primary input-group-text input-group-addon lp-cursor-pointer" @click="onCopyIpv6Addr(it)">
                                                    <i class="fa-regular fa-copy"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else v-for="(it,idx) in 2" class="row mt-2">
                                        <div class="col-lg-3 lp-align-center">
                                            <label v-if="idx===0">
                                                <cn>IPV6</cn>
                                                <en>IPV6</en>
                                            </label>
                                        </div>
                                        <div class="col-lg-8">
                                            <div class="input-group">
                                                <input class="form-control" placeholder="2001:db8::1" readonly>
                                                <button class="btn btn-primary input-group-text input-group-addon lp-cursor-pointer" @click="onCopyIpv6Addr(it)">
                                                    <i class="fa-regular fa-copy"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div :class="['row',hadIpv6 ? 'mt-3 mb-2':'my-4']">
                                        <div class="col-lg-12 text-center">
                                            <button v-if="hadIpv6" type="button" class="btn border-3 btn-primary me-2" @click="onSetWifi('dhcp')">
                                                <label v-if="netManagerConf.interface[item.dev].dhcp">
                                                    <cn>DHCP已开启</cn>
                                                    <en>DHCP Disable</en>
                                                </label>
                                                <label v-else>
                                                    <cn>DHCP已关闭</cn>
                                                    <en>DHCP Enable </en>
                                                </label>
                                            </button>
                                            <button v-if="hadIpv6" type="button" class="btn border-3 btn-primary me-2" @click="onSetWifi('ipv6')">
                                                <label v-if="netManagerConf.interface[item.dev].ipv6_enable">
                                                    <cn>IPV6已开启</cn>
                                                    <en>IPV6 Disable</en>
                                                </label>
                                                <label v-else>
                                                    <cn>IPV6已关闭</cn>
                                                    <en>IPV6 Enable</en>
                                                </label>
                                            </button>
                                            <button type="button" class="btn border-3 btn-primary px-4" @click="updateNetManagerConf"><cn>保存</cn><en>Save</en></button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div v-if="item.type === 'dongle'">
                            <div class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>运营商</cn>
                                        <en>Operator</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <div v-if="!netAdapter[item.dev].oper" v-html="`<cn class='pointLoading'>检测中</cn><en class='pointLoading'>Detecting...</en>`"></div>
                                    <input v-else class="form-control" v-model.trim.lazy="netAdapter[item.dev].oper" readonly>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>服务</cn>
                                        <en>Service</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" v-model.trim.lazy="netAdapter[item.dev].service" readonly>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>上行</cn>
                                        <en>Service</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" :value="formatNetSpeed(netAdapter[item.dev].tx)" readonly>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>下行</cn>
                                        <en>Service</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" :value="formatNetSpeed(netAdapter[item.dev].rx)" readonly>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>IP</cn>
                                        <en>IP</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" v-model.trim.lazy="netAdapter[item.dev].ip" readonly>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>掩码</cn>
                                        <en>Mask</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" v-model.trim.lazy="netAdapter[item.dev].mask" readonly>
                                </div>
                            </div>
                            <div class="row mt-3 mb-2">
                                <div class="col-lg-2 offset-lg-1 lp-align-center">
                                    <label>
                                        <cn>网关</cn>
                                        <en>Gateway</en>
                                    </label>
                                </div>
                                <div class="col-lg-6">
                                    <input class="form-control" v-model.trim.lazy="netAdapter[item.dev].gw" readonly>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="row">
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header bg-transparent">
                                <div class="p-2 mb-0 d-flex align-items-end">
                                    <cn>密码设置</cn>
                                    <en>Password</en>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-lg-2 offset-lg-1 lp-align-center">
                                        <label>
                                            <cn>旧密码</cn>
                                            <en>Current</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                            <input class="form-control" :type="!showPasswd.oldpwd ? 'password' : 'text'" v-model.trim.lazy="userPasswd.oldpwd" autocomplete="off">
                                            <span class="input-group-text input-group-addon lp-cursor-pointer" @click="showPasswd.oldpwd = !showPasswd.oldpwd"><i :class="['fa-regular',{'fa-eye-slash':showPasswd.oldpwd},{'fa-eye':!showPasswd.oldpwd}]"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-lg-2 offset-lg-1 lp-align-center">
                                        <label>
                                            <label>
                                                <cn>新密码</cn>
                                                <en>New</en>
                                            </label>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                            <input class="form-control" :type="!showPasswd.newpwd ? 'password' : 'text'" v-model.trim.lazy="userPasswd.newpwd" autocomplete="off">
                                            <span class="input-group-text input-group-addon lp-cursor-pointer" @click="showPasswd.newpwd = !showPasswd.newpwd"><i :class="['fa-regular',{'fa-eye-slash':showPasswd.newpwd},{'fa-eye':!showPasswd.newpwd}]"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-lg-2 offset-lg-1 lp-align-center">
                                        <label>
                                            <cn>确认密码</cn>
                                            <en>Confirm</en>
                                        </label>
                                    </div>
                                    <div class="col-lg-6">
                                        <div class="input-group">
                                            <input class="form-control" :type="!showPasswd.confirm ? 'password' : 'text'" v-model.trim.lazy="userPasswd.confirm" autocomplete="off">
                                            <span class="input-group-text input-group-addon lp-cursor-pointer" @click="showPasswd.confirm = !showPasswd.confirm"><i :class="['fa-regular',{'fa-eye-slash':showPasswd.confirm},{'fa-eye':!showPasswd.confirm}]"></i></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-lg-12 text-center">
                                        <button type="button" class="btn border-3 btn-primary px-4" @click="updateUserPasswd(userPasswd)"><cn>保存</cn><en>Save</en></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-12">
                        <div class="card">
                            <div class="card-header bg-transparent">
                                <div class="p-2 mb-0 d-flex align-items-end">
                                    <cn>网络测试</cn>
                                    <en>Network Test</en>
                                </div>
                            </div>
                            <div class="card-body">
                                <div class="row my-2">
                                    <div class="col-lg-3 d-flex align-items-center justify-content-end">
                                        <cn>服务地址</cn>
                                        <en>Server</en>
                                    </div>
                                    <div class="col-lg-4 lp-align-center" v-if="Object.keys(netManagerConf).length > 0">
                                        <input type="text" class="form-control" v-model.trim.lazy="netManagerConf.onlineServer">
                                    </div>
                                    <div class="col-lg-5">
                                        <button type="button" class="btn border-3 btn-primary px-3 me-2" @click="updateNetManagerConf"><cn>保存</cn><en>Save</en></button>
                                        <button type="button" class="btn border-3 btn-primary px-4 net-test" @click="systemNetTest"><cn>网络测试</cn><en>Start Test</en></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>定时维护</cn>
                            <en>Auto reboot</en>
                        </div>
                    </div>
                    <div class="card-body py-3">
                        <div class="row">
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>系统时间</cn>
                                    <en>system time</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <input class="form-control" v-model.trim.lazy="sysTime">
                            </div>
                            <div class="col-lg-2">
                                <button type="button" class="btn border-3 btn-primary px-2" @click="syncTimeFromPc"><cn>本地同步</cn><en>Sync from PC</en></button>
                            </div>
                        </div>
                        <div class="row mt-3" v-if="Object.keys(ntpConf).length > 0">
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>NTP同步</cn>
                                    <en>NTP sync</en>
                                </label>
                            </div>
                            <div class="col-lg-3">
                                <input class="form-control" v-model.trim.lazy="ntpConf.server">
                            </div>
                            <div class="col-lg-3">
                                <div class="input-group">
                                    <span class="input-group-text input-group-addon px-1">
                                        <cn>间隔(min)</cn>
                                        <en>inr</en>
                                    </span>
                                    <input class="form-control" v-model.trim.lazy="ntpConf.interval">
                                </div>
                            </div>
                            <div class="col-lg-2">
                                <bs-switch v-model="ntpConf.enable"></bs-switch>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>时区设置</cn>
                                    <en>time zone</en>
                                </label>
                            </div>
                            <div class="col-lg-3">
                                <select class="form-select" v-model="timezoneConf.timeArea" @change="onTimeAreaChange">
                                    <option value="Africa">Africa</option>
                                    <option value="America">Americas</option>
                                    <option value="Antarctica">Antarctica</option>
                                    <option value="Asia">Asia</option>
                                    <option value="Atlantic">Atlantic Ocean</option>
                                    <option value="Australia">Australia</option>
                                    <option value="Europe">Europe</option>
                                    <option value="Indian">Indian Ocean</option>
                                    <option value="Pacific">Pacific Ocean</option>
                                </select>
                            </div>
                            <div class="col-lg-3">
                                <select class="form-select" v-model="timezoneConf.timeCity">
                                    <option v-for="item in timezoneCitys" :value="item.name">{{item.name}}</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-3" v-if="timezoneCitys.length > 0">
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>维护时间</cn>
                                    <en>reboot time</en>
                                </label>
                            </div>
                            <div class="col-lg-3">
                                <select class="form-select" v-model="cronDay">
                                    <option cn="从不" en="never" value="x" v-language-option></option>
                                    <option cn="每天" en="everyday" value="*" v-language-option></option>
                                    <option cn="每周一" en="monday" value="1" v-language-option></option>
                                    <option cn="每周二" en="tuesday" value="2" v-language-option></option>
                                    <option cn="每周三" en="wednesday" value="3" v-language-option></option>
                                    <option cn="每周四" en="thursday" value="4" v-language-option></option>
                                    <option cn="每周五" en="friday" value="5" v-language-option></option>
                                    <option cn="每周六" en="saturday" value="6" v-language-option></option>
                                    <option cn="每周日" en="sunday" value="0" v-language-option></option>
                                </select>
                            </div>
                            <div class="col-lg-3">
                                <select class="form-select" v-model="cronTime">
                                    <option value="0">0:00</option>
                                    <option value="1">1:00</option>
                                    <option value="2">2:00</option>
                                    <option value="3">3:00</option>
                                    <option value="4">4:00</option>
                                    <option value="5">5:00</option>
                                    <option value="6">6:00</option>
                                    <option value="7">7:00</option>
                                    <option value="8">8:00</option>
                                    <option value="9">9:00</option>
                                    <option value="10">10:00</option>
                                    <option value="11">11:00</option>
                                    <option value="12">12:00</option>
                                    <option value="13">13:00</option>
                                    <option value="14">14:00</option>
                                    <option value="15">15:00</option>
                                    <option value="16">16:00</option>
                                    <option value="17">17:00</option>
                                    <option value="18">18:00</option>
                                    <option value="19">19:00</option>
                                    <option value="20">20:00</option>
                                    <option value="21">21:00</option>
                                    <option value="22">22:00</option>
                                    <option value="23">23:00</option>
                                </select>
                            </div>
                        </div>
                        <div class="row mt-3 mb-1">
                            <div class="col-lg-12 text-center">
                                <button type="button" class="btn border-3 btn-primary px-4 me-4" @click="saveSysConf"><cn>保存</cn><en>Save</en></button>
                                <button type="button" class="btn border-3 btn-primary px-4 me-4" @click="rebootConfirm('是否立即重启系统')"><cn>立即重启</cn><en>Reboot</en></button>
                                <button type="button" class="btn border-3 btn-primary px-4" @click="resetConfirm"><cn>恢复出厂设置</cn><en>Reset default</en></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>系统升级</cn><en>Upgrade</en>
                        </div>
                    </div>
                    <div class="card-body" v-if="Object.keys(versionConf).length > 0">
                        <div class="row mt-1">
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>应用版本</cn>
                                    <en>App version</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <label>{{versionConf.app}}</label>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>SDK版本</cn>
                                    <en>SDK version</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <label>{{versionConf.sdk}}</label>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>系统版本</cn>
                                    <en>Sys version</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <label>{{versionConf.sys}}</label>
                            </div>
                        </div>
                        <hr class="my-5">
                        <div class="row my-3">
                            <div class="col-lg-2 offset-lg-1 lp-align-center">
                                <label>
                                    <cn>上传升级</cn>
                                    <en>upload packet</en>
                                </label>
                            </div>
                            <div class="col-lg-6">
                                <button type="button" class="btn border-3 btn-primary px-3 me-2" @click="showBootstrapModal('upload')"><cn>选择文件</cn><en>File</en></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <upload-modal :modal-title="'上传升级包&Upload'" :modal-show="showUploadModal" :modal-fade="true"
                      :upload-allow="['bin']" :upload-action="'/link/upd/uploadPatch.php'" :upload-count="1"
                      :upload-tip="'请把升级包拖动到此处...&Please drag the upgrade package here...'"
                      @upload-success="uploadSuccess" @upload-error="uploadError">
        </upload-modal>

        <upgrade-modal v-model:check-upgrade="checkUpgrade" :modal-fade="true"></upgrade-modal>
    </main>
</div>
<?php include ("./include/foot.php") ?>
<script src="assets/plugins/fileinput/js/fileinput.min.js" type="module"></script>
<script src="assets/plugins/fileinput/js/locales/zh.js" type="module"></script>
<script src="assets/plugins/fileinput/themes/fa6/theme.min.js" type="module"></script>
<script type="module">

    import vue from "./assets/js/vue.build.js?hash=879ea7dbc";
    import { rpc2,alertMsg,func,queryData,popover,formatDate,rebootConfirm,resetConfirm,clearReactiveObject,isEmpty } from "./assets/js/lp.utils.js?hash=e82520f08";
    import { useHardwareConf,useNetManagerConf,usePasswordConf,useNtpConf,useTimezoneConf,useVersionConf,useWpaConf } from "./assets/js/vue.hooks.js?hash=89523e901";
    import ignoreCustomElementPlugin from "./component/ignore.ele.plugin.js"
    import bootstrapSwitchComponent from "./component/switch.component.js"
    import languageOptionDirective from "./component/language.directive.js"
    import uploadComponent from "./component/upload.component.js"
    import upgradeComponent from "./component/upgrade.component.js"
    import loadingButtonComponent from "./component/loadbtn.component.js"
    import wifiFlagComponent from "./component/wifi.flag.Component.js"
    import antenanFlagComponent from "./component/ante.flag.component.js"
    import mutationObserver from './assets/plugins/polyfill/mutationobserver.esm.js';

    const { createApp,ref,reactive,watch,watchEffect,computed,onMounted } = vue;
    const app = createApp({
        directives:{
            "language-option": languageOptionDirective
        },
        components:{
            "bs-switch" : bootstrapSwitchComponent,
            "wifi-flag": wifiFlagComponent,
            "antenan-flag": antenanFlagComponent,
            "upload-modal": uploadComponent,
            "upgrade-modal": upgradeComponent,
            "loading-button": loadingButtonComponent
        },
        setup(props,context) {

            const { hardwareConf } = useHardwareConf();
            const { netManagerConf,updateNetManagerConf } = useNetManagerConf();
            const { wpaConf } = useWpaConf();
            const { updateUserPasswd } = usePasswordConf();
            const { ntpConf } = useNtpConf();
            const { timezoneConf } = useTimezoneConf();
            const { versionConf } = useVersionConf();

            const state = {
                netAdapter: reactive({}),
                wifiHandler: ref(null),
                wifiPopover: {},
                antenanHandler:ref(null),
                antenanPopover: {},
                flagStroke:ref("#cccccc"),
                flagColor:ref("#777777"),
                wifiRefresh: ref(false),
                wifiList:reactive([]),
                wifiPassword:ref(""),
                wifiConnectId:ref(""),
                sysTime: ref("1970-01-01 08:00:00"),
                timezoneCitys: reactive([]),
                cronDay: ref("never"),
                cronTime: ref("0"),
                userPasswd:reactive({}),
                showPasswd:reactive({}),
                showUploadModal:ref(false),
                checkLoading:ref(false),
                checkUpgrade:ref(false),
                macLock:ref(true)
            }

            watch(state.wifiHandler,() => {
                if(state.wifiHandler.value) {
                    if(Object.keys(state.wifiPopover).length > 0) {
                        state.wifiPopover.dispose();
                        state.wifiPopover = {};
                    }
                    state.wifiPopover = popover(state.wifiHandler.value, {
                        placement:"bottom",
                        trigger:"hover",
                        content:`<cn>请先插入USB WIFI网卡</cn><en>Please insert the USB WIFI network card first</en>`,
                    });
                    if(document.querySelector('a[href="#tab1"]'))
                        document.querySelector('a[href="#tab1"]').click();
                } else {
                    if(!state.wifiHandler.value && Object.keys(state.wifiPopover).length !== 0) {
                        state.wifiPopover.dispose();
                        state.wifiPopover = {};
                    }
                }
            })

            watch(state.antenanHandler, () => {
                if(state.antenanHandler.value) {
                    if(Object.keys(state.antenanPopover).length > 0) {
                        state.antenanPopover.dispose();
                        state.antenanPopover = {};
                    }
                    state.antenanPopover = popover(state.antenanHandler.value, {
                        placement:"bottom",
                        trigger:"hover",
                        content:`<cn>请先插入移动网卡</cn><en>Please insert the Cellular network card first</en>`,
                    })
                    if(document.querySelector('a[href="#tab1"]'))
                        document.querySelector('a[href="#tab1"]').click();
                } else {
                    if(!state.antenanHandler.value && Object.keys(state.antenanPopover).length !== 0) {
                        state.antenanPopover.dispose();
                        state.antenanPopover = {};
                    }
                }
            })
            
            watchEffect(()=>{
                if(!state.checkUpgrade.value)
                    state.checkLoading.value = false;

                if(wpaConf.length > 0 && state.wifiConnectId.value === "") {
                    state.wifiConnectId.value = wpaConf[0].ssid
                    state.wifiPassword.value = wpaConf[0].psk;
                }

                if(Object.keys(timezoneConf).length > 0 && state.timezoneCitys.length === 0)
                    onTimeAreaChange();
            })

            const getAdapterNetState = () => {
                rpc2("net.getState").then(data => {
                    clearReactiveObject(state.netAdapter);
                    Object.assign(state.netAdapter,data.interface);
                });
                setTimeout(getAdapterNetState,2000);
            }

            const hadIpv6 = computed(() => {
                return !isEmpty(hardwareConf) && hardwareConf.function.ipv6;
            });


            const onCopyIpv6Addr = addr => {
                const textarea = document.createElement("textarea");
                textarea.value = addr;
                document.body.appendChild(textarea);
                textarea.select();
                let success = document.execCommand("copy");
                document.body.removeChild(textarea);
                if (!success) {
                    alertMsg('<cn>复制失败，请手动复制</cn><en>Copy failed, please copy manually</en>', 'error');
                    return;
                }
                alertMsg('<cn>已复制</cn><en>Have copied</en>', 'success');
            }

            const updateDefNetwork = (dev) => {
                updateNetManagerConf().then(()=>{
                    if(dev === netManagerConf["gw"])
                        setTimeout(() => window.location.href="http://"+netManagerConf["interface"][dev]["ip"]+"/sys.php",1000)
                })
            }

            const enableWifi = state => {
                updateNetManagerConf("noTip").then(()=>{
                    if(state)
                        alertMsg('<cn>WIFI已启用</cn><en>WIFI enable successfully!</en>', 'success');
                    else
                        alertMsg('<cn>WIFI已关闭</cn><en>WIFI disable successfully!</en>', 'success');
                })
            }

            const refreshWifi = (tip = 'loading',refresh = true) => {
                const scanwifi = type => {
                    rpc2("net.scanWifi",[refresh]).then(data => {
                        if(data.length === 0)
                            data.push({ssid:state.wifiConnectId});
                        state.wifiList.splice(0, state.wifiList.length, ...data);
                        state.wifiRefresh.value = false;
                    })
                }
                if(tip === "noLoading") {
                    scanwifi(refresh);
                    return;
                }
                state.wifiRefresh.value = true;
                setTimeout(scanwifi,2000);
            }

            const connectWifi = () => {
                state.wifiPassword.value = state.wifiPassword.value.replace(/\s/g, '');
                if(state.wifiPassword.value.length < 8) {
                    alertMsg('<cn>WIFI密码格式错误，密码长度不能少于8位</cn><en>The wifi password format is wrong. The password length cannot be less than 8 characters!</en>', 'error');
                    return;
                }
                rpc2("net.setSimpleWifi", [state.wifiConnectId.value,state.wifiPassword.value]).then(data => {
                    if(data)
                        alertMsg('<cn>设置成功，如果长时间处于连接状态，请检查wifi密码是否正确</cn><en>The setting is successful. If you are connected for a long time, please check whether the wifi password is correct</en>', 'success');
                    else
                        alertMsg('<cn>设置失败</cn><en>Save failed!</en>', 'error');
                });
            }

            const onSetWifi = type => {
                const wlan = netManagerConf?.interface?.wlan0;
                if(wlan) {
                    wlan[type==="ipv6"?"ipv6_enable":type] = !wlan[type==="ipv6"?"ipv6_enable":type];
                    updateNetManagerConf('noTip').then(() => {
                        if(wlan[type==="ipv6"?"ipv6_enable":type])
                            alertMsg('<cn>'+type.toUpperCase()+'已启用</cn><en>'+type.toUpperCase()+' enable successfully!</en>', 'success');
                        else
                            alertMsg('<cn>'+type.toUpperCase()+'已关闭</cn><en>'+type.toUpperCase()+' disable successfully!</en>', 'success');
                    })
                }
            }

            const formatNetSpeed = speed => {
                if (speed < 1024) {
                    return speed + " kb/s";
                } else {
                    const formattedSpeed = parseFloat(speed / 1024).toFixed(1);
                    return formattedSpeed.replace(/\.0$/, '') + " mb/s";
                }
            }

            const syncTimeFromPc = () => {
                let time1 = formatDate("yyyy/MM/dd/hh/mm/ss");
                let time2 = formatDate("yyyy-MM-dd hh:mm:ss");
                func("/system/setSystemTime",{time1:time1,time2:time2}).then((data)=>{
                    if(data.status === "success") {
                        alertMsg('<cn>时间同步成功</cn><en>system time synchronization successful!</en>', 'success');
                        state.sysTime.value = time2;
                    }
                })
            }

            const onTimeAreaChange = (evt) => {
                queryData("/timezone/zoneinfo/"+timezoneConf.timeArea+"/").then(data=>{
                    state.timezoneCitys.splice(0, state.timezoneCitys.length, ...data);
                    if(evt !== undefined)
                        timezoneConf.timeCity = state.timezoneCitys[0].name;
                })
            }

            const saveSysConf = () => {
                Promise.all([
                    func("/conf/updateNtpConf", ntpConf),
                    func("/conf/updateTimezoneConf", timezoneConf),
                    func("/system/setSystemCrontab", { day: state.cronDay.value, time: state.cronTime.value }),
                ]).then((results) => {
                    if(results.every(ret => typeof ret === "boolean" ? ret : (ret?.status === "success")))
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                    else
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                })
            }

            const systemNetTest = () => {
                func("/system/systemNetTest",netManagerConf.onlineServer).then(data => {
                    const str = data.data.join();
                    if(str === "")
                        alertMsg('<cn>域名解析超时</cn><en>DNS timeout</en>!', 'error');
                    else if(str.indexOf(" 0%")>0)
                        alertMsg('<cn>网络可用</cn><en>Network available</en>！', 'success');
                    else
                        alertMsg('<cn>网络不可用</cn><en>Network Unavailable</en>！', 'error');
                })
            }

            const showBootstrapModal = type => {
                if(type === "upload")
                    state.showUploadModal.value = !state.showUploadModal.value;
            }

            const uploadSuccess = data => {
                const response = data.response;
                if(response.upload === "0")
                    rebootConfirm("上传成功，是否立即重启系统完成更新?");
                if(response.upload === "-1")
                    alertMsg("<cn>上传失败,升级包机型不匹配！</cn><en>Upload failed, upgrade package model does not match!</en>","error");
                if(response.upload === "-2")
                    alertMsg("<cn>上传失败,升级包与系统版本不匹配！</cn><en>Upload failed, the upgrade package does not match the system versio!</en>","error");
            }

            const uploadError = errMsg => {
                alertMsg(errMsg, 'error');
            }

            const checkUpdatePatch = () => {
                state.checkLoading.value = true;
                setTimeout(()=>{
                    state.checkUpgrade.value = true;
                },1000)
            }

            const updateRenderData = () => {
                Object.assign(state.userPasswd,{oldpwd: '',newpwd: '',confirm: ''});
                Object.assign(state.showPasswd,{wifipwd: false,oldpwd: false,newpwd: false,confirm: false});
            }

            const getSysAbortTime = () => {
                func("/system/getSystemTime").then(result => {
                    state.sysTime.value = result.data;
                    setInterval(()=>{
                        let currentTime = new Date(state.sysTime.value);
                        currentTime.setSeconds(currentTime.getSeconds() + 1);
                        const year = currentTime.getFullYear();
                        const month = String(currentTime.getMonth() + 1).padStart(2, '0');
                        const day = String(currentTime.getDate()).padStart(2, '0');
                        const hours = String(currentTime.getHours()).padStart(2, '0');
                        const minutes = String(currentTime.getMinutes()).padStart(2, '0');
                        const seconds = String(currentTime.getSeconds()).padStart(2, '0');
                        state.sysTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                    },1000);
                });

                func("/system/getSystemCrontab").then(result => {
                    if ( result.data === null || result.data.split( " " ).length !== 6 ) {
                        state.cronDay.value = "x";
                        state.cronTime.value = "0";
                    } else {
                        state.cronTime.value = result.data.split( " " )[ 1 ];
                        state.cronDay.value = result.data.split( " " )[ 4 ];
                    }
                });
            }

            const onListenThemeChange = () => {
                const html = document.querySelector('html');
                const updateFlagColor = () => {
                    const theme = html.getAttribute("data-bs-theme");
                    if(theme === 'default') {
                        state.flagStroke.value = "#cccccc";
                        state.flagColor.value = "#777777";
                    } else {
                        state.flagStroke.value = "#777777";
                        state.flagColor.value = "#cccccc";
                    }
                }
                updateFlagColor();
                const observer = new mutationObserver(mutations => {
                    mutations.forEach(mutation => {
                        if (mutation.type === 'attributes' && mutation.attributeName === "data-bs-theme") {
                            updateFlagColor();
                        }
                    });
                });
                const config = {
                    attributes: true,
                    attributeFilter: ["data-bs-theme"],
                    subtree: false
                };
                observer.observe(html, config);
            }

            onMounted(()=>{
                updateRenderData();
                getSysAbortTime();
                getAdapterNetState();
                refreshWifi("noLoading",false);
                onListenThemeChange();
            })

            return {...state,hardwareConf,netManagerConf,ntpConf,timezoneConf,versionConf,hadIpv6,onCopyIpv6Addr,
                enableWifi,refreshWifi,connectWifi,onSetWifi,updateNetManagerConf, updateUserPasswd,updateDefNetwork,
                showBootstrapModal,formatNetSpeed, uploadSuccess,uploadError,rebootConfirm,resetConfirm, onTimeAreaChange,
                syncTimeFromPc,saveSysConf,systemNetTest,checkUpdatePatch}
        }
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>