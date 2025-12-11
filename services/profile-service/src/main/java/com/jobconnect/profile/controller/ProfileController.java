package com.jobconnect.profile.controller;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.jobconnect.profile.dto.BioDTO;
import com.jobconnect.profile.dto.EducationAddDTO;
import com.jobconnect.profile.dto.ExperienceAddDTO;
import com.jobconnect.profile.dto.HeadlineDTO;
import com.jobconnect.profile.dto.SkillAddDTO;
import com.jobconnect.profile.entities.Profile;
import com.jobconnect.profile.service.ProfileService;

import lombok.RequiredArgsConstructor;


@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profile")
public class ProfileController {
	private final ProfileService service;

	@PostMapping("/addprofile")
	public ResponseEntity<Profile> createProfile(@RequestBody Profile profile){
		System.out.println("working");
		Profile created= service.addProfile(profile);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(created);
	}
	
	@GetMapping("/me/{id}")
	public ResponseEntity<Profile> getProfile(@PathVariable Long id){
		Profile profile = service.getProfile(id);
		return ResponseEntity.status(HttpStatus.OK).body(profile);		
	}
	@PutMapping("/me/skills/{id}")
	public ResponseEntity<Profile> updateSkills(@PathVariable Long id, @RequestBody SkillAddDTO dto) {
	    Profile skillsUpdated = service.updateSkills(id, dto);
	    return ResponseEntity.status(HttpStatus.ACCEPTED).body(skillsUpdated);
	}

	@PutMapping("/me/experiences/{id}")
	public ResponseEntity<Profile> updateExperience(@PathVariable Long id, @RequestBody ExperienceAddDTO dto) {
	    Profile experienceUpdated = service.updateExperience(id, dto);
	    return ResponseEntity.status(HttpStatus.ACCEPTED).body(experienceUpdated);
	}

	@PutMapping("/me/education/{id}")
	public ResponseEntity<Profile> updateEducation(@PathVariable Long id, @RequestBody EducationAddDTO dto) {
	    Profile educationUpdated = service.updateEducation(id, dto);
	    return ResponseEntity.status(HttpStatus.ACCEPTED).body(educationUpdated);
	}
	@PatchMapping("/me/headline/{id}")
    public ResponseEntity<Profile> updateHeadline(@PathVariable Long id, @RequestBody HeadlineDTO dto) {
        Profile updated = service.updateHeadline(id, dto);
        return ResponseEntity.ok(updated);
    }
	 @PatchMapping("/me/bio/{id}")
	    public ResponseEntity<Profile> updateBio(@PathVariable Long id, @RequestBody BioDTO dto) {
	        Profile updated = service.updateBio(id, dto);
	        return ResponseEntity.ok(updated);
	    }
//	@PutMapping("/me/certification/{id}")
//	public ResponseEntity<Profile> updateCertification(@PathVariable Long id,@RequestBody CertificationAddDTO dto,Profile profile){
//		Profile educationupdated = service.updateEducation(id,dto,profile);
//		
//		return ResponseEntity.status(HttpStatus.ACCEPTED).body(educationupdated);
//	}


}
