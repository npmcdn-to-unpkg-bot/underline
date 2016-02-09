<?php
header('Access-Control-Allow-Origin: *');
$client_id = "1AxdkXwVlYbjD2uYl_q1";
$client_secret = "HDsS0DZXdq";
$url = "https://openapi.naver.com/v1/search/book.xml?query=삼국지";
$is_post = true;

//if( isset($_GET['query']) ) $url = $url . "?query=" . $_GET['query'] . "&display=10&start=1";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$headers = array();
$headers[] = "X-Naver-Client-Id: ".$client_id;
$headers[] = "X-Naver-Client-Secret: ".$client_secret;

curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);

$response = curl_exec($ch);
echo $response;
curl_close ($ch);

?>