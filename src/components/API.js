const PostAPI = async(url,data)=>{
   const response = await fetch(`${url}`,{
     method:"POST",
     headers:{
        "Content-Type":"application/json"
     },
     body: JSON.stringify(data)
   })
   return response;
}

const GetAPI = async (url) =>{
    const response = await fetch(url)
    return response;
}

export {PostAPI, GetAPI}