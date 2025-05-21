import { PGliteWorker } from '@electric-sql/pglite/worker';

let db = null;

const initSchema = async (database) => {
    await database.query(`
    CREATE TABLE IF NOT EXISTS patients (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      dob DATE NOT NULL,
      address TEXT,
      phone TEXT,
      email TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);
    await database.query(`
    CREATE INDEX IF NOT EXISTS idx_patient_name ON patients (name);
  `);
    console.log("Database schema initialized");
};
export const initDatabase = async () => {
    if (!db) {
        try {
            const url = `./pglite-worker.js`;
            console.log(url);
            const workerInstance = new Worker(new URL(url, import.meta.url), {
                type: 'module',
            });
            db = new PGliteWorker(workerInstance);
            await initSchema(db);
        } catch (error) {
            console.error("Failed to initialize database:", error);
            throw error;
        }
    }
    return db;
};
export const registerPatient = async (patientData) => {
    const database = await initDatabase();
    const {
        name,
        dob,
        address,
        phone,
        email,
    } = patientData;
    const result = await database.query(
        `INSERT INTO patients 
      (name, dob, address, phone, email) 
     VALUES 
      ($1, $2, $3, $4, $5)
     RETURNING id`,
        [
            name,
            dob,
            address,
            phone,
            email,
        ]
    );
    return result.rows?.[0];
};

export const executeQuery = async (
    sqlQuery,
    params = []
) => {
    try {
        const database = await initDatabase();
        const result = await database.query(sqlQuery, params);
        return { success: true, data: result.rows || [], error: null };
    } catch (error) {
        console.error("Query execution error:", error);
        return {
            success: false,
            data: [],
            error: error.message || "An error occurred while executing the query",
        };
    }
};
