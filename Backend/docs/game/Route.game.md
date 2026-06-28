FLUJO RouteGame
INICIO
  LEER request.params 
  
  BUSCAR {id} 
  
  LEER userId del JWT
  
  BUSCAR EN Base de datos una partida con el id de la url y userId cin el JWT
  
  SI encuentra la base de dstos ENTONCES
    DEVOLVER un objeto con los valroes de
    
    DEFINICION DE onjeto devolver -> {
      id, coins, level, numberLevel, limitMiner, miners:[], inventory:[]
    }
  SINO
    DEVOLVER error: 404 "Game not found"
  FIN MIENTRAS
FIN