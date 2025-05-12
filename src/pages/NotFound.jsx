import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import getIcon from '../utils/iconUtils';

function NotFound() {
  const ArrowLeft = getIcon('ArrowLeft');
  const AlertTriangle = getIcon('AlertTriangle');
  
  return (
    <div className="min-h-[calc(100vh-180px)] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white dark:bg-surface-800 rounded-2xl p-8 shadow-soft dark:shadow-none border border-surface-200 dark:border-surface-700 text-center"
      >
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center">
          <AlertTriangle size={32} className="text-accent" />
        </div>
        
        <h1 className="text-3xl font-bold mb-2">404</h1>
        <h2 className="text-xl font-semibold mb-4">Page Not Found</h2>
        
        <p className="text-surface-600 dark:text-surface-400 mb-8">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        
        <Link 
          to="/"
          className="inline-flex items-center justify-center gap-2 btn-primary w-full"
        >
          <ArrowLeft size={18} />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
}

export default NotFound;