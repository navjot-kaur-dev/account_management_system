import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data);
        navigate('/dashboard');
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-[#F6F6F2]">
      <div className="w-full max-w-md bg-white p-10 shadow-2xl border border-[#BADFE7]/40">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-extrabold text-[#388087] uppercase tracking-tighter">Login</h2>
        </div>
        
        <form className="space-y-6" onSubmit={handleLogin}>
          {error && <div className="bg-red-50 text-red-500 p-3 text-sm border border-red-100">{error}</div>}
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#388087] uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                required 
                className="w-full px-4 py-3 border border-[#BADFE7] bg-[#F6F6F2]/30 focus:bg-white focus:outline-none focus:border-[#6FB3B8] text-[#388087] transition-all" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#388087] uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                required 
                className="w-full px-4 py-3 border border-[#BADFE7] bg-[#F6F6F2]/30 focus:bg-white focus:outline-none focus:border-[#6FB3B8] text-[#388087] transition-all" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading} 
            className="w-full py-4 text-sm font-bold text-white bg-[#6FB3B8] hover:bg-[#388087] transition-all uppercase tracking-[0.2em] shadow-lg disabled:opacity-50"
          >
            {isLoading ? 'Processing...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-8 text-center text-xs tracking-widest uppercase text-[#388087]">
          Don't have an account? <Link to="/signup" className="font-bold text-[#6FB3B8] hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;