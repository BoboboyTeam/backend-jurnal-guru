import User from '../models/user.js';
import { generateToken } from '../helper/jwt.js';
import { comparePassword, hashPassword } from '../helper/bcrypt.js';

class AuthController {
    static register = async (req, res, next) => {
        try {
            const { nama, email, password, role } = req.body;
            
            switch (true) {
                case !nama:
                    throw { msg: 'Name Is Empty' };
                case !email:
                    throw { msg: 'Email Is Empty' };
                case !password:
                    throw { msg: 'Password Is Empty' };
                case !role:
                    throw { msg: 'Role Is Empty' };
            }
            
            const checkUser = await User.findOne({ email:email });

            if (checkUser) {
                throw { msg: 'Email Already Exist' };
            }

            const user = await User.create({
                nama,
                email,
                password: hashPassword(password),
                role: role.toLowerCase(),
            });
            return res.status(201).json({
                email: email,
                role: role,
            });
        } catch (err) {
            next(err);
        }
    };

    static login = async (req, res, next) => {
        try {
            const { email, password } = req.body;

            switch (true) {
                case !email:
                    throw { msg: 'Email Is Empty' };
                case !password:
                    throw { msg: 'Password Is Empty' };
            }
            const user = await User.findOne({ email:  email  });
            console.log(comparePassword( password,user.password));

            if (!user) {
                throw { msg: 'User Not Found' };
            } else {
                if (comparePassword(password,user.password,)) {
                    const access_token = generateToken({ id: user._id });
                    return res.status(200).json({ access_token, role: user.role ,nama: user.nama});
                } else {
                    throw { msg: 'Invalid Email Password' };
                }
            }
        } catch (err) {
            next(err);
        }
    };
}

export default AuthController;
