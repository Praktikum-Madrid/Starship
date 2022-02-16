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
  // Grid,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import beautifyTime from 'utils/beautifyTime';

// Данные для рендера
const themesExampleData = [
  {
    date: Date.now(),
    author: 'UserName',
    title: 'Можно грабить корованы',
    message: 'Здраствуйте. Я, Кирилл. Хотел бы чтобы вы сделали игру, 3Д-экшон суть такова... Пользователь может играть лесными эльфами, охраной дворца и злодеем. И если пользователь играет эльфами то эльфы в лесу, домики деревяные набигают солдаты дворца и злодеи. Можно грабить корованы... И эльфу раз лесные то сделать так что там густой лес... А движок можно поставить так что вдали деревья картинкой,',
  },
  {
    date: Date.now(),
    author: 'Anonymous',
    title: 'Ещё какой-то заголовок темы',
    message: 'Текст сообщения внутри темы, немного другой',
  },
  {
    date: Date.now(),
    author: 'Nomad',
    title: 'Пачиму такие дорогие патроны???',
    message: 'Очин дорого, зделойте дешевле!',
  },
];

const validationSchema = yup.object({
  title: yup.string().required('Пожалуйста, введите название темы'),
  message: yup
    .string()
    .min(15, 'Минимальная длина - 15 символов')
    .required('Пожалуйста, введите текст сообщения'),
});

export default function Topic() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      title: '',
      message: '',
    },
    validationSchema,
    onSubmit: ({ title, message }, { setSubmitting, resetForm }) => {
      // TODO: После создания темы редиректить юзера на её страницу
      // themesExampleData.push({ title, message, author });
      resetForm();
      handleClose();
    },
  });

  const [page, setPage] = React.useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // TODO: реализовать переключение страниц форума
    setPage(value);
    console.log(`Страница ${page}`);
  };

  const handleReply = (quoteText: string) => {
    console.log(quoteText);
  };

  return (
    <>
      <Box component={'div'} sx={{ m: 2, mt: 6, mb: 1, p: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom component="h1">
          Можно грабить корованы
        </Typography>
        <Button variant="outlined" onClick={handleClickOpen}>
          Ответить в тему
        </Button>
      </Box>

      <Box component={'div'} sx={{ m: 2 }}>
        <Stack sx={{ gap: 2 }}>
          {themesExampleData.map(({ message, date, author }, key) => (
            <Box key={key} sx={{ p: 2, pl: 0, borderRadius: '5px', border: '1px solid #ddd', display: 'grid', gridTemplateColumns: '140px 1fr', gridColumnGap: '35px' }}>

              <Box sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                flexDirection: 'column',
                alignItems: 'center',
                borderRight: '1px solid #ddd',
              }}>
                <Avatar
                  alt="Remy Sharp"
                  src="https://via.placeholder.com/80x80?text=Аватар"
                  sx={{ width: 80, height: 80 }}
                />

                <Typography variant="subtitle2" sx={{ mt: 2 }}>
                  {author}
                </Typography>
              </Box>

              <Box >
                <Typography variant="caption" sx={{ color: '#777', pb: 1 }}>
                  {beautifyTime(date)}
                </Typography>
                <Typography variant="body2" sx={{ pt: 2, pb: 3, mb: 2, borderBottom: '1px solid #ddd' }}>
                  {message}
                </Typography>
                <Button size="small" variant="outlined" onClick={() => handleReply(message)}>Ответить</Button>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>

      <Box component={'div'} sx={{ m: 2, p: 0, display: 'flex', alignItems: 'center' }}>
        <Pagination variant="outlined" shape="rounded" count={10} page={page} onChange={handlePageChange} />
      </Box>

      <Dialog fullWidth maxWidth={'md'} open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Создание темы на форуме</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Заголовок темы"
              type="text"
              fullWidth
              variant="standard"
              value={formik.values.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.title && Boolean(formik.errors.title)}
              helperText={formik.touched.title && formik.errors.title}
            />
            <TextField
              margin="dense"
              id="message"
              multiline
              label="Текст сообщения"
              type="text"
              fullWidth
              variant="standard"
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
            <Button type={'submit'}>Создать тему</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
