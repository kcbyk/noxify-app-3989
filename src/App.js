import React, { useState, useEffect } from 'react';

function App() {
  const [logs, setLogs] = useState([]);
  const [cpuUsage, setCpuUsage] = useState(0);
  const [serverLoad, setServerLoad] = useState(0);

  useEffect(() => {
    const logInterval = setInterval(() => {
      const newLog = {
        id: Date.now(),
        text: generateRandomLog()
      };
      setLogs(prevLogs => [...prevLogs, newLog].slice(-20));
    }, 300);

    const dataInterval = setInterval(() => {
      setCpuUsage(Math.floor(Math.random() * 100));
      setServerLoad(Math.floor(Math.random() * 100));
    }, 1000);

    return () => {
      clearInterval(logInterval);
      clearInterval(dataInterval);
    };
  }, []);

  function generateRandomLog() {
    const logTypes = [
      'ACCESS_GRANTED', 'FIREWALL_ACTIVE', 'ENCRYPTION_SUCCESS',
      'DATA_STREAM_SECURE', 'AUTHENTICATION_COMPLETE', 'SYSTEM_STABLE'
    ];
    const ip = `${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}.${Math.floor(Math.random() * 256)}`;
    const type = logTypes[Math.floor(Math.random() * logTypes.length)];
    return `[${new Date().toISOString()}] ${ip} - ${type}`;
  }

  return (
    <div className="min-h-screen p-4">
      <div className="flex flex-col md:flex-row justify-between mb-8">
        <div className="w-full md:w-1/3 mb-4 md:mb-0">
          <h2 className="text-cyber-green text-xl mb-2">CPU KULLANIMI</h2>
          <div className="bg-gray-800 h-8 rounded overflow-hidden">
            <div
              className="bg-cyber-purple h-full transition-all duration-300 ease-in-out"
              style={{ width: `${cpuUsage}%` }}
            ></div>
          </div>
          <p className="text-right text-cyber-green">{cpuUsage}%</p>
        </div>
        <div className="w-full md:w-1/3">
          <h2 className="text-cyber-green text-xl mb-2">SUNUCU YÜKÜ</h2>
          <div className="bg-gray-800 h-8 rounded overflow-hidden">
            <div
              className="bg-cyber-blue h-full transition-all duration-300 ease-in-out"
              style={{ width: `${serverLoad}%` }}
            ></div>
          </div>
          <p className="text-right text-cyber-green">{serverLoad}%</p>
        </div>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold text-cyber-green animate-pulse-slow">SİSTEM ÇEVRİMİÇİ</h1>
      </div>

      <div className="h-64 overflow-hidden border border-cyber-green rounded">
        <div className="h-full overflow-y-auto">
          {logs.map(log => (
            <div key={log.id} className="text-cyber-green text-sm p-1">
              {log.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;