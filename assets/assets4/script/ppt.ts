const { ccclass, property } = cc._decorator;

@ccclass
export default class BackgroundController extends cc.Component {
  @property([cc.SpriteFrame])
  private bgSprites: cc.SpriteFrame[] = [];
  @property(cc.Sprite)
  private sprite: cc.Sprite = null;
  @property
  private bgWidth: number = 1280; // 背景图宽度
  @property
  private bgHeight: number = 720; // 背景图高度
  @property
  private switchInterval: number = 3; // 切换背景图片的间隔时间，单位为秒

  private currentSpriteIndex: number = 0;
  private isLastBackground: boolean = false;

  onLoad() {
    cc.find("dialogueBubble").active = false;
    this.adjustBackgroundSize();
    this.schedule(this.changeBackground, this.switchInterval);
  }

  adjustBackgroundSize() {
    const scaleFactorX = this.bgWidth / this.sprite.node.width;
    const scaleFactorY = this.bgHeight / this.sprite.node.height;

    this.sprite.node.scaleX = scaleFactorX;
    this.sprite.node.scaleY = scaleFactorY;
    this.sprite.node.width = this.bgWidth;
    this.sprite.node.height = this.bgHeight;
  }

  changeBackground() {
    if (this.currentSpriteIndex === this.bgSprites.length - 1) {
        this.isLastBackground = true;
        cc.find("dialogueBubble").active = true;
      }
  
      if (!this.isLastBackground) {
        this.currentSpriteIndex = (this.currentSpriteIndex + 1) % this.bgSprites.length;
        this.sprite.spriteFrame = this.bgSprites[this.currentSpriteIndex];
      }
  }
}
