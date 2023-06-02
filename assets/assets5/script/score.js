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

cc.Class({
    extends: cc.Component,

    properties: {
        Scores:cc.Label,
        frame:cc.Sprite,
        textLabel:cc.Label,
        nameLabel:cc.Label,
        nextButton:cc.Button
    },

    onLoad(){
        this.nextButton.node.active = false;
        if (GlobalData.IQ>200||GlobalData.classscore>=5) {
            this.Scores.string = "95"
            this.frame.node.active = true;
            this.init([
                { role: 1, content: 'Nice!!!奈斯！！！黄天不负有心人 (*^▽^*)' },
                { role: 1, content: '感谢上天给了我一次重新开始的机会，今后我还要继续努力，在学习的各个角度去努力，完成梦想(ง •̀_•́)ง' },
                { role: 1, content: '是时候也该给自己的重启生活一个总结了' }
            ]);
            cc.systemEvent.on('keydown', this.onKeyDown, this);
        }else {
            this.Scores.string = "59"
            this.frame.node.active = true;
            this.init([
                { role: 1, content: 'Oh！！！不，为什么我的成绩这么差，也不对，这也怪我自己，是我自己没有好好学习(◞‸◟ )' },
                { role: 1, content: '上天给了我一个重启的机会，可是我仍然没有好好珍惜' },
                { role: 1, content: '哎。。。悟已往之不谏 知来者之可追，给我的这个重启生活一个总结吧，我一定要把握住未来' },
            ]);
            cc.systemEvent.on('keydown', this.onKeyDown, this);

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
        this.nextButton.node.active = true
    },
    onBtnClickToNext: function(event, customEventData) {
        cc.log('Button clicked: ' + customEventData);
        cc.director.loadScene('仰望星空' );
    },
    start () {

    },

    // update (dt) {},
});
