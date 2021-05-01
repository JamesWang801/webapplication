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

  login:async function () {
    let userdata = []
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
        // console.log(res)
        return res.json()
      }).then((data) =>{  
        userdata = data
      })
      this.userData = userdata  
      
      return this.userData 
  },

  //getUser - return the user object from userData
  getUser:  function () {
    const userlist = this.userData

    
    if(userlist){
      return userlist
    }else{
     return null
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
