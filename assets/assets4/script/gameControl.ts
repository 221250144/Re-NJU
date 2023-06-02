const { ccclass, property } = cc._decorator;
import GlobalData from './GlobalData';

// 在发送参数的场景中
GlobalData.sharedData.winGame = true;


@ccclass
export default class gameControle extends cc.Component {

  @property(cc.Node)
  private pointer: cc.Node = null;
  @property(cc.Node)
  private validArea: cc.Node = null;
  @property(cc.Node)
  private truevalidArea: cc.Node = null;
  @property(cc.Node)
  private truevalidArea2: cc.Node = null;
  @property(cc.Node)
  private truevalidArea3:cc.Node = null;

  private isMovingRight: boolean = true;
  private isGameRunning: boolean = true;
  private turn:number = 1;
  gameWin:boolean = true;
  score: number = 0;

  onLoad() {
    cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    this.node.getChildByName("validArea2").active = false;
    this.node.getChildByName("validArea3").active = false;
    this.node.getChildByName("replay").active = false;
    this.node.getChildByName("goNext").active = false;
    this.node.getChildByName("replay").getComponent(cc.Button).interactable = false;
    this.node.getChildByName('replay').getComponent(cc.Button).enabled = false;
    this.node.getChildByName("goNext").getComponent(cc.Button).interactable = false;
    this.node.getChildByName('goNext').getComponent(cc.Button).enabled = false;
  }

  onDestroy() {
    cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
  }

  update(dt: number) {
    if (!this.isGameRunning) return;
    let speed:number = 400 + this.turn * 70;

    const validAreaWidth = this.validArea.width;
    const pointerWidth = this.pointer.width;

    let movement = speed * dt;
    if (!this.isMovingRight) {
      movement *= -1;
    }

    this.pointer.x += movement;

    // 到达边界时改变移动方向
    if (this.pointer.x + pointerWidth / 2 >= validAreaWidth / 2) {
      this.isMovingRight = false;
    } else if (this.pointer.x - pointerWidth / 2 <= -validAreaWidth / 2) {
      this.isMovingRight = true;
    }
  }

  onKeyDown(event: cc.Event.EventKeyboard) {
    if (event.keyCode == cc.macro.KEY.space) {
      if(this.turn == 1){
        this.stopPointer1();
        this.node.getChildByName("validArea2").active = true;
        this.node.getChildByName("validArea").active = false;
      }else if(this.turn == 2){
        this.stopPointer2();
        this.node.getChildByName("validArea3").active = true;
        this.node.getChildByName("validArea2").active = false;
      }else if(this.turn == 3){
        this.stopPointer3();
      }
    }
  }
  stopPointer1() {
    if (!this.isGameRunning) return;
    this.turn++;

    // 检查指针是否在有效区域上
    const pointerX = this.pointer.x;
    const validAreaX = this.truevalidArea.x;
    const validAreaWidth = this.truevalidArea.width;

    if (pointerX >= validAreaX - validAreaWidth / 2 && pointerX <= validAreaX + validAreaWidth / 2) {
      //cc.log('游戏成功！');
      this.score += 33;
      this.node.getChildByName("score").getComponent(cc.Label).string = "分数："+this.score;
    } else {
      //cc.log('游戏失败！');
      this.gameWin = false;
    }

  }

  stopPointer2() {
    if (!this.isGameRunning) return;
    this.turn++;

    // 检查指针是否在有效区域上
    const pointerX = this.pointer.x;
    const validAreaX = this.truevalidArea2.x;
    const validAreaWidth = this.truevalidArea2.width;

    if (pointerX >= validAreaX - validAreaWidth / 2 && pointerX <= validAreaX + validAreaWidth / 2) {
      this.score += 33;
      this.node.getChildByName("score").getComponent(cc.Label).string = "分数："+this.score;
    } else {
      this.gameWin = false;
    }
  }

  stopPointer3() {
    if (!this.isGameRunning) return;
    this.isGameRunning = false;
    this.onDestroy();

    // 检查指针是否在有效区域上
    const pointerX = this.pointer.x;
    const validAreaX = this.truevalidArea3.x;
    const validAreaWidth = this.truevalidArea3.width;

    if (pointerX >= validAreaX - validAreaWidth / 2 && pointerX <= validAreaX + validAreaWidth / 2) {
      this.score += 34;
      this.node.getChildByName("score").getComponent(cc.Label).string = "分数："+this.score;
    } else {
      this.gameWin = false;
    }

    this.node.getChildByName("replay").active = true;
    this.node.getChildByName("goNext").active = true;
    this.node.getChildByName("replay").getComponent(cc.Button).interactable = true;
    this.node.getChildByName('replay').getComponent(cc.Button).enabled = true;
    this.node.getChildByName("goNext").getComponent(cc.Button).interactable = true;
    this.node.getChildByName('goNext').getComponent(cc.Button).enabled = true;
  }

    //this.node.active = false;

  replay(){
    cc.director.loadScene("ovenScene");
  }
  goNext(){
    if(this.score != 100){
      GlobalData.sharedData.winGame = false;
    }
    this.node.active = false;
    this.node.getChildByName("replay").getComponent(cc.Button).interactable = false;
    this.node.getChildByName('replay').getComponent(cc.Button).enabled = false;
    this.node.getChildByName("goNext").getComponent(cc.Button).interactable = false;
    this.node.getChildByName('goNext').getComponent(cc.Button).enabled = false;
    cc.find("dialogue-bubble").active = true;
    cc.find("dialogue-bubble").getChildByName("button2").active = false;
    this.node = cc.find("background");
    this.node.opacity = 200;
  }
}