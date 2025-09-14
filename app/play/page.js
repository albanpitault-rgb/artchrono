"use client";
import { useEffect, useRef, useState } from "react";

/** ===== Données ===== */
const DATA = [
  {
    title: "La Mort de Marat (Jacques-Louis David)",
    year: 1793,
    image: "/img/marat.jpg",
    hints: ["Révolution française", "Charlotte Corday", "Baignoire"],
    source: "https://fr.wikipedia.org/wiki/La_Mort_de_Marat",
    credit: 'Domaine public via <a href="https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_La_Mort_de_Marat.jpg" target="_blank" rel="noreferrer">Wikimedia Commons</a>',
  },
  {
    title: "David (Michel-Ange)",
    year: 1504,
    image: "/img/david.jpg",
    hints: ["Marbre", "Florence", "Contrapposto"],
    source: "https://fr.wikipedia.org/wiki/David_(Michel-Ange)",
    credit: 'Par Jörg Bittner Unna — CC BY 3.0 via <a href="https://commons.wikimedia.org/w/index.php?curid=56633971" target="_blank" rel="noreferrer">Wikimedia Commons</a>',
  },
  {
    title: "La Joconde (Léonard de Vinci)",
    year: 1503,
    image: "/img/joconde.jpg",
    hints: ["Portrait féminin", "Florence", "Musée du Louvre"],
    source: "https://fr.wikipedia.org/wiki/La_Joconde",
    credit: 'Par Léonard de Vinci — Domaine public via <a href="https://commons.wikimedia.org/wiki/File:Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg" target="_blank" rel="noreferrer">Wikimedia Commons</a>',
  },
  {
    title: "La Nuit étoilée (Vincent van Gogh)",
    year: 1889,
    image: "/img/nuit_etoilee.jpg",
    hints: ["Saint-Rémy-de-Provence", "Postimpressionnisme", "Ciel tourbillonnant"],
    source: "https://fr.wikipedia.org/wiki/La_Nuit_%C3%A9toil%C3%A9e",
    credit: 'Domaine public via <a href="https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg" target="_blank" rel="noreferrer">Wikimedia Commons</a>',
  },
  {
    title: "La Naissance de Vénus (Sandro Botticelli)",
    year: 1485,
    image: "/img/venus.jpg",
    hints: ["Mythologie", "Florence", "Galerie des Offices"],
    source: "https://fr.wikipedia.org/wiki/La_Naissance_de_V%C3%A9nus_(Botticelli)",
    credit: 'Domaine public via <a href="https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg" target="_blank" rel="noreferrer">Wikimedia Commons</a>',
  },
  {
    title: "La Jeune Fille à la perle (Johannes Vermeer)",
    year: 1665,
    image: "/img/perle.jpg",
    hints: ["Delft", "Baroque", "Turban bleu"],
    source: "https://fr.wikipedia.org/wiki/La_Jeune_Fille_%C3%A0_la_perle",
    credit: 'Domaine public via <a href="https://commons.wikimedia.org/wiki/File:Meisje_met_de_parel.jpg" target="_blank" rel="noreferrer">Wikimedia Commons</a>',
  },
  {
    title: "Le Cri (Edvard Munch)",
    year: 1893,
    image: "/img/cri.jpg",
    hints: ["Expressionnisme", "Norvège", "Personnage angoissé"],
    source: "https://fr.wikipedia.org/wiki/Le_Cri",
    credit: 'Domaine public via <a href="https://commons.wikimedia.org/wiki/File:The_Scream.jpg" target="_blank" rel="noreferrer">Wikimedia Commons</a>',
  },
];

/** ===== Utils ===== */
function toCentury(y) {
  return y > 0 ? Math.ceil(y / 100) : Math.ceil((y + 1) / 100);
}

export default function Play() {
  const [i, setI] = useState(0);
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const [hints, setHints] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [high, setHigh] = useState(0);
  const timerRef = useRef(null);

  // high score
  useEffect(() => {
    const h = Number(localStorage.getItem("artchrono_high") || 0);
    setHigh(h);
  }, []);

  // timer
  useEffect(() => {
    setTimeLeft(20);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setScore((s) => s - 5);
          setHints(0);
          setAnswer("");
          setI((x) => x + 1);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [i]);

  if (i >= DATA.length) {
    if (score > high) {
      localStorage.setItem("artchrono_high", String(score));
      setHigh(score);
    }

    return (
      <main className="container center" style={{ minHeight: "70vh", textAlign: "center" }}>
        <div className="card">
          <h1 className="h2">Manche terminée 🎉</h1>
          <p className="lead" style={{ marginTop: 8 }}>
            Score final : <b>{score}</b> — Meilleur score : <b>{high}</b>
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "center" }}>
            <button
              onClick={() => {
                setI(0);
                setScore(0);
              }}
              className="btn btn-primary"
            >
              Rejouer
            </button>
            <a href="/" className="btn">Accueil</a>
          </div>
        </div>
      </main>
    );
  }

  const a = DATA[i];
  const pct = (timeLeft / 20) * 100;

  function submit() {
    const g = answer.trim().toLowerCase();
    let ok = false;

    const ym = g.match(/-?\d{1,4}/);
    if (ym) {
      const y = parseInt(ym[0], 10);
      if (!Number.isNaN(y)) ok = Math.abs(y - a.year) <= 10;
    }

    if (!ok) {
      const cm = g.match(/-?\d{1,2}/);
      if (cm) ok = parseInt(cm[0], 10) === toCentury(a.year);
    }

    const bonus = ok && timeLeft >= 10 ? 3 : 0;
    setScore((s) => s + (ok ? 10 : -5) + bonus - hints);

    setAnswer("");
    setHints(0);
    setI(i + 1);
  }

  return (
    <main className="container">
      {/* Toolbar avec timer intégré */}
      <div className="toolbar">
        <div>Score : <b>{score}</b></div>

        <div className="toolbar-timer">
          <div className="bar">
            <div className="fill" style={{ width: `${pct}%` }} />
          </div>
          <span className="meta" style={{ minWidth: 30, textAlign: "right" }}>{timeLeft}s</span>
        </div>

        <div>Œuvre {i + 1}/{DATA.length}</div>
      </div>

      {/* Carte image + crédit */}
      <div className="card" style={{ marginTop: 16 }}>
        <img src={a.image} alt={a.title} className="img" />
        <p className="meta"><em>{a.title}</em></p>
        <p className="meta"><a href={a.source} target="_blank" rel="noreferrer">Source</a></p>
        {a.credit && <p className="meta" dangerouslySetInnerHTML={{ __html: a.credit }} />}
      </div>

      {/* Carte indices + réponse */}
      <div className="card" style={{ marginTop: 16 }}>
        <div style={{ fontSize: 14, color: "var(--muted)" }}>
          {hints >= 1 && <p>Indice 1 : {a.hints[0]}</p>}
          {hints >= 2 && <p>Indice 2 : {a.hints[1]}</p>}
          {hints >= 3 && <p>Indice 3 : {a.hints[2]}</p>}
        </div>

        {hints < 3 && (
          <button onClick={() => setHints((h) => h + 1)} className="btn" style={{ marginTop: 8 }}>
            Débloquer indice (−1)
          </button>
        )}

        <div style={{ marginTop: 16 }}>
          <label className="label">Réponse (année ou siècle, ex. “1500” ou “15”)</label>
          <input
            className="input"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Ex: 1500 ou 15"
          />
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <button onClick={submit} className="btn btn-primary">Valider</button>
            <button
              onClick={() => {
                setScore((s) => s - 5);
                setI(i + 1);
                setHints(0);
                setAnswer("");
              }}
              className="btn"
            >
              Passer (−5)
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}







