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





