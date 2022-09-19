class t{static getSlideCount(t){return t.children.length}static addSliderElements(e){t.createSlides(e),t.createSliderButtons(e),t.addSliderStyles(e)}static createSlides(t){let e=document.createElement("div");e.classList.add("slider");for(let i=0;i<t.children.length;i++){let s=t.children[i],n=document.createElement("div");n.classList.add("slide"),n.appendChild(s.cloneNode(!0)),e.appendChild(n)}t.replaceChildren(e)}static createSliderButtons(e){let i=document.createElement("div");i.classList.add("slide-controls");const s=t.createButton("btn-prev","Prev"),n=t.createButton("btn-next","Next");i.appendChild(s),i.appendChild(n),e.appendChild(i)}static createButton(t,e){let i=document.createElement("button");i.setAttribute("id",t);let s=document.createElement("p");s.classList.add(t+"__text");let n=document.createTextNode(e);return s.appendChild(n),i.appendChild(s),i}static addSliderStyles(t){t.classList.add("slider-container");var e=document.createElement("style");e.innerHTML="\n            .slider-container {\n                position: relative;\n                overflow: hidden;\n            }\n            .slider {\n                display: flex;\n                height: 100%;\n                width: 100%;\n                align-items: center;\n                will-change: transform;\n            }\n            .slide {\n                position: relative;\n                display: flex;\n                align-items: center;\n                justify-content: center;\n                width: 100%;\n                height: 100%;\n            }\n            .slide-controls {\n                position: absolute;\n                left: 0;\n                top: 50%;\n                transform: translateY(-50%);\n                width: 100%;\n                display: flex;\n                justify-content: space-between;\n                align-items: center;\n            }\n            .slide-dot-container {\n                position: absolute;\n                bottom: 1rem;\n                left: 50%;\n                transform: translateX(-50%);\n                display: flex;\n                justify-content: center;\n                align-items: center;\n                gap: 1rem;\n            }\n        ",document.getElementsByTagName("head")[0].appendChild(e)}}class e{static create(i,s=1,n=1,l=500){const d=t.getSlideCount(i);return s=Math.min(s,d),n=Math.min(n,d),t.addSliderElements(i),new e(i,s,n,l)}scrollToSlide(t){const e=this._getRealIndex(this._sliderInternalIndex);t!==e&&this._scroll(t-e)}rightScroll(){return this._scroll(this._slidesToScroll)}leftScroll(){return this._scroll(-this._slidesToScroll)}onAnimationStart(t){this._handlerAnimationStart=t}onAnimationEnd(t){this._handlerAnimationEnd=t}get length(){return this._initialSlidesCount}_slider=document.querySelector(".slider");_slides=[];_initialSlidesCount=0;_slidesToShow;_slidesToScroll;_duration;_sliderInternalIndex;_slideWidth;_handlerAnimationStart=()=>{};_handlerAnimationEnd=()=>{};constructor(t,e,i,s){this._slidesToShow=e,this._slidesToScroll=i,this._duration=s,this._slides=this._getSlides(),this._initialSlidesCount=this._slides.length,this._slides.forEach((t=>t.style.minWidth=100/e+"%")),this._slideWidth=this._slides[0].clientWidth,this._addBuffers(),this._sliderInternalIndex=this._getStartBufferLength,this._slides=this._getSlides(),this._translateSliderX(-this._slideWidth*this._sliderInternalIndex),window.addEventListener("resize",(()=>this._onResize()))}_onResize(){this._slideWidth=this._slides[this._sliderInternalIndex].clientWidth,this._slider.style.transform=`translateX(${-this._slideWidth*this._sliderInternalIndex}px)`}get _getStartBufferLength(){return Math.max(this._slidesToShow,this._slidesToScroll)}get _getEndBufferLength(){return this._getStartBufferLength-1}_addBuffers(){const t=[],e=[];for(let e=0;e<this._getStartBufferLength;++e)t.unshift(this._slides[this._slides.length-1-e].cloneNode(!0));for(let t=0;t<this._getEndBufferLength;++t)e.push(this._slides[t].cloneNode(!0));this._slider.append(...e),this._slider.prepend(...t)}_getSlides(){return document.querySelectorAll(".slide")}_translateSliderX(t){this._slider.style.transform=`translateX(${t}px)`}_getRealIndex(t){return(this._initialSlidesCount+t-this._getStartBufferLength)%this._initialSlidesCount}_scroll(t){if(0===t)return;this._handlerAnimationStart();return Math.sign(t)>0?this._sliderInternalIndex>=this._initialSlidesCount&&(this._sliderInternalIndex%=this._initialSlidesCount,this._translateSliderX(-this._slideWidth*this._sliderInternalIndex)):this._sliderInternalIndex<Math.abs(t)&&(this._sliderInternalIndex+=this._initialSlidesCount,this._translateSliderX(-this._slideWidth*this._sliderInternalIndex)),this._animate(t),this._sliderInternalIndex+=t,this._getRealIndex(this._sliderInternalIndex)}_animate(t){const e=-this._slideWidth*this._sliderInternalIndex;!function({timing:t,draw:e,duration:i,animationEnd:s=(()=>{})}){let n=performance.now();requestAnimationFrame((function l(d){let r=(d-n)/i;r<0?r=0:r>1&&(r=1);let a=t(r);e(a),r<1&&requestAnimationFrame(l),1===r&&s()}))}({duration:this._duration,timing:function(t){return t},draw:i=>{this._translateSliderX(e-Math.round(this._slideWidth*t*i))},animationEnd:()=>{this._handlerAnimationEnd()}})}}class i{_sliderContainer;_handlerDotClick;_dots=[];static create(t,e,s){return new i(t,e,s)}constructor(t,e,i){this._sliderContainer=t,this.createDots(e,i)}onDotClick(t){for(let e=0;e<this._dots.length;++e)this._dots[e].addEventListener("click",(()=>t(e)))}setActive(t){const e=this._dots.findIndex(this.isActive);t!==e&&(e>=0&&this._dots[e].classList.remove("slide-dot--active"),this._dots[t].classList.add("slide-dot--active"))}isActive(t){return t.classList.contains("slide-dot--active")}createDots(t,e){let i=document.createElement("div");i.classList.add("slide-dot-container");for(let s=0;s<t;++s){let t=document.createElement("button");t.innerHTML=`<p class="slide-dot-text">${s}</p>`,t.classList.add("slide-dot"),s===e&&t.classList.add("slide-dot--active"),i.appendChild(t),this._dots.push(t)}this._sliderContainer.appendChild(i)}}class s{_sliderContainer;_btnNext=document.getElementById("btn-next");_btnPrev=document.getElementById("btn-prev");static create(t){return new s(t)}constructor(t){this._sliderContainer=t}onRightClick(t){this._btnNext.addEventListener("click",t)}onLeftClick(t){this._btnPrev.addEventListener("click",t)}}class n{constructor(t,e){this._slider=t,this._btnsDots=e}onDotClick(t){this._btnsDots.setActive(t),this._slider.scrollToSlide(t)}onRightClick(){const t=this._slider.rightScroll();this._btnsDots.setActive(t)}onLeftClick(){const t=this._slider.leftScroll();this._btnsDots.setActive(t)}}class l{onDotClick(t){console.log("skipped: onDotClick: ",t)}onRightClick(){console.log("skipped: onRightClick")}onLeftClick(){console.log("skipped: onLeftClick")}}class d{constructor(t,e,i){this._activeState=new n(t,i),this._waitingState=new l,this._state=this._activeState,this.bindHandlers(t,e,i)}bindHandlers(t,e,i){t.onAnimationStart((()=>this._state=this._waitingState)),t.onAnimationEnd((()=>this._state=this._activeState)),e.onRightClick((()=>this._state.onRightClick())),e.onLeftClick((()=>this._state.onLeftClick())),i.onDotClick((t=>this._state.onDotClick(t)))}}function r(t,{speed:n=500,slidesToShow:l=1,slidesToScroll:r=1}){!function(t,{speed:n=500,slidesToShow:l=1,slidesToScroll:r=1}){const a=e.create(t,l,r,n),o=s.create(t),h=i.create(t,a.length,0);new d(a,o,h)}(t,{speed:n,slidesToShow:l,slidesToScroll:r})}window.onload=()=>{r(document.querySelector(".main__slider"),{speed:500,slidesToShow:1,slidesToScroll:1})};
//# sourceMappingURL=index.bad69ee2.js.map
