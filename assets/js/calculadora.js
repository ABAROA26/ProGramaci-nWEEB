var operation = "";
var value = "";
var pantalla = "0";
var newNumber = true;

function setNumber(number) {
  console.log(number);

  if (newNumber && pantalla !== "0.") {
    pantalla = number.toString();
    newNumber = false;
  } else {
    pantalla += number.toString();
  }

  document.getElementById("result").innerHTML = pantalla;
}

function setOperation(type) {
  if (type === "equals") {
    if (operation !== "") {
      executeOperation();
      operation = "";
      value = "";
      newNumber = true;
    }
  } else {
    if (operation !== "" && !number) {
      executeOperation();
    } else {
      value = parseFloat(pantalla);
    }

    operation = type;
    newNumber = true;
  }

  console.log(type);
}

function executeOperation() {
  let currentValue = parseFloat(pantalla);
  let result;

  if (operation === "plus") {
    result = value + currentValue;
  } else if (operation === "rest") {
    result = value - currentValue;
  } else if (operation === "por") {
    result = value * currentValue;
  } else if (operation === "entre") {
    if (currentValue === 0) {
      result = "Error";
    } else {
      result = value / currentValue;
    }
  }

  if (typeof result === "number") {
    result = Math.round(result * 100000000) / 100000000;
  }

  pantalla = result.toString();
  value = result;
  document.getElementById("result").innerHTML = pantalla;
}

function clearAll() {
  operation = "";
  value = "";
  pantalla = "0";
  newNumber = true;
  document.getElementById("result").innerHTML = "0";
}

function clearEntry() {
  pantalla = "0";
  newNumber = true;
  document.getElementById("result").innerHTML = "0";
}

function dot() {
  if (!pantalla.includes(".")) {
    if (newNumber) {
      pantalla = "0.";
      newNumber = false;
    } else {
      pantalla += ".";
    }
    document.getElementById("result").innerHTML = pantalla;
  }
}
