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

    onBtnClick1: function(event, customEventData) {
        cc.log('Button clicked: ' + customEventData);
        GlobalData.is_out = true;
        cc.director.loadScene('study');
    },
    onBtnClick2: function(event, customEventData) {
        cc.log('Button clicked: ' + customEventData);
        cc.director.loadScene('study');
    },
    start () {

    },

    // update (dt) {},
});
