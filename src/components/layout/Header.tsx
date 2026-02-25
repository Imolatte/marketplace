'use client';

import { AppBar, Toolbar, Typography, Button, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Favorite, Add, AccountCircle } from '@mui/icons-material';
import { Link } from '@/i18n/navigation';
import { useSession, signOut } from 'next-auth/react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function Header() {
  const { data: session } = useSession();
  const t = useTranslations('common');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
