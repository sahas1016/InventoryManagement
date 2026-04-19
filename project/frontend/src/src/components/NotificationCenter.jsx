import React, { useState } from 'react';
import { useProducts } from '../hooks/useProducts';

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const { lowStockProducts } = useProducts();

  const toggleOpen = () => setIsOpen(!isOpen);

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={toggleOpen}
        style={{
          background: 'var(--bg-card)', border: '1px solid var(--border)',
          color: 'var(--text-secondary)', borderRadius: '50%',
          width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', position: 'relative'
        }}
      >
        <span>🔔</span>
        {lowStockProducts.length > 0 && (
          <span style={{
            position: 'absolute', top: -4, right: -4,
            background: 'var(--accent-red)', color: '#fff',
            fontSize: '0.65rem', fontWeight: 700, padding: '2px 6px',
            borderRadius: 10, border: '2px solid rgba(10,13,20,0.85)'
          }}>
            {lowStockProducts.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div style={{
          position: 'absolute', top: 50, right: 0,
          width: 320, maxHeight: 400, overflowY: 'auto',
          background: 'rgba(15, 20, 30, 0.95)', backdropFilter: 'blur(10px)',
          border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)', zIndex: 1000,
          display: 'flex', flexDirection: 'column'
        }}>
          <div style={{
            padding: '12px 16px', borderBottom: '1px solid var(--border)',
            fontWeight: 600, fontSize: '0.9rem', color: '#fff',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
          }}>
            Notifications
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              {lowStockProducts.length} Alerts
            </span>
          </div>

          <div style={{ padding: '8px 0' }}>
            {lowStockProducts.length === 0 ? (
              <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                You have no new notifications.
              </div>
            ) : (
              lowStockProducts.map(p => (
                <div key={p.id} style={{
                  padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', gap: 12, alignItems: 'flex-start'
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-red)', marginTop: 6 }} />
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-primary)' }}>
                      Low Stock: {p.name}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: 4 }}>
                      Only {p.quantity} units left. Reorder level is {p.reorderLevel}.
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--accent-amber)', marginTop: 6 }}>
                      Email notification triggered
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
