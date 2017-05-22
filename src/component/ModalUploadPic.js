import React, { Component } from 'react'

import { Button, Form, Header, Modal, Image, Progress, Input, TextArea } from 'semantic-ui-react'

import { database, auth, storage } from './../Firebase.js'


export default class ModalUploadPic extends Component {
    state = {
            caption: "",
            percentage: 0,
            imageUrl: "https://react.semantic-ui.com/assets/images/avatar/large/rachel.png",
            loading: false,
            open: false,
            placeholderImage: "https://react.semantic-ui.com/assets/images/avatar/large/rachel.png"
        }; 
    constructor(props){
        super(props);
        this.handleFileUpload = this.handleFileUpload.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
    }

    handleSubmit(e) {
		e.preventDefault()
		this.setState({ loading: true })

		const newKey = database.ref('posts/').push().key;
        let updates = {};
        let user = auth.currentUser;
        const postData = {
            caption : this.state.caption,
            imageUrl: this.state.imageUrl,
            timestamp: new Date().valueOf(),
            author: user.email,
            key: newKey
        };
        updates['/posts/' + newKey] = postData;
        
        return database.ref().update(updates).then(() =>{
            this.setState({loading: false, open: false})
        });
	}
    
    handleFileUpload(e) {
        const { user } = this.props;
        const file = e.target.files[0];
        const storageRef = storage.ref('images/' + user.email +"/" + file.name);
        this.setState({loading: true});
        var task = storageRef.put(file);

        task.on('state_changed',
            (snapshot) => {
                let percentage = (snapshot.bytesTransferred/ snapshot.totalBytes) * 100;
                this.setState({percentage});
            },
            (err) => {
                console.log(err);
            },
            () => {
                let imageUrl = task.snapshot.downloadURL;
                this.setState({imageUrl,loading: false});
            }
        )
       
    }

    newModal(){
        this.setState({
            caption: "",
            percentage: 0,
            imageUrl: "https://react.semantic-ui.com/assets/images/avatar/large/rachel.png",
            loading: false,
            open: true
        });
        
    }


    render(){
        const { caption, open, loading, imageUrl, placeholderImage } = this.state;
        const { user } = this.props;
        const postButton = <Button loading={loading} onClick={this.handleSubmit} positive disabled={imageUrl === placeholderImage}>Post</Button>
        return(
            <Modal open={ open } trigger={<Button icon='upload' onClick={() => this.newModal()} positive disabled={!user} ></Button>}>
                <Modal.Header>Share your Picture</Modal.Header>
                <Modal.Content image>
                    <Image wrapped size='medium' src={this.state.imageUrl} />
                    <Modal.Description>
                        <Header>Caption</Header>
                        <Form >
                            <Input type="file" onChange={this.handleFileUpload} />
                            <TextArea name="caption" value={caption} onChange={this.handleChange} placeholder="Caption..." />
                        </Form>
                        
                    </Modal.Description>
                </Modal.Content>
                <Modal.Content>
                    <Progress percent={this.state.percentage} indicating progress='percent' autoSuccess></Progress>
                </Modal.Content>
                <Modal.Actions>
                    {postButton}
                    <Button onClick={()=> this.setState({open: false})} >Cancel</Button>
                </Modal.Actions>
                
                
            </Modal>
        )
    }


}