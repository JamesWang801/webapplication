import { Model } from "./model.js"
import { listView} from "./util.js"

/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements main entry point...">
 *
 * Student Name:yaowen Liang
 * Student Number:46517995
 *
 */

async function redraw() { 
    await Model.getPosts() //wait till fetch the data
    const data = Model.getPopularPosts() 
    const recedata = Model.getRecentPosts()
    const ram = Model.getRandomPosts(4)
    listView("pic_nav","nav_pic_list",ram)
    listView("recent_post","recent_picture_list",recedata)
    listView("popular_post","popu_picture_list",data)
    Model.displayhash()
    Model.addLike()
}


window.onload = function() {
    redraw()
};

window.onhashchange=Model.displayhash



 