<?php
  $ds = DIRECTORY_SEPARATOR;
  $storeFolder = 'uploads';

  if (!empty($_FILES)) {
    $creator = $_POST['creator'];
    $tempFile = $_FILES['file']['tmp_name'];
    $targetPath = dirname( __FILE__ ) . $ds . $storeFolder . $ds . $creator . $ds;
    echo $targetPath;
    if (!is_dir($targetPath)) {
        mkdir($targetPath);
    }
    $targetFile =  $targetPath. $_FILES['file']['name'];
    move_uploaded_file($tempFile,$targetFile);
  }
?>
