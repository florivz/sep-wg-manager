const pool = require('../db/connection');
const {
    getExpenses,
    postExpense,
    deleteExpense
} = require('../services/expenseService'); 

describe('Expense Service', () => {
    beforeAll(async () => {
        await pool.connect();
    });

    afterAll(async () => {
        await pool.end();
    });

    describe('getExpenses', () => {
        it('should retrieve all expenses for a specific user', async () => {
            const username = 'testuser';

            try {
                const expenses = await getExpenses(username);

                // Assert that the expenses variable is an array
                expect(Array.isArray(expenses)).toBe(true);
                expect(expenses.length).toBeGreaterThan(0);
            } catch (error) {
                fail(error);
            }
        });
    });

    describe('postExpense', () => {
        it('should create a new expense entry in the database', async () => {
            const roommateId = 1;
            const amount = 50.0;
            const description = 'Groceries';
            const username = 'testuser';

            try {
                const newExpense = await postExpense(roommateId, amount, description, username);

                // Assert that the newExpense variable is an object
                expect(typeof newExpense).toBe('object');
                expect(newExpense.roommateId).toBe(roommateId);
                expect(newExpense.amount).toBe(amount);
                expect(newExpense.description).toBe(description);
                expect(newExpense.username).toBe(username);
            } catch (error) {
                fail(error);
            }
        });
    });

    describe('deleteExpense', () => {
        it('should delete an expense entry from the database by ID', async () => {
            // Insert a test expense entry into the database first
            const testExpense = await postExpense(1, 25.0, 'Test Expense', 'testuser');

            try {
                const deleted = await deleteExpense(testExpense.expenseid);

                // Assert that the 'deleted' variable is true since a row should be deleted
                expect(deleted).toBe(true);

                const expenses = await getExpenses('testuser');
                const matchingExpense = expenses.find(expense => expense.expenseid === testExpense.expenseid);
                expect(matchingExpense).toBeUndefined();
            } catch (error) {
                fail(error);
            }
        });
    });
});
