package com.jobconnect.profile.service;

import java.util.List;

import org.springframework.data.domain.Page;

import com.jobconnect.profile.dto.AvatarDTO;
import com.jobconnect.profile.dto.BioDTO;
import com.jobconnect.profile.dto.EducationAddDTO;
import com.jobconnect.profile.dto.ExperienceAddDTO;
import com.jobconnect.profile.dto.HeadlineDTO;
import com.jobconnect.profile.dto.LocationDTO;
import com.jobconnect.profile.dto.ProfileUpdateDTO;
import com.jobconnect.profile.dto.SkillAddDTO;
import com.jobconnect.profile.entities.Profile;

public interface ProfileService {
	public Profile addProfile(Profile profile);
	
	public Profile getProfile(Long id);
	
	public Profile getProfileByUserId(Long UserId);
	
	public Page<Profile> getAllProfiles(int page, int size);
	
	public Profile updateProfile(Long id, ProfileUpdateDTO dto);

	public Profile updateSkills(Long id, SkillAddDTO dto);

	public Profile updateExperience(Long id, ExperienceAddDTO dto);

	public Profile updateEducation(Long id, EducationAddDTO dto);

	public Profile updateHeadline(Long id, HeadlineDTO dto);

	public Profile updateBio(Long id, BioDTO dto);

	public Profile updateLocation(Long id, LocationDTO dto);

	public Profile updateAvatar(Long id, AvatarDTO dto);

	public void deleteProfile(Long id);

	public List<Profile> searchProfiles(String skills, String location);

	public List<Profile> getByLocation(String location);

	List<Profile> getBySkill(String skill);
}
