     // Global variables
     let captcha;

     // Generate initial captcha
     function generateCaptcha() {
         const randomNumbers = Array.from({ length: 6 }, () => Math.ceil(Math.random() * 9));
         const charUpper = String.fromCharCode(65 + Math.ceil(Math.random() * 25));
         const charLower = String.fromCharCode(97 + Math.ceil(Math.random() * 25));
         
         captcha = `${randomNumbers[0]}<sub>${charUpper}</sub>${randomNumbers[1]}${randomNumbers[2]}<sub>${charLower}</sub><sup>${randomNumbers[3]}</sup>${randomNumbers[4]}<sup>${randomNumbers[5]}</sup>`;
         document.getElementById("captcha").innerHTML = `<center>${captcha}</center>`;
     }

     // Validate form inputs
     function validateForm() {
         const name = document.getElementById("t1").value.trim();
         if (!name) {
             alert("Please provide your name!");
             document.getElementById("t1").focus();
             return false;
         }

         const genderChecked = Array.from(document.getElementsByName("gender")).some(radio => radio.checked);
         if (!genderChecked) {
             alert("Select any option for Gender!");
             return false;
         }

         const emailID = document.getElementById("t2").value.trim();
         const atPos = emailID.indexOf("@");
         const dotPos = emailID.lastIndexOf(".");
         if (!emailID || atPos < 6 || (dotPos - atPos < 4)) {
             alert("Please enter a correct email ID");
             document.getElementById("t2").focus();
             return false;
         }

         const password1 = document.getElementById("p1").value;
         const password2 = document.getElementById("p2").value;
         if (password1.length < 6 || password2.length < 6) {
             alert("Enter at least 6 characters in the Password fields");
             document.getElementById("p1").focus();
             document.getElementById("p2").focus();
             return false;
         }

         if (password1 !== password2) {
             alert("The passwords entered do not match!");
             document.getElementById("p1").focus();
             document.getElementById("p2").focus();
             return false;
         }

         const dateOfBirth = new Date(document.getElementById("bod").value);
         const minDate = new Date();
         minDate.setFullYear(minDate.getFullYear() - 18);
         if (!document.getElementById("bod").value || dateOfBirth > minDate) {
             alert("You need to be at least 18 years old to fill the form");
             return false;
         }

         if (document.getElementById("sel").value === "") {
             alert("Please provide your country!");
             return false;
         }

         const zipCode = document.getElementById("t3").value.trim();
         if (!zipCode) {
             alert("Please provide a zip code.");
             document.getElementById("t3").focus();
             return false;
         }

         const phone = document.getElementById("t4").value.trim();
         if (!phone || phone.length < 10) {
             alert("Please provide a valid phone number");
             document.getElementById("t4").focus();
             return false;
         }

         const captchaInput = document.getElementById("cap").value.trim();
         if (captchaInput !== captcha) {
             document.getElementById("msg").style.display = "block";
             return false;
         }

         return true;
     }

     // Check if user exists
     function checkUserExists(email) {
         // Simulating a user existence check (replace with actual API call)
         const existingUsers = ["test@example.com"]; // Example existing users
         return existingUsers.includes(email);
     }

     // Handle form submission
     function handleSubmit(event) {
         event.preventDefault(); // Prevent default form submission

         if (!validateForm()) return;

         const emailID = document.getElementById("t2").value.trim();
         if (checkUserExists(emailID)) {
             alert("User already exists. Please login.");
             window.location.href = "login.html"; // Redirect to login page
             return;
         }

         // Here you would normally send the data to the server
         // For demonstration, we're assuming successful registration
         alert("Registration successful! Redirecting to login page...");
         window.location.href = "login.html"; // Redirect after registration
     }

     // Reset error message
     function resetMessage() {
         document.getElementById("msg").style.display = "none";
     }

     // Preview selected image
     function readURL(input) {
         if (input.files && input.files[0]) {
             const reader = new FileReader();
             reader.onload = function (e) {
                 document.getElementById('userimage').src = e.target.result;
             };
             reader.readAsDataURL(input.files[0]);
         }
     }

     // Initialize captcha on load
     window.onload = function() {
         generateCaptcha();
         document.getElementById("signupForm").onsubmit = handleSubmit; // Assuming your form has id="signupForm"
     };