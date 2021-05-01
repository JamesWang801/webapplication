import {
  Model
} from "./model.js"
import {
  Auth
} from "./service.js"
import {
  listView
} from "./util.js"

/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements main entry point...">
 *
 * Student Name:yaowen Liang
 * Student Number:46517995
 * 
 */
let a = null;
async function redraw() {
  await Model.getPosts() //wait till fetch the data
  const data = Model.getPopularPosts()

  const recedata = Model.getRecentPosts()
  const ram = Model.getRandomPosts(4)
  listView("pic_nav", "nav_pic_list", ram)
  listView("recent_post", "recent_picture_list", recedata)
  listView("popular_post", "popu_picture_list", data)
  Model.displayhash()
  Model.addLike()
  a = document.getElementById("login_template").textContent


  let user = Auth.getUser() 
  listView('login_form', 'login_template', user)
  const btn = document.getElementById('login')

  btn.addEventListener('click', async () => {
    await Auth.login()
     user = Auth.getUser() //successfully fetch data
    const userid = user.user.id
    const username = user.user.username
    
    const target = document.getElementById('login_form')
    const template = Handlebars.compile(a)
    const div = template({
      'picture': user
    })
    target.innerHTML = div
    localStorage.setItem("UserId",userid)
    localStorage.setItem('Username',username)
    
  });




  
  
  
  





}


window.onload = function () {
  redraw()

};

window.onhashchange = Model.displayhash
