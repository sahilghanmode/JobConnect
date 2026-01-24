package com.jobconnect.feed.controller;


import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.jobconnect.feed.dtos.ApiResponse;
import com.jobconnect.feed.dtos.CreatePostRequestDTO;
import com.jobconnect.feed.dtos.PostDTO;
import com.jobconnect.feed.service.FeedService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/feed")
public class FeedController {
	private final FeedService feedservice;
	@GetMapping
    public ResponseEntity<ApiResponse<Page<PostDTO>>> getFeed(
            @RequestHeader(value = "X-User-Id", required = false) Long userId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "1") int size) {
        
//        log.info("Getting feed for user: {}, page: {}, size: {}", userId, page, size);
        
        // For testing without gateway, use a default user
        Long currentUserId = userId != null ? userId : 1L;
        
        Page<PostDTO> feed = feedservice.getFeed(currentUserId, page, size);
        return ResponseEntity.ok(ApiResponse.success(feed));
    }
	
	@GetMapping("/user/{userId}")
	public ResponseEntity<ApiResponse<Page<PostDTO>>> getUserPost(
			@PathVariable Long userId,
			@RequestParam(defaultValue="0") int page,
			@RequestParam(defaultValue="10") int size){
		Long userid=userId!=null? userId:1L;
		Page<PostDTO> posts=feedservice.getUserPosts(userid, page, size);
		return ResponseEntity.ok(ApiResponse.success(posts));
	}
	
	@PostMapping("/user/{userId}")
	@Transactional
	public ResponseEntity<ApiResponse<PostDTO>> createPost(
			@PathVariable Long userId,
			@Valid @RequestBody CreatePostRequestDTO request
			
			){
		Long CurrentUserId=userId!=null? userId:1L;
		PostDTO post=feedservice.createPost(CurrentUserId,request);
		return ResponseEntity.ok(ApiResponse.success(post));
	}
	
	
}
