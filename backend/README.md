rutas

POST /registrar
POST /login
POST /refresh
GET  /partida/:id
GET  /partida/:id/edificio
GET  /partida/:id/tools
GET  /partida/:id/miners
PUT  /partida/:id
PUT  /partida/:id/miner/:miner_id
POST /partida/:id/miners
PUT  /partida/:id/tools/:tools_id
POST /partida/:id/tools
PUT  /partida/:id/building/:building_id
PUT  /partida/:id/inventory/:inventory_id
PUT  /partida/:id/nameMiners/:miner_id
PUT  /partida/:id/minerBase/:id_base
PUT  /partida/:id/toolBase/:id_base
DELETE /partida/:id
PUT  /usuario/:id

ruta pasos
POST /register
1. El frontend manda los datos como un map, miner= new map() con dos partes
2. el servidor lo recibe
3. se analizan los datos y se guardan
4. se guarda la ultima columna, del map en un forEach
5. se crea un nuevo map, con la clave y el valor mandado luego
6. se manda el dato
7. el frontend lo recibe, borra mineros "beginner" y lo renueva con los que le paso

1. creamos la logica de compra, mejora y venta de mineros, edificios, herramientas y minerales
2. cada que le llega un reques al servidor compara los datos con los qye el espera
3. si coinciden guarda los datos


prepare + run — INSERT, UPDATE, DELETE (ya lo tenés)
prepare + get — SELECT que devuelve un resultado
prepare + all — SELECT que devuelve múltiples resultados
transaction — agrupar varias operaciones atómicas
exec — ejecutar SQL directo sin parámetros (para crear tablas)




// localStorage
pendingActions: [
    { type: 'buyMiner', data: { type: 'begginer' }, timestamp: 123 },
    { type: 'improveMiner', data: { id: 5 }, timestamp: 124 }
]

 El servidor verifica:
const miner = db.get('SELECT * FROM miners WHERE id = ?', id)
if (miner.force + 1 !== req.body.force) throw new Error('Valor inválido')
