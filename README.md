# Movie Mood Finder – dokumentace projektu

## 1. Účel aplikace

Movie Mood Finder je webová aplikace, která pomáhá uživatelům vybrat film podle nálady nebo náhodného výběru. Uživatel může:
- získat náhodný film
- vybrat film podle „mood“ (nálady)
- vyhledávat filmy
- ukládat filmy do watchlistu

---

## 2. Použité technologie

- HTML5 (struktura)
- Bootstrap (UI)
- JavaScript (logika aplikace)
- localStorage (uložení watchlistu)
- Service Worker (PWA offline režim)
- TMDB API / OMDb API (filmová data)

---

## 3. Struktura projektu
/Projekt_2.Pol2
│
├── index.html # hlavní stránka aplikace
├── script.js # logika aplikace (API, UI, watchlist) 
│
├── service-worker.js # PWA offline cache
├── manifest.json # PWA konfigurace 
│
└── /docs # dokumentace (tento soubor)

---

## 4. API – použití a endpointy

Aplikace využívá filmové API (např. OMDb API / TMDB API).

### 4.1 Vyhledání filmu podle názvu
GET https://www.omdbapi.com/?s={title}&apikey={API_KEY}
Vrací seznam filmů odpovídajících vyhledávání.

---

### 4.2 Detail filmu
GET https://www.omdbapi.com/?i={imdbID}&apikey={API_KEY}

Vrací detailní informace o konkrétním filmu.

---

### 4.3 Náhodný film
GET https://api.example.com/discover/random

Simulovaný výběr náhodného filmu z databáze.

---

## 5. Princip fungování aplikace

### 5.1 Vyhledávání filmů
Uživatel zadá název filmu → JavaScript odešle request na API → zobrazí se seznam výsledků jako karty.

---

### 5.2 Výběr filmu podle mood
Uživatel zvolí náladu:
- dark
- emotional
- comforting
- chaotic
- weird
- mysterious

Na základě žánrů v API:
- aplikace filtruje filmy
- pokud film neodpovídá mood → vybere se další

---

### 5.3 Watchlist
- filmy se ukládají do `localStorage`
- každý film je identifikován přes `imdbID`
- uživatel může přidávat/odebírat filmy

---

### 5.4 PWA režim
- service worker cachuje statické soubory
- aplikace funguje offline (UI + watchlist)
- API nefunguje bez internetu (omezení externího API)

---

## 6. Použití localStorage

javascript
localStorage.setItem("watchlist", JSON.stringify(array));
•	ukládá seznam filmů 
•	data zůstávají po reloadu 
•	nevyžaduje backend 
________________________________________
7. Service Worker (offline režim)
Funkce:
•	cachování HTML, CSS, JS 
•	umožňuje otevření aplikace bez internetu 
Omezení:
•	API data nejsou dostupná offline 
•	pouze UI a uložené filmy fungují 
________________________________________
8. Use-case diagram
Uživatel
  |
  |--> Vyhledá film
  |        |
  |        --> Zobrazí výsledky z API
  |
  |--> Vybere náladu (mood)
  |        |
  |        --> Aplikace filtruje filmy podle žánrů
  |
  |--> Klikne na film
  |        |
  |        --> Zobrazí detail filmu
  |
  |--> Přidá do watchlistu
           |
           --> Uloží do localStorage
________________________________________
9. Hlavní funkce aplikace
•	vyhledávání filmů 
•	doporučení filmů podle nálady 
•	náhodný výběr filmu 
•	detail filmu (poster, hodnocení, popis) 
•	watchlist (uložené filmy) 
•	PWA režim (offline UI)
