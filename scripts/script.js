let fontSizes = [];
let fontSpacings = [];
let modules = [];
const mainCanvas = document.querySelector("#main")
const modContainer = document.querySelector('#modcontainer');
const labelContainer = document.querySelector("#textLabels");
let elements = document.querySelectorAll('.visi-element');
let images = document.querySelectorAll("img");
let texts = document.querySelectorAll('h1');
const nameForm = document.querySelector('form#form-name');
const nameButton = document.querySelector("#name-button");
const nameField = document.querySelector("#name-field");
const nameElement = document.querySelector("h1#name");
const nameSizeElement = document.querySelector("li#name_field");
const otherForm = document.querySelector('form#form-other');
const otherField = document.querySelector("#other-field");
const otherElement = document.querySelector("h1#other");
const dateForm = document.querySelector('form#form-date')
const dateStartInput = document.querySelector("#date-start-input");
const dateStartElement = document.querySelector("#date-start");
const timeForm = document.querySelector('form#form-time')
const timeStartInput = document.querySelector("#time-start-input");
const timeEndInput = document.querySelector("#time-end-input");
const timeStartElement = document.querySelector("#time-start");
const timeEndElement = document.querySelector("#time-end");
const eventForm = document.querySelector('form#form-event');
const eventSelect = document.querySelector('select#event');
const formatSelect = document.querySelector('select#format');
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
const sizeForm = document.querySelector('#form#form-event-size')
const sizeInput = document.querySelector('#size-range.slider');
const sizeNumber = document.querySelector('#size-event');
const sizeForm2 = document.querySelector('#form#form-name-size')
const sizeInput2 = document.querySelector('#size-range2.slider');
const sizeNumber2 = document.querySelector('span#size-name');
const sizeInput3 = document.querySelector('#size-range3.slider');
const sizeNumber3 = document.querySelector('span#size-other');
const sizeForm3 = document.querySelector('#form#form-other-size')
const extraElement = document.querySelector('li#other_field')
const zoomIn = document.querySelector('#zoom .zoom-in');
const zoomOut = document.querySelector('#zoom .zoom-out');
let formatForm = document.querySelector('form#form-formats');
const widthInput = document.querySelector('input#width');
const heightInput = document.querySelector('input#height');
const randomiseLabelsButton = document.querySelector('button#randomiseLabels');
const randomisePatternButton = document.querySelector('button#randomisePattern');
let quantity = document.querySelector("#quantity-range").value;
let labelQuantity = 220;
const eventElement = document.querySelector("#peek figure h1");
let department = departmentSelect.value;
let eventVal = eventSelect.value;
let pattern = patternSelect.value;
let format = formatSelect.value;
const dep_ba = document.querySelector('#info1');
const dep_ma = document.querySelector('#info2');
const dep_bama = document.querySelector('#info');
const event_type = document.querySelector('#peek');
const ba_color = "#1434F7";
const ma_color = "#913BE4";
const bama_color = "#3f3e3d";
const colors = [ba_color, "#F0DEBB", "#FFFFFF", "#3f3e3d"];
const height = "1500px";
const width = "1500px";
const height_2 = "2000px";
const width_2 = "1125px";
const main= document.querySelector("#main");
let zoom = 1;

// getting font sizes
texts.forEach(text => {
  const size = window.getComputedStyle(text, null).getPropertyValue('font-size');
  const fontSize = parseFloat(size);
  fontSizes.push(fontSize);

  const spacing = window.getComputedStyle(text, null).getPropertyValue('letter-spacing');
  const fontSpacing = parseFloat(spacing);
  fontSpacings.push(fontSpacing);
});

function createFiller(quantity) {
  for (let i = 0; i < quantity; i++) {
    console.log(quantity)
    const div = document.createElement("li");
    div.className = "fillerCell";
    document.querySelector("#textLabels").append(div);
  }
  randomiser(quantity*0.85, elements, labelContainer);
}

randomiser(quantity, elements, labelContainer);

// creating modules
function moduleCreator() {
  console.log(quantity)
  if (departmentSelect.value === "ma") {
    colors[0] = ma_color;
    dep_ba.style.display = "none";
    dep_bama.style.display = "none";
    dep_ma.style.display = "grid";

  } else if (departmentSelect.value === "bama") {
    colors[0] = bama_color;
    dep_ba.style.display = "none";
    dep_ma.style.display = "none";
    dep_bama.style.display = "grid";

  } else if (departmentSelect.value === "ba") {
    colors[0] = ba_color;
    dep_bama.style.display = "none";
    dep_ma.style.display = "none";
    dep_ba.style.display = "grid";
  }

  if (eventSelect.value === "Other") {
    event_type.style.display = "none";
  } else {
    event_type.style.display = "grid";
  }

  elements.forEach(el => {
    el.style.color = colors[typeColorSelect.value - 1];
    el.style.backgroundColor = colors[labelColorSelect.value - 1];
  });
  pattern = patternSelect.value;
  eventElement.innerHTML = eventSelect.value;
  for (let i = 0; i < quantity; i++) {
    let mod = document.createElement('li');
    mod.className = 'module';
    mod.innerHTML = `<figure style="background-color: ${colors[1]};"><img src='./assets/openday_pattern_0${pattern}-${departmentSelect.value}.png'></figure>`;
    modContainer.appendChild(mod);
    modules.push(mod);
  }
  createFiller(labelQuantity)
}

// randomise modules
function randomiser(quantity, arr, container) {
  console.log(quantity)
  for (let e = 0; e < arr.length; e++) {
    container.insertBefore(arr[e], container.childNodes[Math.floor(Math.random() * quantity)]);
  }
}

// add field
function addField(field, element) {
  element.innerHTML = field.value;
}

// change size
function changeSize(widthValue, heightValue) {
  //console.log(formatSelect.value, widthValue, heightValue)
  zoom = 1;
  mainCanvas.style.transform = "scale(1)";
  removeElementsByClass('module');
  removeElementsByClass('fillerCell');

  widthRatio = widthValue / heightValue
  mainCanvas.style.height = `${heightValue}px`
  mainCanvas.style.width = `${widthValue}px`
  modContainer.style.height = `${heightValue}px`
  modContainer.style.width = `${widthValue}px`
  labelContainer.style.height = `${heightValue}px`
  labelContainer.style.width = `${widthValue}px`

  setTimeout(function() {
    const canvasWidth = document.querySelector("main").clientWidth;
    const tileSize = canvasWidth * 0.025;
    //console.log(canvasWidth, tileSize);

    modContainer.style.gridTemplateColumns = `repeat(auto-fit, ${tileSize}px)`;
    modContainer.style.gridTemplateRows = `repeat(auto-fit, ${tileSize}px)`;

    // texts.forEach((text, i) => {
    //   //console.log(fontSizes[i], text, widthRatio);
    //   text.style.fontSize = `${fontSizes[i] * widthRatio}px`
    //   text.style.letterSpacing = `${fontSpacings[i] * widthRatio}px`
    // });

    moduleCreator();
  }, 500);
}

function changeBoxSize(element, size) {
  element.style.gridColumn = `span ${size}`
  console.log(element)
}

// remove element
function removeElementsByClass(className) {
  let elements = document.getElementsByClassName(className);
  while (elements.length > 0) {
    elements[0].parentNode.removeChild(elements[0]);
  }
}

// event listeners
nameForm.addEventListener('change', () => {
  //console.log("name submitted");
  addField(nameField, nameElement);
  document.querySelector("#name_field").style.display = "grid";
})

otherForm.addEventListener('change', () => {
  //console.log("name submitted");
  addField(otherField, otherElement);
  document.querySelector("#other_field").style.display = "grid";
})

timeForm.addEventListener('change', () => {
  addField(timeStartInput, timeStartElement);
  addField(timeEndInput, timeEndElement);
  //console.log("timesubmit")
})
dateForm.addEventListener('change', () => {
  addField(dateStartInput, dateStartElement);
  //console.log("timesubmit")
})

eventSelect.addEventListener('change', () => {
  //console.log('submitted', eventSelect.value);
  removeElementsByClass('module');
  eventVal = eventSelect.value
  moduleCreator();
})

formatSelect.addEventListener('change', () => {
  if (formatSelect.value == "post") {
    changeSize(1500, 1500)
    labelQuantity = 220
  } else if (formatSelect.value == "story") {
    changeSize(1125, 2000)
    labelQuantity = 245
  }
})

sizeInput.addEventListener('change', () => {
  sizeNumber.innerHTML = sizeInput.value
  let size = sizeInput.value
  changeBoxSize(event_type, size)
})

sizeInput2.addEventListener('change', () => {
  sizeNumber2.innerHTML = sizeInput2.value
  let size = sizeInput2.value
  changeBoxSize(nameSizeElement, size)
})

sizeInput3.addEventListener('change', () => {
  console.log('change')
  sizeNumber3.innerHTML = sizeInput3.value
  let size = sizeInput3.value
  changeBoxSize(extraElement, size)
})

// sizeInput.addEventListener('change', () => {
//   sizeNumber.innerHTML = sizeInput.value;
//   document.querySelector("#peek").style.gridColumn = "span sizeInput.value";
//   removeElementsByClass('module');
//   moduleCreator(quantInput.value, eventSelect.value);
// })
// sizeInput2.addEventListener('change', () => {
//   document.querySelector("#name_field").style.gridColumn = "span sizeInput2.value";
//   removeElementsByClass('module');
//   moduleCreator(quantInput.value, eventSelect.value);
// })

quantInput.addEventListener('change', () => {
  quantNumber.innerHTML = quantInput.value;
  removeElementsByClass('module');
  removeElementsByClass('fillerCell');
  quantity = quantInput.value
  moduleCreator();
})

randomiseLabelsButton.addEventListener('click', () => {
  randomiser(quantity*0.85, elements, labelContainer);
})

randomisePatternButton.addEventListener('click', () => {
  randomiser(quantity, modules, modContainer);
})

departmentForm.addEventListener('change', () => {
  removeElementsByClass('module');
  moduleCreator();
})

typeColorSelect.addEventListener('change', () => {
  removeElementsByClass('module');
  moduleCreator();
})

labelColorSelect.addEventListener('change', () => {
  removeElementsByClass('module');
  moduleCreator();
})

patternForm.addEventListener('change', () => {
  removeElementsByClass('module');
  moduleCreator();
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
  if (document.readyState === "complete") {
    moduleCreator();
  }
});

// save screenshot
function makeScreenshot() {
  html2canvas(document.getElementById("screenshot"), {
      scale: 1
    })
    .then(canvas => {
      canvas.id = "canvasID";
      let main = document.getElementById("main");
      while (main.firstChild) {
        main.removeChild(main.firstChild);
      }
      main.appendChild(canvas);
    });
}

document.getElementById("a-make").addEventListener('click', function() {
  document.querySelector("#main").style.transform = "scale(1)";
  document.getElementById("a-make").style.display = "none";
  setTimeout(function() {
    makeScreenshot();
  }, 500);
  document.getElementById("a-download").style.display = "inline";
}, false);

document.getElementById("a-download").addEventListener('click', function() {
  this.querySelector("a").href = document.getElementById("canvasID").toDataURL();
  // this.href =
  //console.log(document.getElementById("canvasID").toDataURL())
  this.querySelector("a").download = "kabk_graphic-design_render.png";
}, false);
