import axios from 'axios';

axios.defaults.baseURL = process.env.REACT_APP_API_URL;

const handleSubmit = async (credentials, navigate, setError) => {
    try {
        const email_regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

        if(credentials.email === '' || credentials.password === '' || !email_regex.test(credentials.email)){
            setError('Please enter valid email and password');
        }
        else{
            setError('');
        }

        
        const res = await axios.post('/auth/login', credentials,
        {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if(res.status === 200){
            const type = res.data.type
            
            localStorage.setItem('User', res.data.token);
            localStorage.setItem('type', res.data.type);
            
            
            if(type === 'admin'){
                navigate('/adminDashboard');
            }
            else if(type === 'mentee'){
                navigate('/');
            }
            else if(type === 'mentor'){
                navigate('/mentorDashboard');
            }
            
        }        
    } catch (error) {
        if(error.response.status === 500){
            navigate("/serverError")
        }
        else if(error.response.status === 401){
            navigate("/unauthorized")
        }
    }
}

export default handleSubmit;
