<?php
header('Access-Control-Allow-Origin: *');

define('MYSQL_HOST', '######');
define('MYSQL_BENUTZER', '######');
define('MYSQL_KENNWORT', '######');
define('MYSQL_DATENBANK', '######');

$list = (isset($_GET['list'])) ? $_GET['list'] : false;
$db_link = mysqli_connect(MYSQL_HOST,
    MYSQL_BENUTZER,
    MYSQL_KENNWORT,
    MYSQL_DATENBANK);

if($list == 'list') {
	$qer = $db_link->prepare("SELECT name FROM djisotype ORDER BY iddjisotype DESC");
	$qer->execute();
	$out = mysqli_stmt_get_result($qer);
	echoResultAsJson($out);  
}
if($list == 'getRec') {
		$formData = $_GET['name'];
	/*
	$out = $db_link->query ("SELECT name,date,data FROM djisotype where name='$formData'");
	echoResultAsJson($out);*/
	
	$stmt = $db_link->prepare("SELECT name,date,data FROM djisotype where name=?");
	$stmt->bind_param("s", $formData);
	$stmt->execute();
	$out = mysqli_stmt_get_result($stmt);
	echoResultAsJson($out);
}
function echoResultAsJson($result) {
		if(mysqli_num_rows($result) > 0){ //implies not 0
			$dataArr = array();
			while($data = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
				$row = Array();
				foreach ($data as $key => $value) {
					$row[$key] = $value;
				}
				array_push($dataArr, $row);
			}
			echo json_encode($dataArr);
	   	} else {
			echo "{error:'no results were found'}";
		}
	}
?>