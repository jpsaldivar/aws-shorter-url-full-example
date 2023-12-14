[<< Volver al inicio](../README.md)
# Proyecto

Este proyecto contempla una solución sobre servicios de AWS para acotar URLs.


## General 
Este proyecto contempla 3 grandes elementos: 
- Backend
- Frontend
- S3 

### S3 
Todos los archivos con la redirección HTML y la URL de destino se encuentran almacenados en el bucket de S3 llamado `shorter-url-redirects`, el cual fue creado con IaC. 

Este bucket tiene una regla donde cada archivo es **eliminado de forma automática luego de 10 días de creado**, esto con el fin de limpiar disminuir la cantidad de archivos disponibles con un enlace que ya no será usado. Esto es configurable mediante IaC sobre el componente `/platform/s3/shorter-url-redirects/...`.

![S3 expires files](../assets/s3-expire-files.png)