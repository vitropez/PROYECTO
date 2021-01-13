const download = require('download');
import {ficheros}   from './Ficheros';
async function descargar()  {
    await download(`http://localhost:3000/static/${carpeta.nombre}/${fichero.nombre}`)
    await Promise.all([
        `localhost:3000/static/${carpeta.nombre}/${fichero.nombre}`   
    ].map(url=>download(url)));
}descargar()
export default descargar