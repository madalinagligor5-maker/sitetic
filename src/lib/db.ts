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
