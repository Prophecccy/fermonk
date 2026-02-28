import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Star, Sparkles, Sun } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const flavors = [
    {
        id: 'classic',
        name: 'Classic Brew',
        image: '/Asset/Products/CLASSIC_BREW.png',
        bgColor: 'var(--color-magenta)',
        prop: 'Raw & Unpasteurized',
    },
    {
        id: 'hibiscus',
        name: 'Hibiscus Zest',
        image: '/Asset/Products/HIBISCUS_ZEST.png',
        bgColor: 'var(--color-purple)',
        prop: '100% Plant Based',
    },
    {
        id: 'berry',
        name: 'Berry Mix',
        image: '/Asset/Products/BERRY_MIX.png',
        bgColor: 'var(--color-green)',
        prop: '7g Prebiotic Fibers',
    },
    {
        id: 'pineapple',
        name: 'Pineapple Punch',
        image: '/Asset/Products/PINEAPPLE_PUNCH.png',
        bgColor: 'var(--color-blue)',
        prop: 'Low Sugar - 4g',
    }
];

export default function InteractiveScrollShowcase() {
    const container = useRef(null);
    const bgRef = useRef(null);
    const panelsRef = useRef([]);

    useGSAP(() => {
        // Create the scroll pin timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container.current,
                start: 'top top',
                end: '+=300%', // 3 screens of scrolling for the 3 incoming panels
                pin: true,
                scrub: 1,
            }
        });

        flavors.forEach((flavor, index) => {
            if (index === 0) return; // First panel is already mostly visible

            const prevPanel = panelsRef.current[index - 1];
            const currentPanel = panelsRef.current[index];

            const prevImg = prevPanel.querySelector('img');
            const prevText = prevPanel.querySelector('.bg-text');
            const prevProp = prevPanel.querySelector('.prop-tag');
            const prevDecor = prevPanel.querySelector('.decorations');

            const currImg = currentPanel.querySelector('img');
            const currText = currentPanel.querySelector('.bg-text');
            const currProp = currentPanel.querySelector('.prop-tag');
            const currDecor = currentPanel.querySelector('.decorations');

            // 1. Shift Background Color smoothly
            tl.to(bgRef.current, {
                backgroundColor: flavor.bgColor,
                duration: 1,
                ease: 'none'
            }, `step${index}`);

            // 2. Animate out the PREVIOUS panel
            // Prev bottle goes to the right
            tl.to(prevImg, {
                x: '100vw',
                rotation: 15,
                opacity: 0,
                duration: 1,
                ease: 'power1.inOut'
            }, `step${index}`);

            // Prev big text out to the left
            tl.to(prevText, {
                x: -150,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in'
            }, `step${index}`);

            // Prev prop tag down and out
            tl.to(prevProp, {
                y: 50,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in'
            }, `step${index}`);

            // Prev decor rotates and fades out
            tl.to(prevDecor, {
                scale: 0.5,
                rotation: 45,
                opacity: 0,
                duration: 0.5,
                ease: 'power2.in'
            }, `step${index}`);


            // 3. Animate in the CURRENT panel
            // Current bottle comes from the left
            tl.fromTo(currImg, {
                x: '-100vw',
                rotation: -15,
                scale: 0.9,
                opacity: 0,
            }, {
                x: 0,
                rotation: 0,
                scale: 1,
                opacity: 1,
                duration: 1,
                ease: 'power1.inOut'
            }, `step${index}`);

            // Current big text from the right
            tl.fromTo(currText, {
                x: 150,
                opacity: 0
            }, {
                x: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'power2.out'
            }, `step${index}+=0.5`);

            // Current prop tag from bottom
            tl.fromTo(currProp, {
                y: 50,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'back.out(1.5)'
            }, `step${index}+=0.5`);

            // Current decor fades in and scales up
            tl.fromTo(currDecor, {
                scale: 0.5,
                rotation: -45,
                opacity: 0
            }, {
                scale: 1,
                rotation: 0,
                opacity: 1,
                duration: 0.5,
                ease: 'back.out(1.5)'
            }, `step${index}+=0.5`);
        });
    }, { scope: container });

    return (
        <section ref={container} style={{ width: '100%', height: '100vh', position: 'relative', overflow: 'hidden' }}>
            {/* Dynamic Background */}
            <div
                ref={bgRef}
                style={{
                    position: 'absolute',
                    top: 0, left: 0,
                    width: '100%', height: '100%',
                    backgroundColor: flavors[0].bgColor,
                    zIndex: 0
                }}
            />

            {/* Panels Container */}
            {flavors.map((flavor, i) => (
                <div
                    key={flavor.id}
                    ref={el => panelsRef.current[i] = el}
                    style={{
                        position: 'absolute',
                        top: 0, left: 0,
                        width: '100%', height: '100%',
                        zIndex: i + 1,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    {/* Decorative Elements */}
                    <div className="decorations" style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        zIndex: 1,
                        pointerEvents: 'none',
                        opacity: i === 0 ? 1 : 0
                    }}>
                        <Star className="decor-1" size={80} fill="var(--color-yellow)" color="var(--color-yellow)" style={{ position: 'absolute', top: '15%', left: '20%', animation: 'float 6s ease-in-out infinite' }} />
                        <Sparkles className="decor-2" size={100} color="var(--color-light)" style={{ position: 'absolute', bottom: '20%', right: '15%', animation: 'floatReverse 5s ease-in-out infinite' }} />
                        <Sun className="decor-3" size={120} color="var(--color-dark)" style={{ position: 'absolute', top: '25%', right: '25%', opacity: i % 2 === 0 ? 0.2 : 0.4, animation: 'float 7s ease-in-out infinite' }} />
                        <Star className="decor-4" size={60} fill="var(--color-yellow)" color="var(--color-yellow)" style={{ position: 'absolute', bottom: '30%', left: '25%', animation: 'floatReverse 8s ease-in-out infinite' }} />
                    </div>

                    {/* Massive Background Text Wrapper */}
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 2,
                        pointerEvents: 'none'
                    }}>
                        <div className="bg-text" style={{
                            width: '100%',
                            textAlign: 'center',
                            opacity: i === 0 ? 1 : 0,
                        }}>
                            <h2 style={{
                                fontSize: 'clamp(6rem, 15vw, 15rem)',
                                margin: 0,
                                textShadow: '8px 8px 0 var(--color-dark), 16px 16px 0 rgba(0,0,0,0.3)',
                                lineHeight: 0.85,
                                color: 'var(--color-light)',
                                textTransform: 'uppercase',
                            }}>
                                {flavor.name.split(' ').map((word, idx) => (
                                    <span key={idx} style={{ display: 'block' }}>{word}</span>
                                ))}
                            </h2>
                        </div>
                    </div>

                    {/* Centered Bottle */}
                    <img
                        src={flavor.image}
                        alt={flavor.name}
                        style={{
                            height: '85vh',
                            objectFit: 'contain',
                            filter: 'drop-shadow(-20px 20px 40px rgba(0,0,0,0.6))',
                            zIndex: 3,
                            position: 'relative',
                            opacity: i === 0 ? 1 : 0
                        }}
                    />

                    {/* Floating Property Tag */}
                    <div className="prop-tag" style={{
                        position: 'absolute',
                        bottom: '8%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 4,
                        opacity: i === 0 ? 1 : 0
                    }}>
                        <div style={{
                            backgroundColor: 'var(--color-dark)',
                            padding: '1.2rem 3rem',
                            borderRadius: '50px',
                            boxShadow: '8px 8px 0px rgba(0,0,0,0.5)',
                            transform: 'rotate(-2deg)'
                        }}>
                            <p style={{
                                fontSize: '1.5rem',
                                fontWeight: 800,
                                textTransform: 'uppercase',
                                letterSpacing: '2px',
                                margin: 0,
                                color: 'var(--color-yellow)'
                            }}>
                                {flavor.prop}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </section>
    );
}
