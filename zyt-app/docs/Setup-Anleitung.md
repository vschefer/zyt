# Instructions

**Präsentation**: <https://docs.google.com/presentation/d/1UTlETUsPkXEu-WLZMPuAUYzBs4bbS7pH2q0znScj7eU/>

**Links zu den Repositories**:

- Backend: <https://github.com/doptrois/zyt-server> (branch: ```master```)
- Frontend: <https://github.com/vschefer/zyt> (branch: ```master```)

**Link zum Live-Server**: nicht vorhanden.

**Namen der Branches**:

- Backend: ```master```
- Frontend: ```master```

## Setup-Anleitung

### Backend

1. Repository klonen: https://github.com/doptrois/zyt-server.git
2. ```cd zyt-server/```
3. ```git checkout master```
4. ```npm i```
   *Hinweis: Auf Version 11.6.0 läuft die Applikation, sollte es zu Fehlermeldungen kommen, könnte es an der lokalen Version liegen.*
5. MongoDB lokal installieren (wir nutzen, Version 4.0.5)
6. den MongoDB Daemon (mongod) starten. Unter Mac/Linux mit ```mongod``` oder ```sudo service mongod start```
7. Um die Datenbank zu importieren kann folgender Befehl ausgeführt werden:
   ```mongorestore --drop```
   Im Ordner ```dump/``` wäre sonst der Datenbank-Dump unserer Applikation verfügbar.
8. Jetzt muss die Umgebungsvariable für den JWT-Private-Key festgelegt werden. Unter Mac/Linux kann folgender Befehl ausgeführt werden:
   ```export zyt_jwtPrivateKey=DevMachine```
9. Jetzt kann der Server gestartet werden:
   ```node index.js```

**Hinweis**: Der Server sollte auf http://localhost:9000 laufen.

## Frontend

1. Repository klonen: https://github.com/vschefer/zyt.git
2. ```cd zyt/zyt-app/```
3. ```git checkout master```
4. ```npm i```
   *Hinweis: Auf Version 11.6.0 läuft die Applikation, sollte es zu Fehlermeldungen kommen, könnte es an der lokalen Version liegen.*
5. ```ng serve```

**Hinweis**: Das Frontend sollte über http://localhost:4200/ aufrufbar sein.

## Logins

| Admins                                                       | Mitarbeiter                   |
| ------------------------------------------------------------ | ----------------------------- |
| vanessa.schefer@domain.tld<br />michael.fischer@domain.tld<br/> | maximilian.mueller@domain.tld |

Password für alle Benutzer-Accounts: ```zytApp2018!```

## Besondere Leistungen

Zusätzliche zu den Standardanforderungen, wurden zusätzliche **Goodies/Nice-To-Have-Features** implementiert.

Diese sind:

1. Übersicht der geleisteten Zeiten in der aktuellen Woche
2. Projektübersicht:
   1. Beteiligte Personen:
      1. Projektleiter (Kapitäne)
      2. Mitarbeiter
   2. Startdatum und Deadline
   3. Zeitaufwandstatus
3. Kalender/Ressourcenplanung: Übersicht der zu erledigenden Aufgaben, der aktuellen Woche.
4. ...

Das **Backend** wurde selbst entwickelt. Merkmale:

1. **Linting**: Konfiguration von Airbnb übernommen und über den ganzen Backend-Code eingehalten, mit wenigen individuellen Anpassungen.
2. **Validierung**  von gesendeten Daten an Server, bevor diese über Mongoose bearbeitet werden inkl. Response im Body für den Client. Bsp.:
   1. **ObjectID in Requests**
      Prüfungen ob Object-IDs, z.B. Projekt-ID, beim POST nicht nur gültige Object-IDs sind sondern ob dieser auch vorhanden ist.
      Bsp.: POST ```/api/expenses/```
   2. **Responses** mit entsprechendem Status-Code bei fehlenden Angaben im Body bei ```GET```/```POST```/```PUT```/```DELETE```
      Bei ```POST```, ```PUT```, ```DELETE``` wird immer der aktuelle State des Dokuments zurückgegeben, ausser bei ```POST /api/projects```, hier wird lediglich die ObjectID ausgegeben. Bei ```GET```-Requests werden Object-IDs per ```populate()``` aufgelöst, wo nötig.
   3. **(Uncaught) Exception-Handling** und andere Fehlerbehandlungen um Absturz/Hängen des Servers zu verhindern.
   4. **Konsistenz** nach der Bearbeitung von Dokumenten gewährleistet, indem ```populate()``` eingesetzt wird.
   5. Einsatz **Environment-Variables** für mögliche Konfigurationsanpassungen für Port, jwt Private-Key, Default, Development, Production und Tests.
   6. **Vollständige API-Dokumentation** jedes Endpoints inkl. diverser Request und Response-Beispielen: https://documenter.getpostman.com/view/5816654/RznCqzWF
