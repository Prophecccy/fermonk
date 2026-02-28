import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Story() {
    const container = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useGSAP(() => {
        // Parallax effect for the image
        gsap.to(imageRef.current, {
            scrollTrigger: {
                trigger: container.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
            },
            y: 100, // Move the image down slightly as we scroll past
            ease: "none"
        });

        // Fade in text from bottom
        gsap.from(textRef.current.children, {
            scrollTrigger: {
                trigger: textRef.current,
                start: "top 80%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out"
        });
    }, { scope: container });

    return (
        <section ref={container} style={{
            position: 'relative',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-yellow)',
            padding: '4rem 2rem',
            overflow: 'hidden'
        }}>
            <div style={{ maxWidth: '1200px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>

                {/* Image Side with Parallax */}
                <div style={{ flex: '1 1 400px', position: 'relative' }}>
                    <div
                        style={{
                            position: 'absolute',
                            top: '-20px', left: '-20px',
                            width: '100%', height: '100%',
                            backgroundColor: 'var(--color-blue)',
                            borderRadius: '30px',
                            zIndex: 0,
                            transform: 'rotate(-3deg)'
                        }}
                    ></div>
                    <img
                        ref={imageRef}
                        src="/Asset/Products/CLASSIC_BREW.png"
                        alt="Fermonk Process"
                        style={{
                            width: '100%',
                            position: 'relative',
                            zIndex: 1,
                            borderRadius: '30px',
                            objectFit: 'cover',
                            filter: 'drop-shadow(10px 10px 0px var(--color-dark))'
                        }}
                    />
                </div>

                {/* Text Side */}
                <div ref={textRef} style={{ flex: '1 1 500px', color: 'var(--color-dark)' }}>
                    <h2 style={{ fontSize: 'clamp(3rem, 6vw, 5rem)', marginBottom: '2rem', lineHeight: 1.1 }}>
                        BREWED FOR THE BOLD.
                    </h2>
                    <p style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 500, lineHeight: 1.5 }}>
                        We didn't just want another health drink. We wanted something that kicked you in the tastebuds while doing your gut a solid.
                    </p>
                    <p style={{ fontSize: '1.5rem', marginBottom: '2rem', fontWeight: 500, lineHeight: 1.5 }}>
                        Fermonk is wildly fermented, completely plant-based, and packed with prebiotics. It's the fizz you need to fuel your inner monk.
                    </p>
                    <button style={{
                        padding: '1rem 3rem',
                        fontSize: '1.5rem',
                        fontWeight: '800',
                        backgroundColor: 'var(--color-magenta)',
                        color: 'var(--color-light)',
                        border: '4px solid var(--color-dark)',
                        borderRadius: '50px',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        boxShadow: '6px 6px 0px var(--color-dark)',
                        transition: 'transform 0.1s, box-shadow 0.1s'
                    }}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'translate(-2px, -2px)';
                            e.target.style.boxShadow = '8px 8px 0px var(--color-dark)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'translate(0px, 0px)';
                            e.target.style.boxShadow = '6px 6px 0px var(--color-dark)';
                        }}
                        onMouseDown={(e) => {
                            e.target.style.transform = 'translate(4px, 4px)';
                            e.target.style.boxShadow = '2px 2px 0px var(--color-dark)';
                        }}
                        onMouseUp={(e) => {
                            e.target.style.transform = 'translate(-2px, -2px)';
                            e.target.style.boxShadow = '8px 8px 0px var(--color-dark)';
                        }}
                    >
                        Try it Now
                    </button>
                </div>
            </div>
        </section>
    );
}
