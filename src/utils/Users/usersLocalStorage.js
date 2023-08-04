export const getUserDataFromLocalStorage=(name)=>
{
    return (localStorage.getItem(name));
}

export const setUserDataOnLocalStorage=(name,data)=>
{
    return (localStorage.setItem(name, JSON.stringify(data)));
}