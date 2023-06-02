

/*
const roleMap = {
    1: {
        name: '我'
    },
    2:{
        name: '提示'
    }
};

window.gl
cc.Class({
    extends: cc.Component,

    properties: {
        frame:cc.Sprite,
        nameLabel: cc.Label,
        textLabel: cc.Label,
        remainTime:cc.Label,
        IQ:cc.Label,
        studySpeed:cc.Label,
    },

    onLoad() {

        /!*this.init([
            {role: 1, content: 'OK！开始学习，一定要专心！'},
            {role: 2, content: '从现在开始，你有5个小时的时间学习。'},
            {role: 2, content: '通过点击桌子上的一些物品进行互动，可能会增加，减少知识点和学习效率'},
            {role: 2, content: '合理进行时间获得最高的学习效率、学习结果吧！'}
        ]);*!/
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        this.remainTime.node.active =false;
        this.IQ.node.active = false;
        this.studySpeed.node.active = false;
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
        this.remainTime.node.active =true;
        this.IQ.node.active = true;
        this.studySpeed.node.active = true;
    },
    clickchips(event, customEventData){

        this.frame.node.active = true;
        this.init( [
            {role: 1, content:"吃个薯片把手都弄脏了，去洗个手吧"},
            {role: 2, content: "学习效率-3"},
        ])
        this.changeSufficiency(-5);
    },
    clicknovel(event, customEventData){
        this.frame.node.active = true;
        this.init([
            {role: 1, content:"学习了好一会了，看一会小说休息一会吧"},
            {role: 2, content:"消耗时间20分钟，学习效率+4"}
        ])
        this.reduceTime(30);
        this.changeSufficiency(5);
    },
    clickbook(event, customEventData){
        this.frame.node.active = true;
        this.init([
            {role: 1, content:"进入认真学习状态，开始复习"},
            {role: 2, content:"消耗时间50分钟，知识力增加20"}
        ])
        this.Normal_changeIQ();
        this.reduceTime(50);
    },
    Normal_changeIQ(){
        const currentIQ = cc.find('Canvas/知识点');
        const currentIQComponent = currentIQ.getComponent(cc.Label);
        let IQString = currentIQComponent.string;
        let IQInteger = parseInt(IQString.split(':')[1]);
        const studySpeedNode = cc.find('Canvas/学习效率');
        const studySpeedComponent = studySpeedNode.getComponent(cc.Label);
        let currentSpeedStr = studySpeedComponent.string;
        let currentSpeed = parseInt(currentSpeedStr.split(':')[1]);
        IQInteger += currentSpeed;
        currentIQComponent.string = '知识力:' + IQInteger;
    },
    Special_changeIQ(outcome){
        const currentIQ = cc.find('Canvas/知识点');
        const currentIQComponent = currentIQ.getComponent(cc.Label);
        let IQString = currentIQComponent.string;
        let IQInteger = parseInt(IQString.split(':')[1]);
        IQInteger += outcome;
        currentIQComponent.string = '知识力:' + IQInteger;
    },
    reduceTime(time) {
        // 将 remainTime 减少 20 分钟
        const remainTimeNode = cc.find('Canvas/时间');
        const remainTimeComponent = remainTimeNode.getComponent(cc.Label);
        let currentTimeStr = remainTimeComponent.string;
        let currentTime = parseInt(currentTimeStr.split(':')[1].slice(0, -3)); // 去掉字符串末尾的 'min'
        currentTime -= time;
        // 更新 remainTime 组件的文本内容
        remainTimeComponent.string = 'RemainTime:' + currentTime + 'min';
    },
    changeSufficiency(sufficiency){
        const studySpeedNode = cc.find('Canvas/学习效率');
        const studySpeedComponent = studySpeedNode.getComponent(cc.Label);
        let currentSpeedStr = studySpeedComponent.string;
        let currentSpeed = parseInt(currentSpeedStr.split(':')[1]);
        currentSpeed += sufficiency;
        studySpeedComponent.string = '学习效率:' + currentSpeed;

    },
    start(){
        this.init([
            {role: 1, content: 'OK！开始学习，一定要专心！'},
            {role: 2, content: '从现在开始，你有5个小时的时间学习。'},
            {role: 2, content: '通过点击桌子上的一些物品进行互动，可能会增加，减少知识点和学习效率'},
            {role: 2, content: '合理进行时间获得最高的学习效率、学习结果吧！'}
        ]);
    }
});*/



const roleMap = {
    1: {
        name: '我'
    },
    2: {
        name: '提示'
    }
};

window.GlobalData = {
    IQ: 0,
    Time:360,
    Speed:20,
    is_clicked : false,
    is_out: false,
    classscore:0
};

cc.Class({

    extends: cc.Component,

    properties: {
        music: cc.AudioClip,
        frame: cc.Sprite,
        nameLabel: cc.Label,
        textLabel: cc.Label,
        remainTime: cc.Label,
        IQ: cc.Label,
        studySpeed: cc.Label,
        nextButton:cc.Button
    },

    onLoad() {

        this.nextButton.node.active = false;
        if (GlobalData.is_clicked ){
            cc.systemEvent.off('keydown', this.onKeyDown, this);
            this.frame.node.active = false;
            this.nameLabel.active = false;
            this.textLabel.active = false;
            this.remainTime.node.active = true;
            this.IQ.node.active = true;
            this.studySpeed.node.active = true;
            this.IQ.string = "知识力:" + GlobalData.IQ;
            this.remainTime.string = "TimeRemaining:" + GlobalData.Time;
            this.studySpeed.string = "学习效率:" + GlobalData.Speed;
        }else {
            Globalmusic.music2 = cc.audioEngine.playEffect(this.music,true);
            cc.systemEvent.on('keydown', this.onKeyDown, this);
            GlobalData.is_clicked = true;
            this.remainTime.node.active = false;
            this.IQ.node.active = false;
            this.studySpeed.node.active = false;
        }
        if(GlobalData.is_out){this.init([
            { role: 1, content: '打完球了，现在神清气爽，神力大增开始学习ㄟ(≧◇≦)ㄏ'},
            { role: 2, content: '从现在开始，你有6个小时的时间学习。' },
            { role: 2, content: '通过点击桌子上的一些物品进行互动，可能会增加，减少知识点和学习效率' },
            { role: 2, content: '因为刚才和同学一起出去打球了，所以你的压力得到了释放，消耗了40分钟，学习效率提高了10点' },
            { role: 2, content: '合理进行时间获得最高的学习效率、学习结果吧！' }
            ]);
            this.changeSufficiency(10);
            this.reduceTime(40);
        }else {
            this.init([
                { role: 1, content: 'OK！开始学习，一定要专心！' },
                { role: 2, content: '从现在开始，你有6个小时的时间学习。' },
                { role: 2, content: '通过点击桌子上的一些物品进行互动，可能会增加，减少知识点和学习效率' },
                { role: 2, content: '在时间结束后，你的学习也会结束合理安排时间获得最高的学习效率、学习结果吧,！' }
            ]);
        }

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

    clickchips(event, customEventData) {
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        this.frame.node.active = true;
        this.init([
            { role: 1, content: "（咕咕咕~~~）" },
            { role: 1, content: "才学习了一会肚子就开始叫了，哎。。 Σ( ° △ °|||)︴" },
            { role: 1, content: "算了不管了，吃一点东西，噢！╰(*°▽°*)╯桌子上正好有一包薯片，不管了开吃开吃" },
            { role: 2, content: "（薯片把弄脏了，要去洗手，吃膨化视频让自己又感到有点口渴，学习效率-5）" }
        ]);
        this.changeSufficiency(-5);
    },

    clicknovel(event, customEventData) {
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        this.frame.node.active = true;
        this.init([
            { role: 1, content: "学习了好一会了，看一会小说休息一会吧" },
            { role: 1, content: "摸一会🐟也是没有关系的吧，而且看《三国演义》呢！还能陶冶情操" },
            { role: 2, content: "（看小说花了不少时间，但是确实让自己的神经得到了放松消，耗时间30分钟，学习效率+5）" }
        ]);
        this.reduceTime(30);
        this.changeSufficiency(5);
    },

    clickbook(event, customEventData) {
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        this.frame.node.active = true;
        this.init([
            { role: 1, content: "进入认真学习状态，开始复习" },
            { role: 1, content: "（高斯！！！欧拉！！！拉格朗日！！！把你门的力量借给我吧！）" },
            { role: 2, content: "（消耗时间50分钟，知识力增加） (๑•̀ㅂ•́)و✧" }
        ]);
        this.Normal_changeIQ();
        this.reduceTime(50);
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
        GlobalData.Time -= time;
        if(GlobalData.Time < 0){
            GlobalData.Time = 0;
        }
        this.remainTime.string = "RemainTime:" + GlobalData.Time + "min";
        if (GlobalData.Time == 0){
            this.close_jump();
        }
    },

    changeSufficiency(efficiency) {
        GlobalData.Speed += efficiency;
        this.studySpeed.string = '学习效率:' + GlobalData.Speed;
    },
    close_jump(){
        cc.systemEvent.on('keydown', this.onKeyDown, this);
        this.frame.node.active = true;
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
});

