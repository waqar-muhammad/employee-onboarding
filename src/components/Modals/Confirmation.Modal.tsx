import React from 'react';
import { ModalProps } from '../../types/types';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4">
                        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
                            <div className="bg-teal-500 px-4 py-2 flex justify-between items-center">
                                <div className="text-lg font-semibold text-white">Success!</div>
                                <button onClick={onClose} className="text-white hover:text-gray-200 focus:outline-none">
                                    <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" d="M3.46967 16.5303a.75.75 0 0 0 1.06066 1.0607L10 11.0607l5.4697 5.4696a.75.75 0 0 0 1.0606-1.0606L11.0607 10l5.4696-5.4697a.75.75 0 0 0-1.0606-1.06066L10 8.9393 4.5303 3.4697a.75.75 0 0 0-1.0606 1.0606L8.9393 10l-5.4696 5.4697a.75.75 0 0 0 0 1.0606z" />
                                    </svg>
                                </button>
                            </div>
                            <div className="px-6 py-4">
                                <div className="flex items-center">
                                    <div className="bg-green-500 text-white rounded-full p-3">
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div className="ml-4 text-lg font-semibold">Data stored successfully!</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
