title = "BALL ZUCKER";

description = `
[TAP] to Turn Right
`;

const G = {
    WIDTH: 200,
    HEIGHT: 200,

    PLAYERSPEED: 1
};

character = [
`
gggggg
g    g
 gggg 
 g  g 
gg  gg
`
];

options = {
    viewSize: {
        x: G.WIDTH,
        y: G.HEIGHT
    },
    theme: "dark"
};

/**
 * @typedef {{
 * pos: Vector,
 * facing: number}} Player
 */

/**
 * @type { Player }
 */
let player;
let balls;
let playerHealth;

function update() {
  if (!ticks) {
    playerHealth = 3;
    balls = [];
    player = { 
        pos: vec(20, 20), 
        facing: 1};
  }

  if (playerHealth > 3) {
    playerHealth = 3;
  }

  if (balls.length < 15) {
    const pos = vec(floor(rnd(30, 180)),floor(rnd(30, 180)));
    let type = floor(rnd(1, 9)) > 5 ? 1 : 0;
    if (floor(rnd(1, 50) === 25)) {
        type = 2;
    }
    balls.push({ pos, type });
  }


    if (playerHealth === 3) {
        color("green");
    } else if (playerHealth === 2) {
        color("yellow");
    } else if (playerHealth === 1) {
        color("red");
    } else {
        color("light_red");
        end();
    }
    char("a", player.pos);
    console.log("spawned");

    if (input.isJustPressed) {
        if (player.facing === 4) {
            player.facing = 1;
        } else {
            player.facing++;
        }
    }
    // right
    if(player.facing === 1) {
        player.pos.x += (G.PLAYERSPEED + difficulty);
    } else if(player.facing === 2) {
        player.pos.y += (G.PLAYERSPEED + difficulty);
    } else if(player.facing === 3) {
        player.pos.x -= (G.PLAYERSPEED + difficulty);
    } else if(player.facing ===  4) {
        player.pos.y -= (G.PLAYERSPEED + difficulty);
    }

    if (player.pos.x > G.WIDTH) {
        player.pos.x = 0;
    } else if (player.pos.x < 0) {
        player.pos.x = G.WIDTH;
    }

    if (player.pos.y > G.HEIGHT) {
        player.pos.y = 0;
    } else if (player.pos.y < 0) {
        player.pos.y = G.HEIGHT;
    }

  

  remove(balls, (b) => {
    if (b.type === 0) {
        color("cyan")
    } else if (b.type === 1) {
        color("light_red")
    } else {
        color("green")
    }

    const playerTouched = box(b.pos, 6, 6).isColliding.char.a;

    if (playerTouched) {
        if (b.type === 0) {
            addScore(10 * difficulty, b.pos);
            color("cyan");
            play("coin")
        } else if (b.type === 1){
            playerHealth--;
            color("red");
            play("hit");
        } else {
            color("green")
            playerHealth++;
            play("powerUp")
        }
        particle(b.pos);
    }

    return(playerTouched);
  })
}