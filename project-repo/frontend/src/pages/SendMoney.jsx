import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SendMoney = () => {
  const [users, setUsers] = useState([]);
  const [receiverId, setReceiverId] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data);
        }
      } catch (err) {
        setError('Failed to load users');
      }
    };

    fetchUsers();
  }, []);

  const handleTransfer = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      const res = await fetch('http://localhost:3000/api/account/transfer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ receiver_id: receiverId, amount: Number(amount) }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage('Transfer successful!');
        setAmount('');
        setReceiverId('');
        setTimeout(() => navigate('/dashboard'), 2000);
      } else {
        setError(data.message || data.error || 'Transfer failed');
      }
    } catch (err) {
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F6F2] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-[#6FB3B8] opacity-10"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full border border-[#C2EDCE]"></div>

      <div className="max-w-md w-full bg-white shadow-2xl p-10 z-10 border border-[#BADFE7]/30">
        <div className="mb-8">
          <Link to="/dashboard" className="text-xs font-bold text-[#BADFE7] uppercase tracking-widest hover:text-[#6FB3B8] transition-colors">
            &larr; Back
          </Link>
          <h2 className="text-3xl font-extrabold text-[#388087] uppercase tracking-wide mt-4">Send Money</h2>
        </div>

        <form onSubmit={handleTransfer} className="space-y-6">
          {error && <div className="bg-red-50 text-red-500 p-3 text-sm border border-red-100">{error}</div>}
          {message && <div className="bg-[#C2EDCE]/30 text-[#388087] p-3 text-sm border border-[#C2EDCE] font-bold">{message}</div>}

          <div>
            <label className="block text-xs font-bold text-[#388087] uppercase tracking-wide mb-1">Select Recipient</label>
            <select
              required
              value={receiverId}
              onChange={(e) => setReceiverId(e.target.value)}
              className="appearance-none block w-full px-3 py-3 border-b-2 border-[#BADFE7] bg-[#F6F6F2]/50 focus:bg-white focus:outline-none focus:border-[#6FB3B8] text-[#388087] transition-colors"
            >
              <option value="" disabled>Select a user...</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#388087] uppercase tracking-wide mb-1">Amount (₹)</label>
            <input
              type="number"
              min="1"
              required
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="appearance-none block w-full px-3 py-3 border-b-2 border-[#BADFE7] bg-[#F6F6F2]/50 focus:bg-white focus:outline-none focus:border-[#6FB3B8] text-[#388087] transition-colors"
              placeholder="Enter amount"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 rounded-full text-sm font-bold text-white bg-[#6FB3B8] hover:bg-[#388087] focus:outline-none transition-colors uppercase tracking-widest"
            >
              Transfer Funds
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SendMoney;