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
        // 获取当前节点
        let eternalNode = this.node;

        // 添加组件
        eternalNode.addComponent(cc.Component);

        // 在 onDestroy 中取消注册销毁事件，确保不会被销毁
        let eternalNodeComp = eternalNode.getComponent(cc.Component);
        eternalNodeComp.onDestroy = function () {};

        // 在 cc.game.EVENT_GAME_RESTART 事件中重新注册 eternalNodeComp.onDestroy 方法
        cc.game.on(cc.game.EVENT_GAME_RESTART, function () {
            eternalNodeComp.onDestroy = function () {};
        });
    },

    onDestroy () {
        // 移除 eternalNode 节点
        let eternalNode = this.node;
        eternalNode.removeFromParent(true);
    }
});
