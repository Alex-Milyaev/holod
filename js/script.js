/*header-scroll */
$(document).ready(function () {
	const scrollOffset =
		$('#scroll').offset().top;
		
	$(window).scroll(function(){
		const scrolled = 
		$(this).scrollTop();

		if (scrolled > scrollOffset) {
			$('#header').addClass('scroll-fixed');
		} else if (scrolled < scrollOffset) {
			$('#header').removeClass('scroll-fixed');
		}
	});
});

/* slider-hero */
document.addEventListener('DOMContentLoaded', function() {
    const swiperHero = new Swiper('.section-hero__swipper', {
		slidesPerView: 'auto',
		allowTouchMove: true,
		centeredSlidesBounds: {
			centeredSlides: true
		},
		loop: true,
		autoplay: {
			delay: 4000,
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
    });
});

/* slider-project */
var swiper3 = new Swiper('#slider3', {
	slidesPerView: 4,
	spaceBetween: 15,
	loop: true,
	slideToClickedSlide: true,
	// breakpoints: {
	// 	750: {
	// 		slidesPerView: 2,
	// 		spaceBetween: 34,
	// 		observer: true,
	// 	},
	// 	970: {
	// 		slidesPerView: 2,
	// 		spaceBetween: 50,
	// 		observer: true,
	// 	},
	// 	1430: {
	// 		slidesPerView: 3,
	// 		slidesPerColumn: 1,
	// 		slidesPerGroup: 1,
	// 		spaceBetween: 20,
	// 		observer: true,
	// 	},
	// },

	autoplay: {
		delay: 6000,
		disableOnInteraction: false,
	},
});



const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 600;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content')) {
				popupClose(e.target.closest('.popup'));
			}
		});
	}
}
function popupClose(popupActive, doUnlock = true) {
	if (unlock) {
		popupActive.classList.remove('open');
		if (doUnlock) {
			bodyUnLock();
		}
	}
}


function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	for (let index = 0; index < lockPadding.length; index++) {
		const el = lockPadding[index];
		el.style.paddingRight = lockPaddingValue;
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

function bodyUnLock() {
	setTimeout(function () {
		for	(let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	}, timeout);
}

const anchors = document.querySelectorAll('a[href*="#"]')

for (let anchor of anchors) {
	anchor.addEventListener("click", function(event) {
		event.preventDefault();
		const blockID = anchor.getAttribute('href')
		document.querySelector('' + blockID).scrollIntoView({
			behavior: "smooth",
			block: "start"
		})
	})
}

// Функция ymaps.ready() будет вызвана, когда
// загрузятся все компоненты API, а также когда будет готово DOM-дерево.
ymaps.ready(init);
function init(){
    // Создание карты.
    var myMap = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [56.82883452633791,35.885025550310594],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 15
    });

    var myPlacemark = new ymaps.Placemark([56.82883452633791,35.885025550310594], {}, {
        // iconLayout: 'default#image',
        // iconImageHref: 'mark.svg',
        // iconImageSize: [12, 12],
        // iconImageOffset: [-3, -42]
    });

    myMap.controls.remove('geolocationControl'); // удаляем геолокацию
    myMap.controls.remove('searchControl'); // удаляем поиск
    myMap.controls.remove('trafficControl'); // удаляем контроль трафика
    myMap.controls.remove('typeSelector'); // удаляем тип
    myMap.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    // myMap.controls.remove('zoomControl'); // удаляем контрол зуммирования
    myMap.controls.remove('rulerControl'); // удаляем контрол правил
    // myMap.behaviors.disable(['scrollZoom']); // отключаем скролл карты (опционально)

    // Размещение геообъекта на карте.
    myMap.geoObjects.add(myPlacemark); 
}