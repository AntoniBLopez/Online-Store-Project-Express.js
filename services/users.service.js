class UsersService {
  constructor () {

  }

  create(userId, name, body) { // Crear
    return [
      {
        userId,
        name: name,
        welcome: `Hola ${name}`,
        products: body
      }
    ]
  }

  createShoppingCart({
    userId,
    name,
    body
  }) { // Crear
    return [
      {
        userId,
        name: name,
        welcome: `Hola ${name}`,
        products: body.products,
        price: body.price,
      }
    ]
  }

  find(userId, body) { // Buscar
    return [
      {
        name: 'Toni',
        welcome: 'Hola Toni',
        userId,
      }
    ]
  }

  findOne(id) { // Buscar solo uno
    return this.products.find(item => item.id === id) // llamo al array ejecutando el método buscar ( find ), y como parámetro le digo que si tenemos un elemento id que coincida con el id del producto ( No se cuál es su función )
  }

  update() { // Actualizar

  }

  delete(id) { // Eliminar
    return {
      message: "Deleted",
      id,
    }
  }

}

module.exports = UsersService // Exportamos la clase
