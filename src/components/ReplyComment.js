import React, {Component} from "react";
import {Button, Avatar} from '@mui/material';
import TextField from '@mui/material/TextField'

let replyObj = {
    content : "",
    createdAt : Date.now(),
    score : 0,
    replyingTo : "",
    user : {
        image: {
            png: "",
            webp: ""
            },
        username : ""
    }
}

class ReplyComment extends Component{
    constructor(props){
        super(props);
        this.state = {
            content: ""
        };
        this.buildReply = this.buildReply.bind(this);
        this.toggleOffReply = this.toggleOffReply.bind(this);
        this.hideReplyDialog = this.hideReplyDialog.bind(this);
    }

    buildReply(e){
        e.preventDefault();
        // replyObj.id = 0;//static
        replyObj.content = this.state.content;
        replyObj.createdAt = new Date();
        replyObj.replyingTo = this.props.username;
        replyObj.user.image.png = this.props.avatar.png;
        replyObj.user.image.webp = this.props.avatar.webp;
        replyObj.user.username = this.props.currentUser;

        this.props.sendReply(replyObj, this.props.parent);
        this.setState({
            content: ""
        });
        this.hideReplyDialog(this.props.id);
    }

    toggleOffReply = (e, id) => {
        e.preventDefault();
        this.hideReplyDialog(id);
    }

    hideReplyDialog(id){
        var replyDiv = document.getElementById(`reply-${id}`);
        replyDiv.style.display = "none";
        this.setState({
            content: ""
        });
    }

    render() {

        return (
            <div className={`reply-container ${this.props.className}`}
                 key={this.props.id} 
                 style={{display: "none"}}
                 id={`reply-${this.props.id}`}>
                    <Avatar src={this.props.avatar.png}
                            alt={this.props.currentUser}/>
                <div className="div-textfield">
                    <TextField onChange={(e) => this.setState({content: e.target.value})}  
                                value={this.state.content}
                                //variant="outlined-multiline-static"
                                multiline
                                rows={2}
                                fullWidth
                                />
                </div>
                <div className="reply-buttons">
                    <Button onClick={(e) => this.buildReply(e)}
                            variant="contained"
                            style={{
                                background: "#5457B6",
                                color: "#F5F6FA",
                                maxWidth: '70px', 
                                minWidth: '70px',
                                maxHeight: '35px',
                                minHeight: '35px'
                              }}>Reply</Button>
                    <Button onClick={(e) => {this.toggleOffReply(e, this.props.id)}}
                            variant="contained"
                            style={{
                                background: "#ED6468",
                                color: "#F5F6FA",
                                maxWidth: '70px', 
                                minWidth: '70px',
                                maxHeight: '35px',
                                minHeight: '35px'
                              }}>Cancel</Button>
                </div>
            </div>
        );
    }
}

export default ReplyComment