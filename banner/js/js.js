let sliderItem = document.querySelectorAll('.slider-item');
let sliderContainer = document.querySelector('.slider-container');
let isEnabledTest = true;
let i = 0;

function showSlides() {
	sliderContainer.classList.add('to-left');

	sliderContainer.addEventListener('animationend', function() {
		this.append(sliderItem[i]);
		this.classList.remove('to-left');
	});

	i++;

	if(i == sliderItem.length - 1) {
		i = 0;
	}

}

setInterval(showSlides, 5000);
