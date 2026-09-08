# Pokemon TCG Pocket API

API JSON estatica para consumir desde una web alojada en cPanel. Se publica con GitHub Pages y se actualiza mediante GitHub Actions.

## Publicar en GitHub

1. Crea un repositorio publico, por ejemplo `pokemon-tcg-pocket-api`.
2. Sube todos los archivos de este paquete a la raiz del repositorio.
3. Ve a **Settings > Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**.
5. Selecciona la rama `main` y la carpeta `/docs`.
6. Guarda.
7. Ve a **Actions > Update API > Run workflow** para importar la base completa actual.

Tu URL quedara normalmente asi:

`https://TU-USUARIO.github.io/pokemon-tcg-pocket-api/`

## Endpoints

- `/v1/metadata.json`
- `/v1/cards.json`
- `/v1/search-index.json`
- `/v1/sets.json`
- `/v1/rarities.json`
- `/v1/sets/A1.json`
- `/v1/types/fire.json`
- `/v1/rarities/c.json`

Ejemplo desde JavaScript:

```js
const API = 'https://TU-USUARIO.github.io/pokemon-tcg-pocket-api/v1';
const cards = await fetch(`${API}/cards.json`).then(r => r.json());
```

Para busquedas, usa preferentemente `search-index.json`; es mas liviano.

## Actualizacion automatica

`.github/workflows/update-api.yml` ejecuta una sincronizacion diaria. Tambien puedes ejecutarla manualmente desde la pestana Actions.

El workflow toma los archivos publicos de `flibustier/pokemon-tcg-pocket-database`, normaliza el esquema y vuelve a generar todos los endpoints.

## Esquema de una carta

```json
{
  "id": "A1-001",
  "set": "A1",
  "number": 1,
  "name": "Bulbasaur",
  "rarity": "C",
  "element": "grass",
  "type": "pokemon",
  "stage": "basic",
  "health": 70,
  "retreatCost": 1,
  "weakness": "fire",
  "packs": ["Mewtwo"],
  "ex": false,
  "imageUrl": "...",
  "setName": "Genes Formidables",
  "releaseDate": "2024-10-30"
}
```

## Licencias y marcas

El codigo de esta capa/API se entrega bajo MIT. Los datos sincronizados proceden de un proyecto MIT de terceros; consulta `THIRD_PARTY_NOTICES.md` y `UPSTREAM-LICENSE.txt`.

Pokemon y sus marcas, nombres e ilustraciones pertenecen a sus respectivos propietarios. Proyecto independiente no afiliado.
