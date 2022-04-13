import { TRes, TNext, TReqWithUserData } from 'types';

const checkAuth = async (req: TReqWithUserData, res: TRes, next: TNext) => {
  if (req.userAuthorised) {
    next();
  } else {
    res.status(401)
      .send({
        error: 'Unauthorised request',
      });
  }
};

export default checkAuth;
