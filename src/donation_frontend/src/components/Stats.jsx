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
    <div className="stats-container" style={{background: '#fefbd8', borderRadius: '16px', padding: '10px', flex: 1, border: '3px solid black'}}>
      <div className="stats-card">
        <div className="stat-item">
          <h3 style={{fontWeight: '600', marginBottom: '5px', fontSize:'2rem' }}>Total Donations:</h3>
          <span className="stat-value" style={{fontSize:'1.5rem', backgroundColor:'lightgray', padding:'0.2rem', border:'2px solid black', borderRadius:'5px'}}>{formatAmount(totalDonations)} ICP</span>
        </div>
        
        <div className="stat-item" style={{marginTop:'2rem'}}> 
          <h3 style={{fontSize:'2rem', fontWeight:'600'}}>Number of Donations:</h3>
          <span className="stat-value" style={{fontSize:'1.5rem', backgroundColor:'lightgray', padding:'0.2rem', border:'2px solid black', borderRadius:'5px'}}>{donationCount}</span>
        </div>
        
  
          <div className="owner-section" style={{marginTop:'2rem'}}>
            <h3 style={{fontSize:'2rem', fontWeight:'600'}}>Owner Dashboard</h3>
            <div>
              <a style={{color: "blue", fontSize: '1.2rem'}} href={`https://dashboard.internetcomputer.org/canister/${process.env.CANISTER_ID_DONATION_BACKEND}`} target='_blank'>Canister Address</a>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Stats;