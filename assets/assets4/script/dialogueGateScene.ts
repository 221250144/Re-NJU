// 定义对话数据结构
interface DialogueData {
    characterName: string;
    dialogueText: string;
    imagepath: string;
    characterImage: cc.SpriteFrame;
  }
const {ccclass, property} = cc._decorator;
import GlobalData from './GlobalData';

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
    winGame:boolean = true;

    // 添加对话数据
    public addDialogueData(data: DialogueData): void {
      this.dialogueData.push(data);
    }

    // 播放下一条对话
    public playNextDialogue(): void {
      if (this.currentIndex >= this.dialogueData.length) {
        // 对话结束
        
        this.node.getChildByName("button3").active = true;
        return;
      }

      this.ischoice(this.currentIndex);
      //this.currentIndex = this.skip(this.currentIndex);
      
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

    ischoice(currentIndex1){
      if (currentIndex1 == 3){
        this.node.getChildByName("choice1").active = true;
        this.node.getChildByName("choice2").active = true;
        this.node.getChildByName("choice1").getComponentInChildren(cc.Label).string = "称赞她的妆容";
        this.node.getChildByName("choice2").getComponentInChildren(cc.Label).string = "......";
      }
    }

    isPraise(){
      this.node.getChildByName("choice1").active = false;
      this.node.getChildByName("choice2").active = false;
    }

    isSilent(){
      this.currentIndex += 3;
      this.node.getChildByName("choice1").active = false;
      this.node.getChildByName("choice2").active = false;
    }

    toWalkScene(){
        cc.director.loadScene("walkScene");
    }

    onLoad () {
        this.winGame = GlobalData.sharedData.winGame;
        this.node.getChildByName("button3").active = false;
        this.node.getChildByName("choice1").active = false;
        this.node.getChildByName("choice2").active = false;
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
            dialogueText: '抱歉来晚了',
            imagepath: 'images/hero', // 角色的图片资源
            characterImage:null,
          };
          this.addDialogueData(heroDialogue1);
          
          const heroDialogue2: DialogueData = {
            characterName: '萱萱',
            dialogueText: '没事，也没有超过约定时间嘛，我也才到没多久',
            imagepath: 'images/heroine',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue2);

          const heroDialogue3: DialogueData = {
            characterName: '',
            dialogueText: '(细看后你才发现她是精心打扮过的，妆不浓不淡，显得青春而有活力，看来她也很期待这次约会)',
            imagepath: '',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue3);

          const heroDialogue4: DialogueData = {
            characterName: '小宇',
            dialogueText: '',
            imagepath: 'images/hero',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue4);

          const heroDialogue5: DialogueData = {
            characterName: '小宇',
            dialogueText: '你今天很好看，这件长裙很适合你',
            imagepath: 'images/hero',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue5);

          const heroDialogue6: DialogueData = {
            characterName: '萱萱',
            dialogueText: '谢谢！我当时还在犹豫要不要穿这件呢，一直到刚才都还没有什么信心。谢谢',
            imagepath: 'images/heroine',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue6);

          const heroDialogue14: DialogueData = {
            characterName: '小宇',
            dialogueText: '(你注意到她露出了一抹微笑)',
            imagepath: '',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue14);

          const heroDialogue7: DialogueData = {
            characterName: '小宇',
            dialogueText: '对了，我做了一些饼干，你尝尝吧',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue7);

          const heroDialogue8: DialogueData = {
            characterName: '萱萱',
            dialogueText: '你自己做的吗，好棒，看起来很不错诶',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue8);

          const heroDialogue9: DialogueData = {
            characterName: '萱萱',
            dialogueText: '(接过饼干，拿了一块放进嘴里)',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue9);

          const heroDialogue10: DialogueData = {
            characterName: '萱萱',
            dialogueText: '......',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue10);

          const heroDialogue11: DialogueData = {
            characterName: '萱萱',
            dialogueText: '口味还不错，谢谢啦',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue11);

          const heroDialogue12: DialogueData = {
            characterName: '小宇',
            dialogueText: '那我们进去逛吧，听说玄武湖公园的夜景很好看',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue12);

          const heroDialogue13: DialogueData = {
            characterName: '萱萱',
            dialogueText: '好啊，走吧',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue13);
    }

    }

    // update (dt) {}
