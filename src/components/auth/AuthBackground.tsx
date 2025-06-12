import React from 'react';

const AuthBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
            {/* Decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Top left circle */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
                
                {/* Bottom right circle */}
                <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-100 rounded-full opacity-50 blur-3xl"></div>
                
                {/* Center circle */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
            </div>

            {/* Book icons decoration */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-16 h-16 text-blue-200 opacity-20">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                    </svg>
                </div>
                <div className="absolute top-1/3 right-1/4 w-12 h-12 text-indigo-200 opacity-20">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                    </svg>
                </div>
                <div className="absolute bottom-1/4 left-1/3 w-14 h-14 text-purple-200 opacity-20">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default AuthBackground; 