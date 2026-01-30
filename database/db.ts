import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export const initDatabase = async () => {
    try {
        db = await SQLite.openDatabaseAsync('contacts.db');
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS contacts (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                phone TEXT NOT NULL
            );
        `);
        console.log('Database initialized');
    } catch (error) {
        console.error('Database initialization failed:', error);
    }
};

export const addContact = async (name: string, phone: string) => {
    if (!db) await initDatabase();
    try {
        const result = await db?.runAsync(
            'INSERT INTO contacts (name, phone) VALUES (?, ?)',
            name, phone
        );
        return result?.lastInsertRowId;
    } catch (error) {
        console.error('addContact failed:', error);
        throw error;
    }
};

export const getContacts = async () => {
    if (!db) await initDatabase();
    try {
        const result = await db?.getAllAsync('SELECT * FROM contacts ORDER BY id DESC');
        return result;
    } catch (error) {
        console.error('getContacts failed:', error);
        throw error;
    }
};

export const updateContact = async (id: number, name: string, phone: string) => {
    if (!db) await initDatabase();
    try {
        await db?.runAsync(
            'UPDATE contacts SET name = ?, phone = ? WHERE id = ?',
            name, phone, id
        );
    } catch (error) {
        console.error('updateContact failed:', error);
        throw error;
    }
};

export const deleteContact = async (id: number) => {
    if (!db) await initDatabase();
    try {
        await db?.runAsync('DELETE FROM contacts WHERE id = ?', id);
    } catch (error) {
        console.error('deleteContact failed:', error);
        throw error;
    }
};
