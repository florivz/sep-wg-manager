import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';

function Login() {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Send a POST request to the server for login
            const response = await axios.post('http://localhost:5001/api/login', {
                username,
                password,
            });

            // Check if the response status is 200 (OK)
            if (response.status === 200) {
                // If successful, log the user in and navigate to the home page
                login(response.data);
                navigate('/home');
            } else {
                // If the status code is not 200, set an error message
                setLoginError('Login failed: Invalid status code');
            }
        } catch (error) {
            // Handle errors that occur during the API request
            if (error.response) {
                // If the server responds with an error message, set it as the error
                setLoginError(error.response.data);
            } else {
                // If there's a network error or other unhandled error, set a generic error message
                setLoginError('Login failed: Network error');
            }
            // Log the error to the console for debugging purposes
            console.error(error);
            // Display an alert to the user with a generic error message
            window.alert('Login failed: Incorrect username or password');
        }
    };

    return (
        <div>
            <Header simple={true} />
            <div className="container mt-5">
                <h1 className="text-center mb-4">Login</h1>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Login</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label>Nutzername:</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Passwort:</label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-2">
                                        Login
                                    </button>
                                </form>
                            </div>
                        </div>
                        <button
                            className="btn btn-info mt-2 col-md-12"
                            onClick={() => navigate('/register')}
                        >
                            Registrieren
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
