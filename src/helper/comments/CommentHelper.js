import {CommentSetItemsLocalStorage} from "../../utils/Comments/commentLocalStorage.js";

import 'react-toastify/dist/ReactToastify.css';

export const FindName = (userData,id) => {
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id === id) {
        return userData[i].name;
      }
    }
    return null;
  };

export const HandleCommentBtnClick = (userData,stateData,id,comments,updateComments,newCommentBody) => {
    let anEmail = "";
    for (let element of userData) {
      if (element.id === id) {
        anEmail = element.email;
        break;
      }
    }

    let newId=1;
    if(comments.length)
    {
      newId =comments.reduce((maxId, currentObj) => {
        return currentObj.id > maxId ? currentObj.id : maxId;
      }, -Infinity) + 1;
    }
    else{
      newId=1;
    }

    let userName=FindName(userData,id);

    let aNewComment = {
      postId: stateData.postid,
      id: newId,
      name: userName, 
      body: newCommentBody,
      email: anEmail,
    };
    let addedCommentArr = [...comments];
    addedCommentArr.unshift(aNewComment);
    updateComments(addedCommentArr);

    // Update localStorage with the updated comments array
    CommentSetItemsLocalStorage(stateData.postid, addedCommentArr);
    // toast.success("Commented successful!");
  };

  export const HandleDeleteBtn = (allComments,dataForComment,upComments) => {
    // let userEmail=props.dataForComment.email;
    const index = allComments.findIndex(
      (element) => element.id === dataForComment.id
    );

    const updatedArray = [...allComments];
    updatedArray.splice(index, 1);
    upComments(updatedArray);
    CommentSetItemsLocalStorage(dataForComment.postId,updatedArray);
  };

  export const HandleEditBtn = (updateEditFlag) => {
    updateEditFlag(false);
  };

  export const HandleUpdateBtn = (dataForComment,updateEditFlag,commentBody,allComments) => {
    updateEditFlag(true);
    dataForComment.body = commentBody;
    CommentSetItemsLocalStorage(dataForComment.postId,allComments);//update in localstorage
  };

  export const FindEmail = (idofUser,users) => {
    for (let element of users) {
      if (idofUser === element.id) {
        return element.email;
      }
    }
    return "";
  };