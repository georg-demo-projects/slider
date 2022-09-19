export default class ActiveState {

    constructor(slider, btnsDots) {
        this._slider = slider;
        this._btnsDots = btnsDots;
    }

    onDotClick(index) {
        this._btnsDots.setActive(index);
        this._slider.scrollToSlide(index);
    }

    onRightClick() {
        const activeSlideIndex = this._slider.rightScroll();
        this._btnsDots.setActive(activeSlideIndex);
    }

    onLeftClick() {
        const activeSlideIndex = this._slider.leftScroll();
        this._btnsDots.setActive(activeSlideIndex);
    }
}
