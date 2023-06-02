// Learn cc.Class:
//  - https://docs.cocos.com/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const roleMap = {
    1: {
        name: '我'
    },
    2:{
        name: ''
    }
};

window.GlobalData={
    testResult:0
}
cc.Class({
    extends: cc.Component,

    properties: {
        frame: cc.Sprite,
        nameLabel: cc.Label,
        textLabel: cc.Label,
        nextButton:cc.Button
    },


    onLoad () {
        this.nextButton.node.active =false;
        this.init([
            { role: 2, content: '（终于到了最后的考试）' },
            { role: 2, content: '（两个小时的专业课考试）' },
            { role: 2, content: '（周围十分安静，你只能听到外面风吹树叶的）' },
            { role: 1, content: '（来吧！考试，我一定会战胜它）' }
        ]);
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
        this.nextButton.node.active = true
    },
    onBtnClickToNext: function(event, customEventData) {
        cc.audioEngine.stopEffect(Globalmusic.music2);
        cc.log('Button clicked: ' + customEventData);
        cc.director.loadScene('成绩接受');
    },

    start () {

    },
    // update (dt) {},
});
