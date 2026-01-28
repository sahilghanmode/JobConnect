import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  Box,
  Avatar,
  Button,
  IconButton,
} from "@mui/material";
import {
  Image,
  VideoCall,
  Article,
  Event,
  AutoAwesome,
} from "@mui/icons-material";

const actions = [
  { icon: Image, label: "Photo", color: "primary.main" },
  { icon: VideoCall, label: "Video", color: "warning.main" },
  { icon: Article, label: "Article", color: "text.secondary" },
  { icon: Event, label: "Event", color: "secondary.dark" },
];

export const CreatePost = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card>
        <CardContent sx={{ p: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <motion.div whileHover={{ scale: 1.03 }}>
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  fontSize: 14,
                }}
              >
                JD
              </Avatar>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              style={{
                flex: 1,
                textAlign: "left",
                padding: "12px 16px",
                borderRadius: 12,
                background: "hsla(40, 20%, 92%, 0.5)",
                border: "1px solid hsl(40, 20%, 88%)",
                color: "hsl(30, 10%, 45%)",
                cursor: "pointer",
                transition: "all 0.2s",
                fontSize: 14,
              }}
            >
              Share your thoughts...
            </motion.button>

            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <IconButton
                sx={{
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  "&:hover": { bgcolor: "primary.dark" },
                }}
              >
                <AutoAwesome sx={{ fontSize: 18 }} />
              </IconButton>
            </motion.div>
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              pt: 1.5,
              borderTop: 1,
              borderColor: "divider",
            }}
          >
            {actions.map((action, index) => {
              const Icon = action.icon;
              return (
                <motion.div
                  key={action.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    startIcon={<Icon sx={{ color: action.color }} />}
                    sx={{
                      color: "text.secondary",
                      px: 2,
                      "&:hover": { bgcolor: "action.hover" },
                    }}
                  >
                    {action.label}
                  </Button>
                </motion.div>
              );
            })}
          </Box>
        </CardContent>
      </Card>
    </motion.div>
  );
};
