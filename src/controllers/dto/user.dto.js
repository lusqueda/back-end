export class CurrentUserDTO {
    constructor(user){
        this.first_name = user.user.first_name,
        this.last_name = user.last_name,
        this.email = user.user.email,
        this.cart = user.user.cart,
        this.role = user.user.role
    }
}