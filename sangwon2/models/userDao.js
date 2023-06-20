const appDataSource = require('./dataSource')

const createUser = async ( name, email, profileImage, passWord, phoneNumber) => {
    try {
        return await appDataSource.query(
        `INSERT INTO users( 
               name,
               email,
               profile_image,
               password,
               phone_number
           ) VALUES ( ?, ?, ?, ?, ?)
           `, 
           [name, email, profileImage, passWord, phoneNumber]
        );
    } catch (err) {
        const error = new Error(`INVALID_DATA_INPUT`);
        error.statusCode = 500;
        throw error;
    }
};

module.exports = {
    createUser
}