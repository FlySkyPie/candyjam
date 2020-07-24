import 'phaser';
import ResourceLoader from './ResourceLoader';
import Player from './Player';
import Cursor from './Cursor';

class BattlezoneScene extends Phaser.Scene {
    controls: Phaser.Cameras.Controls.FixedKeyControl | undefined;
    player: any;
    cursors: any;

    loader: ResourceLoader;
    isLoaded: boolean;

    progressBar: Phaser.GameObjects.Graphics | undefined;
    progressBox: Phaser.GameObjects.Graphics | undefined;

    wallsLayer: Phaser.Tilemaps.StaticTilemapLayer | any;

    constructor() {
        super('battlezone');
        this.isLoaded = false;
        this.loader = new ResourceLoader(this);
        console.log('battlezone constructed!'); //debug
    }

    preload() {
        this.loader.preload();

        console.log('battlezone preload!'); //debug
    }


    create() {
        this.loader.create().then(() => {
            const map = this.make.tilemap({key: "test3"});
            const tileset = map.addTilesetImage("tileset", "tileset-image");
            const groundLayer = map.createStaticLayer("ground", tileset, 0, 0);
            this.wallsLayer = map.createStaticLayer("walls", tileset, 0, 0);
            this.wallsLayer.setCollisionByProperty({collides: true});
            this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

            new Cursor(this);

            const anims = this.anims;
            anims.create({
                key: "right",
                frames: anims.generateFrameNames("player", {start: 0, end: 3}),
                frameRate: 7,
                repeat: 1
            });
            anims.create({
                key: "right-idle",
                frames: anims.generateFrameNames("player", {start: 0, end: 0}),
                frameRate: 7,
                repeat: 1
            });
            anims.create({
                key: "left",
                frames: anims.generateFrameNames("player", {start: 7, end: 4}),
                frameRate: 7,
                repeat: 1
            });
            anims.create({
                key: "left-idle",
                frames: anims.generateFrameNames("player", {start: 4, end: 4}),
                frameRate: 7,
                repeat: 1
            });
            
            this.player = new Player(this, [800, 300]);

            // Watch the player and worldLayer for collisions, for the duration of the scene:
            this.physics.add.collider(this.player, this.wallsLayer);

            const camera = this.cameras.main;
            this.cursors = this.input.keyboard.createCursorKeys();

            this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
                camera: camera,
                left: this.cursors.left,
                right: this.cursors.right,
                up: this.cursors.up,
                down: this.cursors.down,
                speed: 0.5
            });

            camera.startFollow(this.player);
            camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

            this.physics.world.createDebugGraphic();
            const debugGraphics = this.add.graphics().setAlpha(0.75);
            this.wallsLayer.renderDebug(debugGraphics, {
                tileColor: null, // Color of non-colliding tiles
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
            });
            this.isLoaded = true;
        });

        //this.scene.start('battlezone');
        console.log('battlezone created!');//debug
    }

    update(time: any, delta: any) {


    }
}

export {BattlezoneScene as default};