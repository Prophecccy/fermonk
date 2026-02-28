import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const benefits = [
    { title: "GUT FLORA", desc: "Live cultures to keep your microbiome singing.", color: "var(--color-yellow)" },
    { title: "ALL NATURAL", desc: "No artificial nonsense. Just real fruit and tea.", color: "var(--color-green)" },
    { title: "FIZZY LIFT", text: "desc", desc: "A natural energy boost without the crash.", color: "var(--color-magenta)" },
    { title: "LOW SUGAR", desc: "Less sugar than a bruised apple. Truly.", color: "var(--color-blue)" }
];

export default function BenefitsGrid() {
    const container = useRef(null);

    useGSAP(() => {
        const cards = gsap.utils.toArray('.benefit-card');

        gsap.from(cards, {
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%",
            },
            y: 100,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2, // Drop in one by one
            ease: "back.out(1.5)"
        });
    }, { scope: container });

    return (
        <section ref={container} style={{ padding: '6rem 2rem', backgroundColor: 'var(--color-dark)', color: 'var(--color-light)' }}>
            <h2 style={{ textAlign: 'center', fontSize: 'clamp(2rem, 5vw, 4rem)', marginBottom: '4rem', color: 'var(--color-purple)' }}>
                WHY CHOOSE FERMONK?
            </h2>
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '2rem',
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                {benefits.map((b, i) => (
                    <div
                        key={i}
                        className="benefit-card"
                        style={{
                            backgroundColor: b.color,
                            padding: '3rem 2rem',
                            borderRadius: '20px',
                            color: 'var(--color-dark)',
                            boxShadow: '10px 10px 0px rgba(0,0,0,0.8)',
                            transform: 'rotate(-2deg)'
                        }}
                    >
                        <h3 style={{ fontSize: '2rem', marginBottom: '1rem', textTransform: 'uppercase' }}>{b.title}</h3>
                        <p style={{ fontSize: '1.2rem', fontWeight: 500 }}>{b.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
