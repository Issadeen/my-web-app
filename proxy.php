<?php
header('Access-Control-Allow-Origin: *');

$user = json_decode('{"id":1476978,"name":"abdinoor.ahmed.abdi","email":"cnuur111@gmail.com","created_at":"2023-08-19 08:20:51","updated_at":"2023-08-19 08:20:51","c_user_rid":"0FE533DF-4D21-F33D-8AEBC463706DC550","v_user_login_name":"abdinoor.ahmed.abdi","c_people_rid":"43DB4BCC-9BC1-C5BB-D1A43B6858AF056C","i_people_type_id":5,"c_user_group_rid":"DAB71D51-FB3D-8A98-D509F90EF04D42CB","c_user_role_rid":"14091F9C-F541-B92C-E30D646C32C46248","v_provider_name":"CLASSIC PETROLEUM LIMITED","i_provider_type_id":4,"i_customs_station_id":null,"i_department_id":null,"asset_automatic":0,"v_language_code":"en","i_style_id":5,"i_provider_timezone":3,"v_logo_name":null,"i_customs_station_ids":null}');

$api_url = 'https://kra.rects-ea.org/api/efuel/exportsBooking/check_fuel_when_booking?v_reg_no=SSD619LSSD742AR';

$options = array(
    'http' => array(
        'method' => 'GET',
        'header' => 'Content-Type: application/json' . "\r\n" .
                    'Authorization: Bearer ' . $user->id
    )
);

$context = stream_context_create($options);
$response = file_get_contents($api_url, false, $context);

var_dump($response);

$data = json_decode($response, true);

if ($data === null) {
    echo 'Error parsing JSON data';
} else if (isset($data['status']) && $data['status'] === 'success') {
    echo 'Truck is available';
} else {
    echo 'Truck is not available';
}
?>