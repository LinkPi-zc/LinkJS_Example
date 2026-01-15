<?php include("./link/session.php") ?>
<!doctype html>
<html lang="uft-8">

<head>
    <?php include("./include/head.php") ?>
</head>

<body>
<?php include("./include/menu.php") ?>
<div data-simplebar>
    <main class="page-content" id="app" v-cloak>
        <div class="row">
            <div class="col-lg-10 mt-2 mb-2">
                <h5-player :url="playerUrl" :canplay="true" :codec="playerCodec" :audio="playerAudio"
                           :protocol="playerProtocol" :buffer="bufferTime"></h5-player>
            </div>
        </div>
    </main>
</div>
<?php include("./include/foot.php") ?>

<script type="module">
    import ignoreCustomElementPlugin from "./component/ignore.ele.plugin.js"
    import h5PlayerComponent from "./component/player.component.js";
    import languageOptionDirective from "./component/language.directive.js";
    import {queryData} from "./assets/js/lp.utils.js";
    import vue from "./assets/js/vue.build.js";

    const {createApp, ref, reactive, watchEffect, nextTick, onMounted} = vue;
    const app = createApp({
        directives: {
            "language-option": languageOptionDirective
        },
        components: {
            "h5-player": h5PlayerComponent
        },
        setup(prop, context) {
            const config = reactive({});

            const state = {
                playerUrl: ref(""),
                playerCodec: ref("none"),
                playerAudio: ref(true),
                playerProtocol: ref("rtmp"),
                bufferTime: ref(200)
            }

            const getConfig = () => {
                queryData("config/config.json").then(data => {
                    Object.assign(config, data);
                    state.playerUrl.value = `http://${location.host}/flv?app=live&stream=preview`;
                    state.playerCodec.value = data.encv.codec;
                })
            }


            onMounted(getConfig);
            return {...state}
        }
    })
    app.use(ignoreCustomElementPlugin);
    app.mount('#app')
</script>
</body>

</html>