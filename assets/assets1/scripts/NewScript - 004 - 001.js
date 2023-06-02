let roleMap = {
    1:{
        name: '小宇：',
    },
    2   :{
        name: '辅导员：',
    },
};

cc.Class({
    extends: cc.Component,

    properties: {frame : cc.Node,
        nameLabel: cc.Label,
        textLabel: cc.Label,
    },
    onLoad () {
        this.init([
            {role: 2, content: '有心理话都可以和我说哦'},
            {role: 1, content: '一定会的！'},
        ]);
        cc.systemEvent.on('keydown', this.onKeyDown,this);
    },

    onDestroy(){
        cc.systemEvent.off('keydown', this.onKeyDown,this);
    },

    onKeyDown(e){
        switch (e.keyCode){
            case cc.macro.KEY.space: {
                this.nextTextData();
                break;
            }
        }
    },
    init(textDataArr){
        this.textIndex = -1;
        this.textDataArr = textDataArr;
        this.node.active = true;
        this.nextTextData();
    },

    nextTextData(){
        if (++this.textIndex < this.textDataArr.length){
            this.setTextData(this.textDataArr[this.textIndex]);
        }else {
            this.closeDialog();
        }
    },

    setTextData(textData){
        this.nameLabel.string = roleMap[textData.role].name;
        this.textLabel.string = textData.content;
    },
    closeDialog(){
        this.node.active = false;
    },
});
