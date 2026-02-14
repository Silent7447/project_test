import React, { useState, useEffect } from 'react';
import MarketChart from './components/MarketChart';

const App: React.FC = () => {
  const [btcPrice, setBtcPrice] = useState(64250.80);
  const [priceHistory, setPriceHistory] = useState<number[]>(Array.from({ length: 40 }, () => 64000 + Math.random() * 500));
  const [balance] = useState(1.245);
  const [usdBalance] = useState(80000.00);

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      const change = (Math.random() - 0.5) * 100;
      const newPrice = Number((btcPrice + change).toFixed(2));
      setBtcPrice(newPrice);
      setPriceHistory(prev => [...prev.slice(1), newPrice]);
    }, 4000);
    return () => clearInterval(interval);
  }, [btcPrice]);

  return (
    <div className="app-container">
      <aside className="sidebar">
        <div style={{ marginBottom: '48px' }}>
          <h1 style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', fontWeight: 800 }}>
            ANTIGRAVITY
          </h1>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ color: 'var(--accent-primary)', fontWeight: 600, cursor: 'pointer' }}>Dashboard</div>
          <div style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>Market</div>
          <div style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>Holdings</div>
          <div style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>History</div>
          <div style={{ color: 'var(--text-secondary)', cursor: 'pointer' }}>Settings</div>
        </nav>
      </aside>

      <main className="main-content animate-fade-in">
        <header className="header">
          <div>
            <h2 style={{ fontSize: '1.8rem' }}>Welcome back, Alex</h2>
            <p style={{ color: 'var(--text-secondary)' }}>Market is showing high volatility today.</p>
          </div>
          <div className="price-ticker">
            <div className="ticker-item">
              <span className="ticker-label">BITCOIN / USD</span>
              <span className={`ticker-value ${btcPrice > priceHistory[priceHistory.length - 2] ? 'up' : 'down'}`}>
                ${btcPrice.toLocaleString()}
              </span>
            </div>
            <div className="ticker-item">
              <span className="ticker-label">24H CHANGE</span>
              <span className="ticker-value up">+2.45%</span>
            </div>
          </div>
        </header>

        <div className="dashboard-grid">
          <section style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {/* Main Chart Panel */}
            <div className="glass-card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '1.2rem' }}>BTC Price (Live)</h3>
                <div className="ticker-label">1H TIMEFRAME</div>
              </div>
              <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
                <MarketChart data={priceHistory} />
              </div>
            </div>

            {/* Portfolio Stats */}
            <div className="portfolio-grid">
              <div className="glass-card">
                <div className="ticker-label">TOTAL ASSETS</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>$152,430.00</div>
              </div>
              <div className="glass-card">
                <div className="ticker-label">BITCOIN BALANCE</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>{balance} BTC</div>
              </div>
              <div className="glass-card">
                <div className="ticker-label">USD BALANCE</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 700 }}>${usdBalance.toLocaleString()}</div>
              </div>
            </div>
          </section>

          <aside style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="glass-card" style={{ border: '1px solid var(--accent-primary)' }}>
              <h3 style={{ marginBottom: '24px' }}>Quick Trade</h3>
              <div style={{ marginBottom: '16px' }}>
                <div className="ticker-label">AMOUNT BTC</div>
                <input
                  type="text"
                  placeholder="0.00"
                  style={{ background: 'var(--surface-accent)', border: 'none', width: '100%', padding: '12px', borderRadius: '8px', color: '#fff', marginTop: '8px', outline: 'none' }}
                />
              </div>
              <div style={{ marginBottom: '24px' }}>
                <div className="ticker-label">ESTIMATED PRICE</div>
                <div style={{ marginTop: '8px', fontSize: '1.1rem' }}>${(btcPrice * 0.1).toLocaleString()} USD</div>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>BUY</button>
                <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', border: '1px solid var(--danger)', color: 'var(--danger)' }}>SELL</button>
              </div>
            </div>

            <div className="glass-card">
              <h3 style={{ marginBottom: '16px' }}>Recent Activity</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  { type: 'Buy', amount: '0.045 BTC', date: '2 mins ago' },
                  { type: 'Sell', amount: '0.12 BTC', date: '4 hours ago' },
                  { type: 'Receive', amount: '0.01 BTC', date: '1 day ago' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                    <span>{item.type} Bitcoin</span>
                    <span style={{ color: 'var(--text-secondary)' }}>{item.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <style dangerouslySetInnerHTML={{
        __html: `
        .ticker-value.up { color: var(--success); }
        .ticker-value.down { color: var(--danger); }
        input::placeholder { color: rgba(255,255,255,0.2); }
      `}} />
    </div>
  );
};

export default App;
