import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const handleSignUpSubmit = async (user, setError, navigate) => {
    try {
        const res = await axios.post('/auth/users/signup', user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(res.status === 200){
            navigate('/login');
        }
    } catch (error) {
        if (error.response && error.response.status === 400) {
            setError("Email Already Exists, Pls Login");
        } else {
            setError('An error occurred');
        }
    }
};

export default handleSignUpSubmit;