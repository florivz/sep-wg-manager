const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes/registerRoutes'); // Stellen Sie sicher, dass dies der richtige Pfad zur registerRoutes-Datei ist.
app.use(express.json());
app.use('/api', router); // Verwenden Sie den entsprechenden Präfixpfad, wenn erforderlich

describe('Register Routes', () => {
  it('should create a new user with valid data', async () => {
    const userData = { username: 'testuser', password: 'testpassword', email: 'test@example.com' }; // Setzen Sie gültige Benutzerdaten für Ihren Test
    const response = await request(app)
      .post('/api/user')
      .send(userData)
      .expect(200);

    // Fügen Sie hier Ihre Assertions für die Antwort ein
    expect(response.body).toBeDefined();
    // Erwarten Sie, dass die Antwort den erwarteten Daten entspricht.
    expect(response.body.success).toBe(true);
  });

  it('should return a 500 status for server errors', async () => {
    // Fügen Sie einen Testfall hinzu, der einen Serverfehler im Service auslöst
    // Verwenden Sie ungültige oder fehlende Daten, um einen Fehler im registerService zu provozieren
    // Überprüfen Sie, ob die Antwort einen 500-Statuscode hat
  });

  it('should return a 500 status for short username or password', async () => {
    const userData = { username: 'user', password: 'pass', email: 'test@example.com' }; // Setzen Sie ungültige Benutzerdaten mit zu kurzen Benutzername und Passwort für Ihren Test
    const response = await request(app)
      .post('/api/user')
      .send(userData)
      .expect(500);

    // Fügen Sie hier Ihre Assertions für die Antwort ein
    expect(response.body).toBeDefined();
    // Erwarten Sie, dass die Antwort den erwarteten Statuscode enthält.
    expect(response.body.success).toBe(false);
    // Überprüfen Sie, ob die Fehlermeldung auf den Benutzernamen oder das Passwort hinweist.
    expect(response.body.message).toContain('Username or password too short');
  });
});
