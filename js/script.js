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
  let jobRole = document.querySelector('#title');

  let tShirtSize = document.querySelector('#size');
  let tShirtDesign = document.querySelector('#design');
  let tShirtColor = document.querySelector('#color');

  let activitiesArea = document.querySelector('#activities-box');
  let totalCostArea = document.querySelector('.activities-cost');

  let paymentType = document.querySelector('#payment');
  let epirationDate = document.querySelector('#exp-month');

  function initialSetup(){
    focusOnName();  
    tShirtColor.disabled = true;
    totalCostArea.textContent = "Total: $0";
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
    
  // 5) User can select Design option, then Color options of that brand will be displayed. 
  //    Otherwise Color is disabled to default each time Design changes.
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

    //console.log("ShirtVal="+tShirtValue);

    if(tShirtValue === 'js puns'){
      decideColorOptions(jsPunColors, true);
      decideColorOptions(heartJsColors, false);
    } else if(tShirtValue === 'heart js'){
      decideColorOptions(jsPunColors, false);
      decideColorOptions(heartJsColors, true);
    }else{
      //console.log("value="+ tShirtValue);
      //console.log("color="+ tShirtColor.value);
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

  // 6) 
  activitiesArea.addEventListener("change", (e) => {
    const checkbox = e.target;
    let activityCost = parseInt(checkbox.dataset.cost);
    let totalCost = parseInt(totalCostArea.textContent.substring(8));

    const allActivities = document.querySelectorAll('#activities-box [type="checkbox"]');
    let checked = checkbox.checked;

    // console.log("1 Cost="+activityCost);
    // console.log("1total Cost="+totalCost);

    if (checked){
      for (const activity of allActivities){
        //console.log("Name1"+activity.name +" and2 "+ checkbox.name);
        if((getTime(activity) === getTime(checkbox)) && (activity.name !== checkbox.name)){
          activity.parentElement.classList.add('disabled');
          activity.disabled = true;
        }
      }
      
      //Now change cost
      totalCost = totalCost + activityCost;
    } else{
      for (const activity of allActivities){
        //console.log("Name1"+activity.name +" and2 "+ checkbox.name);
        if((getTime(activity) === getTime(checkbox)) && (activity.name !== checkbox.name)){
          activity.parentElement.classList.remove('disabled');
          activity.disabled = false;
        }
      }
        
      //Now change cost
      totalCost = totalCost - activityCost;
    }

    // console.log("2 Cost="+activityCost);
    // console.log("2total Cost="+totalCost);
    totalCostArea.textContent = `Total: $${totalCost}`;

    function getTime(activity){
      return activity.dataset.dayAndTime;
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