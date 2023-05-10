import fs from 'fs';

const path = 'files/productos.json';

export default class ProductManager {

    getProducts = async () => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path,"utf-8");
            const products = JSON.parse(data);
            return products    
        }else{
            return []    
        }    
    }

    getProductById = async (idSearch) => {
        const product = [];
        const products = await this.getProducts();
        products.forEach(element => {
            if (element.id == idSearch){
                product.push(element);
            }
        });
        return product;
    }

    updateProduct = async (info) => {
        const products = await this.getProducts();
        let id = products.findIndex(key => key.id == info[0].id)
        info.forEach(element => {
            if(element.title != null){
                products[id].title = element.title;
            }  
            if(element.description != null){
                products[id].description = element.description;
            }  
            if(element.price != null){
                products[id].price = element.price;
            }
            if(element.thumbnail != null){
                products[id].thumbnail = element.thumbnail;
            }  
            if(element.stock != null){
                products[id].stock = element.stock;
            }   
            if(element.code != null){
                products[id].code = element.code;
            }    
        });          
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
}

const manager =  new ProductManager();

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
}

test();





