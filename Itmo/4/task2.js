"use strict";


// 2
var form = document.createElement('form'), // ������� �������� ��� ����
    inputCols = document.createElement('input'),
    inputRows = document.createElement('input'),
    labelCols = document.createElement('label'), // ������� ��� ������ (��������)
    labelRows = document.createElement('label'),
    button = document.createElement('button')
    ;


inputCols.type = 'text'; // �������� �������� ��� �������� � ����
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

button.onclick = () => { // �� ������� �� ������ ��������� ������� (�������� �� ���������������). ����� �������� ������� ��������
    form.style.display = 'none';
    createTable(document.getElementById('cols').value, document.getElementById('rows').value); // ������� ������� ��� �������� ������� �������� �� �������� �� ������� ������� � �������
    createFunctionPanel(); // ������� ������ ��� �������� ������ � ���������
    form.reset();
};

form.append(labelCols, inputCols, labelRows, inputRows, button); // � ����� ����������� ��������� ��������
document.body.append(form); // � ���� ���������� ������ �����

function createTable(cols, rows) {
    let table = document.createElement('table'); // ������� ������ � ����� �����
    table.style.borderCollapse = 'collapse';

    for (let i = 1; i <= rows; i++) {
        let tr = document.createElement('tr'); // ������� �������
        for (let j = 1; j <= cols; j++) {
            let td = createTableCell(); // � �������� ������� ������ � ������� �������
            tr.append(td); // �������� �������-������ � �������
        }
        table.append(tr); // �������� �������-������� � �������
    }
    document.body.append(table); // ������� - ������� ����
}

function createTableCell() {
    let td = document.createElement('td'); // ������� ������
    td.style.minWidth = '100px'; // ���������� ����� 100
    td.style.height = '30px'; // ������ 30
    td.style.border = '1px solid black'; // ����� �������
    td.onmousemove = () => td.style.backgroundColor = '#cecece'; // ��� ��������� ����� �������� ����
    td.onmouseout = () => td.style.backgroundColor = 'white'; // ����� �������� ����� ���� �����
    td.append(createTableCellContent(td)); // �������� �������
    return td;
}

// 3
function createTableCellContent(td) {
    td.innerHTML = ''; // � �������� ���������� ���������� ������ (�� ������ ������)
    let form = document.createElement('form'), // ������� �����
        textarea = document.createElement('textarea'), // ������� ���� ��� ������
        button = document.createElement('button') // ������� ������
    ;
    textarea.cols = 20; //�������� ���� ��� ������
    textarea.rows = 1;

    button.innerText = 'Save'; // �������� ������
    button.type = 'button';
    button.style.display = 'block';
    
    button.onclick = () => { // ����� ������� �� �����������, ��� ����� ���������, � ������ ��� ���������� ��������� ������������� �����
        td.innerText = textarea.value; // �������� ������ ���������� ��������� ���� ��� ������
        form.remove();
    };

    form.append(textarea, button); // �������� ����������� � �����
    return form;
}

// 4. ���������� ����� � ��������
function createFunctionPanel() {
    let FP = document.createElement('div'); // ������� ����
    FP.className = 'function_panel'; // ��������� ��� ������ (��� ����� � ����)
    FP.append(borderChanger(),
        captionChanger(),
        rowDeleter(),
        divRandomContentCreator(),
        tableDeleter()); // ������� ���� �������, ������� ����������� ��������� ������� ��� ������� 5-9
    document.body.append(FP); // �������� FP-������� � ���� (�������� �� ������)
}

function createFunction(functionName) { // �������� ��� ������� (N: delete border's table �� borderChanger) 
    let div = document.createElement('div'), // ������� ��������� ������ ������ ��������
        p = document.createElement('p') // �������� ��������
    ;
    p.innerText = functionName; // � ��������� ��� �������
    div.className = 'function'; // ������ ��� ������ (��� ����� � ����)
    div.append(p); // � - ������� �������
    return div;
}

class defaultFunction {
    constructor(functionName, buttonName, withInput = true) { // �� ��������� withInput=true, ���� �� ������� �������� ��� ������ ������
        this.div = createFunction(functionName); // ������� ���������� ��� � ������� ������� ��� �������� ����
        this.form = document.createElement('form'); // ������� �����

        this.button = document.createElement('button'); // ������� ��� ������
        this.button.type = 'button'; // ���� ������� ��� ������
        this.button.innerText = buttonName; // �������� ������
       
        if (withInput) { // ���� true
            this.inputElement = document.createElement('input'); // ������� ���� �����
            this.inputElement.type = 'text'; //��� ���� "�����"
            this.form.append(this.inputElement); // inputElement - ������� �����
        }
        this.form.append(this.button); // ������ - ������� �����
        this.div.append(this.form); // ����� - ������� �������
    }

        getDiv() {
            return this.div; // ���������� ���������� ������
        };

        getInputValue() {
            return this.inputElement.value; // ���������� �������� inputElement (������� ������ � ��������)
        };

        addFormElement(HTMLElement) {
            this.form.prepend(HTMLElement); // HTMLElement ����������� � ������ �����
        };

        addOnButtonListener(onClickFunction) {
            this.button.onclick = onClickFunction; // ��� ������� �� ������ ��������� ������� (N: ���������� ��� borderChanger )
        };
};


// 5. �������� ������� ��������� ������� ��������
function borderChanger() {
    let func = new defaultFunction( // ������� ��������� ������ (�������� ��� �����������)
        "Change table's border",
        'Apply' // ���������� � ������� defailtFunction
    );

    func.addOnButtonListener(() => { // ���������� �������, ����� �� ��������� ������ �������, ������� ���������� � addOnButtonListener
        let tdList = document.querySelectorAll('td'); // ������� ������ �� ����� ���������� � ��������� � ����� "td" (������)
        tdList.forEach((td) => // ��� ������ ������ �� �������
            td.style.border = `${func.getInputValue()}px ${select.value}` // ����� ����� (��� ������ � ����� (�������) � �������� � ���������)
        );
    });

    func.inputElement.oninput = () => { // ��� ��������� ���� (���-�� ��������) ���������� �������
        func.button.innerText = 'Apply' + ' ' + func.getInputValue() + ' px '; // �������� ������ ��������
        if (select.value !== '' && select.value !== 'Choose border style') { 
            func.button.innerText += ' and border ' + select.value;
        }
    };

    let select = createHTMLSelectElement(func); // ������� ������� ������ � ������� ������� ��� �������� � ��������� ������ ���������

    getBorderOptions().forEach((option) => select.append(option)); // ����� ����������� � ��������

    func.addFormElement(select); // ������� �������, ��� ������� ������ � ������ �����
    return func.getDiv();
}

function createHTMLSelectElement(func) {
    let select = document.createElement('select'), // ������� ������� ������
        option = document.createElement('option'); // ������� ������� �������� (����� � �������)

    option.innerText = 'Choose border style';  // �������� ��������� 
    option.disabled = true; // ������ �������� �������������
    option.selected = true; // ������ �������� ��������� � ������
    select.append(option); // ������ ����������� � ����� �������

    select.onchange = () => { // ����������� ����������� �������� onchange �������, ������� ��������� ��� ��������� �������� � ���������
        if (func.getInputValue() !== '') { // ���� ����� (� ���������) �� ������
            func.button.innerText = 'Apply' + ' ' + func.getInputValue() + ' px ' +
                'and border ' + select.value; // ����� ������ ���������� "Apply [�������� ������] px and border [�������� ���������]"
        } else { // �����
            func.button.innerText = 'Apply border ' + select.value; // ����� ������ ���������� "Apply border [�������� ���������]"
        }
    };
    return select;
}

function getBorderOptions() {
    let borderOptions = []; // ������ �� ���������� � ���������:
    ['dotted', 'dashed', 'solid', 'double', 'groove', 'ridge', 'inset', 'outset'].forEach( // ��� ������� ��������
        (borderStyle) => {
            let option = document.createElement('option'); // ������� �����
            option.innerText = borderStyle; // � ��������� ����� �������� �������
            borderOptions.push(option); // ����� ��������� � ����� ������� �����
        }
    );
    return borderOptions;
}

// 6. �������� ������� ��������� ���������
function captionChanger() {
    let func = new defaultFunction( // ������� ����� ��������� ������
        'Add title',
        'Add'
    );

    func.addOnButtonListener(() => { // ������� ��� ��������� ��� ������� �� ������
        let caption = document.createElement('caption'); // ������� ������� � ����� ��� �������� �������
        caption.innerText = func.getInputValue(); // ����� �������� �� ���� (��� � ������)
        document.querySelector('table').append(caption); // ������� ������������ � �������� � ����� �����
    });

    return func.getDiv();
}

// 7. �������� ������� �������� ������
function rowDeleter() {
    let func = new defaultFunction(
        'Delete row',
        'Delete'
    );

    func.addOnButtonListener(() => {
        let tableRows = document.querySelectorAll('tr'); // ������� ��� �������� � ����� ��
        if (func.getInputValue() < 1 || func.getInputValue() > tableRows.length
            || func.getInputValue().match(/([^0-9])/g)) { // ���� �������� � ����<1 ��� ������ ���������� ����� � ������� ��� �������� �� �� ���� 0-9
            alert('Wrong number! Try again.');
        } else {
            tableRows[func.getInputValue() - 1].remove(); // ������� ������ �� ������� ��� ��������� ������� -1 (������, ��� � ���� ������ �� 0)
        }
    });
    return func.getDiv();
}

// 8. �������� ������� ���������� �����
function divRandomContentCreator() {
    let func = new defaultFunction(
        'Random choice',
        'Magic',
        false
    );

    func.addOnButtonListener(() => { // �� ������� �� ������ ��������� ������� magic � ����������-��������
        magic(chooseRandomTableDataCell());
    });
    return func.getDiv();
}

function magic(td) {
    if (randomInteger(1, 15) == 7) { // ���� ��������� ����� ����� 7 �� ��� ������, ��������� � ������� chooseRandomTableDataCell ������� �����
        td.append(createTableCellContent(td));
    } else { // �����
        chooseRandomBgColor(td); // ������� ������� � ���������� ����� ����
        chooseRandomFontStyle(td); // ������� ������� � ����������
    }
}

function chooseRandomTableDataCell() {
    let tableCellList = document.querySelectorAll('td'); // �����  � ������ ��� �������� � ����� �� (������)
    let randomCellIndex = randomInteger(0, tableCellList.length - 1); // ������� ��������� ������ ������ �� 0 �� ���������� ����� � �������-1
    return tableCellList[randomCellIndex];
}

function setRandomColor() {
    let hexTable = "0123456789ABCDEF"; // ������ (������) ��������
    let newColor = '#';
    for (let i = 0; i < 6; i++) { // 6 ��� ������ ��� � ����� 6 ��������
        newColor += hexTable[randomInteger(0, hexTable.length - 1)]; // ����������� ��������� �������� �� �������
    }
    return newColor;
}

function chooseRandomBgColor(td) {
    td.style.backgroundColor = setRandomColor(); // ������� ������� � ��������� ������� �����
}

function chooseRandomFontStyle(td) {
    td.style.color = setRandomColor(); // ��������� ����� ����
    td.style.fontSize =  randomInteger(15, 25) + 'pt'; // ��������� ������ ������ 15-25pt
   
    if (typeof td.childNodes[0] !== 'undefined') { // ���� � ������ ������� ������� (�����) !=0
        td.childNodes[0].childNodes.forEach((elem) => { // ��� ������� ����������� ���� �����
            elem.style.color = setRandomColor(); // ��������� ���� ��������
            elem.style.fontSize = randomInteger(15, 25) + 'pt'; // ��������� ������ ������ �������� 15-25pt
        });
    }
}

function randomInteger(min, max) { // ��������� ����� �� min �� (max+1), ������ ��� ���������� �� ��������
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand); // ���������� ����
}

// 9. �������� ������� ���������
function tableDeleter() {
    let func = new defaultFunction(
        'Delete',
        'Delete table',
        false
    );

    func.addOnButtonListener(() => { // ��� ������� ������
        form.style.display = 'block'; // ����������� �������
        document.querySelector('table').remove(); // ������� ��� �������
        document.querySelector('div.function_panel').remove(); // ������� ������
    });
    return func.getDiv();
}