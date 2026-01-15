<?php

use Link\Ctx\Login;
require __DIR__ . '/autoload.php';

$login = new Login();
$result = json_decode($login->onLogin($_POST));

if($result->status == "success")
    header("Location:/".$result->data->index);
else
    header( "Location:/login.php?u=e" );
exit();

?>
