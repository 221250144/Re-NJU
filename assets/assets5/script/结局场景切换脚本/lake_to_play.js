// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const {tsGlobal} = require("../../../assets4/script/GlobalData");

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},
    onLoad () {
        if(tsGlobal.dateSucceed){
            setTimeout(function () {
                cc.director.loadScene("和她一起看电影");
            }, 3000); // 加载三秒后切换场景
        }else {
            setTimeout(function () {
                cc.director.loadScene("学习");
            }, 3000); // 加载三秒后切换场景
        }
    },
    start () {

    },

    // update (dt) {},
});
