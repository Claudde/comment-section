import React, {Component} from "react";
import CommentCard from './CommentCard';
import ReplyComment from "./ReplyComment";
import api from '../api/comments';

class CommentList extends Component{
    constructor(props){
        super(props);
        this.state = {
            media: ""
        }
        this.renderComment = this.renderComment.bind(this);
        this.upDownVote = this.upDownVote.bind(this);
        this.changeState = this.changeState.bind(this);
        this.sendReply = this.sendReply.bind(this);
        this.toggleReply =  this.toggleReply.bind(this);
        this.updateContent = this.updateContent.bind(this);
        this.deleteComment = this.deleteComment.bind(this);
        this.sortAllComments = this.sortAllComments.bind(this);
    }

    componentDidUpdate(){
        if(this.state.media){
            const element = document.getElementById(this.state.media);

            element.scrollIntoView({
                behavior: "smooth",
                block: "center",

            });

            this.setState({
                media: ""
            });
        }
    }

    changeState(temp){
        let com = this.props.comments;
        for(let i in com){
            if(com[i].id === temp.id){
                com[i] = temp;
            } else if (com[i].replies) {
                for(let j in com[i].replies){
                    if(com[i].replies[j] === temp.id){
                        com[i] = temp;
                    }
                }
            }
        }
        return com;
    }

    sortAllComments(comments){
        const allComments = {...comments};
        for(var a = 0; a < Object.keys(allComments).length; a++){
            for(var b = a+1; b < Object.keys(allComments).length; b++){
                if(allComments[a].score < allComments[b].score){
                    var temp = allComments[a];
                    allComments[a] = allComments[b];
                    allComments[b] = temp;
                }
            }
        }

        return allComments;
    }

    upDownVote = async(e, com, upDown, parent) => {
        e.preventDefault();
    
        let allComments = [...this.props.comments];
        let replyComment = [];

        //Main Comment Score
        if (parent === 0){
            com.score = upDown === 'up' ? com.score + 1 : com.score - 1;
        //Reply Comment Score    
        } else {
            allComments.map((comment) =>{
                if(comment.id === parent){
                    //Edit score in replies[]
                    comment.replies.map((reply) => {
                        if(reply.id === com.id){
                            reply.score = upDown === 'up' ? reply.score + 1 : reply.score - 1;
                        }
                        return reply;
                    });
                    replyComment = comment;
                }
                return comment;
            });
        }
    
        const response = parent === 0 ? await api.put(`/comments/${com.id}`, com) : await api.put(`/comments/${parent}`, replyComment)
        
        const tempComments = response.data;
        this.props.setChanger(
            this.changeState(tempComments)
        );
        
        this.setState({
            media: com.id
        });
        
    }

    updateContent = async(e, com, parent) => {
        e.preventDefault();
        
        let allComments = [...this.props.comments];
        let updateReply = [];
        //Reply Comment Update
        if (parent !== 0){
            allComments.map((comment) =>{
                if(comment.id === parent){
                    //Edit content in replies[]
                    comment.replies.map((reply) => {
                        if(reply.id === com.id){
                            reply.content = com.content
                        }
                        return reply;
                    });
                    updateReply = comment;
                }
                return comment;
            });
        }
        
        const response = parent === 0 ? await api.put(`/comments/${com.id}`, com) : await api.put(`/comments/${parent}`, updateReply)
        const tempComments = response.data;
        this.props.setChanger(
            this.changeState(tempComments)
        );
    }

    deleteComment = async(e, id, parent) => {
        e.preventDefault();

        let allComments = [...this.props.comments];
        //Delete main comment 
        if (parent === 0){
            await api.delete(`/comments/${id}`);
            const newCommentList = allComments.filter((comment) => {
                return comment.id !== id;
            });
            this.props.setChanger(
                newCommentList
            );
            
        } else {
            let findParentIndex = allComments.findIndex(
                (comment) => comment.id === parent
            )
            let thread = allComments[findParentIndex]
            const newReplyList = thread.replies.filter((reply) => {
                return reply.id !== id;
            });
            thread.replies = [...newReplyList];

            const response = await api.put(`/comments/${parent}`, thread)
            const tempComments = response.data;
            this.props.setChanger(
                this.changeState(tempComments)
            );
        }

        
    }

    sendReply = async(reply, parent) => {
        let request = {
            id: this.props.getNewId(),
            ...reply
        }

        let thread;

        let comment = this.props.comments;
        for(let i in comment){
            if(comment[i].id === parent){
                thread = comment[i];
                break;
            }
        }

        //this for main comment
        thread.replies.push(request);

        const response = await api.put(`/comments/${parent}`, thread);
        const tempComments = response.data;
        this.props.setChanger(
            this.changeState(tempComments)
        );
        this.setState({
            media: request.id
        });

    }

    toggleReply = (e, id) => {
        e.preventDefault();
        var replyDiv = document.getElementById(`reply-${id}`);
        replyDiv.style.display = "grid";
        
    }

    renderComment() {
        
        let divComment = [];
        let comments = this.sortAllComments({...this.props.comments})
        let img = this.props.avatar;
        
        for(let i in comments){
            divComment.push(<CommentCard 
                            comments={comments}
                            comment={comments[i]}
                            className={"main"}
                            upDownVote={this.upDownVote}
                            currentUser={this.props.username}
                            parent={0}
                            toggleReply={this.toggleReply}
                            deleteComment={this.deleteComment}
                            updateContent = {this.updateContent}
                            />);
            if(this.props.username === comments[i].user.username){
                // divComment.push(<EditDialog 
                //                 comment={comments[i]}
                //                 updateContent={this.updateContent}
                //                 parent={0}
                //                 />)
            } else {
                divComment.push(<ReplyComment id={comments[i].id} 
                                              parent={comments[i].id}
                                              avatar={img}
                                              username={comments[i].user.username}
                                              sendReply={this.sendReply}
                                              currentUser={this.props.username}
                                              className={"main"}
                                              />);
            }               
            
            if(Object.keys(comments[i].replies).length !== 0){
                for(let j in comments[i].replies){
                    divComment.push(<CommentCard
                                    comments={comments}
                                    comment = {comments[i].replies[j]}
                                    className={"reply"}
                                    upDownVote={this.upDownVote}
                                    currentUser={this.props.username}
                                    parent={comments[i].id}
                                    toggleReply={this.toggleReply}
                                    deleteComment={this.deleteComment}
                                    updateContent = {this.updateContent}
                                    />);
                    // divComment.push(replyComment());

                    if(this.props.username === comments[i].replies[j].user.username){
                        // divComment.push(<EditDialog 
                        //                 comment = {comments[i].replies[j]}
                        //                 updateContent={this.updateContent}
                        //                 parent={comments[i].id}
                        //                 />)
                    } else {
                        divComment.push(<ReplyComment id={comments[i].replies[j].id}
                                                      parent={comments[i].id}
                                                      avatar={img}
                                                      username={comments[i].replies[j].user.username}
                                                      sendReply={this.sendReply}
                                                      currentUser={this.props.username}
                                                      className={"reply"}
                                                      />);
                    } 
                }
            }
        }
  
        return divComment;
    }


    render(){
        return(
            <div className="comment-section">
                {this.renderComment()}
            </div>
        )
    }
}

export default CommentList;