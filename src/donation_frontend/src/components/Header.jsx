import React from 'react';
import "../styling/header.css";

function Header() {
  return (
    <header style={{background: '#d5f4e6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="container" style={styles.container}>
        <div className="header-content" style={styles.headerContent}>
          <div className="logo">
            <h1 style={{fontWeight: 'bolder', fontSize:'1.5rem'}}>DonorTrust</h1>
          </div>
          <nav>
            <ul style={{"display" : 'flex', "flexDirection" : 'row', gap: 20}}>
              <li><a style={styles.listItem} href="https://internetcomputer.org/" target="_blank" rel="noopener noreferrer">About ICP</a></li>
              <li><a style={styles.listItem} href="https://github.com/Nik-19213" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    background: '#d5f4e6',
    padding: '10px 20px',
    alignSelf: 'center',
    transition: 'background 0.3s ease-in-out'
  },
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    transition: 'all 0.3s ease-in-out'
  },
  listItem: {
    transition: 'color 0.3s ease-in-out',
  }
}

export default Header;