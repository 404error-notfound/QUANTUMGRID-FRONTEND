// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import './App.css';

// Dummy data
const mockUserData = {
  username: "Angela Omondi",
  currentTokens: 45,
  usageHistory: [
    { month: "January", usage: 120 },
    { month: "February", usage: 98 },
    { month: "March", usage: 145 }
  ],
  paymentHistory: [
    { date: "2024-01-15", amount: 2000, tokens: 97, method: "M-PESA" },
    { date: "2024-02-10", amount: 1500, tokens: 73, method: "Bank Transfer" },
    { date: "2024-03-05", amount: 2500, tokens: 121, method: "PayPal" }
  ]
};

const TOKEN_RATE = 20.57; // 1 Token = Ksh 20.57
const ENERGY_RATE = 1; // 1 Token = 1kWh

// Login Page
const LoginPage = ({ onNavigate, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    // accept any non-empty username/password
    if (username && password) {
      setError('');
      onLogin(username);
      onNavigate('dashboard');
    } else {
      setError('Please enter both username and password.');
    }
  };
  return (
    <div className="login-page" style={{
      backgroundImage: "url('/backgrounds/Dashboard background.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative'
    }}>
      <div style={{
        background: 'rgba(255,255,255,0.97)',
        padding: '40px 30px',
        borderRadius: 15,
        boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        minWidth: 320,
        maxWidth: 350,
        zIndex: 2
      }}>
        <form className="login-form" onSubmit={handleLogin} style={{background: 'transparent', boxShadow: 'none', padding: 0}}>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          {error && <div className="error-message">{error}</div>}
          <button type="submit" style={{
            background: '#2d3748',
            color: '#fff',
            borderRadius: 6,
            padding: '10px 22px',
            border: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer'
          }}>Login</button>
          <p>
            Don't have an account?{' '}
            <span className="link" onClick={() => onNavigate('register')}>Register</span>
          </p>
        </form>
      </div>
      <div style={{width: '100%', position: 'absolute', left: 0, bottom: 0}}>
        <ContactFooter />
      </div>
    </div>
  );
};

// Registration Page
const RegistrationPage = ({ onNavigate, onRegister }) => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState('');
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleRegister = (e) => {
    e.preventDefault();
    if (form.username && form.email && form.password) {
      setError('');
      onRegister(form.username, form.email, form.password);
      setTimeout(() => onNavigate('dashboard'), 0);
    } else {
      setError('Please fill in all fields.');
    }
  };
  return (
    <div className="registration-page" style={{
      backgroundImage: "url('/backgrounds/Dashboard background.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }}>
      <form className="registration-form" onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        {error && <div className="error-message">{error}</div>}
        <button type="submit" style={{
          background: '#2d3748',
          color: '#fff',
          borderRadius: 6,
          padding: '10px 22px',
          border: 'none',
          fontWeight: 600,
          fontSize: '1rem',
          cursor: 'pointer'
        }}>Register</button>
        <p>
          Already have an account?{' '}
          <span className="link" onClick={() => onNavigate('login')}>Login</span>
        </p>
      </form>
    </div>
  );
};

// Welcome/Home Page 
const WelcomePage = ({ onNavigate, loggedIn }) => {
  return (
    <div className="welcome-page"
      style={{
        backgroundImage: "url('/backgrounds/Dashboard background.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
      }}
    >
      <div>
        <div className="welcome-header" style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 12, padding: '18px 0', marginBottom: 18 }}>
          <h1>QUANTUM GRID</h1>
          <p>Smart Energy Management System</p>
        </div>
        <div className="features-section" style={{ background: 'rgba(255,255,255,0.18)', borderRadius: 12, padding: '18px 0', marginBottom: 18 }}>
          <h3 style={{ color: '#fff' }}>Why Choose Quantum Grid?</h3>
          <div className="features-grid">
            <div className="feature-card" style={{ background: 'rgba(30,30,30,0.22)', borderRadius: 10, padding: '16px', color: '#fff', margin: '0 8px' }}>
              <div className="feature-icon">⚡</div>
              <h4 style={{ color: '#fff' }}>Smart Token Management</h4>
              <p style={{ color: '#e2e8f0' }}>Efficiently manage your energy tokens with our intelligent system</p>
            </div>
            <div className="feature-card" style={{ background: 'rgba(30,30,30,0.22)', borderRadius: 10, padding: '16px', color: '#fff', margin: '0 8px' }}>
              <div className="feature-icon">📱</div>
              <h4 style={{ color: '#fff' }}>Easy Mobile Payments</h4>
              <p style={{ color: '#e2e8f0' }}>Purchase tokens instantly using M-PESA, bank transfer, or PayPal</p>
            </div>
            <div className="feature-card" style={{ background: 'rgba(30,30,30,0.22)', borderRadius: 10, padding: '16px', color: '#fff', margin: '0 8px' }}>
              <div className="feature-icon">📊</div>
              <h4 style={{ color: '#fff' }}>Usage Analytics</h4>
              <p style={{ color: '#e2e8f0' }}>Track your energy consumption and optimize your usage patterns</p>
            </div>
          </div>
        </div>
        <div className="welcome-content">
          <div className="welcome-hero" style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 15, boxShadow: '0 5px 20px rgba(0,0,0,0.08)', padding: '30px 20px', margin: '0 auto' }}>
            <div className="hero-text">
              <h2>Quantum Grid</h2>
              <p>Your digital energy companion for smart token management</p>
              <div style={{display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 16}}>
                <button
                  className="signup-btn"
                  style={{
                    background: '#2d3748',
                    color: '#fff',
                    borderRadius: 6,
                    padding: '10px 22px',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => { setTimeout(() => onNavigate('register'), 0); }}
                  disabled={loggedIn}
                >
                  Sign Up
                </button>
                <button
                  className="login-btn"
                  style={{
                    background: '#2d3748',
                    color: '#fff',
                    borderRadius: 6,
                    padding: '10px 22px',
                    border: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => onNavigate('login')}
                  disabled={loggedIn}
                >
                  Log In
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ContactFooter />
    </div>
  );
};

// Dashboard
const Dashboard = ({ onNavigate, userData }) => {
  return (
    <div className="dashboard" 
      style={{
        backgroundImage: "url('/backgrounds/Home page background_2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      <div className="dashboard-header">
        <div className="hamburger-menu">
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
        </div>
        <h1>DASHBOARD</h1>
      </div>
      <div className="dashboard-content">
        <div className="welcome-section">
          <div className="power-lines-bg">
            <img src="https://cdn.mos.cms.futurecdn.net/5VC6y9DXhFsEYwkCRksxJk-970-80.jpg.webp" alt="Power lines sunset" className="hero-image" />
          </div>
          <div className="welcome-text">
            <h2>Welcome, {userData.username}</h2>
          </div>
        </div>
        <div className="dashboard-menu">
          <button 
            className="menu-button primary"
            style={{
              background: '#2d3748',
              color: '#fff',
              borderRadius: 6,
              padding: '10px 22px',
              border: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => onNavigate('purchase')}
          >
            PURCHASE TOKENS
          </button>
          <button 
            className="menu-button"
            style={{
              background: '#2d3748',
              color: '#fff',
              borderRadius: 6,
              padding: '10px 22px',
              border: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => onNavigate('status')}
          >
            TOKEN STATUS
          </button>
          <button 
            className="menu-button"
            style={{
              background: '#2d3748',
              color: '#fff',
              borderRadius: 6,
              padding: '10px 22px',
              border: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => onNavigate('usage')}
          >
            USAGE SUMMARY (kWh)
          </button>
          <button 
            className="menu-button"
            style={{
              background: '#2d3748',
              color: '#fff',
              borderRadius: 6,
              padding: '10px 22px',
              border: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => onNavigate('history')}
          >
            PAYMENT HISTORY
          </button>
          <button 
            className="menu-button logout"
            style={{
              background: '#2d3748',
              color: '#fff',
              borderRadius: 6,
              padding: '10px 22px',
              border: 'none',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer'
            }}
            onClick={() => onNavigate('home')}
          >
            LOGOUT
          </button>
        </div>
      </div>
    </div>
  );
};

// Payment History Page Component
const PaymentHistory = ({ onNavigate, userData }) => (
  <div
    className="payment-history"
    style={{
      backgroundImage: "url('/backgrounds/Dashboard background.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }}
  >
    <div className="page-header">
      <button onClick={() => onNavigate('dashboard')} className="back-button">←</button>
      <h2>PAYMENT HISTORY</h2>
    </div>
    <div className="history-table-container">
      <table className="history-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount (KSH)</th>
            <th>Tokens</th>
            <th>Method</th>
          </tr>
        </thead>
        <tbody>
          {userData.paymentHistory.map((item, idx) => (
            <tr key={idx}>
              <td>{item.date}</td>
              <td>{item.amount}</td>
              <td>{item.tokens}</td>
              <td>{item.method}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{textAlign: 'center', marginTop: 30}}>
        <button
          className="menu-button primary"
          style={{
            background: '#2d3748',
            color: '#fff',
            borderRadius: 6,
            padding: '10px 22px',
            border: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer'
          }}
          onClick={() => onNavigate('status')}
        >
          Show Token Status
        </button>
      </div>
    </div>
  </div>
);

// Usage Summary Page Component
const UsageSummary = ({ onNavigate, userData }) => (
  <div
    className="usage-summary"
    style={{
      backgroundImage: "url('/backgrounds/Dashboard background.webp')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh'
    }}
  >
    <div className="page-header">
      <button onClick={() => onNavigate('dashboard')} className="back-button">←</button>
      <h2>USAGE SUMMARY</h2>
    </div>
    <div className="usage-table-container">
      <table className="usage-table">
        <thead>
          <tr>
            <th>Month</th>
            <th>Usage (kWh)</th>
          </tr>
        </thead>
        <tbody>
          {userData.usageHistory.map((item, idx) => (
            <tr key={idx}>
              <td>{item.month}</td>
              <td>{item.usage}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// Purchase Tokens Component
const PurchaseTokens = ({ onNavigate, onPurchase }) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [tokens, setTokens] = useState(0);

  const calculateTokens = (amount) => {
    return Math.floor(amount / TOKEN_RATE);
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    setTokens(calculateTokens(parseFloat(value) || 0));
  };

  const handleMethodSelect = (method) => {
    setSelectedMethod(method);
  };

  const handleProceed = () => {
    if (selectedMethod && amount) {
      onPurchase({ method: selectedMethod, amount: parseFloat(amount), tokens });
      onNavigate('payment');
    }
  };

  return (
    <div className="purchase-tokens" 
      style={{
        backgroundImage: "url('/backgrounds/Purchase tokens background_2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      <div className="page-header">
        <button onClick={() => onNavigate('dashboard')} className="back-button">🏠</button>
        <h2>PURCHASE TOKENS</h2>
        <button onClick={() => onNavigate('home')} className="logout-button">🚪</button>
      </div>

      <div className="token-standards">
        <div className="standards-card">
          <h3>TOKEN STANDARDS</h3>
          <p>You are about to purchase tokens. Kindly note that the standard version of Quantum Grid tokens is as follows:</p>
          <div className="token-rates">
            <div className="rate-item">1 Token = Ksh {TOKEN_RATE}</div>
            <div className="rate-item">1 Token = {ENERGY_RATE}kWh</div>
          </div>
          <div className="calculator-icon">🧮</div>
        </div>
      </div>

      <div className="payment-section">
        <h3>STEP 1: CHOOSE A PAYMENT METHOD</h3>
        <p>Select your preferred payment method from the available payment options:</p>
        
        <div className="payment-methods">
          <div 
            className={`method-option ${selectedMethod === 'mpesa' ? 'selected' : ''}`}
            onClick={() => handleMethodSelect('mpesa')}
          >
            1. MPESA (Safaricom)
          </div>
          <div 
            className={`method-option ${selectedMethod === 'bank' ? 'selected' : ''}`}
            onClick={() => handleMethodSelect('bank')}
          >
            2. Mobile Bank Transfer
          </div>
          <div 
            className={`method-option ${selectedMethod === 'paypal' ? 'selected' : ''}`}
            onClick={() => handleMethodSelect('paypal')}
          >
            3. PayPal
          </div>
        </div>

        <div className="amount-section">
          <label>SELECT PAYMENT AMOUNT</label>
          <input 
            type="number" 
            value={amount}
            onChange={handleAmountChange}
            placeholder="Enter amount in KSH"
            className="amount-input"
          />
          <div className="token-preview">
            You will receive: <strong>{tokens} tokens</strong>
          </div>
        </div>

        <button 
          className="proceed-button"
          style={{
            background: '#2d3748',
            color: '#fff',
            borderRadius: 6,
            padding: '10px 22px',
            border: 'none',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer'
          }}
          onClick={handleProceed}
          disabled={!selectedMethod || !amount}
        >
          PROCEED TO PAYMENT
        </button>
      </div>
    </div>
  );
};

// Payment Processing Component
const PaymentProcessing = ({ onNavigate, purchaseData }) => {
  const [step, setStep] = useState(1);
  const [paymentData, setPaymentData] = useState({
    businessNumber: '',
    accountNumber: '',
    amount: purchaseData?.amount || '',
    pin: '',
    transactionCode: '',
    phoneNumber: '',
    email: ''
  });

  const handleInputChange = (field, value) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      onNavigate('confirmation');
    }
  };

  const renderPaymentForm = () => {
    switch (purchaseData?.method) {
      case 'mpesa':
        return (
          <div className="payment-form">
            <h4>A. M-PESA (Paybill or Buy Goods)</h4>
            <div className="instructions">
              <p>1. Go to M-PESA Menu → Lipa na M-PESA</p>
              <p>2. Select Pay Bill</p>
              <p>3. Enter:</p>
              <div className="input-group">
                <label>Business Number:</label>
                <input 
                  type="text" 
                  value={paymentData.businessNumber}
                  onChange={(e) => handleInputChange('businessNumber', e.target.value)}
                  placeholder="XXXXXX"
                />
              </div>
              <div className="input-group">
                <label>Account Number:</label>
                <input 
                  type="text" 
                  value={paymentData.accountNumber}
                  onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                  placeholder="Your user ID or invoice number"
                />
              </div>
              <div className="input-group">
                <label>Amount:</label>
                <input 
                  type="text" 
                  value={paymentData.amount}
                  onChange={(e) => handleInputChange('amount', e.target.value)}
                  placeholder="As indicated"
                />
              </div>
              <p>4. Confirm details and enter your PIN</p>
              <p>5. You'll receive a confirmation SMS with a transaction code (e.g., MPESA ABC123XYZ)</p>
            </div>
          </div>
        );

      case 'bank':
        return (
          <div className="payment-form">
            <h4>B. Bank Payment</h4>
            <div className="instructions">
              <p>1. Log in to your mobile/online banking app or visit your bank</p>
              <p>2. Choose Pay Bill, Funds Transfer, or Bill Payment</p>
              <p>3. Enter:</p>
              <div className="input-group">
                <label>Bank Name:</label>
                <input 
                  type="text" 
                  placeholder="Your Service Provider's Bank"
                />
              </div>
              <div className="input-group">
                <label>Account Name/Number:</label>
                <input 
                  type="text" 
                  placeholder="As specified on your invoice"
                />
              </div>
              <div className="input-group">
                <label>Reference Number:</label>
                <input 
                  type="text" 
                  placeholder="Your user ID or invoice number"
                />
              </div>
              <p>4. Save your transaction reference number</p>
            </div>
          </div>
        );

      case 'paypal':
        return (
          <div className="payment-form">
            <h4>C. PayPal</h4>
            <div className="instructions">
              <p>1. Log into your PayPal account</p>
              <p>2. Send payment to: email@example.com</p>
              <p>3. Add your User ID or Invoice Number in the notes/description section</p>
              <p>4. Complete payment and copy your PayPal Transaction ID</p>
            </div>
          </div>
        );

      default:
        return <div>Please select a payment method</div>;
    }
  };

  return (
    <div className="payment-processing" 
      style={{
        backgroundImage: "url('/backgrounds/Purchase tokens background_2.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      <div className="page-header">
        <button onClick={() => onNavigate('purchase')} className="back-button">←</button>
        <h2>COMPLETE PAYMENT</h2>
      </div>

      <div className="payment-content">
        <h3>STEP 2: COMPLETE THE PAYMENT</h3>
        {renderPaymentForm()}

        {step === 3 && (
          <div className="verification-section">
            <h3>Step 3: Enter Transaction Code for Verification</h3>
            <p>After completing the payment:</p>
            <div className="verification-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Payment Method Used:</label>
                  <span>{purchaseData?.method?.toUpperCase()}</span>
                </div>
                <div className="form-group">
                  <label>Amount paid:</label>
                  <span>KSH {purchaseData?.amount}</span>
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Transaction Code:</label>
                  <input 
                    type="text" 
                    value={paymentData.transactionCode}
                    onChange={(e) => handleInputChange('transactionCode', e.target.value)}
                    placeholder="Enter transaction code"
                  />
                </div>
                <div className="form-group">
                  <label>Phone Number/Email Used:</label>
                  <input 
                    type="text" 
                    value={paymentData.phoneNumber}
                    onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
                    placeholder="Contact used for payment"
                  />
                </div>
              </div>
              <div className="form-group">
                <label>Optional: Upload screenshot of payment confirmation (if required)</label>
                <input type="file" accept="image/*" />
              </div>
            </div>
          </div>
        )}

        <button 
          className="next-button"
          onClick={handleNextStep}
        >
          {step === 3 ? 'VERIFY PAYMENT' : 'NEXT STEP'}
        </button>
      </div>
    </div>
  );
};

// Confirmation Component
const Confirmation = ({ onNavigate, purchaseData }) => {
  const [isVerifying, setIsVerifying] = useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVerifying(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  const handleCheckTokens = () => {
    onNavigate('history');
  };

  return (
    <div className="confirmation" 
      style={{
        backgroundImage: isVerifying
          ? "url('/backgrounds/Dashboard background.webp')"
          : "url('/backgrounds/Purchase tokens background_4.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      <div className="page-header">
        <h2>PAYMENT CONFIRMATION</h2>
      </div>
      <div className="confirmation-content">
        <h3>Step 4: Wait for Confirmation</h3>
        
        {isVerifying ? (
          <div className="verification-status">
            <div className="loading-spinner"></div>
            <p>1. The system will verify the payment automatically or within 30 seconds.</p>
            <p>2. You will receive:</p>
            <ul>
              <li>An on-screen confirmation on your device</li>
              <li>SMS for payment</li>
              <li>SMS or email receipt with your token code</li>
            </ul>
            <div className="verification-animation">
              <div className="token-visual">🔌</div>
              <p>Verifying payment...</p>
            </div>
          </div>
        ) : (
          <div className="success-confirmation">
            <div className="success-icon">✅</div>
            <h4>Payment Verified Successfully!</h4>
            <div className="token-details">
              <p>Amount Paid: <strong>KSH {purchaseData?.amount}</strong></p>
              <p>Tokens Purchased: <strong>{purchaseData?.tokens}</strong></p>
              <p>Transaction ID: <strong>TXN{Date.now()}</strong></p>
            </div>
            <button 
              className="check-tokens-button"
              style={{
                background: '#2d3748',
                color: '#fff',
                borderRadius: 6,
                padding: '10px 22px',
                border: 'none',
                fontWeight: 600,
                fontSize: '1rem',
                cursor: 'pointer'
              }}
              onClick={handleCheckTokens}
            >
              CLICK TO CHECK PURCHASED TOKENS
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
// Token Status Page
const TokenStatus = ({ onNavigate, userData }) => {
  return (
    <div
      className="token-status"
      style={{
        backgroundImage: "url('/backgrounds/Dashboard background.webp')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh'
      }}
    >
      <div className="page-header">
        <button onClick={() => onNavigate('dashboard')} className="back-button">←</button>
        <h2>TOKEN STATUS</h2>
      </div>
      <div className="token-status-content" style={{maxWidth: 500, margin: '40px auto', background: 'rgba(255,255,255,0.97)', borderRadius: 15, boxShadow: '0 5px 20px rgba(0,0,0,0.08)', padding: '30px 20px', textAlign: 'center'}}>
        <h3 style={{color: '#2d3748', marginBottom: 20}}>Current Tokens</h3>
        <div style={{fontSize: '3rem', fontWeight: 'bold', color: '#667eea', marginBottom: 10}}>{userData.currentTokens}</div>
        <div style={{color: '#4a5568', marginBottom: 30}}>Tokens available for use</div>
        <h4 style={{color: '#2d3748', marginBottom: 10}}>Token Value</h4>
        <div style={{color: '#2d3748', fontSize: '1.1rem'}}>1 Token = Ksh {TOKEN_RATE} = 1 kWh</div>
        <div style={{marginTop: 30}}>
          <button className="menu-button primary" onClick={() => onNavigate('purchase')}>Purchase More Tokens</button>
        </div>
      </div>
    </div>
  );
};

// Contact Footer
const ContactFooter = () => (
  <footer style={{
    width: '100%',
    background: 'rgba(30,30,30,0.92)',
    color: 'white',
    textAlign: 'center',
    padding: '18px 0',
    fontSize: '1rem',
    marginTop: 40
  }}>
    <div>Contact us: <a href="mailto:support@quantumgrid.com" style={{color:'#61dafb'}}>support@quantumgrid.com</a> | Phone: +254 700 000 000</div>
    <div style={{fontSize:'0.95rem', marginTop: 4}}>Quantum Grid &copy; {new Date().getFullYear()}</div>
  </footer>
);

// Main App
const App = () => {
  const [currentPage, setCurrentPage] = useState('home'); 
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    currentTokens: 0,
    usageHistory: [],
    paymentHistory: []
  });
  const [purchaseData, setPurchaseData] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  // Accept username and password from login
  const handleLogin = (username) => {
    setUserData(prev => ({
      ...prev,
      username: username || prev.username
    }));
    setLoggedIn(true);
  };

  // Accept username, email, password from registration
  const handleRegister = (username, email, password) => {
    setUserData(prev => ({
      ...prev,
      username,
      email,
      password,
      currentTokens: 0,
      usageHistory: [],
      paymentHistory: []
    }));
    setLoggedIn(true);
  };

  const handlePurchase = (data) => {
    setPurchaseData(data);
    // Optionally update userData with new tokens and payment history
    setUserData(prev => ({
      ...prev,
      currentTokens: (prev.currentTokens || 0) + (data.tokens || 0),
      paymentHistory: [
        ...(prev.paymentHistory || []),
        {
          date: new Date().toISOString().slice(0,10),
          amount: data.amount,
          tokens: data.tokens,
          method: data.method
        }
      ]
    }));
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onNavigate={handleNavigate} onLogin={handleLogin} />;
      case 'register':
        return <RegistrationPage onNavigate={handleNavigate} onRegister={(username, email, password) => handleRegister(username, email, password)} />;
      case 'home':
        return <WelcomePage onNavigate={handleNavigate} loggedIn={loggedIn} />;
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} userData={userData} />;
      case 'purchase':
        return <PurchaseTokens onNavigate={handleNavigate} onPurchase={handlePurchase} />;
      case 'payment':
        return <PaymentProcessing onNavigate={handleNavigate} purchaseData={purchaseData} />;
      case 'confirmation':
        return <Confirmation onNavigate={handleNavigate} purchaseData={purchaseData} />;
      case 'history':
        return <PaymentHistory onNavigate={handleNavigate} userData={userData} />;
      case 'usage':
        return <UsageSummary onNavigate={handleNavigate} userData={userData} />;
      case 'status':
        return <TokenStatus onNavigate={handleNavigate} userData={userData} />;
      default:
        return <WelcomePage onNavigate={handleNavigate} loggedIn={loggedIn} />;
    }
  };

  return (
    <div className="app">
      {renderCurrentPage()}
    </div>
  );
};

export default App;