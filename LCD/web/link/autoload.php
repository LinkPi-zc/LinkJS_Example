<?php

function format_path($path_name): string
{
    $result = '';
    for($i=0;$i<strlen($path_name);$i++)
    {
        $path = $path_name[$i];
        if($i > 0)
        {
            if(ord($path)>= ord('A') && ord($path) <= ord('Z'))
                $result .= '_'.strtolower($path);
            else
                $result .= strtolower($path);
            continue;
        }
        $result .= strtolower($path);
    }
    return $result;
}

function autoload($class_name)
{
    $paths = explode("\\", $class_name);
    $file_path = __DIR__;
    for($i=0;$i<count($paths);$i++)
    {
        if($paths[$i] == 'Link')
            continue;
        if($i != count($paths)-1)
        {
            $file_path .= '/'.strtolower($paths[$i]);
            continue;
        }
        $file_path .= '/'.format_path($paths[$i]);
    }
    if(file_exists($file_path.'.php'))
        require_once $file_path.'.php';
}

spl_autoload_register('autoload');