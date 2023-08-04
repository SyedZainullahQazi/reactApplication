export const initializePostDataOnLocalStorage=()=>
{
    return (localStorage.getItem("postData")
    ? JSON.parse(localStorage.getItem("postData"))
    : []);
}

export const setPostDataOnLocalStorage=(data)=>
{
  localStorage.setItem("postData", JSON.stringify(data));
}

