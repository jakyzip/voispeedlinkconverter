VoiSpeed Link Converter
Estensione Google Chrome per la gestione dei link telefonici VoiSpeed

Un'estensione leggera e mirata per Google Chrome, pensata per migliorare l'integrazione tra le piattaforme web e il centralino VoIP VoiSpeed in ambienti Windows. Converte automaticamente i link telefonici standard (tel:) nel formato proprietario (voispeed:) necessario per avviare la composizione del numero tramite l'applicazione VoiSpeed.

💡 Il Problema che Risolve
In molte configurazioni aziendali che utilizzano il sistema PBX VoiSpeed, in particolare sui sistemi operativi Windows, il clic su un link telefonico standard (ad esempio, in un CRM, un gestionale, o una webmail) formattato come <a href="tel:123456789">...</a> non riesce ad avviare correttamente il client desktop VoiSpeed.

Questo accade perché Windows, di default, non mappa l'azione tel: per aprire il dialer VoiSpeed, causando frustrazione e la necessità di copiare e incollare i numeri manualmente.

✅ Caratteristiche Principali
Conversione Automatica: Intercetta tutti i link che iniziano con tel: e li riscrive istantaneamente come voispeed:.

Integrazione VoiSpeed: Permette al client VoiSpeed di avviare immediatamente la composizione del numero quando si fa clic su qualsiasi numero di telefono sulla pagina.

Leggero e Non Invasivo: Funziona in background solo sulle pagine visitate e non richiede alcuna configurazione.

🛠️ Installazione (Modalità Sviluppatore)
Trattandosi di un'estensione non pubblicata sullo Chrome Web Store, l'installazione richiede l'attivazione della Modalità Sviluppatore.

Scarica l'Estensione:

Clona il repository:

Bash
git clone https://github.com/jakyzip/voispeedlinkconverter.git
Oppure, scarica il file ZIP del repository e decomprimilo in una cartella locale.

Apri la pagina Estensioni di Chrome:

Digita chrome://extensions/ nella barra degli indirizzi di Chrome e premi Invio.

Abilita la Modalità Sviluppatore:

Attiva il toggle "Modalità sviluppatore" (Developer Mode) nell'angolo in alto a destra.

Carica l'Estensione:

Clicca sul pulsante "Carica estensione non pacchettizzata" (Load unpacked).

Seleziona la cartella voispeedlinkconverter che hai scaricato o clonato.

L'estensione è ora installata e attiva.

🛠️ Installazione (Modalità Utente)
Il plugin è anche disponibile sul Chrome Store al seguente link:

https://chromewebstore.google.com/detail/voispeed-link-converter/npejdkpglhhcanhhldalcglldjjlccmj?authuser=0&hl=it

⚙️ Prerequisiti
Affinché l'estensione funzioni correttamente, è necessario che:

Google Chrome sia installato.

Il Client Desktop VoiSpeed sia installato e in esecuzione sul sistema Windows.

Il sistema operativo sia configurato per riconoscere lo schema di protocollo voispeed: e associarlo all'applicazione VoiSpeed (normalmente avviene con l'installazione del client VoiSpeed).

📄 Licenza
Questo progetto è rilasciato sotto licenza MIT. Per i dettagli, consulta il file LICENSE (Nota: dovrai creare un file LICENSE nel tuo repository).
