"use strict"

function showUserLogin(){

addTemplate("loginPage");

  let userdata = document.getElementById("newUser");
  userdata.onsubmit = userInsert;

  let loginBtn = document.getElementById("loginBtn");
  loginBtn.onclick = loginUser;
}

//----- creating new user -----
async function userInsert(evt){
  evt.preventDefault();
  let username = document.getElementById("newUsername").value;
  let email = document.getElementById("newEmail").value;
  let password = document.getElementById("newPsw").value;

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

//----- login user -----
async function loginUser(){
  let username = document.getElementById("username").value;
  let password = document.getElementById("psw").value;

  let credentials = `Basic ${ btoa(username + ":" + password)}`;
  try{
    let response = await fetch("/app/authenticate", {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Authorization": credentials
      }
    });
    let data = await response.json();
    if(response.status === 200){
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      start();

    }
    else if(response.status === 401){
      feedback.innerHTML = data.message;
    }
    else if(response.status === 500){
      feedback.innerHTML = data.message;
    }
  }
  catch(error) {
    console.log(error);
  }
}
