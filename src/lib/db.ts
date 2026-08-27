export interface Lesson {
  id: string;
  title: string;
  grade: '5' | '6' | '7' | '8';
  topic: 'Algoritmi' | 'Scratch' | 'Limbaje Text' | 'Instrumente TIC' | 'Cetatenie Digitala';
  excerpt: string;
  content: string; // supports Markdown/HTML
  interactiveType?: 'scratchpad' | 'block-runner' | 'quiz-preview' | 'flowchart';
  interactiveData?: any;
}

export interface Exercise {
  id: string;
  title: string;
  grade: '5' | '6' | '7' | '8';
  difficulty: 'Usor' | 'Mediu' | 'Avansat';
  topic: string;
  description: string;
  starterCode?: string;
  expectedOutput?: string;
  validationLogic?: string; // JavaScript snippet to validate input
}

export interface QuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'boolean' | 'fill-in';
  options?: string[]; // for single choice
  correctAnswer: string;
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  grade: '5' | '6' | '7' | '8';
  topic: string;
  timeLimitMinutes: number;
  questions: QuizQuestion[];
}

export interface PrintableResource {
  id: string;
  title: string;
  grade: '5' | '6' | '7' | '8';
  category: 'Fisa de lucru' | 'Barem de corectare' | 'Manual' | 'Schema recapitulativa';
  description: string;
  fileSize: string;
  downloadUrl: string;
}

export interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  category: 'Metodica' | 'Olimpiade' | 'Noutati' | 'Ghiduri';
  excerpt: string;
  content: string;
  readTime: string;
}

// Initial Mock Data
const defaultLessons: Lesson[] = [
  {
    id: 'l1',
    title: 'Ce este un algoritm? Introducere și Proprietăți',
    grade: '5',
    topic: 'Algoritmi',
    excerpt: 'Descoperă conceptul fundamental al informaticii: algoritmul. Învață proprietățile sale principale prin exemple din viața de zi cu zi.',
    content: `### Introducere în Algoritmi

Un **algoritm** este o succesiune finită de pași bine definiți care, executați într'o ordine precisă, duc la rezolvarea unei probleme într'un timp finit.

Gândește-te la un algoritm ca la o **rețetă de bucătărie** sau la instrucțiunile de asamblare ale unei jucării din piese Lego. Dacă urmezi pașii corect, vei obține rezultatul dorit!

#### Proprietățile fundamentale ale unui algoritm:
1. **Claritatea (Determinismul):** Fiecare pas trebuie să fie clar și precis descris, fără nicio ambiguitate.
2. **Finitudinea:** Algoritmul trebuie să se termine după un număr finit (limitat) de pași.
3. **Generalitatea:** Algoritmul trebuie să poată rezolva o întreagă clasă de probleme similare (de exemplu, o rețetă de clătite funcționează indiferent dacă vrei 5 sau 10 clătite, ajustând proporțiile).
4. **Corectitudinea:** Pentru orice date de intrare valide, algoritmul trebuie să producă rezultatul corect.

#### Exemplu: Algoritmul pentru trecerea străzii
1. Te oprești la marginea trotuarului.
2. Te uiți în stânga, apoi în dreapta, apoi iar în stânga.
3. Dacă vine o mașină, aștepți până trece și revii la pasul 2.
4. Dacă nu vine nicio mașină, traversezi pe trecerea de pietoni.`,
    interactiveType: 'flowchart',
    interactiveData: {
      steps: [
        { label: 'Start', type: 'terminal' },
        { label: 'Te oprești la trotuar', type: 'process' },
        { label: 'Te uiți în stânga și în dreapta', type: 'process' },
        { label: 'Vine vreo mașină?', type: 'decision', yes: 1, no: 4 },
        { label: 'Traversezi în siguranță', type: 'process' },
        { label: 'Stop', type: 'terminal' }
      ]
    }
  },
  {
    id: 'l2',
    title: 'Introducere în Scratch: Primii Pași cu Personaje',
    grade: '5',
    topic: 'Scratch',
    excerpt: 'Fă cunoștință cu motanul Scratchy! Învață cum să controlezi mișcarea personajelor prin blocuri de cod vizuale.',
    content: `### Bine ai venit în Scratch!

**Scratch** este un limbaj de programare vizual, dezvoltat de MIT, creat special pentru a te ajuta să înțelegi logica programării într'un mod distractiv. Nu trebuie să scrii cod, ci doar să îmbuci piese ca la un joc de puzzle!

#### Interfața Scratch conține trei zone principale:
1. **Scena (Stage):** Locul unde prințesele, roboții și pisicile prin viață.
2. **Paleta de blocuri (Blocks Palette):** Biblioteca ta de instrucțiuni colorate pe categorii (Mișcare, Aspect, Sunet, Evenimente, Control, etc.).
3. **Zona de scripturi (Workspace):** Spațiul central unde tragi și asamblezi blocurile pentru a crea programe.

#### Primul tău program:
Pentru a face personajul să se miște când apeși pe Steagul Verde:
- Mergi la categoria **Evenimente** și alege blocul \`când se dă clic pe stegulețul verde\`.
- Mergi la categoria **Mișcare** și lipește dedesubt blocul \`mergi 10 pași\`.
- Rulează programul dând clic pe stegulețul verde de deasupra scenei!`,
    interactiveType: 'block-runner',
    interactiveData: {
      blocks: ['când se dă clic pe steguleț', 'mergi 10 pași', 'redă sunetul miau până la capăt']
    }
  },
  {
    id: 'l3',
    title: 'Structura Alternativă (Dacă... Atunci... Altfel)',
    grade: '6',
    topic: 'Algoritmi',
    excerpt: 'Învață cum computerul ia decizii. Structura alternativă permite ramificarea execuției în funcție de condiții.',
    content: `### Structura Alternativă (Decizia)

În viață, luăm decizii în mod constant: *Dacă plouă, atunci îmi iau umbrela, altfel îmi iau ochelarii de soare*.

În programare, această logică se numește **structură alternativă** sau **instrucțiune condițională**.

#### Pseudocod:
\`\`\`
Dacă (condiție) Atunci
    execută instrucțiunile A
Altfel
    execută instrucțiunile B
Sfârșit Dacă
\`\`\`

#### Cum funcționează?
1. Computerul evaluează **condiția** (care poate fi adevărată sau falsă).
2. Dacă condiția este **Adevărată**, se execută doar instrucțiunile scrise pe ramura **Atunci**.
3. Dacă condiția este **Falsă**, se execută doar instrucțiunile de pe ramura **Altfel**.
4. După execuția ramurii alese, programul merge mai departe cu pașii următori.`,
    interactiveType: 'scratchpad',
    interactiveData: {
      starter: `# Scrie un program care verifică dacă nota introdusă este de trecere (>= 5)
nota = 7

if nota >= 5:
    print("Promovat!")
else:
    print("Nepromovat")`,
      expectedOutput: 'Promovat!'
    }
  },
  {
    id: 'l4',
    title: 'Introducere în Python: Variabile și Operații Simple',
    grade: '7',
    topic: 'Limbaje Text',
    excerpt: 'Trecem de la blocurile vizuale la codul scris! Descoperă sintaxa simplă și elegantă a limbajului Python.',
    content: `### Ce este Python?

**Python** este unul dintre cele mai populare limbaje de programare din lume datorită sintaxei sale simple, foarte apropiată de limba engleză.

#### 1. Ce este o Variabilă?
O **variabilă** este ca o cutiuță etichetată în memoria computerului, în care putem păstra valori (numere, cuvinte, liste).

\`\`\`python
nume = "Alex"
varsta = 13
inaltime = 1.65
\`\`\`

#### 2. Reguli pentru numirea variabilelor:
- Pot conține litere, cifre și caracterul sublinie (\`_\`).
- Nu pot începe cu o cifră.
- Sunt sensibile la litere mari/mici (\`nota\` și \`Nota\` sunt două variabile diferite).

#### 3. Operații matematice de bază:
- Adunare: \`+\`
- Scădere: \`-\`
- Înmulțire: \`*\`
- Împărțire: \`/\`
- Împărțire întreagă: \`//\` (ne dă doar câtul)
- Restul împărțirii: \`%\` (modulo)`,
    interactiveType: 'scratchpad',
    interactiveData: {
      starter: `a = 15
b = 4

suma = a + b
catul = a // b
restul = a % b

print("Suma este:", suma)
print("Catul este:", catul)
print("Restul este:", restul)`,
      expectedOutput: "Suma este: 19\nCatul este: 3\nRestul este: 3"
    }
  },
  // Clasa a V-a - Modulul 1: Primii pași și hardware-ul
  {
    id: 'v5_l1',
    title: 'L1. Bun venit la Informatică și TIC',
    grade: '5',
    topic: 'Instrumente TIC',
    excerpt: 'Primul contact cu disciplina. Ce învățăm anul acesta, regulile laboratorului și organizarea orelor.',
    content: `### Bun venit la ora de Informatică și TIC!

Dragi elevi, bine ați venit într-o nouă aventură alături de **Bitzy**, mascotta noastră digitală! 🤖

#### Ce vom învăța anul acesta?
Informatica și TIC (Tehnologia Informației și a Comunicațiilor) ne ajută să înțelegem cum funcționează calculatoarele și cum le putem folosi pentru a crea lucruri minunate.

**Anul școlar este împărțit în 5 module:**
1. **Hardware și Siguranță** – Cum e făcut un calculator
2. **Sistemul de Operare și Internet** – Cum organizăm fișierele și căutăm informații
3. **Creație Grafică** – Desenăm și creăm imagini digitale
4. **Algoritmi și Scratch** – Învață să gândești ca un programator
5. **Proiect Final** – Creează propriul tău joc digital!

#### Regulile laboratorului de informatică:
- ✅ Intrăm ordonat în laborator și ne așezăm în locurile alocate
- ✅ Nu mâncăm și nu bem lângă calculatoare
- ✅ Semnalăm imediat orice problemă tehnică profesorului
- ✅ Folosim calculatoarele doar în scop educațional
- ✅ La finalul orei, închidem corect aplicațiile și ne asigurăm că stația de lucru este curată

#### Activitate practică:
Deschide calculatorul și loghează-te cu contul tău. Identifică următoarele elemente pe ecran:
- Pictogramele de pe Desktop
- Bara de activități (Taskbar)
- Butonul Start

**Exit ticket:** Scrie 3 reguli importante din laborator pe care le vei respecta întotdeauna.`,
    interactiveType: 'scratchpad',
    interactiveData: {
      starter: `# Scrie aici cele 3 reguli pe care le vei respecta:\n# Regula 1:\n# Regula 2:\n# Regula 3:`,
      expectedOutput: ''
    }
  },
  {
    id: 'v5_l2',
    title: 'L2. Norme de ergonomie și de siguranță',
    grade: '5',
    topic: 'Instrumente TIC',
    excerpt: 'Învață poziția corectă la calculator, cum să îți protejezi ochii și regulile de siguranță electrică.',
    content: `### Ergonomie și Siguranță la Calculator

**Bitzy spune:** "Un calculator bine folosit te ține sănătos!" 💪

#### Poziția corectă la calculator:
1. **Spatele** drept, sprijinit de scaun
2. **Picioarele** pe podea, formând un unghi de 90°
3. **Brațele** relaxate, coatele pe lângă corp
4. **Monitorul** la nivelul ochilor, la aproximativ 50-70 cm distanță
5. **Încheieturile** drepte atunci când tastezi

#### Protejarea ochilor:
- Fă o pauză de 5 minute la fiecare 30 de minute de lucru
- Clipește des pentru a menține ochii hidratați
- Asigură-te că lumina din cameră este adecvată
- Evită reflexiile pe ecran

#### Siguranța electrică:
- Nu atinge cablurile sau prizele cu mâinile ude
- Nu trage de cabluri pentru a deconecta echipamentele
- Semnalează orice miros de ars sau scânteie
- Nu deschide carcasa calculatorului fără permisiune

#### Fișă de auto-verificare:
Completează împreună cu colegul de bancă:
- [ ] Monitorul este la distanța potrivită
- [ ] Scaunul este reglat corect
- [ ] Lumina nu cade direct pe ecran
- [ ] Cablurile sunt aranjate ordonat

**Exit ticket:** Enumeră 3 reguli de ergonomie pe care le vei aplica de azi înainte.`,
    interactiveType: 'flowchart',
    interactiveData: {
      steps: [
        { label: 'Start', type: 'terminal' },
        { label: 'Verifică poziția scaunului', type: 'process' },
        { label: 'Ajustează distanța față de monitor', type: 'process' },
        { label: 'Poziția este corectă?', type: 'decision', yes: 4, no: 1 },
        { label: 'Poți începe lucrul!', type: 'terminal' }
      ]
    }
  },
  {
    id: 'v5_l3',
    title: 'L3. Tipuri de sisteme de calcul și comunicații',
    grade: '5',
    topic: 'Instrumente TIC',
    excerpt: 'Descoperă diferitele tipuri de calculatoare: desktop, laptop, tabletă, smartphone și dispozitive inteligente.',
    content: `### Tipuri de Sisteme de Calcul

**Bitzy explică:** "Calculatoarele sunt peste tot în jurul nostru, nu doar sub forma unui desktop!" 🌐

#### Clasificarea calculatoarelor:

**1. Desktop (Calculator de birou)**
- Format din unitate centrală, monitor, tastatură și mouse
- Puternic, ușor de upgrade-at
- Folosit în: școli, birouri, acasă pentru gaming sau muncă serioasă

**2. Laptop (Calculator portabil)**
- Toate componentele într-un singur dispozitiv subțire
- Alimentat de baterie, ușor de transportat
- Folosit de: studenți, oameni de afaceri, creatori de conținut

**3. Tabletă**
- Ecran tactil, fără tastatură fizică (de obicei)
- Foarte portabilă, ideală pentru citit și navigat pe internet
- Exemple: iPad, Samsung Galaxy Tab

**4. Smartphone (Telefon inteligent)**
- Cel mai mic și mai răspândit calculator
- Are aplicații pentru aproape orice: social media, hărți, jocuri, banking
- Conectivitate: WiFi, 4G/5G, Bluetooth

**5. Dispozitive inteligente (IoT)**
- Ceasuri inteligente (smartwatch)
- Difuzoare inteligente (Google Home, Amazon Echo)
- Termostate inteligente, becuri smart
- Console de jocuri

#### Activitate de clasificare:
Grupați următoarele dispozitive în categoriile de mai sus:
- iPhone 15 → Smartphone
- MacBook Air → Laptop
- PlayStation 5 → Consolă de jocuri
- Apple Watch → Dispozitiv inteligent

**Formativ:** Pe mini-whiteboard, desenați o pictogramă pentru fiecare tip de calculator.`,
    interactiveType: 'scratchpad',
    interactiveData: {
      starter: `# Completează tabelul de clasificare:\n\ndispozitive = {\n    "Desktop": ["PC office", "_______"],\n    "Laptop": ["_______", "Chromebook"],\n    "Tabletă": ["iPad", "_______"],\n    "Smartphone": ["iPhone", "_______"]\n}\n\nprint(dispozitive)`,
      expectedOutput: ''
    }
  },
  {
    id: 'v5_l4',
    title: 'L4. Arhitectura unui sistem de calcul',
    grade: '5',
    topic: 'Instrumente TIC',
    excerpt: 'Descoperă componentele principale ale unui calculator: unitatea centrală, procesorul, memoria și placa de bază.',
    content: `### Arhitectura Calculatorului

**Bitzy dezvăluie:** "Hai să vedem ce se ascunde în interiorul calculatorului!" 🔍

#### Analogia cu corpul uman:
Gândește-te la calculator ca la un corp uman:

| Componentă | Analogie | Rol |
|------------|----------|-----|
| **Procesor (CPU)** | Creierul | Execută calcule și ia decizii |
| **Memorie RAM** | Memoria pe termen scurt | Reține datele în timp ce lucrezi |
| **Hard Disk / SSD** | Memoria pe termen lung | Stochează fișierele permanent |
| **Placă de bază** | Sistemul nervos | Conectează toate componentele |
| **Sursă de alimentare** | Inima | Distribue energie tuturor componentelor |

#### Procesorul (CPU - Central Processing Unit):
- "Creierul" calculatorului
- Execută milioane de operații pe secundă
- Măsurat în GHz (gigahertzi) – cu cât mai mare, cu atât mai rapid
- Producători cunoscuți: Intel, AMD, Apple Silicon

#### Memoria RAM (Random Access Memory):
- Memorie temporară, se golește când închizi calculatorul
- Cu cât ai mai mult RAM, cu atât poți avea mai multe programe deschise simultan
- Standard actual: 8GB - 16GB pentru utilizare normală

#### Placa de bază (Motherboard):
- Circuitul principal care conectează toate componentele
- Are sloturi pentru memorie, procesoare, plăci video
- Porturi USB, audio, rețea sunt integrate aici

#### Activitate practică:
Desenează schema bloc a calculatorului și etichetează componentele principale.

**Formativ:** Completează analogia: "Dacă procesorul este creierul, atunci hard disk-ul este _______."`,
    interactiveType: 'flowchart',
    interactiveData: {
      steps: [
        { label: 'Start', type: 'terminal' },
        { label: 'Datele intră prin tastatură/mouse', type: 'process' },
        { label: 'Procesorul execută operațiile', type: 'process' },
        { label: 'Rezultatele sunt afișate', type: 'process' },
        { label: 'Datele sunt salvate pe HDD/SSD', type: 'process' },
        { label: 'Stop', type: 'terminal' }
      ]
    }
  },
  {
    id: 'v5_l5',
    title: 'L5. Dispozitive de intrare și de ieșire',
    grade: '5',
    topic: 'Instrumente TIC',
    excerpt: 'Identifică și clasifică dispozitivele I/E: tastatură, mouse, monitor, imprimantă, microfon, boxe.',
    content: `### Dispozitive de Intrare și Ieșire (I/E)

**Bitzy întreabă:** "Cum comunicăm noi cu calculatorul și cum ne răspunde el?" ⌨️🖥️

#### Dispozitive de INTRARE (Input):
Transmit date **CĂTRE** calculator

| Dispozitiv | Utilizare |
|------------|-----------|
| **Tastatură** | Introducem text și comenzi |
| **Mouse** | Controlăm cursorul, dăm click |
| **Microfon** | Înregistrăm sunete, voce |
| **Cameră web** | Capturăm imagini și video |
| **Scanner** | Digitalizăm documente pe hârtie |
| **Touchpad** | Înlocuiește mouse-ul la laptop |

#### Dispozitive de IEȘIRE (Output):
Transmit date **DE LA** calculator către noi

| Dispozitiv | Utilizare |
|------------|-----------|
| **Monitor** | Afișează imagini, text, video |
| **Imprimantă** | Tipărește documente pe hârtie |
| **Boxe / Căști** | Redau sunete și muzică |
| **Proiector** | Afișează imagini pe suprafețe mari |
| **Plotter** | Desenează la scară mare (planuri) |

#### Joc de asociere:
Conectează fiecare dispozitiv cu categoria sa:
- Scanner → Intrare
- Monitor → Ieșire
- Microfon → Intrare
- Imprimantă → Ieșire

#### Activitate practică:
La propria stație de lucru, identifică:
- 2 dispozitive de intrare
- 2 dispozitive de ieșire
- 1 dispozitiv care poate fi ambele (ex: ecran tactil)

**Formativ:** Tabel de clasificare – completează individual.`,
    interactiveType: 'scratchpad',
    interactiveData: {
      starter: `# Clasifică dispozitivele:\n\ndispozitive_intrare = ["tastatură", "mouse", "_______", "_______"]\ndispozitive_iesire = ["monitor", "imprimantă", "_______", "_______"]\n\nprint("Intrare:", dispozitive_intrare)\nprint("Ieșire:", dispozitive_iesire)`,
      expectedOutput: ''
    }
  },
  {
    id: 'v5_l6',
    title: 'L6. Dispozitive de stocare și cloud computing',
    grade: '5',
    topic: 'Instrumente TIC',
    excerpt: 'Explorează opțiunile de stocare: HDD, SSD, USB, carduri de memorie și serviciile cloud.',
    content: `### Dispozitive de Stocare și Cloud

**Bitzy recomandă:** "Salvează-ți mereu munca în mai multe locuri!" 💾☁️

#### De ce avem nevoie de stocare?
- Memoria RAM este temporară – se pierde când închizi calculatorul
- Avem nevoie de un loc permanent pentru fișierele noastre (documente, poze, jocuri)

#### Tipuri de dispozitive de stocare:

**1. HDD (Hard Disk Drive)**
- Tehnologie veche, cu discuri magnetice rotative
- Capacitate mare (1TB - 10TB), preț accesibil
- Mai lent, sensibil la șocuri

**2. SSD (Solid State Drive)**
- Tehnologie nouă, fără piese mobile
- Mult mai rapid decât HDD
- Mai rezistent, consumă mai puțin curent
- Standardul actual pentru calculatoare moderne

**3. Stick USB (Flash drive)**
- Portabil, ușor de transportat
- Capacități: 8GB - 256GB
- Ideal pentru transfer rapid de fișiere

**4. Card de memorie (SD, microSD)**
- Folosit în telefoane, camere foto, drone
- Foarte compact
- Capacități până la 1TB

**5. Cloud Storage (Stocare în nor)**
- Fișierele tale sunt pe servere la distanță
- Accesibil de oriunde ai internet
- Exemple: Google Drive, OneDrive, Dropbox
- Avantaje: backup automat, partajare ușoară

#### Comparație practică:
| Tip | Capacitate tipică | Viteză | Portabilitate |
|-----|-------------------|--------|---------------|
| HDD | 1TB - 4TB | Lentă | Scăzută |
| SSD | 256GB - 2TB | Foarte rapidă | Medie |
| USB | 16GB - 128GB | Rapidă | Foarte mare |
| Cloud | Nelimitat* | Depinde de net | Oriunde |

**Activitate:** Completează tabelul de clasificare cu exemple din experiența ta.

**Formativ:** Care este diferența dintre RAM și HDD?`,
    interactiveType: 'scratchpad',
    interactiveData: {
      starter: `# Compară dispozitivele de stocare:\n\nstocare = {\n    "HDD": {"capacitate": "1TB+", "viteza": "lentă", "preț": "ieftin"},\n    "SSD": {"capacitate": "______", "viteza": "______", "preț": "______"},\n    "USB": {"capacitate": "______", "viteza": "______", "preț": "______"}\n}\n\nfor tip, info in stocare.items():\n    print(f"{tip}: {info}")`,
      expectedOutput: ''
    }
  },
  {
    id: 'v5_l7',
    title: 'L7. Recapitulare și evaluare – Modulele 1-2',
    grade: '5',
    topic: 'Instrumente TIC',
    excerpt: 'Sinteză hardware și siguranță. Probă scurtă cu itemi variați și feedback formativ.',
    content: `### Recapitulare și Evaluare – Hardware și Siguranță

**Bitzy te provoacă:** "Arată ce ai învățat despre calculatoare!" 🏆

#### Sinteză rapidă:

**1. Ergonomie și siguranță:**
- Poziția corectă la calculator
- Pauze regulate pentru ochi
- Reguli de siguranță electrică

**2. Tipuri de calculatoare:**
- Desktop, laptop, tabletă, smartphone, dispozitive IoT

**3. Arhitectura calculatorului:**
- CPU (procesor) = creierul
- RAM = memorie temporară
- HDD/SSD = stocare permanentă
- Placă de bază = conexiuni

**4. Dispozitive I/E:**
- Intrare: tastatură, mouse, microfon, scanner
- Ieșire: monitor, imprimantă, boxe
- I/E: ecran tactil, modem/router

**5. Stocare:**
- HDD vs SSD
- USB, carduri SD
- Cloud storage

#### Probă de evaluare:

**Partea I – Itemi obiectivi (3 puncte):**
1. Care componentă este considerată "creierul" calculatorului?
   a) HDD  b) CPU  c) RAM  d) Monitor

2. Un stick USB este un dispozitiv de:
   a) Intrare  b) Ieșire  c) Stocare  d) Procesare

3. Pentru a proteja ochii, ar trebui să faci o pauză la fiecare:
   a) 10 minute  b) 30 minute  c) 2 ore  d) 4 ore

**Partea II – Răspuns scurt (3 puncte):**
4. Enumeră 2 dispozitive de intrare și 2 de ieșire.
5. Explică diferența dintre HDD și SSD.
6. De ce este importantă poziția corectă la calculator?

**Partea III – Practic (3 puncte):**
7. La stația ta de lucru, identifică și notează:
   - Tipul de calculator (desktop/laptop)
   - Dispozitivele de intrare disponibile
   - Dispozitivele de ieșire disponibile

**Feedback formativ:** Se vor discuta erorile frecvente și se vor oferi explicații suplimentare.

**Temă:** Creează o diagramă cu componentele calculatorului tău de acasă.`,
    interactiveType: 'quiz-preview',
    interactiveData: {
      questions: [
        { question: "Care este 'creierul' calculatorului?", answer: "CPU (Procesorul)" },
        { question: "RAM este memorie permanentă?", answer: "Fals – este temporară" },
        { question: "Cloud storage înseamnă stocare locală?", answer: "Fals – este la distanță" }
      ]
    }
  }
];

const defaultExercises: Exercise[] = [
  {
    id: 'e1',
    title: 'Calculul Mediei Semestriale',
    grade: '5',
    difficulty: 'Usor',
    topic: 'Algoritmi',
    description: 'Scrie în limbaj natural sau pseudocod pașii pentru calcularea mediei a trei note la TIC.',
    starterCode: '// Introdu pașii aici sub formă de text ordonat\nPasul 1: ',
    expectedOutput: 'Pasul 1'
  },
  {
    id: 'e2',
    title: 'Măsurarea Temperaturii apei',
    grade: '6',
    difficulty: 'Mediu',
    topic: 'Algoritmi',
    description: 'Avem un termometru digital care indică temperatura apei. Scrie un algoritm (structură alternativă) care afișează "Gheață" dacă temperatura este sub sau egală cu 0, "Lichidă" pentru valori între 1 și 99, și "Aburi" pentru valori >= 100.',
    starterCode: `temp = 25

# Scrie instrucțiunea if-elif-else potrivită mai jos:
if temp <= 0:
    print("Gheață")
elif temp >= 100:
    print("Aburi")
else:
    print("Lichidă")`,
    expectedOutput: 'Lichidă'
  },
  {
    id: 'e3',
    title: 'Suma primelor N numere naturale',
    grade: '7',
    difficulty: 'Avansat',
    topic: 'Limbaje Text',
    description: 'Completează codul Python pentru a calcula suma tuturor numerelor de la 1 la N folosind o buclă `for`.',
    starterCode: `N = 10
suma = 0

# Folosește o buclă for pentru a calcula suma
for i in range(1, N + 1):
    suma = suma + i

print("Suma este:", suma)`,
    expectedOutput: 'Suma este: 55'
  }
];

const defaultQuizzes: Quiz[] = [
  {
    id: 'q1',
    title: 'Test Inițial: Concepte de bază din Algoritmi',
    grade: '5',
    topic: 'Algoritmi',
    timeLimitMinutes: 10,
    questions: [
      {
        id: 'q1_1',
        question: 'Care dintre următoarele reprezintă o proprietate a unui algoritm?',
        type: 'single',
        options: ['Infinitatea pașilor', 'Finitudinea și claritatea', 'Complexitatea maximă', 'Limbajul greoi'],
        correctAnswer: 'Finitudinea și claritatea',
        explanation: 'Un algoritm trebuie să aibă un număr limitat de pași (finitudine) și să fie complet neambiguu (claritate).'
      },
      {
        id: 'q1_2',
        question: 'Este rețeta de clătite un exemplu de algoritm?',
        type: 'boolean',
        options: ['Da', 'Nu'],
        correctAnswer: 'Da',
        explanation: 'Da, deoarece reprezintă o listă ordonată de pași preciși care duc la un rezultat final finit.'
      }
    ]
  },
  {
    id: 'q2',
    title: 'Test: Structuri de Control în Scratch',
    grade: '6',
    topic: 'Scratch',
    timeLimitMinutes: 15,
    questions: [
      {
        id: 'q2_1',
        question: 'Ce bloc folosești în Scratch pentru a rula la nesfârșit o instrucțiune?',
        type: 'single',
        options: ['repetă de 10 ori', 'la nesfârșit (forever)', 'dacă ... atunci', 'așteaptă 1 secunde'],
        correctAnswer: 'la nesfârșit (forever)',
        explanation: 'Blocul "la nesfârșit" rulează continuu blocurile interioare pe tot parcursul programului.'
      },
      {
        id: 'q2_2',
        question: 'În Scratch, variabilele pot fi folosite pentru a stoca scorul unui joc?',
        type: 'boolean',
        options: ['Da', 'Nu'],
        correctAnswer: 'Da',
        explanation: 'Variabilele stochează valori dinamice care pot fi modificate pe parcursul rulării jocului.'
      }
    ]
  }
];

const defaultResources: PrintableResource[] = [
  {
    id: 'r1',
    title: 'Fișă de lucru: Algoritmi și Scheme Logice',
    grade: '5',
    category: 'Fisa de lucru',
    description: 'O fișă practică cu 5 exerciții interactive pentru trasarea și desenarea schemelor logice elementare.',
    fileSize: '420 KB',
    downloadUrl: '#'
  },
  {
    id: 'r2',
    title: 'Manual de buzunar pentru Scratch 3.0',
    grade: '6',
    category: 'Manual',
    description: 'Broșură explicativă cu toate blocurile de bază din Scratch, codurile de culori și sfaturi utile de programare.',
    fileSize: '1.8 MB',
    downloadUrl: '#'
  },
  {
    id: 'r3',
    title: 'Barem Model Evaluare Națională - Clasa a VIII-a',
    grade: '8',
    category: 'Barem de corectare',
    description: 'Baremul oficial de corectare pentru testul grilă recapitulativ din materia de Informatica & TIC.',
    fileSize: '310 KB',
    downloadUrl: '#'
  }
];

const defaultBlogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'Cum predăm Scratch la gimnaziu: 3 strategii de succes',
    author: 'Prof. Popescu Maria',
    date: '2026-08-20',
    category: 'Metodica',
    excerpt: 'Metode interactive de a stârni curiozitatea elevilor fără a-i speria cu sintaxă complexă de cod.',
    content: `<p>Predarea programării la gimnaziu reprezintă o provocare superbă. La vârstele de 11-13 ani, gândirea abstractă este în plină formare. Iată trei recomandări practice:</p>
    <ul>
      <li><strong>1. Începe cu povestea:</strong> În loc să le explici ce este o variabilă, roagă-i să creeze un scor pentru jocul preferat.</li>
      <li><strong>2. Codificarea fizică:</strong> Joacă jocuri în clasă unde un elev este "robotul" iar ceilalți îi oferă comenzi precise de deplasare.</li>
      <li><strong>3. Încurajează greșeala:</strong> La informatică, un bug nu este o notă proastă, ci un puzzle care așteaptă să fie rezolvat!</li>
    </ul>`,
    readTime: '5 min'
  },
  {
    id: 'b2',
    title: 'Olimpiada de Informatică (Gimnaziu): Ghid de Pregătire',
    author: 'Inspectoratul Școlar',
    date: '2026-08-25',
    category: 'Olimpiade',
    excerpt: 'Resurse oficiale, calendare competiționale și recomandări de algoritmi pentru faza județeană.',
    content: `<p>Pregătirea elevilor de gimnaziu pentru olimpiadă se face de la primele ore de clasă. Iată temele recomandate pentru clasa a VII-a și a VIII-a:</p>
    <ol>
      <li>Divizibilitate, descompunerea în factori primi.</li>
      <li>Vectori (tablouri unidimensionale) - elemente de căutare și sortare.</li>
      <li>Gândire de tip greedy.</li>
    </ol>`,
    readTime: '8 min'
  }
];

// Database operations with LocalStorage fallback to support reactivity
export const db = {
  getLessons: (): Lesson[] => {
    if (typeof window === 'undefined') return defaultLessons;
    const stored = localStorage.getItem('c360_lessons');
    if (!stored) {
      localStorage.setItem('c360_lessons', JSON.stringify(defaultLessons));
      return defaultLessons;
    }
    return JSON.parse(stored);
  },
  saveLesson: (lesson: Lesson): Lesson[] => {
    const lessons = db.getLessons();
    const existingIndex = lessons.findIndex((l) => l.id === lesson.id);
    if (existingIndex > -1) {
      lessons[existingIndex] = lesson;
    } else {
      lessons.push(lesson);
    }
    localStorage.setItem('c360_lessons', JSON.stringify(lessons));
    return lessons;
  },
  deleteLesson: (id: string): Lesson[] => {
    const lessons = db.getLessons().filter((l) => l.id !== id);
    localStorage.setItem('c360_lessons', JSON.stringify(lessons));
    return lessons;
  },

  getExercises: (): Exercise[] => {
    if (typeof window === 'undefined') return defaultExercises;
    const stored = localStorage.getItem('c360_exercises');
    if (!stored) {
      localStorage.setItem('c360_exercises', JSON.stringify(defaultExercises));
      return defaultExercises;
    }
    return JSON.parse(stored);
  },
  saveExercise: (exercise: Exercise): Exercise[] => {
    const exercises = db.getExercises();
    const existingIndex = exercises.findIndex((e) => e.id === exercise.id);
    if (existingIndex > -1) {
      exercises[existingIndex] = exercise;
    } else {
      exercises.push(exercise);
    }
    localStorage.setItem('c360_exercises', JSON.stringify(exercises));
    return exercises;
  },
  deleteExercise: (id: string): Exercise[] => {
    const exercises = db.getExercises().filter((e) => e.id !== id);
    localStorage.setItem('c360_exercises', JSON.stringify(exercises));
    return exercises;
  },

  getQuizzes: (): Quiz[] => {
    if (typeof window === 'undefined') return defaultQuizzes;
    const stored = localStorage.getItem('c360_quizzes');
    if (!stored) {
      localStorage.setItem('c360_quizzes', JSON.stringify(defaultQuizzes));
      return defaultQuizzes;
    }
    return JSON.parse(stored);
  },
  saveQuiz: (quiz: Quiz): Quiz[] => {
    const quizzes = db.getQuizzes();
    const existingIndex = quizzes.findIndex((q) => q.id === quiz.id);
    if (existingIndex > -1) {
      quizzes[existingIndex] = quiz;
    } else {
      quizzes.push(quiz);
    }
    localStorage.setItem('c360_quizzes', JSON.stringify(quizzes));
    return quizzes;
  },
  deleteQuiz: (id: string): Quiz[] => {
    const quizzes = db.getQuizzes().filter((q) => q.id !== id);
    localStorage.setItem('c360_quizzes', JSON.stringify(quizzes));
    return quizzes;
  },

  getResources: (): PrintableResource[] => {
    if (typeof window === 'undefined') return defaultResources;
    const stored = localStorage.getItem('c360_resources');
    if (!stored) {
      localStorage.setItem('c360_resources', JSON.stringify(defaultResources));
      return defaultResources;
    }
    return JSON.parse(stored);
  },
  saveResource: (resource: PrintableResource): PrintableResource[] => {
    const resources = db.getResources();
    const existingIndex = resources.findIndex((r) => r.id === resource.id);
    if (existingIndex > -1) {
      resources[existingIndex] = resource;
    } else {
      resources.push(resource);
    }
    localStorage.setItem('c360_resources', JSON.stringify(resources));
    return resources;
  },
  deleteResource: (id: string): PrintableResource[] => {
    const resources = db.getResources().filter((r) => r.id !== id);
    localStorage.setItem('c360_resources', JSON.stringify(resources));
    return resources;
  },

  getBlogPosts: (): BlogPost[] => {
    if (typeof window === 'undefined') return defaultBlogPosts;
    const stored = localStorage.getItem('c360_blog');
    if (!stored) {
      localStorage.setItem('c360_blog', JSON.stringify(defaultBlogPosts));
      return defaultBlogPosts;
    }
    return JSON.parse(stored);
  },
  saveBlogPost: (post: BlogPost): BlogPost[] => {
    const posts = db.getBlogPosts();
    const existingIndex = posts.findIndex((p) => p.id === post.id);
    if (existingIndex > -1) {
      posts[existingIndex] = post;
    } else {
      posts.push(post);
    }
    localStorage.setItem('c360_blog', JSON.stringify(posts));
    return posts;
  },
  deleteBlogPost: (id: string): BlogPost[] => {
    const posts = db.getBlogPosts().filter((p) => p.id !== id);
    localStorage.setItem('c360_blog', JSON.stringify(posts));
    return posts;
  }
};
