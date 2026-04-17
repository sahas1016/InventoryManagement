import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import SummaryCard from '../components/SummaryCard';
import ChartComponent from '../components/ChartComponent';
import LowStockBadge from '../components/LowStockBadge';
import { useProducts } from '../hooks/useProducts';
import { useReports } from '../hooks/useReports';
import { FormatUtils } from '../utilities/FormatUtils';
import { useToast } from '../context/ToastContext';
import { api } from '../utilities/ApiUtils';
import '../styles/dashboard.css';

export default function DashboardPage() {
  const { products, loading, refresh, lowStockProducts } = useProducts();
  const { data: summary } = useReports('summary');
  const { addToast } = useToast();

  const simulateSale = async () => {
    if (!products.length) return;
    addToast('Simulating daily sales...', 'info');
    
    // Pick 2 random products
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    const targets = shuffled.slice(0, 2);

    try {
      for (const p of targets) {
        const qty = Math.floor(Math.random() * 5) + 3; // 3 to 7 units
        await api.post(`/inventory/reduce/${p.id}/${qty}`);
        addToast(`Sold ${qty} units of ${p.name}`, 'success');
      }
      refresh(); // Refresh data to show changes
    } catch (e) {
      addToast('Simulation failed: ' + e.message, 'error');
    }
  };

  const totalValue = products.reduce((acc, p) => acc + p.quantity * p.unitPrice, 0);

  // Category chart data
  const categoryMap = {};
  products.forEach(p => { categoryMap[p.category] = (categoryMap[p.category] || 0) + 1; });
  const chartData = Object.entries(categoryMap).map(([label, value]) => ({ label, value }));

  // Top 5 by value
  const topProducts = [...products]
    .sort((a, b) => (b.quantity * b.unitPrice) - (a.quantity * a.unitPrice))
    .slice(0, 5);

  return (
    <div className="page-layout">
      <Sidebar />
      <div className="main-content">
        <Navbar title="Dashboard" />
        <div className="page-inner fade-up">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <div>
              <h1 className="page-title">Overview</h1>
              <p className="page-subtitle">Welcome back — here's your inventory at a glance.</p>
            </div>
            <button 
              onClick={simulateSale}
              className="btn" 
              style={{ 
                background: 'var(--bg-card)', border: '1px solid var(--border)', 
                color: 'var(--text-primary)', padding: '10px 18px', 
                borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 10, fontWeight: 600,
                transition: 'all 0.2s'
              }}>
              <span style={{ fontSize: '1.2rem' }}>⚡</span> Simulate Daily Sales
            </button>
          </div>

          {/* Summary cards */}
          <div className="summary-grid">
            <SummaryCard
              label="Total Products"
              value={loading ? '…' : FormatUtils.number(products.length)}
              icon="📦"
              iconClass="icon-blue"
              delay={0}
            />
            <SummaryCard
              label="Inventory Value"
              value={loading ? '…' : FormatUtils.currency(totalValue)}
              icon="₹"
              iconClass="icon-green"
              delay={80}
            />
            <SummaryCard
              label="Low Stock Items"
              value={loading ? '…' : lowStockProducts.length}
              icon="⚠"
              iconClass="icon-amber"
              footer={lowStockProducts.length > 0 ? <span className="badge-down">⬇ Needs attention</span> : <span className="badge-up">✓ All good</span>}
              delay={160}
            />
            <SummaryCard
              label="Categories"
              value={loading ? '…' : Object.keys(categoryMap).length}
              icon="🏷"
              iconClass="icon-purple"
              delay={240}
            />
          </div>

          {/* Bottom panels */}
          <div className="dashboard-bottom">
            {/* Category chart */}
            <div className="dashboard-panel">
              <div className="dashboard-panel-title">
                Products by Category
                <Link to="/reports">View all →</Link>
              </div>
              <ChartComponent data={chartData} height={260} />
            </div>

            {/* Low stock + top products */}
            <div className="dashboard-panel">
              <div className="dashboard-panel-title">
                {lowStockProducts.length > 0 ? 'Low Stock Alerts' : 'Top Products by Value'}
                <Link to={lowStockProducts.length > 0 ? '/reports' : '/products'}>
                  {lowStockProducts.length > 0 ? 'Reports →' : 'All Products →'}
                </Link>
              </div>

              {lowStockProducts.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {lowStockProducts.slice(0, 6).map(p => (
                    <div key={p.id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 14px',
                      background: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                    }}>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 500 }}>{p.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>{p.category}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.85rem', color: 'var(--accent-red)' }}>
                          {p.quantity} / {p.reorderLevel}
                        </span>
                        <LowStockBadge quantity={p.quantity} reorderLevel={p.reorderLevel} />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {topProducts.map((p, i) => (
                    <div key={p.id} style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '12px 14px',
                      background: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{
                          width: 26, height: 26, borderRadius: '50%',
                          background: i === 0 ? 'var(--accent-primary)' : 'var(--bg-hover)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: '0.72rem', fontWeight: 700, color: '#fff', flexShrink: 0,
                        }}>{i + 1}</span>
                        <div>
                          <div style={{ fontSize: '0.88rem', fontWeight: 500 }}>{p.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 2 }}>{p.category}</div>
                        </div>
                      </div>
                      <span style={{ fontFamily: "'DM Mono',monospace", fontSize: '0.85rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                        {FormatUtils.currency(p.quantity * p.unitPrice)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}