import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      
      if (res.ok) {
        login(data);
        navigate('/dashboard');
      } else {
        setError(data.error || data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F6F6F2] font-sans py-12 px-4">
      <div className="max-w-md w-full bg-white shadow-md border border-[#BADFE7]/30 p-10">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-extrabold text-[#388087] uppercase tracking-wide">Sign Up</h2>
        </div>
        <form className="space-y-6" onSubmit={handleSignup}>
          {error && <div className="bg-red-50 text-red-500 p-3 text-sm border border-red-100">{error}</div>}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#388087] uppercase tracking-wide mb-1">Full Name</label>
              <input type="text" required className="appearance-none block w-full px-3 py-3 border border-[#BADFE7] bg-[#F6F6F2]/50 focus:bg-white focus:outline-none focus:border-[#6FB3B8] text-[#388087]" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#388087] uppercase tracking-wide mb-1">Email address</label>
              <input type="email" required className="appearance-none block w-full px-3 py-3 border border-[#BADFE7] bg-[#F6F6F2]/50 focus:bg-white focus:outline-none focus:border-[#6FB3B8] text-[#388087]" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#388087] uppercase tracking-wide mb-1">Password</label>
              <input type="password" required className="appearance-none block w-full px-3 py-3 border border-[#BADFE7] bg-[#F6F6F2]/50 focus:bg-white focus:outline-none focus:border-[#6FB3B8] text-[#388087]" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
          <button type="submit" disabled={isLoading} className="w-full flex justify-center py-4 px-4 text-sm font-bold text-white bg-[#6FB3B8] hover:bg-[#388087] transition-colors uppercase tracking-widest disabled:opacity-50">
            {isLoading ? 'Processing...' : 'Register'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm">
          <span className="text-[#388087]">Already have an account? </span>
          <Link to="/login" className="font-bold text-[#6FB3B8] hover:text-[#388087] uppercase transition-colors">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;