import Global from "../../../assets3/script/global"; // 导入 Global 类

const {ccclass, property} = cc._decorator;

@ccclass
export default class GameStart extends cc.Component {
    onLoad() {
        const delayTime = 3; // 延迟时间为 3 秒
        cc.director.getScheduler().schedule(() => {
            if (!Global.GlobalData.choice) {
                cc.director.loadScene('约她出来吃饭失败');
            } else {
                cc.director.loadScene('约她出来吃饭成功');
            }
        }, this, delayTime, 0, delayTime, false);
    }

}