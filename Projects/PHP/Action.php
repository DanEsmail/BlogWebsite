<?php

$servername = "localhost";
$database = "u192014533_Profile_Data";
$username = "u192014533_Firewolf29";
$password = ':rvl~*I$V5h';

//getting form data

$exercise = $_POST["Exercise"];
$reps = $_POST["Rep"];
$weight = $_POST["Weight"];
$w_date = $_POST["W_date"];

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO `Workout_Table` (`id`, `Exercise`, `Rep`, `Weight`, `W_date`) VALUES (NULL, '{$exercise}', '{$reps}', '{$weight}', '{$w_date}')";

if ($conn->query($sql) === TRUE) {
  echo "New Record Created Successfully";
}else{
  echo "Error: " . $sql . "<BR>" . $conn->error;
}

$conn->close();



?>
