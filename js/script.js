/*
Sources
https://www.w3schools.com/jsref/prop_text_disabled.asp
*/


/***
 * Treehouse Techdegree:
 * FSJS Project 3 - Interactive Form
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
    nameInput.focus();  
  }


  jobRole.addEventListener("change", (event) => {   
    hideJobRole();
  });

  /***
   * 4) Display "Other job role?" if any option but "Other" is selected from "Job Role" dropdown
   */
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

 /***
  *  Show Credit Card options, and clear them to original values.
  */
  function resetPayment(){
    decideDisplayedPayments(creditCard, true);
    decideDisplayedPayments(payPal, false);
    decideDisplayedPayments(bitCoin, false);

    resetCreditCard()
  }

  /***
   * Determines if certain payment elements are to be displayed for UI   
   * @param {element} payArea - The theme of the t-shirt.
   * @param {Boolean} view - Option if element is to be shown
   */
  function decideDisplayedPayments(payArea, view){
    if(view == true){
      payArea.style.display = "block";  
    }else{
      payArea.style.display = "none";  
    }
  }

  /***
   * Sets credit card to original empty values
   */
  function resetCreditCard(){   
    expirationDate.selectedIndex = 0;
    expirationYear.selectedIndex = 0;
    cardNumber.value = "";
    zipCode.value = "";
    CVV.value = "";
  }

  
  formElement.addEventListener("submit", finalCheckup);

  /***
   * 8) The final requirements for submitting the form. Validating all required inputs have correct input
   */
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

  /***
   * Checks if name input is valid, displaying error element if not
   * @returns {boolean} True or false if the name is valid.
   */
  function validName(){
    let regex = /^\S+$/i;
    let valid = regex.test(nameInput.value);

    return checkIfInputIsValid(valid, nameInput);
  }

  emailInput.addEventListener("keyup", validEmail);

  /***
   * Checks if email input is valid, displaying error element if not along with its reason
   * @returns {boolean} True or false if the email is valid.
   */
  function validEmail(){
    let regex = /^[^@]+@[^@.]+\.(com|org|net)$/i;  //  /^[^@]+@[^@.]+\.[a-z]+$/i;
    let valid = regex.test(emailInput.value);
    let emailErrorMessage = document.querySelector("#email-hint");

    if(emailInput.value === ""){
      emailErrorMessage.textContent = 'Please enter an email address';
    } else {
      emailErrorMessage.textContent = 'Email address must be formatted correctly';
    }

    console.log("3 ="+ valid);
    return checkIfInputIsValid(valid, emailInput);
  }

  activitiesArea.addEventListener("change", validActivitiesAreChecked);

  /***
   * Checks if valid number of Activities are selected (1 or more). Displaying error element if not
   * @returns {boolean} True or false if Activities are valid.
   */
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

  /***
   * Checks if credit card input is valid, displaying error element if not
   * @returns {boolean} True or false if the credit card number is valid.
   */
  function validCreditCard(){
    let regex = /^\d{13,15}$/i;
    let valid = regex.test(cardNumber.value);

    return checkIfInputIsValid(valid, cardNumber);
  }

  zipCode.addEventListener("keyup", (e) => {
    let currentZipCode = e.target;

    validZipCode();
  });

  /***
   * Checks if Zip Code input is valid, displaying error element if not
   * @returns {boolean} True or false if the Zip Code is valid.
   */
  function validZipCode(){
    let regex = /^(\d{5})$/i;
    let valid = regex.test(zipCode.value);

    return checkIfInputIsValid(valid, zipCode);
  }

  CVV.addEventListener("keyup", (e) => {   
    let cvvNumber = e.target;

    validCVV();
  });

    /***
   * Checks if CVV input is valid, displaying error element if not
   * @returns {boolean} True or false if the name is valid.
   */
  function validCVV(){
    let regex = /^(\d{3})$/i;
    let valid = regex.test(CVV.value);

    return checkIfInputIsValid(valid, CVV);
  }

  /***
   * Checks if input is valid. Displaying an error element with reason if not
   * @param {Boolean} valid - Option if element is valid
   * @param {element} element - element to edit (reveal/hide)
   * @returns {boolean} True or false if the name is valid.
   */
  function checkIfInputIsValid(valid, element){
    if (valid){
      makeInputValid(element);
    }else{
      makeInputInvalid(element, event);
    }

    return valid;
  }

  /**
  * Display notification on its valid status
  * @param {element} element - Input being checked up on
  */
  function makeInputValid(element){ 
    element.parentElement.classList.remove('not-valid');
    element.parentElement.classList.add('valid');
    element.parentElement.lastElementChild.style.display = 'none';
  }

  /**
  * Display notification as invalid status, also stopping the final submission
  * @param {element} element - Input being checked up on
  * @param {Object} event - Event given to the method to stop the default submission
  */
  function makeInputInvalid(element, event){
    event.preventDefault();
    element.parentElement.classList.remove('valid');
    element.parentElement.classList.add('not-valid');
    element.parentElement.lastElementChild.style.display = 'block';
  }

  /**
  * Description
  * @param {element} element - Input being checked up on
  * @param {Object} event - Event given to the method to stop the default submission
  */
  function example(element, event){
  }
});