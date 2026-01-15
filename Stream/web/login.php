<?php include ("./link/session.php") ?>
<!doctype html>
<html lang="en">
<head>
    <?php include ("./include/head.php") ?>
</head>
<body>
<div class="login" id="app">
    <div class="top-header">
        <div class="navbar navbar-expand bg-transparent border-0 pe-4">
            <ul class="navbar-nav top-right-menu gap-2 flex-grow-1 d-flex justify-content-end">
                <li class="nav-item">
                    <a class="nav-link" style="font-size: 20px;">
                        <cn @click="updateSysLanguage('en')">En</cn>
                        <en @click="updateSysLanguage('cn')">中</en>
                    </a>
                </li>
            </ul>
        </div>
    </div>

    <div class="container-fluid auth-cover lp-align-center w-100 h-100">
        <div class="card border-3" style="width: 380px" @keydown.tab="handleTabKeyDown">
            <div class="card-body p-4">
                <div class="row">
                    <div class="col-lg-12 lp-align-center mb-2">
                        <img src="assets/img/logo.png" class="mb-2" style="max-height: 52px;">
                    </div>
                </div>
                <div class="form-body mt-2 pb-3">
                    <form @submit.prevent="handleSubmit" class="row g-3" action="/link/action.php" method="post" ref="form" autocomplete="off">
                        <div class="col-12">
                            <div class="input-group">
                                <div class="input-group-text border-0 lp-cursor-pointer"><i class="fa-solid fa-user"></i></div>
                                <input v-model.trim.lazy="username" type="text" class="form-control border-0 border-start" name="username">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="input-group">
                                <div class="input-group-text border-0 lp-cursor-pointer"><i class="fa-solid fa-key"></i></div>
                                <input v-model.trim.lazy="password" :type="!showPasswd ? 'password' : 'text'" class="form-control border-0 border-start input-passwd" name="password">
                                <div class="input-group-text border-0 lp-cursor-pointer font-16" @click="showPasswd = !showPasswd"><i :class="['fa-regular',{'fa-eye-slash':showPasswd},{'fa-eye ':!showPasswd}]"></i></div>
                            </div>
                        </div>
                        <div class="col-6">
                            <div class="form-check form-switch form-check-primary border-0">
                                <input class="form-check-input lp-cursor-pointer remember" type="checkbox" v-model="remember">
                                <label class="form-check-label"><cn>记住密码</cn><en>Remember Me</en></label>
                            </div>
                        </div>
                        <div class="col-12 text-center">
                            <div class="d-grid">
                                <button type="submit" class="btn  border-3 btn-primary"><cn>登录</cn><en>Login</en></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<?php include ("./include/foot.php") ?>

<script type="module">

    import { alertMsg,getUrlParam,isEmpty,updateSysLanguage } from "./assets/js/lp.utils.js";
    import ignoreCustomElementPlugin from "./component/ignore.ele.plugin.js";
    import vue from "./assets/js/vue.build.js?hash=879ea7dbc";

    const { createApp,ref,watch,onMounted } = vue;
    const app = createApp({
        setup(props,context) {


            const state = {
                form: ref(null),
                username: ref(""),
                password: ref(""),
                remember: ref(false),
                showPasswd:ref(false)
            }

            watch(state.remember,()=>{
                if(!state.remember.value) {
                    localStorage.removeItem("username");
                    localStorage.removeItem("password");
                }
            })

            const removeUrlParam = () => {
                const urlWithoutParams = window.location.href.split('?')[0];
                history.replaceState({}, document.title, urlWithoutParams);
            }

            const handleSubmit = () => {
                if(isEmpty(state.username.value) || isEmpty(state.password.value)) {
                    alertMsg("<cn>账号或密码不能为空</cn><en>Account or password cannot be empty</en>", "error")
                    return;
                }

                if(state.remember.value) {
                    localStorage.setItem("username",state.username.value);
                    localStorage.setItem("password",state.password.value);
                }

                state.form.value.submit();
            }

            const handleTabKeyDown = event => {
                if(event.target.classList.contains('input-passwd'))
                    document.querySelector(".remember").classList.add("tab");
                else
                    document.querySelector(".remember").classList.remove("tab");
            }

            onMounted(()=>{
                let uname = localStorage.getItem("username");
                let passwd = localStorage.getItem("password");
                if(uname !== null && passwd !== null) {
                    state.remember.value = true;
                    state.username.value = uname;
                    state.password.value = passwd;
                }

                let param = getUrlParam("u");
                if(param === "e") {
                    alertMsg("<cn>账号或密码错误</cn><en>The account or password is incorrect</en>","error")
                    removeUrlParam();
                }
            })
            return { ...state,updateSysLanguage,handleTabKeyDown,handleSubmit }
        },
    });
    app.use(ignoreCustomElementPlugin);
    app.mount('#app');
</script>
</body>
</html>