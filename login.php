<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $conn = new mysqli("localhost", "root", "", "user_database");

    if ($conn->connect_error) {
        die("فشل الاتصال: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM users WHERE username = '$username'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        if (password_verify($password, $user['password'])) {
            $_SESSION['username'] = $username;

            // إرسال إشعار إلى الأدمن (مثلاً عبر البريد الإلكتروني)
            $admin_email = "admin@example.com";
            $subject = "تسجيل دخول جديد";
            $message = "تم تسجيل الدخول بواسطة المستخدم: $username";
            mail($admin_email, $subject, $message);

            echo "تم تسجيل الدخول بنجاح";
        } else {
            echo "كلمة المرور غير صحيحة";
        }
    } else {
        echo "اسم المستخدم غير موجود";
    }

    $conn->close();
}
?>