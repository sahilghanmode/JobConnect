import React, { useEffect, useState } from 'react';
import {
    Box,
    Typography,
    Container,
    Button,
    Card,
    CardContent,
    Grid,
    Chip,
    CircularProgress
} from '@mui/material';
import { Add, WorkOutline, PeopleOutline } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axiosInstance from '../../lib/axios';
import { Navbar } from '../../components/layout/Navbar';

const RecruiterDashboard = () => {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchJobs = async () => {
            if (!user?.id) return;
            try {
                const response = await axiosInstance.get(`/jobs/recruiter/${user.id}`);
                setJobs(response.data);
            } catch (error) {
                console.error("Failed to fetch jobs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchJobs();
    }, [user]);

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'grey.50' }}>
            <Navbar />
            <Container maxWidth="lg" sx={{ py: 4, pt: 12 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                    <Box>
                        <Typography variant="h4" fontWeight="bold">Recruiter Dashboard</Typography>
                        <Typography variant="body1" color="text.secondary">Manage your job postings and applications</Typography>
                    </Box>
                    <Button
                        variant="contained"
                        startIcon={<Add />}
                        onClick={() => navigate('/recruiter/post-job')}
                    >
                        Post New Job
                    </Button>
                </Box>

                {loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 5 }}>
                        <CircularProgress />
                    </Box>
                ) : jobs.length === 0 ? (
                    <Card sx={{ textAlign: 'center', py: 8 }}>
                        <WorkOutline sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">No jobs posted yet</Typography>
                        <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate('/recruiter/post-job')}>
                            Post your first job
                        </Button>
                    </Card>
                ) : (
                    <Grid container spacing={3}>
                        {jobs.map((job) => (
                            <Grid item xs={12} md={6} key={job.jobId}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                                            <Typography variant="h6" fontWeight="bold">
                                                {job.jobTitle}
                                            </Typography>
                                            <Chip
                                                label={job.status}
                                                color={job.status === 'ACTIVE' ? 'success' : 'default'}
                                                size="small"
                                            />
                                        </Box>
                                        <Typography variant="body2" color="text.secondary" gutterBottom>
                                            {job.companyName} • {job.location}
                                        </Typography>
                                        <Typography variant="body2" sx={{ mt: 2 }}>
                                            Posted: {new Date(job.createdAt).toLocaleDateString()}
                                        </Typography>
                                        <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                startIcon={<PeopleOutline />}
                                                onClick={() => navigate(`/recruiter/job/${job.jobId}/applications`)}
                                            >
                                                View Applications
                                            </Button>
                                            <Button size="small" color="inherit">
                                                Edit
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                )}
            </Container>
        </Box>
    );
};

export default RecruiterDashboard;
