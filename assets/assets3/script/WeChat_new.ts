const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // LIFE-CYCLE CALLBACKS:
    @property(cc.AudioClip)
    wechatSound: cc.AudioClip = null;

    audio: number = null;

    onLoad () {
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.audio = cc.audioEngine.playEffect(this.wechatSound, true);
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.enter: {
                cc.director.loadScene('eat');
                cc.audioEngine.stopEffect(this.audio);
            }
        }
    }

    start () {

    }

    // update (dt) {}
}
