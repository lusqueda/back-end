import fs from 'fs';

const path = 'src/clasess/files/productos.json';

export default class ProductManager {

    getProducts = async (limit) => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path,"utf-8");
            const products = JSON.parse(data);

            if(limit > 0){
                const limitProducts = products.slice(0, limit);
                return limitProducts
            }        
            return products    
        }else{
            return []    
        }    
    }

    getProductById = async (idSearch) => {
        const products = await this.getProducts();
        const product = products.find((element) => {
            return element.id == idSearch
        });
        return product ? product : "Producto no encontrado"
    }

    updateProduct = async (element,pid) => {
        const products = await this.getProducts();
        let id = products.findIndex(key => key.id == pid)
        if(id)
            if(element.title != null){
                products[id].title = element.title;
            }  
            if(element.description != null){
                products[id].description = element.description;
            }  
            if(element.code != null){
                products[id].code = element.thumbnail;
            }  
            if(element.price != null){
                products[id].price = element.price;
            }
            if(element.status != null){
                products[id].status = element.status;
            }  
            if(element.stock != null){
                products[id].stock = element.stock;
            }   
            if(element.category != null){
                products[id].category = element.category;
            }    
        await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
        return products    
    }

    deleteProduct = async (idSearch) => {
        const products = await this.getProducts();
        let id = products.findIndex(key => key.id == idSearch)
        products.splice(id, 1);
        await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
        return products    
    }

    addProduct = async (info) => {
        const products = await this.getProducts();
        if (products.length == 0 ) {
            info.id = 1
        }else{
            info.id = products[products.length - 1].id + 1
        }
        products.push(info);
        await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
        return info
    }

    verifyParameters = async (req, res, next) => {
        const product = req.body;
        (product.title == null || product.title == '') ? res.send('El campo title es necesario') :
            (product.description == null || product.description == '') ? res.send('El campo description es necesario') : 
                (product.code == null || product.code == '') ? res.send('El campo code es necesario') :
                    (product.price == null || product.price == '' || product.price < 0) ? res.send('El campo price es necesario y debe ser mayor a 0') : 
                        (product.status == null || product.status == '') ? res.send('El campo status es necesario') : 
                            (product.stock == null || product.stock == '' || product.stock < 0) ? res.send('El campo stock es necesario y debe ser mayor a 0') : 
                                (product.category == null || product.category == '') ? res.send('El campo category es necesario') : next();
    }

    verifyProductId = async (req, res, next) => {
        const product = req.params.pid;
        const products = await this.getProducts();
        let id = products.findIndex(key => key.id == product);
        ((id).toString() != '-1') ? next() : res.send('No existe el producto') 
    }

}

/*const manager =  new ProductManager();

const test = async() => {
    await manager.addProduct({title: 'Harina', description: 'tipo 0000', price: '300', thumbnail: 'img/harina.png', code: '2324H', stock: '50'})
    console.log ('/////////getProducts///////////');    
    let viewProductsFirst =  await manager.getProducts();
    console.log(viewProductsFirst);
    console.log ('/////////addProduct = Azucar ///////////');    
    await manager.addProduct({title: 'Azucar', description: 'Negra', price: '500', thumbnail: 'img/azucar.png', code: '24564A', stock: '30'})
    let viewProductsSecond =  await manager.getProducts();
    console.log(viewProductsSecond);
    console.log ('///////// getProductById = 2 ///////////');    
    console.log (await manager.getProductById(2));
    console.log ('/////////addProduct = Oregano ///////////');    
    await manager.addProduct({title: 'Oregano', description: 'Triturado', price: '200', thumbnail: 'img/oregano.png', code: '32644O', stock: '50'})
    let viewProductsThird =  await manager.getProducts();
    console.log(viewProductsThird);
    console.log ('///////// updateProduct = 2 ///////////');    
    await manager.updateProduct([{id: '2', title:'Pimienta', price: '200', thumbnail: 'img/pimienta.png'}]);
    let viewProductsFourth = await manager.getProducts();
    console.log(viewProductsFourth);
    console.log ('///////// deleteProduct = 3 ///////////');    
    await manager.deleteProduct(3);
    let viewProductsFifth = await manager.getProducts();
    console.log(viewProductsFifth);

    console.log(await manager.getProducts(2));
} 



test(); */





