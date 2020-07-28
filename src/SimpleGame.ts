import 'phaser';
import Scene = Phaser.Scene;

import BattlezoneScene from './scenes/BattlezoneScene';
import MenuScene from './scenes/MenuScene';
import GameoverScene from './scenes/GameoverScene';
import HUDScene from './scenes/HUDScene';
import ShopScene from './scenes/ShopScene';
import LoadScene from './scenes/LoadScene';

import GameMonitor from './GameMonitor';
import PlayerController from './PlayerController';
import StateManager from './StateManager';

class SimpleGame {

    /*
        battlezoneScene: BattlezoneScene;
        menuScene: MenuScene;
        gameoverScene: GameoverScene;
        hudScene: HUDScene;
        shopScene: ShopScene;
        loadScene: LoadScene;
        */

    constructor() {
        let stateManager = new StateManager();
        let battlezoneScene = new BattlezoneScene(stateManager);
        let menuScene = new MenuScene(stateManager);
        let gameoverScene = new GameoverScene(stateManager);
        let hudScene = new HUDScene(stateManager);
        let shopScene = new ShopScene(stateManager);
        let loadScene = new LoadScene(stateManager);

        stateManager.setSatrBattleCallback(() => {
            let gameMonitor = new GameMonitor(hudScene, shopScene);
            let player = battlezoneScene.getRole();
            if (player !== undefined) {
                let controller = new PlayerController(battlezoneScene, player, gameMonitor);
            }
        })

        stateManager.setBattlezoneScene(battlezoneScene)
            .setMenuScene(menuScene)
            .setGameoverScene(gameoverScene)
            .setHUDScene(hudScene)
            .setShopScene(shopScene)
            .setLoadScene(loadScene)
            .startGame();
    }
}

export {SimpleGame as default};