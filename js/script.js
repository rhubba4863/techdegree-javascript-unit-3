/*
Sources
https://www.w3schools.com/jsref/prop_text_disabled.asp
*/


/*
Treehouse Techdegree:
FSJS Project 3 - Interactive Form
*/
document.addEventListener('DOMContentLoaded', () => {
  console.log("Test");

  let nameInput = document.querySelector("#name");
  let jobRole = document.querySelector('#title');

  let tShirtSize = document.querySelector('#size');
  let tShirtDesign = document.querySelector('#design');
  let tShirtColor = document.querySelector('#color');


  function initialSetup(){
    focusOnName();  
    tShirtColor.disabled = true;


  }
     
  initialSetup();
    
   // 3) Select "Name" field so user can type within
  function focusOnName() {
    nameInput.focus(); //or .blur()   
  }
 
   // 4) Display "Other job role?" if any option but "Other" is selected from "Job Role" dropdown
  jobRole.addEventListener("change", (event) => {   
    let otherJobInput = document.querySelector("#other-job-role");

    otherJobInput.hidden = (jobRole.value == 'other');
    // if (jobRole.value == 'other') {
        //     otherJobInput.hidden = false;
        // } else {
        //     otherJobInput.hidden = true;
        // }    
  });
    
  // 5) 
  tShirtDesign.addEventListener("change", (event) => {      
    //Options: "Select Theme", "js puns", "heart js"
    let tShirtValue = tShirtDesign.value;
    let jsPunColors = document.querySelectorAll('[data-theme="js puns"]');
    let heartJsColors = document.querySelectorAll('[data-theme="heart js"]');


    if(tShirtValue != "Select Theme"){
      tShirtColor.disabled = false;
    }else{
      tShirtColor.disabled = true;
    }

    console.log("ShirtVal="+tShirtValue);

    //if(tShirtValue.localeCompare(tShirtValue, undefined, { sensitivity: 'js puns' })){
    if(tShirtValue=== 'js puns'){
      decideColorOptions(jsPunColors, true);
      decideColorOptions(heartJsColors, false);
    }
    else if(tShirtValue === 'heart js'){
    //else if (tShirtValue.localeCompare(tShirtValue, undefined, { sensitivity: 'heart js' })){
      decideColorOptions(jsPunColors, false);
      decideColorOptions(heartJsColors, true);
    }else{
      //console.log("value="+ tShirtValue);
    }

    //refresh to default color when 
    //https://stackoverflow.com/questions/25542129/reset-value-of-hidden-field-when-dropdown-selected-javascript
    tShirtColor.selectedIndex = 0;

    console.log("color="+ tShirtColor.value);
   
    console.log("2 ="+ tShirtDesign.value);
 
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


  // jobRole.addEventListener('click', (e) => {
  //     const button = e.target;
  // }

  // function example(){
  //     // let value = nameInput.getAttribute("name");
  //     // console.log("2 ="+ nameInput.length);
  // }
});