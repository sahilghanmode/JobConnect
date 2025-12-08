package com.jobconnect.profile.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
		Profile created= service.addProfile(profile);
		return ResponseEntity.status(HttpStatus.ACCEPTED).body(created);
	}
}
