const roleMap = {
    1: {
        name: '我'
    },
    2:{
        name: '手机'
    }
};
window.Globalmusic = {
    music2 : 0 ,
}
cc.Class({
    extends: cc.Component,

    properties: {
        nameLabel: cc.Label,
        textLabel: cc.Label,
        button1: cc.Node,
        button2: cc.Node,

        text1: cc.Label,
        text2: cc.Label,
        audioSource: cc.AudioSource,
    },

    onLoad() {

        this.init([
            {role: 1, content: '还有两个星期就要到考试周了，这个学期，我加入了社团，忙着社交，但是却把学习给忘了，还有很多知识不熟！'},
            {role: 1, content: '完蛋了呀！！！怎么办啊（抓狂）（homo），专心学习，专心学习，专心学习（抓头）'},
            {role: 2, content: '嗡嗡嗡——嗡嗡嗡——'},
            {role: 1, content: '谁发信息来了呀！烦死了，刚准备了好好学习的'},
            {role: 1, content: '原来是兄弟们喊我去打球啊（′Д`），怎么办呢，我还要学习，压力好大啊！'}
        ]);
        this.button1.active = false;
        this.button2.active = false;

        this.text1.active = false;
        this.text2.active = false;

        cc.systemEvent.on('keydown', this.onKeyDown, this);
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
            if (this.textIndex === 2){
                cc.audioEngine.playEffect(this.audioSource.clip, false);
                this.scheduleOnce(() => {
                    cc.audioEngine.stopAllEffects();
                }, 1.5);
            }
        } else {
            this.closeDialog();
        }
    },

    setTextData(textData) {
        this.nameLabel.string = roleMap[textData.role].name;
        this.textLabel.string = textData.content;
        if (this.textIndex === 3) { // 第二句话后才显示按钮
            this.button1.active = true;
            this.button2.active = true;

            this.text1.active = true;
            this.text2.active = true;
        }

        // 设置按钮文本
        this.text1.string = '去打40分钟的球吧，还能释放一些压力，提高学习效率呢';
        this.text2.string = '拒绝吧，现在时间很宝贵，学习永远是第一位';
    },
    onBtnClick1: function(event, customEventData) {
        cc.log('Button clicked: ' + customEventData);
        GlobalData.is_out = true;
        cc.director.loadScene('study');
    },
    onBtnClick2: function(event, customEventData) {
        cc.log('Button clicked: ' + customEventData);
        cc.director.loadScene('study');
    },
    closeDialog() {

    },
});