
export default class ViewsController 
{
    resetPassword = async (req, res) => {
        res.render('resetPassword');   
    }

    setPassword = async (req, res) => {
        res.render('setPassword', { email: req.query.email });   
    }
}