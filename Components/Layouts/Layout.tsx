import { Drawer, Typography, List, ListItem, ListItemIcon, ListItemText, AppBar, Toolbar, Avatar, Theme,  Container, ListItemButton, IconButton, Menu, MenuItem } from '@mui/material'
import { AccountCircle, AddCircleOutlineOutlined, Dashboard, Logout, Person, Visibility } from '@mui/icons-material';
import React, { ReactNode } from 'react'
import { useRouter } from 'next/router';
import classes from './Layout.module.css'
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import useAuth from '../../Hooks/useAuth';
import { authAction } from '../../Store/auth';
interface BaseLayoutProps {
  children?: ReactNode;
}
interface auth {
  auth : {
    isLoggedin: boolean,
    username: string
  }
}

const Layout: React.FC<BaseLayoutProps> = ({children}) => {
 const isLoggedin = useSelector((state: auth) => state.auth.isLoggedin);
 const router = useRouter(); 
 const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
 const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };      const menuItems = [
    {
      text: 'Dashboard',
      icon: <Dashboard color='secondary'/>,
      path: '/users'
    },
        {
      text: 'Create Post',
      icon: <AddCircleOutlineOutlined color='secondary'/>,
      path: '/users/create'
    },
    {
      text: 'View',
      icon: <Visibility color='secondary'/>,
      path: '/users/view'
    }
  ]
   const dispatch = useDispatch();
   const username = useSelector((state: auth) => state.auth.username).toUpperCase();
   useAuth();
   const logoutHandler = () => {
     dispatch(authAction.logout())
     sessionStorage.removeItem('idToken');
     router.push('/');
   }
  return (
      <div className={classes.root} >
      <Drawer variant="permanent" anchor="left" >
       <div>
          <Typography variant="h5" 
         color="secondary" sx={(theme) => ({
            padding: theme.spacing(2)
         })}> OSC </Typography>
         </div>
         <List>
           
           {menuItems.map(item => (
             <ListItemButton divider  key={item.text}
             onClick={() => router.push(item.path)} selected={router.pathname===item.path}>
               <ListItemIcon  >{item.icon}</ListItemIcon>
               <ListItemText  primary={item.text}/>
             </ListItemButton>
           ))}
         </List>
      </Drawer>
      <AppBar position="fixed"   elevation={0}
       sx={(theme) => ({
        color: 'black',
        background: '#fff',
        width:`100% - 280px`
        // ...theme.typography.overline,
      })}
      className={classes.appbar}>
        <Toolbar>
          <Typography  sx={{flexGrow: 1, display:{xs:'none', sm:'flex'
        }}}>
            Today is  {new Date().toDateString()}
            {/* download date fns using npm install date-fns */}
          </Typography>
    <Typography variant='h6' color='text.secondary'>Hi, {username}</Typography>
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem  onClick={logoutHandler}>
              Logout &nbsp;
                   <Logout/> 
                </MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
        <Container sx={{width:`100% - 280px`, mx:15}}>
          <Box sx={{mt:{xs: 10, md: 8}, mx: 10, display: 'flex', flexDirection:'column' }}>
           {children}
          </Box>
      </Container>
    </div>
  )
}
export default Layout;
