const { faker } = require('@faker-js/faker');

class ProductsService {

  constructor () {
    this.products = []
    this.generate()
  }

  generate() {
    const limit = 100

  for (let index = 0; index < limit; index++) {
    this.products.push({
    id: faker.datatype.uuid(),
    name: faker.commerce.productName(),
    price: Number(faker.commerce.price()),
    image: faker.image.imageUrl()
    })
  }
  }

  async create(data) { // Crear
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.products.push(newProduct)

    return newProduct
  }

  async find() { // Buscar

    return new Promise((resolve, reject) => { // creamos una promesa para usar el asincronismo y simulamos una espera con setTimeout

      setTimeout(() => {

        resolve(this.products) // en resolve le enviamos los datos que queremos devolver cuando se cumple la promesa
      }, 5000); // esperar 5 segundos para ejecutar
    })
  }


// Los siguientes datos no tienen nada que ver con el asincronismo, son datos pasados:

  async findOne(id) { // Buscar solo uno
    return this.products.find(item => item.id === id) // llamo al array ejecutando el método buscar ( find ), y como parámetro le digo que si tenemos un elemento id que coincida con el id del producto ( No se cuál es su función )
  }

  async update(id, changes) { // Actualizar

    const index = this.products.findIndex(item => item.id === id) // el método .findIndex devuelve la posición en la que está el objeto

    if (index === -1) { // validamos si existe ( si .findIndex no encuentra el elemento nos va a devolver un -1 )
      throw new Error('product not found')
    }
    const product = this.products[index] // asignamos el producto deseado a una variable
    this.products[index] = { // accedemos al objeto por su index y le aplicamos los cambios
      ...product, // y le pasamos la vairable del producto deseado para que haga una copia
      ...changes // con esto le decimos que aplique a la copia saolamente los cambios necesarios
      // De esta manera estamos persistiendo la información que había antes y solo ajustamos la nueva
    }
    return this.products[index] // retornamos el objeto con su cambio
  }

  async delete(id) { // Eliminar
    const index = this.products.findIndex(item => item.id === id)

    if (index === -1) {
      throw new Error('product not found')
    }
    this.products.splice(index, 1)
    return { id } // le enviamos el id del producto eliminado
  }
}


module.exports = ProductsService
