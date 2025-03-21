import React from 'react';
import "../styling/donation_list.css";

function DonationList({ donations, loading }) {
  // Function to format timestamp
  const formatDate = (timestamp) => {
    const date = new Date(Number(timestamp) / 1000000); // Convert nanoseconds to milliseconds
    return date.toLocaleString();
  };

  // Function to format ICP amount
  const formatAmount = (amount) => {
    return Number(amount); // Convert from e8s to ICP
  };

  if (loading) {
    return (
      <div className="donation-list-container">
        <h2>Recent Donations</h2>
        <div className="loading">Loading donations...</div>
      </div>
    );
  }

  return (
    <div className="donation-list-container" style={{background: '#fefbd8', borderRadius: '16px', padding: '10px', flex: 1}}>
      <h2 style={{fontWeight: '600'}}>Recent Donations</h2>
      
      {donations.length === 0 ? (
        <div className="no-donations">
          <p>No donations yet. Be the first to donate!</p>
        </div>
      ) : (
        <div className="donation-table-container">
        <table className="donation-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount (ICP)</th>
              <th>Message</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {donations.slice().reverse().map((donation, index) => (
              <tr key={index}>
                <td>{donation.name}</td>
                <td>{formatAmount(donation.amount)}</td>
                <td>{donation.message}</td>
                <td>{formatDate(donation.timestamp)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>      
      )}
    </div>
  );
}

export default DonationList;