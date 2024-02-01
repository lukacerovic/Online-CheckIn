import React from 'react';
import Animation from '../components/HomeAnimation.jsx'

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-center">
        <img src="/images/logo2.png" alt='logo' className="h-60" />
      </div>
      <Animation />
    </div>
    
  );
}