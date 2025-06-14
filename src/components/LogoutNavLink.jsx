'use client'
import React from 'react';

const LogoutNavLink = () => {
  return (
    <div style={{ padding: '1rem' }}>
      <a
        href="/admin/logout"
        style={{
          color: '#ff4d4f',
          textDecoration: 'none',
          fontWeight: 'bold',
        }}
      >
        Logout
      </a>
    </div>
  );
};

export default LogoutNavLink;
