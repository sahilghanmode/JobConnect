import { useState } from "react";
import { motion } from "framer-motion";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
  IconButton,
  Chip,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from "@mui/material";
import {
  Edit,
  Add,
  CameraAlt,
  LocationOn,
  Business,
  Link as LinkIcon,
  Email,
  Phone,
  CalendarMonth,
  Delete,
  School,
  Work,
  OpenInNew,
} from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  
    const navigate=useNavigate();
    const { user, userProfile } = useSelector((state) => state.auth);
    console.log(user,userProfile)
if (!user || !userProfile) navigate("/auth") ;
  const [profile, setProfile] = useState({
    name: "John Doe",
    headline: "Senior Software Engineer | Building the future of web",
    location: "San Francisco, CA",
    company: "TechCorp",
    website: "johndoe.dev",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    about: "Passionate software engineer with 8+ years of experience building scalable web applications. I love working with React, TypeScript, and Node.js. Currently focused on building developer tools that make engineers more productive.\n\nAlways open to interesting conversations about technology, startups, and the future of work.",
  });

  const [experiences, setExperiences] = useState([
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "TechCorp",
      location: "San Francisco, CA",
      startDate: "2021",
      endDate: "Present",
      description: "Leading the frontend architecture team, building scalable React applications serving millions of users.",
    },
    {
      id: "2",
      title: "Software Engineer",
      company: "StartupXYZ",
      location: "New York, NY",
      startDate: "2018",
      endDate: "2021",
      description: "Full-stack development using React, Node.js, and PostgreSQL. Shipped 10+ major features.",
    },
  ]);

  const [education, setEducation] = useState([
    {
      id: "1",
      school: "Stanford University",
      degree: "Master of Science",
      field: "Computer Science",
      startDate: "2016",
      endDate: "2018",
    },
    {
      id: "2",
      school: "UC Berkeley",
      degree: "Bachelor of Science",
      field: "Computer Science",
      startDate: "2012",
      endDate: "2016",
    },
  ]);

  const [skills, setSkills] = useState([
    "React", "TypeScript", "Node.js", "Python", "AWS", "GraphQL", "PostgreSQL", "Docker", "Kubernetes", "Go"
  ]);

  // Dialog states
  const [editProfileOpen, setEditProfileOpen] = useState(false);
  const [editAboutOpen, setEditAboutOpen] = useState(false);
  const [addExperienceOpen, setAddExperienceOpen] = useState(false);
  const [addEducationOpen, setAddEducationOpen] = useState(false);
  const [addSkillOpen, setAddSkillOpen] = useState(false);

  // Form states
  const [editedProfile, setEditedProfile] = useState(profile);
  const [editedAbout, setEditedAbout] = useState(profile.about);
  const [newExperience, setNewExperience] = useState({
    title: "", company: "", location: "", startDate: "", endDate: "", description: ""
  });
  const [newEducation, setNewEducation] = useState({
    school: "", degree: "", field: "", startDate: "", endDate: ""
  });
  const [newSkill, setNewSkill] = useState("");

  const handleSaveProfile = () => {
    setProfile(editedProfile);
    setEditProfileOpen(false);
  };

  const handleSaveAbout = () => {
    setProfile({ ...profile, about: editedAbout });
    setEditAboutOpen(false);
  };

  const handleAddExperience = () => {
    setExperiences([{ ...newExperience, id: Date.now().toString() }, ...experiences]);
    setNewExperience({ title: "", company: "", location: "", startDate: "", endDate: "", description: "" });
    setAddExperienceOpen(false);
  };

  const handleDeleteExperience = (id) => {
    setExperiences(experiences.filter(exp => exp.id !== id));
  };

  const handleAddEducation = () => {
    setEducation([{ ...newEducation, id: Date.now().toString() }, ...education]);
    setNewEducation({ school: "", degree: "", field: "", startDate: "", endDate: "" });
    setAddEducationOpen(false);
  };

  const handleDeleteEducation = (id) => {
    setEducation(education.filter(edu => edu.id !== id));
  };

  const handleAddSkill = () => {
    if (newSkill && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
    }
    setNewSkill("");
    setAddSkillOpen(false);
  };

  const handleDeleteSkill = (skill) => {
    setSkills(skills.filter(s => s !== skill));
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f5f5", py: 4 }}>
      <Box component="main" sx={{ px: 2 }}>
        <Box sx={{ maxWidth: 900, mx: "auto" }}>
          {/* Profile Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card sx={{ mb: 2, overflow: "visible" }}>
              {/* Banner */}
              <Box
                sx={{
                  height: 200,
                  background: "linear-gradient(135deg, hsla(150, 25%, 45%, 0.3), hsla(350, 30%, 85%, 0.4), hsla(25, 30%, 75%, 0.4))",
                  position: "relative",
                  borderRadius: "16px 16px 0 0",
                }}
              >
                <IconButton
                  sx={{
                    position: "absolute",
                    right: 16,
                    top: 16,
                    bgcolor: "background.paper",
                    "&:hover": { bgcolor: "background.paper" },
                  }}
                >
                  <CameraAlt fontSize="small" />
                </IconButton>
              </Box>

              {/* Avatar */}
              <Box sx={{ px: 3, mt: -8, position: "relative", zIndex: 1 }}>
                <motion.div whileHover={{ scale: 1.02 }}>
                  <Box sx={{ position: "relative", display: "inline-block" }}>
                    <Avatar
                      sx={{
                        width: 150,
                        height: 150,
                        border: "4px solid",
                        borderColor: "background.paper",
                        fontSize: "3rem",
                        fontFamily: "'Playfair Display', serif",
                        fontWeight: 700,
                        boxShadow: 3,
                      }}
                    >
                      {profile.name.split(" ").map(n => n[0]).join("")}
                    </Avatar>
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        bgcolor: "background.paper",
                        boxShadow: 2,
                        "&:hover": { bgcolor: "background.paper" },
                      }}
                    >
                      <CameraAlt fontSize="small" />
                    </IconButton>
                  </Box>
                </motion.div>
              </Box>

              <CardContent sx={{ pt: 2 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box>
                    <Typography
                      variant="h4"
                      sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 700 }}
                    >
                      {profile.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5, maxWidth: 500 }}>
                      {profile.headline}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 3, mt: 2, flexWrap: "wrap" }}>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <LocationOn sx={{ fontSize: 18, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {profile.location}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Business sx={{ fontSize: 18, color: "text.secondary" }} />
                        <Typography variant="body2" color="text.secondary">
                          {profile.company}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <LinkIcon sx={{ fontSize: 18, color: "primary.main" }} />
                        <Typography variant="body2" color="primary.main" sx={{ cursor: "pointer" }}>
                          {profile.website}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography variant="body2" color="primary.main" fontWeight={600} sx={{ mt: 2 }}>
                      500+ connections
                    </Typography>
                  </Box>

                  <Button
                    variant="outlined"
                    startIcon={<Edit />}
                    onClick={() => {
                      setEditedProfile(profile);
                      setEditProfileOpen(true);
                    }}
                    sx={{ borderRadius: 3 }}
                  >
                    Edit Profile
                  </Button>
                </Box>

                <Box sx={{ display: "flex", gap: 1.5, mt: 3 }}>
                  <Button variant="contained" sx={{ borderRadius: 3, px: 3 }}>
                    Open to
                  </Button>
                  <Button variant="outlined" sx={{ borderRadius: 3, px: 3 }}>
                    Add section
                  </Button>
                  <Button variant="outlined" startIcon={<OpenInNew />} sx={{ borderRadius: 3 }}>
                    More
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
                  >
                    About
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => {
                      setEditedAbout(profile.about);
                      setEditAboutOpen(true);
                    }}
                  >
                    <Edit fontSize="small" />
                  </IconButton>
                </Box>
                <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: "pre-line" }}>
                  {profile.about}
                </Typography>
              </CardContent>
            </Card>
          </motion.div>

          {/* Experience Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
                  >
                    Experience
                  </Typography>
                  <IconButton size="small" onClick={() => setAddExperienceOpen(true)}>
                    <Add fontSize="small" />
                  </IconButton>
                </Box>

                <List disablePadding>
                  {experiences.map((exp, index) => (
                    <Box key={exp.id}>
                      <ListItem sx={{ px: 0, alignItems: "flex-start" }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: "action.hover",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mr: 2,
                            flexShrink: 0,
                          }}
                        >
                          <Work sx={{ color: "text.secondary" }} />
                        </Box>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight={600}>
                              {exp.title}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2">{exp.company}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {exp.startDate} - {exp.endDate} · {exp.location}
                              </Typography>
                              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                                {exp.description}
                              </Typography>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton size="small" onClick={() => handleDeleteExperience(exp.id)}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < experiences.length - 1 && <Divider sx={{ my: 2 }} />}
                    </Box>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>

          {/* Education Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
                  >
                    Education
                  </Typography>
                  <IconButton size="small" onClick={() => setAddEducationOpen(true)}>
                    <Add fontSize="small" />
                  </IconButton>
                </Box>

                <List disablePadding>
                  {education.map((edu, index) => (
                    <Box key={edu.id}>
                      <ListItem sx={{ px: 0, alignItems: "flex-start" }}>
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: 2,
                            bgcolor: "action.hover",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            mr: 2,
                            flexShrink: 0,
                          }}
                        >
                          <School sx={{ color: "text.secondary" }} />
                        </Box>
                        <ListItemText
                          primary={
                            <Typography variant="subtitle1" fontWeight={600}>
                              {edu.school}
                            </Typography>
                          }
                          secondary={
                            <Box>
                              <Typography variant="body2">
                                {edu.degree}, {edu.field}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                {edu.startDate} - {edu.endDate}
                              </Typography>
                            </Box>
                          }
                        />
                        <ListItemSecondaryAction>
                          <IconButton size="small" onClick={() => handleDeleteEducation(edu.id)}>
                            <Delete fontSize="small" />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                      {index < education.length - 1 && <Divider sx={{ my: 2 }} />}
                    </Box>
                  ))}
                </List>
              </CardContent>
            </Card>
          </motion.div>

          {/* Skills Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <Typography
                    variant="h6"
                    sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600 }}
                  >
                    Skills
                  </Typography>
                  <IconButton size="small" onClick={() => setAddSkillOpen(true)}>
                    <Add fontSize="small" />
                  </IconButton>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {skills.map((skill) => (
                    <motion.div
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                    >
                      <Chip
                        label={skill}
                        onDelete={() => handleDeleteSkill(skill)}
                        sx={{
                          cursor: "pointer",
                          "&:hover": {
                            bgcolor: "primary.main",
                            color: "primary.contrastText",
                            "& .MuiChip-deleteIcon": {
                              color: "primary.contrastText",
                            },
                          },
                        }}
                      />
                    </motion.div>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Info Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Card>
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ fontFamily: "'Playfair Display', serif", fontWeight: 600, mb: 2 }}
                >
                  Contact Info
                </Typography>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Email sx={{ color: "text.secondary" }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Email</Typography>
                      <Typography variant="body1">{profile.email}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Phone sx={{ color: "text.secondary" }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Phone</Typography>
                      <Typography variant="body1">{profile.phone}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <LinkIcon sx={{ color: "text.secondary" }} />
                    <Box>
                      <Typography variant="body2" color="text.secondary">Website</Typography>
                      <Typography variant="body1" color="primary.main">{profile.website}</Typography>
                    </Box>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Box>
      </Box>

      {/* Edit Profile Dialog */}
      <Dialog open={editProfileOpen} onClose={() => setEditProfileOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontFamily: "'Playfair Display', serif" }}>Edit Profile</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Name"
              fullWidth
              value={editedProfile.name}
              onChange={(e) => setEditedProfile({ ...editedProfile, name: e.target.value })}
            />
            <TextField
              label="Headline"
              fullWidth
              multiline
              rows={2}
              value={editedProfile.headline}
              onChange={(e) => setEditedProfile({ ...editedProfile, headline: e.target.value })}
            />
            <TextField
              label="Location"
              fullWidth
              value={editedProfile.location}
              onChange={(e) => setEditedProfile({ ...editedProfile, location: e.target.value })}
            />
            <TextField
              label="Company"
              fullWidth
              value={editedProfile.company}
              onChange={(e) => setEditedProfile({ ...editedProfile, company: e.target.value })}
            />
            <TextField
              label="Website"
              fullWidth
              value={editedProfile.website}
              onChange={(e) => setEditedProfile({ ...editedProfile, website: e.target.value })}
            />
            <TextField
              label="Email"
              fullWidth
              value={editedProfile.email}
              onChange={(e) => setEditedProfile({ ...editedProfile, email: e.target.value })}
            />
            <TextField
              label="Phone"
              fullWidth
              value={editedProfile.phone}
              onChange={(e) => setEditedProfile({ ...editedProfile, phone: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditProfileOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveProfile}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Edit About Dialog */}
      <Dialog open={editAboutOpen} onClose={() => setEditAboutOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontFamily: "'Playfair Display', serif" }}>Edit About</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            multiline
            rows={6}
            value={editedAbout}
            onChange={(e) => setEditedAbout(e.target.value)}
            sx={{ mt: 1 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditAboutOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveAbout}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* Add Experience Dialog */}
      <Dialog open={addExperienceOpen} onClose={() => setAddExperienceOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontFamily: "'Playfair Display', serif" }}>Add Experience</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="Title"
              fullWidth
              value={newExperience.title}
              onChange={(e) => setNewExperience({ ...newExperience, title: e.target.value })}
            />
            <TextField
              label="Company"
              fullWidth
              value={newExperience.company}
              onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
            />
            <TextField
              label="Location"
              fullWidth
              value={newExperience.location}
              onChange={(e) => setNewExperience({ ...newExperience, location: e.target.value })}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Start Date"
                fullWidth
                value={newExperience.startDate}
                onChange={(e) => setNewExperience({ ...newExperience, startDate: e.target.value })}
              />
              <TextField
                label="End Date"
                fullWidth
                value={newExperience.endDate}
                onChange={(e) => setNewExperience({ ...newExperience, endDate: e.target.value })}
              />
            </Box>
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={newExperience.description}
              onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddExperienceOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddExperience}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Add Education Dialog */}
      <Dialog open={addEducationOpen} onClose={() => setAddEducationOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontFamily: "'Playfair Display', serif" }}>Add Education</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
            <TextField
              label="School"
              fullWidth
              value={newEducation.school}
              onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
            />
            <TextField
              label="Degree"
              fullWidth
              value={newEducation.degree}
              onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
            />
            <TextField
              label="Field of Study"
              fullWidth
              value={newEducation.field}
              onChange={(e) => setNewEducation({ ...newEducation, field: e.target.value })}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="Start Date"
                fullWidth
                value={newEducation.startDate}
                onChange={(e) => setNewEducation({ ...newEducation, startDate: e.target.value })}
              />
              <TextField
                label="End Date"
                fullWidth
                value={newEducation.endDate}
                onChange={(e) => setNewEducation({ ...newEducation, endDate: e.target.value })}
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddEducationOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddEducation}>Add</Button>
        </DialogActions>
      </Dialog>

      {/* Add Skill Dialog */}
      <Dialog open={addSkillOpen} onClose={() => setAddSkillOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontFamily: "'Playfair Display', serif" }}>Add Skill</DialogTitle>
        <DialogContent>
          <TextField
            label="Skill"
            fullWidth
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            sx={{ mt: 1 }}
            onKeyDown={(e) => e.key === "Enter" && handleAddSkill()}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddSkillOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddSkill}>Add</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile;