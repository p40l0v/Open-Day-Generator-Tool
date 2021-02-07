let fontSizes = [];
let modules = [];
const modContainer = document.querySelector('#modcontainer');
const labelContainer = document.querySelector("#textLabels");
let elements = document.querySelectorAll('.visi-element');
let images = document.querySelectorAll("img");
let texts = document.querySelectorAll('h1');
const nameForm = document.querySelector('form#form-name');
const nameButton = document.querySelector("#name-button");
const nameField = document.querySelector("#name-field");
const nameElement = document.querySelector("h1#name");
const timeForm = document.querySelector('form#form-time')
const timeStartInput = document.querySelector("#time-start-input");
const timeEndInput = document.querySelector("#time-end-input");
const timeStartElement = document.querySelector("#time-start");
const timeEndElement = document.querySelector("#time-end");
const eventForm = document.querySelector('form#form-event');
const eventSelect = document.querySelector('select#event');
const departmentForm = document.querySelector('form#form-department');
const departmentSelect = document.querySelector('select#department');
const colorForm = document.querySelector('form#form-typo-label-color');
const typeColorSelect = document.querySelector('select#typo-color');
const labelColorSelect = document.querySelector('select#label-color');
const patternForm = document.querySelector('form#form-pattern');
const patternSelect = document.querySelector('select#pattern');
const quantForm = document.querySelector('form#form-quantity-slider');
const quantInput = document.querySelector('#quantity-range.slider');
const quantNumber = document.querySelector('#quantity-number');
const zoomIn = document.querySelector('#zoom .zoom-in');
const zoomOut = document.querySelector('#zoom .zoom-out');
/* const sizeForm = document.querySelector('form#size-slider')
const sizeInput = document.querySelector('#size-range.slider')
const sizeNumber = document.querySelector('#size-number') */
const formatForm = document.querySelector('form#form-formats');
const widthInput = document.querySelector('input#width');
const heightInput = document.querySelector('input#height');
const randomiseLabelsButton = document.querySelector('button#randomiseLabels');
const randomisePatternButton = document.querySelector('button#randomisePattern');
let quantity = document.querySelector("#quantity-range").value;
const eventElement = document.querySelector("#peek figure h1");
let department = departmentSelect.value;
let event = eventSelect.value;
let pattern = patternSelect.value;
const ba_color = "#1434F7";
const ma_color = "#913BE4";
const colors = [ba_color, "#F0DEBB", "#FFFFFF", "#000000"];
let zoom = 1;

// getting font sizes
texts.forEach(text => {
    const style = window.getComputedStyle(text, null).getPropertyValue('font-size');
    const fontSize = parseFloat(style);
    fontSizes.push(fontSize);
});

for(let i = 0; i < 400; i++) {
    const div = document.createElement("li");
    div.className = "fillerCell";
    document.querySelector("#textLabels").append(div);
}
randomiser(400, elements, labelContainer);

// creating modules
function moduleCreator(quantity, event) {
    if(departmentSelect.value === "ma") {
        colors[0] = ma_color;
    } else if(departmentSelect.value === "bama") {
        // ??
    }
    elements.forEach(el => {
        el.style.color = colors[typeColorSelect.value - 1];
        el.style.backgroundColor = colors[labelColorSelect.value - 1];
    });
    pattern = patternSelect.value;
    eventElement.innerHTML = event;
    for(let i = 0; i < quantity; i++) {
        let mod = document.createElement('li');
        mod.className = 'module';
        mod.innerHTML = `<figure style="background-color: ${colors[1]};"><img src='./assets/openday_pattern_0${pattern}-${departmentSelect.value}.png'></figure>`;
        modContainer.appendChild(mod);
        modules.push(mod);
        // randomiser(quantity);
    }
}

// randomise modules
function randomiser(quantity, arr, container) {
    for(let e = 0; e < arr.length; e++) {
        container.insertBefore(arr[e], container.childNodes[Math.floor(Math.random() * quantity)]);
    }
}

// add field
function addField(field, element) {
    console.log(field.value);
    element.innerHTML = field.value;
}

// change size
function changeSize(widthValue, heightValue) {
    zoom = 1;
    document.querySelector("#main").style.transform = "scale(1)";
    removeElementsByClass('module');

    widthRatio = widthValue / heightValue;
    modContainer.style.height = `100vh`;
    modContainer.style.width = `${widthRatio * 100}vh`;

    setTimeout(function() {
        const canvasWidth = document.querySelector("main").clientWidth;
        const tileSize = canvasWidth* 0.025;
        console.log(canvasWidth, tileSize);

        modContainer.style.gridTemplateColumns = `repeat(auto-fit, ${tileSize}px)`;
        modContainer.style.gridTemplateRows = `repeat(auto-fit, ${tileSize}px)`;

        texts.forEach((text, i) => {
            console.log(fontSizes[i]);
            text.style.fontSize = `${fontSizes[i] / widthRatio}px`;
        });

        moduleCreator(quantInput.value, eventSelect.value);
    }, 500);
}

// remove element
function removeElementsByClass(className){
    let elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

// event listeners
nameForm.addEventListener('change', () => {
    console.log("name submitted");
    addField(nameField, nameElement);
    nameField.value= "";
})

timeForm.addEventListener('change', () => {
    addField(timeStartInput, timeStartElement);
    addField(timeEndInput, timeEndElement);
    console.log("timesubmit")
})

eventSelect.addEventListener('change', () => {
    console.log('submitted', eventSelect.value);
    removeElementsByClass('module');
    moduleCreator(quantInput.value, eventSelect.value);
})

quantInput.addEventListener('change', () => {
    quantNumber.innerHTML = quantInput.value;
    removeElementsByClass('module');
    moduleCreator(quantInput.value, eventSelect.value);
})

formatForm.addEventListener('change', () => {
    changeSize(widthInput.value, heightInput.value);
})

randomiseLabelsButton.addEventListener('click', () => {
    randomiser(200, elements, labelContainer);
})

randomisePatternButton.addEventListener('click', () => {
    randomiser(quantity, modules, modContainer);
})

departmentForm.addEventListener('change', () => {
    removeElementsByClass('module');
    moduleCreator(quantInput.value, eventSelect.value);
})

typeColorSelect.addEventListener('change', () => {
    removeElementsByClass('module');
    moduleCreator(quantInput.value, eventSelect.value);
})

labelColorSelect.addEventListener('change', () => {
    removeElementsByClass('module');
    moduleCreator(quantInput.value, eventSelect.value);
})

patternForm.addEventListener('change', () => {
    removeElementsByClass('module');
    moduleCreator(quantInput.value, eventSelect.value);
})

zoomIn.addEventListener('click', () => {
    zoom += 0.1;
    const translate = 100 - zoom * 100;
    document.querySelector("#main").style.transform = `scale(${zoom}) translate(0, ${-translate}%`;
})

zoomOut.addEventListener('click', () => {
    zoom -= 0.1;
    const translate = 100 - zoom * 100;
    document.querySelector("#main").style.transform = `scale(${zoom}) translate(0, ${-translate}%`;
})

/* sizeInput.addEventListener('change', () => {
    sizeValue = +sizeInput.value + +50
    sizeNumber.innerHTML = sizeInput.value

    //modContainer grid needs to be changed with minmax values instead of the bottom

    for(let m = 0; m < modules.length; m++) {
    modules[m].style.width = `${sizeValue}%`
    modules[m].style.height = `${sizeValue}%`
    }
    for(let e = 0; e < elements.length; e++) {
    elements[e].style.width = `${sizeValue}%`
    elements[e].style.height = `${sizeValue}%`
    }
})*/

document.addEventListener('readystatechange', () => {
    if(document.readyState === "complete") {
        moduleCreator(quantInput.value, eventSelect.value);
    }
});

// save screenshot
function makeScreenshot() {
    html2canvas(document.getElementById("screenshot"), {scale: 3})
        .then(canvas => {
            canvas.id = "canvasID";
            let main = document.getElementById("main");
            while(main.firstChild) {
                main.removeChild(main.firstChild);
            }
            main.appendChild(canvas);
        });
}

document.getElementById("a-make").addEventListener('click', function() {
    document.querySelector("#main").style.transform = "scale(1)";
    document.getElementById("a-make").style.display = "none";
    setTimeout(function(){
        makeScreenshot();
    }, 500);
    document.getElementById("a-download").style.display = "inline";
}, false);

document.getElementById("a-download").addEventListener('click', function() {
    this.querySelector("a").href = document.getElementById("canvasID").toDataURL();
    // this.href =
    console.log(document.getElementById("canvasID").toDataURL())
    this.querySelector("a").download = "kabk_graphic-design_render.png";
}, false);
