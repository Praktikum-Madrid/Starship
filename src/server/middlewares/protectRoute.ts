import { TRes, TNext, TReqWithUserData } from 'types';

// TODO: Этот мидлварь просто не пропускает запрос далее, если роут защищен
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
