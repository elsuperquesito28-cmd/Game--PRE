import { defineConfig } from 'drizzle-kit';

export default defineConfig({
    // Ruta donde tienes tus esquemas/tablas de Drizzle
    schema: './src/database/schema.js',
    // Carpeta donde se guardarán las migraciones en archivos .sql
    out: './out/drizzle',
    // El motor de base de datos que estás usando (mysql, postgres, sqlite)
    dialect: 'sqlite',
    dbCredentials: {
        url: './src/database/local.db'
    }
});
