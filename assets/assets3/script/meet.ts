const {ccclass, property} = cc._decorator;
import Global from './global';

let roleMap = {
    1: {
        name:'小宇',
        url: "WeChat/boy_clean"
    },
    2: {
        name: '萱萱',
        url: "WeChat/girl_clean"
    },
    3: {
        name: '恭喜！这是彩蛋哦',
        url: "WeChat/boy_clean"
    }
}
@ccclass
export default class NewClass extends cc.Component {


    @property(cc.AudioClip)
    buttonSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    backgroundSound: cc.AudioClip = null;



    @property(cc.Label)
    textLabel: cc.Label = null;
    @property(cc.Label)
    nameLabel: cc.Label = null;
    @property(cc.Sprite)
    personPic: cc.Sprite = null;
    @property(cc.Button)
    SayHello: cc.Button = null;

    @property(cc.Button)
    JustGo: cc.Button = null;

    textIndex;
    textDataArr;
    op:number = 1;

    // LIFE-CYCLE CALLBACKS:

    onLoad() {
        this.SayHello.node.active = false;
        this.JustGo.node.active = false;
        this.init([
            {role: 3, content: "你太聪明了，以至于你的思维飞出了天际"},
            {role: 1, content: "那里有一个女生，很着急的样子，不知道在找什么，要过去帮忙码？"}
            ]
        )
        this.audioID = cc.audioEngine.playEffect(this.backgroundSound, true);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);

    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.space: {
                this.node.active = true;
                this.nextTextData();
                break;
            }
        }
    }

    init(textDataArr) {
        this.node.active = true;
        this.textIndex = -1;
        this.textDataArr = textDataArr;
        this.nextTextData();
    }

    nextTextData() {
        if (++this.textIndex < this.textDataArr.length) {
            this.setTextData(this.textDataArr[this.textIndex]);
            if (this.textIndex == 1 && this.op == 1){
                this.SayHello.node.active = true;
                this.JustGo.node.active = true;
                this.op = 0;
            }
        }
        else {
            this.closeDialog();
        }
    }

    setTextData(textData) {
        this.nameLabel.getComponent(cc.Label).string = roleMap[textData.role].name;
        this.textLabel.getComponent(cc.Label).string = textData.content;


        cc.resources.load(roleMap[textData.role].url, cc.SpriteFrame, (error: Error, sf: cc.SpriteFrame) => {
            this.personPic.getComponent(cc.Sprite).spriteFrame = sf;
        });
    }



    audioID: number;
    closeButton() {
        cc.audioEngine.playEffect(this.buttonSound, false);
        this.SayHello.node.active = false;
        this.JustGo.node.active = false;
    }

    closeDialog() {
        cc.audioEngine.stopEffect(this.audioID);
        this.node.active = false;
        cc.director.loadScene("she-tuan");
    }
    sayHello() {
        Global.GlobalData.meet = true;
        this.closeButton();

        this.init([

            {role: 1, content: 'Hello,同学在买什么呀？'},
            {role: 2, content: '你好，我想找一些榴莲。'},
            {role: 2, content: '刚刚找了几个超市都没找到'},
            {role: 1, content: '哦哦，榴莲在那边。'},
            {role: 2, content: '谢谢了，同学你叫什么名字呢？'},
            {role: 1, content: '你可以叫我小宇。'},
            {role: 2, content: '小宇，嗯，这名字挺好听的。'},
            {role: 2, content: '咱俩可以加个微信好友，我的微信名叫小摩斯'},
            {role: 1, content: '好奇怪的名字哦。'},
            {role: 2, content: '因为我喜欢福尔摩斯之类的侦探电影啦~'},
            {role: 1, content: '原来如此。'},
            {role: 1, content: '小姐姐的这件衣服挺好看的诶~'},
            {role: 2, content: '是吧！我也这样想，这可是我最喜欢的裙子了。'},
            {role: 2, content: '我买完东西啦，咱们后会有期吧~'},
            {role: 1, content: '嗯嗯嗯，小姐姐再见~'},
        ]);


    }

    justGo() {

        cc.director.loadScene('assets5/scene/begining');
        Global.GlobalData.meet = false;
    }

    // LIFE-CYCLE CALLBACKS:

    start () {

    }

    // update (dt) {}
}
