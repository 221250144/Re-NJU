// 定义对话数据结构
interface DialogueData {
    characterName: string;
    dialogueText: string;
    imagepath: string;
    characterImage: cc.SpriteFrame;
  }

const {ccclass, property} = cc._decorator;

@ccclass
export default class dialogueSystem extends cc.Component {

    @property(cc.Label)
    private characterNameLabel: cc.Label = null;
    @property(cc.Label)
    private dialogueTextLabel: cc.Label = null;
    @property(cc.Sprite)
    private characterImage: cc.Sprite = null;

    private dialogueData: DialogueData[] = [];
    private currentIndex: number = 0;

    // 添加对话数据
    public addDialogueData(data: DialogueData): void {
      this.dialogueData.push(data);
    }

    // 播放下一条对话
    public playNextDialogue(): void {
      if (this.currentIndex >= this.dialogueData.length) {
        // 对话结束
        
        this.node.getChildByName("button").getComponent(cc.Button).interactable = true;
        this.node.getChildByName('button').getComponent(cc.Button).enabled = true;
        //this.node.active = false;
        return;
      }

      const data = this.dialogueData[this.currentIndex];
      this.characterNameLabel.string = data.characterName;
      this.dialogueTextLabel.string = data.dialogueText;
      let path:string = data.imagepath;
      cc.resources.load(path,cc.SpriteFrame,(error:Error,sf:cc.SpriteFrame)=>{
        this.characterImage.getComponent(cc.Sprite).spriteFrame = sf;
      });

      this.node.active = true;
      this.currentIndex++;
    }

    bake(){
        cc.director.loadScene("gameScene");
    }

    onLoad () {
        this.node.getChildByName("button").getComponent(cc.Button).interactable = false;
        this.node.getChildByName('button').getComponent(cc.Button).enabled = false;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }
    
    onKeyDown(event: cc.Event.EventKeyboard) {
     if (event.keyCode == cc.macro.KEY.space) {
        this.playNextDialogue();
      }
    }

    start () {
        const heroDialogue1: DialogueData = {
            characterName: '小宇',
            dialogueText: '最近在网上刷到了自制饼干的教学视频，视频里说亲自做饼干送给约会对象会很加分呢,我要试一试',
            imagepath: 'images/hero', // 角色的图片资源
            characterImage:null,
          };
          this.addDialogueData(heroDialogue1);
          
          const heroDialogue2: DialogueData = {
            characterName: '小宇',
            dialogueText: '在网上找了家可以DIY甜点的店,正好这次可以给她一个惊喜',
            imagepath: 'images/hero',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue2);

          const heroDialogue3: DialogueData = {
            characterName: '小宇',
            dialogueText: '让我看看手机，先是拿出一块黄油解冻......然后打几个鸡蛋一起搅拌......接着......',
            imagepath: 'images/hero', // 角色的图片资源
            characterImage:null,
          };
          this.addDialogueData(heroDialogue3);

          const heroDialogue4: DialogueData = {
            characterName: '小宇',
            dialogueText: '呼~最后把这些放在烤箱里面，等待烤好就大功告成了',
            imagepath: 'images/hero',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue4);

          const heroDialogue5: DialogueData = {
            characterName: '小宇',
            dialogueText: '-->找到烤箱，烘培你的饼干吧!--<',
            imagepath: 'images/hero',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue5);

    }

    // update (dt) {}
}
