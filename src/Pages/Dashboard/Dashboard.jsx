import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import HomeIcon from "@mui/icons-material/Home";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import RateReviewIcon from "@mui/icons-material/RateReview";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Button from "react-bootstrap/Button";
import { Route, Switch, useRouteMatch } from "react-router";
import { Link } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import AddProduct from "../AddProduct/AddProduct";
import AddReview from "../AddReview/AddReview";
import AllOrders from "../AllOrders/AllOrders";
import MakeAdmin from "../MakeAdmin/MakeAdmin";
import ManageProducts from "../ManageProducts/ManageProducts";
import MyOrders from "../MyOrders/MyOrders";
import Payment from "../Payment/Payment";
import "./Dashboard.css";

const drawerWidth = 240;

function Dashboard(props) {
  // import logout and admin from use Auth
  const { LogOut, admin } = useAuth();
  const { window } = props;
  let { path, url } = useRouteMatch();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {admin ? (
          // Declare admin dashboard options
          <>
            <ListItem button key={1}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <Link to={`${url}/orders`}>
                <ListItemText primary='Manage All Order' />
              </Link>
            </ListItem>
            <ListItem button key={1}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <Link to={`${url}/manageproducts`}>
                <ListItemText primary='Manage All Products' />
              </Link>
            </ListItem>
            <ListItem button key={1}>
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <Link to={`${url}/admin`}>
                <ListItemText primary='Make Admin' />
              </Link>
            </ListItem>
            <ListItem button key={1}>
              <ListItemIcon>
                <AddShoppingCartIcon />
              </ListItemIcon>
              <Link to={`${url}/addproduct`}>
                <ListItemText primary='Add New Product' />
              </Link>
            </ListItem>
            <ListItem button key={1}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <Link to='/' onClick={LogOut}>
                <ListItemText primary='LOGOUT' />
              </Link>
            </ListItem>
          </>
        ) : (
          // Declare users dashboard options
          <>
            <ListItem button key={1}>
              <ListItemIcon>
                <CreditCardIcon />
              </ListItemIcon>
              <Button variant='text' onClick={handleShow}>
                <ListItemText primary='Pay Now' />
              </Button>
            </ListItem>
            <ListItem button key={1}>
              <ListItemIcon>
                <RateReviewIcon />
              </ListItemIcon>
              <Link to={`${url}/addreview`}>
                <ListItemText primary='Add Review' />
              </Link>
            </ListItem>
            <ListItem button key={1}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <Link to={`${url}/myorder`}>
                <ListItemText primary='My Order' />
              </Link>
            </ListItem>
            <ListItem button key={1}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <Link to='/' onClick={LogOut}>
                <ListItemText primary='LOGOUT' />
              </Link>
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          position='fixed'
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
          }}>
          <Toolbar>
            <IconButton
              color='inherit'
              aria-label='open drawer'
              edge='start'
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant='h5' noWrap component='div'>
              Dashboard
            </Typography>
            <Typography className='mx-auto' variant='h5' noWrap component='div'>
              <Link to='/'>
                <HomeIcon /> Home
              </Link>
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component='nav'
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
          <Drawer
            container={container}
            variant='temporary'
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}>
            {drawer}
          </Drawer>
          <Drawer
            variant='permanent'
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open>
            {drawer}
          </Drawer>
        </Box>
        <Box sx={{ px: 3 }}>
          <Toolbar />
          <Switch>
            <Route exact path={path}>
              <h3>This is our simple dashboard.</h3>
            </Route>
            <Route path={`${path}/addreview`}>
              <AddReview />
            </Route>
            <Route path={`${path}/payment`}>
              <Payment />
            </Route>
            <Route path={`${path}/myorder`}>
              <MyOrders />
            </Route>
            <Route path={`${path}/orders`}>
              <AllOrders />
            </Route>
            <Route path={`${path}/manageproducts`}>
              <ManageProducts />
            </Route>
            <Route path={`${path}/admin`}>
              <MakeAdmin />
            </Route>
            <Route path={`${path}/addproduct`}>
              <AddProduct />
            </Route>
          </Switch>
        </Box>
      </Box>
      <Payment show={show} handleClose={handleClose} />
    </>
  );
}

export default Dashboard;
