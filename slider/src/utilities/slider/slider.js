import createSlider from './facade/facade';

export default function slider(sliderContainer, { speed = 500, slidesToShow = 1, slidesToScroll = 1 }) {
    createSlider(sliderContainer, {
        speed,
        slidesToShow,
        slidesToScroll
    })
}
