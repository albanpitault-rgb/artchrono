"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

/** ===== Données ===== */
const DATA = [
  {
    title: "La Mort de Marat",
    image: "/img/marat.jpg",
    question: "Qui est l’auteur de cette œuvre ?",
    options: ["Jacques-Louis David", "Jean-Auguste-Dominique Ingres", "Eugène Delacroix", "Francisco de Goya"],
    answer: "Jacques-Louis David",
    source: "https://fr.wikipedia.org/wiki/La_Mort_de_Marat",
    credit: 'Domaine public via <a href="https://commons.wikimedia.org/wiki/File:Jacques-Louis_David_-_La_Mort_de_Marat.jpg" target="_blank" rel="noreferrer">Wikimedia Commons</a>',
  },
  {
    title: "David (statue)",
    image: "/img/david.jpg",
    question: "Qui a sculpté ce David ?",
    options: ["Donatello", "Michel-Ange", "Gian Lorenzo Bernini", "Benvenuto Cellini"],
    answer: "Michel-Ange",
    source: "https://fr.wikipedia.org/wiki/David_(Michel-Ange)",
    credit: 'Par Jörg Bittner Unna — CC BY 3.0 via <a href="https://commons.wikimedia.org/w/index.php?curid=56633971" target="_blank" rel="noreferrer">Wikimedia Commons</a>',
  },
  {
    title: "La Joconde",
    image: "/img/joconde.jpg",
    question: "Qui est l’auteur de cette œuvre ?",
    options: ["Raphaël", "Léonard de Vinci", "Michel-Ange", "Botticelli"],
    answer: "Léonard de Vinci",
    source: "https://fr.wikipedia.org/wiki/La_Joconde",
    credit: 'Par Léonard de Vinci — Domaine public via <a href="https://commons.wikimedia.org/wiki/File:Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg" target="_blank" rel="noreferrer">Wikimedia Commons</a>',
  },
  {
    title: "La Nuit étoilée",
    image: "/img/nuit_etoilee.jpg",
    question: "Qui est l’auteur de cette œuvre ?",
    options: ["Claude Monet", "Paul Cézanne", "Vincent van Gogh", "Edvard Munch"],
    answer: "Vincent van Gogh",
    source: "https://fr.wikipedia.org/wiki/La_Nuit_%C3%A9toil%C3%A9e",
    credit: 'Domaine public via <a href="https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg" target="_blank" rel="noreferrer">Wikimedia Commons</a>',
  },
  {
    title: "La Naissance de Vénus",
    image: "/img/venus.jpg",
    question: "Qui est l’auteur de cette œuvre ?",
    options: ["Sandro Botticelli", "Raphaël", "Giotto", "Caravage"],
    answer: "Sandro Botticelli",
    source: "https://fr.wikipedia.org/wiki/La_Naissance_de_V%C3%A9nus_(Botticelli)",
    credit: 'Domaine public via <a href="https://commons.wikimedia.org/wiki/File:Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg" target="_blank" rel="noreferrer">Wikimedia Commons</a>',
  },
  {
    title: "La Jeune Fille à la perle",
    image: "/img/perle.jpg",
    question: "Qui est l’auteur de cette œuvre ?",
    options: ["Rembrandt", "Johannes Vermeer", "Frans Hals", "Peter Paul Rubens"],
    answer: "Johannes Vermeer",
    source: "https://fr.wikipedia.org/wiki/La_Jeune_Fille_%C3%A0_la_perle",
    credit: 'Domaine public via <a href="https://commons.wikimedia.org/wiki/File:Meisje_met_de_parel.jpg" target="_blank" rel="noreferrer">Wikimedia Commons</a>',
  },
  {
    title: "Le Cri",
    image: "/img/cri.jpg",
    question: "Qui est l’auteur de cette œuvre ?",
    options: ["Paul Gauguin", "Edvard Munch", "Vincent van Gogh", "Henri de Toulouse-Lautrec"],
    answer: "Edvard Munch",
    source: "https://fr.wikipedia.org/wiki/Le_Cri",
    credit: 'Domaine public via <a href="https://commons.wikimedia.org/wiki/File:The_Scream.jpg" target="_blank" rel="noreferrer">Wikimedia Commons</a>',
  },
];

/** ===== Utils & Composant ===== */
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function ArtistMode() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(20);
  const [high, setHigh] = useState(0);
  const [locked, setLocked] = useState(false);
  const [picked, setPicked] = useState(null);
  const timerRef = useRef(null);

  const finished = i >= DATA.length;

  useEffect(() => {
    setHigh(Number(localStorage.getItem("artchrono_high_artist") || 0));
  }, []);

  const safeOptions = finished ? [] : DATA[i].options;
  const options = useMemo(() => shuffle(safeOptions), [safeOptions]);

  useEffect(() => {
    if (finished) return;
    setTimeLeft(20);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          setScore((s) => s - 5);
          next();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [i, finished]);

  if (finished) {
    if (score > high) localStorage.setItem("artchrono_high_artist", String(score));
    return (
      <main className="container center" style={{ minHeight: "70vh", textAlign: "center" }}>
        <div className="card">
          <h1 className="h2">Manche terminée 🎉</h1>
          <p className="lead" style={{ marginTop: 8 }}>
            Score final : <b>{score}</b> — Meilleur : <b>{Math.max(high, score)}</b>
          </p>
          <div style={{ display: "flex", gap: 10, marginTop: 14, justifyContent: "center" }}>
            <button onClick={() => { setI(0); setScore(0); }} className="btn btn-primary">Rejouer</button>
            <Link href="/" className="btn">Accueil</Link>
          </div>
        </div>
      </main>
    );
  }

  const a = DATA[i];
  const pct = (timeLeft / 20) * 100;

  function choose(option) {
    if (locked) return;
    setLocked(true);
    setPicked(option);

    const correct = option === a.answer;
    const bonus = correct && timeLeft >= 10 ? 3 : 0;
    setScore((s) => s + (correct ? 10 : -5) + bonus);

    setTimeout(() => next(), 800);
  }

  function next() {
    setPicked(null);
    setLocked(false);
    setI((x) => x + 1);
  }

  return (
    <main className="container">
      <div className="toolbar">
        <div>Score : <b>{score}</b></div>
        <div className="toolbar-timer">
          <div className="bar"><div className="fill" style={{ width: `${pct}%` }} /></div>
          <span className="meta" style={{ minWidth: 30, textAlign: "right" }}>{timeLeft}s</span>
        </div>
        <div>Œuvre {i + 1}/{DATA.length}</div>
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <img src={a.image} alt={a.title} className="img" />
        <p className="meta"><em>{a.title}</em></p>
        <p className="meta"><a href={a.source} target="_blank" rel="noreferrer">Source</a></p>
        {a.credit && <p className="meta" dangerouslySetInnerHTML={{ __html: a.credit }} />}
      </div>

      <div className="card" style={{ marginTop: 16 }}>
        <h2 className="h2" style={{ marginTop: 0, fontSize: 20 }}>{a.question}</h2>
        <div className="grid" style={{ marginTop: 8 }}>
          {options.map((opt) => {
            const isPicked = picked === opt;
            const isCorrect = opt === a.answer;
            const bg =
              picked == null ? "transparent" :
              isCorrect ? "rgba(91,213,160,0.15)" :
              isPicked ? "rgba(255,107,107,0.18)" : "transparent";
            const border =
              picked == null ? "var(--line)" :
              isCorrect ? "rgba(91,213,160,0.8)" :
              isPicked ? "rgba(255,107,107,0.8)" : "var(--line)";
            return (
              <button
                key={opt}
                disabled={locked}
                onClick={() => choose(opt)}
                className="btn"
                style={{ justifyContent: "flex-start", borderColor: border, background: bg, padding: "14px 16px" }}
              >
                {opt}
              </button>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <Link href="/play" className="btn">← Devine la Date</Link>
          <Link href="/" className="btn">Accueil</Link>
        </div>
      </div>
    </main>
  );
}




