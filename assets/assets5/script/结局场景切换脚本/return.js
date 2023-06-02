// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {

    },



     onLoad () {
         setTimeout(function () {
             cc.audioEngine.stopEffect(GlobalData2.seconds);
             cc.director.loadScene("assets1/scenes/startup");
         }, 70000);
     },

    start () {

    },

    // update (dt) {},
});
