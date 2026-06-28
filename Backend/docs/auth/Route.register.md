FLUJO LoginRoute
INICIO
    LEER request.body
    
    BUSCAR BaseDeDatos con request.userName
    
    SI se encontró el usuario ENTONCES
        DEFINIR ReturnValues COMO OBJETO
        
        crear el accessToken y refreshToken
        
        ReturnValues = {refreshToken, accessToken}
        DEVOLVER ReturnValues
    SINO
        DEVOLVER error -> "User not found"
    FIN SI
FIN
