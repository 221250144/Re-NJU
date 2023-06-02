const {ccclass, property} = cc._decorator;

@ccclass
export default class GlobalData extends cc.Component {
    static sharedData: GlobalData = new GlobalData();

    // 定义需要传递的参数
     public winGame: boolean;
     public choicePath:string = '';
     public dateSucceed:boolean = false;

    onLoad () {
    }

    start () {

    }

    // update (dt) {}
}
