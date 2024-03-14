let myLeads = [];
const buttonEl = document.getElementById("input-btn");
const innerEl = document.getElementById("inner-el");
const inputEl = document.getElementById("input-el");
const deleteEl= document.getElementById("delete-el");
const tabBtn=document.getElementById("tab-btn")
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)        
    
    })
    
})
// Retrieve leads from localStorage on page load (if they exist)

let leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
deleteEl.addEventListener("click",function(){
    localStorage.clear();
    myLeads=[]
    render(myLeads)
})
if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage;
  // Call renderLeads to display existing leads
  render(myLeads);
}

buttonEl.addEventListener("click", function() {
  let message = inputEl.value;
  myLeads.push(message);
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  render(myLeads);
  inputEl.value = "";
});


function render(leads) {
  let listItems = "";
  for (let i = 0; i < leads.length; i += 1) {
    listItems += `
      <li>
        <a target="_blank" href="${leads[i]}">
          ${leads[i]}
        </a>
      </li>
    `;
  }

  innerEl.innerHTML = listItems;
}
