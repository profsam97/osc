import { Drawer, Typography, List, ListItemIcon, ListItemText, AppBar, Toolbar, Avatar, Theme,  Container, ListItemButton, IconButton, Menu, MenuItem } from '@mui/material'
import { AccountCircle, AddCircleOutlineOutlined, Dashboard, Logout, Person, Visibility } from '@mui/icons-material';
import React, { ReactNode } from 'react'
import { useRouter } from 'next/router';
import classes from './Layout.module.css'
import { Box } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../Store/auth';
import useAdminAuth from '../../Hooks/useAdminAuth';
interface BaseLayoutProps {
  children?: ReactNode;
}
interface auth {
 auth: {
  isLoggedin : boolean,
  isAdmin: boolean,
  username: string
 } 
}
const AdminLayout: React.FC<BaseLayoutProps> = ({children}) => {
  const router = useRouter(); 
  const username = useSelector((state: auth) => state.auth.username).toUpperCase();
  useAdminAuth();
  const dispatch = useDispatch();
 const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
 const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };      
  const logoutHandler = () => {
    dispatch(authAction.logout())
    sessionStorage.removeItem('idToken')
  }
  const menuItems = [
    {
      text: 'Dashboard',
      icon: <Dashboard color='secondary'/>,
      path: '/admin'
    },
        {
      text: 'Create Post',
      icon: <AddCircleOutlineOutlined color='secondary'/>,
      path: '/admin/create'
    },
    {
      text: 'View',
      icon: <Visibility color='secondary'/>,
      path: '/admin/view'
    },
    {
      text: 'Users',
      icon: <Person color='secondary'/>,
      path: '/admin/users'
    }
  ]
  return (
      <div className={classes.root} >
      <Drawer variant="permanent" anchor="left" >
       <div>
          <Typography variant="h5" 
         color="secondary" sx={(theme) => ({
            padding: theme.spacing(2)
         })}> OSC</Typography>
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
            Today is {new Date().toDateString()}
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
export default AdminLayout;
