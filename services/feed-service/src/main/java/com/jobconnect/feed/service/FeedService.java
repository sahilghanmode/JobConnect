package com.jobconnect.feed.service;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import com.jobconnect.feed.dtos.CreatePostRequestDTO;
import com.jobconnect.feed.dtos.PostDTO;

@Service
public interface FeedService {
	public Page<PostDTO> getFeed(Long CurrentUserId, int page, int size);
	
	public Page<PostDTO> getUserPosts(Long CurrentUserId, int page, int size);
	
	public PostDTO createPost(Long CurrentUserId, CreatePostRequestDTO request);
}
