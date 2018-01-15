<?php
echo file_get_contents('./tmp/'.$_GET['filename']);

foreach(glob('./tmp/*') as $file){
  if(time() > filemtime($file)+3600){
      unlink($file);
  }
}