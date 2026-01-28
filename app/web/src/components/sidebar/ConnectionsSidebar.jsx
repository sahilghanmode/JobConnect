import { motion } from "framer-motion";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  Add,
  TrendingUp,
  Work,
  ChevronRight,
} from "@mui/icons-material";

const suggestions = [
  { name: "Sarah Chen", title: "Product Manager at Google", mutual: 12, initials: "SC" },
  { name: "Mike Johnson", title: "Senior Developer at Meta", mutual: 8, initials: "MJ" },
  { name: "Emily Davis", title: "UX Designer at Apple", mutual: 15, initials: "ED" },
];

const trendingTopics = [
  { tag: "#AIRevolution", posts: "12.4K" },
  { tag: "#RemoteWork", posts: "8.2K" },
  { tag: "#TechLayoffs", posts: "5.7K" },
  { tag: "#Startup2024", posts: "4.1K" },
];

const featuredJobs = [
  { title: "Senior React Developer", company: "Stripe", location: "Remote", salary: "$180-220K" },
  { title: "Product Designer", company: "Figma", location: "San Francisco", salary: "$150-190K" },
];

export const ConnectionsSidebar = () => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      style={{ width: 320 }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {/* Suggestions */}
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                mb: 2,
              }}
            >
              <Typography
                variant="subtitle2"
                sx={{ fontFamily: "'Playfair Display', serif" }}
              >
                People you may know
              </Typography>
              <ChevronRight sx={{ fontSize: 18, color: "text.secondary" }} />
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {suggestions.map((person, index) => (
                <motion.div
                  key={person.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1.5,
                      p: 1,
                      borderRadius: 2,
                      cursor: "pointer",
                      "&:hover": { bgcolor: "action.hover" },
                      transition: "all 0.2s",
                    }}
                  >
                    <motion.div whileHover={{ scale: 1.05 }}>
                      <Avatar sx={{ width: 40, height: 40, fontSize: 12 }}>
                        {person.initials}
                      </Avatar>
                    </motion.div>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        noWrap
                        sx={{
                          "&:hover": { color: "primary.main" },
                          transition: "color 0.2s",
                        }}
                      >
                        {person.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" noWrap display="block">
                        {person.title}
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        {person.mutual} mutual
                      </Typography>
                    </Box>

                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <IconButton
                        size="small"
                        sx={{
                          border: 1,
                          borderColor: "primary.light",
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "primary.contrastText",
                            borderColor: "primary.main",
                          },
                        }}
                      >
                        <Add sx={{ fontSize: 16 }} />
                      </IconButton>
                    </motion.div>
                  </Box>
                </motion.div>
              ))}
            </Box>

            <Button
              fullWidth
              sx={{
                mt: 1.5,
                color: "primary.main",
                "&:hover": { bgcolor: "hsla(150, 25%, 45%, 0.05)" },
              }}
            >
              Show more
            </Button>
          </CardContent>
        </Card>

        {/* Trending */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <TrendingUp sx={{ fontSize: 18, color: "primary.main" }} />
                <Typography
                  variant="subtitle2"
                  sx={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Trending Today
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={topic.tag}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.05 }}
                    whileHover={{ x: 4 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        p: 1.5,
                        borderRadius: 2,
                        cursor: "pointer",
                        "&:hover": { bgcolor: "action.hover" },
                      }}
                    >
                      <Typography variant="body2" fontWeight={500} color="primary.main">
                        {topic.tag}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {topic.posts} posts
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        {/* Featured Jobs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <Card>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                <Work sx={{ fontSize: 18, color: "warning.main" }} />
                <Typography
                  variant="subtitle2"
                  sx={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Featured Jobs
                </Typography>
              </Box>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {featuredJobs.map((job, index) => (
                  <motion.div
                    key={job.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    whileHover={{ y: -2 }}
                  >
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        bgcolor: "action.hover",
                        cursor: "pointer",
                        border: "1px solid transparent",
                        "&:hover": {
                          bgcolor: "action.selected",
                          borderColor: "primary.light",
                        },
                        transition: "all 0.2s",
                      }}
                    >
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{
                          "&:hover": { color: "primary.main" },
                          transition: "color 0.2s",
                        }}
                      >
                        {job.title}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
                        {job.company}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: 1,
                        }}
                      >
                        <Typography variant="caption" color="text.disabled">
                          {job.location}
                        </Typography>
                        <Typography variant="caption" fontWeight={500} color="primary.main">
                          {job.salary}
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                ))}
              </Box>

              <Button
                fullWidth
                sx={{
                  mt: 1.5,
                  color: "primary.main",
                  "&:hover": { bgcolor: "hsla(150, 25%, 45%, 0.05)" },
                }}
              >
                View all jobs
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Box sx={{ textAlign: "center", py: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 1,
                mb: 1,
              }}
            >
              {["About", "Help", "Privacy", "Terms"].map((link, i) => (
                <Box key={link} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{
                      cursor: "pointer",
                      "&:hover": { color: "primary.main" },
                      transition: "color 0.2s",
                    }}
                  >
                    {link}
                  </Typography>
                  {i < 3 && (
                    <Typography variant="caption" color="text.disabled">
                      •
                    </Typography>
                  )}
                </Box>
              ))}
            </Box>
            <Typography
              variant="caption"
              sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
            >
              Nexus © 2024
            </Typography>
          </Box>
        </motion.div>
      </Box>
    </motion.aside>
  );
};
