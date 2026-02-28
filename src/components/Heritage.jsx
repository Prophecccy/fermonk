import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Leaf, Ship, Beaker, Zap, Waves, Cloud, Wind, Droplet, Sparkles, Sun, Sprout, Asterisk } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function Heritage() {
    const container = useRef(null);
    const textWrapper = useRef(null);
    const iconWrapper = useRef(null);

    const historyData = [
        {
            icon: <Leaf size={120} color="var(--color-green)" />,
            title: "Over 2,000 Years Ago",
            location: "Ancient China",
            text: "Kombucha, the fermented tea we know today, began its journey. Known as the 'Tea of Immortality' during the Qin dynasty, it was prized for its restorative properties.",
            decorations: [
                <Leaf size={80} color="var(--color-green)" style={{ position: 'absolute', top: '10%', right: '5%', animation: 'float 7s infinite', opacity: 0.15, rotate: '45deg' }} />,
                <Leaf size={120} color="var(--color-yellow)" style={{ position: 'absolute', bottom: '20%', left: '-5%', animation: 'floatReverse 8s infinite', opacity: 0.15, rotate: '-20deg' }} />,
                <Sprout size={60} color="var(--color-green)" style={{ position: 'absolute', top: '60%', right: '20%', animation: 'float 6s infinite', opacity: 0.1 }} />
            ]
        },
        {
            icon: <Ship size={120} color="var(--color-blue)" />,
            title: "A Balancing Journey",
            location: "Japan, Russia & Europe",
            text: "From China, the brew traveled the globe. Prized for its balancing qualities, it spread across Russia and eventually throughout all of Europe.",
            decorations: [
                <Waves size={140} color="var(--color-blue)" style={{ position: 'absolute', bottom: '15%', right: '10%', animation: 'floatReverse 5s infinite', opacity: 0.15 }} />,
                <Wind size={80} color="var(--color-dark)" style={{ position: 'absolute', top: '20%', left: '0%', animation: 'float 4s infinite', opacity: 0.1 }} />,
                <Cloud size={100} color="var(--color-blue)" style={{ position: 'absolute', top: '5%', right: '30%', animation: 'floatReverse 9s infinite', opacity: 0.1 }} />
            ]
        },
        {
            icon: <Beaker size={120} color="var(--color-purple)" />,
            title: "Dr. Kombu",
            location: "Japan",
            text: "A Korean physician named 'Dr. Kombu' is said to have introduced the living tea to the Japanese Emperor, inspiring the name 'Kombucha'.",
            decorations: [
                <Droplet size={60} color="var(--color-purple)" style={{ position: 'absolute', top: '30%', right: '15%', animation: 'float 3s infinite', opacity: 0.2 }} />,
                <Sparkles size={100} color="var(--color-yellow)" style={{ position: 'absolute', bottom: '25%', left: '-10%', animation: 'floatReverse 6s infinite', opacity: 0.15 }} />,
                <Droplet size={40} color="var(--color-magenta)" style={{ position: 'absolute', top: '70%', right: '5%', animation: 'float 4s infinite', opacity: 0.2 }} />
            ]
        },
        {
            icon: <Zap size={120} color="var(--color-magenta)" />,
            title: "Modern Wisdom",
            location: "Fermonk",
            text: "Crafted with the same ancient patience, we elevate the brew with natural fruits and botanicals. A perfect balance of tea, sugar, and live culture for the modern palate.",
            decorations: [
                <Sun size={150} color="var(--color-yellow)" style={{ position: 'absolute', top: '10%', right: '0%', animation: 'floatReverse 12s infinite', opacity: 0.1 }} />,
                <Asterisk size={80} color="var(--color-magenta)" style={{ position: 'absolute', bottom: '30%', left: '5%', animation: 'float 5s infinite', opacity: 0.15 }} />,
                <Leaf size={60} color="var(--color-green)" style={{ position: 'absolute', top: '50%', right: '25%', animation: 'floatReverse 7s infinite', opacity: 0.15, rotate: '90deg' }} />
            ]
        }
    ];

    useGSAP(() => {
        const sections = gsap.utils.toArray('.history-section');
        const icons = gsap.utils.toArray('.history-icon');

        // Pin targeting the iconWrapper explicitly so padding ignores it
        ScrollTrigger.create({
            trigger: iconWrapper.current,
            start: "top top",
            endTrigger: textWrapper.current,
            end: "bottom bottom",
            pin: true,
            scrub: true,
        });

        // Setup the icon morphing
        sections.forEach((section, i) => {
            if (i === 0) return; // Skip the first one as it fades in naturally

            gsap.fromTo(icons[i],
                { opacity: 0, scale: 0.5, rotation: -45 },
                {
                    opacity: 1,
                    scale: 1,
                    rotation: 0,
                    scrollTrigger: {
                        trigger: section,
                        start: "top center",
                        end: "center center",
                        scrub: true,
                    }
                }
            );

            gsap.to(icons[i - 1], {
                opacity: 0,
                scale: 1.5,
                rotation: 45,
                scrollTrigger: {
                    trigger: section,
                    start: "top center",
                    end: "center center",
                    scrub: true,
                }
            });
        });

        // Setup the text fade ins
        sections.forEach((section) => {
            gsap.fromTo(section,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                        end: "top 40%",
                        scrub: true,
                    }
                }
            );
        });

    }, { scope: container });

    return (
        <section ref={container} style={{
            position: 'relative',
            width: '100%',
            backgroundColor: 'var(--color-light)',
            color: 'var(--color-dark)',
            padding: '10vh 0',
        }}>
            {/* Massive Header */}
            <div style={{ textAlign: 'center', marginBottom: '10vh' }}>
                <h2 style={{
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    color: 'var(--color-magenta)',
                    textShadow: '4px 4px 0 var(--color-dark)'
                }}>
                    HERITAGE OF KOMBUCHA
                </h2>
                <p style={{ fontSize: '1.5rem', fontWeight: 600 }}>A living drink with a timeless story.</p>
            </div>

            <div style={{
                display: 'flex',
                maxWidth: '1400px',
                margin: '0 auto',
                padding: '0 2rem',
                position: 'relative'
            }}>
                {/* Left Side: Sticky Icons */}
                <div style={{ flex: '1' }} className="hide-on-mobile">
                    <div ref={iconWrapper} style={{
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        width: '100%',
                        overflow: 'hidden'
                    }}>
                        {historyData.map((data, i) => (
                            <div key={i} className="history-icon" style={{
                                position: 'absolute',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '250px',
                                height: '250px',
                                backgroundColor: 'var(--color-dark)',
                                borderRadius: '50%',
                                border: '8px solid var(--color-yellow)',
                                boxShadow: '10px 10px 0 var(--color-magenta)',
                                zIndex: historyData.length - i,
                                opacity: i === 0 ? 1 : 0
                            }}>
                                {data.icon}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: Scrolling Text */}
                <div ref={textWrapper} style={{ flex: '1', paddingBottom: '20vh' }}>
                    {historyData.map((data, i) => (
                        <div key={i} className="history-section" style={{
                            minHeight: '80vh',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            opacity: 0, // GSAP will override this
                            position: 'relative'
                        }}>
                            {/* Thematic Background Elements */}
                            <div style={{ pointerEvents: 'none', position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
                                {data.decorations.map((elem, idx) => (
                                    <div key={idx}>{elem}</div>
                                ))}
                            </div>

                            {/* Mobile Icon Render */}
                            <div className="hide-on-desktop" style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100px',
                                height: '100px',
                                backgroundColor: 'var(--color-dark)',
                                borderRadius: '50%',
                                border: '4px solid var(--color-yellow)',
                                marginBottom: '2rem',
                                padding: '1.5rem',
                                zIndex: 1,
                                position: 'relative'
                            }}>
                                {data.icon}
                            </div>

                            <div style={{
                                display: 'inline-block',
                                padding: '0.5rem 1rem',
                                backgroundColor: 'var(--color-dark)',
                                color: 'var(--color-yellow)',
                                border: '2px solid var(--color-dark)',
                                borderRadius: '30px',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                textTransform: 'uppercase',
                                marginBottom: '1rem',
                                alignSelf: 'flex-start',
                                zIndex: 1,
                                position: 'relative'
                            }}>
                                {data.location}
                            </div>

                            <h3 style={{
                                fontSize: 'clamp(2rem, 5vw, 4rem)',
                                marginBottom: '1.5rem',
                                color: 'var(--color-dark)',
                                zIndex: 1,
                                position: 'relative'
                            }}>
                                {data.title}
                            </h3>

                            <p style={{
                                fontSize: '1.3rem',
                                lineHeight: '1.8',
                                fontWeight: 500,
                                paddingLeft: '1.5rem',
                                borderLeft: '4px solid var(--color-magenta)',
                                zIndex: 1,
                                position: 'relative'
                            }}>
                                {data.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
