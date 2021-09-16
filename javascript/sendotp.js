var btn = document.getElementById("button1");
  btn.onclick = function(){
    var email = $('#email').val();
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    localStorage.setItem("digitvalue",OTP);
    var Body = 'Your OTP is : ' + OTP;

    Email.send({
    Host: "smtp.gmail.com",
    Username: "checkmate.sdp@gmail.com",
    Password: "beaking12",
    To: email,
    From: "checkmate.sdp@gmail.com",
    Subject: "Verification code for Checkmate profile.",
    Body: Body
  }).then(
     message => {
    //   //console.log (message);
    //   if (message == 'OK') {
    //     //alert('Your mail has been send. Thank you for connecting.');
        
    //   } else {
    //     console.error(message);
    //     //alert('There is error at sending message. ')
    //   }
    window.location.href="verifyemail.html";
    }
   
  );
  }