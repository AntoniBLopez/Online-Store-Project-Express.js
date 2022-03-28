// Aquí es donde empezamos a definir toda la lógica y todas las interacciones a nivel transaccional que van a tener nuestros datos

// En este caso, en este archivo necesitamos gestionar todo lo que tiene que ver con nuestros productos con CRUD

const { faker } = require('@faker-js/faker');// Traemos el módulo NPM que nos permite crear datos aleatorios

class ProductsService { // Usamos programación orientada a objetos para crear este manejo transaccional que le vamos a llevar al producto

  constructor () { // Vamos a manejar todo esto en memoria porque actualmente no tenemos una fuente de datos ( DB )
    this.products = []
    this.generate() // ejecuto el método generate que se va a ejecutar cada vez que generemos una instáncia de la clase
  }

  generate() {
    const limit = 100

  for (let index = 0; index < limit; index++) {
    this.products.push({
    id: faker.datatype.uuid(), // genero un string largo que simule el id del producto
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    image: faker.image.imageUrl()
    })
  }
  }

  create() { // Crear

  }

  find() { // Buscar
    return this.products
  }

  findOne(id) { // Buscar solo uno
    return this.products.find(item => item.id === id) // llamo al array ejecutando el método buscar ( find ), y como parámetro le digo que si tenemos un elemento id que coincida con el id del producto ( No se cuál es su función )
  }

  update() { // Actualizar

  }

  delete() { // Eliminar

  }
}


module.exports = ProductsService // Exportamos la clase
