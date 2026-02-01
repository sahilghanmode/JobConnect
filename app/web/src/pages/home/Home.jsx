import { Box, Button } from '@mui/material'
import { Navbar } from '../../components/layout/Navbar';
import { ProfileSidebar } from '../../components/layout/ProfileSidebar';
import { AnimatedBackground } from '../../components/background/AnimatedBackground';
import { CreatePost } from '../../components/feed/CreatePost';
import { PostCard } from '../../components/feed/PostCard';
import { motion } from "framer-motion";

const posts = [
    {
        author: {
            name: "Alex Rivera",
            title: "Tech Lead at Spotify • Building the future",
            avatar: "AR",
        },
        content:
            "Just shipped a major update to our recommendation engine using the latest transformer models. The results are incredible - 40% improvement in user engagement! 🚀\n\nKey learnings:\n• Start with user behavior data\n• Iterate fast with A/B testing\n• Don't over-engineer early",
        likes: 1247,
        comments: 89,
        time: "2h ago",
    },
    {
        author: {
            name: "Lisa Wang",
            title: "Founder & CEO at TechStart",
            avatar: "LW",
        },
        content:
            "Excited to announce that we've raised our Series B! 🎉\n\nThis wouldn't have been possible without our amazing team. We're hiring across all departments - check out our open positions!\n\n#startup #funding #hiring",
        image: "https://images.unsplash.com/photo-1553484771-371a605b060b?w=800&auto=format&fit=crop",
        likes: 3892,
        comments: 245,
        time: "4h ago",
    },
    {
        author: {
            name: "Marcus Thompson",
            title: "Senior Engineer at Netflix • Open Source Enthusiast",
            avatar: "MT",
        },
        content:
            "Hot take: The best code is no code at all. Before writing that new feature, ask yourself:\n\n1. Does this really solve a user problem?\n2. Can we achieve this with existing tools?\n3. What's the maintenance cost?\n\nSimplicity wins every time. 💡",
        likes: 892,
        comments: 156,
        time: "6h ago",
    },
    {
        author: {
            name: "Priya Patel",
            title: "VP of Product at Airbnb",
            avatar: "PP",
        },
        content:
            "The future of work is hybrid - but are we doing it right?\n\nAfter 3 years of experimenting, here's what actually works:\n\n✅ Async-first communication\n✅ Clear documentation culture\n✅ Intentional in-person gatherings\n✅ Trust your people\n\nWhat's working for your team?",
        likes: 2156,
        comments: 312,
        time: "8h ago",
    },
];

const Home = () => {
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            <AnimatedBackground />
            <Navbar />

            <Box component="main" sx={{ pt: 6, pb: 6, px: 2 }}>
                <Box sx={{ maxWidth: 1400, mx: "auto" }}>
                    <Box sx={{
                        display: "flex",
                        gap: 3,
                        justifyContent: "center",
                    }}>
                        <Box sx={{ display: { xs: "none", xl: "block" },position:"sticky", top: 80, alignSelf: "flex-start" }}>
                            <ProfileSidebar />
                        </Box>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ flex: 1, minWidth: 0 }}
                        >
                            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, maxWidth: 800, mx: "auto", width: "100%" }}>
                                <CreatePost/>

                                {posts.map((post, index) => (
                                    <PostCard key={index} {...post} index={index} />
                                ))}

                                {/* Load More */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                >
                                    <Box sx={{ textAlign: "center", py: 4 }}>
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <Button
                                                variant="contained"
                                                sx={{
                                                    px: 4,
                                                    py: 1.5,
                                                    borderRadius: 3,
                                                }}
                                            >
                                                Load More Posts
                                            </Button>
                                        </motion.div>
                                    </Box>
                                </motion.div>
                            </Box>
                        </motion.div>

                        {/* <Box sx={{ display: { xs: "none", lg: "block" } }}>
                            <ConnectionsSidebar />
                        </Box> */}

                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

export default Home
