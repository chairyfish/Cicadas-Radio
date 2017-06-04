<?php
header("Content-Type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");

$servername = "192.168.104.3";
$username = "root";
$password = "zxj5470@A";
$dbname = "Hackday";$conn = new mysqli($servername, $username, $password,$dbname);
$conn->query("set names utf8");
$C=$_GET['Channel'];
$sql = "UPDATE thisChannel Set Value='".$C."' where 1";
$result = $conn->query($sql);
echo 'update~';
mysql_close($conn);
?>

