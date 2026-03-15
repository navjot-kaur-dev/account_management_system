import supabase from '../config/supabaseClient.js';

export const getBalance = async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select('balance').eq('id', req.user).single();
        if (error) return res.status(400).json({ error: error.message });
        res.json({ balance: data.balance });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const transfer = async (req, res) => {
    const { receiver_id, amount } = req.body;
    const sender_id = req.user;
    const transferAmount = Number(amount);

    if (transferAmount <= 0) return res.status(400).json({ message: 'Invalid amount' });

    try {
        const { data: sender, error: senderError } = await supabase.from('users').select('balance').eq('id', sender_id).single();
        if (senderError || sender.balance < transferAmount) return res.status(400).json({ message: 'Insufficient balance' });

        const { data: receiver, error: receiverError } = await supabase.from('users').select('balance').eq('id', receiver_id).single();
        if (receiverError || !receiver) return res.status(400).json({ message: 'Receiver not found' });

        const newSenderBalance = Number(sender.balance) - transferAmount;
        const newReceiverBalance = Number(receiver.balance) + transferAmount;

        await supabase.from('users').update({ balance: newSenderBalance }).eq('id', sender_id);
        await supabase.from('users').update({ balance: newReceiverBalance }).eq('id', receiver_id);

        await supabase.from('transactions').insert([
            { sender_id, receiver_id, amount: transferAmount, transaction_type: 'debit' },
            { sender_id, receiver_id, amount: transferAmount, transaction_type: 'credit' }
        ]);

        res.json({ message: 'Transfer successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getStatement = async (req, res) => {
    try {
        const { data, error } = await supabase
            .from('transactions')
            .select('id, amount, transaction_type, created_at, sender_id, receiver_id, sender:users!sender_id(name), receiver:users!receiver_id(name)')
            .or(`and(sender_id.eq.${req.user},transaction_type.eq.debit),and(receiver_id.eq.${req.user},transaction_type.eq.credit)`)
            .order('created_at', { ascending: false });

        if (error) return res.status(400).json({ error: error.message });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const { data, error } = await supabase.from('users').select('id, name, email').neq('id', req.user);
        if (error) return res.status(400).json({ error: error.message });
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};