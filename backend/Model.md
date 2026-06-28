DEFINICION DEL MODEL 

DATOS QUE VA A ACEPTAR
1. type: el tipo de accion mas la tabla
2. permisse: si ejecuta el run hay mismo o despues
3. data: un objeto xon todos los datos
4. denegedInformation: le dice que la informacion se pasara despues nomas

METODOS
1. prepare(): ahi va todos los daros antwriores
2. run(): se pasan los datos en caso de que se haya activado el denegedInformation
3. select(): le decis que queres seleccionar de que tabla


-crear la funcion prepare
—crear la parte del insert
———revisa si no existe ese valor en el map()
———crear los nombres y los parametros
———guardar en el map()
———devolver el numver operation
-crear la parre el updata
———crear el comparador que devuelva un array con [columnName, paramName] en base a los parametros pasados
———crear el prepare
———guardar en un Map() con el indice de prepare y un objeto con el query y los valores respectivos
#como se ve el objeto
   Map(
     [1, {query:"insert into ...", values: {...}}]
   )

crearmo el run
1. recibe los parametros ({data, numberOperation})