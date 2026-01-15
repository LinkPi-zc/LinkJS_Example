<?php

namespace Link\Ctx;

use Link\Basic;
class Login extends Basic
{
    private $passwd_path = '/link/config/passwd.json';
    public function onLogin($param)
    {
        session_start();
        $uname = $param["username"];
        $passwd = $param["password"];
        $json_string = file_get_contents($this->passwd_path);
        $data = json_decode($json_string, true);
        $_SESSION[ 'login' ] = "";
        for($i=0;$i<count($data);$i++)
        {
            if($data[$i]["name"]==$uname && $data[$i]["passwd"]==md5($passwd))
                $_SESSION[ 'login' ] = $uname;
        }
        if ( isset( $_SESSION[ 'login' ] ) && ( $_SESSION[ 'login' ] == "admin" || $_SESSION[ 'login' ] == "superadmin" ) )
            return $this->handleRet(array("index"=>$this->getIndexPage()),'success','登录成功','login successful');
        else
            return $this->handleRet('','error','用户名密码错误','the user name or password is incorrect');
    }

    public function hadLogin()
    {
        session_start();
        $hadLogin = false;
        if ( isset( $_SESSION[ 'login' ] ) && ( $_SESSION[ 'login' ] == "admin" || $_SESSION[ 'login' ] == "superadmin" ) )
            $hadLogin = true;
        return $this->handleRet($hadLogin,'success','获取登录状态成功','get login status successfully');
    }

    public function onLogout()
    {
        session_start();
        $_SESSION[ 'login' ] = "";
        return $this->handleRet('','success','登出成功','logout successful');
    }

    public function getIndexPage()
    {
        $project_conf_path = $this->rootPath.'/project.json';
        $indexPage = "index.php";
        if(file_exists($project_conf_path))
        {
            $project_conf = $this->load_conf($project_conf_path);
            $webView = $project_conf["web"];
            $indexPage = $webView["entryPage"];
        }
        return $indexPage;
    }
}
