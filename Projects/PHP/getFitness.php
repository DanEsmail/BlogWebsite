<?php
$servername = "localhost";
$database = "u192014533_Profile_Data";
$username = "u192014533_Firewolf29";
$password = ':rvl~*I$V5h';

// Create connection
$conn = new mysqli($servername, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}



$sql = "SELECT * FROM  Workout_Table";



$results = $conn->query($sql);
$counter = 0;
if ($results->num_rows > 0) {
  // output data of each row
    echo "id,Exercise,Rep,Weight,Date\n";

    while($row = $results->fetch_assoc()) {
          if($counter == $results->num_rows-1){
            echo $row['id'] . "," . $row['Exercise']  ."," . $row['Rep'] . "," .$row['Weight'] . "," . $row['W_date'] ;

        }else{
            echo $row['id'] . "," . $row['Exercise']  ."," . $row['Rep'] . "," .$row['Weight'] . "," . $row['W_date']. "\n";
            $counter++;
        }
  }


} else {
  echo "0 results";
}



$conn->close();

 ?>
