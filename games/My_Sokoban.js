/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started

@title: test
@author: 
@tags: []
@addedOn: 2025-00-00
*/

const player = "p"
const wall = "w";
const box = "b";
const goal = "g";
const end = "e";

setLegend(
  [ player, bitmap`
................
........0.000...
........00D440..
........0.000...
........0.......
.....000000.....
....03333330....
...0338333330...
..033883333330..
..038833333330..
..033333333330..
..033333333330..
...0333333330...
....03333330....
.....000000.....
................` ],
  [ wall, bitmap`
0000000000000000
0000000000000000
0000000000000000
0002222222222000
0002000000002000
0002000000002000
0002000000002000
0002000000002000
0002000000002000
0002000000002000
0002000000002000
0002000000002000
0002000022222000
0000222220000000
0000000000000000
0000000000000000` ],
  [ box, bitmap`
................
................
.....666666.....
...6666666666...
...6666666666...
..666006660066..
..660660606606..
..666666666666..
..666666666666..
..666000000066..
..666606666066..
...6660666066...
...6666000666...
.....666666.....
................
................` ],
  [ goal, bitmap`
................
................
................
................
................
0.0.............
0.0.............
0.0..00..0.0.00.
000.0..0.00.0..0
0.0.0000.0..0000
0.0.0....0..0...
0.0..000.0...000
................
................
................
................` ],
  [ end, bitmap`
................
................
................
...00......00...
..0..0....0..0..
.0....0..0....0.
.0....0..0....0.
................
................
..000000000000..
..0..........0..
..0..........0..
...0........0...
....00000000....
................
................` ],
)

setSolids([player, box, wall]) // blocked 막힘

let level = 0
const levels = [
  map`
p.wg
.bw.
....
....`,
  map`
.pw.www
.bw....
..w....
.....w.
.w...wg`,
]

setMap(levels[level])

// PUSHable 밀림
setPushables({
  [ player ]: [box]
})

onInput("s", () => {
  getFirst(player).y += 1
})
onInput("w", () => {
    getFirst(player).y -= 1;
});

onInput("a", () => {
    getFirst(player).x -= 1;
});

onInput("d", () => {
    getFirst(player).x += 1;
});


afterInput(() => {
  const numberCovered = tilesWith(goal, box).length;
    const targetNumber = tilesWith(goal).length;

    if (numberCovered === targetNumber) {
        // increase the current level number
        level = level + 1;

        const currentLevel = levels[level];

        // make sure the level exists and if so set the map
        if (currentLevel !== undefined) setMap(currentLevel);
        else {
            addText("You win!", { y: 4, color: color`3` });
        }
    }
})

onInput("j", () => {
    const currentLevel = levels[level];
    if (currentLevel !== undefined) setMap(currentLevel);
});
