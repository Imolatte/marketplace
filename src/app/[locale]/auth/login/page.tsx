'use client';

import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Divider,
  Alert,
  Paper,
} from '@mui/material';
import { Google, LockOutlined } from '@mui/icons-material';
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
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(180deg, rgba(79, 70, 229, 0.03) 0%, transparent 60%)',
      }}
    >
      <Container maxWidth="xs" sx={{ py: 8 }}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Box
            sx={{
              width: 56,
              height: 56,
              borderRadius: 3,
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mx: 'auto',
              mb: 2.5,
              boxShadow: '0 8px 24px -4px rgba(79, 70, 229, 0.35)',
            }}
          >
            <LockOutlined sx={{ color: '#fff', fontSize: 28 }} />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              fontSize: '1.75rem',
              letterSpacing: '-0.02em',
            }}
          >
            {t('login')}
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            border: '1px solid rgba(0, 0, 0, 0.06)',
          }}
        >
          {error && <Alert severity="error" sx={{ mb: 2.5 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
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
            <Button
              type="submit"
              variant="contained"
              size="large"
              fullWidth
              sx={{
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: 2.5,
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                boxShadow: '0 4px 16px -4px rgba(79, 70, 229, 0.4)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
                  boxShadow: '0 8px 24px -4px rgba(79, 70, 229, 0.5)',
                },
              }}
            >
              {t('login')}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }}>
            <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500, px: 1 }}>
              {t('orContinueWith')}
            </Typography>
          </Divider>

          <Button
            variant="outlined"
            fullWidth
            onClick={() => signIn('google', { callbackUrl: '/' })}
            startIcon={<Google />}
            sx={{
              py: 1.25,
              borderColor: 'rgba(0, 0, 0, 0.1)',
              color: 'text.primary',
              fontWeight: 600,
              '&:hover': {
                borderColor: 'rgba(0, 0, 0, 0.2)',
                background: 'rgba(0, 0, 0, 0.02)',
              },
            }}
          >
            {t('google')}
          </Button>
        </Paper>

        <Typography variant="body2" align="center" sx={{ mt: 3, color: 'text.secondary' }}>
          {t('noAccount')}{' '}
          <Link href="/auth/register" style={{ color: '#4f46e5', fontWeight: 600, textDecoration: 'none' }}>
            {t('register')}
          </Link>
        </Typography>
      </Container>
    </Box>
  );
}
