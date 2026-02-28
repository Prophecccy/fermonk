import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const phrases = [
    "INDIA'S FIRST PREBIOTIC KOMBUCHA",
    "•",
    "LOW SUGAR",
    "•",
    "GUT HEALTH",
    "•",
    "RAW & UNPASTEURIZED",
    "•",
    "100% PLANT BASED",
    "•",
];

export default function BenefitsMarquee() {
    const container = useRef(null);
    const textRef = useRef(null);

    useGSAP(() => {
        // Create seamless infinite scroll
        // The container holds two identical text tracks
        // We animate it left by 50% of its total width
        gsap.to(textRef.current, {
            xPercent: -50,
            duration: 20,
            ease: "none",
            repeat: -1
        });
    }, { scope: container });

    return (
        <section
            ref={container}
            style={{
                width: '100%',
                overflow: 'hidden',
                backgroundColor: 'var(--color-dark)',
                color: 'var(--color-yellow)',
                padding: '2rem 0',
                borderTop: '4px solid var(--color-light)',
                borderBottom: '4px solid var(--color-light)',
            }}
        >
            <div
                ref={textRef}
                style={{
                    display: 'flex',
                    whiteSpace: 'nowrap',
                    width: 'fit-content'
                }}
            >
                {/* Track 1 */}
                <div style={{ display: 'flex', paddingRight: '2rem' }}>
                    {phrases.map((phrase, i) => (
                        <span key={`1-${i}`} style={{ fontSize: '3rem', fontWeight: 800, paddingRight: '2rem', letterSpacing: '2px' }}>
                            {phrase}
                        </span>
                    ))}
                </div>
                {/* Track 2 (Duplicate for seamless loop) */}
                <div style={{ display: 'flex' }}>
                    {phrases.map((phrase, i) => (
                        <span key={`2-${i}`} style={{ fontSize: '3rem', fontWeight: 800, paddingRight: '2rem', letterSpacing: '2px' }}>
                            {phrase}
                        </span>
                    ))}
                </div>
            </div>
        </section>
    );
}
