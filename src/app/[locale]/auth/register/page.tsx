'use client';

import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
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

import { trpc } from '@/lib/trpc/client';

const registerSchema = z.object({
  name: z.string().min(1).max(50),
  email: z.email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const t = useTranslations('auth');
  const router = useRouter();
  const [error, setError] = useState('');
  const registerMutation = trpc.user.register.useMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    setError('');
    try {
      await registerMutation.mutateAsync({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      router.push('/');
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Registration failed');
    }
  };

  return (
    <Container maxWidth="xs" sx={{ py: 8 }}>
      <Typography variant="h4" align="center" gutterBottom fontWeight={600}>
        {t('register')}
      </Typography>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <TextField
          label={t('name')}
          {...register('name')}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />
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
        <TextField
          label={t('confirmPassword')}
          type="password"
          {...register('confirmPassword')}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
          fullWidth
        />
        <Button type="submit" variant="contained" size="large" fullWidth disabled={registerMutation.isPending}>
          {t('register')}
        </Button>
      </Box>

      <Typography variant="body2" align="center" sx={{ mt: 2 }}>
        {t('hasAccount')}{' '}
        <Link href="/auth/login">{t('login')}</Link>
      </Typography>
    </Container>
  );
}
