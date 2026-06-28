POST /register    — crea cuenta, devuelve tokens
POST /login        — verifica usuario, devuelve tokens

POST /refresh           — renueva access token
GET  /game/:id       — carga game, miners, inventory

GET  /game/:id/building
GET  /game/:id/tools
GET  /game/:id/miners

PUT  /game/:id — actualiza tabla game

PUT  /game/:id/miner/:miner_id
POST /game/:id/miners

PUT  /game/:id/tools/:tools_id
POST /game/:id/tools

PUT  /game/:id/building/:building_id
PUT  /game/:id/inventory/:inventory_id

PUT  /game/:id/nameMiners/:miner_id
PUT  /game/:id/minerBase/:id_base
PUT  /game/:id/toolBase/:id_base

DELETE /game/:id
PUT  /user/:id