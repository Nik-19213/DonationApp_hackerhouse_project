import React, { useState } from 'react';

function DonationForm({ onDonate, loading }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [amount, setAmount] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      newErrors.amount = 'Please enter a valid amount greater than 0';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onDonate({
        name,
        message,
        amount
      });
      
      // Reset form
      setName('');
      setMessage('');
      setAmount('');
    }
  };

  return (
    <div className="donation-form-container" style={{background: '#fefbd8', borderRadius: '16px', padding: '10px', flex: 1}}>
      <h2 style={{fontWeight: '600', marginBottom: '10px'}}>Make a Donation</h2>
      <form onSubmit={handleSubmit} className="donation-form">
        <div className="form-group" style={{display: 'flex', flexDirection: 'row', gap: 10}}>
          <label htmlFor="name">Your Name</label>
          <input
            style={{background: '#fff'}}
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={loading}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        
        <div className="form-group" style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          <label htmlFor="message">Message</label>
          <textarea
            style={{background: '#fff'}}
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="3"
            disabled={loading}
          ></textarea>
          {errors.message && <span className="error">{errors.message}</span>}
        </div>
        
        <div className="form-group" style={{display: 'flex', flexDirection: 'column', gap: 10}}>
          <label htmlFor="amount">Amount (ICP)</label>
          <input
            style={{background: '#fff'}}
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="0"
            step="1"
            disabled={loading}
          />
          {errors.amount && <span className="error">{errors.amount}</span>}
        </div>
        <div style={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center',}}>
          <button 
            type="submit" 
            className="donate-button"
            style={{border: '#000 2px solid', padding: '.1em', marginTop: '10px', cursor: 'pointer'}}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Donate Now'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default DonationForm;