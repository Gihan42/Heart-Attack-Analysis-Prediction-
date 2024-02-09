var output;
function uploadClick() {
  var age = document.getElementById("inputAge").value;
  var gender = document.getElementById("inputSex").value;
  var exang = document.getElementById("inputExang").value;
  var ca = document.getElementById("inputCa").value;
  var cp = document.getElementById("inputCp").value;
  var trtbps = document.getElementById("inputTrtbps").value;
  var chol = document.getElementById("inputChol").value;
  var inputFbs = document.getElementById("inputFbs").value;
  var fbs = inputFbs > 120 ? 1 : 0;
  var rest_ecg = document.getElementById("inputRest_ecg").value;
  var thalach = document.getElementById("inputThalach").value;
  var oldPeak = (Math.random() * 0.5).toFixed(1);
  var slp = Math.round(Math.random());
  var thall = Math.floor(Math.random() * 4);


      



  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({
    age: parseInt(age),
    sex: parseInt(gender),
    cp: parseInt(cp),
    trtbps: parseInt(trtbps),
    chol: parseInt(chol),
    fbs: parseInt(fbs),
    restecg: parseInt(rest_ecg),
    thalachh: parseInt(thalach),
    exng: parseInt(exang),
    oldpeak: parseFloat(oldPeak), 
    slp: parseInt(slp),
    caa: parseInt(ca),
    thall: parseInt(thall),
  
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

fetch("http://127.0.0.1:8000/uploadData", requestOptions)
  .then((response) => response.json()) // Use response.json() to parse JSON directly
  .then((result) => {
    console.log("Received result:", result);

    var output;

    try {
      // Assuming result is a JSON object with an "objects" array
      var resultArray = result.objects;

      if (resultArray && resultArray.length > 0) {
        if (resultArray[0] === 1.0) {
          output = "there is a possibility for heart attack";
        } else if (resultArray[0] === 0.0) {
          output = "there is no chance for heart attack";
        } else {
          // Handle other cases if needed
          output = "unknown result";
        }

        console.log(output);
      } else {
        console.log("Invalid result format");
      }
    } catch (parseError) {
      console.log("Error parsing result:", parseError);
      console.log("Invalid result format");
    }

    // Your Swal.fire code here
    Swal.fire({
      title: "<strong>Your <u>Result</u></strong>",
      iconHtml: '<svg xmlns="http://www.w3.org/2000/svg" width="38" height="40" fill="currentColor" class="bi bi-lungs hart-Icon" viewBox="0 0 16 16"> <path d="M8.5 1.5a.5.5 0 1 0-1 0v5.243L7 7.1V4.72C7 3.77 6.23 3 5.28 3c-.524 0-1.023.27-1.443.592-.431.332-.847.773-1.216 1.229-.736.908-1.347 1.946-1.58 2.48-.176.405-.393 1.16-.556 2.011-.165.857-.283 1.857-.241 2.759.04.867.233 1.79.838 2.33.67.6 1.622.556 2.741-.004l1.795-.897A2.5 2.5 0 0 0 7 11.264V10.5a.5.5 0 0 0-1 0v.764a1.5 1.5 0 0 1-.83 1.342l-1.794.897c-.978.489-1.415.343-1.628.152-.28-.25-.467-.801-.505-1.63-.037-.795.068-1.71.224-2.525.157-.82.357-1.491.491-1.8.19-.438.75-1.4 1.44-2.25.342-.422.703-.799 1.049-1.065.358-.276.639-.385.833-.385a.72.72 0 0 1 .72.72v3.094l-1.79 1.28a.5.5 0 0 0 .58.813L8 7.614l3.21 2.293a.5.5 0 1 0 .58-.814L10 7.814V4.72a.72.72 0 0 1 .72-.72c.194 0 .475.11.833.385.346.266.706.643 1.05 1.066.688.85 1.248 1.811 1.439 2.249.134.309.334.98.491 1.8.156.814.26 1.73.224 2.525-.038.829-.224 1.38-.505 1.63-.213.19-.65.337-1.628-.152l-1.795-.897A1.5 1.5 0 0 1 10 11.264V10.5a.5.5 0 0 0-1 0v.764a2.5 2.5 0 0 0 1.382 2.236l1.795.897c1.12.56 2.07.603 2.741.004.605-.54.798-1.463.838-2.33.042-.902-.076-1.902-.24-2.759-.164-.852-.38-1.606-.558-2.012-.232-.533-.843-1.571-1.579-2.479-.37-.456-.785-.897-1.216-1.229C11.743 3.27 11.244 3 10.72 3 9.77 3 9 3.77 9 4.72V7.1l-.5-.357z" /> </svg>',
      html: `<h1>${output}</h1>`,
      showCloseButton: true,
      focusConfirm: false,
      confirmButtonText: `<i class="fa fa-thumbs-up"></i> Great!`,
      confirmButtonAriaLabel: "Thumbs up, great!",
      cancelButtonAriaLabel: "Thumbs down",
    });
  })
  .catch((error) => console.log("error", error));

}
