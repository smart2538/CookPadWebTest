import React, { Component } from 'react'
import { Button, Form, Header, Modal, Message, Menu } from 'semantic-ui-react'
import { auth } from './../Firebase.js'


export default class ModlRegisterSignin extends Component {
    state = {
            loading: false,
            open: false,
            email: "",
            password: "",
            error: false,
            errorMessage: ""
        };

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value })
        
    }

    handleSubmit(e) {
		e.preventDefault()
		this.setState({ loading: true })
        const { email, password } = this.state; 
        if(e.target.name === "signup"){
            auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorCode, errorMessage);
                return error;
            })
            .then((error) => {
                if(!error){
                    auth.signInWithEmailAndPassword(email, password).catch(function(error) {
                        // Handle Errors here.
                        var errorCode = error.code;
                        var errorMessage = error.message;
                        console.log(errorCode, errorMessage);
                        // ...
                    }).then(() => {
                        this.setState({loading: false, open: false});
                    });
                }else{
                    this.setState({loading: false, error: true, errorMessage: error.message});
                }
                
            });
        }else if(e.target.name === "signin"){
            auth.signInWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
                console.log(errorCode, errorMessage);
            })
            .then(() => {
                this.setState({loading: false, open: false});
            });
        }
        

	}


    newModal(){
        this.setState({
            loading: false,
            open: true
        });
        
    }


    render(){
        const {open, loading, error, errorMessage } = this.state;
        return(
            <Modal open={open} trigger={<Menu.Item onClick={() => this.newModal()}>Register / Log In</Menu.Item>}>
                <Modal.Header>Email</Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Header>Log In</Header>
                        <Form error={error} loading={loading} size='huge'>
                            <input name="email" type="email" onChange={this.handleChange} />
                            <input name="password" type="password" onChange={this.handleChange} />
                            <Message
                                error
                                header='Action Forbidden'
                                content={errorMessage}
                            />
                        </Form>
                        
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button loading={loading} onClick={()=> this.setState({open: false})} >Cancel</Button>
                    <Button name="signin" loading={loading} onClick={this.handleSubmit} primary >Sign in</Button>
                    <Button name="signup" loading={loading} onClick={this.handleSubmit} positive >Sign up</Button>
                </Modal.Actions>
                
                
            </Modal>
        )
    }


}