const connection = require('../config/database')
const { getAllUsers, getUserById, addUser, changeUserById } = require('../service/CRUDservice')
const { v4: uuidv4 } = require('uuid');


const getHomePage = async (req, res) => {
    let results = await getAllUsers();
    return res.send(results);
}

const getUserInfor = async (req, res) => {
    const userId = req.params.id
    let results = await getUserById(userId);
    return res.send(results)

}

const createUser = async (req, res) => {
    const { UserEmail, UserPassword, UserName } = req.body
    const UserId = uuidv4();

    await connection.query(addUser, [UserId, UserEmail, UserPassword, UserName]);
    res.send(`User with id: ${UserId} created`);

}

const deleteUserById = async (req, res) => {
    const userId = req.params.id
    let [results, fields] = await connection.query('delete from firstdb.users where UserId =?', [userId]);
    res.send(`User with id ${userId} deleted`);
}

const deleteAllUsers = async (req, res) => {
    let [results, fields] = await connection.query('delete from firstdb.users');
    res.send(`All users deleted`);
}

const changeUser = async (req, res) => {
    const userId = req.params.id
    const { UserEmail, UserPassword, UserName } = req.body
    await connection.query(changeUserById, [UserEmail, UserPassword, UserName, userId])
    res.send(`User with id: ${userId} changed`)
}

const updateUser = async (req, res) => {
    const userId = req.params.id
    let user = await getUserById(userId);
    let { UserEmail, UserPassword, UserName } = user;
    if (await req.body.UserEmail != null) {
        UserEmail = req.body.UserEmail;
    }

    if (await req.body.UserPassword != null) {
        UserPassword = req.body.UserPassword;
    }

    if (await req.body.UserName != null) {
        UserName = req.body.UserName;
    }
    await connection.query(changeUserById, [UserEmail, UserPassword, UserName, userId])
    res.send(`User with id: ${userId} updated`)
}




module.exports = {
    getHomePage,
    getUserInfor,
    createUser,
    deleteUserById,
    deleteAllUsers,
    changeUser,
    updateUser
}