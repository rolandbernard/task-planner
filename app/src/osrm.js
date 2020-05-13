
import config from './config';

let cache = {
  "[[11.6525118,46.7283475],[11.3323606,46.4708107],[11.3323606,46.4708107],[11.3323606,46.4708107],[11.3323606,46.4708107],[11.3697115,45.5117757],[11.3583474,46.49805],[11.6553224,46.7166959],[11.1637595,46.6705358],[11.1071131,45.9396465],[11.3415476,46.4872608],[11.1986062,46.5787909],[11.3583474,46.49805],[11.5658908,46.8098363],[11.6593449,46.71834],[11.9273776,46.8019248],[12.1275168,46.8736719],[11.3499216,46.4957955],[10.730921871874997,46.03736955],[11.212524,46.2390728],[11.1071131,45.9396465],[11.3324146,46.4828521],[11.4106492,46.8845164],[11.3346317,46.4830753],[11.3346317,46.4830753],[11.3320781,46.4750087],[11.3346317,46.4830753],[11.2407609,46.2734327],[11.3547801,46.4981125],[11.3583474,46.49805],[11.3303934,46.4820846],[11.3583474,46.49805],[11.3583474,46.49805],[11.3583474,46.49805],[11.3522297,46.4964121]]": [
    [
      0,
      2520.5,
      2520.5,
      2520.5,
      2520.5,
      9166.1,
      2479.4,
      239.8,
      3778,
      4984.4,
      2498.1,
      2925.1,
      2479.4,
      898,
      166.8,
      2143.9,
      3749,
      2578,
      7032.1,
      3565,
      4984.4,
      2434.1,
      1493.6,
      2456.4,
      2456.4,
      2521.4,
      2456.4,
      3305.7,
      2586.3,
      2479.4,
      2410.5,
      2479.4,
      2479.4,
      2479.4,
      2510.1
    ],
    [
      2564.6,
      0,
      0,
      0,
      0,
      7408.5,
      835.5,
      2516.6,
      1812.3,
      3226.8,
      346.3,
      959.4,
      835.5,
      2762.2,
      2645,
      4078.2,
      5683.3,
      838,
      5274.5,
      1807.4,
      3226.8,
      288.4,
      3118.2,
      267.8,
      267.8,
      190.9,
      267.8,
      1548.1,
      777.7,
      835.5,
      276.5,
      835.5,
      835.5,
      835.5,
      701.5
    ],
    [
      2564.6,
      0,
      0,
      0,
      0,
      7408.5,
      835.5,
      2516.6,
      1812.3,
      3226.8,
      346.3,
      959.4,
      835.5,
      2762.2,
      2645,
      4078.2,
      5683.3,
      838,
      5274.5,
      1807.4,
      3226.8,
      288.4,
      3118.2,
      267.8,
      267.8,
      190.9,
      267.8,
      1548.1,
      777.7,
      835.5,
      276.5,
      835.5,
      835.5,
      835.5,
      701.5
    ],
    [
      2564.6,
      0,
      0,
      0,
      0,
      7408.5,
      835.5,
      2516.6,
      1812.3,
      3226.8,
      346.3,
      959.4,
      835.5,
      2762.2,
      2645,
      4078.2,
      5683.3,
      838,
      5274.5,
      1807.4,
      3226.8,
      288.4,
      3118.2,
      267.8,
      267.8,
      190.9,
      267.8,
      1548.1,
      777.7,
      835.5,
      276.5,
      835.5,
      835.5,
      835.5,
      701.5
    ],
    [
      2564.6,
      0,
      0,
      0,
      0,
      7408.5,
      835.5,
      2516.6,
      1812.3,
      3226.8,
      346.3,
      959.4,
      835.5,
      2762.2,
      2645,
      4078.2,
      5683.3,
      838,
      5274.5,
      1807.4,
      3226.8,
      288.4,
      3118.2,
      267.8,
      267.8,
      190.9,
      267.8,
      1548.1,
      777.7,
      835.5,
      276.5,
      835.5,
      835.5,
      835.5,
      701.5
    ],
    [
      9158.9,
      7292.2,
      7292.2,
      7292.2,
      7292.2,
      0,
      7794.6,
      9110.9,
      8549.7,
      5149,
      7305.4,
      7696.8,
      7794.6,
      9356.5,
      9239.3,
      10672.5,
      12277.6,
      7797.1,
      8131.3,
      6545.9,
      5149,
      7205.8,
      9712.5,
      7228.1,
      7228.1,
      7293.1,
      7228.1,
      6804.8,
      7736.8,
      7794.6,
      7182.2,
      7794.6,
      7794.6,
      7794.6,
      7660.6
    ],
    [
      2571.7,
      833.9,
      833.9,
      833.9,
      833.9,
      7694.7,
      0,
      2523.7,
      2073.6,
      3513,
      497.2,
      1220.7,
      0,
      2769.3,
      2652.1,
      4085.3,
      5690.4,
      331.7,
      5560.7,
      2093.6,
      3513,
      622.2,
      3125.3,
      601.6,
      601.6,
      773.1,
      601.6,
      1834.3,
      179.9,
      0,
      583.5,
      0,
      0,
      0,
      263.8
    ],
    [
      218.7,
      2503.7,
      2503.7,
      2503.7,
      2503.7,
      9149.3,
      2462.6,
      0,
      3761.2,
      4967.6,
      2481.3,
      2908.3,
      2462.6,
      1116.7,
      243.3,
      2362.6,
      3967.7,
      2561.2,
      7015.3,
      3548.2,
      4967.6,
      2417.3,
      1712.3,
      2439.6,
      2439.6,
      2504.6,
      2439.6,
      3288.9,
      2569.5,
      2462.6,
      2393.7,
      2462.6,
      2462.6,
      2462.6,
      2493.3
    ],
    [
      3744.4,
      1669.4,
      1669.4,
      1669.4,
      1669.4,
      8588.3,
      2190.8,
      3696.4,
      0,
      4406.6,
      1701.6,
      926.1,
      2190.8,
      3942,
      3824.8,
      5258,
      6863.1,
      2134.6,
      6454.3,
      2987.2,
      4406.6,
      1602,
      4298,
      1624.3,
      1624.3,
      1689.3,
      1624.3,
      2727.9,
      2133,
      2190.8,
      1578.4,
      2190.8,
      2190.8,
      2190.8,
      2056.8
    ],
    [
      5046.1,
      3179.4,
      3179.4,
      3179.4,
      3179.4,
      5312.7,
      3681.8,
      4998.1,
      4436.9,
      0,
      3192.6,
      3584,
      3681.8,
      5243.7,
      5126.5,
      6559.7,
      8164.8,
      3684.3,
      3938.6,
      2433.1,
      0,
      3093,
      5599.7,
      3115.3,
      3115.3,
      3180.3,
      3115.3,
      2692,
      3624,
      3681.8,
      3069.4,
      3681.8,
      3681.8,
      3681.8,
      3547.8
    ],
    [
      2510.7,
      493.8,
      493.8,
      493.8,
      493.8,
      7354.6,
      594.9,
      2462.7,
      1733.5,
      3172.9,
      0,
      880.6,
      594.9,
      2708.3,
      2591.1,
      4024.3,
      5629.4,
      510.8,
      5220.6,
      1753.5,
      3172.9,
      282.1,
      3064.3,
      261.5,
      261.5,
      433,
      261.5,
      1494.2,
      533.2,
      594.9,
      243.4,
      594.9,
      594.9,
      594.9,
      460.9
    ],
    [
      2953.4,
      878.4,
      878.4,
      878.4,
      878.4,
      7797.3,
      1399.8,
      2905.4,
      962.6,
      3615.6,
      910.6,
      0,
      1399.8,
      3151,
      3033.8,
      4467,
      6072.1,
      1343.6,
      5663.3,
      2196.2,
      3615.6,
      811,
      3507,
      833.3,
      833.3,
      898.3,
      833.3,
      1936.9,
      1342,
      1399.8,
      787.4,
      1399.8,
      1399.8,
      1399.8,
      1265.8
    ],
    [
      2571.7,
      833.9,
      833.9,
      833.9,
      833.9,
      7694.7,
      0,
      2523.7,
      2073.6,
      3513,
      497.2,
      1220.7,
      0,
      2769.3,
      2652.1,
      4085.3,
      5690.4,
      331.7,
      5560.7,
      2093.6,
      3513,
      622.2,
      3125.3,
      601.6,
      601.6,
      773.1,
      601.6,
      1834.3,
      179.9,
      0,
      583.5,
      0,
      0,
      0,
      263.8
    ],
    [
      899.8,
      2648.1,
      2648.1,
      2648.1,
      2648.1,
      9293.7,
      2607,
      1105.6,
      3905.6,
      5112,
      2625.7,
      3052.7,
      2607,
      0,
      1066.6,
      2435,
      4040.1,
      2705.6,
      7159.7,
      3692.6,
      5112,
      2561.7,
      1112.7,
      2584,
      2584,
      2649,
      2584,
      3433.3,
      2713.9,
      2607,
      2538.1,
      2607,
      2607,
      2607,
      2637.7
    ],
    [
      160.1,
      2680.6,
      2680.6,
      2680.6,
      2680.6,
      9326.2,
      2639.5,
      274.1,
      3938.1,
      5144.5,
      2658.2,
      3085.2,
      2639.5,
      1058.1,
      0,
      2304,
      3909.1,
      2738.1,
      7192.2,
      3725.1,
      5144.5,
      2594.2,
      1653.7,
      2616.5,
      2616.5,
      2681.5,
      2616.5,
      3465.8,
      2746.4,
      2639.5,
      2570.6,
      2639.5,
      2639.5,
      2639.5,
      2670.2
    ],
    [
      2222.2,
      4041.2,
      4041.2,
      4041.2,
      4041.2,
      10686.8,
      4000.1,
      2462,
      5298.7,
      6505.1,
      4018.8,
      4445.8,
      4000.1,
      2465,
      2389,
      0,
      2143.8,
      4098.7,
      8552.8,
      5085.7,
      6505.1,
      3954.8,
      3014.3,
      3977.1,
      3977.1,
      4042.1,
      3977.1,
      4826.4,
      4107,
      4000.1,
      3931.2,
      4000.1,
      4000.1,
      4000.1,
      4030.8
    ],
    [
      3888.2,
      5707.2,
      5707.2,
      5707.2,
      5707.2,
      12352.8,
      5666.1,
      4128,
      6964.7,
      8171.1,
      5684.8,
      6111.8,
      5666.1,
      4131,
      4055,
      2177,
      0,
      5764.7,
      10218.8,
      6751.7,
      8171.1,
      5620.8,
      4680.3,
      5643.1,
      5643.1,
      5708.1,
      5643.1,
      6492.4,
      5773,
      5666.1,
      5597.2,
      5666.1,
      5666.1,
      5666.1,
      5696.8
    ],
    [
      2583.5,
      807.2,
      807.2,
      807.2,
      807.2,
      7668,
      492.4,
      2535.5,
      2046.9,
      3486.3,
      470.5,
      1194,
      492.4,
      2781.1,
      2663.9,
      4097.1,
      5702.2,
      0,
      5534,
      2066.9,
      3486.3,
      595.5,
      3137.1,
      574.9,
      574.9,
      746.4,
      574.9,
      1807.6,
      371.5,
      492.4,
      556.8,
      492.4,
      492.4,
      492.4,
      489.9
    ],
    [
      6913.5,
      5046.8,
      5046.8,
      5046.8,
      5046.8,
      8251.1,
      5549.2,
      6865.5,
      6304.3,
      3852.1,
      5060,
      5451.4,
      5549.2,
      7111.1,
      6993.9,
      8427.1,
      10032.2,
      5551.7,
      0,
      4300.5,
      3852.1,
      4960.4,
      7467.1,
      4982.7,
      4982.7,
      5047.7,
      4982.7,
      4559.4,
      5491.4,
      5549.2,
      4936.8,
      5549.2,
      5549.2,
      5549.2,
      5415.2
    ],
    [
      3573.1,
      1706.4,
      1706.4,
      1706.4,
      1706.4,
      6595.3,
      2208.8,
      3525.1,
      2963.9,
      2413.6,
      1719.6,
      2111,
      2208.8,
      3770.7,
      3653.5,
      5086.7,
      6691.8,
      2211.3,
      4461.3,
      0,
      2413.6,
      1620,
      4126.7,
      1642.3,
      1642.3,
      1707.3,
      1642.3,
      366.2,
      2151,
      2208.8,
      1596.4,
      2208.8,
      2208.8,
      2208.8,
      2074.8
    ],
    [
      5046.1,
      3179.4,
      3179.4,
      3179.4,
      3179.4,
      5312.7,
      3681.8,
      4998.1,
      4436.9,
      0,
      3192.6,
      3584,
      3681.8,
      5243.7,
      5126.5,
      6559.7,
      8164.8,
      3684.3,
      3938.6,
      2433.1,
      0,
      3093,
      5599.7,
      3115.3,
      3115.3,
      3180.3,
      3115.3,
      2692,
      3624,
      3681.8,
      3069.4,
      3681.8,
      3681.8,
      3681.8,
      3547.8
    ],
    [
      2513,
      247,
      247,
      247,
      247,
      7356.9,
      639.9,
      2465,
      1735.8,
      3175.2,
      150.7,
      882.9,
      639.9,
      2710.6,
      2593.4,
      4026.6,
      5631.7,
      642.4,
      5222.9,
      1755.8,
      3175.2,
      0,
      3066.6,
      22.3,
      22.3,
      186.2,
      22.3,
      1496.5,
      582.1,
      639.9,
      23.4,
      639.9,
      639.9,
      639.9,
      505.9
    ],
    [
      1520.6,
      3041.3,
      3041.3,
      3041.3,
      3041.3,
      9686.9,
      3000.2,
      1726.4,
      4298.8,
      5505.2,
      3018.9,
      3445.9,
      3000.2,
      1101.8,
      1687.4,
      3034.2,
      4639.3,
      3098.8,
      7552.9,
      4085.8,
      5505.2,
      2954.9,
      0,
      2977.2,
      2977.2,
      3042.2,
      2977.2,
      3826.5,
      3107.1,
      3000.2,
      2931.3,
      3000.2,
      3000.2,
      3000.2,
      3030.9
    ],
    [
      2533.6,
      224.7,
      224.7,
      224.7,
      224.7,
      7377.5,
      617.6,
      2485.6,
      1756.4,
      3195.8,
      128.4,
      903.5,
      617.6,
      2731.2,
      2614,
      4047.2,
      5652.3,
      620.1,
      5243.5,
      1776.4,
      3195.8,
      20.6,
      3087.2,
      0,
      0,
      163.9,
      0,
      1517.1,
      559.8,
      617.6,
      44,
      617.6,
      617.6,
      617.6,
      483.6
    ],
    [
      2533.6,
      224.7,
      224.7,
      224.7,
      224.7,
      7377.5,
      617.6,
      2485.6,
      1756.4,
      3195.8,
      128.4,
      903.5,
      617.6,
      2731.2,
      2614,
      4047.2,
      5652.3,
      620.1,
      5243.5,
      1776.4,
      3195.8,
      20.6,
      3087.2,
      0,
      0,
      163.9,
      0,
      1517.1,
      559.8,
      617.6,
      44,
      617.6,
      617.6,
      617.6,
      483.6
    ],
    [
      2582.6,
      106.2,
      106.2,
      106.2,
      106.2,
      7426.5,
      730.3,
      2534.6,
      1830.3,
      3244.8,
      241.1,
      977.4,
      730.3,
      2780.2,
      2663,
      4096.2,
      5701.3,
      732.8,
      5292.5,
      1825.4,
      3244.8,
      183.2,
      3136.2,
      162.6,
      162.6,
      0,
      162.6,
      1566.1,
      672.5,
      730.3,
      183.2,
      730.3,
      730.3,
      730.3,
      596.3
    ],
    [
      2533.6,
      224.7,
      224.7,
      224.7,
      224.7,
      7377.5,
      617.6,
      2485.6,
      1756.4,
      3195.8,
      128.4,
      903.5,
      617.6,
      2731.2,
      2614,
      4047.2,
      5652.3,
      620.1,
      5243.5,
      1776.4,
      3195.8,
      20.6,
      3087.2,
      0,
      0,
      163.9,
      0,
      1517.1,
      559.8,
      617.6,
      44,
      617.6,
      617.6,
      617.6,
      483.6
    ],
    [
      3322.4,
      1455.7,
      1455.7,
      1455.7,
      1455.7,
      6853.9,
      1958.1,
      3274.4,
      2713.2,
      2672.2,
      1468.9,
      1860.3,
      1958.1,
      3520,
      3402.8,
      4836,
      6441.1,
      1960.6,
      4719.9,
      377.8,
      2672.2,
      1369.3,
      3876,
      1391.6,
      1391.6,
      1456.6,
      1391.6,
      0,
      1900.3,
      1958.1,
      1345.7,
      1958.1,
      1958.1,
      1958.1,
      1824.1
    ],
    [
      2554.1,
      816.3,
      816.3,
      816.3,
      816.3,
      7677.1,
      329.3,
      2506.1,
      2056,
      3495.4,
      479.6,
      1203.1,
      329.3,
      2751.7,
      2634.5,
      4067.7,
      5672.8,
      314.1,
      5543.1,
      2076,
      3495.4,
      604.6,
      3107.7,
      584,
      584,
      755.5,
      584,
      1816.7,
      0,
      329.3,
      565.9,
      329.3,
      329.3,
      329.3,
      246.2
    ],
    [
      2571.7,
      833.9,
      833.9,
      833.9,
      833.9,
      7694.7,
      0,
      2523.7,
      2073.6,
      3513,
      497.2,
      1220.7,
      0,
      2769.3,
      2652.1,
      4085.3,
      5690.4,
      331.7,
      5560.7,
      2093.6,
      3513,
      622.2,
      3125.3,
      601.6,
      601.6,
      773.1,
      601.6,
      1834.3,
      179.9,
      0,
      583.5,
      0,
      0,
      0,
      263.8
    ],
    [
      2489.6,
      250.4,
      250.4,
      250.4,
      250.4,
      7333.5,
      624,
      2441.6,
      1712.4,
      3151.8,
      134.8,
      859.5,
      624,
      2687.2,
      2570,
      4003.2,
      5608.3,
      626.5,
      5199.5,
      1732.4,
      3151.8,
      23.6,
      3043.2,
      45.9,
      45.9,
      189.6,
      45.9,
      1473.1,
      566.2,
      624,
      0,
      624,
      624,
      624,
      490
    ],
    [
      2571.7,
      833.9,
      833.9,
      833.9,
      833.9,
      7694.7,
      0,
      2523.7,
      2073.6,
      3513,
      497.2,
      1220.7,
      0,
      2769.3,
      2652.1,
      4085.3,
      5690.4,
      331.7,
      5560.7,
      2093.6,
      3513,
      622.2,
      3125.3,
      601.6,
      601.6,
      773.1,
      601.6,
      1834.3,
      179.9,
      0,
      583.5,
      0,
      0,
      0,
      263.8
    ],
    [
      2571.7,
      833.9,
      833.9,
      833.9,
      833.9,
      7694.7,
      0,
      2523.7,
      2073.6,
      3513,
      497.2,
      1220.7,
      0,
      2769.3,
      2652.1,
      4085.3,
      5690.4,
      331.7,
      5560.7,
      2093.6,
      3513,
      622.2,
      3125.3,
      601.6,
      601.6,
      773.1,
      601.6,
      1834.3,
      179.9,
      0,
      583.5,
      0,
      0,
      0,
      263.8
    ],
    [
      2571.7,
      833.9,
      833.9,
      833.9,
      833.9,
      7694.7,
      0,
      2523.7,
      2073.6,
      3513,
      497.2,
      1220.7,
      0,
      2769.3,
      2652.1,
      4085.3,
      5690.4,
      331.7,
      5560.7,
      2093.6,
      3513,
      622.2,
      3125.3,
      601.6,
      601.6,
      773.1,
      601.6,
      1834.3,
      179.9,
      0,
      583.5,
      0,
      0,
      0,
      263.8
    ],
    [
      2468.7,
      730.9,
      730.9,
      730.9,
      730.9,
      7591.7,
      323.4,
      2420.7,
      1970.6,
      3410,
      394.2,
      1117.7,
      323.4,
      2666.3,
      2549.1,
      3982.3,
      5587.4,
      166.4,
      5457.7,
      1990.6,
      3410,
      519.2,
      3022.3,
      498.6,
      498.6,
      670.1,
      498.6,
      1731.3,
      256.7,
      323.4,
      480.5,
      323.4,
      323.4,
      323.4,
      0
    ]
  ]
};

export async function getDistanceMatrix(coordinates) {
    if(cache[JSON.stringify(coordinates)]) {
        return cache[JSON.stringify(coordinates)];
    }
    try {
        let result = await fetch(config.osrm_api_location + `/table/v1/driving/${coordinates.map(c => c.join(',')).join(';')}`);
        if(!result.ok) {
            throw new Error(`Code ${result.status}`);
        } else {
            const json = await result.json();
            if(json.code === "Ok") {
                cache[JSON.stringify(coordinates)] = json.durations;
                console.log(cache);
                return json.durations;
            } else {
                throw new Error(json.code);
            }
        }
    } catch(e) {
        throw e;
    }
}

export async function getRoutePolyline6(coordinates) {
    try {
        let result = await fetch(config.osrm_api_location + `/route/v1/driving/${coordinates.map(c => c.join(',')).join(';')}?overview=full&geometries=polyline6`);
        if(!result.ok) {
            throw new Error(`Code ${result.status}`);
        } else {
            const json = await result.json();
            if(json.code === "Ok") {
                return json.routes[0].geometry;
            } else {
                throw new Error(json.code);
            }
        }
    } catch(e) {
        throw e;
    }
}

