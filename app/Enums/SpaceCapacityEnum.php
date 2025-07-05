<?php
namespace App\Enums;
enum SpaceCapacityEnum: int
{
    case CAPACITY_50 = 50;
    case CAPACITY_100 = 100;
    case CAPACITY_150 = 150;
    case CAPACITY_200 = 200;
    case CAPACITY_250 = 250; 
    case CAPACITY_300 = 300;
    case CAPACITY_350 = 350;
    case CAPACITY_400 = 400;
    case CAPACITY_450 = 450;
    case CAPACITY_500 = 500;

    public static function getValues(): array
    {
        return array_column(self::cases(), 'value');
    }
}