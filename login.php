<?php
    if (isset($_POST['password']) && $_POST['password'] == 'isotopia') {
        setcookie("password", 'isotopia', strtotime('+30 days'));
        header('Location: index.php');
        exit;
    }
?>
<!DOCTYPE html>
<html>
<head>
    <title>Password protected</title>
</head>
<body>
    <div style="text-align:center;margin-top:50px;">
        You must enter the password to view this content.
        <form method="POST">
            <input type="text" name="password">
        </form>
    </div>
</body>
</html>