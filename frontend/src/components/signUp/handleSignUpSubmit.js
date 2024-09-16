import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const handleSignUpSubmit = async (user, setError) => {
    try {
        const response = await axios.post('/api/users/signup', user, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log('User registered:', response.data);
        // Redirect or show success message
    } catch (error) {
        setError('An error occurred');
    }
};

export default handleSignUpSubmit;