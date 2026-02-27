import React, { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Wind, Target, AlertTriangle } from 'lucide-react';

const CFDAnimation = () => {
    const controls = useAnimation();
    const [step, setStep] = useState(0);

    const springConfig = {
        type: "spring",
        stiffness: 120,
        damping: 20
    };

    // Animation sequence
    useEffect(() => {
        const runSequence = async () => {
            // 1. Initial State - Normal prevailing winds
            setStep(0);
            await new Promise(resolve => setTimeout(resolve, 2000));

            // 2. Leak Occurs
            setStep(1);
            await new Promise(resolve => setTimeout(resolve, 2000));

            // 3. Dispersion and Trap
            setStep(2);
            await new Promise(resolve => setTimeout(resolve, 3000));

            // 4. Reverse Advection (Solve)
            setStep(3);
            await new Promise(resolve => setTimeout(resolve, 4000));

            // Loop
            runSequence();
        };
        runSequence();
    }, []);

    return (
        <div className="relative w-full aspect-video bg-[var(--color-brand-dark)] overflow-hidden">
            {/* Base UI layer */}
            <div className="absolute inset-0 p-4 z-20 pointer-events-none">
                <div className="flex justify-between items-start">
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-[var(--color-brand-light)] border border-[var(--color-brand-dark)]">
                        <span className="w-2 h-2 rounded-full bg-[var(--color-brand-dark)] animate-pulse"></span>
                        <span className="text-xs font-mono text-[var(--color-brand-dark)] font-bold">SimScale CFD / Prevailing Winds</span>
                    </div>
                    <div className="text-right bg-white p-3 border border-black/10 shadow-sm">
                        <div className="text-[10px] font-mono text-black/40 mb-1 tracking-widest">SYSTEM STATE</div>
                        <div className={`text-sm font-bold font-mono transition-colors ${step === 0 ? 'text-gray-500' :
                                step === 1 ? 'text-red-500' :
                                    step === 2 ? 'text-orange-500' : 'text-[var(--color-brand-green)]'
                            }`}>
                            {step === 0 && 'NOMINAL CONDITION'}
                            {step === 1 && 'CH4 DETECTED > 50ppm'}
                            {step === 2 && 'TRAP ACCUMULATION'}
                            {step === 3 && 'VECTOR SOLVE ACTIVE'}
                        </div>
                    </div>
                </div>
            </div>

            {/* Simulation Area */}
            <div className="absolute inset-0 flex items-center justify-center p-8 bg-gray-50">
                {/* The Physical Environment */}
                <div className="relative w-full h-full max-w-2xl mx-auto flex items-center justify-center border border-gray-200 bg-white">

                    {/* Compressor Shed (The Obstacle) */}
                    <div className="absolute z-10 w-32 h-48 bg-gray-900 flex items-center justify-center">
                        <span className="text-[10px] font-mono text-gray-400 -rotate-90 tracking-widest">COMPRESSOR SHED</span>
                    </div>

                    {/* The Pipe */}
                    <div className="absolute -left-12 h-4 w-full bg-gray-300 border-y border-gray-400 -z-10" />

                    {/* Sensors */}
                    {/* Placed in the 'dead zone' trap */}
                    <div className="absolute top-1/2 left-1/2 ml-24 -mt-16 z-20">
                        <motion.div
                            className={`w-6 h-6 border-2 flex items-center justify-center transition-colors ${step >= 2 ? 'border-orange-500 bg-orange-100' : 'border-gray-800 bg-white'}`}
                        >
                            <Target className={`w-3 h-3 ${step >= 2 ? 'text-orange-500' : 'text-gray-800'}`} />
                        </motion.div>
                        <span className={`absolute top-full left-1/2 -translate-x-1/2 mt-2 text-[10px] font-mono font-bold whitespace-nowrap ${step >= 2 ? 'text-orange-500' : 'text-gray-500'}`}>NODE A (TRAP)</span>
                    </div>

                    {/* Wind Vectors (Base) */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none overflow-hidden">
                        {[...Array(5)].map((_, i) => (
                            <motion.div
                                key={`wind-${i}`}
                                className="absolute h-px bg-gradient-to-r from-transparent via-blue-600 to-transparent"
                                style={{ top: `${20 + (i * 15)}%`, width: '100%', left: '-100%' }}
                                animate={{ left: '100%' }}
                                transition={{ repeat: Infinity, duration: 4 + Math.random() * 2, ease: "linear", delay: i * 0.5 }}
                            />
                        ))}
                    </div>

                    {/* The Leak & Plume */}
                    <div className="absolute w-3 h-3 bg-red-600 rounded-full left-1/4 z-10" style={{ transform: 'translateX(-50%)' }}>
                        {/* Alert Icon */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: step >= 1 ? 1 : 0, scale: step >= 1 ? 1 : 0 }}
                            className="absolute -top-10 -left-3 text-red-600 bg-white p-1 border border-red-200 shadow-sm"
                        >
                            <AlertTriangle className="w-6 h-6" />
                        </motion.div>

                        {/* Plume Particles */}
                        {step >= 1 && [...Array(20)].map((_, i) => (
                            <motion.div
                                key={`plume-${step}-${i}`}
                                initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
                                animate={
                                    step === 1 ? { opacity: [0, 1, 0], x: [0, 50, 100] + Math.random() * 50, y: Math.random() * 60 - 30, scale: [0.5, 2, 4] } :
                                        step === 2 ? { opacity: [0, 0.5, 0], x: [0, 150, 220] + Math.random() * 40, y: Math.random() * 100 - 50, scale: [0.5, 3, 6] } :
                                            { opacity: 0 } // clear on step 3 for reverse solve
                                }
                                transition={{ duration: 2, repeat: step < 3 ? Infinity : 0, ease: "easeOut", delay: i * 0.1 }}
                                className="absolute w-6 h-6 bg-red-500/20 mix-blend-multiply rounded-full blur-md"
                            />
                        ))}

                        {/* Reverse Solve Animation */}
                        {step === 3 && [...Array(30)].map((_, i) => (
                            <motion.div
                                key={`solve-${i}`}
                                initial={{ opacity: 0, x: 220, y: Math.random() * 100 - 50, scale: 2 }} // Start near trap
                                animate={{ opacity: [0, 1, 0], x: 0, y: 0, scale: 0.5 }} // End at leak
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: i * 0.05 }}
                                className="absolute h-px w-8 bg-[var(--color-brand-green)]"
                                style={{ transformOrigin: "left center" }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CFDAnimation;
