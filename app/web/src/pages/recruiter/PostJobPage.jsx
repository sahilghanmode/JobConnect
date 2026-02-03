import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
  Paper,
  MenuItem,
  Stack,
  Chip,
  Alert,
  CircularProgress,
  Card,
  CardContent,
  Divider,
  InputAdornment,
} from "@mui/material";
import { Autocomplete } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  WorkOutline,
  AttachMoney,
  Description,
  Code,
  ArrowForward,
  Business,
  LocationOn,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../lib/axios";
import {
  searchCompanies,
  searchLocations,
  searchSkills,
} from "../../lib/externalApis";
import { Navbar } from "../../components/layout/Navbar";

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship", "Freelance"];
const EXPERIENCE_LEVELS = [
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Director",
  "Executive",
];

const PostJobPage = () => {
  const navigate = useNavigate();
  const { user, userProfile } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    jobTitle: "",
    companyName: "",
    location: "",
    employmentType: "Full-time",
    experienceLevel: "Entry Level",
    salaryMin: "",
    salaryMax: "",
    description: "",
    requirements: "",
    responsibilities: "",
    skillsRequired: "",
    expiresAt: null,
  });

  const [titleOptions, setTitleOptions] = useState([]);
  const [companyOptions, setCompanyOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [skillOptions, setSkillOptions] = useState([]);

  // Prefill Company Name from Profile Experience
  useEffect(() => {
    if (userProfile?.experience) {
      try {
        const experience = JSON.parse(userProfile.experience);
        if (Array.isArray(experience) && experience.length > 0) {
          // Access the most recent experience (assuming first item)
          const currentCompany = experience[0].company;
          if (currentCompany) {
            setFormData((prev) => ({ ...prev, companyName: currentCompany }));
          }
        }
      } catch (err) {
        console.error("Failed to parse user experience for company prefill:", err);
      }
    }
  }, [userProfile]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSearch = async (query, fn, setter) => {
    if (!query) return;
    const res = await fn(query);
    setter(res);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await axiosInstance.post(
        "/jobs",
        {
          ...formData,
          salaryMin: Number(formData.salaryMin) || 0,
          salaryMax: Number(formData.salaryMax) || 0,
          expiresAt: formData.expiresAt
            ? formData.expiresAt.toISOString()
            : null,
        },
        { headers: { "X-User-Id": user?.id } }
      );

      navigate("/recruiter/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to post job");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "grey.50", // Light background for contrast
          py: 6,
          pt: 12, // Added padding for fixed navbar
        }}
      >
        <Navbar />
        <Container maxWidth="md">
          {/* Header */}
          <Box sx={{ textAlign: "center", mb: 5 }}>
            <Typography
              variant="h3"
              component="h1"
              fontWeight={800}
              sx={{
                mb: 1,
                background: "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Post a New Job
            </Typography>
            <Typography variant="h6" color="text.secondary" fontWeight={400}>
              Reach the best talent for your team
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 4,
                border: "1px solid",
                borderColor: "divider",
                overflow: "visible", // For autocomplete dropdowns if needed
              }}
            >
              <CardContent sx={{ p: { xs: 3, md: 5 } }}>
                <Grid container spacing={4}>
                  {/* Basic Info Section */}
                  <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <WorkOutline color="primary" /> Basic Information
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Autocomplete
                          freeSolo
                          options={titleOptions}
                          onInputChange={(_, v) =>
                            handleSearch(v, searchJobTitles, setTitleOptions)
                          }
                          onChange={(_, v) =>
                            setFormData({ ...formData, jobTitle: v || "" })
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Job Title"
                              required
                              placeholder="e.g. Senior Software Engineer"
                              variant="outlined"
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Autocomplete
                          freeSolo
                          options={companyOptions}
                          value={formData.companyName}
                          getOptionLabel={(o) =>
                            typeof o === "string" ? o : o.name
                          }
                          onInputChange={(_, v) => {
                            // Allow manual override
                            handleSearch(v, searchCompanies, setCompanyOptions);
                            setFormData(prev => ({ ...prev, companyName: v }));
                          }}
                          onChange={(_, v) =>
                            setFormData({
                              ...formData,
                              companyName:
                                typeof v === "string" ? v : v?.name || "",
                            })
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Company"
                              required
                              InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                  <>
                                    <InputAdornment position="start">
                                      <Business color="action" fontSize="small" />
                                    </InputAdornment>
                                    {params.InputProps.startAdornment}
                                  </>
                                )
                              }}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Autocomplete
                          freeSolo
                          options={locationOptions}
                          onInputChange={(_, v) =>
                            handleSearch(v, searchLocations, setLocationOptions)
                          }
                          onChange={(_, v) =>
                            setFormData({ ...formData, location: v || "" })
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Location"
                              placeholder="e.g. Remote, New York, NY"
                              InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                  <>
                                    <InputAdornment position="start">
                                      <LocationOn color="action" fontSize="small" />
                                    </InputAdornment>
                                    {params.InputProps.startAdornment}
                                  </>
                                )
                              }}
                            />
                          )}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  {/* Compensation Section */}
                  <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <AttachMoney color="primary" /> Compensation & Details
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          select
                          label="Employment Type"
                          name="employmentType"
                          fullWidth
                          value={formData.employmentType}
                          onChange={handleChange}
                        >
                          {JOB_TYPES.map((t) => (
                            <MenuItem key={t} value={t}>
                              {t}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          select
                          label="Experience Level"
                          name="experienceLevel"
                          fullWidth
                          value={formData.experienceLevel}
                          onChange={handleChange}
                        >
                          {EXPERIENCE_LEVELS.map((l) => (
                            <MenuItem key={l} value={l}>
                              {l}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Min Annual Salary"
                          name="salaryMin"
                          type="number"
                          fullWidth
                          placeholder="e.g. 80000"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          onChange={handleChange}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          label="Max Annual Salary"
                          name="salaryMax"
                          type="number"
                          fullWidth
                          placeholder="e.g. 120000"
                          InputProps={{
                            startAdornment: <InputAdornment position="start">$</InputAdornment>,
                          }}
                          onChange={handleChange}
                        />
                      </Grid>
                    </Grid>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  {/* Description Section */}
                  <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Description color="primary" /> Job Description
                    </Typography>
                    <Stack spacing={3}>
                      <TextField
                        label="About the Role"
                        name="description"
                        multiline
                        rows={4}
                        required
                        placeholder="Describe the main purpose of this job..."
                        variant="outlined"
                        onChange={handleChange}
                      />
                      <TextField
                        label="Key Requirements"
                        name="requirements"
                        multiline
                        rows={4}
                        placeholder="List the must-have qualifications..."
                        variant="outlined"
                        onChange={handleChange}
                      />
                      <TextField
                        label="Responsibilities"
                        name="responsibilities"
                        multiline
                        rows={4}
                        placeholder="What will the daily duties involve?"
                        variant="outlined"
                        onChange={handleChange}
                      />
                    </Stack>
                  </Grid>

                  <Grid item xs={12}>
                    <Divider />
                  </Grid>

                  {/* Skills Section */}
                  <Grid item xs={12}>
                    <Typography variant="h6" fontWeight={700} sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Code color="primary" /> Skills & Timeline
                    </Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12}>
                        <Autocomplete
                          multiple
                          freeSolo
                          options={skillOptions}
                          onInputChange={(_, v) =>
                            handleSearch(v, searchSkills, setSkillOptions)
                          }
                          onChange={(_, v) =>
                            setFormData({
                              ...formData,
                              skillsRequired: v.join(", "),
                            })
                          }
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                label={option}
                                {...getTagProps({ index })}
                                color="primary"
                                variant="outlined"
                                sx={{ borderRadius: '8px' }}
                              />
                            ))
                          }
                          renderInput={(params) => (
                            <TextField {...params} label="Required Skills (Press Enter to add)" placeholder="React, Node.js, etc." />
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <DatePicker
                          label="Application Deadline"
                          value={formData.expiresAt}
                          onChange={(v) =>
                            setFormData({ ...formData, expiresAt: v })
                          }
                          slotProps={{ textField: { fullWidth: true } }}
                        />
                      </Grid>
                    </Grid>
                  </Grid>


                  {/* Submit Action */}
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                      <Button variant="text" size="large" onClick={() => navigate(-1)} sx={{ color: 'text.secondary' }}>
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        endIcon={!loading && <ArrowForward />}
                        sx={{
                          px: 4,
                          py: 1.5,
                          borderRadius: '12px',
                          fontWeight: 600,
                          textTransform: 'none',
                          fontSize: '1rem',
                          boxShadow: '0 4px 14px 0 rgba(0,0,0,0.1)',
                        }}
                      >
                        {loading ? (
                          <CircularProgress size={24} color="inherit" />
                        ) : (
                          "Post Job Opening"
                        )}
                      </Button>
                    </Box>
                  </Grid>

                </Grid>
              </CardContent>
            </Card>
          </form>
        </Container>
      </Box>
    </LocalizationProvider>
  );
};

export default PostJobPage;
