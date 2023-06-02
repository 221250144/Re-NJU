interface DialogueData {
    characterName: string;
    dialogueText: string;
    imagepath: string;
    characterImage: cc.SpriteFrame;
  }
import script from "./gameControl";
const {ccclass, property} = cc._decorator;

@ccclass
export default class dialogueOvenScene extends cc.Component {

    @property(cc.Label)
    private characterNameLabel: cc.Label = null;
    @property(cc.Label)
    private dialogueTextLabel: cc.Label = null;
    @property(cc.Sprite)
    private characterImage: cc.Sprite = null;
    @property(script)
    gameControl:script = null;

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
        this.node.getChildByName("button2").active = true;
        this.node.getChildByName("button2").getComponent(cc.Button).interactable = true;
        this.node.getChildByName('button2').getComponent(cc.Button).enabled = true;
        return;
      }

      this.currentIndex = this.skiptext(this.currentIndex);

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

    skiptext(currentIndex){
      if (currentIndex == 0 && this.gameControl.gameWin){
        return 3;
      }else if(currentIndex == 3 && !this.gameControl.gameWin){
        return 5;
      }
      return currentIndex;
    }

    toDateScene(){
      cc.director.loadScene("dateScene");
    }

    onLoad () {
        this.node.active = false;
        //开始游戏
        this.gameControl;

        this.node.getChildByName("button2").active = false;
        this.node.getChildByName("button2").getComponent(cc.Button).interactable = false;
        this.node.getChildByName('button2').getComponent(cc.Button).enabled = false;
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
            dialogueText: '有点困了，小睡一会',
            imagepath: 'images/hero', // 角色的图片资源
            characterImage:null,
          };
          this.addDialogueData(heroDialogue1);
          
          const heroDialogue2: DialogueData = {
            characterName: '',
            dialogueText: '......',
            imagepath: '',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue2);

          const heroDialogue3: DialogueData = {
            characterName: '小宇',
            dialogueText: '嗯啊，睡了一觉真舒服',
            imagepath: 'images/hero', // 角色的图片资源
            characterImage:null,
          };
          this.addDialogueData(heroDialogue3);

          const heroDialogue4: DialogueData = {
            characterName: '小宇',
            dialogueText: '有点困......算了，还是坚持一会吧，要是小憩不小心睡过头，把饼干烤焦了就糟了',
            imagepath: 'images/hero',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue4);

          const heroDialogue5: DialogueData = {
            characterName: '小宇',
            dialogueText: '（设定好闹钟，静静地边玩手机边等待饼干中）',
            imagepath: 'images/hero',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue5);

          const heroDialogue6: DialogueData = {
            characterName: '小宇',
            dialogueText: '......',
            imagepath: '', // 角色的图片资源
            characterImage:null,
          };
          this.addDialogueData(heroDialogue6);

          const heroDialogue7: DialogueData = {
            characterName: '小宇',
            dialogueText: '让我看看饼干烤好没有',
            imagepath: 'images/hero', // 角色的图片资源
            characterImage:null,
          };
          this.addDialogueData(heroDialogue7);

          const heroDialogue8: DialogueData = {
            characterName: '小宇',
            dialogueText: '（打开烤箱，取出了饼干）',
            imagepath: '', // 角色的图片资源
            characterImage:null,
          };
          this.addDialogueData(heroDialogue8);

          const heroDialogue9: DialogueData = {
            characterName: '小宇',
            dialogueText: '嗯，看起来还不错',
            imagepath: 'images/hero', // 角色的图片资源
            characterImage:null,
          };
          this.addDialogueData(heroDialogue9);

          const heroDialogue10: DialogueData = {
            characterName: '小宇',
            dialogueText: '（看看表）',
            imagepath: 'images/hero', // 角色的图片资源
            characterImage:null,
          };
          this.addDialogueData(heroDialogue10);

          const heroDialogue11: DialogueData = {
            characterName: '小宇',
            dialogueText: '快到预定时间了，刚好把这些刚出炉的饼干带过去送给她',
            imagepath: 'images/hero', // 角色的图片资源
            characterImage:null,
          };
          this.addDialogueData(heroDialogue11);
    }

    // update (dt) {}
}
