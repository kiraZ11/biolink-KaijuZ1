'use client';

import { useState, useEffect, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function ShareButton({ username }: { username: string }) {
    const [isOpen, setIsOpen] = useState(false);
    const [url, setUrl] = useState('');
    const [isNativeShareAvailable, setIsNativeShareAvailable] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        const currentUrl = window.location.href;
        setUrl(currentUrl);
        // Check if navigator.share is supported
        if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
            setIsNativeShareAvailable(true);
        }
    }, []);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy', err);
        }
    };

    const handleNativeShare = async () => {
        if (!isNativeShareAvailable) return;
        try {
            await navigator.share({
                title: `Check out ${username}'s bio!`,
                text: `Use this link to visit ${username}'s profile.`,
                url: url,
            });
        } catch (err) {
            console.log('Error sharing:', err);
        }
    };

    // Optimization: Memoize QR
    const memorizedQr = useMemo(() => {
        if (!url) return null;
        return (
            <QRCodeSVG
                value={url}
                size={160}
                level="L"
                className="rounded-lg"
            />
        );
    }, [url]);

    return (
        <div className="flex flex-col items-center gap-4 mt-8 w-full max-w-sm mx-auto px-4">

            {/* Main Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`
                    group relative flex items-center justify-center gap-3 px-8 py-3.5 rounded-full 
                    transition-all duration-300 transform active:scale-95
                    ${isOpen
                        ? 'bg-gray-900 text-white shadow-xl shadow-gray-500/20 ring-2 ring-gray-900 ring-offset-2'
                        : 'bg-white text-gray-700 shadow-lg shadow-gray-200/50 border border-gray-100 hover:shadow-xl hover:border-gray-200'
                    }
                `}
            >
                {/* Icon Switcher */}
                <div className="relative w-5 h-5">
                    <span className={`absolute inset-0 transition-all duration-300 transform ${isOpen ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}>
                        {/* Share Icon */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                            <polyline points="16 6 12 2 8 6" />
                            <line x1="12" y1="2" x2="12" y2="15" />
                        </svg>
                    </span>
                    <span className={`absolute inset-0 transition-all duration-300 transform ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}>
                        {/* Close Icon */}
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </span>
                </div>

                <span className="font-semibold text-sm tracking-wide">
                    {isOpen ? 'Close Share' : 'Share Profile'}
                </span>
            </button>

            {/* Expandable Card Area */}
            <div className={`
                w-full grid transition-[grid-template-rows,opacity,transform] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
                will-change-[grid-template-rows,opacity,transform] transform-gpu
                ${isOpen ? 'grid-rows-[1fr] opacity-100 scale-100' : 'grid-rows-[0fr] opacity-0 scale-95 pointer-events-none'}
            `}>
                <div className="overflow-hidden">
                    <div className="bg-white p-5 rounded-[2rem] shadow-xl shadow-gray-200/60 border border-gray-100 flex flex-col gap-5 mt-2 mx-1">

                        {/* Action Buttons Row */}
                        <div className="grid grid-cols-2 gap-3">
                            {/* Native Share Button (Only if supported) */}
                            {isNativeShareAvailable && (
                                <button
                                    onClick={handleNativeShare}
                                    className="col-span-1 flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-gray-50 text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:scale-105 transition-all duration-200 group border border-gray-100 hover:border-blue-100"
                                >
                                    <div className="p-2 bg-white rounded-full shadow-sm group-hover:shadow-md transition-shadow">
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <circle cx="18" cy="5" r="3" />
                                            <circle cx="6" cy="12" r="3" />
                                            <circle cx="18" cy="19" r="3" />
                                            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                        </svg>
                                    </div>
                                    <span className="text-xs font-semibold">Native Share</span>
                                </button>
                            )}

                            {/* Copy Link Button (Spans full width if native share not available) */}
                            <button
                                onClick={handleCopy}
                                className={`
                                    flex flex-col items-center justify-center gap-2 p-3 rounded-2xl transition-all duration-200 group border
                                    ${copied
                                        ? 'bg-green-50 text-green-700 border-green-200'
                                        : 'bg-gray-50 text-gray-700 border-gray-100 hover:bg-gray-100 hover:scale-105'
                                    }
                                    ${isNativeShareAvailable ? 'col-span-1' : 'col-span-2'}
                                `}
                            >
                                <div className={`p-2 rounded-full shadow-sm transition-shadow ${copied ? 'bg-green-100' : 'bg-white group-hover:shadow-md'}`}>
                                    {copied ? (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                                        </svg>
                                    )}
                                </div>
                                <span className="text-xs font-semibold">
                                    {copied ? 'Copied!' : 'Copy Link'}
                                </span>
                            </button>
                        </div>

                        {/* Divider */}
                        <div className="relative flex items-center">
                            <div className="flex-grow border-t border-gray-100"></div>
                            <span className="flex-shrink-0 mx-4 text-gray-300 text-[10px] font-bold uppercase tracking-widest">or scan</span>
                            <div className="flex-grow border-t border-gray-100"></div>
                        </div>

                        {/* QR Code Section */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-3 bg-white rounded-2xl border-2 border-dashed border-gray-200 shadow-sm transition-transform hover:scale-[1.02]">
                                {memorizedQr}
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold text-gray-800 tracking-tight">@{username}</p>
                                <p className="text-[10px] text-gray-400 font-medium">Scan to visit this profile</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}