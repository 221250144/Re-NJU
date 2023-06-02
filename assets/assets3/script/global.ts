const {ccclass, property} = cc._decorator;

@ccclass
export default class Global extends cc.Component {
    static GlobalData: Global = new Global();

    public meet: boolean;
    public choice: boolean = false;
    public sound:number = 0;

    // LIFE-CYCLE: CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
