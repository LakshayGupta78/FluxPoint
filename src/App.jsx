import React, { useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';
import { ArrowRight, Satellite, Radio, Cpu, Workflow, ShieldAlert } from 'lucide-react';
import CFDAnimation from './components/CFDAnimation';

const HighlightText = ({ children, color = "bg-[var(--color-brand-green)]", delay = 0, className = "", onLoad = false }) => {
    return (
        <span className={`relative inline-block whitespace-nowrap px-2 pb-1 mx-1 ${className}`}>
            <motion.span
                initial={{ scaleX: 0 }}
                whileInView={!onLoad ? { scaleX: 1 } : undefined}
                animate={onLoad ? { scaleX: 1 } : undefined}
                viewport={!onLoad ? { once: true, margin: "-100px" } : undefined}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay }}
                className={`absolute left-0 bottom-0 top-[10%] w-full h-[80%] ${color} origin-left -z-10`}
                style={{ borderRadius: '6px' }}
            />
            <span className="relative z-10 text-black">{children}</span>
        </span>
    );
};

const App = () => {
    const { scrollYProgress, scrollY } = useScroll();
    const yHeroText = useTransform(scrollYProgress, [0, 1], [0, 300]);

    return (
        <div className="min-h-screen bg-[var(--color-brand-light)] text-[var(--color-brand-dark)] font-sans antialiased">

            {/* 1. Navigation Bar */}
            <nav className="absolute top-0 w-full z-50 py-4 px-6 md:px-12 flex justify-between items-center bg-transparent">
                <div className="text-xl font-bold tracking-tight">FluxPoint</div>
                <div className="hidden md:flex gap-8 text-sm font-medium">
                    <a href="#technology" className="hover:opacity-60 transition-opacity">Technology</a>
                    <a href="#architecture" className="hover:opacity-60 transition-opacity">Architecture</a>
                    <a href="#case-studies" className="hover:opacity-60 transition-opacity">Case Studies</a>
                    <a href="#about" className="hover:opacity-60 transition-opacity">About Us</a>
                </div>
                <a href="mailto:lakshaygupta953@gmail.com" className="btn-primary text-sm py-3 px-6 inline-flex items-center gap-2">
                    Contact Lakshay <ArrowRight size={16} />
                </a>
            </nav>

            {/* 2. Hero Section (The Hook) */}
            <section className="h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 overflow-hidden bg-white relative">
                <motion.div style={{ y: yHeroText }} className="max-w-8xl mx-auto w-full z-10 pt-24">
                    <h1 className="pr-4 leading-[1.1] pb-4">
                        Event-Driven <HighlightText delay={0.3} onLoad={true}>Methane</HighlightText> Abatement for Critical Infrastructure.
                    </h1>
                </motion.div>
            </section>

            {/* 3. The Problem Statement (The "Double Blindness") */}
            <section id="technology" className="min-h-screen flex flex-col justify-center section-dark px-6 md:px-12 lg:px-24">
                <div className="max-w-8xl mx-auto">
                    <div className="mb-24">
                        <h2 className="mb-6">The Double Blindness.</h2>
                        <p className="text-2xl md:text-4xl font-medium opacity-80 max-w-4xl leading-tight">
                            The industry is trapped between two incomplete solutions. You have the eyes in space and the nose on the ground, but they aren't talking to each other.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 border-t border-opacity-20 border-white pt-16">
                        {/* Column A */}
                        <div>
                            <div className="flex items-center gap-5 mb-8 text-[var(--color-brand-green)]">
                                <Satellite size={40} className="shrink-0" />
                                <h3 className="text-white m-0 leading-tight">Satellites (Too Coarse)</h3>
                            </div>
                            <div className="space-y-6 text-xl">
                                <p><span className="opacity-60 font-medium">Issue:</span> 7km resolution. Blind in winter/snow coverage.</p>
                                <p><span className="opacity-60 font-medium">Result:</span> Can see the cloud, cannot find the valve.</p>
                            </div>
                        </div>

                        {/* Column B */}
                        <div>
                            <div className="flex items-center gap-5 mb-8 text-[var(--color-brand-green)]">
                                <Radio size={40} className="shrink-0" />
                                <h3 className="text-white m-0 leading-tight">Ground Sensors (Too Expensive)</h3>
                            </div>
                            <div className="space-y-6 text-xl">
                                <p><span className="opacity-60 font-medium">Issue:</span> High CAPEX. Batteries die in extreme cold conditions.</p>
                                <p><span className="opacity-60 font-medium">Result:</span> Impossible to scale across 4,000km pipeline networks.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. The FluxPoint Solution (The Core Logic) */}
            <section id="architecture" className="min-h-screen flex flex-col justify-center bg-[var(--color-brand-light)] px-6 md:px-12 lg:px-24 py-12">
                <div className="max-w-8xl mx-auto w-full">
                    <h2 className="mb-24">The Event-Driven Architecture.</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                        {[
                            { title: "The Trigger (Macro)", desc: "Satellite detects regional anomaly OR Acoustic Watchdog hears a leak.", icon: Satellite },
                            { title: "The Wake-Up (Comms)", desc: "Low-bandwidth Sat-IoT signal wakes specific ground nodes.", icon: Radio },
                            { title: "The Capture (Micro)", desc: "Nodes measure Methane Concentration + Wind Vector.", icon: Cpu },
                            { title: "The Solve (AI)", desc: "Physics-Informed Neural Network (PINN) reverses the dispersion model.", icon: Workflow },
                            { title: "The Output", desc: "Precise GPS coordinates of the leak source directly to repair crews.", icon: ShieldAlert }
                        ].map((step, idx) => (
                            <div key={idx} className="flex flex-col border-t-2 border-[var(--color-brand-dark)] pt-8">
                                <span className="text-5xl font-medium mb-8 opacity-20">0{idx + 1}</span>
                                <step.icon size={24} className="mb-6 opacity-80" />
                                <h3 className="text-xl mb-4 font-bold">{step.title}</h3>
                                <p className="opacity-70 text-lg leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Technical Deep Dive (The Hardware) */}
            <section className="min-h-screen flex flex-col justify-center section-dark px-6 md:px-12 lg:px-24">
                <div className="max-w-8xl mx-auto w-full">
                    <h2 className="mb-24">Technical Deep Dive.</h2>

                    <div className="space-y-16">
                        {[
                            { name: "The Vector Node", spec: "Methane (ppm) + Ultrasonic Anemometer (Wind Speed/Direction)." },
                            { name: "Power Harvesting", tech: "Thermoelectric Generators (TEG).", benefit: "Converts pipeline waste heat into electricity. No batteries required." },
                            { name: "Winter Resilience", tech: "Acoustic Piezo Sensors.", benefit: "Detects high-pressure leaks via sound (30-40kHz) when optical satellites are blind." }
                        ].map((component, idx) => (
                            <div key={idx} className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12 border-b border-opacity-20 border-white last:border-0 last:pb-0">
                                <h3 className="text-2xl md:text-3xl text-white col-span-1">{component.name}</h3>
                                <div className="col-span-2 text-xl space-y-4">
                                    {component.spec && <p><span className="opacity-50">Spec:</span> {component.spec}</p>}
                                    {component.tech && <p><span className="opacity-50">Tech:</span> {component.tech}</p>}
                                    {component.benefit && <p><span className="opacity-50">Benefit:</span> <span className="text-[var(--color-brand-green)]">{component.benefit}</span></p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 6. Deployment Strategy (The Efficiency) */}
            <section className="min-h-screen flex flex-col justify-center bg-[var(--color-brand-light)] px-6 md:px-12 lg:px-24 py-12 border-t border-[var(--color-brand-dark)]">
                <div className="max-w-8xl mx-auto w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="p-8 sm:p-12 -ml-8 rounded-3xl shadow-xl bg-white border border-[var(--color-brand-dark)] border-opacity-10">
                            <h2 className="mb-12">Optimized by Fluid Dynamics.</h2>
                            <div className="space-y-8 text-xl opacity-80 leading-relaxed border-l-4 border-[var(--color-brand-dark)] pl-8">
                                <p>We do not grid the entire pipeline.</p>
                                <p>We ingest terrain data into CFD (Computational Fluid Dynamics) models.</p>
                                <p>We identify natural <span className="font-bold">"Gas Traps"</span> (wakes behind buildings/valleys).</p>
                                <p className="text-2xl font-bold mt-12 text-[var(--color-brand-green)]">Result: 90% coverage with 10% of the sensors.</p>
                            </div>
                        </div>
                        <div className="bg-[var(--color-brand-dark)] rounded-md overflow-hidden p-2 aspect-video flex items-center justify-center shadow-2xl">
                            <video
                                src="/assets/methane-how_it_works.mov"
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover rounded-md"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* 7. Impact & Use Cases */}
            <section id="case-studies" className="min-h-screen flex flex-col justify-center section-dark px-6 md:px-12 lg:px-24 border-t border-[var(--color-brand-dark)] py-24">
                <div className="max-w-8xl mx-auto w-full">
                    <h2 className="mb-12">Impact & Use Cases.</h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:auto-rows-[minmax(0,1fr)]">

                        {/* Bento Item 1: Large Green (Scenario A) */}
                        <div className="lg:col-span-1 lg:row-span-2 bg-[var(--color-brand-green)] text-black p-6 md:p-8 rounded-[2rem] shadow-2xl flex flex-col justify-between">
                            <div>
                                <h3 className="text-2xl lg:text-3xl mb-3 font-bold tracking-tight leading-tight">Scenario A:<br />The "Ice Curtain"</h3>
                                <p className="opacity-80 mb-6 font-medium text-sm">(Russia / Canada)</p>
                            </div>
                            <div className="space-y-4 text-base mt-8">
                                <p><span className="font-bold">Challenge:</span> 24-hour darkness and -50°C temperatures render optical satellites blind.</p>
                                <p><span className="font-bold">FluxPoint Solution:</span> Acoustic triggers paired with TEG power, functioning optimally in extreme cold differentials.</p>
                            </div>
                        </div>

                        {/* Bento Item 2: Wide Dark (Scenario B) */}
                        <div className="lg:col-span-2 lg:row-span-1 bg-[#111] text-white p-6 md:p-8 rounded-[2rem] border border-white/10 flex flex-col md:flex-row gap-6 justify-between">
                            <div className="md:w-1/2 flex flex-col justify-center">
                                <h3 className="text-2xl mb-2 font-bold tracking-tight leading-tight">Scenario B:<br />The "Import Trap"</h3>
                                <p className="opacity-60 mb-0 font-medium text-sm">(India / SE Asia)</p>
                            </div>
                            <div className="md:w-1/2 space-y-3 text-base flex flex-col justify-center">
                                <p><span className="text-[var(--color-brand-green)] font-bold">Challenge:</span> Dense urban infrastructure and high LNG import costs mean every leaked molecule is a severe financial hit.</p>
                                <p><span className="text-white font-bold">Return on Investment:</span> Precise localization prevents safety hazards and pays for itself within 3 months.</p>
                            </div>
                        </div>

                        {/* Bento Item 3: Standard Light (Scenario C) */}
                        <div className="lg:col-span-1 lg:row-span-1 bg-white text-black p-6 md:p-8 rounded-[2rem] flex flex-col justify-between shadow-xl border border-black/5">
                            <div>
                                <h3 className="text-xl lg:text-2xl mb-2 font-bold tracking-tight leading-tight">Scenario C:<br />Permian Basin</h3>
                                <p className="opacity-60 mb-4 text-sm font-medium">(Texas / USA)</p>
                            </div>
                            <div className="space-y-3 text-base">
                                <p><span className="font-bold">Objective:</span> High-density well pads needing regulatory compliance.</p>
                                <p>Our CFD models thrive in complex basin topologies, reducing required nodes by 85%.</p>
                            </div>
                        </div>

                        {/* Bento Item 4: Standard Dark (Scenario D) */}
                        <div className="lg:col-span-1 lg:row-span-1 bg-[#1c1c1c] text-white p-6 md:p-8 rounded-[2rem] flex flex-col justify-between border border-white/10">
                            <div>
                                <h3 className="text-xl lg:text-2xl mb-2 font-bold tracking-tight leading-tight">Scenario D:<br />Offshore Integrity</h3>
                                <p className="opacity-60 mb-4 font-medium text-sm">(North Sea / GOM)</p>
                            </div>
                            <div className="space-y-3 text-base">
                                <p className="text-gray-300"><span className="text-white font-bold">Objective:</span> Monitoring remote platforms where maintenance trips cost millions.</p>
                                <p className="text-gray-300">Continuous 24/7 coverage without costly battery replacements.</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 8. Footer */}
            <footer id="about" className="min-h-screen flex flex-col justify-end bg-[var(--color-brand-light)] text-[var(--color-brand-dark)] py-12 px-6 md:px-12 lg:px-24 border-t border-[var(--color-brand-dark)]">
                <div className="max-w-8xl mx-auto flex flex-col justify-between h-[80vh] w-full">

                    <div className="mt-20">
                        <h2 className="text-[clamp(3rem,8vw,8rem)] leading-none font-bold tracking-tighter mb-12 max-w-4xl">Ready to deploy precision?</h2>
                        <div className="flex flex-wrap gap-4 items-center">
                            <a href="mailto:lakshaygupta953@gmail.com" className="btn-primary text-xl px-8 py-4 inline-block">
                                Contact Lakshay
                            </a>
                            <button className="btn-primary text-xl px-8 py-4">
                                Download Whitepaper
                            </button>
                            <button className="btn-secondary border-[var(--color-brand-dark)] text-[var(--color-brand-dark)] text-xl px-8 py-4">
                                View System Architecture
                            </button>
                        </div>
                    </div>

                    <div className="w-full">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end pb-8 border-b-2 border-[var(--color-brand-dark)] mb-8">
                            <div className="text-4xl font-bold tracking-tighter mb-8 md:mb-0">Lakshay Gupta</div>

                            <div className="flex flex-wrap gap-8 text-lg font-bold">
                                <a href="mailto:lakshaygupta953@gmail.com" className="hover:text-[var(--color-brand-green)] transition-colors">lakshaygupta953@gmail.com</a>
                                <a href="https://lakshaydesigns.site" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">Portfolio</a>
                                <a href="https://github.com/LakshayGupta78" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">GitHub</a>
                            </div>
                        </div>

                        <div className="flex justify-between items-center text-sm font-bold opacity-60">
                            <div className="flex gap-8">
                                <a href="https://linkedin.com/in/lakshaygupta" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">LinkedIn</a>
                                <a href="https://twitter.com/lakshaygupta" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 transition-opacity">Twitter / X</a>
                                <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
                            </div>

                            <div className="text-right">
                                © 2026 Lakshay Gupta
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
