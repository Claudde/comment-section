import React from "react";
import api from '../api/comments';
import App from "../App";

const updateComment = async (props) => {

    console.log("to DB!");
    console.log("Passed" + props.toUpdate.id);

    // const response = await api.put(`/comments/${props.comment.id}`, props.comment);
    // console.log(response.data);
    // const tempComments = response.data;
    // App.setComments(
    //   comments.map((comment) => {
    //     return comment.id === tempComments.id ? {...response.data} : props.comment;
    //   })
    // );


}

export default updateComment;