package com.jobconnect.profile.service;

import com.jobconnect.profile.dto.BioDTO;
import com.jobconnect.profile.dto.EducationAddDTO;
import com.jobconnect.profile.dto.ExperienceAddDTO;
import com.jobconnect.profile.dto.HeadlineDTO;
import com.jobconnect.profile.dto.SkillAddDTO;
import com.jobconnect.profile.entities.Profile;

public interface ProfileService {
	public Profile addProfile(Profile profile);

	public Profile updateSkills(Long id, SkillAddDTO dto);

	public Profile updateExperience(Long id, ExperienceAddDTO dto);

	public Profile updateEducation(Long id, EducationAddDTO dto);

	public Profile getProfile(Long id);

	public Profile updateHeadline(Long id, HeadlineDTO dto);

	public Profile updateBio(Long id, BioDTO dto);
}
