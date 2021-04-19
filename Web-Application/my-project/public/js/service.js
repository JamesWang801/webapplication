/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements user authentication ...">
 *
 * Student Name:
 * Student Number:
 *
 */

export {
  Auth
}

const Auth = {
  userData: null,

  // login - handle user login  
  //      by submitting a POST request to the server API
  //      username - is the input username
  //      password - is the input password
  // when the request is resolved, creates a "userLogin" event
  login:  function () {

    const btn = document.getElementById('login')

    btn.addEventListener('click', async() => {
      let identifier = document.getElementById("username").value
      let password = document.getElementById("password").value

      const logindata = {
        identifier,
        password
      }
      await fetch("http://localhost:1337/auth/local", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(logindata)
      }).then((res) => {
        return res.json()
      }).then((data) => {
        this.userData = data
      })
      this.getUser(this.userData)
    })
   

  },

  //getUser - return the user object from userData
  getUser: function (userdata) {
   if(userdata){
       
   }else{
       console.log("没数据");
   }
  },

  //getJWT - get the JWT from userData
  getJWT: function () {
    if (this.userData) {
      return this.userData.jwt;
    } else {
      return null;
    }
  }

}
