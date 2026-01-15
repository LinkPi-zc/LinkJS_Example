<?php
use Link\Ctx\Login;
require __DIR__ . '/autoload.php';

session_start();
$request = $_SERVER['REQUEST_URI'];
if(!in_array($_SESSION['login'], ["admin", "superadmin"]))
{
    if(!in_array($request, ["/login.php", "/login.php?u=e"])) {
        header("Location:/login.php");
        exit();
    }
}
else
{
    if($request == "/login.php") {
        $login = new Login();
        $indexPage = $login->getIndexPage();
        header("Location:/".$indexPage);
        exit();
    }
}
?>
