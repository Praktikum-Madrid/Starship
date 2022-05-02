import { TRes, TNext, TReqWithUserData } from 'types';

// Этот мидлвэр не пропускает запрос далее, если роут защищен
const protectRoute = async (req: TReqWithUserData, res: TRes, next: TNext) => {
  console.log('Защита роута');
  if (req.isUserLogined) {
    next();
  } else {
    console.log('Юзер не авторизован. Возвращаем страницу ошибки');
    res.status(401)
      .send({
        error: 'Unauthorised request',
      });
  }
};

export default protectRoute;
