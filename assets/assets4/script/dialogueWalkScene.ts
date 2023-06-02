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
    choiceScore:number = 0;

    // 添加对话数据
    public addDialogueData(data: DialogueData): void {
      this.dialogueData.push(data);
    }

    // 播放下一条对话
    public playNextDialogue(): void {
      if (this.currentIndex >= this.dialogueData.length) {
        // 对话结束
        this.node.getChildByName("button4").active = true;
        return;
      }

      this.isChoice(this.currentIndex);
      
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

    isChoice(currentIndex3){
      if (currentIndex3 == 14){
        this.node.getChildByName("choice1").active = true;
        this.node.getChildByName("choice2").active = true;
        this.node.getChildByName("choice1").getComponentInChildren(cc.Label).string = "风景不错";
        this.node.getChildByName("choice2").getComponentInChildren(cc.Label).string = "夜景很好看，尤其是今晚的月色真美啊";
      }else if(currentIndex3 == 19){
        this.node.getChildByName("choice1").active = true;
        this.node.getChildByName("choice2").active = true;
        this.node.getChildByName("choice1").getComponentInChildren(cc.Label).string = "我觉得你人挺好的";
        this.node.getChildByName("choice2").getComponentInChildren(cc.Label).string = "说不上来，不过和你在一起的这段时光，我前所未有的快乐";
      }else if(currentIndex3 == 35){
        this.node.getChildByName("choice1").active = true;
        this.node.getChildByName("choice2").active = true;
        this.node.getChildByName("choice1").getComponentInChildren(cc.Label).string = "感觉有点浪费时间，没有什么意义";
        this.node.getChildByName("choice2").getComponentInChildren(cc.Label).string = "好啊，尝试一下新鲜事物总是没错的";
      }
    }

    choice11(){
        if(GlobalData.sharedData.choicePath == ''){
          GlobalData.sharedData.choicePath = '1';
        }else if(GlobalData.sharedData.choicePath == '1'){
          GlobalData.sharedData.choicePath = "11";
        }else if(GlobalData.sharedData.choicePath == '2'){
          GlobalData.sharedData.choicePath = "21";
        }else if(GlobalData.sharedData.choicePath == '11'){
          GlobalData.sharedData.choicePath = '111';
        }else if(GlobalData.sharedData.choicePath == '12'){
          GlobalData.sharedData.choicePath = "121";
        }else if(GlobalData.sharedData.choicePath == "21"){
          GlobalData.sharedData.choicePath = "211";
        }else if(GlobalData.sharedData.choicePath == "22"){
          GlobalData.sharedData.choicePath = "221";
        }
        this.currentIndex += 3;
        this.node.getChildByName("choice1").active = false;
        this.node.getChildByName("choice2").active = false;
    }
    choice12(){
      if(GlobalData.sharedData.choicePath == ''){
        GlobalData.sharedData.choicePath = '2';
      }else if(GlobalData.sharedData.choicePath == '1'){
        GlobalData.sharedData.choicePath = "12";
      }else if(GlobalData.sharedData.choicePath == '2'){
        GlobalData.sharedData.choicePath = "22";
      }else if(GlobalData.sharedData.choicePath == '11'){
        GlobalData.sharedData.choicePath = '112';
      }else if(GlobalData.sharedData.choicePath == '12'){
        GlobalData.sharedData.choicePath = "122";
      }else if(GlobalData.sharedData.choicePath == "21"){
        GlobalData.sharedData.choicePath = "212";
      }else if(GlobalData.sharedData.choicePath == "22"){
        GlobalData.sharedData.choicePath = "222";
      }
        this.choiceScore++;
        this.node.getChildByName("choice1").active = false;
        this.node.getChildByName("choice2").active = false;
    } 

    toRoom(){
      cc.director.loadScene('roomScene');
    }

    onLoad () {
      this.node.getChildByName("button4").active = false;
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
            characterName: '',
            dialogueText: '(湖水澄澈，琉璃千钦，月色朦胧，星光迷离)',
            imagepath: '',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue1);
          
          const heroDialogue2: DialogueData = {
            characterName: '',
            dialogueText: '(烁闪，灯光缤纷)',
            imagepath: '',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue2);

          const heroDialogue3: DialogueData = {
            characterName: '',
            dialogueText: '(吹拂，微风摇曳)',
            imagepath: '',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue3);

          const heroDialogue4: DialogueData = {
            characterName: '',
            dialogueText: '......',
            imagepath: '',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue4);

          const heroDialogue5: DialogueData = {
            characterName: '',
            dialogueText: '(置身于如此环境之中，两人都感受着一股从未有过的新奇体验)',
            imagepath: '',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue5);

          const heroDialogue6: DialogueData = {
            characterName: '',
            dialogueText: '(似有千言万语，或凝于五脏六腑)',
            imagepath: '',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue6);

          const heroDialogue7: DialogueData = {
            characterName: '',
            dialogueText: '(突然，她的话将你带入现实中)',
            imagepath: '',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue7);

          const heroDialogue8: DialogueData = {
            characterName: '萱萱',
            dialogueText: '玄武湖的夜景好漂亮啊！',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue8);

          const heroDialogue9: DialogueData = {
            characterName: '小宇',
            dialogueText: '是啊',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue9);

          const heroDialogue10: DialogueData = {
            characterName: '',
            dialogueText: '(两人再次陷入了沉默中)',
            imagepath: '',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue10);

          const heroDialogue11: DialogueData = {
            characterName: '',
            dialogueText: '(此刻，你有了想要说些什么的冲动)',
            imagepath: '',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue11);

          const heroDialogue12: DialogueData = {
            characterName: '',
            dialogueText: '(你看到她仿佛正在沉思）',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue12);

          const heroDialogue13: DialogueData = {
            characterName: '小宇',
            dialogueText: '......',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue13);

          const heroDialogue14: DialogueData = {
            characterName: '萱萱',
            dialogueText: '你现在是什么感受呢？在我们一起逛了玄武湖后',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue14);

          const heroDialogue36: DialogueData = {
            characterName: '小宇',
            dialogueText: '',
            imagepath: 'images/hero',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue36);

          const heroDialogue15: DialogueData = {
            characterName: '小宇',
            dialogueText: '可能是因为有你陪着我一起吧',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue15);

          const heroDialogue16: DialogueData = {
            characterName: '',
            dialogueText: '(说完这句话，你感觉到你的脸颊有些发烫)',
            imagepath: '',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue16);

          const heroDialogue17: DialogueData = {
            characterName: '',
            dialogueText: '(不知道是不是你的错觉，你感觉她似乎脸红了)',
            imagepath: '',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue17);

          const heroDialogue18: DialogueData = {
            characterName: '萱萱',
            dialogueText: '是吗，那你觉得我是一个什么样的人呢？',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue18);

          const heroDialogue37: DialogueData = {
            characterName: '小宇',
            dialogueText: '',
            imagepath: 'images/hero',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue37);

          const heroDialogue19: DialogueData = {
            characterName: '小宇',
            dialogueText: '我觉得你是能够给我带来快乐......',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue19);

          const heroDialogue39: DialogueData = {
            characterName: '小宇',
            dialogueText: '甚至......',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue39);

          const heroDialogue40: DialogueData = {
            characterName: '小宇',
            dialogueText: '是能够慰藉我心灵的人',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue40);

          const heroDialogue20: DialogueData = {
            characterName: '',
            dialogueText: '......',
            imagepath: '',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue20);

          const heroDialogue21: DialogueData = {
            characterName: '',
            dialogueText: '(此刻的气氛让你感觉到不适合再继续聊这个话题了)',
            imagepath: '',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue21);

          const heroDialogue22: DialogueData = {
            characterName: '',
            dialogueText: '(仿佛心有灵犀般，她马上转变了话题)',
            imagepath: '',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue22);

          const heroDialogue23: DialogueData = {
            characterName: '萱萱',
            dialogueText: '对了，你对跳舞感兴趣吗',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue23);

          const heroDialogue24: DialogueData = {
            characterName: '小宇',
            dialogueText: '跳舞吗？还行吧，看是哪种舞吧。我之前看过一个舞蹈节目，给我印象挺深的，跳的超级好看',
            imagepath: 'hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue24);

          const heroDialogue25: DialogueData = {
            characterName: '小宇',
            dialogueText: '好像是hip hop吧',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue25);

          const heroDialogue26: DialogueData = {
            characterName: '萱萱',
            dialogueText: '哦哦，跳hip hop是挺好看的',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue26);

          const heroDialogue27: DialogueData = {
            characterName: '萱萱',
            dialogueText: '其实啊，我从高中时就想要学习舞蹈了，可是高中课业繁忙，报的班也没去成几次',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue27);

          const heroDialogue28: DialogueData = {
            characterName: '萱萱',
            dialogueText: '后面对舞蹈的兴趣就逐渐淡漠了',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue28);

          const heroDialogue29: DialogueData = {
            characterName: '萱萱',
            dialogueText: '现在我想要重拾高中对舞蹈的热情',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue29);

          const heroDialogue30: DialogueData = {
            characterName: '萱萱',
            dialogueText: '现在我也有足够的课余时间，刚好我准备去报一个hip hop舞蹈班，就在学校附近',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue30);

          const heroDialogue31: DialogueData = {
            characterName: '萱萱',
            dialogueText: '感兴趣吗？要不要和我一起去学啊',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue31);

          const heroDialogue38: DialogueData = {
            characterName: '小宇',
            dialogueText: '',
            imagepath: 'images/hero',
            characterImage:null, 
          };
          this.addDialogueData(heroDialogue38);

          const heroDialogue41: DialogueData = {
            characterName: '小宇',
            dialogueText: '那后面我们一起去报班吧',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue41);

          const heroDialogue42: DialogueData = {
            characterName: '小宇',
            dialogueText: '刚好有你可以陪着我一起',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue42);

          const heroDialogue43: DialogueData = {
            characterName: '小宇',
            dialogueText: '......',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue43);

          const heroDialogue32: DialogueData = {
            characterName: '萱萱',
            dialogueText: '那行吧',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue32);

          const heroDialogue33: DialogueData = {
            characterName: '萱萱',
            dialogueText: '(看了下时间)',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue33);

          const heroDialogue34: DialogueData = {
            characterName: '萱萱',
            dialogueText: '啊，时间不早了，要不我们就先回去吧？',
            imagepath: 'images/heroine',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue34);

          const heroDialogue35: DialogueData = {
            characterName: '小宇',
            dialogueText: '嗯，好的',
            imagepath: 'images/hero',
            characterImage:null,
          };
          this.addDialogueData(heroDialogue35);
    }

    // update (dt) {}
}
