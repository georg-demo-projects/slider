import slider from '../../utilities/slider/slider';

export default function main() {
    const sliderContainer = document.querySelector('.main__slider');

    slider(sliderContainer, {
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    });
}
