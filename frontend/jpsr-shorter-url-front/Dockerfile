# Usa una imagen base de Node.js
FROM node:21.4.0-alpine3.18

# Crea y establece el directorio de trabajo en la imagen
WORKDIR /app

# Copia los archivos de la aplicación
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Compila la aplicación para producción
RUN npm run build

# Puerto por defecto de Next.js
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "start"]
