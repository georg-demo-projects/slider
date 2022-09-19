export default class RightLeftButtons {

    _sliderContainer;
    _btnNext = document.getElementById('btn-next');
    _btnPrev = document.getElementById('btn-prev');

    static create(sliderContainer) {
        return new RightLeftButtons(sliderContainer);
    }

    constructor(sliderContainer) {
        this._sliderContainer = sliderContainer;
    }

    onRightClick(handler) {
        this._btnNext.addEventListener('click', handler);
    }

    onLeftClick(handler) {
        this._btnPrev.addEventListener('click', handler);
    }
}
