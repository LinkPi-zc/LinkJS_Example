<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">
<head>
    <?php include ("./include/head.php") ?>
</head>
<body>
<?php include ("./include/menu.php") ?>
<div data-simplebar>
    <main class="page-content" id="app" v-cloak>
        <div class="row" v-if="Object.keys(config).length > 0">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>视频编码设置</cn>
                            <en>Video Codec</en>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-10 mx-auto">
                                <div class="row">
                                    <div class="col-lg-4 lp-align-center">
                                        <cn>分辨率</cn>
                                        <en>Video Size</en>
                                    </div>
                                    <div class="col-lg-8">
                                        <multiple-select v-model:value1="config.encv.width" v-model:value2="config.encv.height" split="x">
                                            <option value="-1x-1">auto</option>
                                            <option value="3840x2160">4K</option>
                                            <option value="1920x1080">1080p</option>
                                            <option value="1280x720">720p</option>
                                            <option value="640x360">360p</option>
                                            <option value="1080x1920">1080x1920</option>
                                            <option value="720x1280">720x1280</option>
                                            <option value="360x640">360x640</option>
                                        </multiple-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-10 mx-auto">
                                <div class="row">
                                    <div class="col-lg-4 lp-align-center">
                                        <cn>编码</cn>
                                        <en>Codec</en>
                                    </div>
                                    <div class="col-lg-8">
                                        <multiple-select v-model:value1="config.encv.codec" v-model:value2="config.encv.profile" split=",">
                                            <option value="h264,base">H.264 Base</option>
                                            <option value="h264,main">H.264 Main</option>
                                            <option value="h264,high">H.264 High</option>
                                            <option value="h265,main">H.265 Main</option>
                                            <option value="close,base" cn="关闭" en="Close" v-language-option></option>
                                        </multiple-select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-10 mx-auto">
                                <div class="row">
                                    <div class="col-lg-4 lp-align-center">
                                        <cn>码率控制</cn>
                                        <en>Rate control</en>
                                    </div>
                                    <div class="col-lg-8">
                                        <select class="form-select" v-model="config.encv.rcmode">
                                            <option value="cbr">CBR</option>
                                            <option value="vbr">VBR</option>
                                            <option value="avbr">AVBR</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-10 mx-auto">
                                <div class="row">
                                    <div class="col-lg-4 lp-align-center">
                                        <cn>码率</cn>
                                        <en>Bitrate</en>
                                    </div>
                                    <div class="col-lg-8">
                                        <input type="text" class="form-control" v-model.trim.lazy="config.encv.bitrate">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-10 mx-auto">
                                <div class="row">
                                    <div class="col-lg-4 lp-align-center">
                                        <cn>帧率</cn>
                                        <en>Framerate</en>
                                    </div>
                                    <div class="col-lg-8">
                                        <input type="text" class="form-control" v-model.trim.lazy="config.encv.framerate">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-10 mx-auto">
                                <div class="row">
                                    <div class="col-lg-4 lp-align-center">
                                        <cn>GOP(秒)</cn>
                                        <en>GOP(sec)</en>
                                    </div>
                                    <div class="col-lg-8">
                                        <input type="text" class="form-control" v-model.trim.lazy="config.encv.gop">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-10 mx-auto">
                                <div class="row">
                                    <div class="col-lg-4 lp-align-center">
                                        minQP
                                    </div>
                                    <div class="col-lg-8">
                                        <input type="text" class="form-control" v-model.trim.lazy="config.encv.minqp">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-10 mx-auto">
                                <div class="row">
                                    <div class="col-lg-4 lp-align-center">
                                        maxQP
                                    </div>
                                    <div class="col-lg-8">
                                        <input type="text" class="form-control" v-model.trim.lazy="config.encv.maxqp">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>音频编码设置</cn>
                            <en>Audio Codec</en>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-10 mx-auto">
                                <div class="row">
                                    <div class="col-lg-4 lp-align-center">
                                        <cn>音频编码</cn>
                                        <en>Audio Codec</en>
                                    </div>
                                    <div class="col-lg-8">
                                        <select class="form-select" v-model="config.enca.codec" >
                                            <option value="aac">AAC</option>
                                            <option value="aache">AAC-HE</option>
                                            <option value="pcma">PCMA</option>
                                            <option value="mp2">MPEG2</option>
                                            <option value="mp3">MP3</option>
                                            <option value="opus">OPUS</option>
                                            <option value="close" cn="关闭" en="close" v-language-option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-10 mx-auto">
                                <div class="row">
                                    <div class="col-lg-4 lp-align-center">
                                        <cn>采样率</cn>
                                        <en>Samplerate</en>
                                    </div>
                                    <div class="col-lg-8">
                                        <select class="form-select" v-model="config.enca.samplerate">
                                            <option value="-1">auto</option>
                                            <option value="16000">16K</option>
                                            <option value="32000">32K</option>
                                            <option value="44100">44.1K</option>
                                            <option value="48000">48K</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-10 mx-auto">
                                <div class="row">
                                    <div class="col-lg-4 lp-align-center">
                                        <cn>声道</cn>
                                        <en>Channel</en>
                                    </div>
                                    <div class="col-lg-8">
                                        <select class="form-select" v-model="config.enca.channels">
                                            <option cn="单声道" en="mono" value="1" v-language-option></option>
                                            <option cn="立体声" en="stereo" value="2" v-language-option></option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="row mt-3">
                            <div class="col-lg-10 mx-auto">
                                <div class="row">
                                    <div class="col-lg-4 lp-align-center">
                                        <cn>码率</cn>
                                        <en>Bitrate</en>
                                    </div>
                                    <div class="col-lg-8">
                                        <input type="text" class="form-control" v-model.trim.lazy="config.enca.bitrate">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <div class="card-header bg-transparent">
                        <div class="p-2 mb-0 d-flex align-items-end">
                            <cn>串流设置</cn>
                            <en>Stream config</en>
                        </div>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-lg-10 mx-auto">
                                <div class="row">
                                    <div class="col-lg-4 lp-align-center">
                                        <cn>开启</cn><en>Enable</en>
                                    </div>
                                    <div class="col-lg-8">
                                        <bs-switch v-model="config.push.enable"></bs-switch><span style="margin-left:10px;">{{speed}}kb/s</span>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col-lg-4 lp-align-center">
                                        <cn>地址</cn>
                                        <en>URL</en>
                                    </div>
                                    <div class="col-lg-8">
                                        <input type="text" class="form-control" v-model.trim.lazy="config.push.path"> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr />
        <div class="row mt-3">
            <div class="col-lg-12 text-center">
                <button type="button" class="btn border-3 btn-primary px-4" @click="updateConfig">
                    <cn>保存</cn>
                    <en>Save</en>
                </button>
            </div>
        </div>
    </main>
</div>
<?php include ("./include/foot.php") ?>

<script type="module">
    import ignoreCustomElementPlugin from "./component/ignore.ele.plugin.js"
    import bootstrapSwitchComponent from "./component/switch.component.js"
    import multipleSelectComponent from "./component/mselect.component.js";
    import languageOptionDirective from "./component/language.directive.js";
    import {alertMsg, callScript, queryData} from "./assets/js/lp.utils.js";
    import vue from "./assets/js/vue.build.js";

    const { createApp,ref,reactive,watchEffect,nextTick,onMounted } = vue;
    const app  = createApp({
        directives:{
            "language-option": languageOptionDirective
        },
        components:{
            "bs-switch": bootstrapSwitchComponent,
            "multiple-select": multipleSelectComponent
        },
        setup(prop,context){
            const config = reactive({});
            const speed = ref(0);

            const getConfig = () => {
                queryData("/config/config.json").then(data => {
                    Object.assign(config,data);
                })
            }

            const updateConfig = () => {
                callScript("/main/update",config).then(data => {
                    if(data.status === "success")
                        alertMsg('<cn>保存设置成功</cn><en>Save config successfully!</en>', 'success');
                    else
                        alertMsg('<cn>保存设置失败</cn><en>Save config failed!</en>', 'error');
                })
            }

            const getSpeed = () => {
                callScript("/main/getPushSpeed").then(data => {
                    if(data.status === "success")
                        speed.value=data.data;
                })
                setTimeout(getSpeed,2000);
            }

            onMounted(()=>{
                getConfig();
                getSpeed();
            });

            return { config, updateConfig, speed }
        }
    })
    app.use(ignoreCustomElementPlugin);
    app.mount('#app')
</script>
</body>
</html>