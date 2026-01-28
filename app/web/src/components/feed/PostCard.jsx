import { motion } from "framer-motion";
import { useState } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Avatar,
  IconButton,
  Divider,
  Button,
} from "@mui/material";
import {
  FavoriteBorder,
  Favorite,
  ChatBubbleOutline,
  Share,
  BookmarkBorder,
  Bookmark,
  MoreHoriz,
} from "@mui/icons-material";

export const PostCard = ({
  author,
  content,
  image,
  likes,
  comments,
  time,
  index,
}) => {
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = () => {
    setLiked((prev) => !prev);
    setLikeCount((prev) => (liked ? prev - 1 : prev + 1));
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      <Card
        sx={{
          "&:hover": {
            boxShadow: "0 4px 24px -8px hsla(150, 25%, 45%, 0.15)",
            borderColor: "primary.light",
          },
          transition: "all 0.3s ease",
        }}
      >
        <CardContent sx={{ p: 2.5 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Avatar
                  sx={{
                    width: 48,
                    height: 48,
                    fontSize: 14,
                    border: "2px solid transparent",
                    background:
                      "linear-gradient(135deg, hsla(150, 25%, 45%, 0.2), hsla(350, 30%, 70%, 0.2))",
                  }}
                >
                  {author?.avatar}
                </Avatar>
              </motion.div>

              <Box>
                <Typography
                  variant="subtitle2"
                  fontWeight={600}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { color: "primary.main" },
                    transition: "color 0.2s",
                  }}
                >
                  {author?.name}
                </Typography>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                >
                  {author?.title}
                </Typography>

                <Typography variant="caption" color="text.disabled">
                  {time}
                </Typography>
              </Box>
            </Box>

            <IconButton size="small">
              <MoreHoriz sx={{ fontSize: 20 }} />
            </IconButton>
          </Box>

          {/* Content */}
          <Typography
            variant="body2"
            sx={{ mb: 2, lineHeight: 1.7, whiteSpace: "pre-line" }}
          >
            {content}
          </Typography>

          {/* Image */}
          {image && (
            <motion.div whileHover={{ scale: 1.01 }}>
              <Box
                component="img"
                src={image}
                alt="Post"
                sx={{
                  width: "100%",
                  height: 256,
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 2,
                }}
              />
            </motion.div>
          )}

          {/* Stats */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
              pb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  bgcolor: "warning.light",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 10,
                }}
              >
                ❤️
              </Box>
              <Typography variant="caption" color="text.secondary">
                {likeCount.toLocaleString()}
              </Typography>
            </Box>

            <Typography variant="caption" color="text.secondary">
              {comments} comments
            </Typography>
          </Box>

          <Divider sx={{ mb: 1.5 }} />

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                startIcon={
                  liked ? (
                    <Favorite sx={{ color: "warning.main" }} />
                  ) : (
                    <FavoriteBorder />
                  )
                }
                onClick={handleLike}
                sx={{
                  color: liked ? "warning.main" : "text.secondary",
                  bgcolor: liked
                    ? "hsla(350, 30%, 70%, 0.1)"
                    : "transparent",
                  "&:hover": {
                    bgcolor: liked
                      ? "hsla(350, 30%, 70%, 0.15)"
                      : "action.hover",
                  },
                }}
              >
                Like
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                startIcon={<ChatBubbleOutline />}
                sx={{ color: "text.secondary" }}
              >
                Comment
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                startIcon={<Share />}
                sx={{ color: "text.secondary" }}
              >
                Share
              </Button>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <IconButton
                onClick={() => setSaved((prev) => !prev)}
                sx={{
                  color: saved ? "primary.main" : "text.secondary",
                  bgcolor: saved
                    ? "hsla(150, 25%, 45%, 0.1)"
                    : "transparent",
                  "&:hover": {
                    bgcolor: saved
                      ? "hsla(150, 25%, 45%, 0.15)"
                      : "action.hover",
                  },
                }}
              >
                {saved ? <Bookmark /> : <BookmarkBorder />}
              </IconButton>
            </motion.div>
          </Box>
        </CardContent>
      </Card>
    </motion.article>
  );
};
