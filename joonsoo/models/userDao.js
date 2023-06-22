const { myDataSource } = require('./dataSource');

const signUp = async (name, email, profileImage, hashedPassword) => {
  try {
    await myDataSource.query(
      `
      INSERT INTO users
                (
                name,
                email,
                profile_image,
                password
               ) 
              VALUES 
              (?, ?, ?, ?);
            `,
      [name, email, profileImage, hashedPassword]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

const signIn = async (email) => {
  try {
    const userPassword = await myDataSource.query(
      `
        SELECT
          password
        FROM users
        WHERE email = ? 
      `,
      [email]
    );
    return userPassword;
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  signUp,
  signIn,
};
