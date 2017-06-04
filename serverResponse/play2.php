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
$dbname = "Hackday";
$conn = new mysqli($servername, $username, $password,$dbname);
$conn->query("set names utf8");

$thisC=$_GET['Channel'];
$sql='select * from thisChannel';
$result=$conn->query($sql);
$row = $result->fetch_assoc();
$C=$row['Value'];

$sql = "SELECT count(Status)-1 Status,".$thisC." Channel FROM CurChannel where Status=0 and Channel='".$thisC."'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
	$results[]=$row;
  }
}
$sql = "SELECT Status,UNIX_TIMESTAMP(ID) ID,SName,Channel FROM CurChannel where Status=0 and Channel='".$thisC."'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $results[]=$row;
  }
}
$sql = "SELECT Status,UNIX_TIMESTAMP(ID) ID,SName,Channel FROM CurChannel where Status=1 and Channel='".$thisC."'";
$result = $conn->query($sql);
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $results[]=$row;
  }
}
echo json_encode_ex($results);
mysql_close($conn);
?>

