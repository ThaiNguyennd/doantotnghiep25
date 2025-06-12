import React, { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import AuthBackground from './auth/AuthBackground';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    showBackground?: boolean;
    className?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, showBackground = false, className = '' }) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Dark overlay */}
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

            {/* Background with blur effect */}
            {showBackground && (
                <div className="fixed inset-0 z-0">
                    <AuthBackground />
                    <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm" />
                </div>
            )}

            <div className="flex min-h-full items-center justify-center p-4 text-center relative z-10">
                <div className={`relative transform overflow-hidden rounded-2xl bg-[#18191A]/90 border border-[#333] px-4 pb-4 pt-5 text-left shadow-2xl transition-all sm:my-8 sm:w-full text-white ${className}`}>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-white">{title}</h3>
                        <button
                            type="button"
                            className="text-gray-400 hover:text-white focus:outline-none"
                            onClick={onClose}
                        >
                            <span className="sr-only">Close</span>
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal; 