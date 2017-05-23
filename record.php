<?php

define('STORAGE_FILE', 'record_new');

$line = $_POST['r']. " ";
$line .= $_POST['v'] . " ";
$line .= $_POST['s'];
foreach($_POST['t'] as $ti ) {
    $line .= " " . $ti[0] . " " . $ti[1];
}
$line .= "\n";
$recorded = file_get_contents(STORAGE_FILE);
file_put_contents(STORAGE_FILE, $recorded.$line);

?>
