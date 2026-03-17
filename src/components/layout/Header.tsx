'use client';

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Container,
  Chip,
} from '@mui/material';
import { Favorite, Add, AccountCircle, Language, Storefront } from '@mui/icons-material';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';

export function Header() {
  const { data: session } = useSession();
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [langAnchor, setLangAnchor] = useState<null | HTMLElement>(null);

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLangAnchor(null);
  };

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'rgba(15, 15, 25, 0.92)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        color: '#f0f0f5',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ minHeight: { xs: 56, md: 64 }, gap: 1 }}>
          <Link href="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Box
              sx={{
                width: 36,
                height: 36,
                borderRadius: 2,
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <Storefront sx={{ color: '#fff', fontSize: 20 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                fontSize: '1.15rem',
                letterSpacing: '-0.02em',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: { xs: 'none', sm: 'block' },
              }}
            >
              SecondHand
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1 }} />

          <Link href="/listings" style={{ textDecoration: 'none' }}>
            <Button
              sx={{
                color: '#d1d5db',
                fontWeight: 600,
                fontSize: '0.9rem',
                px: 2,
                borderRadius: 2,
                '&:hover': {
                  background: 'rgba(255, 255, 255, 0.08)',
                  color: '#fff',
                },
              }}
            >
              {t('browse')}
            </Button>
          </Link>

          <Chip
            icon={<Language sx={{ fontSize: 16 }} />}
            label={locale.toUpperCase()}
            variant="outlined"
            size="small"
            onClick={(e) => setLangAnchor(e.currentTarget)}
            sx={{
              fontWeight: 700,
              fontSize: '0.7rem',
              borderColor: 'rgba(255,255,255,0.15)',
              color: '#d1d5db',
              cursor: 'pointer',
              height: 30,
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.3)',
                background: 'rgba(255, 255, 255, 0.08)',
              },
            }}
          />
          <Menu
            anchorEl={langAnchor}
            open={Boolean(langAnchor)}
            onClose={() => setLangAnchor(null)}
          >
            <MenuItem selected={locale === 'en'} onClick={() => switchLocale('en')}>
              English
            </MenuItem>
            <MenuItem selected={locale === 'ru'} onClick={() => switchLocale('ru')}>
              Русский
            </MenuItem>
          </Menu>

          {session?.user ? (
            <>
              <Link href="/listings/create">
                <IconButton
                  size="small"
                  sx={{
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    color: '#fff',
                    width: 34,
                    height: 34,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
                      transform: 'scale(1.05)',
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Add sx={{ fontSize: 20 }} />
                </IconButton>
              </Link>
              <Link href="/profile">
                <IconButton
                  size="small"
                  sx={{
                    color: '#d1d5db',
                    '&:hover': { color: '#f87171' },
                    transition: 'color 0.2s ease',
                  }}
                >
                  <Favorite sx={{ fontSize: 20 }} />
                </IconButton>
              </Link>
              <IconButton
                onClick={(e) => setAnchorEl(e.currentTarget)}
                size="small"
                sx={{
                  border: '2px solid rgba(255, 255, 255, 0.15)',
                  width: 34,
                  height: 34,
                  '&:hover': {
                    borderColor: 'rgba(255,255,255,0.3)',
                    background: 'rgba(255, 255, 255, 0.08)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <AccountCircle sx={{ fontSize: 20, color: '#d1d5db' }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <Link href="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {t('profile')}
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                  <Link href="/profile/orders" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {t('orders')}
                  </Link>
                </MenuItem>
                <MenuItem onClick={() => signOut()}>
                  {t('signOut')}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Link href="/auth/login" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="small"
                sx={{
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  px: 2.5,
                  py: 0.75,
                  fontSize: '0.85rem',
                  boxShadow: '0 2px 8px rgba(79, 70, 229, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #4338ca 0%, #6d28d9 100%)',
                    boxShadow: '0 4px 16px rgba(79, 70, 229, 0.4)',
                    transform: 'translateY(-1px)',
                  },
                }}
              >
                {t('signIn')}
              </Button>
            </Link>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
