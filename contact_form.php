<?php
    $name = $_POST['name_form'];
    $email = $_POST['email_form'];
    $email = $_POST['organization_form'];
    $message = $_POST['message_form'];
    $secret="YOUR_SECRET";
    $response=$_POST["g-recaptcha-response"];
    $verify=file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$response}");
    $captcha_success=json_decode($verify);
    $from = 'From: Iamdantekelly.com';
    $to = 'dante.kelly97@gmail.com';
    $subject = 'Freelancing: ' + $name;
			
    $body = "From: $name\n E-Mail: $email\n Message:\n $message";
				
    if ($_POST['submit']) {
        if ($name != '' && $email != '') {
            if ($captcha_success->success==true) {
                if (mail ($to, $subject, $body, $from)) {
    	        echo '<p>Your message has been sent!</p>';
    	} else if ($_POST['submit'] && $captcha_success->success==false) {
    	    echo '<p>You answered the anti-spam question incorrectly!</p>';
    	}
        } else {
            echo '<p>You need to fill in all required fields!!</p>';
        }
    }
?>