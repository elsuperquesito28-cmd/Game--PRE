FLUJO RouteLogin
INICIO
    LEER request.body
    
    BUSCAR EN Base de Datos El body.userName
    
    SI se encontro un usuario con ese nombre
      DEVOLVER error -> "There is a user with this username."
    SINO
      GURDAR Base de Datos un nuevo usuario con el userName y el password
      
      CREAR accessToken, refreshToken con el id del usuario
      
      DEOLVER accessToken y refreshToken
    FIN MIENTRAS
FIN