
const roleMap = {
    1: {
        name: '我'
    },
    2: {
        name: '提示'
    }
};
cc.Class({
    extends: cc.Component,

    // 从上一个脚本直接粘贴过来的


    properties: {
        frame: cc.Sprite,
        nameLabel: cc.Label,
        textLabel: cc.Label,
        remainTime: cc.Label,
        IQ: cc.Label,
        studySpeed: cc.Label,
        nextButton:cc.Button,
    },
    onLoad(){
        this.nextButton.node.active =false;
        this.frame.node.active = false;
        this.nameLabel.active = false;
        this.textLabel.active = false;
        this.remainTime.node.active = true;
        this.IQ.node.active = true;
        this.studySpeed.node.active = true;
        this.IQ.string = "知识力:" + GlobalData.IQ;
        this.remainTime.string = "TimeRemaining:" + GlobalData.Time + "min";
        this.studySpeed.string = "学习效率:" + GlobalData.Speed;
    },
    onDestroy() {
        cc.systemEvent.off('keydown', this.onKeyDown, this);
    },

    onKeyDown(e) {
        switch (e.keyCode) {
            case cc.macro.KEY.space:
                this.nextTextData();
                break;
        }
    },
    // LIFE-CYCLE CALLBACKS:
    onBtnClick3: function(event, customEventData) {
        cc.log('Button clicked: ' + customEventData);
        cc.director.loadScene('study');
    },
    clickTiedao(){
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        this.frame.node.active = true;
        this.init([
            {role:1, content:"Oh!!!Ｏ(≧口≦)Ｏ我今天铁道的体力还没有清！这周周本还没打，我的爷！等我"},
            {role:1, content:"(不行不行，我要学习，我要抵制诱惑！！! o(*≧▽≦)ツ┏━┓)"},
            {role:1, content:"就玩一会，就玩一会，没事的，不会影响的 (～￣▽￣)～"},
            {role:2, content:"刚清完体力，想想第一个章节快结束了，去推一下主线，把第一章结局给过了，结果被第一章最后boss战的画面和音乐给震撼到了，完全忘记了学习" +
                    "结果：兴奋+++++++++，时间消耗1小时（米哈游你可真可恶啊凸(艹皿艹 )）"}
        ])
        GlobalData.is_mihayo = true;
        this.reduceTime(60)
    },
    //
    //Ohhhhh!!!!,chatGPT我的好兄弟，我的好老师，我怎么把你忘了呢
    clickGPT(){
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        this.frame.node.active = true;
        this.init([
            {role:1, content:"还有好多知识点不懂！！！怎么办呢？(；′⌒   `)，自己看书又看不懂网上一大堆东西都在乱讲（无助，迷茫，救救孩子吧）"},
            {role:1, content:"Ohhhhh!!!!,chatGPT我的好兄弟，我的好老师，我怎么把你忘了呢"},
            {role:1, content:"GPT同志，告诉告诉我常见的微分方程的解法是什么，还有还有，你觉得在当今市场上，客户更倾向于什么样的价值主张啊"},
            {role:2, content:"（chatGPT的帮助下，你成功获得了很多知识，恭喜你，玩家，你获得了至尊福利，在消耗40min的情况下，获得了10点知识点和10点学习效率 (￣▽￣)～■干杯□～(￣▽￣)"}
        ])
/*        if(GlobalData.is_mihayo){
            cc.systemEvent.on('keydown', this.onKeyDown, this);
            this.frame.node.active = true;
            this.init({role:1, content:"mihayo你真可恶啊，看看人家OpenAI造福人类 <(￣︶￣)>"})
        }*/
        this.reduceTime(40);
        this.changeSufficiency(10);
        this.Special_changeIQ(10);

    },
    clickIDEA(){
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        this.frame.node.active = true;
        this.init([
            {role:1, content:"噢，马上软工一要机试了，还是好好去力扣上去刷几道题把，IDEA我来的，Java我来了 <(￣︶￣)↗[GO!]"},
            {role:1, content:"(开始coding)"},
            {role:1, content:"(让我测试一下样例过了！！！提交一下，肯定可以过) (～￣▽￣)～"},
            {role:1, content:"啊？还有样例没过，这是为什么呢（homo）"},
            {role:1, content:"我来造样例，诶！这个有问题！"},
            {role:1, content:"让我来调试，OK发现bug了，在提交"},
            {role:2, content:"恭喜你，成功AC，NICE！！！编程能力提高，耗时30分钟，知识点+15"}
        ])
        GlobalData.is_mihayo = true;
        this.reduceTime(30);
        this.Special_changeIQ(15);
    },
    init(textDataArr) {
        this.textIndex = -1;
        this.textDataArr = textDataArr;
        this.node.active = true;
        this.nextTextData();
    },

    nextTextData() {
        if (++this.textIndex < this.textDataArr.length) {
            this.setTextData(this.textDataArr[this.textIndex]);
        } else {
            this.closeDialog();
        }
    },

    setTextData(textData) {
        this.nameLabel.string = roleMap[textData.role].name;
        this.textLabel.string = textData.content;
    },

    closeDialog() {
        this.frame.node.active = false;
        this.nameLabel.active = false;
        this.textLabel.active = false;
        this.remainTime.node.active = true;
        this.IQ.node.active = true;
        this.studySpeed.node.active = true;
    },
    Normal_changeIQ() {
        GlobalData.IQ += GlobalData.Speed;
        this.IQ.string = '知识力:' + GlobalData.IQ;
    },

    Special_changeIQ(outcome) {
        GlobalData.IQ +=  outcome;
        this.IQ.string = "知识力:" + GlobalData.IQ;
    },

    reduceTime(time) {
        GlobalData.Time -= time
        if(GlobalData.Time < 0){
            GlobalData.Time = 0;
        }
        this.remainTime.string = "RemainTime:" + GlobalData.Time + "min";
        if (GlobalData.Time<= 0){
            this.close_jump();
        }
    },

    changeSufficiency(efficiency) {
        GlobalData.Speed += efficiency
        this.studySpeed.string = '学习效率:' + GlobalData.Speed;
    },
    close_jump(){
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        this.nextButton.node.active = true;
        this.init([
            { role: 1, content: "学习结束了，好好休息吧，明天又是新的一天学习，不能过度劳累啊" },
            { role: 2, content: "（今天你的学习结果是：知识力："+GlobalData.IQ+ "(๑•̀ㅂ•́)و✧,祝你期末考试顺利，开拓者）" }
        ]);
        this.nextButton.node.active = true
    },
    onBtnClickToNext: function(event, customEventData) {
        cc.log('Button clicked: ' + customEventData);
        cc.director.loadScene('考试');
    },
    start () {

    },

    // update (dt) {},
});
