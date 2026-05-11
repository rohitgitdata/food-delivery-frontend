import { useState } from 'react';
import axios from 'axios';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {

        const res = await axios.post(
            'https://food-delivery-backend-eqch.onrender.com/api/users/login',
            {
                email,
                password
            }
        );

        localStorage.setItem('token', res.data.token);

        alert('Login Successful');
    };

    return (

        <div>

            <h1>Login</h1>

            <input
            type='email'
            placeholder='Enter Email'
            onChange={(e)=>setEmail(e.target.value)}
            />

            <br /><br />

            <input
            type='password'
            placeholder='Enter Password'
            onChange={(e)=>setPassword(e.target.value)}
            />

            <br /><br />

            <button onClick={handleLogin}>
                Login
            </button>

        </div>
    );
}

export default Login;