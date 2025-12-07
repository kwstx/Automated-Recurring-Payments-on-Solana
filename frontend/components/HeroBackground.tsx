import React from 'react';

export default function HeroBackground() {
    return (
        <div className="relative w-full h-[150vh] flex items-center justify-center pointer-events-none overflow-hidden -mt-[20vh]">

            {/* The main purple wash/eclipse effect */}
            <div className="relative w-[60vw] h-[60vw] max-w-[700px] max-h-[700px]">

                {/* 1. Base All-Around Glow (Strong light backing) - Increased Opacity */}
                <div
                    className="absolute -inset-10 bg-gradient-to-tr from-purple-400/40 via-pink-400/40 to-orange-300/40 blur-[60px] rounded-full z-0 opacity-80"
                />

                {/* 2. The Dark Core (The planet itself) */}
                <div className="absolute inset-0 bg-[#050505] rounded-full z-20" />

                {/* 3. Full Ring Gradient (Conic blend of pastels) */}
                {/* Ensures color connectivity all around */}
                <div
                    className="absolute -inset-1 rounded-full z-10 blur-[40px] opacity-90"
                    style={{
                        background: 'conic-gradient(from 0deg at 50% 50%, #E879F9 0deg, #FDBA74 90deg, #C084FC 180deg, #F472B6 270deg, #E879F9 360deg)',
                    }}
                />

                {/* 4. Top/Right Highlights (Pastel Orange/Pink) */}
                <div
                    className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#FDBA74] blur-[80px] opacity-50 z-10 rounded-full"
                />

                {/* 5. Bottom/Left Highlights (Light Purple) */}
                <div
                    className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-[#C084FC] blur-[80px] opacity-50 z-10 rounded-full"
                />

                {/* 6. Inner Edge Highlight (Reflecting the light colors) */}
                <div
                    className="absolute inset-0 rounded-full z-30 opacity-90"
                    style={{
                        boxShadow: 'inset 10px 10px 60px rgba(192, 132, 252, 0.3), inset -10px -10px 60px rgba(253, 186, 116, 0.3)'
                    }}
                />

            </div>
        </div>
    );
}
