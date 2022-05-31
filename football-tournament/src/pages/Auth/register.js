import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import ClipLoader from 'react-spinners/ClipLoader';

import Form from '../../components/Auth/Form';
import Input from '../../components/Auth/Input';
import { authenticate } from '../../services/auth';
import { DEFAULT_HEADERS } from '../../utils/headers';
import AuthContext from '../../context/AuthContext'

import './index.scss';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [_, setCookie] = useCookies(['jwt']);

  const context = useContext(AuthContext)
  const navigation = useNavigate();

  const onSubmit = async () => {
    setLoading(true);

    const res = await authenticate('register', 'POST', DEFAULT_HEADERS, {
      username,
      password,
    });
    const token = await res.json();

    if (res.ok) {
      setCookie('jwt', token);
      setLoading(false);
      context.setAuthenticated(true)
      navigation('/home');
    } else {
      setErrorMessage('Register failed');
      setLoading(false);
    }
  };

  return (
    <div>
      <div className='container'>
        <header className='head-form'>
          <h2>Register</h2>
        </header>
        <Form>
          <Input
            label='Username'
            id='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            label='Password'
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={onSubmit} className='auth-btn'>
            Register
          </button>
        </Form>
        {loading && (
          <div className='loader'>
            <ClipLoader color='#ffff' loading={loading} size={150} />
          </div>
        )}
        {errorMessage && <div className='error'>{errorMessage}</div>}
      </div>
    </div>
  );
};

export default Register;
