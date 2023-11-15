import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginResponse, setLoginResponse] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5001/api/login', {
                username,
                password
            });

            if (response.status === 200) {
                login(response.data);
                navigate('/home');
            } else {
                setLoginResponse('Login fehlgeschlagen: Ungültiger Statuscode');
            }
        } catch (error) {
            setLoginResponse(error.response ? error.response.data : 'Login fehlgeschlagen: Netzwerkfehler');
            console.error(error);
        }
    };

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Login</h1>
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-header">Login</div>
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Username:</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Password:</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mt-2">Login</button>
                                <div className='mt-2'>
                                    <pre>{JSON.stringify(loginResponse, null, 0)}</pre>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
