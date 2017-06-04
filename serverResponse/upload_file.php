<?php

if ($_FILES["file"] == null) {
    echo 'is null!!!';
}
if ($_FILES["file"]["error"] > 0) {
    echo "Error: " . $_FILES["file"]["error"] . "<br />";
} else {
    echo "Upload: " . $_FILES["file"]["name"] . "<br />";
    echo "Type: " . $_FILES["file"]["type"] . "<br />";
    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
}
$timestamp = date('Y-m-d H:i:s');
$intTime=strtotime($timestamp);
if (file_exists("phpfiles/" . $_FILES["file"]["name"])) {
    echo $_FILES["file"]["name"] . " 文件已经存在。 ";
} else {

    $servername = "192.168.104.3";
    $username = "root";
    $password = "zxj5470@A";
    $dbname = "Hackday";
    $conn = new mysqli($servername, $username, $password, $dbname);
    $conn->query("set names utf8");
    $filename = $_FILES["file"]["name"];
    $sql = "INSERT INTO MusicList VALUES('".$timestamp."','".$_FILES["file"]["name"]."')";
    $result = $conn->query($sql);


    $sql='select * from thisChannel';
    $result=$conn->query($sql);
    $row = $result->fetch_assoc();
    $C=$row['Value'];
    $sql = "INSERT INTO CurChannel(ID,SName,Channel) VALUES('".$timestamp."','".$_FILES["file"]["name"]."','".$C."')";
    $conn->query($sql);

//    if($result==false)echo '同步失败';
//    else echo '数据库已同步~';
    move_uploaded_file($_FILES["file"]["tmp_name"], "phpfiles/" . $intTime . '.mp3');
}

?>



