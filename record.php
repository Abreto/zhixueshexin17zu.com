<?php

define('STORAGE_FILE', 'record');

$line = $_POST['v'] . " ";
$line .= $_POST['s'];
foreach($_POST['t'] as $ti ) {
    $line .= " " . $ti[0] . " " . $ti[1];
}
$line .= "\n";
$recorded = file_get_contents(STORAGE_FILE);
file_put_contents(STORAGE_FILE, $recorded.$line);

/*ob_start();
print_r($_POST);
file_put_contents(STORAGE_FILE, ob_get_contents());
ob_end_flush();*/

?>
