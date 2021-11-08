import React, { useRef, useState } from 'react';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuth } from '../../contexts/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import './Login.css';

export default function Login() {    
    const history = useHistory();
    const emailRef = useRef();
    const passwordRef = useRef();
    const { login } = useAuth();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        try {
            setError('');
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            history.push('/dashboard');
        } catch {
            setError('Failed to log in');
        }
        setLoading(false);
    }

    return (
        <div className="login-page">
            <div className="bg" />
            <div className="form-content">
                <div className="wrapper">
                    <h5>Welcome back</h5>
                    <h2>Login to continue</h2>

                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        <div className="form-options">
                            <div>
                                <input type="radio" id="remember-me" />
                                <label for="remember-me">Remember me</label>
                            </div>

                            <div>
                                <span>Forgot password?</span>
                            </div>
                        </div>
                        <Button disabled={loading} className="w-100" type="submit">LOG IN</Button>
                    </Form>

                    <div className="join">
                        <span>Don't have an account? <Link to= "/signup">Join free today</Link></span>
                    </div>
                </div>
            </div>
        </div>
    );
}
