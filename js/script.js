/*
Sources
https://www.w3schools.com/jsref/prop_text_disabled.asp
*/


/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
*/
document.addEventListener('DOMContentLoaded', () => {
  let nameInput = document.querySelector("#name");
  let emailInput = document.querySelector("#email");
  let jobRole = document.querySelector('#title');

  let tShirtSize = document.querySelector('#size');
  let tShirtDesign = document.querySelector('#design');
  let tShirtColor = document.querySelector('#color');

  let activitiesArea = document.querySelector('#activities-box');
  let allActivities = document.querySelectorAll('#activities-box [type="checkbox"]');
  let totalCostArea = document.querySelector('.activities-cost');

  let paymentVersion = "select method";
  let paymentType = document.querySelector('#payment');
  let creditCard = document.querySelector('#credit-card');
  let payPal = document.querySelector('#paypal');
  let bitCoin = document.querySelector('#bitcoin');

  let expirationDate = document.querySelector('#exp-month');
  let expirationYear = document.querySelector('#exp-year');
  let cardNumber = document.querySelector('#cc-num');
  let zipCode = document.querySelector('#zip');
  let CVV = document.querySelector('#cvv');

  const formElement = document.querySelector('form');

  /***
   * Setup initial values of page, and place focus on name input
   */
  function initialSetup(){
    focusOnName();  
    hideJobRole();
    tShirtColor.disabled = true;
    totalCostArea.textContent = "Total: $0";
    resetPayment();
  }
     
  initialSetup();

  connectActivities();

  /***
   *  9) Setup focus state for navigating (tab) between each activity. 
   **/
  function connectActivities() {
    for (const activity of allActivities) {
      activity.addEventListener('focus', () => activity.parentElement.classList.add('focus'));
      activity.addEventListener('blur', () => activity.parentElement.classList.remove('focus'));
    }
  }
    
  /***
   * 3) Select "Name" field so user can type within
   */ 
  function focusOnName() {
    nameInput.focus(); //or .blur()   
  }

  /***
   * 4) Display "Other job role?" if any option but "Other" is selected from "Job Role" dropdown
   */
  jobRole.addEventListener("change", (event) => {   
    hideJobRole();
  });

  function hideJobRole(){
    let otherJobInput = document.querySelector("#other-job-role");

    otherJobInput.hidden = (jobRole.value != 'other');
  }

  /***
   * 5) User can select Design option, then Color options of that brand will be displayed. 
   *    Otherwise Color is disabled to default each time Design changes.
   */
  tShirtDesign.addEventListener("change", (event) => {      
    let tShirtValue = tShirtDesign.value;
    let jsPunColors = document.querySelectorAll('[data-theme="js puns"]');
    let heartJsColors = document.querySelectorAll('[data-theme="heart js"]');

    if(tShirtValue != "Select Theme"){
      tShirtColor.disabled = false;
    }else{
      tShirtColor.disabled = true;
    }

    if(tShirtValue === 'js puns'){
      decideColorOptions(jsPunColors, true);
      decideColorOptions(heartJsColors, false);
    } else if(tShirtValue === 'heart js'){
      decideColorOptions(jsPunColors, false);
      decideColorOptions(heartJsColors, true);
    }

    //refresh to default color when Design changes
    //https://stackoverflow.com/questions/25542129/reset-value-of-hidden-field-when-dropdown-selected-javascript
    tShirtColor.selectedIndex = 0;
 
    function decideColorOptions(colors, view){
      if(view == true){
        colors.forEach(color => {
          color.style.display = "block";
        });
      }else{
        colors.forEach(color => {
          color.style.display = "none";
        });
      }
    }
  });

  /***
   *  6)
   */
  activitiesArea.addEventListener("change", (e) => {
    const checkbox = e.target;
    let activityCost = parseInt(checkbox.dataset.cost);
    let totalCost = parseInt(totalCostArea.textContent.substring(8));

    let checked = checkbox.checked;

    if (checked){
      for (const activity of allActivities){
        if((getTime(activity) === getTime(checkbox)) && (activity.name !== checkbox.name)){
          activity.parentElement.classList.add('disabled');
          activity.disabled = true;
        }
      }
      
      //Now change cost
      totalCost = totalCost + activityCost;
    } else{
      for (const activity of allActivities){
        if((getTime(activity) === getTime(checkbox)) && (activity.name !== checkbox.name)){
          activity.parentElement.classList.remove('disabled');
          activity.disabled = false;
        }
      }
        
      //Now change cost
      totalCost = totalCost - activityCost;
    }

    totalCostArea.textContent = `Total: $${totalCost}`;

    function getTime(activity){
      return activity.dataset.dayAndTime;
    }
  });

  // 7) 
  paymentType.addEventListener("change", (e) => {
    let selectedPayment = paymentType.value;
    paymentVersion = selectedPayment;

    console.log("2 ="+ selectedPayment);
    if(selectedPayment === "credit-card"){
      decideDisplayedPayments(creditCard, true);
      decideDisplayedPayments(payPal, false);
      decideDisplayedPayments(bitCoin, false);
      
      resetCreditCard();
    } else if(selectedPayment === "paypal"){
      decideDisplayedPayments(creditCard, false);
      decideDisplayedPayments(payPal, true);
      decideDisplayedPayments(bitCoin, false);
    } else if(selectedPayment === "bitcoin"){
      decideDisplayedPayments(creditCard, false);
      decideDisplayedPayments(payPal, false);
      decideDisplayedPayments(bitCoin, true);
    }
  });

 /* Note - decide position of next 3 methods
 */
  function resetPayment(){
    decideDisplayedPayments(creditCard, true);
    decideDisplayedPayments(payPal, false);
    decideDisplayedPayments(bitCoin, false);

    resetCreditCard()
  }

  function decideDisplayedPayments(payArea, view){
    if(view == true){
      payArea.style.display = "block";  
    }else{
      payArea.style.display = "none";  
    }
  }

  function resetCreditCard(){   
    expirationDate.selectedIndex = 0;
    expirationYear.selectedIndex = 0;
    cardNumber.value = "";
    zipCode.value = "";
    CVV.value = "";
  }

  /***
   * 8) The final requirements for submitting the form
   */
  formElement.addEventListener("submit", finalCheckup);

  function finalCheckup(){

    if((paymentVersion == "select method") || (paymentVersion == "credit-card")){
      validCVV();
      validZipCode();
      validCreditCard();
    }

    validName();
    validEmail();
    validActivitiesAreChecked();
  }

  nameInput.addEventListener("keyup", validName);

  function validName(){
    let regex = /^\S+$/i;
    let valid = regex.test(nameInput.value);

    console.log("9 ="+ valid);
    return checkIfInputIsValid(valid, nameInput);
  }

  emailInput.addEventListener("keyup", validEmail);

  function validEmail(){
    let regex = /^[^@]+@[^@.]+\.(com|org|net)$/i;  //  /^[^@]+@[^@.]+\.[a-z]+$/i;
    let valid = regex.test(emailInput.value);

    console.log("3 ="+ valid);
    return checkIfInputIsValid(valid, emailInput);
  }

  activitiesArea.addEventListener("change", validActivitiesAreChecked);

  function validActivitiesAreChecked() {
    const checkboxes = document.querySelectorAll('#activities-box [type="checkbox"]');
    let anyAreChecked = false;
  
    for (const c of checkboxes) {
      if (c.checked) {
        anyAreChecked = true;
      }
    }
  
    checkIfInputIsValid(anyAreChecked, activitiesArea);
    return anyAreChecked;
  }
   
  cardNumber.addEventListener("keyup", (e) => {
    let creditCard = e.target;

    validCreditCard();
  });

  function validCreditCard(){
    let regex = /^\d{13,15}$/i;
    let valid = regex.test(cardNumber.value);

    return checkIfInputIsValid(valid, cardNumber);
  }

  zipCode.addEventListener("keyup", (e) => {
    let currentZipCode = e.target;

    validZipCode();
  });

  function validZipCode(){
    let regex = /^(\d{5})$/i;
    let valid = regex.test(zipCode.value);

    return checkIfInputIsValid(valid, zipCode);
  }

  CVV.addEventListener("keyup", (e) => {   
    let cvvNumber = e.target;

    validCVV();
  });

  function validCVV(){
    let regex = /^(\d{3})$/i;
    let valid = regex.test(CVV.value);

    return checkIfInputIsValid(valid, CVV);
  }





  function checkIfInputIsValid(valid, element){
    if (valid){
      makeInputValid(element);
    }else{
      makeInputInvalid(element, event);
    }

    return valid;
  }

  /**
  * Display notification on valid status
  * @param {*} element - Input being checked up on
  */
  function makeInputValid(element){ 
    element.parentElement.classList.remove('not-valid');
    element.parentElement.classList.add('valid');
    element.parentElement.lastElementChild.style.display = 'none';
  }

  /**
  * Display notification in invalid status, also stopping the final submission
  * @param {*} element  - Input being checked up on
  */
  function makeInputInvalid(element, event){
    event.preventDefault();
    element.parentElement.classList.remove('valid');
    element.parentElement.classList.add('not-valid');
    element.parentElement.lastElementChild.style.display = 'block';
  }



  // jobRole.addEventListener('click', (e) => {
  //     const button = e.target;
  // }

  // function example(){
  //     // let value = nameInput.getAttribute("name");
  //     // console.log("2 ="+ nameInput.length);
  // }
});