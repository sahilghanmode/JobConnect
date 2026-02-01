import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  AppBar,
  Toolbar,
  Box,
  TextField,
  IconButton,
  Badge,
  Button,
  InputAdornment,
  useTheme,
} from "@mui/material";
import {
  Home,
  Group,
  Work,
  Message,
  Notifications,
  Search,
  Menu,
} from "@mui/icons-material";
// import { useAuth } from "@/contexts/AuthContext";
import { UserMenu } from "../auth/UserMenu";

const navItems = [
  { icon: Home, label: "Home", active: true },
  { icon: Group, label: "Network", active: false },
  { icon: Work, label: "Jobs", active: false },
  { icon: Message, label: "Messaging", active: false },
  { icon: Notifications, label: "Notifications", active: false },
];

export const Navbar = () => {
  const [searchFocused, setSearchFocused] = useState(false);
//   const { user, loading } = useAuth();
  const theme = useTheme();
//   const navigate = useNavigate();

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <AppBar position="fixed" color="default">
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          {/* <motion.div whileHover={{ scale: 1.02 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  bgcolor: "primary.main",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Box
                  component="span"
                  sx={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700,
                    color: "primary.contrastText",
                    fontSize: "1.125rem",
                  }}
                >
                  N
                </Box>
              </Box>
              <Box
                component="span"
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 600,
                  fontSize: "1.25rem",
                  color: "text.primary",
                  display: { xs: "none", sm: "block" },
                }}
              >
                Nexus
              </Box>
            </Box>
          </motion.div> */}

          {/* Search */}
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <motion.div animate={{ width: searchFocused ? 360 : 260 }}>
              <TextField
                size="small"
                placeholder="Search..."
                fullWidth
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search sx={{ color: "text.secondary", fontSize: 20 }} />
                    </InputAdornment>
                  ),
                }}
              />
            </motion.div>
          </Box>

          {/* Nav Items */}
          <Box
            sx={{
              display: { xs: "none", lg: "flex" },
              alignItems: "center",
              gap: 0.5,
            }}
          >
            {navItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.button
                  key={item.label}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 4,
                    padding: "8px 16px",
                    borderRadius: 12,
                    border: "none",
                    background: item.active
                      ? "hsla(150, 25%, 45%, 0.08)"
                      : "transparent",
                    color: item.active
                      ? theme.palette.primary.main
                      : theme.palette.text.secondary,
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                >
                  <Icon sx={{ fontSize: 20 }} />
                  <Box component="span" sx={{ fontSize: 12, fontWeight: 500 }}>
                    {item.label}
                  </Box>
                </motion.button>
              );
            })}
          </Box>

          {/* Profile & Actions */}
          {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            {user && (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                <IconButton size="small">
                  <Badge
                    badgeContent={3}
                    sx={{
                      "& .MuiBadge-badge": {
                        fontSize: 10,
                        height: 16,
                        minWidth: 16,
                      },
                    }}
                  >
                    <Notifications
                      sx={{ fontSize: 20, color: "text.secondary" }}
                    />
                  </Badge>
                </IconButton>
              </motion.div>
            )}

            {!loading &&
              (user ? (
                <UserMenu />
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Button
                    variant="contained"
                    onClick={() => navigate("/auth")}
                    sx={{ borderRadius: 2 }}
                  >
                    Sign In
                  </Button>
                </motion.div>
              ))}

            <IconButton sx={{ display: { lg: "none" } }} size="small">
              <Menu />
            </IconButton>
          </Box> */}
        </Toolbar>
      </AppBar>
    </motion.div>
  );
};
