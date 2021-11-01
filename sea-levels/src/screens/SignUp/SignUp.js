import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import './SignUp.css';

export default function Signup() {
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const { signup } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match');
        }

        try {
            setError('');
            setLoading(true);
            await signup(emailRef.current.value, passwordRef.current.value);
            history.push('/');
        } catch {
            setError('Failed to create an account');
        }
        setLoading(false);
        history.push('/profile');
    }

    return (
        <div className="signup-page">
            <div className="bg" />
            <div className="form-content">
                <div className="wrapper">
                    <h2>Create an account</h2>

                    <Form onSubmit={handleSubmit}>
                    <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <div className="form-options">
                            <div>
                                <input type="radio" id="remember-me" />
                                <label for="remember-me">Remember me</label>
                            </div>
                        </div>
                        <Button disabled={loading} className="w-100" type="submit">SIGN UP</Button>
                    </Form>

                    <div className="login">
                        <span>Already a member? <Link to= "/login">Log in</Link></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
