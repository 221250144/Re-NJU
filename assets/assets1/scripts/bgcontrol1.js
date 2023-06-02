let roleMap = {
    1:{
        name: '',
    },
    2   :{
        name: '',
    },
};

cc.Class({
    extends: cc.Component,

    properties: {
        frame : cc.Node,
        nameLabel: cc.Label,
        textLabel: cc.Label,
    },
    onLoad () {
        this.init([
            {role: 2, content: '怀着无比后悔的心情，他来到学校天台，歇斯底里的大喊'},
            {role: 1, content: '如果再给我一次机会，我一定好好学习'},
            {role: 1, content: '之后便实现了愿望，回到了大一开学'},
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
        // this.node.active = true;
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
        // this.frame.active = false;
        // this.nameLabel.node.active = false;
        // this.textLabel.node.active = false;
        // this.node.active = false;
    },
});
