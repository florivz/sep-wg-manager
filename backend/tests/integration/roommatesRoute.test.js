const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes/roommatesRoutes'); // Stellen Sie sicher, dass dies der richtige Pfad zur roommatesRoutes-Datei ist.
app.use(express.json());
app.use('/api', router); // Verwenden Sie den entsprechenden Präfixpfad, wenn erforderlich

describe('Roommates Routes', () => {
  it('should get all roommates for a user', async () => {
    const username = 'testuser'; // Setzen Sie den Benutzernamen für Ihren Test
    const response = await request(app)
      .get(`/api/roommates/${username}`)
      .expect(200);

    // Fügen Sie hier Ihre Assertions für die Antwort ein
    expect(response.body).toBeDefined();
    // Erwarten Sie, dass die Antwort den erwarteten Daten entspricht.
  });

  it('should return a 500 status for server errors', async () => {
    // Fügen Sie einen Testfall hinzu, der einen Serverfehler im Service auslöst
    // Verwenden Sie ungültige oder fehlende Daten, um einen Fehler im roommatesService zu provozieren
    // Überprüfen Sie, ob die Antwort einen 500-Statuscode hat
  });

  it('should create a new roommate with valid data', async () => {
    const roommateData = { firstname: 'John', lastname: 'Doe', email: 'johndoe@example.com', username: 'testuser' }; // Setzen Sie gültige Daten für Ihren Test
    const response = await request(app)
      .post('/api/roommates')
      .send(roommateData)
      .expect(201);

    // Fügen Sie hier Ihre Assertions für die Antwort ein
    expect(response.body).toBeDefined();
    // Erwarten Sie, dass die Antwort den erwarteten Daten entspricht.
    expect(response.body.success).toBe(true);
  });

  it('should return a 500 status for server errors when creating a new roommate', async () => {
    // Fügen Sie einen Testfall hinzu, der einen Serverfehler beim Hinzufügen eines neuen Mitbewohners auslöst
    // Verwenden Sie ungültige oder fehlende Daten, um einen Fehler im roommatesService zu provozieren
    // Überprüfen Sie, ob die Antwort einen 500-Statuscode hat
  });

  it('should delete a roommate by ID', async () => {
    const roomId = 1; // Setzen Sie die ID eines Mitbewohners, den Sie löschen möchten, für Ihren Test
    const response = await request(app)
      .delete(`/api/roommates/${roomId}`)
      .expect(200);

    // Fügen Sie hier Ihre Assertions für die Antwort ein
    expect(response.body).toBeDefined();
    // Erwarten Sie, dass die Antwort den erwarteten Statuscode enthält.
    expect(response.body.success).toBe(true);
  });

  it('should return a 404 status if the roommate to delete is not found', async () => {
    const roomId = 999; // Setzen Sie eine ungültige ID für einen Mitbewohner, den Sie löschen möchten
    const response = await request(app)
      .delete(`/api/roommates/${roomId}`)
      .expect(404);

    // Fügen Sie hier Ihre Assertions für die Antwort ein
    expect(response.body).toBeDefined();
    // Erwarten Sie, dass die Antwort den erwarteten Statuscode enthält.
  });
});
