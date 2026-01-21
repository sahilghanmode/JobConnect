package com.jobconnect.profile.service;

import org.springframework.stereotype.Service;

import com.jobconnect.profile.dto.BioDTO;
import com.jobconnect.profile.dto.EducationAddDTO;
import com.jobconnect.profile.dto.ExperienceAddDTO;
import com.jobconnect.profile.dto.HeadlineDTO;
import com.jobconnect.profile.dto.SkillAddDTO;
import com.jobconnect.profile.entities.Profile;
import com.jobconnect.profile.repository.ProfileRespository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

	private final ProfileRespository profilerepo;
	
	@Override
	public Profile addProfile(Profile profile) {
		
		return profilerepo.save(profile);
	}



	@Override
	public Profile updateSkills(Long id, SkillAddDTO dto) {
		 Profile existing = profilerepo.findById(id)
		            .orElseThrow(() -> new RuntimeException("Profile not found with id: " + id));
		
		existing.setSkills(dto.getSkills());
	    return profilerepo.save(existing);
	}

	@Override
	public Profile updateExperience(Long id, ExperienceAddDTO dto) {
		Profile existing = profilerepo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Profile not found with id: " + id));
	 
				existing.setExperience(dto.getExperience());
				return profilerepo.save(existing);
	}

	@Override
	public Profile updateEducation(Long id, EducationAddDTO dto) {
		Profile existing = profilerepo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Profile not found with id: " + id));
	 
				existing.setEducation(dto.getEducation());
				return profilerepo.save(existing);
	}

	@Override
	public Profile getProfile(Long id) {
	    return profilerepo.findById(id)  
	        .orElseThrow(() -> new RuntimeException("Profile not found with id: " + id));
	}  


	@Override
	public Profile getMyProfile(Long id) {
	    return profilerepo.findById(id)  
	        .orElseThrow(() -> new RuntimeException("Profile not found with id: " + id));
	}



	@Override
	public Profile updateHeadline(Long id, HeadlineDTO dto) {
		Profile existing = profilerepo.findById(id)
	            .orElseThrow(() -> new RuntimeException("Profile not found with id: " + id));
	 
				existing.setHeadline(dto.getHeadline());
				return profilerepo.save(existing);
	}



	@Override
	public Profile updateBio(Long id, BioDTO dto) {
		Profile existing = profilerepo.findById(id)
				.orElseThrow(()-> new RuntimeException("Profile not found with id: "+ id));
		
				existing.setBio(dto.getBio());
				return profilerepo.save(existing);
	}


}
