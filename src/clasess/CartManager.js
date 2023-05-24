import fs from 'fs';

const path = 'src/clasess/files/cart.json';

export default class CartManager {

    getCarts = async (limit) => {
        if (fs.existsSync(path)) {
            const data = await fs.promises.readFile(path,"utf-8");
            const carts = JSON.parse(data);

            if(limit > 0){
                const limitCarts = carts.slice(0, limit);
                return limitCarts
            }        
            return carts    
        }else{
            return []    
        }    
    }

    getCartById = async (idSearch) => {
        const carts = await this.getCarts();
        const cart = carts.find((element) => {
            return element.id == idSearch
        });
        return cart.products
    }

    updateCart = async (element,pid) => {
        const carts = await this.getCarts();
        let id = carts.findIndex(key => key.id == pid)
        if(element.title != null){
            carts[id].title = element.title;
        }  
        if(element.description != null){
            carts[id].description = element.description;
        }  
        if(element.code != null){
            carts[id].code = element.thumbnail;
        }  
        if(element.price != null){
            carts[id].price = element.price;
        }
        if(element.status != null){
            carts[id].status = element.status;
        }  
        if(element.stock != null){
            carts[id].stock = element.stock;
        }   
        if(element.category != null){
            carts[id].category = element.category;
        }    
        await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'))
        return products    
    }

    deleteCart = async (idSearch) => {
        const carts = await this.getProducts();
        let id = carts.findIndex(key => key.id == idSearch)
        carts.splice(id, 1);
        await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'))
        return carts    
    }

    addCart = async (info) => {
        const carts = await this.getCarts();
        if (carts.length == 0 ) {
            info.id = 1
        }else{
            info.id = carts[carts.length - 1].id + 1
        }

        carts.push(info);
        await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'))
        return info
    }


    addProductToCart = async (cart, product) => {
        const carts = await this.getCarts();
        let id = carts.findIndex(key => key.id == cart)
        let flg = 0

        if (carts[id].products.length == 0 ) {
            carts[id].products = [{"id": product, "qty": 1}]
        }else{
            carts[id].products.forEach(element => {
                if(element.id == product){
                    carts[id].products.qty = element.qty ++
                    flg = 1
                }
            });
            flg == 0 ? carts[id].products.push({"id": product, "qty": 1}) : null;
        }

        await fs.promises.writeFile(path, JSON.stringify(carts, null, '\t'))
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

    verifyCartId = async (req, res, next) => {
        const cart = req.params.cid;
        const carts = await this.getCarts();
        let id = carts.findIndex(key => key.id == cart);
        ((id).toString() != '-1') ? next() : res.send('No existe el carrito') 
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





