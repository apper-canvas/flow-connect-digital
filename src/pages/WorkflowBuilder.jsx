import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import getIcon from '../utils/iconUtils';
import MainFeature from '../components/MainFeature';

function WorkflowBuilder() {
  const navigate = useNavigate();
  const ArrowLeft = getIcon('ArrowLeft');
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <button 
          onClick={() => navigate('/')} 
          className="btn-outline flex items-center gap-2"
        >
          <ArrowLeft size={18} />
          Back to Home
        </button>
      </div>
      
      <h1 className="text-2xl md:text-3xl font-bold mb-6">Create New Workflow</h1>
      
      <div className="workflow-builder-container">
        <MainFeature />
      </div>
    </div>
  );
}

export default WorkflowBuilder;