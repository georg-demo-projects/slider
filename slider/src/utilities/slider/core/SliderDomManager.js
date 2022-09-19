
export default class SliderDomManager {

    static getSlideCount(sliderContainer) {
        return sliderContainer.children.length;
    }

    static addSliderElements(sliderContainer) {
        SliderDomManager.createSlides(sliderContainer);
        SliderDomManager.createSliderButtons(sliderContainer);
        SliderDomManager.addSliderStyles(sliderContainer);
    }

    static createSlides(sliderContainer) {
        // let documentFragment = document.createDocumentFragment();
        // documentFragment.appendChild(slider);

        // create slider element
        let slider = document.createElement("div");
        slider.classList.add('slider');

        for (let i = 0; i < sliderContainer.children.length; i++) {
            let slideContent = sliderContainer.children[i];
            let slide = document.createElement("div");
            slide.classList.add('slide');
            slide.appendChild(slideContent.cloneNode(true));
            slider.appendChild(slide);
        }
        sliderContainer.replaceChildren(slider);
    }

    static createSliderButtons(sliderContainer) {
        // create slider buttons
        let sliderButtons = document.createElement("div");
        sliderButtons.classList.add('slide-controls');

        const btnPrev = SliderDomManager.createButton("btn-prev", "Prev");
        const btnNext = SliderDomManager.createButton("btn-next", "Next");

        sliderButtons.appendChild(btnPrev);
        sliderButtons.appendChild(btnNext);

        sliderContainer.appendChild(sliderButtons);
    }

    static createButton(id, innerText) {
        // btn prev
        let btn = document.createElement("button");
        btn.setAttribute("id", id);
        let p = document.createElement("p");
        p.classList.add(id + '__text');
        let btnPrevText = document.createTextNode(innerText);
        p.appendChild(btnPrevText);
        btn.appendChild(p);
        return btn;
    }

    static addSliderStyles(sliderContainer) {
        sliderContainer.classList.add('slider-container');

        var style = document.createElement('style');
        style.innerHTML = `
            .slider-container {
                position: relative;
                overflow: hidden;
            }
            .slider {
                display: flex;
                height: 100%;
                width: 100%;
                align-items: center;
                will-change: transform;
            }
            .slide {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;
                height: 100%;
            }
            .slide-controls {
                position: absolute;
                left: 0;
                top: 50%;
                transform: translateY(-50%);
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .slide-dot-container {
                position: absolute;
                bottom: 1rem;
                left: 50%;
                transform: translateX(-50%);
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 1rem;
            }
        `;
        document.getElementsByTagName('head')[0].appendChild(style);
    }
}
