import { getSession } from 'next-auth/react';
import User from '../../../../models/User';
import bcryptjs from 'bcryptjs';
import db from '../../../../utils/db';

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session || (session && !session.user.isAdmin)) {
    return res.status(401).send('signin required');
  }

  const { user } = session;
  if (req.method === 'GET') {
    return getHandler(req, res, user);
  } else if (req.method === 'PUT') {
    return putHandler(req, res, user);
  } else if (req.method === 'DELETE') {
    return deleteHandler(req, res, user);
  } else {
    return res.status(400).send({ message: 'Method not allowed' });
  }
};


const getHandler = async (req, res) => {
    await db.connect();
    const user = await User.findById(req.query.id);
    await db.disconnect();
    res.send(user);
  };
  const putHandler = async (req, res) => {
    await db.connect();
    const user = await User.findById(req.query.id);
    if (user) {
        const { name, email, password, isAdmin } = req.body;
        if (
            !name ||
            !email ||
            !email.includes('@') ||
            (password && password.trim().length < 5)
        ) {
            res.status(422).json({
                message: 'Validation error',
            });
            return;
        }
        user.name = name;
        user.email = email;
        if (password) {
            user.password = bcryptjs.hashSync(password);
        }
        user.isAdmin = isAdmin;

        await user.save();
        await db.disconnect();
            res.send({ message: 'User updated successfully' });
        } else {
        await db.disconnect();
            res.status(404).send({ message: 'User not found' });
        }
  };
  const deleteHandler = async (req, res) => {
    await db.connect();
    const user = await User.findById(req.query.id);
    if (user) {
      await user.remove();
      await db.disconnect();
      res.send({ message: 'User deleted successfully' });
    } else {
      await db.disconnect();
      res.status(404).send({ message: 'Product not found' });
    }
  };
  export default handler;