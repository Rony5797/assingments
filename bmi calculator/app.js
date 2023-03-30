var btn = document.getElementById("calculateBtn");

btn.addEventListener("click", calculateBmi);

function calculateBmi() {
  var weightInput = parseFloat(document.getElementById("weightInput").value);
  var heightInput = parseFloat(document.getElementById("heightInput").value);
  var signal = document.getElementById("signal");
  var result = document.getElementById("output");
  var weight_status = false,
    height_status = false;

  if (weightInput === "" || isNaN(weightInput) || weightInput <= 0) {
    document.getElementById("weight_error").innerHTML =
      "Please enter a valid weight";
  } else {
    document.getElementById("weight_error").innerHTML = "";
    weight_status = true;
  }
  if (heightInput === "" || isNaN(heightInput) || heightInput <= 0) {
    document.getElementById("height_error").innerHTML =
      "Please enter a valid height";
  } else {
    document.getElementById("height_error").innerHTML = "";
    height_status = true;
  }

  if (weight_status && height_status) {

   var bmi = (weightInput / (heightInput*heightInput)).toFixed(2);

    if (bmi < 18.6) {
      result.innerHTML = "Under weight : " + bmi;
      signal.style.display = "block";
      signal.style.backgroundColor = "green";
    } else if (bmi >= 18.6 && bmi < 24.9) {
      result.innerHTML = "Normal weight : " + bmi;
      signal.style.display = "block";
      signal.style.backgroundColor = "yellow";
    } else {
      result.innerHTML = "Over weight : " + bmi;
      signal.style.display = "block";
      signal.style.backgroundColor = "red";
    }
  } else {
    alert("Please submit all input in number format");
  }
}
