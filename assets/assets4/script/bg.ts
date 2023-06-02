const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    @property([cc.SpriteFrame])
    bgSprites: cc.SpriteFrame[] = [];
    onLoad () {}

    start () {

    }

    // update (dt) {}
}
