package com.jobconnect.profile.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.jobconnect.profile.entities.Profile;

@Repository
public interface ProfileRespository extends JpaRepository<Profile, Long> {
	
	
}
