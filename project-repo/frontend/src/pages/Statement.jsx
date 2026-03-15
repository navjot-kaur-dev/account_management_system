import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Statement = () => {
  const [statements, setStatements] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStatement = async () => {
      try {
        const res = await fetch('http://localhost:3000/api/account/statement', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await res.json();
        
        if (res.ok) {
          setStatements(data);
        } else {
          setError('Failed to fetch statement');
          if (res.status === 401) {
            localStorage.removeItem('token');
            navigate('/login');
          }
        }
      } catch (err) {
        setError('Server error while fetching statement');
      }
    };

    fetchStatement();
  }, [navigate]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="min-h-screen bg-[#F6F6F2] p-6 font-sans relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C2EDCE] rounded-full blur-3xl opacity-20 -z-10"></div>
      
      <div className="max-w-5xl mx-auto mt-12 z-10 relative">
        <div className="mb-8">
          <Link to="/dashboard" className="text-xs font-bold text-[#BADFE7] uppercase tracking-widest hover:text-[#6FB3B8] transition-colors">
            &larr; Back to Dashboard
          </Link>
          <h1 className="text-4xl font-extrabold text-[#6FB3B8] uppercase tracking-wide mt-4">Account Statement</h1>
        </div>

        {error && (
          <div className="bg-red-50 text-red-500 p-4 text-sm font-bold mb-6 border border-red-100">
            {error}
          </div>
        )}

        <div className="bg-white shadow-2xl border border-[#BADFE7]/30 overflow-hidden rounded-none">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left">
              <thead>
                <tr className="border-b border-[#BADFE7]/50">
                  <th className="px-8 py-5 text-xs font-bold text-[#BADFE7] uppercase tracking-widest">Date</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#BADFE7] uppercase tracking-widest">Type</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#BADFE7] uppercase tracking-widest">Amount</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#BADFE7] uppercase tracking-widest">From</th>
                  <th className="px-8 py-5 text-xs font-bold text-[#BADFE7] uppercase tracking-widest">To</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F6F6F2]">
                {statements.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-8 py-10 text-center text-sm font-bold text-[#BADFE7] uppercase tracking-widest">
                      No transactions found
                    </td>
                  </tr>
                ) : (
                  statements.map((item) => (
                    <tr key={item.id} className="hover:bg-[#F6F6F2]/50 transition-colors">
                      <td className="px-8 py-6 text-sm text-[#388087] font-bold">
                        {formatDate(item.created_at)}
                      </td>
                      {/* STRICT PROJECT REQUIREMENT: Green for Credit, Red for Debit */}
                      <td className={`px-8 py-6 text-sm font-bold uppercase tracking-wide ${item.transaction_type === 'credit' ? 'text-green-500' : 'text-red-500'}`}>
                        {item.transaction_type === 'credit' ? 'Credit' : 'Debit'}
                      </td>
                      <td className="px-8 py-6 text-lg text-[#388087] font-extrabold tracking-tight">
                        ₹{item.amount}
                      </td>
                      <td className="px-8 py-6 text-sm text-[#388087] font-medium">
                        {item.transaction_type === 'credit' ? item.sender.name : 'You'}
                      </td>
                      <td className="px-8 py-6 text-sm text-[#388087] font-medium">
                        {item.transaction_type === 'credit' ? 'You' : item.receiver.name}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statement;