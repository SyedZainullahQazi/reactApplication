
export function CommentGetItemsLocalStorage(postid)
{
    const storedComments = localStorage.getItem(`comments_${postid}`);
    return storedComments;
}

export function CommentSetItemsLocalStorage(postid,data)
{
    localStorage.setItem(`comments_${postid}`, JSON.stringify(data));
}