import Slider from '../core/Slider';
import DotsButtons from '../core/DotsButtons';
import RightLeftButtons from '../core/SliderButtons';
import SliderController from './SliderController';


export default function createSlider(sliderContainer, { speed = 500, slidesToShow = 1, slidesToScroll = 1 }) {

    const slider = Slider.create(
        sliderContainer,
        slidesToShow,
        slidesToScroll,
        speed
    );

    const btnsRightLeft = RightLeftButtons.create(
        sliderContainer
    );

    const btnsDots = DotsButtons.create(
        sliderContainer,
        slider.length,
        0
    );

    new SliderController(slider, btnsRightLeft, btnsDots);
}
