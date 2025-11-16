'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import io from 'socket.io-client';

export default function ProcessingStatus() {
  const [progress, setProgress] = useState({
    current: 0,
    total: 0,
    status: 'initializing',
    speed: '0 MB/s'
  });

  useEffect(() => {
    const socket = io(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000');
    
    socket.on('progress', (data) => {
      setProgress(data);
    });
    
    socket.on('complete', (data) => {
      setProgress({ ...progress, status: 'complete' });
    });
    
    return () => {
      socket.disconnect();
    };
  }, []);

  const percentage = progress.total > 0 
    ? Math.round((progress.current / progress.total) * 100) 
    : 0;

  return (
    <div className="space-y-6">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-32 h-32 transform -rotate-90">
            <circle
              cx="64"
              cy="64"
              r="56"
              stroke="#f3f4f6"
              strokeWidth="8"
              fill="none"
            />
            <motion.circle
              cx="64"
              cy="64"
              r="56"
              stroke="#111827"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={352}
              initial={{ strokeDashoffset: 352 }}
              animate={{ strokeDashoffset: 352 - (352 * percentage) / 100 }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl font-bold">{percentage}%</span>
          </div>
        </div>
        
        <h2 className="text-xl font-semibold mb-2">
          {progress.status === 'initializing' && 'Initializing...'}
          {progress.status === 'processing' && 'Processing Your Memories'}
          {progress.status === 'complete' && 'Complete!'}
        </h2>
        
        {progress.total > 0 && (
          <p className="text-gray-600">
            {progress.current} of {progress.total} memories processed
          </p>
        )}
        
        <p className="text-sm text-gray-500 mt-2">
          {progress.speed}
        </p>
      </div>
      
      <div className="bg-gray-50 rounded-lg p-4">
        <h3 className="font-semibold mb-2">What's happening:</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className={progress.status === 'initializing' ? 'font-medium text-gray-900' : ''}>
            ✓ Securely analyzing your export
          </li>
          <li className={progress.status === 'processing' ? 'font-medium text-gray-900' : ''}>
            {progress.status === 'processing' ? '⟳' : '✓'} Downloading memories with metadata
          </li>
          <li className={progress.status === 'complete' ? 'font-medium text-gray-900' : ''}>
            {progress.status === 'complete' ? '✓' : '○'} Preparing your download
          </li>
        </ul>
      </div>
      
      {progress.status === 'complete' && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <button className="button-primary">
            Download Your Memories
          </button>
        </motion.div>
      )}
    </div>
  );
}
