// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
window.GlobalData2={
    seconds:0
}
cc.Class({
    extends: cc.Component,

    properties: {
        music:cc.AudioClip
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        GlobalData2.seconds = cc.audioEngine.playEffect(this.music, true);
        setTimeout(function () {
            cc.director.loadScene("重新来到校门");
        }, 3000); // 加载三秒后切换场景
    },
    start () {

    },

    // update (dt) {},
});
