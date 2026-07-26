import { About } from './sections/About/About'
import { Contacts } from './sections/Contacts/Contacts'
import { Footer } from './sections/Footer/Footer'
import { Header } from './sections/Header/Header'
import { Hero } from './sections/Hero/Hero'
import { OrderSteps } from './sections/OrderSteps/OrderSteps'
import { Portfolio } from './sections/Portfolio/Portfolio'
import { SocialLinks } from './sections/SocialLinks/SocialLinks'

function App() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Перейти к основному контенту
      </a>
      <Header />
      <main id="main-content">
        <Hero />
        <Portfolio />
        <About />
        <OrderSteps />
        <SocialLinks />
        <Contacts />
      </main>
      <Footer />
    </>
  )
}

export default App
