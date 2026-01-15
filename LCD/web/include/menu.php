<div id="menu">
    <menu class="menu">
        <header class="top-header">
            <nav class="navbar navbar-expand justify-content-between z-9">
                <div class="btn-toggle-menu" @click="onToggleMenu">
                    <i class="fa-solid fa-bars"></i>
                </div>
                <search-setting></search-setting>
                <ul class="navbar-nav top-right-menu gap-2">
                    <li class="nav-item">
                        <lang-option></lang-option>
                    </li>
                    <li class="nav-item">
                        <usb-option></usb-option>
                    </li>
                </ul>
            </nav>
        </header>

        <aside class="sidebar-wrapper">
            <div class="sidebar-header">
                <div class="logo-icon lp-cursor-pointer flex-grow-1" style="white-space: nowrap;overflow: hidden">
                    <img src="assets/img/logo.png" class="mt-1" style="max-height: 33px;">
                </div>
                <div class="sidebar-close flex-grow-0" @click="onCloseSidebar">
                    <i class="fa-solid fa-xmark"></i>
                </div>
            </div>
            <div class="sidebar-nav" ref="simplebarEle">
                <ul class="metismenu" ref="metismenuEle">
                    <li class="menu-label"><cn>基本设置</cn><en>Basic</en></li>
                    <li>
                        <a href="index.php">
                            <div class="parent-icon"><i class="fa-solid fa-gear"></i></div>
                            <div class="menu-title"><cn>设置页面</cn><en>Config</en></div>
                        </a>
                    </li>
                    <li>
                        <a href="player.php">
                            <div class="parent-icon"><i class="fa-solid fa-play-circle"></i></div>
                            <div class="menu-title"><cn>预览</cn><en>Preview</en></div>
                        </a>
                    </li>
                    <li>
                        <a href="sys.php">
                            <div class="parent-icon"><i class="fa-solid fa-gear"></i></div>
                            <div class="menu-title"><cn>系统设置</cn><en>System</en></div>
                        </a>
                    </li>
                </ul>
            </div>
            <div class="sidebar-bottom">
                <div class="d-flex align-items-center px-3 gap-3 w-100 h-100" data-bs-toggle="dropdown">
                    <div class="user-icon">
                        <i class="fa-regular fa-user"></i>
                    </div>
                    <div class="user-info">
                        <h5 class="mb-0 user-name">Admin</h5>
                        <p class="mb-0 user-designation"><cn>系统管理员</cn><en>administrator</en></p>
                    </div>
                    <div class="logout-icon" @click="onLogout">
                        <i class="fa-solid fa-right-from-bracket"></i>
                    </div>
                </div>
            </div>
        </aside>
    </menu>
</div>
<script type="module">
    import vue from "../assets/js/vue.build.js";
    import Metismenu from '../assets/plugins/metismenu/js/metisMenu.esm.js';
    import { func,updateSysLanguage } from "../assets/js/lp.utils.js";
    import ignoreCustomElementPlugin from "../component/ignore.ele.plugin.js"
    import langOptionComponent from "../component/lang.component.js"
    import usbOptionComponent from "../component/usb.opt.component.js"
    import mutationObserver from '../assets/plugins/polyfill/mutationobserver.esm.js';

    const { createApp,ref,reactive,watchEffect,watch,nextTick,onMounted } = vue;
    const menu = createApp({
        components:{
            "lang-option": langOptionComponent,
            "usb-option": usbOptionComponent
        },
        setup() {

           const state = {
               simplebarEle: ref(null),
               metismenuEle: ref(null),
               isMenuToggled : ref(false),
               simplebar: null,
           }

           const onLogout = () => {
               func("/login/onLogout")
                   .then((ret)=>{
                       if(ret.status === "success")
                           location.href = "/";
                   });
           }

           watch(state.isMenuToggled,() => {
               const body = document.querySelector('body');
               if(state.isMenuToggled.value)
                   body.classList.add('toggled');
               else
                   body.classList.remove('toggled');
           })

            const observeMenuChanges = element => {
                const observer = new mutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                            const target = mutation.target;
                            if (target.classList.contains('mm-active'))
                                setTimeout(()=> state.simplebar.recalculate(),230);
                        }
                    });
                });

                observer.observe(element, {
                    attributes: true,
                    subtree: true,
                    attributeFilter: ['class'],
                });
            }

           const onToggleMenu = () => {
               state.isMenuToggled.value = !state.isMenuToggled.value;
               localStorage.setItem("menu-toggled",state.isMenuToggled.value);
           }

           const onCloseSidebar = () => {
               state.isMenuToggled.value = false;
               localStorage.setItem("menu-toggled",state.isMenuToggled.value);
           }

           onMounted(()=>{
               state.isMenuToggled.value = localStorage.getItem("menu-toggled") ? JSON.parse(localStorage.getItem("menu-toggled")) : false;
               nextTick(()=>{
                   let as = document.querySelectorAll(".sidebar-wrapper .metismenu li a");
                   for (let i = 0; i < as.length; i++) {
                       if (as[i].href === window.location.protocol+"//"+window.location.host+""+window.location.pathname) {
                           as[i].classList.add("active");
                           let parent = as[i].parentElement;
                           while (parent && parent.tagName === "LI") {
                               parent.classList.add("mm-active");
                               parent = parent.parentElement;
                               if (parent && parent.tagName === "UL")
                                   parent.classList.add("mm-show");
                               parent = parent.parentElement;
                           }
                           break;
                       }
                   }
                   new Metismenu(state.metismenuEle.value);
                   state.simplebar = new SimpleBar(state.simplebarEle.value);
                   observeMenuChanges(state.metismenuEle.value);
               })
           });

           return {...state,onLogout, onToggleMenu,onCloseSidebar,updateSysLanguage}
       }
    });
    menu.use(ignoreCustomElementPlugin);
    menu.mount('#menu');
</script>