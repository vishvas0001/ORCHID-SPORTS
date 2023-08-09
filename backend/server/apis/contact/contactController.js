const Contact = require('./contactModel')


exports.getAll = async (req, resp) => {
await Contact.find(req.body).then(res => {
        resp.send({ success: true, status: 200, message: "All Contact loaded", data: res })
    }).catch(err => {
        resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
    })
}


exports.addContact = async (req, resp) => {
    let formData = req.body
    let validation = ""
    if (!formData.name)
        validation += "name is required,"
    if (!formData.email)
        validation += "email is required,"
    if (!formData.description)
        validation += "description is required,"

    if (!!validation)
        resp.send({ success: false, status: 422, message: validation })
    else {
        let UserData = {
            name: formData.name,
            email: formData.email,
            description: formData.description,
        }
        let user = new Contact(UserData)
         user.save().then(res => {
                resp.send({ success: true, status: 200, message: "Enqiury added Successfully", data: res })

            }).catch(err => {
                resp.send({ success: false, status: 500, message: !!err.message ? err.message : err })
            })
    }

}

