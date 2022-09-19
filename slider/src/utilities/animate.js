// Функция создания анимации
//
// timing(timeFraction)
//      Функция расчёта времени (прогресса анимации) (от 0 до 1)
//
// draw(progress)
//      Функция отрисовки. progress от 0 до 1
//
// duration
//      Продолжительность анимации
export default function animate({ timing, draw, duration, animationEnd = () => { } }) {

    let start = performance.now();

    requestAnimationFrame(function animate(time) {
        // timeFraction изменяется от 0 до 1
        let timeFraction = (time - start) / duration;

        if (timeFraction < 0) timeFraction = 0;
        else if (timeFraction > 1) timeFraction = 1;

        // вычисление текущего прогресса анимации
        let progress = timing(timeFraction);

        // отрисовать анимацию
        draw(progress);

        if (timeFraction < 1) {
            requestAnimationFrame(animate);
        }

        if (timeFraction === 1) {
            animationEnd();
        }
    });
}
