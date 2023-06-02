// 定义对话数据结构
interface DialogueData {
    characterName: string;
    dialogueText: string;
    imagepath1: string;
    imagepath2: string;
    characterImage1: cc.SpriteFrame;
    characterImage2: cc.SpriteFrame;
}

import script from "./bg";
const {ccclass, property} = cc._decorator;

@ccclass
export default class dialogueSystem extends cc.Component {

    @property(cc.Label)
    private characterNameLabel: cc.Label = null;
    @property(cc.Label)
    private dialogueTextLabel: cc.Label = null;
    @property(cc.Sprite)
    private characterImage1: cc.Sprite = null;
    @property(cc.Sprite)
    private characterImage2: cc.Sprite = null;
    @property(script)
    bg:script = null;
    isCinema:boolean = false;
    isShop:boolean = false;

    private dialogueData: DialogueData[] = [];
    private currentIndex: number = 0;
    private currentSpriteIndex: number = 0;

    // 添加对话数据
    public addDialogueData(data: DialogueData): void {
        this.dialogueData.push(data);
    }

    // 播放下一条对话
    public playNextDialogue(): void {
        if (this.currentIndex >= this.dialogueData.length + 1) {
            // 对话结束

            return;
        }

        this.isJump();

        const data = this.dialogueData[this.currentIndex];
        this.characterNameLabel.string = data.characterName;
        this.dialogueTextLabel.string = data.dialogueText;
        let path1:string = data.imagepath1;
        let path2:string = data.imagepath2;
        cc.resources.load(path1,cc.SpriteFrame,(error:Error,sf:cc.SpriteFrame)=>{
            this.characterImage1.getComponent(cc.Sprite).spriteFrame = sf;
        });
        cc.resources.load(path2,cc.SpriteFrame,(error:Error,sf:cc.SpriteFrame)=>{
            this.characterImage2.getComponent(cc.Sprite).spriteFrame = sf;
        });

        this.node.active = true;
        this.currentIndex++;
    }

    isJump(){
        if(this.currentIndex == 0){
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
            this.node.getChildByName("cinemaButton").active = true;
            this.node.getChildByName("shopButton").active = true;
        }else if(this.currentIndex == 5 || this.currentIndex == 11){
            this.node.getChildByName("streetButton").active = true;
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
        }
    }

    toStreet(){
        if (this.isCinema == true && this.isShop == true){
            this.node.getChildByName('button7').active = true;
        }
        cc.find("screen").active = false;
        cc.find("background").getComponent(cc.Sprite).spriteFrame = this.bg.bgSprites[0];
        this.node.getChildByName("cinemaButton").active = true;
        this.node.getChildByName("shopButton").active = true;
        cc.find("shop").active = true;
        cc.find("cinema").active = true;
        this.node.getChildByName("streetButton").active = false;
        this.currentIndex = 0;
    }

    toShop(){
        this.isShop = true;
        cc.find("background").getComponent(cc.Sprite).spriteFrame = this.bg.bgSprites[1];
        this.node.getChildByName("cinemaButton").active = false;
        this.node.getChildByName("shopButton").active = false;
        cc.find("shop").active = false;
        cc.find("cinema").active = false;
        this.currentIndex = 1;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

    }
    toCinema(){
        this.isCinema = true;
        cc.find("background").getComponent(cc.Sprite).spriteFrame = this.bg.bgSprites[2];
        this.node.getChildByName("cinemaButton").active = false;
        this.node.getChildByName("shopButton").active = false;
        cc.find("screen").active = true;
        cc.find("shop").active = false;
        cc.find("cinema").active = false;
        this.currentIndex = 6;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    toNextScene(){
        cc.director.loadScene('assets5/scene/begining');
    }

    onLoad () {
        cc.find("screen").active = false;
        this.node.getChildByName("button7").active = false;
        this.node.getChildByName("streetButton").active = false;
        this.node.getChildByName("cinemaButton").active = false;
        this.node.getChildByName("shopButton").active = false;
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
            dialogueText: '(接下来去哪里玩呢)',
            imagepath1: '',
            imagepath2:'',
            characterImage1:null,
            characterImage2:null,
        };
        this.addDialogueData(heroDialogue1);

        const heroDialogue2: DialogueData = {
            characterName: '',
            dialogueText: '(你们去买了两杯各自最喜欢的奶茶)',
            imagepath1: '',
            imagepath2:'',
            characterImage1:null,
            characterImage2:null,
        };
        this.addDialogueData(heroDialogue2);

        const heroDialogue3: DialogueData = {
            characterName: '萱萱',
            dialogueText: '我这杯很好喝哦，你要不要尝尝',
            imagepath1: 'images/hero',
            imagepath2:'images/heroine',
            characterImage1:null,
            characterImage2:null,
        };
        this.addDialogueData(heroDialogue3);

        const heroDialogue4: DialogueData = {
            characterName: '小宇',
            dialogueText: '我这杯也不错，你也试试吧',
            imagepath1: 'images/hero',
            imagepath2:'images/heroine',
            characterImage1:null,
            characterImage2:null,
        };
        this.addDialogueData(heroDialogue4);

        const heroDialogue5: DialogueData = {
            characterName: '',
            dialogueText: '(两人互换了奶茶喝了一口，就像婚礼上的交杯酒)',
            imagepath1: 'images/hero',
            imagepath2:'images/heroine',
            characterImage1:null,
            characterImage2:null,
        };
        this.addDialogueData(heroDialogue5);

        const heroDialogue12: DialogueData = {
            characterName: '',
            dialogueText: '......',
            imagepath1: '',
            imagepath2:'',
            characterImage1:null,
            characterImage2:null,
        };
        this.addDialogueData(heroDialogue12);

        const heroDialogue6: DialogueData = {
            characterName: '',
            dialogueText: '(你们去看了一部适合情侣看的电影)',
            imagepath1: '',
            imagepath2:'',
            characterImage1:null,
            characterImage2:null,
        };
        this.addDialogueData(heroDialogue6);

        const heroDialogue7: DialogueData = {
            characterName: '',
            dialogueText: '(两人的肩膀靠在一起，牵着手，感受着这一刻的美好时光)',
            imagepath1: '',
            imagepath2:'e',
            characterImage1:null,
            characterImage2:null,
        };
        this.addDialogueData(heroDialogue7);

        const heroDialogue8: DialogueData = {
            characterName: '',
            dialogueText: '(突然，她亲了一下你的脸)',
            imagepath1: '',
            imagepath2:'',
            characterImage1:null,
            characterImage2:null,
        };
        this.addDialogueData(heroDialogue8);

        const heroDialogue9: DialogueData = {
            characterName: '萱萱',
            dialogueText: '偷袭，嘿嘿',
            imagepath1: 'images/hero',
            imagepath2:'images/heroine',
            characterImage1:null,
            characterImage2:null,
        };
        this.addDialogueData(heroDialogue9);

        const heroDialogue10: DialogueData = {
            characterName: '',
            dialogueText: '(你没有多说什么，直接向她的嘴唇亲了上去)',
            imagepath1: '',
            imagepath2:'',
            characterImage1:null,
            characterImage2:null,
        };
        this.addDialogueData(heroDialogue10);

        const heroDialogue11: DialogueData = {
            characterName: '',
            dialogueText: '......',
            imagepath1: '',
            imagepath2:'',
            characterImage1:null,
            characterImage2:null,
        };
        this.addDialogueData(heroDialogue11);

    }

    // update (dt) {}
}