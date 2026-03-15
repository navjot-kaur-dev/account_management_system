import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Dashboard = () => {
  const [balance, setBalance] = useState(0);
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName');

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/account/balance', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        const data = await res.json();
        if (res.ok) {
          setBalance(data.balance);
        } else {
          localStorage.removeItem('token');
          localStorage.removeItem('userName');
          navigate('/login');
        }
      } catch (err) {
        console.error('Failed to fetch balance');
      }
    };
    fetchBalance();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-[#F6F6F2] font-sans overflow-x-hidden">
      <div className="bg-white shadow-sm px-8 py-4 flex justify-between items-center border-b border-[#BADFE7]/30">
        <h1 className="font-extrabold text-[#388087] text-xl uppercase tracking-widest">Dashboard</h1>
        <div className="flex items-center gap-6">
          <span className="text-[#388087] font-bold uppercase text-xs tracking-wider">Welcome, {userName}</span>
          <button onClick={handleLogout} className="text-xs font-bold text-white bg-[#388087] hover:bg-[#6FB3B8] px-6 py-2 rounded uppercase tracking-widest transition-colors">Logout</button>
        </div>
      </div>
      <div className="max-w-3xl mx-auto mt-16 px-6">
        <div className="bg-white shadow-md border border-[#BADFE7]/30 p-10 text-center mb-8">
          <p className="text-[#6FB3B8] text-sm font-bold tracking-widest uppercase mb-2">Current Balance</p>
          <h2 className="text-5xl font-extrabold text-[#388087] tracking-tight">₹{balance}</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Link to="/transfer" className="flex items-center justify-center bg-[#6FB3B8] text-white px-8 py-6 font-bold uppercase tracking-widest hover:bg-[#388087] transition-colors shadow-sm text-center">Send Money</Link>
          <Link to="/statement" className="flex items-center justify-center bg-[#C2EDCE] text-[#388087] px-8 py-6 font-bold uppercase tracking-widest hover:bg-[#BADFE7] transition-colors shadow-sm text-center">View Statement</Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;