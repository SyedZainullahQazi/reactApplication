export function initializePostDataOnLocalStorage()
{
    return (localStorage.getItem("postData")
    ? JSON.parse(localStorage.getItem("postData"))
    : []);
}

export function setPostDataOnLocalStorage(data)
{
   return  (localStorage.setItem("postData", JSON.stringify(data)));
}

