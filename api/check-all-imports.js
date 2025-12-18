
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const routesDir = path.join(__dirname, 'src/routes');

async function check() {
    console.log('--- Checking Routes ---');
    const files = fs.readdirSync(routesDir).filter(f => f.endsWith('.js'));
    let hasError = false;

    for (const file of files) {
        try {
            await import(pathToFileURL(path.join(routesDir, file)).href);
            await import(pathToFileURL(path.join(routesDir, file)).href);
            // console.log(`✅ ${file} OK`);
        } catch (error) {
            console.error(`❌ ${file} FAILED: ${error.code} - ${error.message}`);
            hasError = true;
        }
    }

    if (hasError) process.exit(1);
}

check();
