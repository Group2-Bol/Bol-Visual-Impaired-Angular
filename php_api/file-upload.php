<?php
  
  header("Access-Control-Allow-Origin: *");
  header("Access-Control-Allow-Methods: PUT, GET, POST");
  header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

  $folderPath = "../bol/src/assets/images/";

  $file_temp = $_FILES['file']['tmp_name'];
  $tmp1 = explode('.', $_FILES['file']['name']);
  $tmp2 = end($tmp1);
  $file_ext = strtolower($tmp2);
  $file = $folderPath . 'ml5' . '.'.$file_ext;
  move_uploaded_file($file_temp, $file);
  
?>