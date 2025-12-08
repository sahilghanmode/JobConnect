package com.jobconnect.profile.service;

import org.springframework.stereotype.Service;

import com.jobconnect.profile.entities.Profile;
import com.jobconnect.profile.repository.ProfileRespository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

	private final ProfileRespository profilerepo;
	
	@Override
	public Profile addProfile(Profile profile) {
		
		return profilerepo.save(profile);
	}

}
