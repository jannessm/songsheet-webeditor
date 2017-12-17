<?php
/**
 * Created by IntelliJ IDEA.
 * User: jannes
 * Date: 14.12.17
 * Time: 16:10
 */



//load data
$usr = unserialize(file_get_contents('./usr'));
if(!$usr){
    $usr = array();
}

// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
$input = json_decode(file_get_contents('php://input'),true);

$GET_ERROR='{ "message": "404 user not found" }';
$POST_ERROR='{ "message": "400 user object was wrong"}';

// get userdata
if($method == "GET"){
    if(isset($usr[$request[0]]))
        echo '{ "user": "'.$request[0].'", "defaultPath": "'.$usr[$request[0]].'"}';
    else
        echo $GET_ERROR;
}

// add userdata
if($method == "POST"){
    if(isset($input['user']) && isset($input['defaultPath'])){
        $usr[strtolower($input['user'])] = $input['defaultPath'];
        echo '{ "user": "'.strtolower($input['user']).'", "defaultPath": "'.$usr[$input['user']].'"}';
    }
    else
        echo $POST_ERROR;
}

//save data
file_put_contents('./usr', serialize($usr));