"use strict"

let feedback = document.getElementById("feedback");
let logoutBtn = document.getElementById("logout");
logoutBtn.onclick = logout;

start();

function start(){

    feedback.innerHTML = "";

  if(checkAuthentication()){

    addTemplate("mainPage")
  }
  else {
      showUserLogin();
  }
}

function addTemplate(templId){
  let container = document.getElementById("container");
  container.innerHTML = "";

  let templ = document.getElementById(templId);
  let clone = templ.content.cloneNode(true);
  container.appendChild(clone);
}

//denne bør også inneholde en verifisering av token
function checkAuthentication(){
  let user = JSON.parse(localStorage.getItem("user"));
  let token = localStorage.getItem("token");

  if(user && token){
    return true;
  }
  return false;
}

function logout(){
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  start();
}
