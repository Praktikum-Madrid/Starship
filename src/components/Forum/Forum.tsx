import * as React from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
  Stack,
  Card,
  CardActionArea,
  CardContent,
  Pagination,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

// Данные для рендера
const themesExampleData = [
  {
    title: 'Можно грабить корованы',
    message: 'Здраствуйте. Я, Кирилл. Хотел бы чтобы вы сделали игру, 3Д-экшон суть такова... Пользователь может играть лесными эльфами, охраной дворца и злодеем. И если пользователь играет эльфами то эльфы в лесу, домики деревяные набигают солдаты дворца и злодеи. Можно грабить корованы... И эльфу раз лесные то сделать так что там густой лес... А движок можно поставить так что вдали деревья картинкой,',
    repliesCount: 12,
  },
  {
    title: 'Ещё какой-то заголовок темы',
    message: 'Текст сообщения внутри темы, немного другой',
    repliesCount: 12,
  },
  {
    title: 'Пачиму такие дорогие патроны???',
    message: 'Очин дорого, зделойте дешевле!',
    repliesCount: 12,
  },
];

const validationSchema = yup.object({
  title: yup.string().required('Пожалуйста, введите название темы'),
  message: yup
    .string()
    .min(15, 'Минимальная длина - 15 символов')
    .required('Пожалуйста, введите текст сообщения'),
});

export default function Forum() {
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
      themesExampleData.push({ title, message, repliesCount: 0 });
      resetForm();
      setOpen(false);
    },
  });

  const [page, setPage] = React.useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // TODO: реализовать переключение страниц форума
    setPage(value);
    console.log(`Страница ${page}`);
  };

  return (
    <>
      <Box component={'div'} sx={{ m: 2, mt: 6, mb: 1, p: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" gutterBottom component="h1">
          Форум
        </Typography>
        <Button variant="outlined" onClick={handleClickOpen}>
          Создать тему
        </Button>
      </Box>

      <Box component={'div'} sx={{ m: 2, p: 2, border: '1px solid #ddd', borderRadius: '5px' }}>
        <Stack sx={{ gap: 2 }}>
          {themesExampleData.map(({ title, message }, key) => (
            <Card key={key}>
              <CardActionArea>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {message}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
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
