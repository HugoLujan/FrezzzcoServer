import Admin from '../models/Admin.js';

export const checkRole = (roles) => {
  return async (req, res, next) => {
    const { userId } = res.locals.jwtPayload;
    let user;

    try {
      user = await Admin.findById(userId);
      if (!user) {
        return res.status(401).send();
      }
    } catch (error) {
      return res.status(500).json({ message: 'Internal Server Error' });
    }

    if (roles.includes(user.role)) {
      next();
    } else {
      res.status(401).json({ message: 'Not Authorized test' });
    }
  };
};

