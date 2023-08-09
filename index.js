// Form validation 
const inputs = document.querySelectorAll(".input");
const errMsgs = document.querySelectorAll(".error");
// const nameInput = document.querySelector(".name");
// const emailInput = document.querySelector(".email");
// const phoneInput = document.querySelector(".phone")

// Error color
const errColor = "hsl(354, 84%, 57%)";
const defaultClr = "hsl(213, 96%, 18%)";

// Flag ID
let isNameValid = false;
let isEmailValid = false;
let isPhoneNoValid = false;
let isFormValid   = false;

// Shortened console.log()
const c = console.log.bind(console);

// clear all error msgs
const clearAllAlerts = () => {
  inputs.forEach(input => input.style.borderColor = "");
  errMsgs.forEach(err => err.style.display = "none")
}

// Display error message
const showErr = (input, fieldInput) =>{
  input.style.borderColor = errColor;
  errMsgs.forEach((err) => {
    let eachErr = err.dataset.id;
    if(eachErr === fieldInput){
      err.style.display = "inline"
    }
  });
  input.focus()
}

// Hide error message
const hideErr = (input, fieldInput) =>{
  input.style.borderColor = defaultClr;
  errMsgs.forEach((err) => {
    let eachErr = err.dataset.id;
    if(eachErr === fieldInput){
      err.style.display = "none"
    }
  });
}

const validEmail = (input) => {
  const userInput = input.value;
  const fieldInput = input.dataset.id;
  const emailFormat =
    /^(?:[a-z0-9.]){2,30}@{1}(?:[a-z0-9-]){2,30}\.{1}(?:[a-z0-9]){2,3}(?:\.(?:[a-z0-9]){2,3})?$/;
  const validUserEmail = emailFormat.test(userInput);
  if(!validUserEmail || userInput === ""){
    showErr(input, fieldInput);
  }else{
    isEmailValid = true;
    hideErr(input, fieldInput)
  }
}

// valid inputs
const validInputs = () => {
  inputs.forEach((input) => {
    const fieldInput = input.dataset.id;
    const userInput = input.value;
    
    switch(fieldInput){
      case "name":
        if(userInput === ""){
          showErr(input, fieldInput)
        }else{
          isNameValid = true;
          hideErr(input, fieldInput)
        }
      break;

      case "email":
        validEmail(input)
      break;

      case "phone":
      if(userInput === ""){
        showErr(input, fieldInput);
      }else{
        isPhoneNoValid = true;
        hideErr(input, fieldInput)
      }
    break;

    default:
    break;
    }
  })
}

// For target sections
const secContainer = document.querySelector(".wrapper");
const numTab = document.querySelectorAll(".num")
const articles = document.querySelectorAll(".content");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");

// Hide prev Btn
prevBtn.style.visibility = "hidden";

// initialize count 
let counter = 0;

//Position the sections to slide from left to right
 const slide = () => {articles.forEach((article, index) => article.style.left = `${index * 100}%`)
}
// Display pages according to the buttons clicked
const carousel = () => {
  if(counter < articles.length - 1){
    nextBtn.style.display = "block"
  }else{
    nextBtn.style.display = "none";
  }
  if(counter > 0){
    prevBtn.style.visibility = "visible"
  }else{
    prevBtn.style.visibility = "hidden"; 
  }

  articles.forEach((slide, id) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
    if(id === counter){
      slide.classList.add("active")
    }else{
      slide.classList.remove("active")
    }
  });
    numTab.forEach((num, id) => {
      if (id === counter) {
        num.classList.add("active");
      }else{
        num.classList.remove("active");
      }
    });
}

// Eventlisteners
nextBtn.addEventListener("click", (e) => {
  clearAllAlerts();
  validInputs();
  isFormValid = isEmailValid && isNameValid && isPhoneNoValid;
  if(!isFormValid){
    e.preventDefault()
  }else{
    slide();
    counter++;
    carousel();
    if(counter === 3){
      nextBtn.textContent = "Confirm"
      nextBtn.classList.add("active")
    }else if(counter === 4){
      prevBtn.style.visibility = "hidden"
    }else{
      nextBtn.textContent = "Next Step"
    }
    
  }

});

prevBtn.addEventListener("click", () => {
  slide();
  counter--;
  carousel();
  if(counter !== 3){
    nextBtn.textContent = "Next Step"
    nextBtn.classList.remove("active")
  }
});

// User Selections
const options = [...document.querySelectorAll(".bill-format")];
const addsOn = [...document.querySelectorAll(".each-addon")];

// Btns and their respective options
const toggleBtn = document.querySelector(".btn");
const switchBtn = document.querySelector(".white-circle")
const month = document.querySelector(".monthly");
const moPrices = [...document.querySelectorAll(".mnth-price")]
const year = document.querySelector(".yearly");
const yearSpan = document.querySelectorAll(".period");
const yrPrices = [...document.querySelectorAll(".yr-price")];
// c(prices)

// Set variable for the selected options 
let userChoice = [];


const switchOption = () => {
  toggleBtn.addEventListener("click", () => {
    switchBtn.classList.toggle("switch");

    if(!month.classList.contains("active")){
      month.classList.add("active");
      moPrices.forEach(price => price.style.display ="block")
    }else if(month.classList.contains("active")){
      year.classList.remove("active");
      moPrices.forEach(price => price.style.display = "none")
    }

    if(!year.classList.contains("active")){
      year.classList.add("active")
      month.classList.remove("active")
      yearSpan.forEach(span => span.style.display = "block");
      yrPrices.forEach((price) => {
        price.style.display = "block"
      })
    }else if(year.classList.contains("active")){
      year.classList.remove("active");
      yearSpan.forEach((span) => (span.style.display = "none"));
      yrPrices.forEach((price) => {
        price.style.display = "none"
      });
    }
  })
}


// Select one option at a time in step 2 
options.forEach((option) => {
  switchOption();
  option.addEventListener("click", (e) => {
    let selectedDiv = null;
    const clickedOption = e.target;

   //   // if the option is already selected, deselect it
   // if (selectedDiv === clickedOption) {
   //   selectedDiv = null;
   //   selectedDiv.classList.remove("selected");
   // } else if (selectedDiv) {
   //   selectedDiv.classList.remove("selected");
   // }
    const target = e.target.dataset.id;
    c(target);
    selectedDiv = clickedOption;
    if (!selectedDiv.classList.contains("selected")) {
      clickedOption.classList.add("selected");
      // userChoice[target] = option;
      userChoice.unshift(target)
    } else if (
      selectedDiv.classList.contains("selected") &&
      selectedDiv === clickedOption
    ) {
      selectedDiv = null;
      clickedOption.classList.remove("selected");
      // delete userChoice[target];
      userChoice.shift(target)
    } else if (selectedDiv) {
      selectedDiv.classList.remove("selected");
    }
    c(userChoice);
})
});


addsOn.forEach((addon) => {
  addon.addEventListener("click",(e) => {
    let target = e.target.dataset.value; 
    let checkbox = addon.querySelector("input[type ='checkbox']");
    checkbox.checked = !checkbox.checked;
    if(checkbox.checked){
      addon.classList.add("active")
      // userChoice[target] = addon;
      userChoice.push(target)
      // addon.style.borderColor = "hsl(243, 100%, 62%)";
    }else{
      addon.classList.remove("active");
      // delete userChoice[target];
      userChoice.pop(target)
      // addon.style.borderColor = "initial"
    }
    c(userChoice);
  })
})

// 4th step: Display choosen options
const summary = document.querySelector(".summ-sec");
summary.innerHTML = userChoice.map((item) => {
    c(item)

  });
// function displayMenuItems(menuItems) {
//   let {title, tiPrice, addTtle, adPrice} = menuItems;
//   let displayMenu = menuItems.map(function (item) {
//     // console.log(item)
//     return `<div class="select">
//           <div class="options">
//             <h4 class="choice">${title} ${title.span}</h4>
//             <div class="flex top">
//               <button class="change-btn">Change</button>
//               <p class="select-price">${tiPrice}</p>
//             </div>
//             <div class="line"></div>
//             <div class="flex">
//               <p>${addTtle}</p>
//               <p class="price">+${adPrice}</p>
//             </div>
//             <div class="flex">
//               <p>${addTtle}</p>
//               <p class="price">+${adPrice}</p>
//             </div>
//           </div>
//           <div class="flex total">
//             <p>Total (per ${title.span})</p>
//             <p class="tot-price">+$${adPrice + tiPrice}</p>
//           </div>
//         </div>`;
//   });
//   displayMenu = displayMenu.join("");
//   // console.log(displayMenu)

//   summary.innerHTML = displayMenu;
// }

// window.addEventListener("DOMContentLoaded", displayMenuItems(userChoice))




