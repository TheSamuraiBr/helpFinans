
module.exports = class PublicController{

    static async showHome(req, res){
        res.render('public/home')
    }        
}