// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;
import Global from '../../assets3/script/global'
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    play: cc.Label = null;

    onLoad(){
        if (this.play.node.on){
            this.goToGame();
        }
    }
    goToGame(){
        cc.audioEngine.stopEffect(Global.GlobalData.sound);
        cc.director.loadScene('math');
    }
    update (dt) {}
}
