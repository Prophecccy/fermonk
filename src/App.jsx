import { StrictMode } from 'react'
import { ReactLenis } from 'lenis/react'
import Hero from './components/Hero'
import InteractiveScrollShowcase from './components/InteractiveScrollShowcase'
import BenefitsMarquee from './components/BenefitsMarquee'
import BenefitsGrid from './components/BenefitsGrid'
import Story from './components/Story'
import Heritage from './components/Heritage'

export default function App() {
  return (
    <ReactLenis root options={{ smoothWheel: true, lerp: 0.1 }}>
      <main className="scroller-wrapper">
        <Hero />

        <BenefitsMarquee />

        <InteractiveScrollShowcase />

        <BenefitsGrid />

        <Story />

        <Heritage />

        {/* Footer block */}
        <footer style={{ padding: '6rem 2rem', backgroundColor: 'var(--color-dark)', borderTop: '4px solid var(--color-light)', textAlign: 'center' }}>
          <img src="/Asset/Fermonk Logo.png" alt="Fermonk Logo" style={{ width: '150px', marginBottom: '2rem', filter: 'brightness(0) invert(1)' }} />
          <h2 style={{ fontSize: '3rem', color: 'var(--color-yellow)' }}>Find Your Inner Fizz.</h2>
          <p style={{ color: 'var(--color-light)', marginTop: '1rem' }}>© 2026 Fermonk Kombucha. All rights reserved.</p>
        </footer>
      </main>
    </ReactLenis>
  )
}
