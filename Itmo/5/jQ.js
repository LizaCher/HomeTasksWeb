$(document).ready(function() {

// работа с селекторами
    $("p").css("fontSize", "20px"); // задали стиль у элементов с тегом р (параграфы)
    $(".paragraph").css("color", "red"); // задали стиль у класса параграф
    $(".anchor").css({
        "backgroundColor": "#F3F2F1",  // синтаксис для нескольких стилей
        "textDecoration": "none",
        "color": "green"
    });
    $("form *").prop("disabled", true); // у всех унаследованных (поэтому через пробел) из формы элементов свойство дизейблд становится тру 

// РАБОТА С DOM
    $("a").prepend("↗"); // добавить ↗ перед содержимым тегов а3
    $("a").attr("target", "_blank") // устанавливаем свойство _blank вместо target в ссылках, чтобы открывались в новом окне
    $("a").each(function () { // для каждого элемента с тегом а
        $(this).attr("href", function (index, value) { // меняем атрибут href на результат функции
            let protocol = value.substring(0, value.indexOf(':')); // берем часть значения href от нулевого символа до :
            if (protocol === 'http') { // если http то:
                let href = value.substring(value.indexOf(':'), value.length); // пишем в хреф все после :
                return protocol + 's' + href; // слепливаем (возвращаем новую ссылку, где защищенное соединение)
            }
        });
    });

    /*
    Добавить фиксированную кнопку (правый верхний угол) на страницу по
    на которую что то происходит
    */
    $('body').append('<button id = "cancel">Cancel</button>'); // добавляем в конец боди кнопку
    $("#cancel").click(function () { // даем свойство по id cancel при клике будет срабатывать функция

        $("a").each(function () { // для каждого элемента в теге а
            $(this).text(function (index, text) { // для конкретного а (по очереди) применится:
                if (text.substr(0, 1) === '?') { // если первый символ ?
                    return text.substring(1, text.length); // возвращаем текст от первого символа до конца (все кроме вопроса)
                }
            });
        });

        $("form *").prop("disabled", false); // все элементы формы не задизейблены
    });

    // ЭФФЕКТЫ JQUERY
    $("#fadeOut").click(() => { // у элементов с id fadeOut по клику сработает функция
        $("#fadeOut").parent().siblings().children().fadeOut(); /* id fadeOut у кнопки, идем в ее родителя, siblings берет элемент 
        такойже вложенности (соседнюю ячейку), потом ее потомка (это параграф), применяем к нему функцию fadeOut (позволяет скрыть элемент)*/
    });

    $("#fadeIn").click(() => {
        $("#fadeIn").parent().siblings().children().fadeIn(); // (показывает элемент)
    });

    $("#fadeTo").click(() => {
        $("#fadeTo").parent().siblings().children().fadeTo(1000, 0.4, () => alert('Fade To succeded!'));
    }); // меняем у элемнта с указанной скоростью уровнь прозрачности до указанного значения, и сработает функция для вывода диалогового окна

    $("#slideDown").click(() => {
        $("#slideDown").parent().siblings().children().slideDown();
    }); // плавно увеличивает высоту элемента по дефолту 400мс

    $("#slideToggle").click(() => {
        $("#slideToggle").parent().siblings().children().slideToggle();
    }); // плавно уменьшает и увеличивает элемент туда-сюда

    $("#toggle").click(() => {
        $("#toggle").parent().siblings().children().toggle();
    }); // резко уменьшает и увеличивает элемент туда-сюда
});

// AJAX Запросы в JQUERY
$("#ajax").click(() => { // для id ajax по клику
    $.ajax({ // получает содержимое страницы хтмл с указанной ссылки
        url: "https://inxaoc.github.io/example/ajax-1.html" // ссылка на которую отправлен ajax запрос
    }).done((html) => { // если запрос удачный, то:
        let pageContent = document.createElement("div"); // создали блок
        pageContent.innerHTML = html; // запихнули в блок, полученное на сайте содержимое
        $("body").prepend(pageContent); // добавили содержимое в начало боди
    });
});

$.ajax({
    url: "https://inxaoc.github.io/example/ajax.json",
    cache: false // запрашиваемая страница не будет кэшироваться браузером
}).done((json) => {
    let req = Object.assign({}, json); // преобразуем json-объект в объект js
    
    $("body").append(createList(req)); // добавили лист в боди
});


function createList(element) {
    let ul = document.createElement('ul'); // создали список (типо содержание) 
    for (const props in element) { //prop - ключ, element[prop] - значение (перебираем все значения вложений)
        let li = document.createElement('li'); // создали элемент списка
        if (typeof (element[props]) !== 'object') { // если тип значения не объект
            li.innerText = element[props]; // записываем в текст элемента списка значение
        } else {
            li.innerText = props; // иначе записываем в текст эдемента списка ключ
            li.append(createList(element[props]));  // рекурсия (функция вызывает себя же) и собирает как дерево объекты, которые возвращает ретерн
        }
        ul.append(li); // добавляет элементы в список
    }
    return ul;
}