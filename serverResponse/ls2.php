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

$dir = "./phpfiles/";
$file = scandir($dir);
$num = count($file);
array_splice($file, 0, 1);
array_splice($file, 0, 1);

for ($i = 0; $i < $num; $i++) {
    if (strlen($file[$i]) >= 3) {
        $e = substr($file[$i], 0, 3);
        if ($e == "php") {
            array_splice($file, $i, 1);
        }else{
}}
}

$sql = "SELECT UNIX_TIMESTAMP(ID) ID,SName FROM MusicList ORDER BY ID ASC;";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
	$results[]=$row;
  }
echo json_encode_ex($results);
}
mysql_close($conn);
?>
