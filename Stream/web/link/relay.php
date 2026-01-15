<?php

namespace Link;
use Exception;
use ReflectionClass;
use ReflectionException;

require __DIR__ . '/autoload.php';

$param = file_get_contents("php://input");
if(is_null(json_decode($param)))
    $param = json_encode($_POST);
$param = json_decode($param,true);

try
{
    $query = explode("/", $param['url']);
    $class_name="";$func_name="";
    for($i=0;$i<count($query);$i++)
    {
        if(empty($query[$i]))
            continue;

        if($i != count($query)-1)
        {
            if(empty($class_name))
                $class_name = ucfirst($query[$i]);
            else
                $class_name=$class_name.'\\'.ucfirst($query[$i]);
        }
        else
        {
            $func_name = $query[$i];
        }
    }
    $class_name ="Link\\Ctx\\".$class_name;
    $class = new ReflectionClass($class_name);
    $func = $class->getMethod($func_name);
    $result = $func->invokeArgs($class->newInstance(), [$param['data']]);
    echo $result;
}
catch(ReflectionException $rex)
{
    echo Basic::handleRet('','error','没有找到对应接口','no corresponding interface was found');
}
catch (Exception $ex)
{
    echo Basic::handleRet('','error',$ex->getMessage(),$ex->getMessage());
}