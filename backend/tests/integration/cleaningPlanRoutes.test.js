const request = require('supertest');
const express = require('express');
const app = express();
const router = require('../routes/cleaningPlanRoutes'); // Stellen Sie sicher, dass dies der richtige Pfad zur cleaningPlanRoutes-Datei ist.
app.use(express.json());
app.use('/api', router); // Verwenden Sie den entsprechenden Präfixpfad, wenn erforderlich

describe('Cleaning Plan Routes', () => {
  it('should get all cleaning tasks for a user', async () => {
    const username = 'testuser'; // Setzen Sie den Benutzernamen für Ihren Test
    const response = await request(app)
      .get(`/api/cleaning-tasks/${username}`)
      .expect(200);

    // Fügen Sie hier Ihre Assertions für die Antwort ein
    expect(response.body).toBeDefined();
    // Erwarten Sie, dass die Antwort den erwarteten Daten entspricht.
  });

  it('should add a new cleaning task', async () => {
    const task = { task: 'Clean the kitchen', roommateId: 1, username: 'testuser' };
    const response = await request(app)
      .post('/api/cleaning-tasks')
      .send(task)
      .expect(200);

    // Fügen Sie hier Ihre Assertions für die Antwort ein
    expect(response.body).toBeDefined();
    // Erwarten Sie, dass die Antwort den erwarteten Daten entspricht.
  });

  it('should delete a cleaning task', async () => {
    const taskId = 1; // Setzen Sie die Aufgaben-ID entsprechend Ihrer Datenbank
    const response = await request(app)
      .delete(`/api/cleaning-tasks/${taskId}`)
      .expect(200);

    // Fügen Sie hier Ihre Assertions für die Antwort ein
    expect(response.body).toBeDefined();
    // Erwarten Sie, dass die Antwort den erwarteten Daten entspricht.
  });

  it('should return a 404 status when trying to delete a non-existent cleaning task', async () => {
    const taskId = 999; // Setzen Sie eine nicht existierende Aufgaben-ID
    const response = await request(app)
      .delete(`/api/cleaning-tasks/${taskId}`)
      .expect(404);

    // Fügen Sie hier Ihre Assertions für die Antwort ein
    expect(response.body).toBeDefined();
    // Erwarten Sie, dass die Antwort den erwarteten Daten entspricht.
  });
});
