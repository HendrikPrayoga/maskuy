<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Load PHPMailer using Composer autoload
require 'vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    // Mailtrap SMTP configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'maskuyy2@gmail.com';
    $mail->Password = 'xydwlggmezbewxpd ';
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    // Email sender and recipient
    $mail->setFrom('maskuyy2@gmail.com', 'Sender Name');
    $mail->addAddress('riyonaryono12@gmail.com', 'Recipient Name');

    // Email content
    $mail->isHTML(true);
    $mail->Subject = 'Test Email from Mailtrap';
    $mail->Body    = '<h1>Hello, World!</h1><p>This is a test email sent using Mailtrap.</p>';
    $mail->AltBody = 'Hello, World! This is a test email sent using Mailtrap.';

    // Send email
    $mail->send();
    echo 'Email has been sent successfully';
} catch (Exception $e) {
    echo "Email could not be sent. Mailer Error: {$mail->ErrorInfo}";
}
