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
} from '@mui/material';
import { useFormik } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import * as yup from 'yup';
import beautifyTime from 'utils/beautifyTime';
import Blockquote from 'components/Blockquote';

type TForumTopic = {
  id: number,
  date: number,
  author: string,
  message: string,
  quote?: string,
}

// Данные для рендера
const themesExampleData: TForumTopic[] = [
  {
    id: 1,
    date: Date.now(),
    author: 'UserName',
    message: 'Здраствуйте. Я, Кирилл. Хотел бы чтобы вы сделали игру, 3Д-экшон суть такова... Пользователь может играть лесными эльфами, охраной дворца и злодеем. И если пользователь играет эльфами то эльфы в лесу, домики деревяные набигают солдаты дворца и злодеи. Можно грабить корованы... И эльфу раз лесные то сделать так что там густой лес... А движок можно поставить так что вдали деревья картинкой,',
  },
  {
    id: 2,
    date: Date.now(),
    author: 'Anonymous',
    message: 'Текст сообщения внутри темы, немного другой',
  },
  {
    id: 3,
    date: Date.now(),
    author: 'Nomad',
    message: 'Очин дорого, зделойте дешевле!',
    quote: 'Текст сообщения внутри темы, немного другой',
  },
];

const validationSchema = yup.object({
  message: yup
    .string()
    .min(15, 'Минимальная длина - 15 символов')
    .required('Пожалуйста, введите текст сообщения'),
});

export default function Topic() {
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [quote, setQuote] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setQuote('');
  };

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema,
    onSubmit: ({ message }, { resetForm }) => {
      const newMessage: TForumTopic = {
        id: Date.now(),
        message,
        date: Date.now(),
        author: 'Текущий юзер',
      };

      if (quote) {
        newMessage.quote = quote;
      }

      // TODO: После создания темы редиректить юзера на её страницу
      themesExampleData.push(newMessage);
      resetForm();
      setQuote('');
      setOpen(false);
    },
  });

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // TODO: реализовать переключение страниц форума
    setPage(value);
    console.log(`Страница ${page}`);
  };

  const handleReply = (quoteText: string) => {
    // FIXME: XSS, только для нужд верстки, заменить на метод апи
    setQuote(quoteText);
    setOpen(true);
  };

  return (
    <>
      <Breadcrumbs aria-label='breadcrumb' sx={{ m: 2, mt: 6, mb: 1, p: 0 }}>
        <Link underline='hover' color='inherit' component={RouterLink} to='/'>
          Starship
        </Link>
        <Link underline='hover' color='inherit' component={RouterLink} to='/forum'>
          Форум
        </Link>
        <Typography color='text.primary'>Можно грабить корованы</Typography>
      </Breadcrumbs>

      <Box component='div' sx={{ m: 2, mt: 2, mb: 1, p: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h4' gutterBottom component='h1'>
          Можно грабить корованы
        </Typography>
        <Button variant='outlined' onClick={handleClickOpen}>
          Ответить в тему
        </Button>
      </Box>

      <Box component='div' sx={{ m: 2 }}>
        <Stack sx={{ gap: 2 }}>
          {themesExampleData.map(({ id, message, date, author, quote = '' }) => (
            <Box key={id} sx={{ p: 2, pl: 0, borderRadius: '5px', border: '1px solid #ddd', display: 'grid', gridTemplateColumns: '140px 1fr', gridColumnGap: '35px' }}>

              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                alignItems: 'center',
                borderRight: '1px solid #ddd',
              }}
              >
                <Avatar
                  alt='Remy Sharp'
                  src='https://via.placeholder.com/80x80?text=Аватар'
                  sx={{ width: 80, height: 80 }}
                />

                <Typography variant='subtitle2' sx={{ mt: 2 }}>
                  {author}
                </Typography>
              </Box>

              <Box>
                <Typography variant='caption' sx={{ color: '#777', pb: 1 }}>
                  {beautifyTime(date)}
                </Typography>

                { quote && <Blockquote text={quote} /> }

                <Typography variant='body2' sx={{ pt: 2, pb: 3, mb: 2, borderBottom: '1px solid #ddd' }}>
                  {message}
                </Typography>
                <Button size='small' variant='outlined' onClick={() => handleReply(message)}>Ответить</Button>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box component='div' sx={{ m: 2, p: 0, display: 'flex', alignItems: 'center' }}>
        <Pagination variant='outlined' shape='rounded' count={10} page={page} onChange={handlePageChange} />
      </Box>

      <Dialog fullWidth maxWidth='md' open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Ответ в тему</DialogTitle>
          <DialogContent>
            { quote && <Blockquote text={quote} /> }
            <TextField
              autoFocus
              margin='dense'
              id='message'
              multiline
              label='Текст сообщения'
              type='text'
              fullWidth
              variant='standard'
              maxRows={6}
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.message && Boolean(formik.errors.message)}
              helperText={formik.touched.message && formik.errors.message}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button type='submit'>Опубликовать ответ</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
