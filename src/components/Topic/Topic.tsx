/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Stack,
  Pagination,
  Breadcrumbs,
  Link,
  Container,
} from '@mui/material';
import { useFormik } from 'formik';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import beautifyTime from 'utils/beautifyTime';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import {
  createMessage,
  createMessageToMessage,
  getEmotions,
  getThreadWithMessages,
  resetThread,
} from 'store/actions/forum';
import { TPostgresEmotion, TPostgresMessage } from 'types';
import { PATH } from 'config/consts';

const avatar = '../images/avatar.png'; // TODO доставать по authorId сообщения либо доствать как логин из юзера в бд (перед этим его там завести)

const validationSchema = yup.object({
  text: yup
    .string()
    .min(15, 'Минимальная длина - 15 символов')
    .required('Пожалуйста, введите текст сообщения'),
});

function Topic() {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [quote, setQuote] = React.useState('');
  const [emotionId, setEmotionId] = React.useState();
  const [replyToMessageId, setReplyToMessageId] = React.useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    thread = {},
    emotions,
    messages,
  } = useSelector((state: { auth: any; settings: any; game: any; mode: any; forum: any }) => state.forum);
  const params = useParams();

  useEffect(() => {
    const topicId = params.topicId;
    if (topicId) {
      const threadId = Number(topicId);
      dispatch(getThreadWithMessages(threadId));
      dispatch(getEmotions());
    } else {
      navigate(PATH.FORUM);
    }
    return () => {
      dispatch(resetThread());
    };
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuote('');
    setReplyToMessageId(undefined);
    setEmotionId(undefined);
  };

  const formik = useFormik({
    initialValues: {
      text: '',
    },
    validationSchema,
    onSubmit: async ({ text }, { resetForm }) => {
      const newMessage: TPostgresMessage = {
        text,
      };

      if (quote && replyToMessageId) {
        newMessage.replyToMessageId = replyToMessageId;
      }
      if (emotionId) {
        newMessage.emotionId = emotionId;
      }
      const creteMsg = replyToMessageId ? createMessageToMessage : createMessage;
      await dispatch(creteMsg(newMessage));
      resetForm();
      setQuote('');
      setReplyToMessageId(undefined);
      setOpen(false);
      setEmotionId(undefined);
    },
  });

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // TODO: реализовать переключение страниц форума
    setPage(value);
    console.log(`Страница ${page}`);
  };

  const handleReply = (quoteText: string, replyToMessageId: any) => {
    setQuote(quoteText);
    setReplyToMessageId(replyToMessageId);
    setOpen(true);
    setEmotionId(undefined);
  };

  const getMsgTextById = (replyToMessageId: number) => {
    const msg = messages.find(({ id }: TPostgresMessage) => id === replyToMessageId) || {};
    return msg.text;
  };

  const getEmotion = (emotionId: number) => {
    const emotion = emotions.find(({ id }: TPostgresEmotion) => id === emotionId) || {};
    return emotion.htmlCode;
  };

  return (
    <Container
      sx={{
        pt: 2,
        width: '100%',
        height: 'calc(100vh - 88px)',
      }}
    >
      <Breadcrumbs
        aria-label='breadcrumb'
        sx={{
          m: 2,
          mt: 6,
          mb: 1,
          p: 0,
        }}
      >
        <Link underline='hover' color='inherit' component={RouterLink} to='/'>
          Starship
        </Link>
        <Link underline='hover' color='inherit' component={RouterLink} to='/forum'>
          Форум
        </Link>
        {thread ? (
          <Typography color='text.primary'>
            {thread.name}
          </Typography>
        ) : null}

      </Breadcrumbs>

      <Box
        component='div'
        sx={{
          m: 2,
          mt: 2,
          mb: 1,
          p: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {thread ? (
          <Typography variant='h4' gutterBottom component='h1' sx={{ color: 'text.primary' }}>
            {thread.text}
          </Typography>
        ) : null}
        <Button variant='outlined' onClick={handleClickOpen}>
          Ответить в тему
        </Button>
      </Box>

      <Box component='div' sx={{ m: 2 }}>
        <Stack sx={{ gap: 2 }}>
          {messages.map(({
            id,
            text,
            createdAt,
            authorId,
            replyToMessageId,
            emotionId,
            User,
          }: TPostgresMessage) => (
            <Box
              key={id}
              sx={{
                p: 2,
                pl: 0,
                borderRadius: '5px',
                border: '1px solid #ddd',
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gridColumnGap: '35px',
              }}
            >

              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                alignItems: 'center',
                borderRight: '1px solid #ddd',
              }}
              >
                <Avatar
                  alt={`${authorId}`}
                  src={avatar}
                  sx={{
                    width: 80,
                    height: 80,
                  }}
                />

                <Typography
                  variant='subtitle2'
                  sx={{
                    mt: 2,
                    color: 'text.primary',
                  }}
                >
                  {User ? User.login : ''}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant='caption'
                  sx={{
                    color: '#777',
                    pb: 1,
                  }}
                >
                  {beautifyTime(createdAt)}
                </Typography>

                {replyToMessageId && (
                  <Typography sx={{
                    color: 'text.primary',
                    fontStyle: 'oblique',
                    borderLeft: '1px solid',
                    pl: 2,
                  }}
                  >
                    {getMsgTextById(replyToMessageId)}
                  </Typography>
                )}

                <div style={{ display: 'flex', alignItems: 'baseline' }}>
                  <Typography
                    variant='body2'
                    sx={{
                      pt: 2,
                      pb: 3,
                      mb: 2,
                      borderBottom: '1px solid #ddd',
                      fontFamily: 'Roboto',
                      fontSize: '18px',
                      color: 'text.primary',
                    }}
                  >
                    {text}
                  </Typography>
                  {emotionId && <Typography sx={{ fontSize: '30px' }}>{getEmotion(emotionId)}</Typography>}
                </div>
                <Button size='small' variant='outlined' onClick={() => handleReply(text, id)}>Ответить</Button>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box
        component='div'
        sx={{
          m: 2,
          p: 0,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Pagination variant='outlined' shape='rounded' count={10} page={page} onChange={handlePageChange} />
      </Box>

      <Dialog fullWidth maxWidth='md' open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Ответ в тему</DialogTitle>
          <DialogContent>
            {quote && (
              <Typography sx={{
                color: 'text.primary',
                fontStyle: 'oblique',
                borderLeft: '1px solid',
                pl: 2,
              }}
              >
                {quote}
              </Typography>
            )}
            <div style={{ display: 'flex', alignItems: 'baseline' }}>
              <TextField
                autoFocus
                margin='dense'
                id='text'
                multiline
                label='Текст сообщения'
                type='text'
                fullWidth
                variant='standard'
                maxRows={6}
                value={formik.values.text}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.text && Boolean(formik.errors.text)}
                helperText={formik.touched.text && formik.errors.text}
                sx={{
                  fontFamily: 'Roboto',
                  fontSize: '18px',
                }}
              />
              {emotionId && <Typography sx={{ fontSize: '30px' }}>{getEmotion(emotionId)}</Typography>}
            </div>
            <div style={{
              padding: '20px',
              display: 'flex',
              alignItems: 'baseline',
            }}
            >
              <Typography>Выберите реакцию:</Typography>
              {emotions.map(({
                htmlCode,
                id,
              }: TPostgresEmotion) => (
                <div
                  style={{
                    margin: '0 5px',
                    fontSize: '30px',
                  }}
                  key={id}
                  // @ts-ignore
                  onClick={() => setEmotionId(id)}
                >
                  {htmlCode}
                </div>
              ))}
            </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button type='submit'>Опубликовать ответ</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}

function loadData(store: any, reqUrl = '') {
  const partsUrl = reqUrl.split('/');
  if (partsUrl.length > 2) {
    const threadId = Number(partsUrl[partsUrl.length - 1]);
    if (!Number.isNaN(threadId)) {
      store.dispatch(getThreadWithMessages(threadId));
    }
  }
  store.dispatch(getEmotions());
}

export default {
  element: Topic,
  loadData,
};
