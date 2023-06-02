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



    @property(cc.AudioClip)
    backgroundmusic: cc.AudioClip = null;

    onLoad(){
        Global.GlobalData.sound = cc.audioEngine.playEffect(this.backgroundmusic, true);

    }
    goToGame(){
        cc.director.preloadScene('bg1',(err)=>{
            if (!err){
                cc.director.loadScene('bg1',function(){

                });
            }
        });
    }
    update (dt) {}
}
