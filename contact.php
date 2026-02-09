<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    // Collect form data
    $name    = trim($_POST['name'] ?? '');
    $email   = trim($_POST['email'] ?? '');
    $phone   = trim($_POST['phone'] ?? '');
    $city    = trim($_POST['city'] ?? '');
    $service = trim($_POST['service'] ?? '');
    $message = trim($_POST['message'] ?? '');

    // Validate required fields
    if (empty($name) || empty($email) || empty($phone) || empty($city) || empty($message)) {
        echo "All required fields must be filled.";
        exit;
    }

    // Sanitize inputs
    $name    = filter_var($name, FILTER_SANITIZE_SPECIAL_CHARS);
    $email   = filter_var($email, FILTER_SANITIZE_EMAIL);
    $phone   = filter_var($phone, FILTER_SANITIZE_SPECIAL_CHARS);
    $city    = filter_var($city, FILTER_SANITIZE_SPECIAL_CHARS);
    $service = filter_var($service, FILTER_SANITIZE_SPECIAL_CHARS);
    $message = filter_var($message, FILTER_SANITIZE_SPECIAL_CHARS);

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email address.";
        exit;
    }

    // Validate phone
    if (!preg_match("/^[0-9+\-\s()]{7,20}$/", $phone)) {
        echo "Invalid phone number.";
        exit;
    }

    // Email details
    $to = "INEXUSCONSULTANTS@GMAIL.COM";
    $subject = "APEDA Certificate - Contact Form Enquiry";

    $body = "
New Contact Form Submission

Name: $name
Email: $email
Phone: $phone
City: $city
Service Required: $service

Message:
$message
";

    $headers  = "From: Website Enquiry <no-reply@yourdomain.com>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send mail
    if (mail($to, $subject, $body, $headers)) {
        header("Location: thankyou.html");
        exit;
    } else {
        echo "Error: Email could not be sent.";
    }

} else {
    echo "Invalid request.";
}
?>
