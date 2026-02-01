import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import profileInstance from "../../lib/profileInstance.js";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  CircularProgress,
  Avatar,
  Chip,
  Stack,
  IconButton,
  Step,
  Stepper,
  StepLabel,
  LinearProgress,
  Fade,
  Zoom,
  Card,
  InputAdornment,
} from "@mui/material";
import {
  PhotoCamera,
  School,
  Work,
  Code,
  LocationOn,
  Person,
  ArrowBack,
  ArrowForward,
  Check,
} from "@mui/icons-material";
import { useSelector } from "react-redux";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [imagePreview, setImagePreview] = useState("");
  
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  const [form, setForm] = useState({
    userId: user?.id || "",
    headline: "",
    bio: "",
    skills: [],
    experience: [],
    education: [],
    location: "",
    avatarUrl: "",
  });

  // Temporary input states for multi-item fields
  const [skillInput, setSkillInput] = useState("");
  const [expInput, setExpInput] = useState({
    title: "",
    company: "",
    duration: "",
  });
  const [eduInput, setEduInput] = useState({
    degree: "",
    school: "",
    year: "",
  });

  useEffect(() => {
    if (user?.id) {
      setForm((prev) => ({ ...prev, userId: user.id }));
    }
  }, [user]);

  useEffect(() => {
    if (form.avatarUrl) {
      setImagePreview(form.avatarUrl);
    }
  }, [form.avatarUrl]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const addSkill = () => {
    if (skillInput.trim() && !form.skills.includes(skillInput.trim())) {
      setForm({ ...form, skills: [...form.skills, skillInput.trim()] });
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove) => {
    setForm({
      ...form,
      skills: form.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const addExperience = () => {
    if (expInput.title.trim() && expInput.company.trim()) {
      setForm({
        ...form,
        experience: [
          ...form.experience,
          {
            title: expInput.title,
            company: expInput.company,
            duration: expInput.duration,
          },
        ],
      });
      setExpInput({ title: "", company: "", duration: "" });
    }
  };

  const removeExperience = (index) => {
    setForm({
      ...form,
      experience: form.experience.filter((_, i) => i !== index),
    });
  };

  const addEducation = () => {
    if (eduInput.degree.trim() && eduInput.school.trim()) {
      setForm({
        ...form,
        education: [
          ...form.education,
          {
            degree: eduInput.degree,
            school: eduInput.school,
            year: eduInput.year,
          },
        ],
      });
      setEduInput({ degree: "", school: "", year: "" });
    }
  };

  const removeEducation = (index) => {
    setForm({
      ...form,
      education: form.education.filter((_, i) => i !== index),
    });
  };

  const steps = [
    "Basic Info",
    "Professional Details",
    "Skills",
    "Experience",
    "Education",
  ];

  const validateStep = () => {
    switch (activeStep) {
      case 0:
        if (!form.headline.trim()) {
          setError("Please enter your professional headline");
          return false;
        }
        if (!form.bio.trim()) {
          setError("Please write a short bio about yourself");
          return false;
        }
        break;
      case 1:
        if (!form.location.trim()) {
          setError("Please enter your location");
          return false;
        }
        break;
      case 2:
        if (form.skills.length === 0) {
          setError("Please add at least one skill");
          return false;
        }
        break;
      case 3:
        if (form.experience.length === 0) {
          setError("Please add at least one work experience");
          return false;
        }
        break;
      case 4:
        if (form.education.length === 0) {
          setError("Please add at least one education entry");
          return false;
        }
        break;
    }
    setError(null);
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
    setError(null);
  };

  const handleSubmit = async () => {
    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      // Format data to match Spring Boot backend expectations
      const profileData = {
        userId: form.userId,
        headline: form.headline,
        bio: form.bio,
        skills: form.skills.join(", "), // Convert array to comma-separated string
        experience: JSON.stringify(form.experience), // Convert to JSON string
        education: JSON.stringify(form.education), // Convert to JSON string
        location: form.location,
        avatarUrl: form.avatarUrl || "",
      };

      console.log("Sending profile data:", profileData);

      const response = await profileInstance.post("/addprofile", profileData);

      console.log("Profile created:", response.data);
      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.error("Profile creation error:", err);
      setError(
        err.response?.data?.msg ||
          err.response?.data?.message ||
          err.message ||
          "Failed to create profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSkipForNow = () => {
    navigate("/");
  };

  if (!user) {
    return (
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <Fade in timeout={500}>
            <Box>
              <Box sx={{ textAlign: "center", mb: 4 }}>
                <Box sx={{ position: "relative", display: "inline-block" }}>
                  <Avatar
                    src={imagePreview || undefined}
                    sx={{
                      width: 120,
                      height: 120,
                      mx: "auto",
                      mb: 2,
                      border: "4px solid",
                      borderColor: "primary.main",
                      fontSize: "3rem",
                    }}
                  >
                    {user?.name?.charAt(0).toUpperCase()}
                  </Avatar>
                  <IconButton
                    sx={{
                      position: "absolute",
                      bottom: 16,
                      right: -8,
                      bgcolor: "primary.main",
                      color: "white",
                      "&:hover": { bgcolor: "primary.dark" },
                    }}
                    size="small"
                  >
                    <PhotoCamera fontSize="small" />
                  </IconButton>
                </Box>
                <Typography variant="h5" fontWeight={600} sx={{ mb: 1 }}>
                  Welcome, {user?.name}! 👋
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Let's set up your professional profile
                </Typography>
              </Box>

              <TextField
                name="avatarUrl"
                label="Profile Picture URL"
                placeholder="https://example.com/your-photo.jpg"
                fullWidth
                sx={{ mb: 3 }}
                value={form.avatarUrl}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhotoCamera color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                name="headline"
                label="Professional Headline *"
                placeholder="e.g., Full Stack Developer | React Enthusiast"
                fullWidth
                sx={{ mb: 3 }}
                value={form.headline}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                name="bio"
                label="About You *"
                placeholder="Tell us your story, what drives you, and what you're passionate about..."
                multiline
                rows={4}
                fullWidth
                sx={{ mb: 2 }}
                value={form.bio}
                onChange={handleChange}
                required
                helperText={`${form.bio.length}/500 characters`}
                inputProps={{ maxLength: 500 }}
              />
            </Box>
          </Fade>
        );

      case 1:
        return (
          <Fade in timeout={500}>
            <Box>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 3 }}>
                Professional Details
              </Typography>

              <TextField
                name="location"
                label="Location *"
                placeholder="e.g., San Francisco, CA"
                fullWidth
                sx={{ mb: 3 }}
                value={form.location}
                onChange={handleChange}
                required
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LocationOn color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <Box
                sx={{
                  p: 3,
                  bgcolor: "background.default",
                  borderRadius: 2,
                  border: "1px solid",
                  borderColor: "divider",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  💡 <strong>Pro tip:</strong> Adding your location helps
                  connect you with opportunities and professionals in your area.
                </Typography>
              </Box>
            </Box>
          </Fade>
        );

      case 2:
        return (
          <Fade in timeout={500}>
            <Box>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                Your Skills
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Add the skills that showcase your expertise
              </Typography>

              <Box sx={{ display: "flex", gap: 1, mb: 3 }}>
                <TextField
                  label="Add a skill"
                  placeholder="e.g., JavaScript, React, Node.js"
                  fullWidth
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addSkill();
                    }
                  }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Code color="action" />
                      </InputAdornment>
                    ),
                  }}
                />
                <Button
                  variant="contained"
                  onClick={addSkill}
                  sx={{ minWidth: "100px" }}
                >
                  Add
                </Button>
              </Box>

              {form.skills.length > 0 && (
                <Box
                  sx={{
                    p: 3,
                    bgcolor: "background.default",
                    borderRadius: 2,
                    border: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                    {form.skills.map((skill, idx) => (
                      <Zoom in key={idx} style={{ transitionDelay: `${idx * 50}ms` }}>
                        <Chip
                          label={skill}
                          onDelete={() => removeSkill(skill)}
                          color="primary"
                          variant="outlined"
                        />
                      </Zoom>
                    ))}
                  </Stack>
                </Box>
              )}

              {form.skills.length === 0 && (
                <Box
                  sx={{
                    p: 4,
                    textAlign: "center",
                    color: "text.secondary",
                    border: "2px dashed",
                    borderColor: "divider",
                    borderRadius: 2,
                  }}
                >
                  <Code sx={{ fontSize: 40, opacity: 0.3, mb: 1 }} />
                  <Typography variant="body2">
                    No skills added yet. Start adding your expertise!
                  </Typography>
                </Box>
              )}
            </Box>
          </Fade>
        );

      case 3:
        return (
          <Fade in timeout={500}>
            <Box>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                Work Experience
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Share your professional journey
              </Typography>

              <Card variant="outlined" sx={{ p: 3, mb: 3 }}>
                <TextField
                  label="Job Title *"
                  placeholder="e.g., Senior Frontend Developer"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={expInput.title}
                  onChange={(e) =>
                    setExpInput({ ...expInput, title: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Work color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="Company *"
                  placeholder="e.g., Tech Corp Inc."
                  fullWidth
                  sx={{ mb: 2 }}
                  value={expInput.company}
                  onChange={(e) =>
                    setExpInput({ ...expInput, company: e.target.value })
                  }
                />

                <TextField
                  label="Duration"
                  placeholder="e.g., 2020 - Present"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={expInput.duration}
                  onChange={(e) =>
                    setExpInput({ ...expInput, duration: e.target.value })
                  }
                />

                <Button
                  variant="contained"
                  onClick={addExperience}
                  fullWidth
                  disabled={!expInput.title.trim() || !expInput.company.trim()}
                >
                  Add Experience
                </Button>
              </Card>

              {form.experience.length > 0 && (
                <Stack spacing={2}>
                  {form.experience.map((exp, idx) => (
                    <Zoom in key={idx} style={{ transitionDelay: `${idx * 100}ms` }}>
                      <Card variant="outlined" sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {exp.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {exp.company}
                            </Typography>
                            {exp.duration && (
                              <Typography variant="caption" color="text.secondary">
                                {exp.duration}
                              </Typography>
                            )}
                          </Box>
                          <IconButton
                            size="small"
                            onClick={() => removeExperience(idx)}
                            color="error"
                          >
                            ✕
                          </IconButton>
                        </Box>
                      </Card>
                    </Zoom>
                  ))}
                </Stack>
              )}

              {form.experience.length === 0 && (
                <Box
                  sx={{
                    p: 4,
                    textAlign: "center",
                    color: "text.secondary",
                    border: "2px dashed",
                    borderColor: "divider",
                    borderRadius: 2,
                  }}
                >
                  <Work sx={{ fontSize: 40, opacity: 0.3, mb: 1 }} />
                  <Typography variant="body2">
                    No experience added yet. Add your first role!
                  </Typography>
                </Box>
              )}
            </Box>
          </Fade>
        );

      case 4:
        return (
          <Fade in timeout={500}>
            <Box>
              <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                Education
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Tell us about your academic background
              </Typography>

              <Card variant="outlined" sx={{ p: 3, mb: 3 }}>
                <TextField
                  label="Degree *"
                  placeholder="e.g., Bachelor of Science in Computer Science"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={eduInput.degree}
                  onChange={(e) =>
                    setEduInput({ ...eduInput, degree: e.target.value })
                  }
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <School color="action" />
                      </InputAdornment>
                    ),
                  }}
                />

                <TextField
                  label="School/University *"
                  placeholder="e.g., MIT"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={eduInput.school}
                  onChange={(e) =>
                    setEduInput({ ...eduInput, school: e.target.value })
                  }
                />

                <TextField
                  label="Year"
                  placeholder="e.g., 2020"
                  fullWidth
                  sx={{ mb: 2 }}
                  value={eduInput.year}
                  onChange={(e) =>
                    setEduInput({ ...eduInput, year: e.target.value })
                  }
                />

                <Button
                  variant="contained"
                  onClick={addEducation}
                  fullWidth
                  disabled={!eduInput.degree.trim() || !eduInput.school.trim()}
                >
                  Add Education
                </Button>
              </Card>

              {form.education.length > 0 && (
                <Stack spacing={2}>
                  {form.education.map((edu, idx) => (
                    <Zoom in key={idx} style={{ transitionDelay: `${idx * 100}ms` }}>
                      <Card variant="outlined" sx={{ p: 2 }}>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                          <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1" fontWeight={600}>
                              {edu.degree}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {edu.school}
                            </Typography>
                            {edu.year && (
                              <Typography variant="caption" color="text.secondary">
                                Class of {edu.year}
                              </Typography>
                            )}
                          </Box>
                          <IconButton
                            size="small"
                            onClick={() => removeEducation(idx)}
                            color="error"
                          >
                            ✕
                          </IconButton>
                        </Box>
                      </Card>
                    </Zoom>
                  ))}
                </Stack>
              )}

              {form.education.length === 0 && (
                <Box
                  sx={{
                    p: 4,
                    textAlign: "center",
                    color: "text.secondary",
                    border: "2px dashed",
                    borderColor: "divider",
                    borderRadius: 2,
                  }}
                >
                  <School sx={{ fontSize: 40, opacity: 0.3, mb: 1 }} />
                  <Typography variant="body2">
                    No education added yet. Add your academic background!
                  </Typography>
                </Box>
              )}
            </Box>
          </Fade>
        );

      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        py: 4,
        // background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <Paper
        elevation={10}
        sx={{
          p: 4,
          width: 700,
          maxWidth: "95%",
          borderRadius: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Progress bar */}
        <LinearProgress
          variant="determinate"
          value={((activeStep + 1) / steps.length) * 100}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 6,
          }}
        />

        {/* Stepper */}
        <Box sx={{ mt: 2, mb: 4 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel
                  StepIconProps={{
                    sx: {
                      "&.Mui-completed": {
                        color: "success.main",
                      },
                    },
                  }}
                >
                  <Typography variant="caption">{label}</Typography>
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        {/* Success Message */}
        {success && (
          <Alert
            severity="success"
            icon={<Check />}
            sx={{ mb: 3 }}
          >
            Profile created successfully! Redirecting to your dashboard...
          </Alert>
        )}

        {/* Error Message */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Step Content */}
        <Box sx={{ minHeight: "400px", mb: 4 }}>{renderStepContent()}</Box>

        {/* Navigation Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0 || loading}
            startIcon={<ArrowBack />}
          >
            Back
          </Button>

          <Box sx={{ flex: 1 }} />

          <Button
            variant="text"
            onClick={handleSkipForNow}
            disabled={loading || success}
            sx={{ mr: 1 }}
          >
            Skip for now
          </Button>

          {activeStep === steps.length - 1 ? (
            <Button
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || success}
              endIcon={loading ? <CircularProgress size={20} /> : <Check />}
              sx={{ minWidth: "150px" }}
            >
              {loading ? "Creating..." : "Complete Profile"}
            </Button>
          ) : (
            <Button
              variant="contained"
              onClick={handleNext}
              endIcon={<ArrowForward />}
              sx={{ minWidth: "120px" }}
            >
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

export default ProfileSetup;