package com.jobconnect.feed.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.jobconnect.feed.dtos.CreatePostRequestDTO;
import com.jobconnect.feed.dtos.PostDTO;
import com.jobconnect.feed.dtos.UserDTO;
import com.jobconnect.feed.entities.Post;
import com.jobconnect.feed.entities.Profile;
import com.jobconnect.feed.entities.User;
import com.jobconnect.feed.repositories.CommentRepository;
import com.jobconnect.feed.repositories.PostLikeRepository;
import com.jobconnect.feed.repositories.PostRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)  
public class FeedServiceImpl implements FeedService {
	private final PostRepository postrepo;
	private final CommentRepository commentrepo;
	private final PostLikeRepository postlikerepo;
	
	@Override
	public Page<PostDTO> getFeed(Long CurrentUserId, int page, int size){
		Pageable pageable=PageRequest.of(page, size);
		Page<Post> posts=postrepo.findAllWithUser(pageable);
		
		
		return posts.map(post -> mapToPostDTO(post,CurrentUserId) );
		
	}
	
	@Override
	public Page<PostDTO> getUserPosts(Long userid, int page, int size) {
		Pageable pageable=PageRequest.of(page, size);
		Page<Post> posts=postrepo.findByUserIdOrderByCreatedAtDesc(userid, pageable);
		return posts.map(post->mapToPostDTO(post,userid));
	}
	
	@Override
	@Transactional
	public PostDTO createPost(Long CurrentUserId, CreatePostRequestDTO request) {
		Post post=new Post();
		post.setUserId(CurrentUserId);
		post.setContent(request.getContent());
		post.setImageUrl(request.getImageUrl());
		Post savedPost=postrepo.save(post);
		savedPost = postrepo.findById(savedPost.getId())
	            .orElseThrow(() -> new RuntimeException("Post not found after save"));
		System.out.println(savedPost);
		return mapToPostDTO(savedPost, CurrentUserId);
	}
 
	
	private PostDTO mapToPostDTO(Post post, Long currentUserId) {
        User user = post.getUser();
        Profile profile = user.getProfile();
        
        return PostDTO.builder()
                .postId(post.getId())
                .content(post.getContent())
                .imageUrl(post.getImageUrl())
                .createdAt(post.getCreatedAt())
                .user(UserDTO.builder()
                        .id(user.getId())
                        .name(user.getName())
                        .headline(profile != null ? profile.getHeadline() : null)
                        .avatarUrl(profile != null ? profile.getAvatarUrl() : null)
                        .build())
                .likesCount(postlikerepo.countByPostId(post.getId()))
                .commentsCount(commentrepo.countByPostId(post.getId()))
                .isLiked(postlikerepo.existsByPostIdAndUserId(post.getId(),currentUserId))
                .build();
    }

	

}
