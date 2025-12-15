<?php
$fname = $_POST["firstName"];
$lname = $_POST["lastName"];
$email = $_POST["email"];
$pass = $_POST["password"];


//Data_b connect
$conn = new mysqli('localhost', 'root', '', 'ecv');
if($conn->connect_error){
    die('connection failed : '.$conn->connect_error);

}else{
     $stmt = $conn->prepare("insert into sign up(fname, email, pass) values(?, ?, ?)")

     $stmt->bind_param("sss", $fname, $email, $pass);
     $stmt->execute();
     echo "signup success";
     $stmt->close();
     $conn->close();
    }

?>
