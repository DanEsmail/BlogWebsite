<?php

$servername = "localhost";
$database = "u192014533_Profile_Data";
$username = "u192014533_Firewolf29";
$password = ':rvl~*I$V5h';

//getting form data



$w_date = $_POST["W_date"];
$num_row = $_POST["work-rows"];
// Create connection

$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

for ($i=0; $i < $num_row; $i++) {
  $exercise = $_POST["exercise-" . $i];
  for ($j=1; $j < 6 ; $j++) {
    $x = $i*5+$j;

    $reps = $_POST["rep-" . $x];
    $weight = $_POST["weight-" . $x];
    if ($reps == ""){

    }else{
    $sql = "INSERT INTO `Workout_Table` (`id`, `Exercise`, `Rep`, `Weight`, `W_date`) VALUES (NULL, '{$exercise}', '{$reps}', '{$weight}', '{$w_date}')";


    if ($conn->query($sql) === TRUE) {
      echo "New Record Created Successfully";
    }else{
      echo "Error: " . $sql . "<BR>" . $conn->error;
    }
    }

  }
}


$conn->close();



?>
