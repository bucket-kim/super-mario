const datas = [
  {
    name: "button01",
    position: [-3.9406771659851074, 0.5476543307304382, 2.7853219509124756],
    title: "Yoshi's Island 1",
    information:
      " First Level of the game. It's the only way to reach the Yellow Switch to activate the yellow block. The level has a grassland theme.",
    image: "https://mario.wiki.gallery/images/8/81/YoshisIsland1.png",
  },
  {
    name: "button02",
    position: [-2.882596015930176, 0.5476542115211487, 2.7853217124938965],
    title: "Yoshi's Island 2",
    information:
      " Second Level of the game. This level introduces more characters, such as Yoshi, Monty Moles, Koopa, Berries, and Beanstalks. The level has agrassland theme.",
    image: "https://mario.wiki.gallery/images/9/97/YoshisIsland2.png",
  },
  {
    name: "button03",
    position: [-2.882596492767334, 0.5476543307304382, 2.449998378753662],

    title: "Yoshi's Island 3",
    information:
      " First Level of the game. It's the only way to reach the Yellow Switch to activate the yellow block. The level has a grassland theme.",
    image: "https://mario.wiki.gallery/images/8/81/YoshisIsland1.png",
  },
  {
    name: "button04",
    position: [-2.581258535385132, 0.5476543307304382, 2.1237380504608154],

    title: "Yoshi's Island 4",
    information:
      " Fourth Level of the game. It takes place on a lake and features a lot of floating platforms. This level features fire flowers.",
    image: "https://mario.wiki.gallery/images/6/61/Yoshi%27s_Island_4.png",
  },
  {
    name: "button05",
    position: [-1.0614168643951416, 1.997063398361206, -3.163473606109619],

    title: "Donut Plains 1",
    information:
      "  First Level of the Donut Plains. It introduces the cape feather and caped form of Mario. The level has grassland theme and green mountains background.",
    image: "https://mario.wiki.gallery/images/0/0c/Donut_Plains_1.png",
  },
  {
    name: "button06",
    position: [-3.5446956157684326, 0.9748174548149109, -0.7820307016372681],
    title: "Donut Plains 2",
    information:
      "  Underground Level of the Donut Plains. There are three exits in this level. It's the only way to get to the Green Switch.",
    image: "https://mario.wiki.gallery/images/d/d7/Donut_Plains_2.png",
  },
  {
    name: "button07",
    position: [-1.9456076622009277, 0.9748174548149109, -1.7408933639526367],

    title: "Donut Plains 3",
    information:
      "  Third Level of the Donut Plains. This level takes place above a mushroom forest, featuring triple swing lift and pulley lift.",
    image: "https://mario.wiki.gallery/images/2/25/Donut_Plains_3.png",
  },
  {
    name: "button08",
    position: [-1.3177874088287354, 0.9748174548149109, -1.1911437511444092],

    title: "Donut Plains 4",
    information:
      " Fourth Level of the Donut Plains. Mario or Luigi can airborne counterpart enemies likeHammer Brother and Flying Goombas. This map connects to 2nd Morton's Castle.",
    image: "https://mario.wiki.gallery/images/d/d8/DonutPlains4.png",
  },
  {
    name: "button09",
    position: [-1.0614168643951416, 1.997063398361206, -3.163473606109619],
    title: "Vanilla Secret 2",
    information:
      " This level is accessed by taking a secret path that leads to the mountain top. it contains high cloud background, accessible only by caped Mario.",
    image: "https://mario.wiki.gallery/images/e/ec/Vanilla_Secret_2.png",
  },
  {
    name: "button10",
    position: [-0.5428133010864258, 1.997063398361206, -3.1634738445281982],

    title: "Vanilla Secret 3",
    information:
      "    Clearing this level requires either jumping on dolphins or swimming through the water. The only enemy in the level is a Porcu Puffer.",
    image: "https://mario.wiki.gallery/images/1/1c/Vanilla_Secret_3.png",
  },
  {
    name: "button11",
    position: [1.1417049169540405, 1.957991600036621, -3.2115283012390137],

    title: "Butter Bridge 1",
    information:
      " This is one of the twin bridges area. It can be accessed through completing Vanilla Fortress. Mario comes to piston lifts, which sinks one side and other side to rise up.",
    image: "https://mario.wiki.gallery/images/4/4a/Butter_Bridge_1.png",
  },
  {
    name: "button12",
    position: [1.0735080242156982, 1.3017635345458984, -2.943187713623047],

    title: "Cheese Bridge Area",
    information:
      "  Cheese bridge is smallter than the Butter bridge. It contains chainsaw obstacles with floating wood blocks to reach the end point.",
    image: "https://mario.wiki.gallery/images/5/56/Cheese_Bridge_Area.png",
  },
  {
    name: "button13",
    position: [1.8374665975570679, 1.957991600036621, -3.2115283012390137],

    title: "Butter Bridge 2",
    information:
      " Mario travels along a long bridge, but the shell-less Koopas kick their shells at Mario. He can throw the shell up to ge items or to kill enemies.",
    image: "https://mario.wiki.gallery/images/e/ee/Butter_Bridge_2.png",
  },
  {
    name: "button14",
    position: [1.9582619667053223, 1.306661605834961, -2.9483654499053955],

    title: "Cookie Mountain",
    information:
      " Mario encounters large amount of Monty Moles. This level makes the first appearance of the Sumo Brother, which stomps the ground to create a fire obstacle. They can only be hit from below or cape spin.",
    image: "https://mario.wiki.gallery/images/8/8b/CookieMountain.png",
  },
  {
    name: "button15",
    position: [3.3343489170074463, 0.9784248471260071, -1.4220917224884033],

    title: "Forest of Illusion 1",
    information:
      " First level of the Forest Illusion. Mario finds red Koopa that pops out from the block. There is a key that leads to another platform.",
    image:
      "https://mario.wiki.gallery/images/6/68/Forest_of_Illusion_1_SMW.png",
  },
  {
    name: "button16",
    position: [3.719190835952759, 0.9784248471260071, -0.8137019872665405],

    title: "Forest of Illusion 2",
    information:
      " This level is underwater level. It features Urchins and many Blurps that swims towardss Mario and off the screen. There is another key hole that leads to the blue switch level.",
    image: "https://mario.wiki.gallery/images/e/ee/Forest_of_Illusion_2.png",
  },
  {
    name: "button17",
    position: [3.3286898136138916, 0.9784248471260071, -0.4373491406440735],

    title: "Forest of Illusion 4",
    information:
      "This level can be accessed through completing Forest of Illusion 2 by getting out of the secret exit with the key. Mario is confronted by a Fishin' Lakitu followed by Koopa Paratroopa.",
    image: "https://mario.wiki.gallery/images/a/ad/Forest_of_Illusion_4.png",
  },
  {
    name: "button18",
    position: [2.522219181060791, 0.9784249663352966, -0.8137020468711853],

    title: "Forest of Illusion 3",
    information:
      "This is the third level of the world. It takes at a night time. This level contains berries for Yoshi to eat. Bob-omb will follow you around so you need to watch out.",
    image: "https://mario.wiki.gallery/images/3/37/Forest_of_Illusion_3.png",
  },
  {
    name: "button19",
    position: [2.522219181060791, 0.9784248471260071, -0.4373491406440735],

    title: "Forest Secret Area",
    information:
      " This stage contains flying Koopa Paratroopas roaming around the sky, guarding various blocks and coins. You can fly towards the goal with cape feather or blue yoshi.",
    image: "https://mario.wiki.gallery/images/5/57/ForestSecretArea.png",
  },
  {
    name: "button20",
    position: [2.217322826385498, 0.9784248471260071, 1.6563483476638794],

    title: "Chocolate Island 1",
    information:
      "  This level takes place on a small island in between Forest of Illusion and Chocolate Island. The most common enemies in the level are Dino-Rhinos and Dino-Torches. Careful not get burned by the fire.",
    image: "https://mario.wiki.gallery/images/d/d0/SMW_ChocolateIsland1.png",
  },
  {
    name: "button21",
    position: [1.4342082738876343, 0.3854479193687439, 2.963130474090576],

    title: "Chocolate Island 2",
    information:
      " This level can be accessed through the Coco ghost house. There are two ways to finish the level. One through the giant gate to access Chocolate Island 3, or through the secret exit with the key.",
    image: "https://mario.wiki.gallery/images/d/dc/ChocolateIsland2.png",
  },
  {
    name: "button22",
    position: [0.8705532550811768, 0.3854479193687439, 2.963130474090576],

    title: "Chocolate Island 3",
    information:
      "  This level contains many gray Single Swing Lifts over a bottomless pit. The Fuzzies move around the center of the swing lift disrupting Mario to pass through. Capes are favored power up in this level.",
    image: "https://mario.wiki.gallery/images/c/cf/ChocolateIsland3.png",
  },
  {
    name: "button23",
    position: [-0.2134048044681549, 0.3835093379020691, 3.496480703353882],

    title: "Chocolate Island 4",
    information:
      "  Fourth Level of the Chocolate Island. It's an underground level with the chocolate lava and the Mega Mole is introduced. There is a bonus room where player can collect massive amount of coins.",
    image: "https://mario.wiki.gallery/images/d/d2/ChocolateIsland4.png",
  },
  {
    name: "button24",
    position: [-0.9949547052383423, 0.3835093379020691, 3.496480703353882],

    title: "Chocolate Island 5",
    information:
      "This level has Spinies and many other things like coins and prize blocks trapped inside of rotating blocks and empty blocks. Completing this level will unlock #6 Wendy's Castle.",
    image: "https://mario.wiki.gallery/images/3/36/ChocolateIsland5.png",
  },
  {
    name: "button25",
    position: [-0.5114535093307495, 0.0037446022033691406, 1.860524296760559],

    title: "Chocolate Secret",
    information:
      " This level is in a subterranean location that connects to Valley of Boswer's entrance. This level has many chargin' chucks, kicking footballs to damage Mario. Lava is hazardous in this stage so becareful when to jump.",
    image: "https://mario.wiki.gallery/images/c/c6/ChocolateSecret.png",
  },
];

export default datas;
