import animate from '../../animate';
import SliderDomManager from './SliderDomManager';

export default class Slider {

    static create(
        sliderContainer,
        slidesToShow = 1,
        slidesToScroll = 1,
        duration = 500
    ) {
        const slideCount = SliderDomManager.getSlideCount(sliderContainer);
        slidesToShow = Math.min(slidesToShow, slideCount);
        slidesToScroll = Math.min(slidesToScroll, slideCount);

        SliderDomManager.addSliderElements(sliderContainer);

        return new Slider(sliderContainer, slidesToShow, slidesToScroll, duration);
    }

    scrollToSlide(slideIndex) {
        const currentIndex = this._getRealIndex(this._sliderInternalIndex);

        if (slideIndex !== currentIndex)
            this._scroll(slideIndex - currentIndex);
    }

    rightScroll() {
        return this._scroll(this._slidesToScroll);
    }

    leftScroll() {
        return this._scroll(-this._slidesToScroll);
    }

    onAnimationStart(handler) {
        this._handlerAnimationStart = handler;
    }

    onAnimationEnd(handler) {
        this._handlerAnimationEnd = handler;
    }

    get length() {
        return this._initialSlidesCount;
    }

    // ---------------------- private

    _slider = document.querySelector('.slider');
    _slides = [];
    _initialSlidesCount = 0;
    _slidesToShow;
    _slidesToScroll;
    _duration;
    _sliderInternalIndex;
    _slideWidth; // все слайды одинаковой ширины

    _handlerAnimationStart = () => { }
    _handlerAnimationEnd = () => { }

    constructor(sliderContainer, slidesToShow, slidesToScroll, duration) {
        this._slidesToShow = slidesToShow;
        this._slidesToScroll = slidesToScroll;
        this._duration = duration;
        this._slides = this._getSlides();
        this._initialSlidesCount = this._slides.length;

        this._slides.forEach(s => s.style.minWidth = `${100 / slidesToShow}%`); // задали ширину слайдов
        this._slideWidth = this._slides[0].clientWidth;

        this._addBuffers();
        this._sliderInternalIndex = this._getStartBufferLength;
        this._slides = this._getSlides();

        //  сдвинули вправо на слайд с индексом slidesToScroll
        this._translateSliderX(-this._slideWidth * this._sliderInternalIndex)

        window.addEventListener("resize", () => this._onResize());
    }

    _onResize() {
        this._slideWidth = this._slides[this._sliderInternalIndex].clientWidth;
        this._slider.style.transform = `translateX(${-this._slideWidth * this._sliderInternalIndex}px)`;
    }

    get _getStartBufferLength() {
        return Math.max(this._slidesToShow, this._slidesToScroll);
    }

    get _getEndBufferLength() {
        return this._getStartBufferLength - 1;
    }

    _addBuffers() {
        const startBuffer = [];
        const endBuffer = [];

        for (let i = 0; i < this._getStartBufferLength; ++i) {
            startBuffer.unshift(this._slides[this._slides.length - 1 - i].cloneNode(true));
        }
        for (let i = 0; i < this._getEndBufferLength; ++i) {
            endBuffer.push(this._slides[i].cloneNode(true));
        }

        this._slider.append(...endBuffer);
        this._slider.prepend(...startBuffer);
    }

    _getSlides() {
        return document.querySelectorAll('.slide');
    }

    _translateSliderX(translateX) {
        this._slider.style.transform = `translateX(${translateX}px)`
    }

    // индекс слайда в массиве без учета буферных элементов
    _getRealIndex(sliderIndex) {
        return (this._initialSlidesCount + sliderIndex - this._getStartBufferLength) % this._initialSlidesCount;
    }

    // прокрутить слайдер на signedScrollCount слайдов ( (+) - вправо, (-) - влево)
    _scroll(signedScrollCount) {
        if (signedScrollCount === 0)
            return;

        this._handlerAnimationStart()

        const sign = Math.sign(signedScrollCount);

        // вправо
        if (sign > 0) {
            if (this._sliderInternalIndex >= this._initialSlidesCount) {
                this._sliderInternalIndex %= this._initialSlidesCount;
                this._translateSliderX(-this._slideWidth * this._sliderInternalIndex);
            }
        }
        // влево
        else {
            if (this._sliderInternalIndex < Math.abs(signedScrollCount)) {
                this._sliderInternalIndex += this._initialSlidesCount;
                this._translateSliderX(-this._slideWidth * this._sliderInternalIndex);
            }
        }

        this._animate(signedScrollCount);
        this._sliderInternalIndex += signedScrollCount;

        return this._getRealIndex(this._sliderInternalIndex);
    }

    // прокрутить слайдер на signedScrollCount слайдов ((+) - вправо, (-) - влево)
    _animate(signedScrollCount) {
        const startPosition = -this._slideWidth * this._sliderInternalIndex;

        animate({
            duration: this._duration,
            timing: function (timeFraction) {
                return timeFraction;
            },
            draw: (progress) => {
                this._translateSliderX(
                    startPosition - Math.round(this._slideWidth * signedScrollCount * progress));
            },
            animationEnd: () => {
                this._handlerAnimationEnd();
            }
        });
    }
}
