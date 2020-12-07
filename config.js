module.exports = {
    MONGODB_URL :  process.env.MONGODB_URL || 'mongodb+srv://satyam:satyam123@cluster0.ly3yj.mongodb.net/crm?retryWrites=true&w=majority',
    JWT_SECRET : process.env.JWT_SECRET || 'somethingsrcret'
}