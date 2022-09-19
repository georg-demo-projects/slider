export default class DotsButtons {

    _sliderContainer;
    _handlerDotClick;
    _dots = [];

    static create(sliderContainer, count, activeIndex) {
        return new DotsButtons(sliderContainer, count, activeIndex);
    }

    constructor(sliderContainer, count, activeIndex) {
        this._sliderContainer = sliderContainer;
        this.createDots(count, activeIndex)
    }

    onDotClick(handler) {
        for (let i = 0; i < this._dots.length; ++i) {
            this._dots[i].addEventListener("click", () => handler(i));
        }
    }

    /*
    [...].forEach((item, index, array) => {
        alert(`${item} ${index} в ${array}`);
    });
    */

    setActive(index) {
        const activeIdx = this._dots.findIndex(this.isActive);
        if (index !== activeIdx) {
            if (activeIdx >= 0) {
                this._dots[activeIdx].classList.remove('slide-dot--active');
            }
            this._dots[index].classList.add('slide-dot--active');
        }
    }

    isActive(dot) {
        return dot.classList.contains('slide-dot--active');
    }

    createDots(dotsCount, activeIndex) {
        let dotsContainer = document.createElement("div");
        dotsContainer.classList.add('slide-dot-container');

        for (let i = 0; i < dotsCount; ++i) {
            let button = document.createElement("button");
            button.innerHTML = `<p class="slide-dot-text">${i}</p>`;
            button.classList.add('slide-dot');

            if (i === activeIndex) {
                button.classList.add('slide-dot--active');
            }
            dotsContainer.appendChild(button);
            this._dots.push(button);
        }

        this._sliderContainer.appendChild(dotsContainer);
    }
}
