'use client'; // Wajib ada karena ini interaktif (pake useState)

import { useState, useEffect, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';

export default function ShareButton({ username }: { username: string }) {
    const [showQR, setShowQR] = useState(false);
    const [url, setUrl] = useState('');

    // Ambil URL browser saat ini (biar jalan di localhost maupun vercel)
    useEffect(() => {
        setUrl(window.location.href);
    }, []);

    // Optimization: Memoize QR & Reduce complexity (Level L) for faster mobile rendering
    const memorizedQr = useMemo(() => (
        <QRCodeSVG
            value={url}
            size={160}
            level="L"
            className="rounded-lg"
        />
    ), [url]);

    return (
        <div className="flex flex-col items-center gap-4 mt-6 w-full">

            {/* Tombol Toggle */}
            <button
                onClick={() => setShowQR(!showQR)}
                className={`
                    relative group flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300
                    ${showQR
                        ? 'bg-gray-800 text-white border-gray-800 shadow-lg'
                        : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300 hover:shadow-md'
                    }
                `}
            >
                <span className={`text-lg transition-transform duration-300 ${showQR ? 'rotate-180' : ''}`}>
                    {showQR ? '✖' : '📱'}
                </span>
                <span className="text-sm font-medium">
                    {showQR ? 'Close QR Code' : 'Show QR Code'}
                </span>
            </button>

            {/* Area QR Code (Expand/Collapse Animation w/ CSS Grid) */}
            <div className={`
                grid transition-[grid-template-rows,opacity,transform] duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]
                will-change-[grid-template-rows,opacity,transform] transform-gpu translate-z-0
                ${showQR ? 'grid-rows-[1fr] opacity-100 scale-100' : 'grid-rows-[0fr] opacity-0 scale-95 pointer-events-none'}
            `}>
                <div className="overflow-hidden">
                    <div className="bg-white p-5 rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col items-center gap-3 mx-4 my-2 transform transition-all">
                        <div className="p-2 bg-white rounded-xl border border-dashed border-gray-200">
                            {memorizedQr}
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-semibold text-gray-800">Scan to visit</p>
                            <p className="text-[10px] text-gray-400">@{username}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}