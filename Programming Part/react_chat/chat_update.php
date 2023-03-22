<?php

$id = $_GET["id"];

$connection = new mysqli("localhost","root","SEngineer,531","react_chat");
$connection->query("UPDATE `chat` SET `status_id` = '2' WHERE `user_from_id` = '".$id."'");

?>