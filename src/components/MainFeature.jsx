import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import getIcon from '../utils/iconUtils';

function MainFeature() {
  const [step, setStep] = useState(1);
  const [selectedTriggerApp, setSelectedTriggerApp] = useState(null);
  const [selectedTriggerEvent, setSelectedTriggerEvent] = useState(null);
  const [selectedActionApp, setSelectedActionApp] = useState(null);
  const [selectedActionEvent, setSelectedActionEvent] = useState(null);
  const [workflowName, setWorkflowName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  // Icon declarations
  const Plus = getIcon('Plus');
  const Search = getIcon('Search');
  const ArrowRight = getIcon('ArrowRight');
  const X = getIcon('X');
  const Check = getIcon('Check');
  const ChevronLeft = getIcon('ChevronLeft');
  const ChevronRight = getIcon('ChevronRight');
  const Play = getIcon('Play');
  const Info = getIcon('Info');
  const MailIcon = getIcon('Mail');
  const CalendarIcon = getIcon('Calendar');
  const ShoppingCartIcon = getIcon('ShoppingCart');
  const MessageSquareIcon = getIcon('MessageSquare');
  const DatabaseIcon = getIcon('Database');
  const FileTextIcon = getIcon('FileText');
  const CreditCardIcon = getIcon('CreditCard');
  const UsersIcon = getIcon('Users');
  const EyeIcon = getIcon('Eye');
  
  const appCategories = [
    { id: 'email', name: 'Email', icon: MailIcon },
    { id: 'calendar', name: 'Calendar', icon: CalendarIcon },
    { id: 'ecommerce', name: 'E-Commerce', icon: ShoppingCartIcon },
    { id: 'crm', name: 'CRM', icon: UsersIcon },
    { id: 'communication', name: 'Communication', icon: MessageSquareIcon },
    { id: 'database', name: 'Database', icon: DatabaseIcon },
    { id: 'documents', name: 'Documents', icon: FileTextIcon },
    { id: 'payments', name: 'Payments', icon: CreditCardIcon },
  ];
  
  const popularApps = [
    { id: 'gmail', name: 'Gmail', icon: MailIcon, category: 'email' },
    { id: 'slack', name: 'Slack', icon: MessageSquareIcon, category: 'communication' },
    { id: 'google_calendar', name: 'Google Calendar', icon: CalendarIcon, category: 'calendar' },
    { id: 'shopify', name: 'Shopify', icon: ShoppingCartIcon, category: 'ecommerce' },
    { id: 'stripe', name: 'Stripe', icon: CreditCardIcon, category: 'payments' },
    { id: 'airtable', name: 'Airtable', icon: DatabaseIcon, category: 'database' },
    { id: 'salesforce', name: 'Salesforce', icon: UsersIcon, category: 'crm' },
    { id: 'dropbox', name: 'Dropbox', icon: FileTextIcon, category: 'documents' },
  ];
  
  const triggersForApp = {
    gmail: [
      { id: 'new_email', name: 'New Email Received' },
      { id: 'email_sent', name: 'Email Sent' }, 
      { id: 'new_labeled_email', name: 'New Email with Label' }
    ],
    slack: [
      { id: 'new_message', name: 'New Message in Channel' },
      { id: 'new_mention', name: 'New Mention' },
      { id: 'new_file', name: 'New File Uploaded' }
    ],
    google_calendar: [
      { id: 'new_event', name: 'New Event Created' },
      { id: 'event_starting', name: 'Event Starting Soon' },
      { id: 'event_updated', name: 'Event Updated' }
    ],
    shopify: [
      { id: 'new_order', name: 'New Order' },
      { id: 'cancelled_order', name: 'Order Cancelled' },
      { id: 'new_customer', name: 'New Customer' }
    ],
    stripe: [
      { id: 'payment_succeeded', name: 'Payment Succeeded' },
      { id: 'payment_failed', name: 'Payment Failed' },
      { id: 'subscription_created', name: 'Subscription Created' }
    ],
    airtable: [
      { id: 'record_created', name: 'Record Created' },
      { id: 'record_updated', name: 'Record Updated' },
      { id: 'record_matched', name: 'Record Matched Conditions' }
    ],
    salesforce: [
      { id: 'new_lead', name: 'New Lead' },
      { id: 'updated_opportunity', name: 'Opportunity Updated' },
      { id: 'closed_deal', name: 'Deal Closed' }
    ],
    dropbox: [
      { id: 'new_file', name: 'New File' },
      { id: 'file_modified', name: 'File Modified' },
      { id: 'file_deleted', name: 'File Deleted' }
    ]
  };
  
  const actionsForApp = {
    gmail: [
      { id: 'send_email', name: 'Send Email' },
      { id: 'create_draft', name: 'Create Draft' },
      { id: 'add_label', name: 'Add Label to Email' }
    ],
    slack: [
      { id: 'send_message', name: 'Send Message' },
      { id: 'create_channel', name: 'Create Channel' },
      { id: 'upload_file', name: 'Upload File' }
    ],
    google_calendar: [
      { id: 'create_event', name: 'Create Event' },
      { id: 'update_event', name: 'Update Event' },
      { id: 'delete_event', name: 'Delete Event' }
    ],
    shopify: [
      { id: 'create_product', name: 'Create Product' },
      { id: 'update_inventory', name: 'Update Inventory' },
      { id: 'create_discount', name: 'Create Discount' }
    ],
    stripe: [
      { id: 'create_customer', name: 'Create Customer' },
      { id: 'create_charge', name: 'Create Charge' },
      { id: 'create_subscription', name: 'Create Subscription' }
    ],
    airtable: [
      { id: 'create_record', name: 'Create Record' },
      { id: 'update_record', name: 'Update Record' },
      { id: 'delete_record', name: 'Delete Record' }
    ],
    salesforce: [
      { id: 'create_lead', name: 'Create Lead' },
      { id: 'update_opportunity', name: 'Update Opportunity' },
      { id: 'create_task', name: 'Create Task' }
    ],
    dropbox: [
      { id: 'upload_file', name: 'Upload File' },
      { id: 'create_folder', name: 'Create Folder' },
      { id: 'copy_file', name: 'Copy File' }
    ]
  };
  
  const filteredApps = searchQuery 
    ? popularApps.filter(app => app.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : popularApps;
  
  useEffect(() => {
    if (step === 4 && selectedTriggerApp && selectedTriggerEvent && selectedActionApp && selectedActionEvent) {
      // Auto-generate workflow name suggestion based on selections
      const suggestedName = `${selectedTriggerApp.name} ${selectedTriggerEvent.name} → ${selectedActionApp.name} ${selectedActionEvent.name}`;
      setWorkflowName(suggestedName);
    }
  }, [step, selectedTriggerApp, selectedTriggerEvent, selectedActionApp, selectedActionEvent]);
  
  const handleStepChange = (newStep) => {
    if (newStep === 2 && !selectedTriggerApp) {
      toast.error("Please select a trigger app first");
      return;
    }
    
    if (newStep === 3 && !selectedTriggerEvent) {
      toast.error("Please select a trigger event first");
      return;
    }
    
    if (newStep === 4 && !selectedActionApp) {
      toast.error("Please select an action app first");
      return;
    }
    
    if (newStep === 5 && !selectedActionEvent) {
      toast.error("Please select an action event first");
      return;
    }
    
    setStep(newStep);
  };
  
  const handleSelectTriggerApp = (app) => {
    setSelectedTriggerApp(app);
    setTimeout(() => {
      handleStepChange(2);
    }, 200);
  };
  
  const handleSelectTriggerEvent = (event) => {
    setSelectedTriggerEvent(event);
    setTimeout(() => {
      handleStepChange(3);
    }, 200);
  };
  
  const handleSelectActionApp = (app) => {
    setSelectedActionApp(app);
    setTimeout(() => {
      handleStepChange(4);
    }, 200);
  };
  
  const handleSelectActionEvent = (event) => {
    setSelectedActionEvent(event);
    setTimeout(() => {
      handleStepChange(5);
    }, 200);
  };
  
  const handleCreateWorkflow = () => {
    if (!workflowName.trim()) {
      toast.error("Please enter a workflow name");
      return;
    }
    
    setIsCreating(true);
    
    // Simulate creating a workflow
    setTimeout(() => {
      setIsCreating(false);
      toast.success("Workflow created successfully!");
      
      // Reset the form
      setSelectedTriggerApp(null);
      setSelectedTriggerEvent(null);
      setSelectedActionApp(null);
      setSelectedActionEvent(null);
      setWorkflowName('');
      setStep(1);
    }, 1500);
  };
  
  const handleTogglePreview = () => {
    setIsPreviewOpen(!isPreviewOpen);
  };
  
  return (
    <div className="relative">
      {isPreviewOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-surface-800 rounded-xl shadow-lg max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Workflow Preview</h3>
              <button 
                onClick={handleTogglePreview}
                className="p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-full"
              >
                <X size={20} />
              </button>
            </div>
            
            {selectedTriggerApp && selectedTriggerEvent && selectedActionApp && selectedActionEvent ? (
              <div className="space-y-8">
                <div className="text-center">
                  <h4 className="font-medium text-lg mb-2">{workflowName || "Unnamed Workflow"}</h4>
                  <p className="text-surface-500 text-sm">This workflow will automatically connect these apps and events.</p>
                </div>
                
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                  <div className="workflow-node bg-surface-50 dark:bg-surface-800">
                    <div className="w-16 h-16 mb-3 rounded-full flex items-center justify-center bg-surface-100 dark:bg-surface-700">
                      {selectedTriggerApp && selectedTriggerApp.icon && <selectedTriggerApp.icon size={32} className="text-primary" />}
                    </div>
                    <h4 className="font-medium text-center mb-1">{selectedTriggerApp?.name}</h4>
                    <p className="text-sm text-surface-500 text-center">{selectedTriggerEvent?.name}</p>
                  </div>
                  
                  <div className="py-4 px-2">
                    <ArrowRight size={24} className="text-surface-400" />
                  </div>
                  
                  <div className="workflow-node bg-surface-50 dark:bg-surface-800">
                    <div className="w-16 h-16 mb-3 rounded-full flex items-center justify-center bg-surface-100 dark:bg-surface-700">
                      {selectedActionApp && selectedActionApp.icon && <selectedActionApp.icon size={32} className="text-secondary" />}
                    </div>
                    <h4 className="font-medium text-center mb-1">{selectedActionApp?.name}</h4>
                    <p className="text-sm text-surface-500 text-center">{selectedActionEvent?.name}</p>
                  </div>
                </div>
                
                <div className="bg-surface-50 dark:bg-surface-700 p-4 rounded-lg border border-surface-200 dark:border-surface-600">
                  <div className="flex items-start gap-3">
                    <Info size={20} className="text-surface-400 mt-1 shrink-0" />
                    <div>
                      <h5 className="font-medium mb-1">How this workflow runs</h5>
                      <p className="text-sm text-surface-600 dark:text-surface-300">
                        Every time a <span className="font-medium">{selectedTriggerEvent?.name}</span> occurs in {selectedTriggerApp?.name}, 
                        FlowConnect will automatically trigger a <span className="font-medium">{selectedActionEvent?.name}</span> in {selectedActionApp?.name}.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end gap-3">
                  <button 
                    onClick={handleTogglePreview}
                    className="btn-outline"
                  >
                    Close
                  </button>
                  <button 
                    onClick={handleCreateWorkflow}
                    className="btn-primary flex items-center gap-2"
                    disabled={isCreating}
                  >
                    {isCreating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Play size={16} />
                        Activate Workflow
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-surface-500">Complete the workflow builder to see a preview</p>
              </div>
            )}
          </div>
        </div>
      )}
    
      <div className="card overflow-visible">
        <div className="border-b border-surface-200 dark:border-surface-700 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Workflow Builder</h2>
          
          <div className="flex flex-wrap gap-2 text-sm">
            <div className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 ${step >= 1 ? 'bg-primary/10 text-primary' : 'bg-surface-100 dark:bg-surface-700 text-surface-500'}`}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">1</span>
              Trigger
            </div>
            <div className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 ${step >= 3 ? 'bg-primary/10 text-primary' : 'bg-surface-100 dark:bg-surface-700 text-surface-500'}`}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">2</span>
              Action
            </div>
            <div className={`px-4 py-1.5 rounded-full flex items-center gap-1.5 ${step >= 5 ? 'bg-primary/10 text-primary' : 'bg-surface-100 dark:bg-surface-700 text-surface-500'}`}>
              <span className="w-5 h-5 rounded-full flex items-center justify-center bg-primary text-white text-xs">3</span>
              Activate
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <h3 className="text-xl font-medium mb-2">Select a Trigger App</h3>
                  <p className="text-surface-500">Choose the app that will start your workflow</p>
                </div>
                
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-surface-400" />
                  </div>
                  <input 
                    type="text"
                    placeholder="Search apps..."
                    className="input pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredApps.map(app => (
                    <motion.div
                      key={app.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`connector-card flex flex-col items-center text-center ${
                        selectedTriggerApp?.id === app.id ? 'border-primary ring-1 ring-primary' : ''
                      }`}
                      onClick={() => handleSelectTriggerApp(app)}
                    >
                      <div className="w-14 h-14 mb-3 rounded-full flex items-center justify-center bg-surface-100 dark:bg-surface-700">
                        {app.icon && <app.icon size={28} />}
                      </div>
                      <h4 className="font-medium text-sm">{app.name}</h4>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {step === 2 && selectedTriggerApp && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <button 
                    onClick={() => handleStepChange(1)}
                    className="mr-4 p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-full"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Select a Trigger Event</h3>
                    <p className="text-surface-500 flex items-center gap-2">
                      <span className="font-medium text-surface-800 dark:text-surface-100">{selectedTriggerApp.name}</span>
                      • Choose when this workflow should start
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {triggersForApp[selectedTriggerApp.id]?.map(trigger => (
                    <motion.div
                      key={trigger.id}
                      whileHover={{ x: 5 }}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedTriggerEvent?.id === trigger.id
                          ? 'border-primary bg-primary/5 dark:bg-primary/10'
                          : 'border-surface-200 dark:border-surface-700 hover:border-primary/30'
                      }`}
                      onClick={() => handleSelectTriggerEvent(trigger)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-100 dark:bg-surface-700 mr-3">
                            {selectedTriggerApp.icon && <selectedTriggerApp.icon size={20} />}
                          </div>
                          <div>
                            <h4 className="font-medium">{trigger.name}</h4>
                            <p className="text-sm text-surface-500">
                              Triggers when this event occurs in {selectedTriggerApp.name}
                            </p>
                          </div>
                        </div>
                        
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedTriggerEvent?.id === trigger.id
                            ? 'border-primary bg-primary text-white'
                            : 'border-surface-300 dark:border-surface-600'
                        }`}>
                          {selectedTriggerEvent?.id === trigger.id && <Check size={14} />}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <button 
                    onClick={() => handleStepChange(1)}
                    className="btn-outline"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => handleStepChange(3)}
                    className="btn-primary"
                    disabled={!selectedTriggerEvent}
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}
            
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <button 
                    onClick={() => handleStepChange(2)}
                    className="mr-4 p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-full"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Select an Action App</h3>
                    <p className="text-surface-500">Choose the app that will perform the action</p>
                  </div>
                </div>
                
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={18} className="text-surface-400" />
                  </div>
                  <input 
                    type="text"
                    placeholder="Search apps..."
                    className="input pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredApps.map(app => (
                    <motion.div
                      key={app.id}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`connector-card flex flex-col items-center text-center ${
                        selectedActionApp?.id === app.id ? 'border-secondary ring-1 ring-secondary' : ''
                      }`}
                      onClick={() => handleSelectActionApp(app)}
                    >
                      <div className="w-14 h-14 mb-3 rounded-full flex items-center justify-center bg-surface-100 dark:bg-surface-700">
                        {app.icon && <app.icon size={28} />}
                      </div>
                      <h4 className="font-medium text-sm">{app.name}</h4>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
            
            {step === 4 && selectedActionApp && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <button 
                    onClick={() => handleStepChange(3)}
                    className="mr-4 p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-full"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Select an Action</h3>
                    <p className="text-surface-500 flex items-center gap-2">
                      <span className="font-medium text-surface-800 dark:text-surface-100">{selectedActionApp.name}</span>
                      • Choose what this app should do
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  {actionsForApp[selectedActionApp.id]?.map(action => (
                    <motion.div
                      key={action.id}
                      whileHover={{ x: 5 }}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedActionEvent?.id === action.id
                          ? 'border-secondary bg-secondary/5 dark:bg-secondary/10'
                          : 'border-surface-200 dark:border-surface-700 hover:border-secondary/30'
                      }`}
                      onClick={() => handleSelectActionEvent(action)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-100 dark:bg-surface-700 mr-3">
                            {selectedActionApp.icon && <selectedActionApp.icon size={20} />}
                          </div>
                          <div>
                            <h4 className="font-medium">{action.name}</h4>
                            <p className="text-sm text-surface-500">
                              Perform this action in {selectedActionApp.name}
                            </p>
                          </div>
                        </div>
                        
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                          selectedActionEvent?.id === action.id
                            ? 'border-secondary bg-secondary text-white'
                            : 'border-surface-300 dark:border-surface-600'
                        }`}>
                          {selectedActionEvent?.id === action.id && <Check size={14} />}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <button 
                    onClick={() => handleStepChange(3)}
                    className="btn-outline"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => handleStepChange(5)}
                    className="btn-primary"
                    disabled={!selectedActionEvent}
                  >
                    Continue
                  </button>
                </div>
              </motion.div>
            )}
            
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center mb-6">
                  <button 
                    onClick={() => handleStepChange(4)}
                    className="mr-4 p-2 hover:bg-surface-100 dark:hover:bg-surface-700 rounded-full"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Name Your Workflow</h3>
                    <p className="text-surface-500">Give your workflow a descriptive name</p>
                  </div>
                </div>
                
                <div className="mb-8">
                  <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                    <div className="w-full md:w-1/2">
                      <label htmlFor="workflowName" className="block text-sm font-medium mb-2">
                        Workflow Name
                      </label>
                      <input
                        id="workflowName"
                        type="text"
                        className="input"
                        placeholder="e.g., Email to Slack Notification"
                        value={workflowName}
                        onChange={(e) => setWorkflowName(e.target.value)}
                      />
                    </div>
                    
                    <div className="w-full md:w-1/2 bg-surface-50 dark:bg-surface-800 p-4 rounded-lg border border-surface-200 dark:border-surface-700">
                      <h4 className="font-medium mb-3">Workflow Summary</h4>
                      <div className="flex items-center gap-3 p-3 bg-white dark:bg-surface-700 rounded-lg mb-2">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-primary/10 dark:bg-primary/20">
                          {selectedTriggerApp && selectedTriggerApp.icon && <selectedTriggerApp.icon size={20} className="text-primary" />}
                        </div>
                        <div>
                          <h5 className="font-medium text-sm">{selectedTriggerApp?.name}</h5>
                          <p className="text-xs text-surface-500">{selectedTriggerEvent?.name}</p>
                        </div>
                      </div>
                      
                      <div className="flex justify-center my-2">
                        <ChevronDown size={20} className="text-surface-400" />
                      </div>
                      
                      <div className="flex items-center gap-3 p-3 bg-white dark:bg-surface-700 rounded-lg">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-secondary/10 dark:bg-secondary/20">
                          {selectedActionApp && selectedActionApp.icon && <selectedActionApp.icon size={20} className="text-secondary" />}
                        </div>
                        <div>
                          <h5 className="font-medium text-sm">{selectedActionApp?.name}</h5>
                          <p className="text-xs text-surface-500">{selectedActionEvent?.name}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleTogglePreview}
                    className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors"
                  >
                    <EyeIcon size={18} />
                    Preview Workflow
                  </button>
                </div>
                
                <div className="flex justify-between">
                  <button 
                    onClick={() => handleStepChange(4)}
                    className="btn-outline"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handleCreateWorkflow}
                    className="btn-primary flex items-center gap-2"
                    disabled={isCreating || !workflowName.trim()}
                  >
                    {isCreating ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating...
                      </>
                    ) : (
                      <>
                        <Check size={18} />
                        Create Workflow
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default MainFeature;