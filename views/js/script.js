/* ===== Переменные ===== */
const body = document.querySelector('body'),
	sidebar = body.querySelector('nav'),
	toggle = body.querySelector(".toggle"),
	searchBtn = body.querySelector(".search-box"),
	modeSwitch = body.querySelector(".toggle-switch"),
	mobiletoggle = body.querySelector(".mobile-toggle"),
	general = body.querySelector(".general"),
	closemobile = body.querySelector(".close_mobile"),
	modeText = body.querySelector(".mode-text");

/* =========================== */

/* ===== Переключение бокового меню на закрытое или открытое ===== */
toggle.addEventListener("click", () => {
		sidebar.classList.toggle("close");
	})
	/* =========================== */

/* ===== Быстрое перемещение в начало ===== */
var t;

function up() {
	console.log("dasds")
	var top = Math.max(document.body.scrollTop, document.documentElement.scrollTop);
	if (top > 0) {
		window.scrollBy(0, -30);
		t = setTimeout('up()', 1);
	} else clearTimeout(t);
	return false;
}
/* =========================== */

/* ===== Переключение бокового меню на закрытое или открытое в мобильной версии ===== */
var x = window.matchMedia("(max-width: 800px)")

function myFunction(x) {
	if (x.matches) {
		sidebar.classList.add("mobile-close");
		sidebar.classList.remove("mobile-open");

		mobiletoggle.addEventListener("click", () => {

			sidebar.classList.remove("close");
			sidebar.classList.remove("mobile-close");
			sidebar.classList.add('mobile-open');

			closemobile.addEventListener("click", () => {
				sidebar.classList.remove("mobile-open");
				sidebar.classList.add("mobile-close");
			})

			general.addEventListener("click", () => {
				sidebar.classList.remove("mobile-open");
				sidebar.classList.add("mobile-close");
			})
		})


	} else {
		sidebar.classList.remove("mobile-close");
		sidebar.classList.remove("mobile-open");
	}
}
myFunction(x)
x.addListener(myFunction)
	/* ===========================*/

/* ===== Поиск ===== */

searchBtn.addEventListener("click", () => {
		sidebar.classList.remove("close");
	})
	/* =========================== */

/* ===== Переключение темы ===== */


function toggleDark() {
  if (body.classList.contains('dark')) {
    body.classList.remove('dark');
    localStorage.setItem("theme", "light");
    modeText.innerText = "Светлая тема";
  } else {
    body.classList.add('dark');
    localStorage.setItem("theme", "dark");
		modeText.innerText = "Тёмная тема";
  }
}

if (localStorage.getItem("theme") === "dark") {
  body.classList.add('dark');
  modeText.innerText = "Тёмная тема";
}

document.querySelector('.toggle-switch').addEventListener('click', toggleDark);


/* =========================== */

/* ===== Кнопка вверх ===== */
var btn = $('#button');

$(window).scroll(function() {
	if ($(window).scrollTop() > 300) {
    btn.addClass('show');
} else {
    btn.removeClass('show');
  }
});


btn.on('click', function(e) {
  e.preventDefault();
  $('html, body').animate({scrollTop:1}, '300');
});

/* Аватар */
$(document).ready(function(){
	var intials = $('.users__login').text().charAt(0);
	var profileImage = $('.users__avatar p span').text(intials);
});

// Меню аккордеон
const accordionItemHeaders = document.querySelectorAll(".orders__header");

accordionItemHeaders.forEach(accordionItemHeader => {
	accordionItemHeader.addEventListener("click", event => {
	const currentlyActiveAccordionItemHeader = document.querySelector(".orders__header.active");
	if(currentlyActiveAccordionItemHeader && currentlyActiveAccordionItemHeader!==accordionItemHeader) {
		currentlyActiveAccordionItemHeader.classList.toggle("active");
		currentlyActiveAccordionItemHeader.nextElementSibling.style.maxHeight = 0;
	}
    accordionItemHeader.classList.toggle("active");
    const accordionItemBody = accordionItemHeader.nextElementSibling;
    if(accordionItemHeader.classList.contains("active")) {
		accordionItemBody.style.maxHeight = accordionItemBody.scrollHeight + 150 + "px";
    }
    else {
		accordionItemBody.style.maxHeight = 0;
    }
    
});
});

// Создание статусов в заявках

document.querySelectorAll('.Новая').forEach((el) => {
	el.classList.remove('Новая', 'заявка')
	el.classList.add('new_order')
})
document.querySelectorAll('.Готова').forEach((el) => {
	el.classList.remove('Готова', 'к', 'закрытию')
	el.classList.add('ready_close')
})

document.querySelectorAll('.Выполняется').forEach((el) => {
	el.classList.remove('Выполняется')
	el.classList.add('progress')
})
document.querySelectorAll('.Отправлена').forEach((el) => {
	el.classList.remove('Отправлена', 'на', 'доработку')
	el.classList.add('revision')
})
document.querySelectorAll('.Отменена').forEach((el) => {
	el.classList.remove('Отменена')
	el.classList.add('cancel')
})
document.querySelectorAll('.Выполнена').forEach((el) => {
	el.classList.remove('Выполнена')
	el.classList.add('completed')
})

// Создание фильтра у пользователей 

document.querySelectorAll('.Мастер').forEach((el) => {
	el.classList.remove('Мастер')
	el.classList.add('master')
})
document.querySelectorAll('.Готова').forEach((el) => {
	el.classList.remove('Готова', 'к', 'закрытию')
	el.classList.add('ready_close')
})

document.querySelectorAll('.Выполняется').forEach((el) => {
	el.classList.remove('Выполняется')
	el.classList.add('progress')
})
document.querySelectorAll('.Отправлена').forEach((el) => {
	el.classList.remove('Отправлена', 'на', 'доработку')
	el.classList.add('revision')
})
document.querySelectorAll('.Отменена').forEach((el) => {
	el.classList.remove('Отменена')
	el.classList.add('cancel')
})
document.querySelectorAll('.Выполнена').forEach((el) => {
	el.classList.remove('Выполнена')
	el.classList.add('completed')
})
