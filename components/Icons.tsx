import React from 'react';

export const SunIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="6" className="fill-yellow-300 stroke-yellow-500" strokeWidth="1.5" />
    <path d="M12 2V4M12 20V22M4 12H2M22 12H20M19.07 4.93L17.66 6.34M6.34 17.66L4.93 19.07M4.93 4.93L6.34 6.34M17.66 17.66L19.07 19.07" className="stroke-yellow-500" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const CloudIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M7 19C4.23858 19 2 16.7614 2 14C2 11.632 3.63786 9.65621 5.8471 9.13722C6.25653 5.70846 9.16726 3 12.5 3C16.0899 3 19 5.91015 19 9.5C19 9.59503 18.9968 9.6891 18.9904 9.78211C20.7354 10.4266 22 12.0772 22 14C22 16.7614 19.7614 19 17 19H7Z" className="fill-white stroke-blue-300" strokeWidth="1.5" strokeLinejoin="round"/>
  </svg>
);

export const RainIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M16 19C13.2386 19 11 16.7614 11 14C11 11.632 12.6379 9.65621 14.8471 9.13722C15.2565 5.70846 18.1673 3 21.5 3C25.0899 3 28 5.91015 28 9.5C28 9.59503 27.9968 9.6891 27.9904 9.78211C29.7354 10.4266 31 12.0772 31 14C31 16.7614 28.7614 19 26 19H16Z" transform="translate(-6)" className="fill-white stroke-blue-300" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M8 13V15M12 13V15M16 13V15" className="stroke-blue-400" strokeWidth="2" strokeLinecap="round"/>
    <path d="M9 18L8 20M13 18L12 20M17 18L16 20" className="stroke-blue-400" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

export const MoonIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" className="fill-indigo-200 stroke-indigo-400" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const RefreshIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M4 12C4 16.4183 7.58172 20 12 20C15.6688 20 18.7447 17.5277 19.722 14.1692M19.722 14.1692H15.722M19.722 14.1692V18.1692M20 12C20 7.58172 16.4183 4 12 4C8.33124 4 5.2553 6.47229 4.27799 9.83083M4.27799 9.83083H8.27799M4.27799 9.83083V5.83083" className="stroke-current" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export const LocationIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 5.02944 7.02944 1 12 1C16.9706 1 21 5.02944 21 10Z" className="fill-red-100 stroke-red-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="10" r="3" className="fill-red-400" />
  </svg>
);
