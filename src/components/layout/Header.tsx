'use client';

import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Favorite, Add, AccountCircle, Language } from '@mui/icons-material';
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
    <AppBar position="sticky" color="default" elevation={1}>
      <Toolbar className="max-w-7xl mx-auto w-full">
        <Link href="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            SecondHand
          </Typography>
        </Link>

        <Box sx={{ flexGrow: 1 }} />

        <Link href="/listings" style={{ textDecoration: 'none' }}>
          <Button color="inherit">
            {t('browse')}
          </Button>
        </Link>

        <IconButton onClick={(e) => setLangAnchor(e.currentTarget)} color="inherit" size="small" sx={{ mx: 0.5 }}>
          <Language fontSize="small" />
          <Typography variant="caption" sx={{ ml: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>
            {locale}
          </Typography>
        </IconButton>
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
              <IconButton color="primary">
                <Add />
              </IconButton>
            </Link>
            <Link href="/profile">
              <IconButton color="inherit">
                <Favorite />
              </IconButton>
            </Link>
            <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} color="inherit">
              <AccountCircle />
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
            <Button variant="contained" size="small">
              {t('signIn')}
            </Button>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  );
}
