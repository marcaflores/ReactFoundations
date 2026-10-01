function Header({ squadSize }) {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__crest" aria-hidden="true">⚽</span>
        <div>
          <h1>Matchday Builder</h1>
          <p>Build your squad, pick a formation, set the lineup.</p>
        </div>
      </div>
      <div className="app-header__count">
        <span className="app-header__count-value">{squadSize}</span>
        <span className="app-header__count-label">Players</span>
      </div>
    </header>
  )
}

export default Header
