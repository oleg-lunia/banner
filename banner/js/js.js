let sliderItem = document.querySelectorAll('.slider-item');
let sliderContainer = document.querySelector('.slider-container');
let isEnabledTest = true;
let isEnabled = true;
let i = 0;

function showSlides() {
	if(isEnabledTest === true) {
		isEnabledTest = false;
		sliderContainer.classList.add('to-left');

		sliderContainer.addEventListener('animationend', function() {
			this.append(sliderItem[i]);
			this.classList.remove('to-left');
			isEnabledTest = true;
		});
	
		i++;
	
		if(i == sliderItem.length) {
			i = 0;
		}
	}

}

setInterval(showSlides, 5000);

let x;
let a;
let b = [];

let s = function (event) {
	sliderContainer.style.left = `calc(50% - ${x - event.pageX}px)`;
	a = event.pageX;
}

function delTransition() {
	sliderContainer.style.transition = '0s';
	b = document.querySelectorAll('.slider-item');
	sliderContainer.style.left = '50%'
	sliderContainer.append(b[0]);
	isEnabledTest = true;
	isEnabled = true;
}

function rigth() {
	sliderContainer.style.transition = '0s';
	b = document.querySelectorAll('.slider-item');
	sliderContainer.style.left = '50%'
	sliderContainer.prepend(b[b.length - 1]);
	isEnabledTest = true;
	isEnabled = true;
}

function swipeSlider() {

	sliderContainer.addEventListener('pointerdown', (event) => {
		if(isEnabledTest === true) {
			isEnabledTest = false;
			x = event.pageX;
			sliderContainer.addEventListener('pointermove', s);
		}
	});

	sliderContainer.addEventListener('pointerup', () => {
		if(isEnabled === true) {
			isEnabled = false;
			sliderContainer.removeEventListener('pointermove', s);
			sliderContainer.style.transition = '1s';
			if(a < x) {
				sliderContainer.style.left = `calc(50% - ${sliderItem[0].offsetWidth + 5}px)`;
				setTimeout(delTransition, 2000);
			} else if(a > x) {
				sliderContainer.style.left = `calc(50% + ${sliderItem[0].offsetWidth + 5}px)`;
				setTimeout(rigth, 2000);
			}
			
		}
		
	});
}


swipeSlider();