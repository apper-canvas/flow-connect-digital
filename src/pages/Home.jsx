import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainFeature from '../components/MainFeature';
import { Plus } from 'lucide-react';

function Home() {
  const [activeTab, setActiveTab] = useState('builder');
  const [recentWorkflows, setRecentWorkflows] = useState([]);
  
  // Using imported Plus directly instead of getIcon
  // To simulate other icons that might be used
  const Lightning = Plus;
  const Activity = Plus;
  const Database = Plus;
  const History = Plus;
  
  const [isWorkflowBuilderOpen, setIsWorkflowBuilderOpen] = useState(false);
  
  const toggleWorkflowBuilder = () => {
    setIsWorkflowBuilderOpen(!isWorkflowBuilderOpen);
  };
  
  useEffect(() => {
    // Simulate loading recent workflows
    const mockWorkflows = [
      { id: 1, name: "Email Lead Nurturing", status: "active", lastRun: "2 hours ago", connections: 4 },
      { id: 2, name: "Customer Support Ticket", status: "active", lastRun: "1 day ago", connections: 3 },
      { id: 3, name: "Inventory Sync", status: "inactive", lastRun: "5 days ago", connections: 2 }
    ];
    
    setRecentWorkflows(mockWorkflows);
  }, []);
  
  const handleCreateWorkflow = () => {
    console.log("New workflow created! Now you can add your first trigger.");
  };
  
  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="w-full md:w-auto">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome to FlowConnect</h1>
            <p className="text-surface-600 dark:text-surface-400">Connect your apps and automate workflows without coding</p>
            <button 
              onClick={toggleWorkflowBuilder}
              className="btn-primary flex items-center gap-2"
            >
              <Plus size={18} />
              Create New Workflow
            </button>
          </div>
          
          <button 
            onClick={handleCreateWorkflow}
            className="w-full md:w-auto btn-primary shadow-md flex items-center gap-2"
          >
            <Lightning size={18} />
            Create New Workflow
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="card p-6 neu-light dark:neu-dark"
          >
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mr-4">
                <Activity size={24} />
              </div>
              <div>
  const navigate = useNavigate();
                <h3 className="font-semibold text-lg">Active Workflows</h3>
                <p className="text-surface-500 text-sm">2 running</p>
              </div>
            </div>
            <div className="bg-surface-100 dark:bg-surface-700 h-1 rounded-full mb-2">
              <div className="bg-primary h-1 rounded-full w-2/3"></div>
            </div>
            <p className="text-xs text-surface-500">8 operations executed today</p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="card p-6 neu-light dark:neu-dark"
          >
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary mr-4">
                <Database size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">App Connections</h3>
                <p className="text-surface-500 text-sm">5 connected</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Gmail", "Slack", "Trello", "Shopify", "Airtable"].map((app, index) => (
                <span key={index} className="px-2 py-1 rounded-full bg-surface-100 dark:bg-surface-700 text-xs font-medium">
                  {app}
                </span>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="card p-6 neu-light dark:neu-dark"
          >
            <div className="flex items-center mb-4">
              <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mr-4">
                <History size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Recent Activity</h3>
                <p className="text-surface-500 text-sm">Last 24 hours</p>
              </div>
            </div>
            <ul className="space-y-2">
              <li className="text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                Email Lead Nurturing triggered (2h ago)
              </li>
              <li className="text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-400"></span>
                Customer Support Ticket workflow executed (6h ago)
              </li>
              <li className="text-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400"></span>
                Inventory Sync failed (1d ago)
              </li>
            </ul>
          </motion.div>
        </div>
      </section>
      
      <section>
        <div className="border-b border-surface-200 dark:border-surface-700 mb-8">
          <div className="flex overflow-x-auto scrollbar-hide">
            {["builder", "workflows", "apps", "history"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 font-medium text-sm whitespace-nowrap capitalize transition-colors ${
                  activeTab === tab 
                    ? "text-primary border-b-2 border-primary" 
                    : "text-surface-500 hover:text-surface-800 dark:hover:text-surface-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <div className="container mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Build Your Workflow?</h2>
          <p className="text-surface-600 dark:text-surface-400 max-w-2xl mx-auto mb-8">
            Connect your apps and automate your workflows in minutes with our visual workflow builder. No coding required.
          </p>
          
          <button 
            onClick={toggleWorkflowBuilder}
            className="btn-primary flex items-center gap-2 mx-auto"
          >
            <Plus size={18} />
            Create New Workflow
          </button>
        </div>
        {/* Additional UI components removed for clarity */}
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                      </button>
                      <button className="p-2 text-surface-500 hover:text-primary rounded-full hover:bg-surface-100 dark:hover:bg-surface-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </button>
                      <button className="p-2 text-surface-500 hover:text-red-500 rounded-full hover:bg-surface-100 dark:hover:bg-surface-700">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}

        {activeTab === "builder" && (
          <div className="bg-white dark:bg-surface-800 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Workflow Builder</h2>
            <div className="text-center py-8">
              <p className="text-surface-500 mb-4">Start building your automated workflow</p>
              <AnimatePresence>
                {isWorkflowBuilderOpen && <MainFeature />}
              </div>
            )}
          </div>
        )}
        
        {activeTab === "apps" && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Connected Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {["Gmail", "Slack", "Trello", "Shopify", "Airtable"].map((app, index) => (
                <div key={index} className="p-4 border border-surface-200 dark:border-surface-700 rounded-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-surface-100 dark:bg-surface-700 flex items-center justify-center text-surface-800 dark:text-surface-200">
                    {app.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-medium">{app}</h3>
                    <p className="text-xs text-surface-500">Connected 2 days ago</p>
                  </div>
                </div>
              ))}
              <button className="p-4 border border-dashed border-surface-300 dark:border-surface-600 rounded-lg flex items-center justify-center gap-2 text-surface-500 hover:text-primary hover:border-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add New App
              </button>
            </div>
          </div>
        )}
        
        {activeTab === "history" && (
          <div className="card p-6">
            <h2 className="text-xl font-semibold mb-4">Execution History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b border-surface-200 dark:border-surface-700">
                    <th className="py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Workflow</th>
                    <th className="py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Status</th>
                    <th className="py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Time</th>
                    <th className="py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Duration</th>
                    <th className="py-3 text-left text-xs font-medium text-surface-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-200 dark:divide-surface-700">
                  {[
                    { workflow: "Email Lead Nurturing", status: "success", time: "2 hours ago", duration: "1.2s" },
                    { workflow: "Customer Support Ticket", status: "success", time: "6 hours ago", duration: "0.8s" },
                    { workflow: "Inventory Sync", status: "error", time: "1 day ago", duration: "3.5s" }
                  ].map((item, index) => (
                    <tr key={index}>
                      <td className="py-4 text-sm font-medium">{item.workflow}</td>
                      <td className="py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.status === "success"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 text-sm text-surface-500">{item.time}</td>
                      <td className="py-4 text-sm text-surface-500">{item.duration}</td>
                      <td className="py-4 text-sm">
                        <button className="text-primary hover:text-primary-dark">View details</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
    </>
  );
}

export default Home;