<?php
include_once "dbconnect.php";

$conn = OpenCon();
echo "Connected Successfully";
CloseCon($conn);
?>

$fullname=$_POST['fullname'];
$email=$_POST['email'];
$password=$_POST['password'];

?>