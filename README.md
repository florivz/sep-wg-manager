# wg-manager
Software-Projekt dediziert für das Modul Software Engineering Project von Prof. Dr. Melcher

Ein Webanwendungsprojekt für Wohngemeinschaften, um Putzpläne, Einkaufslisten und ein Haushaltsbuch zu verwalten.

## Einrichtung und Installation

### Voraussetzungen:

- Node.js und npm installiert
- PostgreSQL installiert

### Schritte:

1. **Repository klonen**:

   ```bash
   git clone https://github.com/florivz/wg-manager.git
   cd wg-manager
   ```

2. **Dependencies installieren**:

   Navigieren Sie sowohl zum Backend- als auch zum Frontend-Verzeichnis und führen Sie `npm install` aus:

   ```bash
   cd backend
   npm install
   ```

   (Wiederholen Sie dies für das Frontend, falls getrennt.)

3. **Umgebungsvariablen einrichten**:

   Erstellen Sie im Hauptverzeichnis des Backends eine `.env`-Datei und fügen Sie die erforderlichen Umgebungsvariablen hinzu:

   ```
    DB_USER=wg_manager
    DB_HOST=localhost
    DB_DATABASE=wg-manager-db
    DB_PASSWORD=<your_password>
    DB_PORT=5432
   ```

   Ersetzen Sie die Platzhalter durch die tatsächlichen Werte für Ihre Datenbankkonfiguration.

4. **Datenbank einrichten**:

   Stellen Sie sicher, dass PostgreSQL läuft und richten Sie die Datenbankstrukturen entsprechend der Anwendung ein. (Hinweis: Hier sollten Sie weitere Anweisungen oder Skripte hinzufügen, falls vorhanden.)

5. **Starten Sie die Anwendung**:

   Backend (läuft auf Port 5001 auf http://localhost:5001/testdb):

   ```bash
   cd path/backend
   node server.js
   ```
      ```bash
   cd path/backend
   npm start
   ```

   Frontend (falls in einem separaten Verzeichnis):

   ```bash
   cd path/frontend
   npm start
   ```
