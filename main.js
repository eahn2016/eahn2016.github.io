var platformsHorizontal, platformsVertical, platformsHorizontalSmall;
var player, carrots, cursors, flag;
var score = 0;
var scoreText;
var stageText;
var winText;
var stage = 1;

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Title ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class title extends Phaser.Scene {

    constructor() {
        super('title');
    }

    preload() {
        this.load.image('bg', 'assets/bg.png');
    }

    create() {
        // background
        this.add.image(480,270,'bg');

        var titleText = this.add.text(180, 270, 'Help the bunny collect carrots!', {
            fontSize: '32px',
            fill: 'black'
        });

        var startText = this.add.text(330, 470, 'Press ENTER to start the game.', {
            fontSize: '16px',
            fill: 'black'
        });

        const start = () => {
            this.scene.start('stageOne');
        }

        this.input.keyboard.on('keydown_ENTER', function (event) {
            start();
        });
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ STAGE 1 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class stageOne extends Phaser.Scene {
    constructor() {
        super('stageOne');
    }

    preload() {
        this.load.image('bg', 'assets/bg.png');
        this.load.image('pWide', 'assets/pHor.png');
        this.load.image('pTall', 'assets/pVert1.png');
        this.load.image('pWideSmall', 'assets/pHorSmall.png');
        this.load.image('carrot', 'assets/carrot.png');
        this.load.image('flag', 'assets/flag.png');
        this.load.spritesheet('bunny', 'assets/bunny.png', {
            frameWidth: 32,
            frameHeight: 48
        });
    }

    create() {
        // background
        this.add.image(480,270,'bg');

        // platforms
        platformsHorizontal = this.physics.add.staticGroup();
        platformsVertical = this.physics.add.staticGroup();

        platformsVertical.create(200,550, 'pTall');
        platformsVertical.create(264,500, 'pTall');
        platformsVertical.create(830,550, 'pTall');

        platformsHorizontal.create(150,525,'pWide');
        platformsHorizontal.create(468,525,'pWide');
        platformsHorizontal.create(786,525,'pWide');
        platformsHorizontal.create(1104,525,'pWide');
        platformsHorizontal.create(20,220,'pWide');
        platformsHorizontal.create(600,470,'pWide');
        platformsHorizontal.create(630,320,'pWide');
        platformsHorizontal.create(950, 120,'pWide');

        platformsHorizontal.create(800,420,'pWideSmall');
        platformsHorizontal.create(900,380,'pWideSmall');
        platformsHorizontal.create(950,264,'pWideSmall');
        platformsHorizontal.create(370,320,'pWideSmall');
        platformsHorizontal.create(270,270,'pWideSmall');
        platformsHorizontal.create(300,170,'pWideSmall');
        platformsHorizontal.create(500,170,'pWideSmall');
        platformsHorizontal.create(700,170,'pWideSmall');

        //player
        player = this.physics.add.sprite(100, 420, 'bunny');

        player.setBounce(.2);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platformsHorizontal);
        this.physics.add.collider(player, platformsVertical);

        this.anims.create({
            key: 'left',
            frames: [ {key:'bunny', frame:0}],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ {key:'bunny', frame:1}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: [ {key:'bunny', frame:2}],
            frameRate: 10,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();

        // items
        carrots = this.physics.add.group({
            key: 'carrot',
            setXY: {x:25, y:183}
        });

        carrots.create(25, 488, 'carrot');
        carrots.create(915, 488, 'carrot');
        carrots.create(500, 432, 'carrot');
        carrots.create(600, 282, 'carrot');
        carrots.create(940, 226, 'carrot');
        carrots.create(493, 132, 'carrot');

        this.physics.add.collider(carrots, platformsHorizontal);
        this.physics.add.collider(carrots, platformsVertical);

        this.physics.add.overlap(player,carrots,collectcarrot,null,this);

        function collectcarrot(player, carrot) {
            carrot.disableBody(true, true);
            score += 1;
            scoreText.setText('Carrots collected: ' + score);
        }

        // score
        scoreText = this.add.text(16, 16, 'Carrots collected: ' + score, {
            fontSize: '32px',
            fill: 'black'
        });

        stageText = this.add.text(800, 16, 'Stage ' + stage, {
            fontSize: '32px',
            fill: 'black'
        });

        // flag
        flag = this.physics.add.group();
        flag.create(930, 83, 'flag');
        this.physics.add.collider(flag, platformsHorizontal);

        this.physics.add.overlap(player, flag, switchStageTwo, null, this);

        function switchStageTwo(player, flag) {
            console.log(this);
            this.scene.start('stageTwo');
            stage += 1;
            stageText.setText('Stage ' + stage);
        }
    }

    update() {
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play('right', true);
        } else {
            player.setVelocityX(0);
            player.anims.play('turn', true);
        }

        if (player.body.touching.down) {
            player.setVelocityY(-200);
        }
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ STAGE 2 ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class stageTwo extends Phaser.Scene {

    constructor() {
        super('stageTwo');
    }

    preload() {
        this.load.image('bg', 'assets/bg.png');
        this.load.image('pWide', 'assets/pHor.png');
        this.load.image('pTall', 'assets/pVert1.png');
        this.load.image('pWideSmall', 'assets/pHorSmall.png');
        this.load.image('carrot', 'assets/carrot.png');
        this.load.image('flag', 'assets/flag.png');
        this.load.image('pWideMed', 'assets/pHorMed.png');
        this.load.spritesheet('bunny', 'assets/bunny.png', {
            frameWidth: 32,
            frameHeight: 48
        });
    }

    create() {
        // background
        this.add.image(480,270,'bg');

        // platforms
        platformsHorizontal = this.physics.add.staticGroup();
        platformsVertical = this.physics.add.staticGroup();

        platformsHorizontal.create(410,415,'pWideMed');
        platformsHorizontal.create(639,315,'pWideMed');
        platformsHorizontal.create(785,360,'pWideMed');

        platformsVertical.create(330,450, 'pTall');
        platformsVertical.create(330,340, 'pTall');
        platformsVertical.create(330,230, 'pTall');
        platformsVertical.create(330,195, 'pTall');
        platformsVertical.create(392,425, 'pTall');
        platformsVertical.create(620,545, 'pTall');

        platformsVertical.create(680,450, 'pTall');
        platformsVertical.create(680,340, 'pTall');
        platformsVertical.create(680,230, 'pTall');
        platformsVertical.create(680,195, 'pTall');

        platformsHorizontal.create(150,525,'pWide');
        platformsHorizontal.create(468,525,'pWide');
        platformsHorizontal.create(786,525,'pWide');
        platformsHorizontal.create(1104,525,'pWide');

        platformsHorizontal.create(950,220,'pWide');

        platformsHorizontal.create(180,470,'pWideSmall');
        platformsHorizontal.create(60,420,'pWideSmall');
        platformsHorizontal.create(200,360,'pWideSmall');
        platformsHorizontal.create(60,300,'pWideSmall');
        platformsHorizontal.create(200,240,'pWideSmall');
        platformsHorizontal.create(60,180,'pWideSmall');
        platformsHorizontal.create(628,253,'pWideSmall');
        platformsHorizontal.create(500,170,'pWideSmall');
        platformsHorizontal.create(530,190,'pWideSmall');
        platformsHorizontal.create(340,120,'pWide');

        //player
        player = this.physics.add.sprite(100, 420, 'bunny');

        player.setBounce(.2);
        player.setCollideWorldBounds(true);
        this.physics.add.collider(player, platformsHorizontal);
        this.physics.add.collider(player, platformsVertical);

        this.anims.create({
            key: 'left',
            frames: [ {key:'bunny', frame:0}],
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ {key:'bunny', frame:1}],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: [ {key:'bunny', frame:2}],
            frameRate: 10,
            repeat: -1
        });

        cursors = this.input.keyboard.createCursorKeys();
        // items
        carrots = this.physics.add.group({
            key: 'carrot',
            setXY: {x:55, y:260}
        });

        carrots.create(450, 488, 'carrot');
        carrots.create(390, 312, 'carrot');
        carrots.create(675, 81, 'carrot');
        carrots.create(830, 320, 'carrot');

        this.physics.add.collider(carrots, platformsHorizontal);
        this.physics.add.collider(carrots, platformsVertical);

        this.physics.add.overlap(player,carrots,collectcarrot,null,this);

        // score
        scoreText = this.add.text(16, 16, 'Carrots collected: ' + score, {
            fontSize: '32px',
            fill: 'black'
        });

        stageText = this.add.text(800, 16, 'Stage ' + stage, {
            fontSize: '32px',
            fill: 'black'
        });

        // flag
        flag = this.physics.add.group();
        flag.create(760, 488, 'flag');
        this.physics.add.collider(flag, platformsHorizontal);

        this.physics.add.overlap(player, flag, switchWin, null, this);

        function switchWin(player, flag) {
            this.scene.start('win');
        }

        function collectcarrot(player, carrot) {
            carrot.disableBody(true, true);
            score += 1;
            scoreText.setText('Carrots collected: ' + score);
        }
    }

    update() {
        if (cursors.left.isDown) {
            player.setVelocityX(-160);
            player.anims.play('left', true);
        } else if (cursors.right.isDown) {
            player.setVelocityX(160);
            player.anims.play('right', true);
        } else {
            player.setVelocityX(0);
            player.anims.play('turn', true);
        }

        if (player.body.touching.down) {
            player.setVelocityY(-200);
        }
    }
}

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Win ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

class win extends Phaser.Scene {

    constructor() {
        super('win');
    }

    preload() {
        this.load.image('bg', 'assets/bg.png');
    }

    create() {
        // background
        this.add.image(480,270,'bg');

        winText = this.add.text(180, 270, 'You won! You collected ' + score + ' carrots!', {
            fontSize: '32px',
            fill: 'black'
        });

        var restartText = this.add.text(330, 470, 'Press ENTER to restart the game.', {
            fontSize: '16px',
            fill: 'black'
        });

        const restart = () => {
            this.scene.start('stageOne');
        }

        this.input.keyboard.on('keydown_ENTER', function (event) {
            restart();
        });
    }
}

var config = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300},
            debug:false
        }
    },
    scene: [title, stageOne, stageTwo, win]
};

var game = new Phaser.Game(config);
