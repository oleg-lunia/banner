let btn = document.querySelector('.btn-lang');
async function data() {
	let url = './data/data-en.json';
	let urlRu = './data/data-ru.json';
  let body = document.querySelector('.body');

	if (btn.value === 'en') {
		let response = await fetch(url);
		let data = await response.json();
		var source = document.getElementById("entry-template").innerHTML;
		var template = Handlebars.compile(source);
		let html = template(data);
		let app = document.querySelector('.app');
		app.innerHTML = html;
		body.classList.remove('dark');
	} else if (btn.value === 'ru') {
		let response = await fetch(urlRu);
		let data = await response.json();
		var source = document.getElementById("entry-template").innerHTML;
		var template = Handlebars.compile(source);
		let html = template(data);
		let app = document.querySelector('.app');
		app.innerHTML = html;
		body.classList.remove('dark');
	}

	let sliderItem = document.querySelectorAll('.slider-item');
	let sliderContainer = document.querySelector('.slider-container');
	let fuseAuto = true;
	let fuse = true;
	let fuse2 = true;
	let arr;

	function showSlides() {
		if (fuseAuto === true) {
			fuseAuto = false;
			sliderContainer.classList.add('to-left');
			arr = document.querySelector('.slider-item');
			sliderContainer.addEventListener('animationend', function () {
				this.append(arr);
				this.classList.remove('to-left');
				fuseAuto = true;
			});
		}

	}

	sliderContainer.ondragstart = () => false

	setInterval(showSlides, 5000);

	let indexPageX;
	let indexPageX2;
	let arrSlides = [];

	let trackCursor = function (event) {
		sliderContainer.style.left = `calc(50% - ${indexPageX - event.pageX}px)`;
		indexPageX2 = event.pageX;
	}

	function swipeLeft() {
		sliderContainer.style.transition = '0s';
		arrSlides = document.querySelectorAll('.slider-item');
		sliderContainer.style.left = '50%'
		sliderContainer.append(arrSlides[0]);
		fuse = true;
		fuse2 = true;
		setTimeout(function () { fuseAuto = true }, 5000);
	}

	function swipeRigth() {
		sliderContainer.style.transition = '0s';
		arrSlides = document.querySelectorAll('.slider-item');
		sliderContainer.style.left = '50%'
		sliderContainer.prepend(arrSlides[arrSlides.length - 1]);
		fuse = true;
		fuse2 = true;
		setTimeout(function () { fuseAuto = true }, 5000);
	}

	function swipeSlider() {

		sliderContainer.addEventListener('pointerdown', (event) => {
			if (fuse === true) {
				fuse = false;
				fuseAuto = false;
				indexPageX = event.pageX;
				sliderContainer.addEventListener('pointermove', trackCursor);
			}
		});

		sliderContainer.addEventListener('pointerup', () => {
			if (fuse2 === true) {
				fuse2 = false;
				sliderContainer.removeEventListener('pointermove', trackCursor);
				sliderContainer.style.transition = '0.5s';
				if (indexPageX2 < indexPageX) {
					sliderContainer.style.left = `calc(50% - ${sliderItem[0].offsetWidth + 5}px)`;
					setTimeout(swipeLeft, 500);
				} else if (indexPageX2 > indexPageX) {
					sliderContainer.style.left = `calc(50% + ${sliderItem[0].offsetWidth + 5}px)`;
					setTimeout(swipeRigth, 500);
				}

			}

		});
	}

	swipeSlider();

	let optionItems = document.querySelectorAll('.option-item');
	const CONTINUE = document.querySelector('.continue');
	let arrUrl = ['https://www.google.com/search?q=1', 'https://www.google.com/search?q=2', 'https://www.google.com/search?q=3'];
	let indexUrl;

	for (let i = 0; i < optionItems.length; i++) {
		let optionItem = optionItems[i];
		optionItem.addEventListener('click', () => {
			for (let j = 0; j < optionItems.length; j++) {
				optionItems[j].classList.remove('active');
			}
			optionItem.classList.add('active');
			indexUrl = i;
		})
	}

	CONTINUE.addEventListener('click', () => {
		console.log(indexUrl)
		if (indexUrl === 0 || indexUrl === 1 || indexUrl === 2) {
			window.open(arrUrl[indexUrl], '_blank');
		} else {
			window.open(arrUrl[1], '_blank');
		}
	});

	let switchCondition = document.querySelector('.switch');
	// let body = document.querySelector('.body');
	let sliderHeader = document.querySelectorAll('.slider-item-header');
	let btnLang = document.querySelector('.btn-lang');
	let rating = document.querySelectorAll('.rating');
	let switchIndex = true;

	switchCondition.addEventListener('click', () => {
		if (switchIndex === true) {
			for (let i = 0; i < sliderItem.length; i++) {
				sliderItem[i].classList.add('dark');
			}
			body.classList.add('dark');
			for (let i = 0; i < optionItems.length; i++) {
				optionItems[i].classList.add('dark');
			}
			for (let i = 0; i < sliderHeader.length; i++) {
				sliderHeader[i].classList.add('dark');
			}
			for (let i = 0; i < rating.length; i++) {
				rating[i].classList.add('dark');
			}
			switchCondition.classList.add('dark');
			btnLang.classList.add('dark');
			switchIndex = false;
		} else {
			for (let i = 0; i < sliderItem.length; i++) {
				sliderItem[i].classList.remove('dark');
			}
			body.classList.remove('dark');
			for (let i = 0; i < optionItems.length; i++) {
				optionItems[i].classList.remove('dark');
			}
			for (let i = 0; i < sliderHeader.length; i++) {
				sliderHeader[i].classList.remove('dark');
			}
			for (let i = 0; i < rating.length; i++) {
				rating[i].classList.remove('dark');
			}
			switchCondition.classList.remove('dark');
			btnLang.classList.remove('dark');
			switchIndex = true;
		}
	});

	let graphIconFree = document.querySelector('.graph-icon-free');
	let graphIconPro = document.querySelector('.graph-icon-pro');

	function showGraphIcon() {
		graphIconFree.style.display = 'flex';
		graphIconPro.style.display = 'flex';
	}

	setTimeout(showGraphIcon, 1700);
};

data();

btn.addEventListener('click', () => {
	if (btn.value === 'en') {
		btn.value = 'ru';
		btn.innerHTML = 'ru';
		data();
	} else {
		btn.value = 'en';
		btn.innerHTML = 'en';
		data();
	}
});
