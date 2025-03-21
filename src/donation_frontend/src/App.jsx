import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import DonationForm from './components/DonationForm';
import DonationList from './components/DonationList';
import Stats from './components/Stats';
import { donation_backend } from '../../declarations/donation_backend';
import { Principal } from '@dfinity/principal';
import { toast } from 'react-toastify';

function App() {
  const [donations, setDonations] = useState([]);
  const [totalDonations, setTotalDonations] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isOwner, setIsOwner] = useState(false);
  const [ownerAddress, setAddress] = useState(null);

  useEffect(() => {
    fetchData();
    checkOwner();
  }, []);

  async function fetchData() {
    try {
      setLoading(true);
      const memos = await donation_backend.getMemos();
      const total = await donation_backend.getTotalDonationCollected();
      
      setDonations(memos);
      setTotalDonations(Number(total));
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load donation data");
      setLoading(false);
    }
  }

  async function checkOwner() {
    try {
      const ownerStatus = await donation_backend.isOwner();
      if (ownerStatus){
        const address = await donation_backend.getOwner();
        setAddress(address);
        console.log(address);
      }
      setIsOwner(ownerStatus);
    } catch (error) {
      console.error("Error checking owner status:", error);
    }
  }

  async function handleDonation(donationData) {
    try {
      setLoading(true);
      
      // In a real app, you would integrate with the ICP ledger here
      // For now, we just record the donation in our canister
      await donation_backend.donate(
        donationData.name,
        donationData.message,
        Number(donationData.amount)
      );
      
      toast.success("Thank you for your donation!");
      await fetchData();
    } catch (error) {
      console.error("Error making donation:", error);
      toast.error("Failed to process donation");
      setLoading(false);
    }
  }

  return (
    <div className="app-container" style={styles.app_container}>
      <Header />
      <main style={{display: 'flex', justifyContent: 'center', flexGrow: 1, alignItems: 'center', marginTop: '100px'}}>
        <div className="container" style={{display: 'flex', padding: '10px 40px'}}>
          <div className="app-wrapper" style={{display: 'flex', gap: 20, 'flexDirection' : 'row', justifyContent: 'space-evenly', width: '100%'}}>
            <Stats 
              totalDonations={totalDonations} 
              donationCount={donations?.length}
              isOwner={isOwner}
              ownerAddress={ownerAddress}
              loading={loading}
            />
            <DonationForm onDonate={handleDonation} loading={loading} />
            <DonationList donations={donations} loading={loading} />
          </div>
        </div>
      </main>
      <footer style={{background: '#d5f4e6', padding: '10px 20px', justifyContent: 'center', position: 'fixed' , bottom: 0, width: '100vw'}}>
        <div className="container">
          <p style={{textAlign: 'center'}}>Powered by Internet Computer Protocol</p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  app_container : {
    "display" : 'flex',
    "flex-direction" : 'column'
  }
}

export default App;