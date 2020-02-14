import React, {useState }from "react";
import auth from "../../auth";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'


export const Landing = props => {

    const [userPassword, setUserPassword] = useState('userPassword')
    const [authMessage, setAuthMessage] = useState('')

    const authSuccess = () => {
        setAuthMessage('');
        props.history.push("/private")
    }

    const authFail = () => {
        setAuthMessage('please enter a valid password');
    }

    const loginUser = (e) => {
        e.preventDefault();
        auth.login(userPassword, authSuccess, authFail);
    };

    return (
        <div id="landingWrapper"  >
            <Navbar className="landingCustomNavbar" collapseOnSelect expand="lg" variant="dark">
              
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <span id="landingNavMainline"> <p id="landingNavSub">STORMWATER UTILITY</p></span>
                        <span id="landingNavTagline">Application</span>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>


            <div id="landingContent">
                
                <h5 id="testPassword">Test password is: starcity</h5>
        
                <Form onSubmit={loginUser}>
                    <Form.Group id="passwordField" controlId="formHorizontalPassword">
                        <Form.Control onChange={e => setUserPassword(e.target.value)} type="password" placeholder="Password" />
                        <Button id="loginButton" type="submit" variant="outline-light" size="sm" >Accept</Button>
                    </Form.Group>

                    <p><small>{authMessage}</small></p>

                </Form>
            </div>
        </div>
    );
};


export default Landing;