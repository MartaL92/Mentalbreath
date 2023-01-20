Mental Breath

Sito per professionisti e utenti della salute mentale, in cui il professionista può organizzare gruppi di auto-mutuo-aiuto definendo tema, località, numero di utenti e descrizione delle attività, in modo che gli utenti possano poi filtrare tra i gruppi esistenti e iscriversi a quelli di proprio interesse per parteciparvi poi di persona.

Componenti e dettagli:

-	Landing page: con possibilità di login e registrazione, componenti accessibili attraverso i button sulla navbar o i link presenti nelle diverse sezioni del body della pagina:
  -	Registrazione: componente con reactive form con validators sugli input, in particolare email e password, che permette di recuperare gli input e restituire un testo di errore nel caso in cui mancassero dei dati, di tipo submit che rimanda a una funzione collegata al signup dell’auth.service che invia i dati registrati con post su json locale.
  -	Login: login con email e password, che permette di recuperare i dati dell'utente loggato inserendoli anche in localstorage, come id e role registrato (quindi utente o professionista), permettendo così di visualizzare solo i componenti accessibili grazie all'auth.guard e in base al ruolo stesso.

- Pagine visibili con login:
  -	Home: pagina principale, con la lista dei gruppi creati dai professionisti, ottenuta attraverso una get su mockapi di tutti i gruppi presenti, ciclati su html con ngFor. È presente anche un input per filtrare i risultati in base al testo di ricerca inserito, attraverso il modulo Ng2SearchPipeModule. Per ogni gruppo è possibile raggiungere la sua pagina di dettaglio attraverso il button che recupera l’id del gruppo selezionato.
  -	Dettaglio gruppo: a partire dal gruppo selezionato sulla home, recupera l’id dai parametri dell’URL facendo la get su mockapi di tutti i dettagli, riportandoli poi in una card sull’html, tra cui anche il link a Google maps dell’indirizzo inserito dal professionista del luogo dell’incontro. In base all’id del professionista che ha inserito il gruppo si recupera poi con una get il suo nome e quindi il link al suo profilo pubblico. Infine, si recupera l’id dell’user loggato che, se è un utente e non un professionista, permette di visualizzare sulla pagina un button per iscriversi al gruppo: iscrivendosi viene inserito l’id dell’utente in un array proprietà del gruppo, e l’id del gruppo nell’array delle iscrizioni del singolo utente. Questo permette di visualizzare quanti utenti si sono iscritti a quel gruppo, e bloccare le iscrizioni nel momento in cui la lunghezza dell’array è uguale al numero massimo di utenti indicati dal professionista al momento della creazione del gruppo. Se l’id del gruppo è già presente nell’array dell’utente compare il button per la disiscrizione che, se cliccato, elimina l’id dall’array stesso.
  -	Dettaglio professionista: a partire dal link presente sulla pagina di dettaglio del gruppo, e quindi l’id del professionista che ha creato il gruppo, si atterra sulla pagina del profilo pubblico del professionista che in base a una get in base all’id presente nell’URL recupera tutti i dettagli che lui ha aggiunto, tra cui anche il link a una pagina profilo esterna.

- Profilo Professionista:
  -	Crea Gruppo: componente con un template driven form visibile solo al professionista che deve aggiungere tutti i dettagli richiesti, tra cui anche un link di Google maps per l’indirizzo dove si terranno gli incontri, con un button che fa una post dei valori del form su mockapi creando così il gruppo specifico.
  -	Profilo: profilo privato del professionista con tutti i suoi dettagli, composto da un template driven form i cui input sono popolati dai valori già salvati dal professionista, modificabili attraverso una chiamata http, e da una lista che recupera i gruppi creati da quel singolo professionista in base al suo id. Sono inoltre presenti due button: uno per eliminare l’intero profilo dell’user, uno per eliminare un singolo gruppo creato.

- Profilo Utente
  -	Profilo: profilo privato dell’utente con tutti i suoi dettagli, composto da un template driven form i cui input sono popolati dai valori già salvati dal professionista, modificabili attraverso una chiamata http, e da una lista che recupera i gruppi a cui si è iscritto quel singolo utente: nello specifico, recupera gli id dei gruppi salvati nell’array dell’utente e fa la get di quegli id, inserendoli poi in un array locale per visualizzarli in ciclo sull’html. È inoltre presente un button per eliminare l’intero profilo dell’user.


