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
        }
}
}

print(json_encode_ex($file));

?>
