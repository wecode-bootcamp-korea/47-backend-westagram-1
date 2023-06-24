const dataSource = require('./dataSource');

const createUser = async ( name, email, profileImage, password ) => {
	try {
		return await dataSource.appDataSource.query(
		`INSERT INTO users(
		    name,
		    email,
		    profile_image,
		    password
		) VALUES (?, ?, ?, ?);
		`,
		[ name, email, profileImage, password ]
	  );
	} catch (err) {
		console.log(err)
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

const verifyUser = async ( email) => {
	try {
		return await dataSource.appDataSource.query(
		`SELECT password FROM users 
		where email = ?
		`,
		[email]
	  );
	} catch (err) {
		const error = new Error('INVALID_DATA_INPUT');
		error.statusCode = 500;
		throw error;
	}
};

module.exports = {
  createUser,
  verifyUser
}