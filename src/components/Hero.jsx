import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

export default function Hero() {
    const container = useRef(null);
    const headline = useRef(null);
    const logo = useRef(null);
    const blob = useRef(null);

    useGSAP(() => {
        // 1. Splash Entrance Animation
        const tl = gsap.timeline();

        tl.from(headline.current, {
            y: 100,
            opacity: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.5)",
            delay: 0.2
        })
            .from(logo.current, {
                scale: 0,
                rotation: -45,
                opacity: 0,
                duration: 1.2,
                ease: "elastic.out(1, 0.3)"
            }, "-=0.8")
            .from(blob.current, {
                scale: 0,
                opacity: 0,
                duration: 1,
                ease: "back.out(1.7)"
            }, "-=1");

        // 2. Continuous "Breathing" / Floating Animation
        gsap.to(logo.current, {
            y: -15,
            rotation: 5,
            duration: 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

        gsap.to(blob.current, {
            y: 20,
            rotation: -10,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut"
        });

    }, { scope: container });

    return (
        <section
            ref={container}
            style={{
                position: 'relative',
                width: '100%',
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'var(--color-yellow)',
                overflow: 'hidden',
                padding: '2rem'
            }}
        >
            {/* Decorative Parallax Blob */}
            <div
                ref={blob}
                style={{
                    position: 'absolute',
                    top: '10%',
                    right: '20%',
                    width: '300px',
                    height: '300px',
                    backgroundColor: 'var(--color-magenta)',
                    borderRadius: '40% 60% 70% 30% / 40% 50% 60% 50%',
                    filter: 'blur(40px)',
                    opacity: 0.6,
                    zIndex: 0
                }}
            />

            {/* Main Content */}
            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                <h1
                    ref={headline}
                    style={{
                        fontSize: 'clamp(3rem, 8vw, 6rem)',
                        color: 'var(--color-dark)',
                        marginBottom: '1rem',
                        textShadow: '4px 4px 0 var(--color-light)'
                    }}
                >
                    Find your inner fizz
                </h1>

                <img
                    ref={logo}
                    src="/Asset/Fermonk Logo.png"
                    alt="Fermonk Logo"
                    style={{
                        maxWidth: '300px',
                        width: '100%',
                        filter: 'drop-shadow(10px 10px 0 var(--color-blue))'
                    }}
                />
            </div>
        </section>
    );
}
