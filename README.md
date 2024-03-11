# EGO Challenge
## Descripción
Este proyecto consiste en una solución de software diseñada para facilitar la gestión de información relacionada con vehículos, modelos, categorías y características específicas para una página web de una concesionaria.

## Estado del Proyecto
El proyecto se encuentra en producción con la posibilidad de realizar mejoras.

## Tecnologías Utilizadas
- Frontend: HTML, CSS, JavaScript y React.JS.
- Backend: Python, Django y Django Rest Framework.
- Base de datos: MySQL.

## Guía de Instalación Local
1. **Clonar el Repositorio:**
    ```
    git clone https://github.com/BertiniFranco/Challenge-EGO.git
    ```
    
2. **Instalar Dependencias:**
    1. Abra el directorio del proyecto frontend en un IDE (como Visual Studio Code o WebStorm):
        ```
        Challenge-EGO/ego_frontend/
        ```
    2. Ejecute el siguiente comando en la terminal:
        ```
        npm install
        ```
    3. Abra el directorio del proyecto backend en un IDE (como Visual Studio Code o PyCharm):
        ```
        Challenge-EGO/ego_backend/
        ```
    4. Ejecute el siguiente comando en la terminal:
        ```
        pip install -r requirements.txt
        ```

4. **Crear base de datos:**
    En MySQL Workbench (herramienta visual y entorno integrado de desarrollo diseñado para trabajar con bases de datos MySQL), abra su instancia local y ejecute el script 'Database script.sql' que se encuentra en la carpeta del proyecto

5. **Configuración:**
   1. En la pestaña del IDE que contiene el proyecto backend, abra el siguiente archivo:
        ```
        /ego_backend/settings.py
        ```
    2. Configure la base de datos "default" de acuerdo con los datos de su instancia local de MySQL. Si cuando configuró la instancia no ha hecho cambios, lo unico que deberá ingresar en la configuración es su contraseña.
    3. Luego ejecute en la terminal:
        ```
        py manage.py runserver
        ```
    4. Copie la URL indicada luego de 'Starting development server at' y presione 'CTRL + C'.
    5. En la pestaña del IDE que contiene el proyecto frontend, abra el siguiente archivo:
        ```
        /src/dataAcess/DataAccess.js
        ```
    6. Reemplece YOUR_API_URL con la URL copiada anteriormente y añádale 'ego/' al final.

## Ejecución
1. En la pestaña del IDE que contiene el proyecto backend ejecute el siguiente comando en la terminal:
    ```
    py manage.py runserver
    ```
2. En la pestaña del IDE que contiene el proyecto frontend ejecute el siguiente comando en la terminal:
    ```
    npm start
    ```
3. Automáticamente se abrirá una pestaña con la página web en tu navegador. En caso de que esto no suceda, copie la URL local que se muestra en la consola y péguela en su navegador web.
