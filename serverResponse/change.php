<?php
header("Content-Type: application/json;charset=utf-8");
header("Access-Control-Allow-Origin: *");

function json_encode_ex($value){
    if (version_compare(PHP_VERSION, '5.4.0', '<')) {
        $str = json_encode($value);
        $str = preg_replace_callback(
            "#\\\u([0-9a-f]{4})#i",
            function ($matchs) {
                return iconv('UCS-2BE', 'UTF-8', pack('H4', $matchs[1]));
            },
            $str
        );
        return $str;
    } else {
        return json_encode($value, JSON_UNESCAPED_UNICODE);
    }
}

$servername = "192.168.104.3";
$username = "root";
$password = "zxj5470@A";
$dbname = "Hackday";$conn = new mysqli($servername, $username, $password,$dbname);
$conn->query("set names utf8");
$thisID=$_GET['ID'];
$thisS=$_GET['S'];
if($thisID==null){
  echo 'params valid!';
}else{
if($thisS==null)$thisS=1;
$sql = "UPDATE CurPlayList Set Status=".$thisS."  WHERE UNIX_TIMESTAMP(ID)='".$thisID."'";
$result = $conn->query($sql);
echo 'update~';
}
mysql_close($conn);
?>

