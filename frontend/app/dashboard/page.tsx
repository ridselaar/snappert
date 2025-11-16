'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/DashboardLayout';
import ProcessingStatus from '@/components/ProcessingStatus';
import CloudStorageModal from '@/components/CloudStorageModal';

export default function Dashboard() {
  const [file, setFile] = useState<File | null>(null);
  const [processing, setProcessing] = useState(false);
  const [showCloudModal, setShowCloudModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const jsonFile = acceptedFiles[0];
      if (jsonFile.name.includes('memories_history.json')) {
        setFile(jsonFile);
      } else {
        alert('Please upload the memories_history.json file from your Snapchat export');
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json']
    },
    maxFiles: 1
  });

  const handleProcessStart = async () => {
    if (!file || !selectedPlan) return;
    
    setProcessing(true);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('plan', selectedPlan);
    
    try {
      const response = await fetch('/api/process', {
        method: 'POST',
        body: formData
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Processing started:', data);
      }
    } catch (error) {
      console.error('Processing error:', error);
    }
  };

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-sm p-8"
        >
          <h1 className="text-3xl font-bold mb-2">Backup Your Memories</h1>
          <p className="text-gray-600 mb-8">
            Upload your Snapchat export to get started
          </p>

          {!processing ? (
            <>
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-colors ${
                  isDragActive 
                    ? 'border-gray-900 bg-gray-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <input {...getInputProps()} />
                
                <svg className="w-16 h-16 mx-auto mb-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
                
                {file ? (
                  <div>
                    <p className="text-lg font-medium mb-2">File Selected:</p>
                    <p className="text-gray-600">{file.name}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-lg font-medium mb-2">
                      {isDragActive 
                        ? 'Drop your file here' 
                        : 'Drag & drop your memories_history.json'}
                    </p>
                    <p className="text-sm text-gray-500">or click to browse</p>
                  </div>
                )}
              </div>

              {file && (
                <div className="mt-8 space-y-4">
                  <div>
                    <h3 className="font-semibold mb-3">Select Your Plan</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <button
                        onClick={() => setSelectedPlan('basic')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedPlan === 'basic'
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold">Basic</div>
                        <div className="text-sm text-gray-600">€1.99</div>
                        <div className="text-xs text-gray-500">ex VAT</div>
                      </button>
                      
                      <button
                        onClick={() => setSelectedPlan('pro')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedPlan === 'pro'
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold">Pro</div>
                        <div className="text-sm text-gray-600">€6.99</div>
                        <div className="text-xs text-gray-500">ex VAT</div>
                      </button>
                      
                      <button
                        onClick={() => setSelectedPlan('unlimited')}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selectedPlan === 'unlimited'
                            ? 'border-gray-900 bg-gray-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-semibold">Unlimited</div>
                        <div className="text-sm text-gray-600">€9.99</div>
                        <div className="text-xs text-gray-500">ex VAT</div>
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Choose Destination</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={handleProcessStart}
                        disabled={!selectedPlan}
                        className={`p-6 rounded-lg border-2 transition-all ${
                          selectedPlan === 'basic' 
                            ? 'border-gray-900 bg-gray-50' 
                            : 'border-gray-200 hover:border-gray-900'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                        </svg>
                        <div className="font-semibold">Direct Download</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {selectedPlan === 'basic' 
                            ? 'Download directly to your device' 
                            : 'Available for all plans'}
                        </div>
                      </button>
                      
                      <button
                        onClick={() => selectedPlan !== 'basic' && setShowCloudModal(true)}
                        disabled={!selectedPlan || selectedPlan === 'basic'}
                        className={`p-6 rounded-lg border-2 transition-all ${
                          selectedPlan === 'basic'
                            ? 'border-gray-200 opacity-50 cursor-not-allowed'
                            : 'border-gray-200 hover:border-gray-900'
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <svg className="w-8 h-8 mb-2" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z"/>
                        </svg>
                        <div className="font-semibold">Cloud Storage</div>
                        <div className="text-sm text-gray-600 mt-1">
                          {selectedPlan === 'basic' 
                            ? 'Pro/Unlimited only' 
                            : 'Google Drive or Dropbox'}
                        </div>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <ProcessingStatus />
          )}
        </motion.div>
      </div>

      {showCloudModal && (
        <CloudStorageModal 
          onClose={() => setShowCloudModal(false)}
          onSelect={(provider) => {
            console.log('Selected provider:', provider);
            setShowCloudModal(false);
            handleProcessStart();
          }}
        />
      )}
    </DashboardLayout>
  );
}
