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

        if(res.status === 200){
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('type', res.data.type);
            const type = res.data.type
            if(type === 'admin'){
                console.log(type);
            }
            else if(type == 'mentee'){
                console.log(type);
            }
            else if(type === 'mentor'){
                console.log(type)
            }
            navigate('/');
        }        
    } catch (error) {
        if (error.response && error.response.status === 400) {
            // handle wrong password logic
        }
        else if (error.response && error.response.status === 401){
            // handle pls signup logic
        }
    }
}

export default handleSubmit;
