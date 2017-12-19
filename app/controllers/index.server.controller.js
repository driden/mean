exports.render = (req,res) => { 
    const user = (!req.user) ? null : {
        _id = req.user.id,
        firstName = req.user.firstName,
        lastName = req.user.lastName
    }
    
    res.render(
        'index', {
            title: 'Hello World',
            userFullName: req.user ? req.user.fullName : ''
    })
}