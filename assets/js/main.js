let menuIcon = document.querySelector("#menu-icon");
let navbar = document.querySelector(".navbar");
let sections = document.querySelectorAll("section");
let navLinks = document.querySelectorAll("header nav a");

window.addEventListener('scroll', () => {
    let top = window.scrollY;

    sections.forEach((sec) => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute("id");

        if (top >= offset && top < offset + height) {
            let navLinks = document.querySelectorAll(".navbar a");
            
            navLinks.forEach((link) => {
                link.classList.remove("active");
            });

            let activeLink = document.querySelector(`.navbar a[href*="#${id}"]`);
            if (activeLink) {
                activeLink.classList.add("active");
            }
        }
    });
});

menuIcon.onclick = () => {
  menuIcon.classList.toggle("bx-x");
  navbar.classList.toggle("active");
};

// Validate Form
function validateForm() {
  var fullName = document.getElementById("fullName");
  var email = document.getElementById("email");
  var phoneNumber = document.getElementById("phoneNumber");
  var subject = document.getElementById("subject");
  var message = document.getElementById("message");
  var isValid = true;

  if (fullName.value.trim() === "") {
    document.getElementById("fullNameError").innerText =
      "Please enter your full name.";
    fullName.classList.add("input-error");
    isValid = false;
  } else {
    document.getElementById("fullNameError").innerText = "";
    fullName.classList.remove("input-error");
    fullName.classList.add("input-success");
  }

  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value)) {
    document.getElementById("emailError").innerText =
      "Please enter a valid email address.";
    email.classList.add("input-error");
    isValid = false;
  } else {
    document.getElementById("emailError").innerText = "";
    email.classList.remove("input-error");
    email.classList.add("input-success");
  }

  if (phoneNumber.value.trim() === "") {
    document.getElementById("phoneNumberError").innerText =
      "Please enter your phone number.";
    phoneNumber.classList.add("input-error");
    isValid = false;
  } else {
    document.getElementById("phoneNumberError").innerText = "";
    phoneNumber.classList.remove("input-error");
    phoneNumber.classList.add("input-success");
  }

  if (subject.value.trim() === "") {
    document.getElementById("subjectError").innerText =
      "Please enter the subject.";
    subject.classList.add("input-error");
    isValid = false;
  } else {
    document.getElementById("subjectError").innerText = "";
    subject.classList.remove("input-error");
    subject.classList.add("input-success");
  }

  if (isValid) {
    document.getElementById("contactForm").submit();

    // Contact: Send to mail
    var emailBody =
      "Full Name: " +
      fullName.value +
      "\nEmail: " +
      email.value +
      "\nPhone Number: " +
      phoneNumber.value +
      "\nSubject: " +
      subject.value +
      "\n\nMessage: " +
      message.value;

    var emailLink =
      "mailto:pvkhanh2609@gmail.com?subject=" +
      encodeURIComponent(subject.value) +
      "&body=" +
      encodeURIComponent(emailBody);
    window.location.href = emailLink;

    alert("Direct to mail!");
    fullName.value = "";
    email.value = "";
    phoneNumber.value = "";
    subject.value = "";
    message.value = "";
  }
}
