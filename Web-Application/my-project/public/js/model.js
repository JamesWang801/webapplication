// import { http } from "./util";



export {Model};
/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements ...">
 *
 * Student Name:
 * Student Number:
 *
 */

/* 
 * Model class to support the FlowTow application
 * this object provides an interface to the web API and a local
 * store of data that the application can refer to.
 * The API generates different events:
 *   "modelUpdated" event when new data has been retrieved from the API
 *   "postAdded" event when a request to add a new post returns
 *   "likeAdded" event when a request to add a new like returns
 *   "commentAdded" event when a request to add a new comment returns 
*/

const Model = {
    postsUrl: '/posts', 
    uploadUrl: '/upload',  
    commentsUrl: '/comments',
    
    //this will hold the post data stored in the model
    data: {
        posts: []
    },
    
    
    // updatePosts - retrieve the latest list of posts from the server API
    // when the request is resolved, creates a "modelUpdated" event 
    updatePosts: function() {

    },

    // getPosts - return an array of post objects
     getPosts: async function() {
        let postdata = []
        await fetch('http://localhost:1337/posts').then((res)=>{
            return res.json()
        }).then((data)=>{
         postdata  = data
        
        })
        this.data.posts  = postdata
        return this.data.posts  
    },
    
    
    // getPost - return a single post given its id
    getPost: async function(postUrl,id) {
       await fetch(postUrl+"/"+id).then((res)=>{
            return res.json()    
        }).then((data)=>{
            const target = document.getElementById("single_post")
            const template = Handlebars.compile(document.getElementById("single_post_view").textContent)
            const div = template({'picture':data})
            
            return target.innerHTML = div
        })
        this.addLike()
    },

    setPosts: function(posts) {
        this.data.posts = posts;
    },

    // addPost - add a new post by submitting a POST request to the server API
    // postData is an object containing all fields in the post object (e.g., p_caption)
    // when the request is resolved, creates an "postAdded" event
    addPost: function(postData) {

    },

    // getUserPosts - return just the posts for one user as an array
    getUserPosts: function(userid) {
        
    },

    // addLike - increase the number of likes by 1 
    //      by submitting a PUT request to the server API
    //      postId - is the id of the post
    // when the request is resolved, creates an "likeAdded" event
    addLike: function (postId) {
     
        const btn = document.getElementsByClassName('like_btn')
        for(let i =0;i<btn.length;i++){
        btn[i].addEventListener('click',()=>{
              const id = btn[i].attributes["postid"].value
              let likes = parseInt(btn[i].attributes["like"].value)  
              
              const dataset = {
                "p_likes":likes+1
              }
             fetch('http://localhost:1337/posts/'+id,{
                 method:'PUT',
                 headers: {
                    "Content-Type": "application/json"
                    }, 
                 body:JSON.stringify(dataset)
             }
             ).then((res)=>{
                 this.getPosts()
                 location.reload()
               
             })
         })
        }
       
        
    },

    // addComment - add a comment to a post 
    //      by submitting a POST request to the server API
    //      commentData is an object containing the content of the comment, the author and the postid
    // when the request is resolved, creates an "commentAdded" event
    addComment: function (commentData) {
        
    },

    //getRandomPosts - return N random posts as an array
    getRandomPosts: function(lenght){
        const data = this.data.posts
        const random = []
        for(let i =0;i<lenght;i++){
            let index = parseInt(Math.random()*(12-0+1)+0)
            random.push(data[index])
        }
        return random
    },

    // getRecentPosts - return the N most recent as an array
    //  posts, ordered by timestamp, most recent first
    getRecentPosts: function(N) {
        const data = this.data.posts
         const recentData = [...data].sort((a,b)=>{
             if (a.published_at < b.published_at ) {
                             return 1;
                         } else if (a.published_at > b.published_at ) {
                             return -1;
                         } else {
                             if (a.published_at < b.published_at ) {
                                 return -1;
                             } else if (a.published_at > b.published_at ) {
                                 return 1;
                             }
                             return 0;
                         }
         })
         return data
    },

    // getPopularPosts - return the N most popular as an array
    // posts, ordered by the number of likes
    getPopularPosts: function(N) {
        const data = this.data.posts
        const popularData = [...data].sort((a,b)=>b.p_likes-a.p_likes)
        return popularData
    },

    displayhash: function(){
        const postUrl = 'http://localhost:1337/posts'
        let id =0
        const found = window.location.hash.match(/^#!\/posts\/(\d*)$/)
        found && found.length === 2?id = found[1] :console.log("No Id Found")
        const hashurl = "#!/posts"+"/"+id
        if(window.location.hash===hashurl)
        {
            Model.getPost(postUrl,id)
            
        }   
    }

}