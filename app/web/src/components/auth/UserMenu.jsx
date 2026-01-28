import { useState } from "react";
import { motion } from "framer-motion";
import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Typography,
  Box,
} from "@mui/material";
import { Logout, Person, Settings } from "@mui/icons-material";
// import { useAuth } from "@/contexts/AuthContext"; // ❌ commented for now

export const UserMenu = () => {
  // ❌ Context not used for now
  // const { user, signOut } = useAuth();

  // ✅ Temporary mock user (remove later when AuthContext is ready)
  const user = {
    email: "user@example.com",
    user_metadata: {
      full_name: "Demo User",
      avatar_url: "",
    },
  };

  const signOut = async () => {
    console.log("Sign out clicked");
  };

  // ✅ JSX version (removed TypeScript generics)
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = async () => {
    handleClose();
    await signOut();
  };

  const getInitials = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    }
    if (user?.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  const getDisplayName = () => {
    return user?.user_metadata?.full_name || user?.email || "User";
  };

  return (
    <>
      <motion.div whileHover={{ scale: 1.05 }}>
        <Avatar
          onClick={handleClick}
          src={user?.user_metadata?.avatar_url}
          sx={{
            width: 36,
            height: 36,
            fontSize: 14,
            cursor: "pointer",
            border: "2px solid",
            borderColor: "secondary.main",
            bgcolor: "primary.main",
            color: "primary.contrastText",
          }}
        >
          {!user?.user_metadata?.avatar_url && getInitials()}
        </Avatar>
      </motion.div>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 220,
            borderRadius: 3,
            boxShadow: "0 4px 20px -4px hsla(150, 25%, 45%, 0.15)",
          },
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography variant="subtitle2" fontWeight={600}>
            {getDisplayName()}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {user?.email}
          </Typography>
        </Box>

        <Divider />

        <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <Person fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Profile" />
        </MenuItem>

        <MenuItem onClick={handleClose} sx={{ py: 1.5 }}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Settings" />
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleSignOut} sx={{ py: 1.5, color: "error.main" }}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: "error.main" }} />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
        </MenuItem>
      </Menu>
    </>
  );
};
