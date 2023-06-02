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
        name: '内心独白',
        url: "WeChat/boy_clean"
    },
    4: {
        name: '内心独白',
        url: "WeChat/girl_clean",
    }
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.AudioClip)
    sound: cc.AudioClip = null;
    @property(cc.Button)
    skipButton: cc.Button = null;
    @property(cc.Label)
    textLabel: cc.Label = null;
    @property(cc.Label)
    nameLabel: cc.Label = null;
    @property(cc.Sprite)
    personPic: cc.Sprite = null;
    @property(cc.Node)
    buttons1: cc.Node = null;
    @property(cc.Node)
    buttons2: cc.Node = null;

    number:number;

    textArr;
    textIndex;
    private choices: number[] = [0,0];

    init(textDataArr) {
        this.node.active = true;
        this.textIndex = -1;
        this.textArr = textDataArr;
        this.nextTextData();
    }

    nextTextData() {
        if (++this.textIndex < this.textArr.length) {
            this.setTextData(this.textArr[this.textIndex]);
        } else {
            this.end();
        }
    }


    setTextData(textData) {
        this.nameLabel.getComponent(cc.Label).string = roleMap[textData.role].name;
        this.textLabel.getComponent(cc.Label).string = textData.content;

        cc.resources.load(roleMap[textData.role].url, cc.SpriteFrame, (error: Error, sf: cc.SpriteFrame) => {
            this.personPic.getComponent(cc.Sprite).spriteFrame = sf;
        });
    }

    button1() {
        this.choices[0] = 1;
        this.setTextData({role: 1, content: '一会儿吃完饭看个电影吧'});
        this.buttons1.active = false;

    }

    button2() {
        this.choices[0] = 0;
        this.setTextData({role: 1, content: '一会儿吃完饭看个电影吧'});
        this.buttons1.active = false;
    }

    button3() {
        this.choices[1] = 1;
        this.setTextData({role: 1, content: '这周末我们去看玄武湖夜景可以吗，听说挺好看的'});
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.myonKeyDown, this);
        this.buttons2.active = false;

    }
    button4() {
        this.choices[1] = 0;
        this.setTextData({role: 1, content: '这周末我们去看玄武湖夜景可以吗，听说挺好看的'});
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.myonKeyDown, this);
        this.buttons2.active = false;

    }

    do1() {
        if (this.choices[0] == 1) {
            this.setTextData({role: 2, content: '你还能记得我喜欢吃榴莲，我很开心呀！'});
        } else {
            this.setTextData({role: 2, content: '你连我喜欢吃榴莲都不记得，哼！'});
        }
    }

    myonKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.space: {
                cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.myonKeyDown, this);

                this.do1();
                break;
            }
        }
    }

    do2() {

        if (this.choices[1] == 1 && this.choices[0] == 1) {

            this.setTextData({role: 4, content: '他竟然记住了我的这些爱好，好开心                                              (按Enter进入下一场景)'});
        } else if (this.choices[1] == 1 && this.choices[0] == 0) {

            this.setTextData({role: 4, content: '不过他竟然知道我爱看侦探类电影，还是挺开心的。                                                     (按Enter进入下一场景)'});
        } else if (this.choices[1] == 0 && this.choices[0] == 1) {

            this.setTextData({role: 4, content: '不过他竟然知道我爱吃榴莲，还是挺开心的。                                                (按Enter进入下一场景)'});
        } else {

            this.setTextData({role: 4, content: '他也不知道我爱看什么电影，唉，有点小失望                                   (按Enter进入下一场景)'});
        }
    }

    myonKeyDown2(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.space: {
                this.do2();
                break;
            } case cc.macro.KEY.enter: {
                this.end();
            }
        }
    }

    end() {
        cc.audioEngine.stopEffect(this.number);
        if (this.choices[0] + this.choices[1] >= 1) {
            Global.GlobalData.choice = true;
            cc.director.loadScene('assets4/kitchen');
        } else {
            cc.director.loadScene('assets5/scene/begining');
            Global.GlobalData.choice = false;
        }
    }
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.skipButton.node.active=false;
        this.number = cc.audioEngine.playEffect(this.sound,true);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.myonKeyDown2, this);
        this.buttons2.active = false;
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.space: {
                this.setTextData({role:2, content:'好呀，你来选电影吧                                                                                  (请选择想要看的电影)'});
                this.buttons2.active  = true;
                this.onDestroy();
                break;
            }
        }
    }

    start () {

    }

    // update (dt) {}
}
