let config = {
    email:{}
}

config.puerto = 3000
config.encriptado = 'jsdhfksdjfsd'
config.origins = [
    'http://localhost:4200'
]
config.email.host = "smtp.gmail.com"
config.email.puerto= 587

module.exports.config = config // para exportar en node en este caso el objeto config