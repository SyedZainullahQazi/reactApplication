export function getUserDataFromLocalStorage(name)
{
    return (localStorage.getItem(name));
}

export function setUserDataOnLocalStorage(name,data)
{
    return (localStorage.setItem(name, JSON.stringify(data)));
}