
export default class ViewsController 
{
    resetPassword = async (req, res) => {
        res.render('resetPassword');   
    }

    setPassword = async (req, res) => {
        res.render('setPassword', { email: req.query.email });   
    }

    documents = async (req, res) => {
        console.log(req.user.user._id)
        res.render('uploadFiles', { id: req.user.user._id});   
    }
}