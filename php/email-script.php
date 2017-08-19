<?php
    //send the data in email
    $to = "noahbragg@cedarville.edu"; // this is your Email address
    $toDrew = "andrewjbidlen@cedarville.edu";   //Drew's email
    $first_name = $_POST['id-name'];
    $subject = "Duel Lagoon Beta submission";
    $email = $_POST['id-email'];
    $message = $first_name . " is a new beta tester! \n" . $first_name . "'s email is: " . $_POST['id-email'];

    $headers = "From: " . $first_name;
    mail($to, $subject, $message, $headers);    //send to Noah
    mail($toDrew, $subject, $message, $headers);    //send to Drew
    
    //send the data to text file
    $myfile = fopen("../emails/emails.txt", "a") or die("Unable to open file!");
    $txt = "\n" . $first_name . "           " . $email;
    fwrite($myfile, $txt);
    fclose($myfile);
?>