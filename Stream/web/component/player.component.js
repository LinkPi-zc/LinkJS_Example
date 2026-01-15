import vue from "../assets/js/vue.build.js?hash=879ea7dbc";
import {isEmpty} from "../assets/js/lp.utils.js";
const {ref, toRefs, watchEffect, onMounted} = vue;

const h5PlayerComponent = {
    template: `<div style="width:100%; padding-bottom: 56.25%;  position: relative;">
                    <video autoplay controls muted style="width:100%;height: 100%; position: absolute; background: #555;" ref="videoHandler"></video>
                    <div style="position: absolute;width: 100%;height: 100%;z-index: 0" ref="jessHandler"></div>
                    <video autoplay controls muted style="width:100%;height: 100%; position: absolute; background: #555;" ref="rtcHandler"></video>
                    <div class="lp-video-cloud" ref="cloudHandler">
                        <div class="loading"></div>
                    </div>
              </div>`,
    props: {
        url: {
            type: String,
            default: ""
        },
        codec: {
            type: String,
            default: ""
        },
        audio: {
            type: Boolean,
            default: false
        },
        protocol: {
            type: String,
            default: "rtmp"
        },
        buffer: {
            type: Number,
            default: 200
        },
        canplay: {
            type: Boolean,
            default: true
        }
    },
    setup(props, context) {

        const {url, codec, audio, buffer, canplay, protocol} = toRefs(props);

        const state = {
            videoHandler: ref(null),
            jessHandler: ref(null),
            rtcHandler: ref(null),
            cloudHandler: ref(null),
            hadInitPlayer: false,
            flvJsModule: {},
            h5Player: {},
            xmlhttp: null,
            rtcConnection: null
        }

        const setupWebRTCConnection = offer => {
            if (state.rtcConnection !== null) {
                state.rtcConnection.close();
                state.rtcConnection = null;
            }

            let targetHost = url.value.replace(/^https?:\/\//i, '').split('/')[0];
            targetHost = targetHost.split(':')[0];
            offer = offer.replace(/127.0.0.1/g, targetHost);

            state.rtcConnection = new RTCPeerConnection();
            state.rtcConnection.onicecandidate = event => {
                if (event.candidate) {
                    //console.log('Remote ICE candidate:', event.candidate.candidate);
                } else {
                    //console.log('All ICE candidates have been sent');
                }
            };

            state.rtcConnection.ontrack = event => {
                state.rtcHandler.value.srcObject = event.streams[0];
            };

            state.rtcConnection.setRemoteDescription({type: 'offer', sdp: offer})
                .then(() => {
                    return state.rtcConnection.createAnswer();
                })
                .then(answer => {
                    return state.rtcConnection.setLocalDescription(answer);
                })
                .catch(error => {
                    console.error('Error during WebRTC connection setup:', error);
                });
        }

        const initPlayer = async () => {
            if (isEmpty(url.value)) return;

            if (protocol.value === "rtmp") {
                if (codec.value === "h265") {
                    if (!state.jessHandler.value)
                        return;
                    state.videoHandler.value.style.display = 'none';
                    state.rtcHandler.value.style.display = 'none';
                    state.jessHandler.value.style.display = 'block';
                    if (!window.Jessibuca)
                        await import('../assets/plugins/jessibuca/jessibuca.js');
                    state.h5Player = new Jessibuca({
                        container: state.jessHandler.value,
                        videoBuffer: buffer.value / 1000,
                        decoder: "assets/plugins/jessibuca/decoder.js",
                        isResize: false,
                        audio: JSON.parse(audio.value),
                        operateBtns: {
                            fullscreen: true,
                            play: true,
                            audio: JSON.parse(audio.value),
                        },
                        forceNoOffscreen: true,
                        isNotMute: false,
                    });
                    state.h5Player.play(url.value);
                    state.h5Player.on("play", (flag) => {
                        state.cloudHandler.value.style.display = 'none'
                    })
                } else {
                    if (!state.videoHandler.value)
                        return;
                    state.videoHandler.value.style.display = 'block';
                    state.rtcHandler.value.style.display = 'none';
                    state.jessHandler.value.style.display = 'none';
                    if (!window.flvjs)
                        await import('../assets/plugins/flvjs/flv.js');
                    state.h5Player = flvjs.createPlayer({
                        type: 'flv',
                        url: url.value,
                        hasAudio: JSON.parse(audio.value)
                    });
                    state.h5Player.attachMediaElement(state.videoHandler.value);
                    state.h5Player.load();
                    state.h5Player.play();

                    state.videoHandler.value.addEventListener("canplay", () => {
                        state.cloudHandler.value.style.display = 'none'
                    });
                }
            } else {
                if (!state.rtcHandler.value)
                    return;
                state.videoHandler.value.style.display = 'none';
                state.rtcHandler.value.style.display = 'block';
                state.jessHandler.value.style.display = 'none';

                state.rtcHandler.value.addEventListener("canplay", () => {
                    state.cloudHandler.value.style.display = 'none'
                });

                if (state.xmlhttp === null)
                    state.xmlhttp = new XMLHttpRequest();
                state.xmlhttp.onreadystatechange = function () {
                    if (state.xmlhttp.readyState === 4 && state.xmlhttp.status === 200) {
                        const offer = state.xmlhttp.response;
                        setupWebRTCConnection(offer);
                    } else if (state.xmlhttp.readyState === 4) {
                        console.error('Failed to retrieve the offer:', state.xmlhttp.status, state.xmlhttp.statusText);
                    }
                };
                state.xmlhttp.open("GET", url.value, true);
                state.xmlhttp.send();
            }

            state.hadInitPlayer = true;
        }
        const destroyPlayer = () => {
            if (Object.keys(state.h5Player).length > 0) {
                if (state.h5Player.hasOwnProperty("unload")) {
                    state.h5Player.unload();
                    state.h5Player.detachMediaElement();
                }
                state.h5Player.destroy();
                state.h5Player = {};
            }
            if (state.rtcConnection) {
                state.rtcConnection.close();
                state.rtcConnection = null;
            }
            state.cloudHandler.value.style.display = 'flex';
            state.videoHandler.value.removeEventListener("canplay", () => {
            });
            state.rtcHandler.value.removeEventListener("canplay", () => {
            });
            state.hadInitPlayer = false;
        }
        const checkDelay = () => {
            // if (Object.keys(state.h5Player).length > 0 && state.h5Player.hasOwnProperty("buffered") && state.h5Player.buffered.length > 0) {
            //     if (state.h5Player.buffered.end(0) - state.h5Player.currentTime > 1.5) {
            //         state.h5Player.currentTime = state.h5Player.buffered.end(0) - 0.2;
            //     }
            // }
            // setTimeout(checkDelay,1000);
        }

        watchEffect(async () => {
            if (canplay.value && !isEmpty(url.value) && codec.value) {
                if (state.hadInitPlayer)
                    destroyPlayer();
                await initPlayer();
                //setTimeout(initPlayer, 300);
            } else {
                if (state.hadInitPlayer)
                    destroyPlayer();
            }
        })

        onMounted(async () => {
            const play = canplay.value && url.value &&
                (codec.value.toLowerCase() === "h264" || codec.value.toLowerCase() === "h265") &&
                (protocol.value.toLowerCase() === "rtmp" || protocol.value.toLowerCase() === "webrtc");

            if (play && !state.hadInitPlayer)
                await initPlayer();

            checkDelay();
        });

        return {...state}
    }
};

export default h5PlayerComponent;