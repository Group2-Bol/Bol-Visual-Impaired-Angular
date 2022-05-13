<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    $filePath = "../bol/src/assets/images/ml5.png";

    if(!unlink($filePath)) 
    {
        echo ("$filePath cannot be deleted due to a error that occured.");
    }
    else 
    {
        echo ("$filePath has been deleted.");
    }

?>