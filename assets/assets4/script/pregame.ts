const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

   toGame(){
    cc.director.loadScene("ovenScene");
   }

    onLoad () {}

    start () {

    }

    // update (dt) {}
}
