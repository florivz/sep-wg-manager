import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Header from '../components/Header';

function Register() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [registerResponse, setRegisterResponse] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5001/api/user', {
                username,
                password,
                email
            });
            if (response.data.success) {
                console.log(response.data)
                login(response.data);
                navigate('/home');
            } else {
                setRegisterResponse(response.data.message);
            }
        } catch (error) {
            setRegisterResponse(error.response ? error.response.data.message : 'Registrierung fehlgeschlagen: Netzwerkfehler');
            console.error(error);

        }
    };

    return (
        <div>
            <Header simple={true} />
            <div className="container mt-5">
                <h1 className="text-center mb-4">Registrierung</h1>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Registrierungsdaten</div>
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
                                    <div className="form-group">
                                        <label>Email:</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <button className='btn btn-primary mt-2' type="submit">Register</button>
                                    {registerResponse && <div className="mt-2 text-danger">{registerResponse}</div>}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
