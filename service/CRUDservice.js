const connection = require('../config/database')



const getAllUsers = async () => {
    let [results, fields] = await connection.query('SELECT * FROM firstdb.users')
    return results;
}

const getUserById = async (userId) => {
    let [results, fields] = await connection.query('select * FROM firstdb.users where UserId = ? ', [userId])

    let user = results && results.length > 0 ? results[0] : {};

    return user;

}

const addUser = 'insert into firstdb.users (UserId, UserEmail, UserPassword, UserName) values (?,?,?,?)'

const changeUserById = 'update firstdb.users set UserEmail=?, UserPassword=?, UserName=? where UserId=?'


module.exports = {
    getAllUsers,
    getUserById,
    addUser,
    changeUserById
}