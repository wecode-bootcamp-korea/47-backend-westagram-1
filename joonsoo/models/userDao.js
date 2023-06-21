const { myDataSource } = require('./dataSource');

const signUp = async (name, email, profileImage, password) => {
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
      [name, email, profileImage, password]
    );
  } catch (err) {
    const error = new Error('INVALID_DATA_INPUT');
    error.statusCode = 500;
    throw error;
  }
};

module.exports = {
  signUp,
};
