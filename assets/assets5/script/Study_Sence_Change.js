

cc.Class({
    extends: cc.Component,

    properties: {

    },
    onBtnClick3: function(event, customEventData) {
        cc.log('Button clicked: ' + customEventData);
        cc.director.loadScene('computer');
    },


    // onLoad () {},

    start () {

    },

    // update (dt) {},
});
