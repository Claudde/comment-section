import React, {Component} from "react";
import {Button, Avatar} from '@mui/material';
import TextField from '@mui/material/TextField'

let addNewComment = {
    content: "",
    createdAt: new Date(),
    score: 0,
    user: {
        image: {
            png: "",
            webp: ""
    },
    username: ""
    },
    replies: []
}


class AddComment extends Component{
    constructor(props){
        super(props);
        this.state = {
            content: ""
        }
    }

    add = (e) => {
        e.preventDefault();

        addNewComment.createdAt = new Date();
        addNewComment.content = this.state.content;

        this.props.addCommentHandler(e, addNewComment);
        this.setState({
            content: "",
        });
        
    }

    
    render(){
        addNewComment.user.image.png = this.props.avatar.png;
        addNewComment.user.image.webp = this.props.avatar.webp;
        addNewComment.user.username = this.props.username;
        return(
            <div className="add-comment-div">
                <form className="add-comment-form"
                    onSubmit="return false"> 
                    {/* {(e) => {this.add(e)}}> */}
                    <Avatar src={this.props.avatar.png}
                            style={{
                                marginRight: '5px'
                            }}
                            className="add-comment-avatar"/>
                    <TextField //id="new-comment-text" 
                            className="add-comment-textfield"
                            value={this.state.content}
                            onChange={(e) => {
                                    this.setState({content: e.target.value})}}
                            multiline
                            rows={2}
                            fullWidth
                            style={{
                                marginRight: '5px'
                            }}
                            
                    />
                    
                    <Button type="submit" 
                            variant="contained" 
                            disabled={!this.state.content}
                            className="add-comment-btn"
                            style={{
                                background: "#5457B6",
                                color: "#F5F6FA",
                                maxWidth: '70px', 
                                minWidth: '70px',
                                maxHeight: '35px',
                                minHeight: '35px'
                            }}
                            onClick={(e) => {this.add(e)}}
                            >Send</Button>
                </form>
            </div>
        );
    }
}

export default AddComment;