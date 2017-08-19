<?php
    //send the data in email
    $to = "noahbragg@cedarville.edu"; // this is your Email address
    $toDrew = "andrewjbidlen@cedarville.edu";   //Drew's email
    $first_name = $_POST['id-name'];
    $subject = "Duel Lagoon Beta submission";
    $email = $_POST['id-email'];
    $feedback = $_POST['id-feed'];
    $message = $first_name . " From " . $email . " sent feedback!\n\n" . $feedback;

    $headers = "From: " . $first_name;
    mail($to, $subject, $message, $headers);    //send to Noah
    mail($toDrew, $subject, $message, $headers);    //send to Drew
    
    //send the data to text file
    $myfile = fopen("../feedback/feedback.txt", "a") or die("Unable to open file!");
    $txt = $first_name . "      " . $email . "\n" . $feedback . "\n";
    fwrite($myfile, $txt);
    fclose($myfile);
?>