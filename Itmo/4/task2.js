"use strict";


// 2
var form = document.createElement('form'), // создать элементы для хтмл
    inputCols = document.createElement('input'),
    inputRows = document.createElement('input'),
    labelCols = document.createElement('label'), // подпись для инпута (название)
    labelRows = document.createElement('label'),
    button = document.createElement('button')
    ;


inputCols.type = 'text'; // объявить свойства для элемента в хтмл
inputCols.id = 'cols';
inputCols.style.display = 'block';

labelCols.innerText = 'Columns';
labelCols.htmlFor = 'cols';
labelCols.style.display = 'block';

inputRows.type = 'text';
inputRows.id = 'rows';
inputRows.style.display = 'block';

labelRows.innerText = 'Rows';
labelRows.htmlFor = 'rows';
labelRows.style.display = 'block';

button.type = 'button';
button.innerText = 'Create table';
button.style.marginTop = '5px';

button.onclick = () => { // По нажатию на кнопку создается таблица (страница не перезагружается). Форму создания таблицы спрятать
    form.style.display = 'none';
    createTable(document.getElementById('cols').value, document.getElementById('rows').value); // вызвали функцию для создания таблицы передали ей значения по индексу колонок и строчек
    createFunctionPanel(); // вызвали фунцию для создания панели с функциями
    form.reset();
};

form.append(labelCols, inputCols, labelRows, inputRows, button); // в форму добавляются созданные элементы
document.body.append(form); // в боди добавляетя первая форма

function createTable(cols, rows) {
    let table = document.createElement('table'); // создали элемен с тэгом тейбл
    table.style.borderCollapse = 'collapse';

    for (let i = 1; i <= rows; i++) {
        let tr = document.createElement('tr'); // создали строчки
        for (let j = 1; j <= cols; j++) {
            let td = createTableCell(); // в строчках создали ячейки с помощью функции
            tr.append(td); // добавили потомки-ячейки в строчки
        }
        table.append(tr); // добавили потомки-строчки в таблицу
    }
    document.body.append(table); // таблица - ребенок боди
}

function createTableCell() {
    let td = document.createElement('td'); // создать ячейку
    td.style.minWidth = '100px'; // минимальна ширна 100
    td.style.height = '30px'; // высота 30
    td.style.border = '1px solid black'; // стиль бордера
    td.onmousemove = () => td.style.backgroundColor = '#cecece'; // при наведении мышки меняется цвет
    td.onmouseout = () => td.style.backgroundColor = 'white'; // когда убираешь мышку цвет белый
    td.append(createTableCellContent(td)); // вызываем функцию
    return td;
}

// 3
function createTableCellContent(td) {
    td.innerHTML = ''; // в элементе содержимое становится пустым (на всякий случай)
    let form = document.createElement('form'), // создали форму
        textarea = document.createElement('textarea'), // создали поле для текста
        button = document.createElement('button') // создали кнопку
    ;
    textarea.cols = 20; //свойства поля для текста
    textarea.rows = 1;

    button.innerText = 'Save'; // свойства кнопки
    button.type = 'button';
    button.style.display = 'block';
    
    button.onclick = () => { // После нажатия на «сохранить», эта форма пропадает, а вместо нее появляется введенный пользователем текст
        td.innerText = textarea.value; // значение ячейки становится знычением поля для текста
        form.remove();
    };

    form.append(textarea, button); // элементы добавляются в форму
    return form;
}

// 4. Оформление блока с функцией
function createFunctionPanel() {
    let FP = document.createElement('div'); // создали блок
    FP.className = 'function_panel'; // присвоили имя класса (его стили в хтмл)
    FP.append(borderChanger(),
        captionChanger(),
        rowDeleter(),
        divRandomContentCreator(),
        tableDeleter()); // вызвали кучу функций, которые насоздавали маленькие дивчики для заданий 5-9
    document.body.append(FP); // добавили FP-потомка к боди (появится на экране)
}

function createFunction(functionName) { // передали имя функции (N: delete border's table из borderChanger) 
    let div = document.createElement('div'), // создали маленький дивчик внутри большого
        p = document.createElement('p') // добавили параграф
    ;
    p.innerText = functionName; // в параграфе имя функции
    div.className = 'function'; // задали имя класса (его стиль в хтмл)
    div.append(p); // р - ребенок дивчика
    return div;
}

class defaultFunction {
    constructor(functionName, buttonName, withInput = true) { // по умолчанию withInput=true, если не указано значение при вызове класса
        this.div = createFunction(functionName); // создали переменную див и вызвали функцию для создания дива
        this.form = document.createElement('form'); // создали форму

        this.button = document.createElement('button'); // создали тег баттон
        this.button.type = 'button'; // дали баттону тип кнопку
        this.button.innerText = buttonName; // название кнопки
       
        if (withInput) { // если true
            this.inputElement = document.createElement('input'); // создали поле инпут
            this.inputElement.type = 'text'; //тип поля "текст"
            this.form.append(this.inputElement); // inputElement - потомок формы
        }
        this.form.append(this.button); // кнопка - потомок формы
        this.div.append(this.form); // форма - потомок дивчика
    }

        getDiv() {
            return this.div; // возврощает внутренний дивчик
        };

        getInputValue() {
            return this.inputElement.value; // возвращает значение inputElement (которое вводим в браузере)
        };

        addFormElement(HTMLElement) {
            this.form.prepend(HTMLElement); // HTMLElement добавляется в начало формы
        };

        addOnButtonListener(onClickFunction) {
            this.button.onclick = onClickFunction; // при нажатии на кнопку сработает функция (N: стрелочная для borderChanger )
        };
};


// 5. добавить элемент “Изменить границы таблицы”
function borderChanger() {
    let func = new defaultFunction( // создаем экземпляр класса (сработал его конструктор)
        "Change table's border",
        'Apply' // передаются в функцию defailtFunction
    );

    func.addOnButtonListener(() => { // стрелочная функция, чтобы не создавать лишнюю функцию, которая передастся в addOnButtonListener
        let tdList = document.querySelectorAll('td'); // создаем массив со всеми элементами в документе с тэгом "td" (ячейки)
        tdList.forEach((td) => // для каждой ячейки из массива
            td.style.border = `${func.getInputValue()}px ${select.value}` // стиль рамки (что вводим в инпут (пиксели) и значение в селекторе)
        );
    });

    func.inputElement.oninput = () => { // при изменении поля (кол-во пикселей) сабатывает функция
        func.button.innerText = 'Apply' + ' ' + func.getInputValue() + ' px '; // название кнопки меняется
        if (select.value !== '' && select.value !== 'Choose border style') { 
            func.button.innerText += ' and border ' + select.value;
        }
    };

    let select = createHTMLSelectElement(func); // создали элемент селект и вызвали функцию для создания и изменения кнопки Применить

    getBorderOptions().forEach((option) => select.append(option)); // опции добавляются в селектор

    func.addFormElement(select); // вызвали функцию, она добавит селект в начало формы
    return func.getDiv();
}

function createHTMLSelectElement(func) {
    let select = document.createElement('select'), // создали элемент селект
        option = document.createElement('option'); // создали элемент значения (будет в селекте)

    option.innerText = 'Choose border style';  // значение селектора 
    option.disabled = true; // делаем значение задизейбленым
    option.selected = true; // делаем значение выбранным в начале
    select.append(option); // опцияя добавляется в конец селекта

    select.onchange = () => { // присваиваем внутреннему свойству onchange функцию, которая сработает при изменении значения в селекторе
        if (func.getInputValue() !== '') { // если инпут (с пикселями) не пустой
            func.button.innerText = 'Apply' + ' ' + func.getInputValue() + ' px ' +
                'and border ' + select.value; // текст кнопки становится "Apply [значение инпута] px and border [значение селектора]"
        } else { // иначе
            func.button.innerText = 'Apply border ' + select.value; // текст кнопки становится "Apply border [значение селектора]"
        }
    };
    return select;
}

function getBorderOptions() {
    let borderOptions = []; // массив со значениями в селекторе:
    ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'].forEach( // для каждого значения
        (borderStyle) => {
            let option = document.createElement('option'); // создали опцию
            option.innerText = borderStyle; // в названиях будут элементы массива
            borderOptions.push(option); // опции добавятся в конец массива опций
        }
    );
    return borderOptions;
}

// 6. добавить элемент “Добавить заголовок”
function captionChanger() {
    let func = new defaultFunction( // создаем новый экземпляр класса
        'Add title',
        'Add'
    );

    func.addOnButtonListener(() => { // функция кот сработает при нажатии на кнопку
        let caption = document.createElement('caption'); // создали элемент с тегом для названия таблицы
        caption.innerText = func.getInputValue(); // взяли значение из поля (кот в классе)
        document.querySelector('table').append(caption); // элемент присоединили к элементу с тегом тейбл
    });

    return func.getDiv();
}

// 7. добавить элемент “Удалить строку”
function rowDeleter() {
    let func = new defaultFunction(
        'Delete row',
        'Delete'
    );

    func.addOnButtonListener(() => {
        let tableRows = document.querySelectorAll('tr'); // выбрать все элементы с тегом тр
        if (func.getInputValue() < 1 || func.getInputValue() > tableRows.length
            || func.getInputValue().match(/([^0-9])/g)) { // если значение в поле<1 или больше количества строк в таблице или значение не из цифр 0-9
            alert('Wrong number! Try again.');
        } else {
            tableRows[func.getInputValue() - 1].remove(); // удаляем строку из таблицы под указынным номером -1 (потому, что в табл отсчет от 0)
        }
    });
    return func.getDiv();
}

// 8. добавить элемент “Случайный выбор”
function divRandomContentCreator() {
    let func = new defaultFunction(
        'Random choice',
        'Magic',
        false
    );

    func.addOnButtonListener(() => { // пр нажатии на кнопку сработает функция magic с параметром-функцией
        magic(chooseRandomTableDataCell());
    });
    return func.getDiv();
}

function magic(td) {
    if (randomInteger(1, 15) == 7) { // если рандомное число равно 7 то для ячейки, выбранной в функции chooseRandomTableDataCell вывести форму
        td.append(createTableCellContent(td));
    } else { // иначе
        chooseRandomBgColor(td); // вызвать функцию с изменением цвета фона
        chooseRandomFontStyle(td); // вызвать функцию с изменением
    }
}

function chooseRandomTableDataCell() {
    let tableCellList = document.querySelectorAll('td'); // взяли  в массив все элементы с тегом тд (ячейки)
    let randomCellIndex = randomInteger(0, tableCellList.length - 1); // выбрали рандомный индекс ячейки от 0 до количества ячеек в таблице-1
    return tableCellList[randomCellIndex];
}

function setRandomColor() {
    let hexTable = "0123456789ABCDEF"; // стринг (массив) символов
    let newColor = '#';
    for (let i = 0; i < 6; i++) { // 6 раз потому что в цвете 6 символов
        newColor += hexTable[randomInteger(0, hexTable.length - 1)]; // добавляется рандомное значение из массива
    }
    return newColor;
}

function chooseRandomBgColor(td) {
    td.style.backgroundColor = setRandomColor(); // вызвали функцию с рандомным выбором цвета
}

function chooseRandomFontStyle(td) {
    td.style.color = setRandomColor(); // рандомный новый цвет
    td.style.fontSize =  randomInteger(15, 25) + 'pt'; // рандомный размер шрифта 15-25pt
   
    if (typeof td.childNodes[0] !== 'undefined') { // если у ячейки нулевой потомок (форма) !=0
        td.childNodes[0].childNodes.forEach((elem) => { // для каждого внутреннего тега формы
            elem.style.color = setRandomColor(); // рандомный цвет элемента
            elem.style.fontSize = randomInteger(15, 25) + 'pt'; // рандомный размер шрифта элемента 15-25pt
        });
    }
}

function randomInteger(min, max) { // случайное число от min до (max+1), потому что округление до меньшего
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand); // округление вниз
}

// 9. добавить элемент “Удалить”
function tableDeleter() {
    let func = new defaultFunction(
        'Delete',
        'Delete table',
        false
    );

    func.addOnButtonListener(() => { // при нажатии кнопки
        form.style.display = 'block'; // отображение блоками
        document.querySelector('table').remove(); // удаляем всю таблицу
        document.querySelector('div.function_panel').remove(); // удалили панель
    });
    return func.getDiv();
}