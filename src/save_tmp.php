<?php
var_dump($_POST);
file_put_contents('./tmp/'.$_POST["filename"], $_POST[$_POST['filename']]);