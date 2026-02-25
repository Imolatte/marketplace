'use client';

import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Alert,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod/v4';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [error, setError] = useState('');
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginForm) => {
    setError('');
    const result = await signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.error) {
      setError('Invalid credentials');
    } else {
      router.push('/');
      router.refresh();
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
        {t('login')}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label={t('email')}
          type="email"
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
          fullWidth
        />
        <TextField
          label={t('password')}
          type="password"
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
          fullWidth
        />
        <Button type="submit" variant="contained" size="large" fullWidth>
          {t('login')}
        </Button>
      </Box>

      <Divider sx={{ my: 3 }}>{t('orContinueWith')}</Divider>

      <Button
        variant="outlined"
        fullWidth
        onClick={() => signIn('google', { callbackUrl: '/' })}
      >
        {t('google')}
      </Button>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {t('noAccount')}{' '}
        <Link href="/auth/register">{t('register')}</Link>
      </Typography>
    </Container>
  );
}
