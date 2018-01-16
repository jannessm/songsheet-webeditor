<?php
$file = @file_get_contents('./tmp/'.$_GET['filename']);
preg_match('/Warning/', $file, $match);

if(sizeof($match) <= 0)
    echo "Leider ist die Seite abgelaufen. Öffne die Previewseite erneut über den Editor.";
else
    echo $file;

// clear tmp dir
foreach(glob('./tmp/*') as $file){
  if(time() > filemtime($file)+3600){
      unlink($file);
  }
}