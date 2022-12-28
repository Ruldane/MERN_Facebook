<?php
$bonbon = "haribo";
echo $bonbon;

function test()
{
    global $bonbon;
    echo $bonbon . " haha";
}

test();