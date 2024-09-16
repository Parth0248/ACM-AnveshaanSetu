import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const handleSubmit = async (credentials, navigate) => {
    try {

        const res = await axios.post('/auth/login', credentials,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        
        localStorage.setItem('token', res.data.token);

        navigate('/');
    } catch (err) {
        console.log(err);
    }
}

export default handleSubmit;
