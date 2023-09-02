import React, { useState } from 'react';

const SwitchTabs = ({ data, onSwichTab }) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [left, setLeft] = useState(0);

  const activeTab = (tab, index) => {
    setLeft(index * 96);
    setTimeout(() => {
      setSelectedTab(index);
    }, 300);
    onSwichTab(tab.toLowerCase());
  };

  return (
    <div className="bg-gray-900 rounded-md p-1">
      <div className="flex items-center h-7 relative">
        {data.map((tab, index) => (
          <span
            key={index}
            className={`h-full flex items-center justify-center w-24 text-sm relative cursor-pointer z-10 transition font-medium ${
              selectedTab === index ? 'text-black' : 'text-white'
            }`}
            onClick={() => activeTab(tab, index)}
          >
            {tab}
          </span>
        ))}
        <span
          className="h-7 w-24 rounded-md bg-white absolute left-0 tab-transition"
          style={{ left }}
        />
      </div>
    </div>
  );
};

export default SwitchTabs;
