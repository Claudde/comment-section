import React, {Component} from "react";
import {Button} from '@mui/material';
import TextField from '@mui/material/TextField'

class EditDialog extends Component{
    constructor(props){
        super(props);
        this.state = {
            content: this.props.comment.content
        }
        
    }

    render() {
        return (
            <div className='edit-dialog'
                 id={`edit-dialog-div-${this.props.comment.id}`}
                 key={`edit-dialog-div-${this.props.comment.id}`}
                 style={{display: "none"}}
                 >
                <TextField value={this.state.content} 
                            onChange={(e) => {this.setState({content: e.target.value})}}
                            id={`edit-dialog-text-${this.props.comment.id}`}
                            multiline
                            rows={2}
                            fullWidth
                            />
                <div className="edit-buttons">
                    <Button onClick={(e) => {this.props.buildUpdate(e, this.state.content)}}
                            variant="contained"
                            style={{
                                background: "#5457B6",
                                color: "#F5F6FA",
                                maxWidth: '70px', 
                                minWidth: '70px',
                                maxHeight: '35px',
                                minHeight: '35px'
                              }}
                            >Update</Button>
                    <Button onClick={(e) => {this.props.cancelUpdate(e, this.props.comment.id)}}
                            variant="contained"
                            style={{
                                background: "#ED6468",
                                color: "#F5F6FA",
                                maxWidth: '70px', 
                                minWidth: '70px',
                                maxHeight: '35px',
                                minHeight: '35px'
                              }}
                            >Cancel</Button>
                </div>
            </div>
          );
    }
}

export default EditDialog;