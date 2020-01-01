"use strict"

let feedback = document.getElementById("feedback");
start();

function start(){

  //test om logg inn eller ny bruker
  if(true){
    newUser();
  }
  //else...

}
function newUser(){
  let userdata = document.getElementById("newUser");

  userdata.onsubmit = userInsert;
}

async function userInsert(evt){
  evt.preventDefault();
  let username = document.getElementById("newUsername").value;
  let email = document.getElementById("newEmail").value;
  let password = document.getElementById("newPsw").value;

  console.log(username, email, password);

  try {
  let response = await fetch("/app/newUser", {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      username: username,
      email: email,
      password: password
    })
  });
  let data = await response.json();
  if(response.status === 200 ){
    feedback.innerHTML = "Bruker er opprettet, logg inn for å fortsette";
  }
  else if (response.status === 400){
    feedback.innerHTML = data.message;
  }

} catch(err){
  feedback.innerHTML = "Noe gikk galt: " + err;
  console.log(err);
}
}
