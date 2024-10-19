import { readdir, stat, readFile } from 'fs/promises';
import path from 'path';

// Directorio de origen
const srcDir = './src';

// Función recursiva para recorrer archivos y mostrar su contenido
async function readFiles(dir) {
  try {
    const files = await readdir(dir);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const fileStats = await stat(filePath);

      if (fileStats.isDirectory()) {
        // Si es un directorio, recursivamente leer archivos dentro de él
        await readFiles(filePath);
      } else {
        // Leer y mostrar el contenido del archivo
        console.log(`File: ${filePath}`);
        const content = await readFile(filePath, 'utf8');
        console.log(`Content:\n${content}`);
        console.log('--------------------------');
      }
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
}

// Iniciar el recorrido desde el directorio src
readFiles(srcDir);
