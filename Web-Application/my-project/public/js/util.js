/*
 *
 * Module: <name>
 * < short description here e.g. "This module implements the utility functions...">
 *
 * Student Name:
 * Student Number:
 *
 */

export {splitHash,randompick,http,listView};

// splitHash - given a hash path like "#!/people/2" 
//   return an object with properties `path` ("people") and `id` (2)
function splitHash(hash) {

    const regex = "#!/([^/]*)/?(.*)?";
    const match = hash.match(regex);
    if (match) {
        return {
            path: match[1],
            id: match[2]
        }
    } else {
        return { path: "" }
    }
}

const randompick = (old,newdata,lenght)=>{
    for(let i =0;i<lenght;i++){
        let index = parseInt(Math.random()*(6-0+1)+0)
        newdata.push(old[index])
    }
    return newdata
}


 const  http = (url)=> {
    return  fetch(url).then((res)=>res.ok? res.json():new Error)
  }

  const listView = (targetid,scriptid,data)=>{
    const target = document.getElementById(targetid)
    const template = Handlebars.compile(document.getElementById(scriptid).textContent)
    const div = template({'picture':data})
    return target.innerHTML = div
  }
