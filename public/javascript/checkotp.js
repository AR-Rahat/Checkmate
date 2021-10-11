const auth = require("../controllers/auth");

console.log(auth.name);
var btn = document.getElementById("button12");
btn.onclick = function () {
  // document.getElementById("OTP").innerHTML=localStorage.getItem("digitvalue");
  //var otp = localStorage.getItem("digitvalue");
  var digit = document.getElementById("OTP").value;
  if (auth.name == digit) {
    window.alert("Successful");
    // swal("Successful!","You have entered the right OTP","success");
  } else if (auth.name != digit) {
    window.alert("Error");
    // swal("Error!","You have entered the wrong OTP","error");
  }
};
