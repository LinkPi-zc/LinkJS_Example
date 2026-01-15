<?php

namespace Link\Ctx;

use Link\Basic;

class Conf extends Basic
{
    private function readFile($path)
    {
        if (!is_file($path))
            return null;
        $content = file_get_contents($path);
        if ($content === false)
            return null;
        $json = json_decode($content, true);
        if (json_last_error() === JSON_ERROR_NONE)
            return $json;
        return $content;
    }
    
    public function handleSystemConfig($param)
    {
        if (empty($param['name'])) {
            return $this->handleRet("", 'error', '参数错误', 'Invalid parameter');
        }
        $targetName = $param['name'];
        $basePath   = '/link/config';

        $configPath = "{$basePath}/{$targetName}";
        $config = $this->readFile($configPath);
        if (!$config)
            return $this->handleRet("", 'error', '配置文件不存在或格式错误', 'Config file missing or invalid format');
        return $this->handleRet($config, 'success', '获取成功', 'get config successfully');
    }

    public function updateLangConf($param)
    {
        $lang = array("lang"=> $param);
        file_put_contents( "/link/config/lang.json", json_encode($lang,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updatePasswdConf($param)
    {
        $oldpwd = $param['oldpwd'];
        $newpwd = $param['newpwd'];
        $confirm = $param['confirm'];
        $data = json_decode( file_get_contents( '/link/config/passwd.json' ), true );
        if ($data[0]["passwd"] != md5($oldpwd))
            return $this->handleRet("",'error','原密码错误','Original password wrong');

        if ($newpwd != $confirm)
            return $this->handleRet("",'error','密码不一致','Password inconformity');

        $data[0][ "passwd" ] = md5($newpwd);
        file_put_contents( '/link/config/passwd.json', json_encode($data,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','修改成功','save successfully');
    }

    public function updateThemeConf($param)
    {
        file_put_contents( '/link/config/theme.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT) );
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateDiskConf($param)
    {
        file_put_contents( '/link/config/misc/disk.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT) );
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    function saveConfigFile($param) {
        file_put_contents( "/link/config/".$param["path"], $param['data'] );
        return json_encode(array("result" => "OK"),JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
    }

    public function updateTailscaleConf($param)
    {
        file_put_contents( '/link/config/rproxy/tailscale.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateNtpConf($param)
    {
        file_put_contents( '/link/config/ntp.json', json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateTimezoneConf($param)
    {
        $area = $param["timeArea"];
        $city = $param["timeCity"];
        exec("cp /link/config/misc/timezone/zoneinfo/".$area."/".$city." /etc/localtime");
        file_put_contents( "/link/config/misc/timezone/tzselect.json",json_encode($param,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateFrpEnableConf($param)
    {
        $service = json_decode( file_get_contents( '/link/config/service.json' ), true );
        $service["frp"] = $param;
        file_put_contents( '/link/config/service.json', json_encode($service,JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT));
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function updateFrpcConf($param)
    {
        file_put_contents( '/link/config/rproxy/frpc.ini', $param);
        return $this->handleRet("",'success','保存成功','save successfully');
    }
}
