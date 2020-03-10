"use strict";

// 1.2 вывести текст
document.write("Destroy the world");
let text = document.body.innerText;
document.write("<br/>");
document.writeln(text.split(" ").length, ' ', text.split(" ").join("").length); // посчитать кол-во слов и букв; 
document.write("<br/>");

//1.5 найти путь к файлу
let localUrl = document.location.href;

let internetUrl = "https://i.imgur.com/huiQMjN.png"; // задали рандомный путь в интернете

let localUrlInfo = getHrefInfo(localUrl);

let internetUrlInfo = getHrefInfo(internetUrl);

function getHrefInfo(href) {
    let newHref = {
        protocol: href.substring(0, href.indexOf(':')), // получили протокол он от нулевого символа до :
        fileExtension: href.substring(href.lastIndexOf('.') + 1, href.length), // получили расширение от последней точки до конца
        fileName: href.substring(href.lastIndexOf('/') + 1, href.lastIndexOf('.') ) // так же получили имя
    };
    return newHref;
}
// вывели инфу
document.write(localUrl);
document.write("<br/>");
document.write(localUrlInfo.protocol);
document.write("<br/>");
document.write(localUrlInfo.fileName);
document.write("<br/>");
document.write(localUrlInfo.fileExtension);
document.write("<br/>");

document.write(internetUrl);
document.write("<br/>");
document.write(internetUrlInfo.protocol);
document.write("<br/>");
document.write(internetUrlInfo.fileName);
document.write("<br/>");
document.write(internetUrlInfo.fileExtension);
document.write("<br/>");

//1.6
let hrefWithQueryParams = "https://anyaudiosQueryParams?name=lizzy&age=5";
console.log(getQueryParams(hrefWithQueryParams)); // вывели параметры ссылки
document.write("<br/>");

function getQueryParams(href) {
    let queryParams = {};
    href.substring(href.indexOf('?') + 1, href.length).split('&') // взяли все после ?, выкинули &, параметры разделили на подстроки
    .forEach(param => {
        const paramKeyValue = param.split('='); // еще раз разделили для каждого параметра
        queryParams[paramKeyValue[0]] = paramKeyValue[1]; // запихнули эти подстрочки в параметры

        document.write(paramKeyValue[0], " = ",paramKeyValue[1]);
        document.write("<br/>");
    });
    return queryParams;

}

// 2. Основные тэги
document.write("<br/>");

// 2.1

for (let i = 0; i < 5; i++) {
    let anchor = (document.createElement('a')); // создали тэг а
    anchor.href = "https://www.internet-technologies.ru/articles/ankory-i-ssylki-kak-oni-rabotayut-v-html.html"; // заполнили ссылкой
    anchor.innerText = `Ancor ${i+1}`; // заполнили текстом
    anchor.style.marginRight = '10px';
    document.body.append(anchor); // добавить анкор в хтмл
}
// 2.2 линки в хтмл


// 2.3
document.write('<br/>');
for (let i = 0; i < 3; i++) {
    let img = (document.createElement('img'));
    img.id = "${i+1}";
    img.src = "https://i.imgur.com/huiQMjN.png";
    img.style.height = (i+1) * 30 + 'px';
    img.style.width = (i+1) * 30 + 'px';
    img.style.marginRight = '5px';
    document.body.append(img);
}

// 2.4

document.write('<br/>');
document.write('Anchors: ' + document.body.getElementsByTagName('a').length); // посчитали анкоры
// 2.5
document.write('<br/>');
document.write('Links: ', document.getElementsByTagName('link').length); // посчитали линки
// 2.6
document.write('<br/>');
document.write(document.body.getElementsByTagName('a').item(0).innerText); // вывели первый анкор

// 2.7
document.write('<br/>');
document.write('Images: ' + document.body.getElementsByTagName('img').length); // кол-во картинок

// 2.8
document.write('<br/>');
document.write('Width of the first image: ', + document.body.getElementsByTagName('img').item(0).width); // ширина первой картинки

// 2.9 какая максимальная ширина
let maxWidth = 0;
document.querySelectorAll('img').forEach((img) => {
    if (img.width > maxWidth) {
        maxWidth = img.width;
    }
});

document.write('<br/>');
document.write("Width of the biggest image: ", maxWidth);

// 2.10 сложили все высоты картинок
let imagesHeightSum = 0;
document.querySelectorAll('img').forEach((img) => {
    imagesHeightSum += img.height;
});
document.write('<br/>');
document.write("Summary picture's width: ", imagesHeightSum);

// 3. Основные тэги
document.write("<br/>");
// 3.1

let forms = [];
for (let i = 0; i < 10; i++) {
    let form = document.createElement('form');
    form.name = `formName${i+1}`;
    form.id = `id${i+1}`;
    forms.push(form); // добавили в конец списка
    document.body.append(form); // добавили в хтмл
}

// 3.2
let evenFormsNames = forms.filter((form) => form.id.substring(2, form.id.length) % 2 == 0)
    .map((evenForm) => evenForm.name).join(', ');

document.write(evenFormsNames);

// 3.3
let formsHTML = document.body.getElementsByTagName('form');
for (let i = 0; i < formsHTML.length ; i++) {
    if (i%2==0){
        let inputText = document.createElement('input');
        let inputPass = document.createElement('input');
        let inputRadio = document.createElement('input');
        inputText.type = "text";
        inputText.style.margin = "5px";
        inputPass.type = "password";
        inputPass.style.margin = "5px";
        inputRadio.type = "radio";
        inputRadio.style.margin = "5px";
        formsHTML[i].appendChild(inputText);
        formsHTML[i].appendChild(inputPass);
        formsHTML[i].appendChild(inputRadio);
    } else {
        let inputText = document.createElement('input');
        let inputRadio = document.createElement('input');
        inputText.type = "text";
        inputText.style.margin = "5px";
        inputRadio.type = "radio";
        inputRadio.style.margin = "5px";
        formsHTML[i].appendChild(inputText);
        formsHTML[i].appendChild(inputRadio);
    }

}

// 3.4
for (let i = 0; i < formsHTML.length ; i++) {
    let button = document.createElement('button');
    button.type = 'button';
    button.innerText = "Показать имя формы"; // создали и заполнили кнопки для форм
    button.style.margin = "5px";
    button.onclick = () => alert(button.innerText); // по клику окошко с текстом кнопки
    formsHTML[i].appendChild(button); // добвили кнопки в хтмл
}

// 3.5
for (let i = 0; i < formsHTML.length ; i++) {
    let button = document.createElement('button');
    button.type = 'button';
    button.innerText = "Принадлежность";
    button.style.margin = "5px";
    button.onclick = () => alert(button.parentNode.id); // выводим айди формы
    formsHTML[i].appendChild(button);
}

// 3.6
for (let i = 0; i < formsHTML.length ; i++) {
    let button = document.createElement('button');
    button.type = 'reset';
    button.innerText = "Сбросить";
    button.style.margin = "5px";
    formsHTML[i].appendChild(button);
}

// 3.7
for (let i = 0; i < formsHTML.length ; i++) {
    let button = document.createElement('button');
    button.type = 'button';
    button.innerText = "Показать количество полей";
    button.style.margin = "5px";
    button.onclick = () => {
        alert(`Количество полей равно ${button.parentNode.childNodes.length}`); // посчитали братьев кнопки вместе с ней Папа-большая форма, дети-вложенные формы, их дети кнопки и поля
    };
    formsHTML[i].appendChild(button);
}

// 3.8
document.body.querySelectorAll('button').forEach((button)=> {
    button.style.padding = '15px';
    button.style.borderRadius = '10px';
    button.style.border = '1px solid rgba(60, 120, 0, 4)';
    button.style.cursor = 'pointer';
    button.onmouseover = () => {
        button.style.backgroundColor = '#20B2AA';
        button.style.color = "white";
    };
    button.onmouseout = () => {
        button.style.color = 'black';
        button.style.backgroundColor = '#40E0D0'; // рисуем зеленым при отведении
    };
    let image = document.createElement('img');
   image.style.width = '20px';
    image.style.height = '20px';
    image.style.verticalAlign = 'bottom';
    switch (button.innerText) {
        case "Показать имя формы": image.src = 'icons/i.png';
            break;
        case "Принадлежность":image.src = 'icons/i.png';
            break;
        case "Сбросить": image.src = 'icons/i.png';
            break;
        case "Показать количество полей": image.src = 'icons/i.png';
            break;
        default:
            image.src = 'icons/i.png';
    }
    button.prepend(image);
});

// 4. Доп. задание
document.write("<br/>");

// 4.1
let anchors = [];
for (let i = 0; i < 12; i++) {
    let anchor = document.createElement('a');
    anchor.style.marginRight = '5px';
    switch (true) {
        case (i % 5 === 0):
            anchor.href = 'https://yandex.ru/search/';
        anchor.innerText = 'Яндекс';
        break;
        case (i % 7 === 0):
            anchor.href = 'https://help.github.com/';
            anchor.innerText = 'ГитХаб';
        break;
        case (i % 2 === 0):
            anchor.href = 'https://itmo.ru/';
            anchor.innerText = 'ИТМО';
        break;
        case (i % 3 === 0):
            anchor.href = 'https://vk.com/';
            anchor.innerText = 'ВК';
        break;
        default:
            anchor.href = 'https://www.google.com/';
            anchor.innerText = 'Google';
    }

    document.body.append(anchor);
    anchors.push(anchor);
}

// 4.2
let table = document.createElement('table');
table.border = '1';
table.style.borderCollapse = 'collapse';
table.cellPadding = '5';
anchors.forEach((anchor, index) => {
    if (!anchors.slice(0, index).some((nextAnchor) => anchor.innerText === nextAnchor.innerText)) { // проверим совпадения, чтобы создать строчку в таблице, если не совпадает запишем в следующую строку
    let row = document.createElement('tr');
    let text = document.createElement('td'); //  название
    let count = document.createElement('td'); // кол-во сайтов
    let href = document.createElement('td'); // ссылка
    text.innerText = anchor.innerText;
    count.innerText = anchors.filter((anchorInner) => anchor.innerText == anchorInner.innerText).length; // считаем одинаковые названия, добавляем в каунт
    href.innerText = anchor.href;
    row.appendChild(text);
    row.appendChild(count);
    row.appendChild(href);
    table.appendChild(row);
    }
}); 
document.body.append(table);







