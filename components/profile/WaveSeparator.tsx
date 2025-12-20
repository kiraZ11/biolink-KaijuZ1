export default function WaveSeparator() {
    return (
        <div className="absolute bottom-0 left-0 right-0 z-20 w-full leading-[0]">
            <svg className="w-full h-12 sm:h-24 fill-white drop-shadow-[0_-5px_15px_rgba(0,0,0,0.1)]" viewBox="0 24 150 28" preserveAspectRatio="none" shapeRendering="auto">
                <defs>
                    <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
                </defs>
                <g className="parallax">
                    <g className="parallax">
                        <g>
                            <use xlinkHref="#gentle-wave" x="48" y="0" className="opacity-70" />
                            <use xlinkHref="#gentle-wave" x="224" y="0" className="opacity-70" />
                            <animateTransform attributeName="transform" type="translate" from="0 0" to="-176 0" dur="25s" repeatCount="indefinite" />
                        </g>
                        <g>
                            <use xlinkHref="#gentle-wave" x="48" y="3" className="opacity-50" />
                            <use xlinkHref="#gentle-wave" x="224" y="3" className="opacity-50" />
                            <animateTransform attributeName="transform" type="translate" from="0 0" to="-176 0" dur="20s" repeatCount="indefinite" />
                        </g>
                        <g>
                            <use xlinkHref="#gentle-wave" x="48" y="5" className="opacity-30" />
                            <use xlinkHref="#gentle-wave" x="224" y="5" className="opacity-30" />
                            <animateTransform attributeName="transform" type="translate" from="0 0" to="-176 0" dur="15s" repeatCount="indefinite" />
                        </g>
                        <g>
                            <use xlinkHref="#gentle-wave" x="48" y="7" />
                            <use xlinkHref="#gentle-wave" x="224" y="7" />
                            <animateTransform attributeName="transform" type="translate" from="0 0" to="-176 0" dur="10s" repeatCount="indefinite" />
                        </g>
                    </g>
                </g>
            </svg>
        </div>
    );
}
