"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const TIMEZONE = [
    {
        value: 'Pacific/Midway',
        utcOffset: 'UTC-11:00',
        label: 'pacific_midway'
    },
    {
        value: 'America/Adak',
        utcOffset: 'UTC-10:00',
        label: 'america_adak'
    },
    {
        value: 'Pacific/Honolulu',
        utcOffset: 'UTC-10:00',
        label: 'pacific_honolulu'
    },
    {
        value: 'Pacific/Marquesas',
        utcOffset: 'UTC-09:30',
        label: 'pacific_marquesas'
    },
    {
        value: 'America/Anchorage',
        utcOffset: 'UTC-09:00',
        label: 'america_anchorage'
    },
    {
        value: 'America/Tijuana',
        utcOffset: 'UTC-08:00',
        label: 'america_tijuana'
    },
    {
        value: 'America/Los_Angeles',
        utcOffset: 'UTC-08:00',
        label: 'america_los_angeles'
    },
    {
        value: 'America/Phoenix',
        utcOffset: 'UTC-07:00',
        label: 'america_phoenix'
    },
    {
        value: 'America/Denver',
        utcOffset: 'UTC-07:00',
        label: 'america_denver'
    },
    {
        value: 'America/Guatemala',
        utcOffset: 'UTC-06:00',
        label: 'america_guatemala'
    },
    {
        value: 'America/Chicago',
        utcOffset: 'UTC-06:00',
        label: 'america_chicago'
    },
    {
        value: 'America/Chihuahua',
        utcOffset: 'UTC-06:00',
        label: 'america_chihuahua'
    },
    {
        value: 'Pacific/Easter',
        utcOffset: 'UTC-06:00',
        label: 'pacific_easter'
    },
    {
        value: 'America/Mexico_City',
        utcOffset: 'UTC-06:00',
        label: 'america_mexico_city'
    },
    {
        value: 'America/Regina',
        utcOffset: 'UTC-06:00',
        label: 'america_regina'
    },
    {
        value: 'America/Bogota',
        utcOffset: 'UTC-05:00',
        label: 'america_bogota'
    },
    {
        value: 'America/Cancun',
        utcOffset: 'UTC-05:00',
        label: 'america_cancun'
    },
    {
        value: 'America/New_York',
        utcOffset: 'UTC-05:00',
        label: 'america_new_york'
    },
    {
        value: 'America/Port-au-Prince',
        utcOffset: 'UTC-05:00',
        label: 'america_port-au-prince'
    },
    {
        value: 'America/Havana',
        utcOffset: 'UTC-05:00',
        label: 'america_havana'
    },
    {
        value: 'America/Indiana/Indianapolis',
        utcOffset: 'UTC-05:00',
        label: 'america_indiana_indianapolis'
    },
    {
        value: 'America/Asuncion',
        utcOffset: 'UTC-04:00',
        label: 'america_asuncion'
    },
    {
        value: 'America/Halifax',
        utcOffset: 'UTC-04:00',
        label: 'america_halifax'
    },
    {
        value: 'America/Caracas',
        utcOffset: 'UTC-04:00',
        label: 'america_caracas'
    },
    {
        value: 'America/Cuiaba',
        utcOffset: 'UTC-04:00',
        label: 'america_cuiaba'
    },
    {
        value: 'America/Guyana',
        utcOffset: 'UTC-04:00',
        label: 'america_guyana'
    },
    {
        value: 'America/Santiago',
        utcOffset: 'UTC-04:00',
        label: 'america_santiago'
    },
    {
        value: 'America/Grand_Turk',
        utcOffset: 'UTC-04:00',
        label: 'america_grand_turk'
    },
    {
        value: 'America/St_Johns',
        utcOffset: 'UTC-03:30',
        label: 'america_st_johns'
    },
    {
        value: 'America/Araguaina',
        utcOffset: 'UTC-03:00',
        label: 'america_araguaina'
    },
    {
        value: 'America/Sao_Paulo',
        utcOffset: 'UTC-03:00',
        label: 'america_sao_paulo'
    },
    {
        value: 'America/Cayenne',
        utcOffset: 'UTC-03:00',
        label: 'america_cayenne'
    },
    {
        value: 'America/Argentina/Buenos_Aires',
        utcOffset: 'UTC-03:00',
        label: 'america_argentina_buenos_aires'
    },
    {
        value: 'America/Godthab',
        utcOffset: 'UTC-03:00',
        label: 'america_godthab'
    },
    {
        value: 'America/Montevideo',
        utcOffset: 'UTC-03:00',
        label: 'america_montevideo'
    },
    {
        value: 'America/Miquelon',
        utcOffset: 'UTC-03:00',
        label: 'america_miquelon'
    },
    {
        value: 'America/Bahia',
        utcOffset: 'UTC-03:00',
        label: 'america_bahia'
    },
    {
        value: 'America/Noronha',
        utcOffset: 'UTC-02:00',
        label: 'america_noronha'
    },
    {
        value: 'Atlantic/Azores',
        utcOffset: 'UTC-01:00',
        label: 'atlantic_azores'
    },
    {
        value: 'Atlantic/Cape_Verde',
        utcOffset: 'UTC-01:00',
        label: 'atlantic_cape_verde'
    },
    {
        value: 'Europe/London',
        utcOffset: 'UTC',
        label: 'europe_london'
    },
    {
        value: 'Africa/Monrovia',
        utcOffset: 'UTC',
        label: 'africa_monrovia'
    },
    {
        value: 'Europe/Amsterdam',
        utcOffset: 'UTC+01:00',
        label: 'europe_amsterdam'
    },
    {
        value: 'Europe/Belgrade',
        utcOffset: 'UTC+01:00',
        label: 'europe_belgrade'
    },
    {
        value: 'Europe/Brussels',
        utcOffset: 'UTC+01:00',
        label: 'europe_brussels'
    },
    {
        value: 'Europe/Sarajevo',
        utcOffset: 'UTC+01:00',
        label: 'europe_sarajevo'
    },
    {
        value: 'Africa/Lagos',
        utcOffset: 'UTC+01:00',
        label: 'africa_lagos'
    },
    {
        value: 'Africa/Casablanca',
        utcOffset: 'UTC+01:00',
        label: 'africa_casablanca'
    },
    {
        value: 'Africa/Windhoek',
        utcOffset: 'UTC+01:00',
        label: 'africa_windhoek'
    },
    {
        value: 'Europe/Athens',
        utcOffset: 'UTC+02:00',
        label: 'europe_athens'
    },
    {
        value: 'Asia/Beirut',
        utcOffset: 'UTC+02:00',
        label: 'asia_beirut'
    },
    {
        value: 'Africa/Cairo',
        utcOffset: 'UTC+02:00',
        label: 'africa_cairo'
    },
    {
        value: 'Asia/Damascus',
        utcOffset: 'UTC+02:00',
        label: 'asia_damascus'
    },
    {
        value: 'Asia/Gaza',
        utcOffset: 'UTC+02:00',
        label: 'asia_gaza'
    },
    {
        value: 'Africa/Harare',
        utcOffset: 'UTC+02:00',
        label: 'africa_harare'
    },
    {
        value: 'Europe/Helsinki',
        utcOffset: 'UTC+02:00',
        label: 'europe_helsinki'
    },
    {
        value: 'Asia/Jerusalem',
        utcOffset: 'UTC+02:00',
        label: 'asia_jerusalem'
    },
    {
        value: 'Europe/Kaliningrad',
        utcOffset: 'UTC+02:00',
        label: 'europe_kaliningrad'
    },
    {
        value: 'Africa/Tripoli',
        utcOffset: 'UTC+02:00',
        label: 'africa_tripoli'
    },
    {
        value: 'Asia/Amman',
        utcOffset: 'UTC+03:00',
        label: 'asia_amman'
    },
    {
        value: 'Asia/Baghdad',
        utcOffset: 'UTC+03:00',
        label: 'asia_baghdad'
    },
    {
        value: 'Europe/Istanbul',
        utcOffset: 'UTC+03:00',
        label: 'europe_istanbul'
    },
    {
        value: 'Asia/Kuwait',
        utcOffset: 'UTC+03:00',
        label: 'asia_kuwait'
    },
    {
        value: 'Europe/Minsk',
        utcOffset: 'UTC+03:00',
        label: 'europe_minsk'
    },
    {
        value: 'Europe/Moscow',
        utcOffset: 'UTC+03:00',
        label: 'europe_moscow'
    },
    {
        value: 'Africa/Nairobi',
        utcOffset: 'UTC+03:00',
        label: 'africa_nairobi'
    },
    {
        value: 'Asia/Tehran',
        utcOffset: 'UTC+03:30',
        label: 'asia_tehran'
    },
    {
        value: 'Asia/Muscat',
        utcOffset: 'UTC+04:00',
        label: 'asia_muscat'
    },
    {
        value: 'Europe/Astrakhan',
        utcOffset: 'UTC+04:00',
        label: 'europe_astrakhan'
    },
    {
        value: 'Asia/Baku',
        utcOffset: 'UTC+04:00',
        label: 'asia_baku'
    },
    {
        value: 'Europe/Samara',
        utcOffset: 'UTC+04:00',
        label: 'europe_samara'
    },
    {
        value: 'Indian/Mauritius',
        utcOffset: 'UTC+04:00',
        label: 'indian_mauritius'
    },
    {
        value: 'Asia/Tbilisi',
        utcOffset: 'UTC+04:00',
        label: 'asia_tbilisi'
    },
    {
        value: 'Asia/Yerevan',
        utcOffset: 'UTC+04:00',
        label: 'asia_yerevan'
    },
    {
        value: 'Asia/Kabul',
        utcOffset: 'UTC+04:30',
        label: 'asia_kabul'
    },
    {
        value: 'Asia/Tashkent',
        utcOffset: 'UTC+05:00',
        label: 'asia_tashkent'
    },
    {
        value: 'Asia/Yekaterinburg',
        utcOffset: 'UTC+05:00',
        label: 'asia_yekaterinburg'
    },
    {
        value: 'Asia/Karachi',
        utcOffset: 'UTC+05:00',
        label: 'asia_karachi'
    },
    {
        value: 'Asia/Almaty',
        utcOffset: 'UTC+05:00',
        label: 'asia_almaty'
    },
    {
        value: 'Asia/Kolkata',
        utcOffset: 'UTC+05:30',
        label: 'asia_kolkata'
    },
    {
        value: 'Asia/Colombo',
        utcOffset: 'UTC+05:30',
        label: 'asia_colombo'
    },
    {
        value: 'Asia/Kathmandu',
        utcOffset: 'UTC+05:45',
        label: 'asia_kathmandu'
    },
    {
        value: 'Asia/Dhaka',
        utcOffset: 'UTC+06:00',
        label: 'asia_dhaka'
    },
    {
        value: 'Asia/Yangon',
        utcOffset: 'UTC+06:30',
        label: 'asia_yangon'
    },
    {
        value: 'Asia/Novosibirsk',
        utcOffset: 'UTC+07:00',
        label: 'asia_novosibirsk'
    },
    {
        value: 'Asia/Bangkok',
        utcOffset: 'UTC+07:00',
        label: 'asia_bangkok'
    },
    {
        value: 'Asia/Barnaul',
        utcOffset: 'UTC+07:00',
        label: 'asia_barnaul'
    },
    {
        value: 'Asia/Hovd',
        utcOffset: 'UTC+07:00',
        label: 'asia_hovd'
    },
    {
        value: 'Asia/Krasnoyarsk',
        utcOffset: 'UTC+07:00',
        label: 'asia_krasnoyarsk'
    },
    {
        value: 'Asia/Tomsk',
        utcOffset: 'UTC+07:00',
        label: 'asia_tomsk'
    },
    {
        value: 'Asia/Shanghai',
        utcOffset: 'UTC+08:00',
        label: 'asia_shanghai'
    },
    {
        value: 'Asia/Irkutsk',
        utcOffset: 'UTC+08:00',
        label: 'asia_irkutsk'
    },
    {
        value: 'Asia/Kuala_Lumpur',
        utcOffset: 'UTC+08:00',
        label: 'asia_kuala_lumpur'
    },
    {
        value: 'Australia/Perth',
        utcOffset: 'UTC+08:00',
        label: 'australia_perth'
    },
    {
        value: 'Asia/Taipei',
        utcOffset: 'UTC+08:00',
        label: 'asia_taipei'
    },
    {
        value: 'Asia/Ulaanbaatar',
        utcOffset: 'UTC+08:00',
        label: 'asia_ulaanbaatar'
    },
    {
        value: 'Asia/Pyongyang',
        utcOffset: 'UTC+08:30',
        label: 'asia_pyongyang'
    },
    {
        value: 'Australia/Eucla',
        utcOffset: 'UTC+08:45',
        label: 'australia_eucla'
    },
    {
        value: 'Asia/Chita',
        utcOffset: 'UTC+09:00',
        label: 'asia_chita'
    },
    {
        value: 'Asia/Tokyo',
        utcOffset: 'UTC+09:00',
        label: 'asia_tokyo'
    },
    {
        value: 'Asia/Seoul',
        utcOffset: 'UTC+09:00',
        label: 'asia_seoul'
    },
    {
        value: 'Asia/Yakutsk',
        utcOffset: 'UTC+09:00',
        label: 'asia_yakutsk'
    },
    {
        value: 'Australia/Adelaide',
        utcOffset: 'UTC+09:30',
        label: 'australia_adelaide'
    },
    {
        value: 'Australia/Darwin',
        utcOffset: 'UTC+09:30',
        label: 'australia_darwin'
    },
    {
        value: 'Australia/Brisbane',
        utcOffset: 'UTC+10:00',
        label: 'australia_brisbane'
    },
    {
        value: 'Australia/Sydney',
        utcOffset: 'UTC+10:00',
        label: 'australia_sydney'
    },
    {
        value: 'Pacific/Guam',
        utcOffset: 'UTC+10:00',
        label: 'pacific_guam'
    },
    {
        value: 'Australia/Hobart',
        utcOffset: 'UTC+10:00',
        label: 'australia_hobart'
    },
    {
        value: 'Asia/Vladivostok',
        utcOffset: 'UTC+10:00',
        label: 'asia_vladivostok'
    },
    {
        value: 'Australia/Lord_Howe',
        utcOffset: 'UTC+10:30',
        label: 'australia_lord_howe'
    },
    {
        value: 'Pacific/Bougainville',
        utcOffset: 'UTC+11:00',
        label: 'pacific_bougainville'
    },
    {
        value: 'Asia/Srednekolymsk',
        utcOffset: 'UTC+11:00',
        label: 'asia_srednekolymsk'
    },
    {
        value: 'Asia/Magadan',
        utcOffset: 'UTC+11:00',
        label: 'asia_magadan'
    },
    {
        value: 'Pacific/Norfolk',
        utcOffset: 'UTC+11:00',
        label: 'pacific_norfolk'
    },
    {
        value: 'Asia/Sakhalin',
        utcOffset: 'UTC+11:00',
        label: 'asia_sakhalin'
    },
    {
        value: 'Pacific/Guadalcanal',
        utcOffset: 'UTC+11:00',
        label: 'pacific_guadalcanal'
    },
    {
        value: 'Asia/Anadyr',
        utcOffset: 'UTC+12:00',
        label: 'asia_anadyr'
    },
    {
        value: 'Pacific/Auckland',
        utcOffset: 'UTC+12:00',
        label: 'pacific_auckland'
    },
    {
        value: 'Pacific/Fiji',
        utcOffset: 'UTC+12:00',
        label: 'pacific_fiji'
    },
    {
        value: 'Pacific/Chatham',
        utcOffset: 'UTC+12:45',
        label: 'pacific_chatham'
    },
    {
        value: 'Pacific/Tongatapu',
        utcOffset: 'UTC+13:00',
        label: 'pacific_tongatapu'
    },
    {
        value: 'Pacific/Apia',
        utcOffset: 'UTC+13:00',
        label: 'pacific_apia'
    },
    {
        value: 'Pacific/Kiritimati',
        utcOffset: 'UTC+14:00',
        label: 'pacific_kiritimati'
    }
];
exports.default = TIMEZONE;
