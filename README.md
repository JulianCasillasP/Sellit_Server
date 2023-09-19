# Sellit_Server

# Proyecto de Venta de Artículos Usados

Este proyecto de Venta de Artículos Usados es una aplicación web que permite a los usuarios comprar y vender artículos usados. Está compuesto por un frontend desarrollado en React y un backend que ofrece una API RESTful construida con Express y utiliza MongoDB/Mongoose para la gestión de datos.

## Repositorios

Este proyecto se divide en dos repositorios separados:

https://github.com/JulianCasillasP/Sellit_Client
https://github.com/JulianCasillasP/Sellit_Server

## Modelos

El proyecto utiliza dos modelos principales para gestionar los datos:

1. **Artículo**

const articuloSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, required: true },
  precio: { type: Number, required: true },
  estado: { type: String, required: true },
  vendedor: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
});


2. **Usuario**

   const usuarioSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Orden' }],
  isAdmin: { type: Boolean, default: false },
});


## Roles de Usuario

El sistema tiene dos roles de usuario:

1. **Usuario (user)**
   - Los usuarios pueden:
     - Ver la lista de artículos disponibles.
     - Publicar nuevos artículos para la venta.
     - Ver detalles de un artículo específico.
     - Realizar compras de artículos.
     - Actualizar su perfil y contraseña.

2. **Administrador (admin)**
   - Los administradores tienen todos los privilegios de un usuario normal y además pueden:
     - Gestionar usuarios (crear, actualizar, borrar).
     - Gestionar artículos (crear, actualizar, borrar).

## API Reference

La API ofrece los siguientes endpoints y métodos:

| Método | Endpoint                     | Requiere                             | Respuesta (200)              | Acción                         |
|--------|------------------------------|-------------------------------------|------------------------------|--------------------------------|
| GET    | `/api/articulos`             | Autenticación de usuario (user)     | Lista de artículos           | Obtener lista de artículos      |
| GET    | `/api/articulos/:id`         | Autenticación de usuario (user)     | Detalles del artículo        | Obtener detalles de un artículo |
| POST   | `/api/articulos`             | Autenticación de usuario (user)     | Nuevo artículo creado        | Crear un nuevo artículo         |
| PUT    | `/api/articulos/:id`         | Autenticación de usuario (user)     | Artículo actualizado         | Actualizar un artículo           |
| DELETE | `/api/articulos/:id`         | Autenticación de usuario (user)     | Artículo eliminado           | Borrar un artículo               |
| GET    | `/api/usuarios`              | Autenticación de administrador (admin) | Lista de usuarios           | Obtener lista de usuarios        |
| GET    | `/api/usuarios/:id`          | Autenticación de administrador (admin) | Detalles del usuario        | Obtener detalles de un usuario   |
| POST   | `/api/usuarios/signup`       | -                                   | Usuario registrado           | Registrarse como nuevo usuario   |
| POST   | `/api/usuarios/login`        | -                                   | Autenticación exitosa        | Iniciar sesión                   |
| POST   | `/api/usuarios/logout`       | Autenticación de usuario (user)     | Cierre de sesión exitoso     | Cerrar sesión                    |
| PUT    | `/api/usuarios/:id`          | Autenticación de administrador (admin) | Usuario actualizado          | Actualizar un usuario            |
| DELETE | `/api/usuarios/:id`          | Autenticación de administrador (admin) | Usuario eliminado            | Borrar un usuario                |

**Nota:** Asegúrate de proporcionar la documentación completa y detallada de la API, incluyendo los parámetros requeridos y las respuestas posibles para cada endpoint.

## Diseño Responsive

El diseño de la aplicación es completamente responsive, lo que significa que se adapta a diferentes tamaños de pantalla para ofrecer una experiencia óptima tanto en dispositivos móviles como en computadoras de escritorio.

## Mensajes de Error

La aplicación muestra mensajes de error amigables para el usuario en el frontend en caso de que ocurran errores durante la interacción con la API.

¡Gracias por revisar la documentación de nuestro proyecto!
