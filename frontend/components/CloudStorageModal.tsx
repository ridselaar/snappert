'use client';

import { motion } from 'framer-motion';

interface CloudStorageModalProps {
  onClose: () => void;
  onSelect: (provider: 'google' | 'dropbox') => void;
}

export default function CloudStorageModal({ onClose, onSelect }: CloudStorageModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold mb-6">Connect Cloud Storage</h2>
        <p className="text-gray-600 mb-8">
          Your memories will be organized by year and month folders
        </p>
        
        <div className="space-y-4">
          <button
            onClick={() => onSelect('google')}
            className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-gray-900 transition-all flex items-center gap-4"
          >
            <svg className="w-8 h-8" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            <div className="text-left">
              <div className="font-semibold">Google Drive</div>
              <div className="text-sm text-gray-600">Connect your Google account</div>
            </div>
          </button>
          
          <button
            onClick={() => onSelect('dropbox')}
            className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-gray-900 transition-all flex items-center gap-4"
          >
            <svg className="w-8 h-8" viewBox="0 0 48 48">
              <path fill="#1E88E5" d="M12 25.6L24 34 36 25.6 24 17.2z"/>
              <path fill="#1E88E5" d="M24 6L12 14.4 0 6 12-2.4zM36 14.4L24 6 36-2.4 48 6zM0 25.6L12 34 0 42.4-12 34zM48 25.6L36 34 48 42.4 60 34z"/>
              <path fill="#1565C0" d="M24 31.8L12 23.4 0 31.8 12 40.2zM36 23.4L24 31.8 36 40.2 48 31.8z"/>
              <path fill="#1565C0" d="M12 8.6L24 17 12 25.4 0 17zM36 17L24 8.6 36 0 48 8.6z"/>
            </svg>
            <div className="text-left">
              <div className="font-semibold">Dropbox</div>
              <div className="text-sm text-gray-600">Connect your Dropbox account</div>
            </div>
          </button>
        </div>
        
        <button
          onClick={onClose}
          className="w-full mt-6 text-gray-600 hover:text-gray-900"
        >
          Cancel
        </button>
      </motion.div>
    </div>
  );
}
