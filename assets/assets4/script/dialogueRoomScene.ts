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
    best:boolean = false;
    mid:boolean = false;
    worst:boolean = false;

    // 添加对话数据
    public addDialogueData(data: DialogueData): void {
      this.dialogueData.push(data);
    }

    // 播放下一条对话
    public playNextDialogue(): void {
      if (this.currentIndex >= this.dialogueData.length) {
        // 对话结束
        if(this.best || this.mid){
          this.node.getChildByName("button5").active = true;
        }else{
          this.node.getChildByName("button6").active = true;
        }
        return;
      }

      this.isLetter();
      this.overletter();
      this.skip();
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
    toHoney(){
        cc.director.loadScene("honeyScene")
    }
    toNext(){
      cc.director.loadScene("assets5/scene/begining")
    }

    isLetter(){
      if(this.currentIndex == 9){
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        this.node.getChildByName("envelope").active = true;
      }
    }
    overletter(){
      if(this.currentIndex == 10){
        this.node.getChildByName("envelope").active =false;
        this.node.getChildByName("letter").active =false;
      } 
    }
    skip(){
      if(this.best && this.currentIndex == 13){
        this.currentIndex = 16;
      }else if(this.mid){
        if(this.currentIndex == 10){
          this.currentIndex = 13;
        }else if(this.currentIndex == 15){
          this.currentIndex = 16;
        }
      }else if(this.worst){
        if(this.currentIndex == 10){
          this.currentIndex = 15;
        }
      }
    }

    envelope(){
      cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
      let letter = this.node.getChildByName("letter");
      let text1 = "        抱歉这几天没有回应你，我想了很多，觉得写信这种方式更能表达我的想法，就想着给你写封信。";
      let text21 = "        你做的饼干真的很好吃，都让我怀疑你是不是已经做过很多次了，我很喜欢！";
      let text31 = "        还记得我当时问你逛完玄武湖后是什么感受吗？你说夜景很好看，可能是因为我陪着你，还说月色真美。太狡猾了，谁不知道月色真美是什么含义啊，哼。";
      let text41 = "        你说我是能给你带来快乐的人，听到后我也很快乐，没想到我能给你带来这么重要的东西";
      let text51 = "        其实，我说报舞蹈班只是想要创造一个我们能够一起娱乐的机会，在打听到你可能对hiphop感兴趣后，我才临时决定学hiphop，嘿嘿，没想到你会这么爽快的答应我。好开心";
      let text61 = "        不过，最后我想说，接下来的生活，我们就一起度过吧！";
      let text7 = "                    你的新任女朋友";
      let text22 = "        其实你做的饼干并不是很好吃，但当时不太好直说。像是烤焦了一样，该不会是烤的时候睡着了吧，哈哈，开玩笑的。不过，还是希望你下次做了吃的后能先自己试一下做得如何！";
      let text32 = "        还记得我当时问你逛完玄武湖后是什么感受吗？你就说了风景好看，难道那天晚上你和我出来逛只是来看风景的吗？";
      let text42 = "        问到对我的看法时，你说我人挺好的。话说这个这算不算发好人卡呢？就算不是，那这个评价放在其他大多数人身上都适用吧？";
      let text52 = "        其实，我说报舞蹈班只是想创造我们共处的机会，打听到你对hiphop感兴趣后，我才临时决定学hiphop。没想到你直接拒绝，真的忙到连一个兴趣都不想去培养吗？还是说只是不想和我一起去呢？";
      let text62 = "        抱歉我说话可能有一点直，我只是想表达我真实的内心想法。你人很好，我们可以继续做朋友，如果你需要的话。";
      let textMid = "        不过，可能是那天晚上我们交谈得不是很愉快吧，我感觉我们可能并不特别适合，所以......"
      letter.active = true;
      if(GlobalData.sharedData.choicePath == "222" && GlobalData.sharedData.winGame){
        letter.getComponentInChildren(cc.Label).string = text1 + "\n" + text21 + "\n" + text31 + "\n" + text41 + "\n" + text51 + "\n" + text61 + "\n" + text7;
        this.best = true;
        GlobalData.sharedData.dateSucceed = true;
      }else if(GlobalData.sharedData.choicePath == "111" && !GlobalData.sharedData.winGame){
        letter.getComponentInChildren(cc.Label).string =text1 + "\n" + text22 + "\n" + text32 + "\n" + text42 + "\n" + text52 + "\n" + text62;
        this.worst = true;
      }else if(GlobalData.sharedData.choicePath == "122" && GlobalData.sharedData.winGame){
        letter.getComponentInChildren(cc.Label).string = text1 + "\n" + text21 + "\n" + text32 + "\n" + text41 + "\n" + text51 + "\n" + text61 + "\n" + text7;
        this.mid = true;
        GlobalData.sharedData.dateSucceed = true;
      }else if(GlobalData.sharedData.choicePath == "221" && GlobalData.sharedData.winGame){
        letter.getComponentInChildren(cc.Label).string = text1 + "\n" + text21 + "\n" + text31 + "\n" + text41 + "\n" + text52 + "\n" + text61 + "\n" + text7;
        this.mid = true;
        GlobalData.sharedData.dateSucceed = true;
      }else if(GlobalData.sharedData.winGame){
        letter.getComponentInChildren(cc.Label).string =text1 + "\n" + text21 + "\n" + textMid + "\n" + text62;
        this.worst = true;
      }else{
        letter.getComponentInChildren(cc.Label).string =text1 + "\n" + text22 + "\n" + textMid + "\n" + text62;
        this.worst = true;
      }
    }

    onLoad () {
      this.node.getChildByName("button5").active = false;
      this.node.getChildByName("button6").active = false;
      this.node.getChildByName("envelope").active = false;
      this.node.getChildByName("letter").active = false;
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
            characterName: '',
            dialogueText: '(回去后，你悬着的心终于可以放下了)',
            imagepath: '',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue1);
          
          const heroDialogue2: DialogueData = {
            characterName: '小宇',
            dialogueText: '约会真的好紧张啊',
            imagepath: 'images/hero',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue2);

          const heroDialogue3: DialogueData = {
            characterName: '小宇',
            dialogueText: '不知道她现在是怎么看我的，这算不算是一次成功的约会呢？',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue3);

          const heroDialogue4: DialogueData = {
            characterName: '小宇',
            dialogueText: '啊，还是好紧张',
            imagepath: 'images/hero',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue4);

          const heroDialogue5: DialogueData = {
            characterName: '',
            dialogueText: '(之后过了好几天她都没有在微信上找你聊过天)',
            imagepath: '',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue5);

          const heroDialogue6: DialogueData = {
            characterName: '',
            dialogueText: '(你愈发地紧张不安了)',
            imagepath: '',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue6);

          const heroDialogue7: DialogueData = {
            characterName: '',
            dialogueText: '(突然，你收到了快递到了的信息)',
            imagepath: '',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue7);

          const heroDialogue8: DialogueData = {
            characterName: '小宇',
            dialogueText: '不对啊，我最近都没有在网上买东西啊，哪来的快递',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue8);

          const heroDialogue9: DialogueData = {
            characterName: '',
            dialogueText: '(你取回包裹，打开后发现是一封信)',
            imagepath: '',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue9);

          const heroDialogue10: DialogueData = {
            characterName: '',
            dialogueText: '(信的封面署名是萱萱，你打开看了起来)',
            imagepath: '',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue10);

          const heroDialogue11: DialogueData = {
            characterName: '小宇',
            dialogueText: '......',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue11);

          const heroDialogue12: DialogueData = {
            characterName: '小宇',
            dialogueText: '你简直不敢相信你的眼睛。原来那天的约会进行得如此成功。此刻你是那么的激动，以至于你将那封信反反复复看了好几次。最后，你平静了下来，意识到了那件事',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue12);

          const heroDialogue13: DialogueData = {
            characterName: '小宇',
            dialogueText: '你终于交到了女朋友',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue13);

          const heroDialogue14: DialogueData = {
            characterName: '小宇',
            dialogueText: '你不敢相信你的眼睛。虽然那天的约会有些地方你表现得不尽人意，但结果上来说，约会还是成功了。此刻你是那么的激动，以至于你将那封信反反复复看了好几次。最后，你平静了下来，意识到了那件事',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue14);

          const heroDialogue15: DialogueData = {
            characterName: '小宇',
            dialogueText: '你终于交到了女朋友',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue15);

          const heroDialogue16: DialogueData = {
            characterName: '小宇',
            dialogueText: '你的心仿佛沉到了最底部，原来那天的约会你表现得如此糟糕。看着那封信，你意识到那天的约会彻底失败了，你和她已经不会再有任何后续和交集了。',
            imagepath: 'images/hero',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue16);

          const heroDialogue17: DialogueData = {
            characterName: '小宇',
            dialogueText: '......',
            imagepath: 'images/hero',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue17);

    }

    // update (dt) {}
}
