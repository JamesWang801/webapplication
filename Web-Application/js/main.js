/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements main entry point...">
 *
 * Student Name:
 * Student Number:
 *
 */

 let  picture =()=>{
    return fetch("../js/sample.json"). then((res)=>{
       if(res.ok){
         return res.json()
       }
    }).then((data)=>{
        let target = document.getElementById('pic_nav')
        let template =  Handlebars.compile(document.getElementById("picture_list").textContent)
        let list = template({'picture':data})
        target.innerHTML=list
    })
}

function redraw() { 

    let content = "<h2>API Test</h2><ul>";
    content += "<li><a href='/#'>Three Posts</a></li>";
    content += "<li><a href='/#'>Recent Posts</a></li>";
    content += "<li><a href='/#'>Popular Posts</a></li>";
    content += "<li><a href='/posts/1'>A Single Post</a></li>"; 
    content += "</ul>";

    // update the page
    document.getElementById("target").innerHTML = content;
}

window.onload = function() {
   
    picture()
    redraw();

};


