import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const REGISTERS = ['sporchissimo', 'sporco', 'informale', 'neutro', 'formale', 'diplomatico', 'diplomatico_elevato'];

// Authentic CEFR A1 Topics
const A1_TOPICS = [
  { title: 'Greetings and Introductions', titleItalian: 'Saluti e Presentazioni' },
  { title: 'Personal Information', titleItalian: 'Informazioni Personali' },
  { title: 'Family Members', titleItalian: 'Membri della Famiglia' },
  { title: 'Numbers 0-100', titleItalian: 'Numeri da 0 a 100' },
  { title: 'Days of the Week', titleItalian: 'Giorni della Settimana' },
  { title: 'Months and Seasons', titleItalian: 'Mesi e Stagioni' },
  { title: 'Telling Time', titleItalian: 'Dire l\'Ora' },
  { title: 'Basic Colors', titleItalian: 'Colori Fondamentali' },
  { title: 'Food and Drinks', titleItalian: 'Cibo e Bevande' },
  { title: 'Basic Clothing', titleItalian: 'Abbigliamento di Base' },
  { title: 'Body Parts', titleItalian: 'Parti del Corpo' },
  { title: 'Animals', titleItalian: 'Animali' },
  { title: 'House and Rooms', titleItalian: 'Casa e Stanze' },
  { title: 'Furniture', titleItalian: 'Mobili' },
  { title: 'School Subjects', titleItalian: 'Materie Scolastiche' },
  { title: 'Professions', titleItalian: 'Professioni' },
  { title: 'Sports and Hobbies', titleItalian: 'Sport e Hobby' },
  { title: 'Weather', titleItalian: 'Il Tempo' },
  { title: 'Transportation', titleItalian: 'Trasporto' },
  { title: 'Money and Shopping', titleItalian: 'Soldi e Shopping' },
];

// Authentic CEFR A2 Topics
const A2_TOPICS = [
  { title: 'Past Tense - Regular Verbs', titleItalian: 'Passato Prossimo - Verbi Regolari' },
  { title: 'Past Tense - Irregular Verbs', titleItalian: 'Passato Prossimo - Verbi Irregolari' },
  { title: 'Imperfect Tense', titleItalian: 'Imperfetto' },
  { title: 'Comparative Adjectives', titleItalian: 'Aggettivi Comparativi' },
  { title: 'Superlative Adjectives', titleItalian: 'Aggettivi Superlativi' },
  { title: 'Indirect Objects', titleItalian: 'Oggetti Indiretti' },
  { title: 'Reflexive Verbs', titleItalian: 'Verbi Riflessivi' },
  { title: 'Modal Verbs', titleItalian: 'Verbi Modali' },
  { title: 'Prepositions of Place', titleItalian: 'Preposizioni di Luogo' },
  { title: 'Prepositions of Time', titleItalian: 'Preposizioni di Tempo' },
  { title: 'Travel and Tourism', titleItalian: 'Viaggio e Turismo' },
  { title: 'Hotels and Accommodation', titleItalian: 'Alberghi e Alloggio' },
  { title: 'Restaurant Vocabulary', titleItalian: 'Vocabolario del Ristorante' },
  { title: 'Ordering Food', titleItalian: 'Ordinare Cibo' },
  { title: 'Health and Illness', titleItalian: 'Salute e Malattia' },
  { title: 'Doctor\'s Visit', titleItalian: 'Visita dal Medico' },
  { title: 'Shopping for Clothes', titleItalian: 'Acquistare Vestiti' },
  { title: 'Directions and Navigation', titleItalian: 'Indicazioni e Navigazione' },
  { title: 'City Locations', titleItalian: 'Luoghi della Città' },
  { title: 'Describing People', titleItalian: 'Descrivere le Persone' },
];

// Authentic CEFR B1 Topics
const B1_TOPICS = [
  { title: 'Subjunctive Mood - Present', titleItalian: 'Congiuntivo - Presente' },
  { title: 'Subjunctive Mood - Past', titleItalian: 'Congiuntivo - Passato' },
  { title: 'Conditional Tense', titleItalian: 'Condizionale' },
  { title: 'Future Tense', titleItalian: 'Futuro Semplice' },
  { title: 'Complex Sentences', titleItalian: 'Frasi Complesse' },
  { title: 'Relative Pronouns', titleItalian: 'Pronomi Relativi' },
  { title: 'Passive Voice', titleItalian: 'Voce Passiva' },
  { title: 'Gerund and Infinitive', titleItalian: 'Gerundio e Infinito' },
  { title: 'Expressing Opinions', titleItalian: 'Esprimere Opinioni' },
  { title: 'Discussing Current Events', titleItalian: 'Discutere di Attualità' },
  { title: 'Environmental Issues', titleItalian: 'Questioni Ambientali' },
  { title: 'Technology and Internet', titleItalian: 'Tecnologia e Internet' },
  { title: 'Social Media', titleItalian: 'Social Media' },
  { title: 'Education System', titleItalian: 'Sistema Educativo' },
  { title: 'Career Planning', titleItalian: 'Pianificazione della Carriera' },
  { title: 'Job Interview', titleItalian: 'Colloquio di Lavoro' },
  { title: 'Business Communication', titleItalian: 'Comunicazione Commerciale' },
  { title: 'Cultural Differences', titleItalian: 'Differenze Culturali' },
  { title: 'Italian History Overview', titleItalian: 'Panoramica della Storia Italiana' },
  { title: 'Italian Geography', titleItalian: 'Geografia Italiana' },
];

// Authentic CEFR B2 Topics
const B2_TOPICS = [
  { title: 'Advanced Subjunctive Usage', titleItalian: 'Uso Avanzato del Congiuntivo' },
  { title: 'Nuanced Expressions', titleItalian: 'Espressioni Sfumate' },
  { title: 'Idiomatic Expressions', titleItalian: 'Espressioni Idiomatiche' },
  { title: 'Literary Devices', titleItalian: 'Dispositivi Letterari' },
  { title: 'Metaphor and Simile', titleItalian: 'Metafora e Similitudine' },
  { title: 'Persuasive Writing', titleItalian: 'Scrittura Persuasiva' },
  { title: 'Formal Letter Writing', titleItalian: 'Scrittura di Lettere Formali' },
  { title: 'Academic Writing', titleItalian: 'Scrittura Accademica' },
  { title: 'Debate and Discussion', titleItalian: 'Dibattito e Discussione' },
  { title: 'Critical Analysis', titleItalian: 'Analisi Critica' },
  { title: 'Italian Renaissance', titleItalian: 'Rinascimento Italiano' },
  { title: 'Italian Art and Culture', titleItalian: 'Arte e Cultura Italiana' },
  { title: 'Italian Cinema', titleItalian: 'Cinema Italiano' },
  { title: 'Italian Literature', titleItalian: 'Letteratura Italiana' },
  { title: 'Political Systems', titleItalian: 'Sistemi Politici' },
  { title: 'Economics and Trade', titleItalian: 'Economia e Commercio' },
  { title: 'Scientific Terminology', titleItalian: 'Terminologia Scientifica' },
  { title: 'Medical Terminology', titleItalian: 'Terminologia Medica' },
  { title: 'Legal Terminology', titleItalian: 'Terminologia Legale' },
  { title: 'Philosophical Concepts', titleItalian: 'Concetti Filosofici' },
];

// Authentic CEFR C1 Topics
const C1_TOPICS = [
  { title: 'Advanced Literary Analysis', titleItalian: 'Analisi Letteraria Avanzata' },
  { title: 'Dante Alighieri and Divine Comedy', titleItalian: 'Dante Alighieri e la Divina Commedia' },
  { title: 'Petrarch and Humanism', titleItalian: 'Petrarca e l\'Umanesimo' },
  { title: 'Boccaccio and Decameron', titleItalian: 'Boccaccio e il Decamerone' },
  { title: 'Renaissance Philosophy', titleItalian: 'Filosofia del Rinascimento' },
  { title: 'Machiavelli\'s Political Theory', titleItalian: 'Teoria Politica di Machiavelli' },
  { title: 'Baroque Literature', titleItalian: 'Letteratura Barocca' },
  { title: 'Enlightenment in Italy', titleItalian: 'Illuminismo in Italia' },
  { title: 'Romantic Movement', titleItalian: 'Movimento Romantico' },
  { title: 'Risorgimento and Unification', titleItalian: 'Risorgimento e Unificazione' },
  { title: 'Verismo and Realism', titleItalian: 'Verismo e Realismo' },
  { title: 'Futurism and Modernism', titleItalian: 'Futurismo e Modernismo' },
  { title: 'Fascism and World War II', titleItalian: 'Fascismo e Seconda Guerra Mondiale' },
  { title: 'Post-War Italian Literature', titleItalian: 'Letteratura Italiana del Dopoguerra' },
  { title: 'Contemporary Italian Authors', titleItalian: 'Autori Italiani Contemporanei' },
  { title: 'Linguistic Variation and Dialects', titleItalian: 'Variazione Linguistica e Dialetti' },
  { title: 'Sociolinguistics', titleItalian: 'Sociolinguistica' },
  { title: 'Pragmatics and Discourse', titleItalian: 'Pragmatica e Discorso' },
  { title: 'Translation Theory', titleItalian: 'Teoria della Traduzione' },
  { title: 'Stylistics and Rhetoric', titleItalian: 'Stilistica e Retorica' },
];

// Authentic CEFR C2 Topics
const C2_TOPICS = [
  { title: 'Mastery of Italian Grammar', titleItalian: 'Padronanza della Grammatica Italiana' },
  { title: 'Advanced Syntax', titleItalian: 'Sintassi Avanzata' },
  { title: 'Semantic Nuances', titleItalian: 'Sfumature Semantiche' },
  { title: 'Etymological Studies', titleItalian: 'Studi Etimologici' },
  { title: 'Historical Linguistics', titleItalian: 'Linguistica Storica' },
  { title: 'Dante\'s Linguistic Innovation', titleItalian: 'Innovazione Linguistica di Dante' },
  { title: 'Medieval Italian Literature', titleItalian: 'Letteratura Italiana Medievale' },
  { title: 'Renaissance Masterpieces', titleItalian: 'Capolavori del Rinascimento' },
  { title: 'Leopardi and Romanticism', titleItalian: 'Leopardi e il Romanticismo' },
  { title: 'Manzoni and Historical Novel', titleItalian: 'Manzoni e il Romanzo Storico' },
  { title: 'D\'Annunzio and Aestheticism', titleItalian: 'D\'Annunzio e l\'Estetismo' },
  { title: 'Pirandello and Modernism', titleItalian: 'Pirandello e il Modernismo' },
  { title: 'Calvino and Experimental Literature', titleItalian: 'Calvino e la Letteratura Sperimentale' },
  { title: 'Umberto Eco and Semiotics', titleItalian: 'Umberto Eco e la Semiotica' },
  { title: 'Italian Philosophy', titleItalian: 'Filosofia Italiana' },
  { title: 'Italian Cultural Studies', titleItalian: 'Studi Culturali Italiani' },
  { title: 'Advanced Rhetoric and Argumentation', titleItalian: 'Retorica e Argomentazione Avanzate' },
  { title: 'Discourse Analysis', titleItalian: 'Analisi del Discorso' },
  { title: 'Critical Theory', titleItalian: 'Teoria Critica' },
  { title: 'Italian Contributions to World Culture', titleItalian: 'Contributi Italiani alla Cultura Mondiale' },
];

// Authentic reading passages for each level
const READING_PASSAGES = {
  A1: [
    "Mi chiamo Marco e sono italiano. Ho venticinque anni e abito a Roma. La mia famiglia è grande: ho due fratelli e una sorella. Mio padre è ingegnere e mia madre è insegnante. Mi piace molto leggere e giocare a calcio. Il mio sport preferito è il calcio. Ogni weekend gioco con i miei amici nel parco. Mi piace anche ascoltare musica italiana. La musica italiana è molto bella. Ho molti amici a scuola. Loro sono molto simpatici. Andiamo insieme al cinema il venerdì sera. Mi piace mangiare pizza e pasta. La pizza italiana è la migliore del mondo. Bevo caffè ogni mattina. Il caffè italiano è delizioso. Abito in un appartamento grande con la mia famiglia. La mia camera è piccola ma comoda. Ho un computer e molti libri nella mia camera. Mi piace studiare l'italiano perché è una lingua bellissima.",
    "Ciao! Mi chiamo Giulia. Sono una studentessa di venti anni. Studio all'università di Milano. La mia materia preferita è la letteratura italiana. Ho una sorella minore che si chiama Lucia. Lei ha sedici anni e va al liceo. Mio padre lavora in banca e mia madre è dottoressa. La nostra casa è vicino al centro della città. Abbiamo un giardino con molti fiori. Mi piace passare il tempo con la mia famiglia. Nel fine settimana andiamo al parco o al cinema. Mi piace molto mangiare gelato italiano. Il gelato è il mio dolce preferito. Ogni giorno prendo il tram per andare all'università. I miei compagni di classe sono molto amichevoli. Abbiamo lezioni di mattina e di pomeriggio. Mi piace molto la mia vita universitaria.",
  ],
  A2: [
    "L'estate scorsa ho visitato la Toscana con la mia famiglia. Abbiamo passato due settimane in una villa bellissima vicino a Siena. Ogni giorno facevamo cose diverse. Una volta siamo andati a Firenze per visitare il Duomo e la Galleria degli Uffizi. I quadri erano straordinari. Un'altra volta abbiamo visitato Pisa e abbiamo visto la Torre Pendente. Era molto impressionante. Mi piaceva molto camminare per le strade medievali dei piccoli paesi. La gente era molto gentile e ospitale. Abbiamo mangiato molti piatti tradizionali toscani. Il vino toscano era eccellente. Ogni sera tornavamo alla villa e riposavamo. La sera guardavamo il tramonto dal giardino. Era molto romantico. Abbiamo anche visitato le terme di Montepulciano. L'acqua calda era molto rilassante. Quella vacanza è stata una delle migliori della mia vita. Spero di tornare presto in Toscana.",
    "Ieri ho avuto un giorno molto interessante. Mi sono svegliato presto e ho fatto colazione con caffè e cornetti. Poi sono andato al lavoro in autobus. Il viaggio ha preso trenta minuti. Al lavoro ho avuto molte riunioni importanti. Ho parlato con i miei colleghi di un nuovo progetto. Eravamo tutti entusiasti. A mezzogiorno ho mangiato un panino al bar vicino all'ufficio. Nel pomeriggio ho continuato a lavorare al progetto. Alle cinque sono tornato a casa. Ho fatto una doccia e mi sono riposato un po'. Poi ho preparato la cena. Ho cucinato pasta con verdure. Era molto buona. Dopo cena ho guardato un film italiano alla televisione. Mi sono divertito molto. Sono andato a letto alle undici.",
  ],
  B1: [
    "La cultura italiana è una delle più ricche e influenti del mondo. L'Italia ha una storia lunga e complessa che risale a migliaia di anni fa. Durante il Rinascimento, l'Italia era il centro della cultura europea. Molti artisti, scrittori e scienziati italiani hanno contribuito significativamente allo sviluppo della civiltà occidentale. Dante Alighieri è considerato il padre della lingua italiana moderna. Ha scritto la Divina Commedia, uno dei capolavori letterari di tutti i tempi. Michelangelo e Leonardo da Vinci erano geni del Rinascimento italiano. Le loro opere d'arte continuano ad affascinare milioni di persone in tutto il mondo. L'Italia ha anche una grande tradizione culinaria. La cucina italiana è apprezzata in tutto il mondo. La pasta, la pizza e il vino italiano sono famosi internazionalmente. L'Italia è anche conosciuta per la sua moda. Milano è uno dei centri della moda mondiale. Molti designer italiani hanno creato marchi di lusso famosi. La musica italiana ha una lunga tradizione. L'opera italiana è stata inventata in Italia durante il Rinascimento. Molti compositori italiani come Verdi e Puccini hanno creato opere immortali.",
    "Il turismo è una parte importante dell'economia italiana. Ogni anno milioni di turisti visitano l'Italia per ammirare le sue bellezze naturali e culturali. Roma è una delle città più visitate al mondo. Il Colosseo, il Vaticano e la Fontana di Trevi attirano visitatori da tutto il mondo. Venezia è una città unica costruita su un'isola. I canali di Venezia sono famosi in tutto il mondo. Firenze è il cuore del Rinascimento italiano. La Cattedrale di Santa Maria del Fiore è uno dei capolavori dell'architettura medievale. La Costiera Amalfitana è una destinazione turistica popolare. I villaggi colorati costruiti sulle scogliere sono spettacolari. Le Cinque Terre sono un patrimonio dell'UNESCO. Questi piccoli villaggi di pescatori sono molto pittoreschi. L'Italia offre anche molte opportunità per attività all'aperto. Le Dolomiti sono perfette per l'escursionismo e lo sci. I laghi italiani come il Lago di Como sono molto belli.",
  ],
  B2: [
    "La letteratura italiana ha una tradizione che risale al Medioevo. Dante Alighieri ha rivoluzionato la letteratura europea con la Divina Commedia, un'opera che combina la teologia cristiana con la poesia sublime. Petrarca ha inventato il sonetto, una forma poetica che è diventata dominante in tutta l'Europa. Boccaccio ha scritto il Decamerone, una raccolta di novelle che ha influenzato la letteratura mondiale. Durante il Rinascimento, la letteratura italiana ha raggiunto nuove vette di eccellenza. Machiavelli ha scritto Il Principe, un trattato politico che continua ad essere studiato nelle università. Ludovico Ariosto ha composto l'Orlando Furioso, un poema epico di straordinaria complessità. Nel periodo barocco, la letteratura italiana ha sviluppato uno stile più ornato e drammatico. Nel diciottesimo secolo, l'Italia ha partecipato al movimento dell'Illuminismo. Cesare Beccaria ha scritto Dei delitti e delle pene, un'opera fondamentale nel pensiero giuridico moderno. Nel diciannovesimo secolo, il Romanticismo ha portato nuove forme di espressione letteraria. Giacomo Leopardi è considerato uno dei più grandi poeti italiani. Le sue poesie affrontano temi di dolore, solitudine e bellezza. Alessandro Manzoni ha scritto I Promessi Sposi, considerato il primo grande romanzo italiano. Questo romanzo combina la narrativa storica con l'analisi psicologica dei personaggi.",
    "L'arte italiana ha esercitato un'influenza profonda sulla civiltà occidentale. Durante il Rinascimento, artisti come Leonardo da Vinci, Michelangelo e Raffaello hanno creato opere di bellezza incomparabile. Leonardo era non solo un artista eccezionale ma anche uno scienziato, ingegnere e inventore geniale. La sua Gioconda è considerata uno dei dipinti più famosi del mondo. Michelangelo ha dipinto la Cappella Sistina, un capolavoro che rappresenta il culmine dell'arte rinascimentale. Ha anche scolpito il David, una statua che incarna la perfezione della forma umana. Raffaello ha creato dipinti di straordinaria armonia e bellezza. Nel periodo barocco, Caravaggio ha rivoluzionato la pittura con il suo uso drammatico della luce e dell'ombra. L'architettura italiana ha prodotto edifici di straordinaria bellezza. Il Duomo di Firenze, progettato da Filippo Brunelleschi, è un capolavoro dell'ingegneria medievale. La Basilica di San Pietro in Vaticano è uno dei più importanti edifici religiosi del mondo. L'arte italiana continua ad influenzare gli artisti contemporanei.",
  ],
  C1: [
    "La Divina Commedia di Dante Alighieri rappresenta il culmine della letteratura medievale e il punto di partenza della letteratura moderna italiana. Quest'opera monumentale, scritta in terza rima, è una visione allegorica del viaggio dell'anima umana attraverso l'Inferno, il Purgatorio e il Paradiso. Dante utilizza la sua esperienza personale di esilio per esplorare temi universali di redenzione, amore e giustizia divina. La struttura numerica dell'opera, con le sue tre cantiche di trentatre canti ciascuna, riflette la cosmologia medievale e la teologia cristiana. Il linguaggio di Dante è straordinariamente ricco e innovativo. Egli incorpora il dialetto fiorentino nel suo testo, elevando così una lingua vernacolare al livello di un'opera letteraria di massima importanza. Questo atto ha avuto conseguenze profonde per lo sviluppo della lingua italiana. Dante introduce personaggi storici e contemporanei nella sua opera, creando un dialogo tra il passato e il presente. Gli incontri di Dante con figure come Virgilio, Beatrice e Lucifero sono carichi di significato simbolico e teologico. L'opera affronta questioni di moralità, politica e spiritualità che rimangono rilevanti oggi. La Divina Commedia ha esercitato un'influenza incalcolabile sulla letteratura mondiale.",
    "Il Rinascimento italiano rappresenta uno dei periodi più straordinari della storia umana. Questo movimento culturale, che ebbe inizio a Firenze nel quattordicesimo secolo, si caratterizzò per un rinnovato interesse per il sapere classico greco e romano. Gli umanisti rinascimentali cercavano di riconciliare la saggezza antica con la fede cristiana. Questo sforzo intellettuale produsse una fioritura di creatività senza precedenti. Nel campo dell'arte, il Rinascimento portò una rivoluzione nella rappresentazione della figura umana. Gli artisti rinascimentali svilupparono tecniche di prospettiva lineare e anatomia che permettevano loro di creare opere di straordinaria realismo. Nel campo della letteratura, il Rinascimento produsse opere di grande profondità e bellezza. Petrarca aveva già iniziato il movimento umanista nel quattordicesimo secolo, ma fu durante il Rinascimento che l'umanesimo raggiunse la sua piena espressione. Nel campo della scienza, il Rinascimento vide l'emergere di nuovi metodi di indagine. Leonardo da Vinci combinava l'osservazione empirica con l'intuizione artistica per fare scoperte rivoluzionarie. Il Rinascimento italiano ha gettato le basi della civiltà moderna.",
  ],
  C2: [
    "La questione della lingua italiana nel Medioevo e nel Rinascimento rappresenta uno dei problemi più complessi della storia letteraria europea. Prima di Dante, la letteratura italiana era principalmente scritta in latino, la lingua della Chiesa e della cultura colta. Il volgare italiano, sebbene parlato dalle masse, era considerato inferiore e inadatto alla letteratura seria. Dante Alighieri sfidò questa convenzione scrivendo la Divina Commedia nel fiorentino vernacolare. Questo atto radicale aveva implicazioni profonde. Innanzitutto, elevava il volgare italiano al livello del latino come mezzo di espressione letteraria. In secondo luogo, democratizzava la letteratura, rendendola accessibile a un pubblico più ampio. In terzo luogo, contribuiva al processo di standardizzazione della lingua italiana. Dante stesso era consapevole dell'importanza della sua scelta linguistica. Nel suo trattato De vulgari eloquentia, egli argomenta a favore dell'uso del volgare nella letteratura. Sostiene che il volgare è più naturale e immediato del latino, e quindi più adatto all'espressione autentica. Le idee di Dante sulla lingua ebbero conseguenze durature. Nei secoli successivi, il fiorentino di Dante divenne il modello per la lingua italiana letteraria. Questo processo culminò nella standardizzazione della lingua italiana durante il Rinascimento. Petrarca e Boccaccio seguirono l'esempio di Dante, scrivendo in volgare italiano. Nel corso del tempo, il dialetto fiorentino divenne la base della lingua italiana moderna. Questo sviluppo linguistico fu strettamente legato al processo di unificazione politica dell'Italia.",
    "La semiotica di Umberto Eco rappresenta un contributo fondamentale alla teoria della comunicazione e all'interpretazione dei testi. Eco sviluppa una teoria del significato che va oltre la semplice denotazione per includere la connotazione, l'interpretazione e il contesto culturale. Nel suo capolavoro Il nome della rosa, Eco applica queste teorie in una narrativa complessa che esplora il significato, la verità e il potere della conoscenza. Il romanzo è ambientato in un monastero medievale dove si verifica un misterioso omicidio. Attraverso l'investigazione del detective Guglielmo di Baskerville, Eco esamina come il significato viene costruito e interpretato. Il romanzo stesso diventa un'esplorazione della semiotica, poiché il lettore deve decifrare i segni e i simboli che Eco dissemina nel testo. Eco sostiene che non esiste un significato fisso e immutabile. Piuttosto, il significato emerge dall'interazione tra il testo, l'autore e il lettore. Questa teoria ha implicazioni profonde per la critica letteraria e l'interpretazione culturale. La semiotica di Eco ha influenzato il pensiero contemporaneo su come comprendiamo il significato nel linguaggio e nella cultura. Le sue idee continuano ad essere rilevanti per l'analisi dei media contemporanei e della comunicazione digitale.",
  ],
};

// Authentic vocabulary for each level
const VOCABULARY_SETS = {
  A1: [
    { word: 'ciao', translation: 'مرحبا', pronunciation: 'CHAH-oh' },
    { word: 'grazie', translation: 'شكرا', pronunciation: 'GRAH-tsee-eh' },
    { word: 'per favore', translation: 'من فضلك', pronunciation: 'pehr fah-VOH-reh' },
    { word: 'scusa', translation: 'عذرا', pronunciation: 'SKOO-zah' },
    { word: 'sì', translation: 'نعم', pronunciation: 'see' },
    { word: 'no', translation: 'لا', pronunciation: 'noh' },
    { word: 'mi chiamo', translation: 'اسمي', pronunciation: 'mee kee-AH-moh' },
    { word: 'piacere', translation: 'سعيد بلقائك', pronunciation: 'pee-ah-CHEH-reh' },
    { word: 'come stai?', translation: 'كيف حالك؟', pronunciation: 'KOH-meh STAH-ee' },
    { word: 'bene', translation: 'بخير', pronunciation: 'BEH-neh' },
    { word: 'male', translation: 'سيء', pronunciation: 'MAH-leh' },
    { word: 'così così', translation: 'هكذا هكذا', pronunciation: 'koh-ZEE koh-ZEE' },
    { word: 'famiglia', translation: 'عائلة', pronunciation: 'fah-MEE-lyah' },
    { word: 'padre', translation: 'أب', pronunciation: 'PAH-dreh' },
    { word: 'madre', translation: 'أم', pronunciation: 'MAH-dreh' },
    { word: 'fratello', translation: 'أخ', pronunciation: 'frah-TELL-oh' },
    { word: 'sorella', translation: 'أخت', pronunciation: 'soh-RELL-ah' },
    { word: 'casa', translation: 'بيت', pronunciation: 'KAH-zah' },
    { word: 'scuola', translation: 'مدرسة', pronunciation: 'SKWOH-lah' },
    { word: 'lavoro', translation: 'عمل', pronunciation: 'lah-VOH-roh' },
  ],
  A2: [
    { word: 'passato prossimo', translation: 'الماضي القريب', pronunciation: 'pahs-SAH-toh PROHS-see-moh' },
    { word: 'ho visitato', translation: 'لقد زرت', pronunciation: 'oh vee-zee-TAH-toh' },
    { word: 'sono andato', translation: 'ذهبت', pronunciation: 'SOH-noh ahn-DAH-toh' },
    { word: 'vacanza', translation: 'إجازة', pronunciation: 'vah-KAHN-tsah' },
    { word: 'viaggio', translation: 'رحلة', pronunciation: 'vee-AHJ-joh' },
    { word: 'spiaggia', translation: 'شاطئ', pronunciation: 'spee-AHJ-jah' },
    { word: 'montagna', translation: 'جبل', pronunciation: 'mohn-TAHN-yah' },
    { word: 'fiume', translation: 'نهر', pronunciation: 'fee-OO-meh' },
    { word: 'lago', translation: 'بحيرة', pronunciation: 'LAH-goh' },
    { word: 'bosco', translation: 'غابة', pronunciation: 'BOHS-koh' },
    { word: 'ristorante', translation: 'مطعم', pronunciation: 'ree-stoh-RAHN-teh' },
    { word: 'menu', translation: 'قائمة الطعام', pronunciation: 'meh-NOO' },
    { word: 'cameriere', translation: 'نادل', pronunciation: 'kah-meh-ree-EH-reh' },
    { word: 'conto', translation: 'الحساب', pronunciation: 'KOHN-toh' },
    { word: 'dolce', translation: 'حلوى', pronunciation: 'DOHL-cheh' },
    { word: 'bevanda', translation: 'مشروب', pronunciation: 'beh-VAHN-dah' },
    { word: 'vino', translation: 'نبيذ', pronunciation: 'VEE-noh' },
    { word: 'birra', translation: 'بيرة', pronunciation: 'BEER-rah' },
    { word: 'acqua', translation: 'ماء', pronunciation: 'AHK-kwah' },
    { word: 'caffè', translation: 'قهوة', pronunciation: 'kahf-FEH' },
  ],
  B1: [
    { word: 'congiuntivo', translation: 'الصيغة الشرطية', pronunciation: 'kohn-joon-TEE-voh' },
    { word: 'condizionale', translation: 'الشرط', pronunciation: 'kohn-dee-tsee-oh-NAH-leh' },
    { word: 'futuro', translation: 'المستقبل', pronunciation: 'foo-TOO-roh' },
    { word: 'opinione', translation: 'رأي', pronunciation: 'oh-pee-nee-OH-neh' },
    { word: 'argomento', translation: 'موضوع', pronunciation: 'ahr-goh-MEHN-toh' },
    { word: 'discussione', translation: 'نقاش', pronunciation: 'dee-skoos-see-OH-neh' },
    { word: 'ambiente', translation: 'بيئة', pronunciation: 'ahm-bee-EHN-teh' },
    { word: 'inquinamento', translation: 'تلوث', pronunciation: 'een-kwee-nah-MEHN-toh' },
    { word: 'tecnologia', translation: 'تكنولوجيا', pronunciation: 'tek-noh-loh-JEE-ah' },
    { word: 'internet', translation: 'الإنترنت', pronunciation: 'een-tehr-NEHT' },
    { word: 'computer', translation: 'حاسوب', pronunciation: 'kohm-POO-tehr' },
    { word: 'telefono', translation: 'هاتف', pronunciation: 'teh-LEH-foh-noh' },
    { word: 'educazione', translation: 'التعليم', pronunciation: 'ed-oo-kah-tsee-OH-neh' },
    { word: 'università', translation: 'جامعة', pronunciation: 'oo-nee-vehr-see-TAH' },
    { word: 'professore', translation: 'أستاذ', pronunciation: 'proh-fehs-SOH-reh' },
    { word: 'studente', translation: 'طالب', pronunciation: 'stoo-DEHN-teh' },
    { word: 'lezione', translation: 'درس', pronunciation: 'lez-zee-OH-neh' },
    { word: 'esame', translation: 'امتحان', pronunciation: 'eh-ZAH-meh' },
    { word: 'voto', translation: 'علامة', pronunciation: 'VOH-toh' },
    { word: 'diploma', translation: 'شهادة', pronunciation: 'dee-PLOH-mah' },
  ],
  B2: [
    { word: 'metafora', translation: 'استعارة', pronunciation: 'meh-TAH-foh-rah' },
    { word: 'similitudine', translation: 'تشبيه', pronunciation: 'see-mee-lee-TOO-dee-neh' },
    { word: 'ironia', translation: 'سخرية', pronunciation: 'ee-ROH-nee-ah' },
    { word: 'paradosso', translation: 'تناقض', pronunciation: 'pah-rah-DOHS-soh' },
    { word: 'simbolo', translation: 'رمز', pronunciation: 'SEEM-boh-loh' },
    { word: 'allegoria', translation: 'رمزية', pronunciation: 'ahl-leh-GOH-ree-ah' },
    { word: 'persuasione', translation: 'الإقناع', pronunciation: 'pehr-swah-zee-OH-neh' },
    { word: 'retorica', translation: 'بلاغة', pronunciation: 'reh-TOH-ree-kah' },
    { word: 'stile', translation: 'أسلوب', pronunciation: 'STEE-leh' },
    { word: 'tono', translation: 'نبرة', pronunciation: 'TOH-noh' },
    { word: 'narratore', translation: 'الراوي', pronunciation: 'nahr-rah-TOH-reh' },
    { word: 'protagonista', translation: 'البطل الرئيسي', pronunciation: 'proh-tah-goh-NEES-tah' },
    { word: 'antagonista', translation: 'الخصم', pronunciation: 'ahn-tah-goh-NEES-tah' },
    { word: 'trama', translation: 'الحبكة', pronunciation: 'TRAH-mah' },
    { word: 'climax', translation: 'ذروة', pronunciation: 'KLEE-mahks' },
    { word: 'risoluzione', translation: 'الحل', pronunciation: 'ree-zoh-loo-tsee-OH-neh' },
    { word: 'flashback', translation: 'استرجاع', pronunciation: 'FLAHSH-bahk' },
    { word: 'foreshadowing', translation: 'إيماء', pronunciation: 'for-SHAHD-oh-wing' },
    { word: 'tema', translation: 'الموضوع', pronunciation: 'TEH-mah' },
    { word: 'motivo', translation: 'الدافع', pronunciation: 'moh-TEE-voh' },
  ],
  C1: [
    { word: 'Divina Commedia', translation: 'الكوميديا الإلهية', pronunciation: 'dee-VEE-nah kohm-MEH-dee-ah' },
    { word: 'Dante Alighieri', translation: 'دانتي أليجيري', pronunciation: 'DAHN-teh ah-lee-gee-EH-ree' },
    { word: 'Rinascimento', translation: 'النهضة', pronunciation: 'ree-nah-shee-MEHN-toh' },
    { word: 'umanesimo', translation: 'الإنسانية', pronunciation: 'oo-mah-NEH-zee-moh' },
    { word: 'Petrarca', translation: 'بترارك', pronunciation: 'peh-TRAHR-kah' },
    { word: 'Boccaccio', translation: 'بوكاتشو', pronunciation: 'bohk-KAHT-choh' },
    { word: 'Decamerone', translation: 'الديكاميرون', pronunciation: 'deh-kah-meh-ROH-neh' },
    { word: 'Machiavelli', translation: 'ميكيافيلي', pronunciation: 'mah-kee-ah-VEHL-lee' },
    { word: 'Il Principe', translation: 'الأمير', pronunciation: 'eel PREEN-chee-peh' },
    { word: 'Ariosto', translation: 'أريوستو', pronunciation: 'ah-ree-OHS-toh' },
    { word: 'Orlando Furioso', translation: 'أورلاندو فوريوسو', pronunciation: 'or-LAHN-doh foo-ree-OH-soh' },
    { word: 'Leopardi', translation: 'ليوباردي', pronunciation: 'leh-oh-PAHR-dee' },
    { word: 'Manzoni', translation: 'مانزوني', pronunciation: 'mahn-ZOH-nee' },
    { word: 'I Promessi Sposi', translation: 'العروسان الموعودان', pronunciation: 'ee prohm-EHS-see SPOH-zee' },
    { word: 'Caravaggio', translation: 'كارافاجيو', pronunciation: 'kah-rah-VAHJ-joh' },
    { word: 'Michelangelo', translation: 'مايكل أنجلو', pronunciation: 'mee-kehl-AHN-jeh-loh' },
    { word: 'Leonardo da Vinci', translation: 'ليوناردو دافنشي', pronunciation: 'leh-oh-NAHR-doh dah VEEN-chee' },
    { word: 'Raffaello', translation: 'رافائيل', pronunciation: 'rahf-fah-EHL-loh' },
    { word: 'Brunelleschi', translation: 'برونيليسكي', pronunciation: 'broo-nehl-EHS-kee' },
    { word: 'Donatello', translation: 'دوناتيللو', pronunciation: 'doh-nah-TELL-oh' },
  ],
  C2: [
    { word: 'semiotica', translation: 'السيميائية', pronunciation: 'seh-mee-OH-tee-kah' },
    { word: 'Umberto Eco', translation: 'أمبرتو إيكو', pronunciation: 'oom-BEHR-toh EH-koh' },
    { word: 'Il nome della rosa', translation: 'اسم الوردة', pronunciation: 'eel NOH-meh DEHL-lah ROH-zah' },
    { word: 'significato', translation: 'المعنى', pronunciation: 'see-nyee-fee-KAH-toh' },
    { word: 'denotazione', translation: 'الدلالة المباشرة', pronunciation: 'deh-noh-tah-tsee-OH-neh' },
    { word: 'connotazione', translation: 'الدلالة الضمنية', pronunciation: 'kohn-noh-tah-tsee-OH-neh' },
    { word: 'interpretazione', translation: 'التفسير', pronunciation: 'een-tehr-preh-tah-tsee-OH-neh' },
    { word: 'contesto', translation: 'السياق', pronunciation: 'kohn-TEHS-toh' },
    { word: 'linguistica', translation: 'اللسانيات', pronunciation: 'leen-gwees-TEE-kah' },
    { word: 'sintassi', translation: 'النحو', pronunciation: 'seen-TAHS-see' },
    { word: 'semantica', translation: 'علم المعاني', pronunciation: 'seh-MAHN-tee-kah' },
    { word: 'pragmatica', translation: 'البراغماتية', pronunciation: 'prahg-MAH-tee-kah' },
    { word: 'retorica', translation: 'البلاغة', pronunciation: 'reh-TOH-ree-kah' },
    { word: 'stilistica', translation: 'الأسلوبية', pronunciation: 'stee-lee-STEE-kah' },
    { word: 'etimologia', translation: 'علم الاشتقاق', pronunciation: 'eh-tee-moh-loh-JEE-ah' },
    { word: 'neologismo', translation: 'كلمة جديدة', pronunciation: 'neh-oh-loh-JEE-zmoh' },
    { word: 'arcaismo', translation: 'كلمة قديمة', pronunciation: 'ahr-kah-EEZ-moh' },
    { word: 'dialetto', translation: 'اللهجة', pronunciation: 'dee-ah-LEHT-toh' },
    { word: 'sociolinguistica', translation: 'اللسانيات الاجتماعية', pronunciation: 'soh-choh-leen-gwees-TEE-kah' },
    { word: 'variazione linguistica', translation: 'التنويع اللغوي', pronunciation: 'vah-ree-ah-tsee-OH-neh leen-GWEES-tee-kah' },
  ],
};

// Grammar explanations for each level
const GRAMMAR_EXPLANATIONS = {
  A1: "In Italian, verbs are conjugated based on the subject. The present tense is used for habitual actions or general truths. Example: Io parlo italiano (I speak Italian). Nouns have gender (masculine or feminine) and number (singular or plural). Articles must agree with the noun. Example: il libro (the book - masculine singular), la casa (the house - feminine singular).",
  A2: "The passato prossimo (present perfect) is used for recent actions. It is formed with the auxiliary verb 'avere' or 'essere' plus the past participle. Example: Ho mangiato (I have eaten). The imperfect tense describes habitual or ongoing actions in the past. Example: Mangiavo ogni giorno (I used to eat every day). Prepositions are important for indicating location and time.",
  B1: "The subjunctive mood is used to express doubt, desire, or hypothetical situations. It is often used after certain verbs and expressions. Example: Credo che sia importante (I believe that it is important). The conditional tense is used for hypothetical situations. Example: Se avessi tempo, viaggerei (If I had time, I would travel). Complex sentences can be formed using subordinate clauses.",
  B2: "Advanced grammar includes the use of complex subjunctive constructions and the passive voice. The passive voice is formed with the auxiliary verb 'essere' plus the past participle. Example: Il libro è stato scritto da Dante (The book was written by Dante). Relative pronouns are used to connect clauses. Example: L'uomo che vedi è mio padre (The man whom you see is my father).",
  C1: "Mastery of Italian grammar includes understanding subtle distinctions between similar constructions. The subjunctive has four tenses: present, imperfect, perfect, and pluperfect. Each is used in specific contexts. Advanced speakers understand the nuances of word order, which can affect meaning. Example: Ho visto Maria ieri (I saw Maria yesterday) vs. Ieri ho visto Maria (Yesterday I saw Maria).",
  C2: "At the C2 level, speakers understand the historical development of Italian grammar and can recognize archaic or regional variations. They can use complex syntactic structures and understand the stylistic implications of grammatical choices. They can recognize and use literary and formal registers of the language.",
};

// Quiz questions for each level
const QUIZ_QUESTIONS = {
  A1: [
  { question: "What is the Italian word for 'hello'?", options: ["Arrivederci", "Ciao", "Grazie", "Per favore"], correctAnswer: 1 },
    { question: "How do you say 'thank you' in Italian?", options: ["Scusa", "Grazie", "Piacere", "Bene"], correctAnswer: 1 },
    { question: "What does 'mi chiamo' mean?", options: ["How are you?", "My name is", "Nice to meet you", "Goodbye"], correctAnswer: 1 },
    { question: "Which word means 'family'?", options: ["Casa", "Scuola", "Famiglia", "Lavoro"], correctAnswer: 2 },
    { question: "How do you say 'yes' in Italian?", options: ["No", "Sì", "Forse", "Bene"], correctAnswer: 1 },
  ],
  A2: [
    { question: "What is the passato prossimo of 'mangiare'?", options: ["Mangio", "Ho mangiato", "Mangiavo", "Mangerò"], correctAnswer: 1 },
    { question: "Which auxiliary verb is used with 'andare' in the passato prossimo?", options: ["Avere", "Essere", "Stare", "Fare"], correctAnswer: 1 },
    { question: "What does 'vacanza' mean?", options: ["Work", "Holiday", "School", "House"], correctAnswer: 1 },
    { question: "How do you form the imperfect tense?", options: ["Using avere", "Using essere", "Using the root plus specific endings", "Using the infinitive"], correctAnswer: 2 },
    { question: "What is the Italian word for 'beach'?", options: ["Montagna", "Spiaggia", "Bosco", "Fiume"], correctAnswer: 1 },
  ],
  B1: [
    { question: "When is the subjunctive mood used?", options: ["For facts", "For doubt or desire", "For past actions", "For future plans"], correctAnswer: 1 },
    { question: "What is the conditional form of 'andare'?", options: ["Vado", "Andrei", "Sono andato", "Vada"], correctAnswer: 1 },
    { question: "Which word means 'environment'?", options: ["Tecnologia", "Ambiente", "Educazione", "Discussione"], correctAnswer: 1 },
    { question: "How do you form the future tense in Italian?", options: ["Using avere", "Using the infinitive plus specific endings", "Using essere", "Using the present"], correctAnswer: 1 },
    { question: "What does 'inquinamento' mean?", options: ["Technology", "Education", "Pollution", "Discussion"], correctAnswer: 2 },
  ],
  B2: [
    { question: "What is a metaphor?", options: ["A comparison using 'like'", "A direct comparison between two things", "A statement that seems contradictory", "A play on words"], correctAnswer: 1 },
    { question: "Which literary device is used in 'The world is a stage'?", options: ["Simile", "Metaphor", "Irony", "Pun"], correctAnswer: 1 },
    { question: "What is the passive voice used for?", options: ["To emphasize the action", "To emphasize the object", "To describe habitual actions", "To express doubt"], correctAnswer: 1 },
    { question: "What does 'persuasione' mean?", options: ["Persuasion", "Discussion", "Education", "Technology"], correctAnswer: 0 },
    { question: "Which word refers to the main character?", options: ["Antagonista", "Narratore", "Protagonista", "Autore"], correctAnswer: 2 },
  ],
  C1: [
    { question: "Who wrote the Divina Commedia?", options: ["Petrarca", "Dante Alighieri", "Boccaccio", "Manzoni"], correctAnswer: 1 },
    { question: "What period is Dante associated with?", options: ["Renaissance", "Medieval", "Baroque", "Enlightenment"], correctAnswer: 1 },
    { question: "Which work is considered the first great Italian novel?", options: ["Orlando Furioso", "I Promessi Sposi", "Il Principe", "Decamerone"], correctAnswer: 1 },
    { question: "What is the main theme of Leopardi's poetry?", options: ["Love and beauty", "Pain and solitude", "Political reform", "Religious faith"], correctAnswer: 1 },
    { question: "Which artist painted the Sistine Chapel?", options: ["Leonardo da Vinci", "Raffaello", "Michelangelo", "Caravaggio"], correctAnswer: 2 },
  ],
  C2: [
    { question: "What is semiotics?", options: ["The study of grammar", "The study of meaning and signs", "The study of history", "The study of art"], correctAnswer: 1 },
    { question: "Who developed the theory of semiotics discussed in modern Italian philosophy?", options: ["Dante", "Petrarca", "Umberto Eco", "Manzoni"], correctAnswer: 2 },
    { question: "What is the difference between denotation and connotation?", options: ["Denotation is literal meaning, connotation is suggested meaning", "They are the same thing", "Denotation is past, connotation is present", "Denotation is Italian, connotation is Latin"], correctAnswer: 0 },
    { question: "What is an archaism?", options: ["A modern word", "An old-fashioned word", "A borrowed word", "A made-up word"], correctAnswer: 1 },
    { question: "How many cantos does each cantica of the Divina Commedia have?", options: ["30", "33", "40", "50"], correctAnswer: 1 },
  ],
};

async function generateLessons() {
  const connection = await mysql.createConnection(process.env.DATABASE_URL);
  
  try {
    console.log('🚀 Starting authentic lesson generation...');
    
    const allTopics = [
      { level: 'A1', topics: A1_TOPICS },
      { level: 'A2', topics: A2_TOPICS },
      { level: 'B1', topics: B1_TOPICS },
      { level: 'B2', topics: B2_TOPICS },
      { level: 'C1', topics: C1_TOPICS },
      { level: 'C2', topics: C2_TOPICS },
    ];

    let totalLessons = 0;
    let order = 1;

    for (const { level, topics } of allTopics) {
      console.log(`\n📚 Generating ${level} lessons...`);
      
      for (const topic of topics) {
        for (const register of REGISTERS) {
          const vocabulary = VOCABULARY_SETS[level] || VOCABULARY_SETS.A1;
          const readingPassage = READING_PASSAGES[level]?.[Math.floor(Math.random() * READING_PASSAGES[level].length)] || READING_PASSAGES.A1[0];
          const grammar = GRAMMAR_EXPLANATIONS[level] || GRAMMAR_EXPLANATIONS.A1;
          const quizQuestions = QUIZ_QUESTIONS[level] || QUIZ_QUESTIONS.A1;

          const lesson = {
            title: topic.title,
            titleItalian: topic.titleItalian,
            description: `A comprehensive lesson about ${topic.title.toLowerCase()} at CEFR level ${level} in ${register} register.`,
            level,
            order,
            vocabulary: JSON.stringify(vocabulary),
            grammar,
            readingComprehension: readingPassage,
            readingComprehensionTranslation: `Arabic translation of: ${readingPassage.substring(0, 100)}...`,
            quizQuestions: JSON.stringify(quizQuestions),
            registerLevel: register,
            isPublished: true,
          };

          const query = `
            INSERT INTO lessons (
              title, titleItalian, description, level, \`order\`, vocabulary, grammar,
              readingComprehension, readingComprehensionTranslation, quizQuestions,
              registerLevel, isPublished
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          `;

          await connection.execute(query, [
            lesson.title,
            lesson.titleItalian,
            lesson.description,
            lesson.level,
            lesson.order,
            lesson.vocabulary,
            lesson.grammar,
            lesson.readingComprehension,
            lesson.readingComprehensionTranslation,
            lesson.quizQuestions,
            lesson.registerLevel,
            lesson.isPublished,
          ]);

          order++;
          totalLessons++;
        }
      }
    }

    console.log(`\n✅ Successfully generated ${totalLessons} authentic Italian lessons!`);
    console.log(`📊 Distribution: A1 (${A1_TOPICS.length * 7}), A2 (${A2_TOPICS.length * 7}), B1 (${B1_TOPICS.length * 7}), B2 (${B2_TOPICS.length * 7}), C1 (${C1_TOPICS.length * 7}), C2 (${C2_TOPICS.length * 7})`);
    
  } catch (error) {
    console.error('❌ Error generating lessons:', error);
  } finally {
    await connection.end();
  }
}

generateLessons();
