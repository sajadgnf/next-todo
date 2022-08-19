import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import Link from 'next/link';
import React from 'react';
import { makeStyles } from '@mui/styles';
import { signIn, signOut, useSession } from 'next-auth/react';

const useStyle = makeStyles({
    appbarList: {
        listStyle: 'none',
        display: 'flex',
        alignItems: 'center',
        opacity: 1,
    },
    loadingMood: {
        listStyle: 'none',
        display: 'flex',
        alignItems: 'center',
        opacity: 0,
    },
    authBtn: {
        color: "#333",
        textTransform: "none",
        marginLeft: 12,
        "&:hover": {
            backgroundColor: "transparent",
        },
        "& span": {
            display: "none",
        }
    }
})

const Header = () => {

    const classes = useStyle()
    const { data: session, status } = useSession()

    return (
        <AppBar sx={{ bgcolor: "#fff", color: "#333", height: 60 }}>
            <Toolbar sx={{ mx: { xs: 1, lg: 12 } }}>
                <Typography variant='p' component="h4" flex='1'>TodoList App</Typography>
                <ul className={status === "loading" && !session ? classes.loadingMood : classes.appbarList}>
                    <li>
                        <Link href={'/'}>
                            <Typography ml={3} component='a'>Home</Typography>
                        </Link>
                    </li>
                    <li>
                        <Link href={'/profile'}>
                            <Typography ml={3} component='a'>Profile</Typography>

                        </Link>
                    </li>
                    <li>
                        {
                            status !== "loading" && !session &&
                            <Button className={classes.authBtn} onClick={() => signIn('github')}>Sign in</Button>
                        }
                    </li>
                    <li>
                        {
                            session &&
                            <Button className={classes.authBtn} onClick={() => signOut()}>Sign out</Button>
                        }
                    </li>
                </ul>
            </Toolbar>
        </AppBar >
    );
};

export default Header;