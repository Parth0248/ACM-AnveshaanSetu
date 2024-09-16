import axios from 'axios';

// API 

const handleGoogleOauth = async () => {
  try {
    const res = await axios.get('/auth/google');
    window.location.href = res.data;
  } catch (err) {
    console.error(err);
  }
};

export default handleGoogleOauth;