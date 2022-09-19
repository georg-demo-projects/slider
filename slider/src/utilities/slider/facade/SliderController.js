import ActiveState from './ActiveState';
import WaitingState from './WaitingState';

export default class SliderController {

    constructor(slider, rightLeftButtons, dotsButtons) {

        this._activeState = new ActiveState(slider, dotsButtons);
        this._waitingState = new WaitingState();

        this._state = this._activeState;

        this.bindHandlers(slider, rightLeftButtons, dotsButtons)
    }

    bindHandlers(slider, rightLeftButtons, dotsButtons) {
        slider.onAnimationStart(
            () => this._state = this._waitingState);

        slider.onAnimationEnd(
            () => this._state = this._activeState);

        rightLeftButtons.onRightClick(
            () => this._state.onRightClick());

        rightLeftButtons.onLeftClick(
            () => this._state.onLeftClick());

        dotsButtons.onDotClick(
            index => this._state.onDotClick(index));
    }
}
