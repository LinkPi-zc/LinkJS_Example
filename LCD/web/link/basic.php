<?php
namespace Link;

use Exception;
class Basic
{
    protected $rootPath;
    public function __construct()
    {
        $developer_path = '/link/script/developer.json';
        $data = $this->load_conf($developer_path);
        $this->rootPath = "/link/script/" . $data["current"];
    }

    protected static function load_conf($path,$type = true): array
    {
        $json_str = file_get_contents($path);
        if(is_null($json_str) || $json_str == '')
            return array();
        $json = json_decode($json_str,$type);
        if(is_null($json))
            return array();
        return $json;
    }

    protected static function check_args($params)
    {
        if(is_null($params))
            throw new Exception("参数格式错误&&param format error");
    }

    public static function handleRet($data, $status, $msg_cn, $msg_en): string
    {
        session_start();
        if(!isset($_SESSION["lang"]))
        {
            $langConf = Basic::load_conf('/link/config/lang.json');
            $lang = $langConf['lang'];
            $_SESSION["lang"] = $lang;
        }
        else
        {
            $lang = $_SESSION["lang"];
        }

        if(strpos($msg_cn,'&&'))
        {
            $msg_array = explode("&&", $msg_cn);
            if($lang == 'cn')
                $msg = $msg_array[0];
            else
                $msg = $msg_array[1];
        }
        else
        {
            if($lang == 'en')
                $msg = $msg_en;
            else
                $msg = $msg_cn;
        }

        $retVal = array(
            'data' => $data,
            'status' => $status,
            'msg' => $msg
        );
        header('Content-Type: application/json');
        return json_encode($retVal,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT);
    }
}