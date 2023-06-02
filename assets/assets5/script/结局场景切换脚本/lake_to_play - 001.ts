import GlobalData from "../../../assets4/script/GlobalData";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameStart extends cc.Component {
    onLoad() {
        const delayTime = 3; // 延迟时间为 3 秒
        cc.director.getScheduler().schedule(() => {
            if (GlobalData.sharedData.dateSucceed) {
                cc.director.loadScene('和她一起看电影');
            } else {
                cc.director.loadScene('学习');
            }
        }, this, delayTime, 0, delayTime, false);
    }
}
