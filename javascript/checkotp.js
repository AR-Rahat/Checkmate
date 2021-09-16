var btn = document.getElementById("button12");
btn.onclick = function(){
  // document.getElementById("OTP").innerHTML=localStorage.getItem("digitvalue");
  var otp=localStorage.getItem("digitvalue");
  var digit=document.getElementById("OTP").value;
  if(otp==digit)
  {
      window.alert("Successful");
      // swal("Successful!","You have entered the right OTP","success");
  }
  else if(otp!=digit)
  {
      window.alert("Error");
      // swal("Error!","You have entered the wrong OTP","error");
  }
}