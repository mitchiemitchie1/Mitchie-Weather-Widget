import React from 'react';
import { WeatherData } from '../types';
import { SunIcon, CloudIcon, RainIcon, MoonIcon, LocationIcon } from './Icons';

interface WeatherWidgetProps {
  data: WeatherData;
  onRefresh: () => void;
  loading: boolean;
}

const WeatherWidget: React.FC<WeatherWidgetProps> = ({ data, onRefresh }) => {
  const isWarm = parseInt(data.temperature) > 25;
  
  // Dynamic theme based on weather
  let bgClass = "bg-gradient-to-b from-[#6DD5FA] to-[#FFFFFF]"; // Default Day
  let textColor = "text-slate-700";
  let subTextColor = "text-slate-500";
  let panelColor = "bg-white/40";

  if (!data.isDay) {
    bgClass = "bg-gradient-to-b from-[#0f2027] via-[#203a43] to-[#2c5364]";
    textColor = "text-white";
    subTextColor = "text-cyan-100";
    panelColor = "bg-black/20";
  } else if (isWarm) {
    bgClass = "bg-gradient-to-b from-[#FF8008] to-[#FFC837]";
    textColor = "text-white";
    subTextColor = "text-orange-100";
    panelColor = "bg-white/30";
  } else if (data.condition.toLowerCase().includes('rain')) {
    bgClass = "bg-gradient-to-b from-[#4B79A1] to-[#283E51]";
    textColor = "text-white";
    subTextColor = "text-blue-100";
    panelColor = "bg-white/10";
  }

  const getIcon = () => {
    const cond = data.condition.toLowerCase();
    const iconClass = "w-32 h-32 filter drop-shadow-xl";
    
    if (!data.isDay) return <MoonIcon className={`${iconClass} text-yellow-100 animate-bounce-slow`} />;
    if (cond.includes('rain') || cond.includes('drizzle')) return <RainIcon className={`${iconClass} animate-bounce-slow`} />;
    if (cond.includes('cloud')) return <CloudIcon className={`${iconClass} animate-bounce-slow`} />;
    return <SunIcon className={`${iconClass} animate-spin-slow`} />;
  };

  return (
    <div className={`relative w-full max-w-[340px] mx-auto rounded-[3rem] shadow-2xl overflow-hidden transition-all duration-500 ${bgClass}`}>
      
      {/* Glass shine effect */}
      <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
      
      <div className="relative z-10 p-8 flex flex-col items-center min-h-[480px] justify-between">
        
        {/* Location Header */}
        <div className="flex flex-col items-center text-center space-y-2 mt-4">
          <div className={`flex items-center space-x-2 px-4 py-1.5 rounded-full backdrop-blur-md border border-white/20 ${panelColor} ${textColor}`}>
             <LocationIcon className="w-3 h-3" />
             <span className="text-xs font-bold uppercase tracking-widest">Near You</span>
          </div>
          <h2 className={`text-2xl font-extrabold tracking-tight ${textColor} leading-tight line-clamp-2 drop-shadow-sm`}>
            {data.location}
          </h2>
        </div>

        {/* Main Weather Visual */}
        <div className="flex flex-col items-center justify-center py-2">
          <div className="transform hover:scale-110 transition-transform duration-300 cursor-pointer">
            {getIcon()}
          </div>
          
          <div className="flex flex-col items-center -mt-4">
             <span className={`text-[7rem] font-extrabold tracking-tighter leading-none ${textColor} drop-shadow-md`}>
               {data.temperature.replace(/[^0-9-]/g, '')}<span className="text-4xl align-top mt-4 inline-block">°</span>
             </span>
             <span className={`text-xl font-medium ${subTextColor} capitalize`}>
               {data.condition}
             </span>
          </div>
        </div>

        {/* Real Feel & Summary Panel */}
        <div className={`w-full rounded-3xl p-5 backdrop-blur-md border border-white/10 ${panelColor} flex flex-col space-y-4 shadow-lg`}>
          <div className="flex justify-between items-center px-2">
            <span className={`text-sm font-bold opacity-80 ${textColor}`}>Real Feel</span>
            <span className={`text-2xl font-bold ${textColor}`}>{data.realFeel}</span>
          </div>
          
          <div className={`w-full h-px ${data.isDay ? 'bg-black/10' : 'bg-white/20'}`}></div>
          
          <p className={`text-sm text-center font-semibold leading-relaxed ${textColor} opacity-90`}>
            ✨ {data.description}
          </p>
        </div>

      </div>
    </div>
  );
};

export default WeatherWidget;