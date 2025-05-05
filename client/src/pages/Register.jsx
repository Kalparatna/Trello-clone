import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = ({ setIsLoggedIn }) => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [googleScriptLoaded, setGoogleScriptLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => setGoogleScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) document.body.removeChild(existingScript);
    };
  }, []);

  useEffect(() => {
    if (googleScriptLoaded && window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse,
      });

      window.google.accounts.id.renderButton(
        document.getElementById('googleRegisterBtn'),
        { type: 'standard', theme: 'outline', size: 'large', width: '100%', text: 'signup_with' }
      );
    }
  }, [googleScriptLoaded]);

  const handleGoogleResponse = async (response) => {
    try {
      const res = await axios.post('http://localhost:5000/api/google-register', {
        token: response.credential,
      });

      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Google registration failed');
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://localhost:5000/api/register', formData);
      localStorage.setItem('token', res.data.token);
      setIsLoggedIn(true);
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  return (
<div className="flex min-h-screen bg-white justify-center items-center">
  <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-4">
    <div className="w-full max-w-md">
      {/* Trello logo */}
      <div className="flex justify-center mb-8">
        <div className="text-center">
          <svg className="h-8 w-8 text-blue-600 mx-auto" viewBox="0 0 24 24" fill="currentColor">
            <rect width="10" height="10" x="2" y="7" rx="1" />
            <rect width="10" height="10" x="14" y="7" rx="1" />
          </svg>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">Trello</h1>
        </div>
      </div>
      
      <div className="bg-white w-full rounded-lg p-6">
        <h2 className="text-center text-xl font-semibold text-gray-800 mb-6">Sign up for your account</h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                By signing up, you confirm that you've read and accepted our 
                <Link to="#" className="text-blue-600 hover:underline mx-1">Terms of Service</Link>
                and
                <Link to="#" className="text-blue-600 hover:underline mx-1">Privacy Policy</Link>.
              </p>
            </div>
            
            <div>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
              >
                {showPassword ? (
                  <span className="text-sm">Hide</span>
                ) : (
                  <span className="text-sm">Show</span>
                )}
              </button>
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Sign up
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Or sign up with</span>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <div id="googleRegisterBtn" className="w-full"></div>
            
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 21 21" fill="currentColor">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 23 23">
                  <path fill="#f3f3f3" d="M0 0h23v23H0z"/>
                  <path fill="#f35325" d="M1 1h10v10H1z"/>
                  <path fill="#81bc06" d="M12 1h10v10H12z"/>
                  <path fill="#05a6f0" d="M1 12h10v10H1z"/>
                  <path fill="#ffba08" d="M12 12h10v10H12z"/>
                </svg>
              </svg>
              <span>Sign up with Microsoft</span>
            </button>
            
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <span>Sign up with Apple</span>
            </button>
            
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5 15a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1h-2.5a1 1 0 0 0-.8.4l-1.5 2a1 1 0 0 1-1.6 0l-1.5-2a1 1 0 0 0-.8-.4H5z" fill="#E01E5A"/>
                <path d="M5.5 7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1zM18.5 7a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1z"/>
              </svg>
              <span>Sign up with Slack</span>
            </button>
          </div>

          <div className="mt-6 flex justify-center space-x-4 text-sm text-gray-600">
            <Link to="#" className="hover:underline">Getting problem in Sign Up?</Link>
            <span>•</span>
            <Link to="/login" className="hover:underline">login</Link>
          </div>
           
          <div className="mt-10">
            <div className="flex justify-center">
            <img 
              src="https://www.innoov.io/hs-fs/hubfs/Atlassian-blue-onecolor_2x-rgb-1024x128.png?width=480&height=180&name=Atlassian-blue-onecolor_2x-rgb-1024x128.png" 
              alt="Atlassian logo" 
              className="h-10" 
            />

            </div>
            <p className="text-center text-xs text-gray-500 mt-2">
              One account for Trello, Jira, Confluence and more
            </p>
            
            <div className="mt-6 text-center text-xs text-gray-500">
              <div className="flex justify-center space-x-4">
                <Link to="#" className="hover:underline">Privacy Policy</Link>
                <Link to="#" className="hover:underline">User Notice</Link>
              </div>
              <p className="mt-2">
                This site is protected by reCAPTCHA and the Google 
                <Link to="#" className="text-gray-700 hover:underline mx-1">Privacy Policy</Link>
                and
                <Link to="#" className="text-gray-700 hover:underline mx-1">Terms of Service</Link>
                apply.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

  );
};

export default Register;