import React from 'react';

function Stats({ totalDonations, donationCount, isOwner, ownerAddress="", loading }) {
  // Function to format ICP amount
  const formatAmount = (amount) => {
    return (Number(amount)); // Convert from e8s to ICP
  };

  if (loading) {
    return (
      <div className="stats-container">
        <div className="loading">Loading stats...</div>
      </div>
    );
  }

  return (
    <div className="stats-container" style={{background: '#fefbd8', borderRadius: '16px', padding: '10px', flex: 1}}>
      <div className="stats-card">
        <div className="stat-item">
          <h3 style={{fontWeight: '600', marginBottom: '10px'}}>Total Donations</h3>
          <p className="stat-value">{formatAmount(totalDonations)} ICP</p>
        </div>
        
        <div className="stat-item">
          <h3>Number of Donations</h3>
          <p className="stat-value">{donationCount}</p>
        </div>
        
        {isOwner && ownerAddress && (
          <div className="owner-section">
            <h3>Owner Dashboard</h3>
            <p>{`${isOwner ? 'You are the owner' : 'you are not the owner'}`}</p>
          </div>
        ) }
      </div>
    </div>
  );
}

export default Stats;