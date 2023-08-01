export default function CommentsAPI(stateData)
{
    return (fetch("https://jsonplaceholder.typicode.com/posts/"+(stateData?stateData.postid:"")+"/comments"))
}