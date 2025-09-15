import Link from "next/link";

export default function Home(){
  return (
    <main>
      <section className="container" style={{paddingTop:56, paddingBottom:24}}>
        <div className="card" style={{padding: '52px 36px'}}>
          <h1 className="h1">ArtChrono</h1>
          <p className="lead" style={{marginTop:12}}>
            Le quiz qui muscle ton œil : 20&nbsp;s par œuvre, 3 indices. Devine l’artiste ou la date.
          </p>

          <div style={{display:'flex', gap:12, marginTop:26, flexWrap:'wrap'}}>
            <Link href="/play/artist" className="btn btn-primary">🖌️ Devine l’Artiste</Link>
            <Link href="/play" className="btn">🎯 Devine la Date</Link>
            <a href="#how" className="btn">Comment ça marche</a>
          </div>
        </div>
      </section>

      <section id="how" className="container">
        <div className="grid">
          <div className="card"><h2 className="h2">⏱️ Rythme</h2><p className="lead">20s par œuvre. Barre de temps visible.</p></div>
          <div className="card"><h2 className="h2">🧩 Indices</h2><p className="lead">Jusqu’à 3 indices, −1 point chacun.</p></div>
          <div className="card"><h2 className="h2">📚 Sources</h2><p className="lead">Open Access & Wikimedia (crédits affichés).</p></div>
        </div>
        <div className="footer">© {new Date().getFullYear()} ArtChrono — prototype.</div>
      </section>
    </main>
  );
}


