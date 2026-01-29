import { Client } from "pg";
import fs from "fs";
import path, { dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import dotenv from "dotenv";

dotenv.config();

const runMigrations = async () => {

    const client = new Client({ connectionString: process.env.DB_URL })

    try {
        // Connect to the database
        await client.connect();
        console.log('Connected to the database.');

        // Start a transaction
        await client.query('BEGIN');

        console.log('Creating uuid-ossp extension if not exists');
        await client.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');

        const __filename = fileURLToPath(import.meta.url);
        const __dirname = dirname(__filename);

        // Path to migrations directory
        const migrationsDir = path.join(__dirname, '..', 'migrations');

        // Read and sort migration files
        const migrationFiles = fs
            .readdirSync(migrationsDir)
            .filter((file) => file.endsWith('.js'))
            .sort();

        // Run migrations sequentially
        for (const file of migrationFiles) {
            const migrationPath = path.join(migrationsDir, file);
            const { default: migration } = await import(pathToFileURL(migrationPath).href);

            console.log(`Running migration: ${file}`);
            try {
                await migration(client); // Execute the migration
                console.log(`Migration ${file} completed.`);

            } catch (err) {
                console.error(`Migration ${file} failed:`, err.message);
                throw err; // Propagate the error to rollback and exit
            }
        }

        // Commit the transaction if all migrations succeed
        await client.query('COMMIT');
        console.log('All migrations completed successfully.');

    } catch (error) {
        if (error.code == "ECONNREFUSED") {
            console.error("Can not connect to DB!");
            process.exit(1);
        }
        // Rollback the transaction in case of any failure
        console.error('Rolling back due to failure.');
        await client.query('ROLLBACK');
        console.error('Migration process failed:', error.message);
        // Exit with a non-zero status code
        process.exit(1);

    } finally {
        // Close the database connection
        await client.end();
        console.log('Database connection closed.');
    }
};

// Execute the migrations
runMigrations();

