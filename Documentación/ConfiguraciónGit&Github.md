# Proceso de configuración de Git y GitHub
## 1. Instalación y configuración inicial de Git

### ¿Qué se hizo?
- Se instaló **Homebrew** como gestor de paquetes.
- Se instaló **Git** usando Homebrew.
- Se configuró correctamente el **PATH** del sistema para que la terminal reconozca `brew` y `git`.

### ¿Qué se aprendió?
- Que instalar Git implica también configurar el entorno del sistema.
- Que el PATH define desde dónde el sistema puede ejecutar programas.
- Que verificar versiones (`git --version`) es una buena práctica.

### Problemas encontrados
- Homebrew no estaba agregado al PATH.
- El problema se solucionó editando el archivo `.zprofile`.

---

## 2. Creación del repositorio en GitHub

### ¿Qué se hizo?
- Se creó un repositorio nuevo en GitHub llamado **Pokedex**.
- Se configuró el repositorio para ser clonado desde la computadora local.

### ¿Qué se aprendió?
- Que GitHub funciona como repositorio remoto.
- Que Git gestiona el control de versiones de forma local.

---

## 3. Configuración de autenticación SSH con GitHub

### ¿Qué se hizo?
- Se intentó clonar el repositorio usando SSH.
- Apareció un error de permisos (`Permission denied (publickey)`).
- Se generó una llave SSH (`ed25519`) en la computadora.
- Se agregó la llave pública a GitHub.
- Se verificó la conexión con `ssh -T git@github.com`.

### ¿Qué se aprendió?
- Que GitHub no reconoce automáticamente una computadora nueva.
- Que las llaves SSH permiten una conexión segura sin usar usuario y contraseña.
- Que el mensaje *"You've successfully authenticated, but GitHub does not provide shell access"* confirma que la conexión fue exitosa.

### Problemas encontrados
- Error de autenticación al clonar el repositorio.
- Se solucionó configurando correctamente la llave SSH.

---

## 4. Clonación del repositorio en la computadora local

### ¿Qué se hizo?
- Se clonó correctamente el repositorio **Pokedex** en la carpeta `Projects`.
- Se verificó que los archivos se descargaron sin errores.

### ¿Qué se aprendió?
- Que clonar un repositorio crea una copia exacta del proyecto remoto.
- Que a partir de este punto el proyecto queda conectado local y remotamente.

### Problemas encontrados
- Que se debe verificar bien en qué carpeta se va a clonar.

---

## 5. Apertura del proyecto en Visual Studio Code

### ¿Qué se hizo?
- Se abrió el proyecto manualmente desde Visual Studio Code usando **Open Folder**.
- No se utilizó la terminal para abrir el proyecto.

### ¿Qué se aprendió?
- Que Visual Studio Code detecta automáticamente repositorios Git.
- Que no es obligatorio abrir proyectos desde la terminal.
- Que el icono de **Source Control** confirma que Git está activo.
