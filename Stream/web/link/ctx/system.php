<?php

namespace Link\Ctx;

use Link\Basic;
use Link\Rpc\RpcClient;

class System extends Basic
{
    public function getSystemTime()
    {
        exec('date +"%Y-%m-%d %H:%M:%S"',$output);
        return $this->handleRet($output[0],'success','保存成功','save successfully');
    }

    public function setSystemTime($param)
    {
        exec( "/link/bin/rtc -s time " . $param[ 'time1' ]. " '".$param[ 'time2' ]."'" );
        exec( "/link/bin/rtc -g time" );
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function getSystemCrontab()
    {
        exec( 'crontab -u root -l | grep /link/shell/reboot.sh',$output);
        return $this->handleRet($output[0],'success','获取成功','get successfully');
    }

    public function setSystemCrontab($param)
    {
        if ( $param[ 'day' ] == "x" )
        {
            exec("sed -i '1s/.*/ /' /var/spool/cron/crontabs/root");
            exec("cp -a /var/spool/cron/crontabs/root /link/config/auto/root.cron");
        }
        else {
            $cron = '0 ' . $param[ 'time' ] . ' * * ' . $param[ 'day' ];
            exec("sed -i '1s/.*/".$cron." \/link\/shell\/reboot.sh/' /var/spool/cron/crontabs/root");
            exec("cp -a /var/spool/cron/crontabs/root /link/config/auto/root.cron");
        }
        return $this->handleRet("",'success','保存成功','save successfully');
    }

    public function systemReboot()
    {
        exec( '/link/shell/reboot.sh' );
    }

    public function systemReset()
    {
        exec( '/link/shell/reset.sh' );
    }

    public function systemNetTest($param)
    {
        exec('ping '.$param.' -c1 -W 1',$output);
        return $this->handleRet($output,'success','执行成功','exec successfully');
    }

    public function formatBytes($param)
    {
        $config = [
            '4' => 'TB',
            '3' => 'GB',
            '2' => 'MB',
            '1' => 'KB'
        ];
        foreach ($config as $key => $value) {
            if ($param >= pow(1024, $key)) {
                return number_format($param / pow(1024, $key), 2) . $value;
            }
        }
        return '0KB';
    }

    public function getMountDiskSpace()
    {
        $mountDir = '/root/usb';
        $output = shell_exec('df -h ' . $mountDir);
        if(strpos($output, $mountDir) != false) {
            $lines = explode("\n", trim($output));
            $dataLine = $lines[count($lines) - 1];
            $totalSpace = preg_split('/\s+/', $dataLine)[1];
            $usedSpace = preg_split('/\s+/', $dataLine)[2];
            $result = array(
                'total'=> $totalSpace,
                'used' => $usedSpace
            );
            return $this->handleRet($result,'success','获取成功','get disk space successfully');
        }
        return $this->handleRet('','error','磁盘未挂载','disk is not mounted');
    }

    function umountDisk()
    {
        exec("umount -l /root/usb");
        exec("sync");
        exec("df -h | grep /root/usb | wc -l",$output);
        if($output[0] == "0")
            return $this->handleRet("",'success','卸载成功','Uninstall successfully');
        else
            return $this->handleRet("",'error','卸载失败,请检测磁盘是否被占用','Uninstallation failed, please check if the disk is occupied');
    }

    function formatReady($param)
    {
        $psd = $param["psd"];
        $json_string = file_get_contents( '/link/config/passwd.json' );
        $data = json_decode( $json_string, true );
        if($data[0]["passwd"] == md5($psd))
            return $this->handleRet("",'success','正在格式化，请勿关闭此页面','Do not close this page while formatting');
        else
            return $this->handleRet("",'error','格式化失败，密码错误','Formatting failed because the password is incorrect');
    }

    function formatDisk($param)
    {
        exec("/link/shell/fusb.sh ".$param["disk"]." ".$param["format"]);
        return $this->handleRet("",'success','格式化完成','Formatting completed');
    }

    function checkFormatProgress()
    {
        $command1 = "ps aux | grep 'mkfs.ext4 -T largefile /dev/sda1' | grep -v grep";
        $command2 = "ps aux | grep 'mkfs.vfat -F 32 /dev/sda1' | grep -v grep";
        $output1 = shell_exec($command1);
        $output2 = shell_exec($command2);
        if (!empty($output1) || !empty($output2))
            return $this->handleRet(-1,'success','格式化进行中','Formatting in progress');
        return $this->handleRet(0,'success','格式化完成','Formatting completed');
    }

    function mountDisk()
    {
        exec("/link/shell/mount.sh",$output);
        if($output[0] == "0")
            return $this->handleRet("",'error','外部存储设备挂载失败','The external storage device failed to be mounted');
        return $this->handleRet("",'success','挂载成功','Mount successfully');
    }


    function getLocalDisk()
    {
        $hardware = json_decode(file_get_contents("/link/config/hardware.json"));
        $chip = $hardware->chip;
        if($chip == "HI3516CV610")
            $output = shell_exec("ls /dev/mmcblk*");
        else
            $output = shell_exec("ls /dev/sd*");
        $arys = explode("\n",$output);

        if($chip != "HI3520DV400" && $chip != "HI3521DV100" && $chip != "HI3531DV100" && $chip != "HI3516CV610")
        {
            $diskIdx=shell_exec('. /link/shell/util/func.sh && locatePart record.ext4');
            $arys[] = "/dev/mmcblk0p".$diskIdx;
        }

        $retList = array();
        for($i=0;$i<count($arys);$i++) {
            $item = $arys[$i];
            if(empty($item) || substr_count($output, $item) > 1)
                continue;
            $size = shell_exec("blockdev --getsize64 ".$item);
            $diskInfo = array(
                "name" => $item,
                "size" => $this->formatBytes($size)
            );
            $retList[] = $diskInfo;
        }
        return $this->handleRet($retList,'success','获取成功','Get local devices successfully');
    }

    function reloadRtty() {
        exec("pkill rtty");
    }

    function tailscale($param) {
        exec("/link/shell/tailscale.sh ".$param["cmd"],$output,$return_var);
        return $this->handleRet(array('out' => join("\n", $output), 'ret' => $return_var),'success','执行完成','exec successfully');
    }
}
