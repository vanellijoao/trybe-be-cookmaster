const { connect } = require('./connection');

const usersCollection = 'users';

const emailAlreadyExists = async (email) => {
  const db = await connect();
  const alreadyExists = await db.collection(usersCollection).findOne({ email });
  return alreadyExists !== null;
};

const createUser = async (name, email, password) => {
  const db = await connect();
  const newUser = await db.collection(usersCollection).insertOne({
    name,
    email,
    password,
    role: 'user',
  });

  return { 
    user: {
      _id: newUser.insertedId,
      name,
      email,
      role: 'user',
    },
  };
};

const findUser = async (email) => {
  const db = await connect();
  const user = db.collection(usersCollection).findOne({ email });

  return user;
};

module.exports = {
  emailAlreadyExists,
  createUser,
  findUser,
};
