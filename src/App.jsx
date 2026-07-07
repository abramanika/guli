import './App.css'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="wordmark">გული</h1>
        <p className="tagline">შენი პიროვნების რუკა</p>
      </header>

      <main className="app-main">
        <div className="hero-card">
          <h2>პროექტი მზადაა</h2>
          <p className="text-secondary">
            Guli Design System დაინსტალირებულია.
            კომპონენტები, ტოკენები და სტილები მზადაა გამოსაყენებლად.
          </p>
          <div className="trait-dots">
            <span className="dot dot-e" title="Extraversion" />
            <span className="dot dot-a" title="Agreeableness" />
            <span className="dot dot-c" title="Conscientiousness" />
            <span className="dot dot-n" title="Neuroticism" />
            <span className="dot dot-o" title="Openness" />
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
