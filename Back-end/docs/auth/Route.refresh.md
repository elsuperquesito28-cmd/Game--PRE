FLUJO RefreshRoute
INICIO
    LEER request.headers
    
    NOTA: el header tiene que poseer una aitorizacion con el refreshToken
    
    LEER request.headers.authorization
    
    VERIFICAR el token para ver si es valido
    
    SI el token es valido ENTONCES
        DEFINIR ReturnValues COMO OBJETO
        
        crear el accessToken y refreshToken
        
        ReturnValues = {refreshToken, accessToken}
        DEVOLVER ReturnValues
    SINO
        DEVOLVER error -> "User not found"
    FIN SI
FIN
