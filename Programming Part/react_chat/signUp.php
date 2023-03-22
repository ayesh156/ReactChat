<?php

$mobile = $_POST["mobile"];
$name = $_POST["name"];
$password = $_POST["password"];
$verifyPassword = $_POST["verifyPassword"];
$country = intval($_POST["country"]) + 1;
$profile_picture_location = $_FILES["profile_picture"]["tmp_name"];

$connection = new mysqli("localhost","root","SEngineer,531","react_chat");

$connection->query("INSERT INTO `user` (`mobile`,`name`,`password`,`profile_url`,`country_id`) VALUES ('".$mobile."','".$name."','".$password."','"."uploads/".$mobile.".png"."','".$country."')");

move_uploaded_file($profile_picture_location,"uploads/".$mobile.".png");

echo("Uploaded");

?>