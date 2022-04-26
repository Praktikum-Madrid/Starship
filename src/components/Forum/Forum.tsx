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
  Pagination, Breadcrumbs, Link,
  Container,
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createThread, getThreads } from 'store/actions/forum';
import { useEffect } from 'react';
import { TPostgresThread } from 'types';
import { getUserIdDB } from 'store/actions/settings';

const validationSchema = yup.object({
  name: yup.string().required('Пожалуйста, введите название темы'),
  text: yup
    .string()
    .min(15, 'Минимальная длина - 15 символов')
    .required('Пожалуйста, введите текст сообщения'),
});

function Forum() {
  const [open, setOpen] = React.useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getThreads());
    dispatch(getUserIdDB());
  }, []);

  // @ts-ignore
  const { threads } = useSelector((state) => state.forum);

  const navigate = useNavigate();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      text: '',
    },
    validationSchema,
    onSubmit: async ({
      name,
      text,
    }, { resetForm }) => {
      const thread = await dispatch(createThread({
        name,
        text,
      }));
      resetForm();
      setOpen(false);
      if (thread) {
        // @ts-ignore
        navigate(`/forum/${thread.id}`);
      }
    },
  });

  const [page, setPage] = React.useState(1);
  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    // TODO: реализовать переключение страниц форума
    setPage(value);
    console.log(`Страница ${page}`);
  };

  return (
    <Container
      sx={{
        pt: 2,
        width: '100%',
        height: 'calc(100vh - 88px)',
      }}
    >
      <Breadcrumbs aria-label='breadcrumb' sx={{ m: 0, pt: 0, mb: 1, p: 0 }}>
        <Link underline='hover' color='inherit' component={RouterLink} to='/'>
          Starship
        </Link>
        <Typography color='text.primary'>Форум</Typography>
      </Breadcrumbs>

      <Box component='div' sx={{ m: 0, mt: 2, mb: 1, p: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h4' gutterBottom component='h1' sx={{ color: 'text.primary' }}>
          Форум
        </Typography>
        <Button variant='outlined' onClick={handleClickOpen} sx={{ color: 'text.primary' }}>
          Создать тему
        </Button>
      </Box>

      {threads && threads.length ? (
        <Box component='div' sx={{ m: 2, p: 2, border: '1px solid #ddd', borderRadius: '5px' }}>
          <Stack sx={{ gap: 2 }}>
            {threads.map(({ name, text, id }: TPostgresThread) => (
              <Card key={id}>
                <CardActionArea onClick={() => navigate(`/forum/${id}`)}>
                  <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                      { name }
                    </Typography>
                    <Typography variant='body2' color='text.secondary' sx={{ fontFamily: 'Roboto', fontSize: '18px' }}>
                      { text }
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Stack>
        </Box>
      ) : null}
      {threads && threads.length ? (
        <Box component='div' sx={{ m: 2, p: 0, display: 'flex', alignItems: 'center' }}>
          <Pagination variant='outlined' shape='rounded' count={10} page={page} onChange={handlePageChange} />
        </Box>
      ) : null}

      <Dialog fullWidth maxWidth='md' open={open} onClose={handleClose}>
        <form onSubmit={formik.handleSubmit}>
          <DialogTitle>Создание темы на форуме</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin='dense'
              id='name'
              label='Заголовок темы'
              type='text'
              fullWidth
              variant='standard'
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              sx={{ fontFamily: 'Roboto', fontSize: '18px' }}
            />
            <TextField
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
              sx={{ fontFamily: 'Roboto', fontSize: '18px' }}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Отмена</Button>
            <Button type='submit'>Создать тему</Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
}

function loadData(store: any) {
  store.dispatch(getThreads());
  store.dispatch(getUserIdDB());
}

export default {
  element: Forum,
  loadData,
};
