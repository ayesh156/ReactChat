<?php

$userJSONText = $_POST["userJSONText"];
$userPHPObject = json_decode($userJSONText);

$connection = new mysqli("localhost", "root", "SEngineer,531", "react_chat");

$s_table = $connection->query("SELECT * FROM `user` WHERE `id` != '" . $userPHPObject->id . "' AND `name` LIKE '".$_POST["text"]."%'");

$phpResponseArray = array();

for ($y = 0; $y < $s_table->num_rows; $y++) {

    $s_data = $s_table->fetch_assoc();

    $s_count = $connection->query("SELECT * FROM `chat` WHERE `user_from_id` = '" . $userPHPObject->id . "' AND `user_to_id` = '" . $s_data["id"] . "'
    OR 
   `user_from_id` = '" . $s_data["id"] . "' AND `user_to_id` = '" . $userPHPObject->id . "' ORDER BY `date_time` DESC");

    if ($s_count->num_rows > 0) {
        $phpArrayItemObject = new stdClass();

        $phpArrayItemObject->id = $s_data["id"];
        $phpArrayItemObject->pic = $s_data["profile_url"];
        $phpArrayItemObject->name = $s_data["name"];

        $table2 = $connection->query("SELECT * FROM `chat` WHERE `user_from_id` = '" . $userPHPObject->id . "' AND `user_to_id` = '" . $s_data["id"] . "'
     OR 
    `user_from_id` = '" . $s_data["id"] . "' AND `user_to_id` = '" . $userPHPObject->id . "' ORDER BY `date_time` DESC");

        $table3 = $connection->query("SELECT * FROM `chat` WHERE `user_from_id` = '" . $s_data["id"] . "' AND `user_to_id` = '" . $userPHPObject->id . "' AND `status_id` = '1' ORDER BY `date_time` DESC");

        if ($table2->num_rows == 0) {
            $phpArrayItemObject->msg = "";
            $phpArrayItemObject->time = "";
            $phpArrayItemObject->count = "0";
        } else {

            $unseenChatCount = 0;

            // first row
            $lastChatRow = $table2->fetch_assoc();

            $phpArrayItemObject->msg = $lastChatRow["message"];

            $phpDateTimeObject = strtotime($lastChatRow["date_time"]);
            $timeStr = date('h:i a', $phpDateTimeObject);

            $phpArrayItemObject->time = $timeStr;

            for ($i = 0; $i < $table3->num_rows; $i++) {
                // other rows
                $unseenChatCount++;
            }

            $phpArrayItemObject->count = $unseenChatCount;
        }

        array_push($phpResponseArray, $phpArrayItemObject);
    }
}

$jsonResponseText = json_encode($phpResponseArray);
echo ($jsonResponseText);