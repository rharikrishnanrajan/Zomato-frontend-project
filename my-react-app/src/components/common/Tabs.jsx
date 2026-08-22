import React, { useState } from 'react';

const Tabs = ({
  tabs = [],
  defaultTab = 0,
  onChange,
  variant = 'underline',
  className = '',
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab);

  const handleTabClick = (index) => {
    setActiveTab(index);
    if (onChange) onChange(index);
  };

  const variants = {
    underline: 'border-b border-gray-200',
    pills: '',
    boxed: 'border border-gray-200 rounded-lg p-1 bg-gray-50',
  };

  const tabStyles = {
    underline: {
      base: 'px-4 py-3 font-medium transition-colors relative',
      active: 'text-zomato-red border-b-2 border-zomato-red',
      inactive: 'text-gray-600 hover:text-gray-900',
    },
    pills: {
      base: 'px-6 py-2 rounded-full font-medium transition-colors',
      active: 'bg-zomato-red text-white',
      inactive: 'text-gray-600 hover:bg-gray-100',
    },
    boxed: {
      base: 'px-4 py-2 rounded font-medium transition-colors',
      active: 'bg-white text-zomato-red shadow-sm',
      inactive: 'text-gray-600 hover:text-gray-900',
    },
  };

  return (
    <div className={className}>
      <div className={`flex gap-2 ${variants[variant]}`} role="tablist">
        {tabs.map((tab, index) => (
          <button
            key={index}
            role="tab"
            aria-selected={activeTab === index}
            aria-controls={`tabpanel-${index}`}
            onClick={() => handleTabClick(index)}
            className={`
              ${tabStyles[variant].base}
              ${activeTab === index ? tabStyles[variant].active : tabStyles[variant].inactive}
            `}
          >
            {tab.icon && <span className="mr-2">{tab.icon}</span>}
            {tab.label}
            {tab.count !== undefined && (
              <span className="ml-2 text-xs opacity-75">({tab.count})</span>
            )}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.map((tab, index) => (
          <div
            key={index}
            role="tabpanel"
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            hidden={activeTab !== index}
          >
            {activeTab === index && tab.content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
