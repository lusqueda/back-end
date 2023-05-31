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
        if((id).toString() != '-1') {            
            products.splice(id, 1);
            await fs.promises.writeFile(path, JSON.stringify(products, null, '\t'))
            return products    
        }   
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
        return info.id
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





