function onlyLetters(e) {
  const pressedKey = e.key;
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "Á",
    "É",
    "Í",
    "Ó",
    "Ú",
    "á",
    "é",
    "í",
    "ó",
    "ú",
    "Ñ",
    "ñ",
    " ",
    "´",
  ];

  if (!letters.includes(pressedKey)) {
    return false;
  }
}

function onlyNumbers(e) {
  const pressedKey = e.key;
  const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
  if (!numbers.includes(pressedKey)) {
    return false;
  }
}

function onlyEmail(email) {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

function validateSelect() {
  const selectElement = document.getElementById("mySelect");
  const errorMessage = document.getElementById("selectError");

  if (selectElement.value === "") {
    errorMessage.textContent = "Selecciona una seleccion valida.";
    return false;
  } else {
    errorMessage.textContent = "";
    alert("Seleccion Valida: " + selectElement.value);
    return true;
  }
}
