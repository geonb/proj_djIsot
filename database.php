<?php
header('Access-Control-Allow-Origin: *');

$formDataName = $_POST['name'];
$formDataDate = $_POST['date'];

define('MYSQL_HOST', '######');
define('MYSQL_BENUTZER', '######');
define('MYSQL_KENNWORT', '######');
define('MYSQL_DATENBANK', '######');

$db_link = mysqli_connect(MYSQL_HOST,
    MYSQL_BENUTZER,
    MYSQL_KENNWORT,
    MYSQL_DATENBANK);

$formDataBlob = $_POST['data'];
	
if ($db_link) {

	try{
		/*
		$stmt2 = $db_link->prepare("SELECT name FROM djisotype where name=?");
		$stmt2->bind_param("s", $formDataName);
		//var_dump($result);
		//var_dump($stmt2);
		$stmt2->execute();
		$num_rows = mysqli_stmt_num_rows($stmt2);
		mysqli_stmt_close($stmt2);
		*/
	
		$result = mysqli_query($db_link,"SELECT name FROM djisotype where name = '". $formDataName . "'");
		$num_rows = mysqli_num_rows($result);
			$stmt = $db_link->prepare("insert into djisotype(name,date,data) values(?,?,?)");
			$null = null;
			$stmt->bind_param("ssb", $formDataName,$formDataDate,$null);
			$stmt->send_long_data(2, $formDataBlob);
			$stmt->execute();
			mysqli_stmt_close($stmt);
			echo "Sucess";
	}
	catch(\Exception $exec)
	{
		throw http_response_code(500);
	}
} 
else {
	http_response_code(500);
    die('keine Verbindung möglich: ' . mysqli_error());
}