const {ccclass, property} = cc._decorator;

let roleMap = {
    1: {
        name: '小岚学姐',
        url: "girls-button/basketball/basketball1"
    },
    2: {
        name: '小枫学姐',
        url: "girls-button/billiards/billiards1"
    },
    3: {
        name: '小筱学姐',
        url: "girls-button/ping-pong/ping-pong1"
    },
    4: {
        name: '小婉学姐',
        url: "girls-button/volleyball/volleyball1"
    },
    5: {
        name: '小宇',
        url: "WeChat/boy_clean"
    },
    6:{
        name:'内心独白',
        url:"WeChat/boy_clean"
    }
}

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    textLabel: cc.Label = null;
    @property(cc.Label)
    nameLabel: cc.Label = null;
    @property(cc.Sprite)
    personPic: cc.Sprite = null;
    @property(cc.Node)
    WeChat: cc.Node = null;
    @property(cc.Button)
    button1: cc.Button = null;
    @property(cc.Button)
    button2: cc.Button = null;

    @property(cc.Button)
    button3: cc.Button = null;

    @property(cc.Button)
    button4: cc.Button = null;

    @property(cc.Button)
    next: cc.Button = null;

    @property(cc.Node)
    diolog: cc.Node = null;
    @property(cc.Node)
    names:cc.Node = null;

    @property(cc.AudioClip)
    buttonSound: cc.AudioClip = null;
    @property(cc.AudioClip)
    backgroundSound: cc.AudioClip = null;
    

    textIndex;
    textDataArr;

    // LIFE-CYCLE CALLBACKS:

    audioID;
    onLoad() {
        this.WeChat.active = false;
        this.diolog.active = false;

        this.audioID = cc.audioEngine.playEffect(this.backgroundSound,true);
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    closeall(){
        this.names.active = false;
        this.diolog.active = true;
        cc.audioEngine.playEffect(this.buttonSound, false);
        this.button1.node.active = false;
        this.button2.node.active = false;
        this.button3.node.active = false;
        this.button4.node.active = false;
    }

    button11() {
        this.closeall();
        this.init([
            {role: 1, content: '欢迎加入我们的篮球社团！'},
            {role: 1,content: '我们的社团一直致力于提高篮球技能和团队精神。'},
            {role: 1,content: '我们相信，每个人都有天赋和潜力，在这里，你将有机会发挥你的天赋，练习你的技能，并与同学们一起提高你的篮球水平。'},
            {role: 1,content: '你将学习到团队合作、领导力和沟通能力等重要技能，在未来的职业生涯中受益终身。'},
            {role: 1,content: '我们期待着你的到来，相信你会成为这个团队中不可或缺的一员。'},
            {role: 5, content: '我想知道这个社团里的小姐姐多吗？'},
            {role: 5, content: '我想通过社团活动多认识一些朋友。'},
            {role: 6, content: '(当然更希望找到女朋友了，嘿嘿)'},
            {role: 1, content: '我们社团的男女比例还算是很均衡的'},
            {role: 1, content: '真心希望你能在社团活动中拓展自己的朋友圈'},
            {role: 1, content: '我先把你拉进我们社团的微信群吧'},
        ])
    }

    button22() {
        this.closeall();
        this.init([
            {role: 2, content: '欢迎加入我们的台球社团！'},
            {role: 2, content: '台球是一项充满技巧的运动，需要飞快的反应速度、准确的计算能力和卓越的手眼协调能力。'},
            {role: 2, content: '在这里，你将会有机会和其他热爱台球的人们一起练习和比赛，挑战自己的技能水平。'},
            {role: 2, content: '同时，你也会在比赛中学习到如何管理你的情绪、克服挫折的能力，以及如何与其他球手进行交流和合作。'},
            {role: 2, content: '我们的社团不仅仅是一个技能学习和提高的场所，也是一个让你结交志同道合的人们的平台。'},
            {role: 6, content: '(对喽，我就是想加入社团来认识更多小姐姐的，嘻嘻)'},
            {role: 2, content: '我们相信你将会成为这个团队中不可或缺的一员，带着自己的热情和才华一起迎接挑战，创造更好的成绩。'},
            {role: 5, content: '社长，咱们社团一般通过啥来联系呢？'},
            {role: 2, content: '社团有个微信群，我已经把你拉进来了。'},
        ])
    }

    button33() {
        this.closeall();
        this.init([
            {role: 3, content: '欢迎加入我们的乒乓球社团！'},
            {role: 3, content: '乒乓球是一项技巧性很强的运动，不仅需要运动员具备高度的反应速度和出色的身体协调能力，还需要他们在比赛中保持高度的集中精力和意志品质。'},
            {role: 3, content: '我们的社团希望在学习和提高乒乓球技能的同时，也能锻炼大家的团队意识和竞技精神。'},
            {role: 3, content: '你也会学习到如何掌握比赛技术、战术以及如何与队友共同合作取得胜利。'},
            {role: 5, content: '学姐，咱们社团的女生多吗？'},
            {role: 5, content: '我的意思是想拓宽一下自己的交友圈，多认识一些朋友。'},
            {role: 6, content: '(其实我是想通过社团活动找到女朋友，芜湖~)'},
            {role: 3, content: '小学弟是想多认识几个女生呀？'},
            {role: 3, content: '正好我们社团有一个微信群，我已经把你拉进来了，我相信这绝对有助于你拓宽交友圈。'},
        ])
    }

    button44() {
        this.closeall();
        this.init([
            {role: 4, content: '欢迎加入我们的排球社团！'},
            {role: 4, content: '我们很高兴你能成为我们的一员，并期待你在这里度过充实、难忘的时光。'},
            {role: 4, content: '在这里，你将有机会与其他热爱排球的人一起玩耍，练习和比赛。'},
            {role: 4, content: '我们希望在学习和提高排球技能的同时，也能锻炼大家的团队意识和工作精神。'},
            {role: 4, content: '你将学习如何处理球的技巧和如何与队友协作，以及团队合作的重要性。'},
            {role: 4, content: '我们期待你在这里度过愉快、难忘的时光，并成为这个团队中不可或缺的一员。'},
            {role: 5, content: '我希望在能够社团中认识更多的人，也许会遇到一个很特别的人。'},
            {role: 5, content: '学姐，你懂的，我想找个女朋友，嘿嘿'},
            {role: 4, content: '哦~可以呀，我们社团的女生还不少呢'},
            {role: 4, content: '这样，我先把你拉进社团的微信群里。'},
        ])
    }

    Next () {
        MyNamespace.go_to_data;
    }

    onDestroy() {
        cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this);
    }

    onKeyDown(event: cc.Event.EventKeyboard) {
        switch (event.keyCode) {
            case cc.macro.KEY.space: {
                this.nextTextData();
                break;
            } case cc.macro.KEY.enter: {
                cc.audioEngine.stopEffect(this.audioID);
                cc.director.loadScene('WeChat');
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
        } else {
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

    closeDialog() {
        this.WeChat.active = true;
        this.setTextData({role: 6, content: '呀！这不是前几天在超市遇见的那个女生吗，我们竟然在同一个社团，好有缘分欸！'+'\n'+'                                                                 （按Enter进入下一场景）'});
    }


    start() {

    }

    // update (dt) {}
}
