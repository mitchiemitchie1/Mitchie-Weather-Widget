import React, { useState, useCallback, useEffect } from 'react';
import WeatherWidget from './components/WeatherWidget';
import { AppState, WeatherData } from './types';
import { fetchWeatherWithGemini } from './services/geminiService';
import { RefreshIcon, LocationIcon } from './components/Icons';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const handleGetWeather = useCallback(() => {
    setState(AppState.LOCATING);
    setErrorMsg(null);

    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported by your browser 😿");
      setState(AppState.ERROR);
      return;
    }

    // Requesting location on button click avoids browser blocking
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          setState(AppState.FETCHING_WEATHER);
          const { latitude, longitude } = position.coords;
          
          const data = await fetchWeatherWithGemini(latitude, longitude);
          
          setWeatherData(data);
          setState(AppState.SUCCESS);
        } catch (err) {
          console.error(err);
          setErrorMsg("Couldn't reach the clouds. Try again! ☁️");
          setState(AppState.ERROR);
        }
      },
      (err) => {
        console.error(err);
        let msg = "Please allow location access so I can see the sky! 🌍";
        if (err.code === 1) msg = "Permission denied. Please enable location in settings.";
        else if (err.code === 2) msg = "Position unavailable. Are you in a bunker?";
        else if (err.code === 3) msg = "Timeout. The satellite is sleeping.";
        
        setErrorMsg(msg);
        setState(AppState.ERROR);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-6 relative overflow-hidden">
      
      {/* Dynamic cute background */}
      <div className={`fixed inset-0 -z-10 transition-colors duration-1000 ${
        state === AppState.SUCCESS && !weatherData?.isDay ? 'bg-[#1a1b4b]' : 'bg-[#fff0f5]'
      }`}>
        {/* Floating decorative blobs */}
        <div className={`absolute top-[-10%] left-[-10%] w-[70%] h-[70%] rounded-full blur-3xl opacity-40 animate-pulse ${
          state === AppState.SUCCESS && !weatherData?.isDay ? 'bg-purple-900' : 'bg-pink-200'
        }`}></div>
        <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-3xl opacity-40 animate-pulse ${
          state === AppState.SUCCESS && !weatherData?.isDay ? 'bg-indigo-900' : 'bg-blue-200'
        }`} style={{animationDelay: '2s'}}></div>
      </div>

      <div className="w-full max-w-md flex flex-col items-center space-y-6 z-10">
        
        {/* IDLE / START SCREEN */}
        {state === AppState.IDLE && (
          <div className="glass-panel p-8 rounded-[2.5rem] text-center shadow-xl animate-fade-in-up flex flex-col items-center space-y-6">
            <div className="w-24 h-24 bg-gradient-to-tr from-pink-300 to-yellow-200 rounded-full flex items-center justify-center shadow-lg mb-2">
               <span className="text-5xl">🌤️</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-700 mb-2 tracking-tight">Kawaii Weather</h1>
              <p className="text-gray-500 leading-relaxed">
                I need to know where you are to check the temperature!
              </p>
            </div>
            <button 
              onClick={handleGetWeather}
              className="w-full py-4 bg-gradient-to-r from-pink-400 to-rose-400 hover:from-pink-500 hover:to-rose-500 text-white rounded-2xl font-bold text-lg shadow-lg shadow-pink-200 transform transition-all active:scale-95 flex items-center justify-center space-x-2"
            >
              <LocationIcon className="w-6 h-6 stroke-2" />
              <span>Check My Weather</span>
            </button>
            
            {deferredPrompt && (
              <button 
                onClick={handleInstallClick}
                className="w-full py-3 bg-white text-pink-500 border border-pink-200 hover:bg-pink-50 rounded-2xl font-bold text-md shadow-sm transform transition-all active:scale-95 flex items-center justify-center space-x-2"
              >
                <span>📲 Install App Widget</span>
              </button>
            )}
          </div>
        )}

        {/* LOADING STATES */}
        {(state === AppState.LOCATING || state === AppState.FETCHING_WEATHER) && (
           <div className="flex flex-col items-center justify-center space-y-6 animate-pulse">
             <div className="relative">
               <div className="w-24 h-24 bg-white rounded-full opacity-20 animate-ping absolute"></div>
               <div className="w-24 h-24 bg-white/80 backdrop-blur