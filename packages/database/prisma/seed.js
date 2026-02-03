import { PrismaClient } from '../generated/client/index.js';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Hash password for all users
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Users with Profiles
  const users = await Promise.all([
    prisma.user.create({
      data: {
        email: 'john.doe@example.com',
        hashPassword: hashedPassword,
        name: 'John Doe',
        role: 'CANDIDATE',
        isVerified: true,
        profile: {
          create: {
            headline: 'Full Stack Developer | React & Node.js',
            bio: 'Passionate developer with 5 years of experience building scalable web applications.',
            skills: JSON.stringify(['JavaScript', 'React', 'Node.js', 'TypeScript', 'MySQL']),
            experience: 'Senior Developer at Tech Corp (2020-Present)\nJunior Developer at StartupXYZ (2018-2020)',
            education: 'BS in Computer Science, MIT (2014-2018)',
            location: 'San Francisco, CA',
            avatarUrl: 'https://i.pravatar.cc/150?img=12'
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'jane.smith@example.com',
        hashPassword: hashedPassword,
        name: 'Jane Smith',
        role: 'RECRUITER',
        isVerified: true,
        profile: {
          create: {
            headline: 'Technical Recruiter | Connecting Top Talent',
            bio: 'Helping companies find amazing developers and helping developers find their dream jobs.',
            skills: JSON.stringify(['Talent Acquisition', 'Technical Screening', 'Networking']),
            location: 'New York, NY',
            avatarUrl: 'https://i.pravatar.cc/150?img=5'
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'mike.wilson@example.com',
        hashPassword: hashedPassword,
        name: 'Mike Wilson',
        role: 'CANDIDATE',
        isVerified: true,
        profile: {
          create: {
            headline: 'Software Engineer | Python & AI Enthusiast',
            bio: 'Building intelligent systems and exploring machine learning applications.',
            skills: JSON.stringify(['Python', 'Machine Learning', 'TensorFlow', 'Django', 'PostgreSQL']),
            experience: 'ML Engineer at AI Innovations (2021-Present)',
            education: 'MS in Computer Science, Stanford (2019-2021)',
            location: 'Seattle, WA',
            avatarUrl: 'https://i.pravatar.cc/150?img=33'
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'sarah.jones@example.com',
        hashPassword: hashedPassword,
        name: 'Sarah Jones',
        role: 'CANDIDATE',
        isVerified: true,
        profile: {
          create: {
            headline: 'UI/UX Designer | Creating Beautiful Experiences',
            bio: 'Designer focused on user-centered design and accessibility.',
            skills: JSON.stringify(['Figma', 'Adobe XD', 'User Research', 'Prototyping', 'CSS']),
            experience: 'Senior Designer at DesignHub (2019-Present)',
            education: 'BFA in Graphic Design, RISD (2015-2019)',
            location: 'Austin, TX',
            avatarUrl: 'https://i.pravatar.cc/150?img=9'
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'david.brown@example.com',
        hashPassword: hashedPassword,
        name: 'David Brown',
        role: 'CANDIDATE',
        isVerified: true,
        profile: {
          create: {
            headline: 'DevOps Engineer | Cloud Architecture Specialist',
            bio: 'Expert in AWS, Docker, and Kubernetes. Building reliable and scalable infrastructure.',
            skills: JSON.stringify(['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Terraform']),
            experience: 'DevOps Lead at CloudTech (2019-Present)',
            education: 'BS in Information Technology, UC Berkeley (2015-2019)',
            location: 'Los Angeles, CA',
            avatarUrl: 'https://i.pravatar.cc/150?img=51'
          }
        }
      }
    }),
    prisma.user.create({
      data: {
        email: 'admin@example.com',
        hashPassword: hashedPassword,
        name: 'Admin User',
        role: 'ADMIN',
        isVerified: true,
        profile: {
          create: {
            headline: 'Platform Administrator',
            bio: 'Managing and maintaining the JobConnect platform.',
            location: 'Remote',
            avatarUrl: 'https://i.pravatar.cc/150?img=68'
          }
        }
      }
    })
  ]);

  console.log('✅ Created users:', users.length);

  // Create Posts
  const posts = await Promise.all([
    prisma.post.create({
      data: {
        user_id: users[0].id,
        content: '🚀 Just deployed my first microservices architecture! Learning Spring Boot has been an amazing journey. Any tips for optimizing inter-service communication? #SpringBoot #Microservices',
        image_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800'
      }
    }),
    prisma.post.create({
      data: {
        user_id: users[0].id,
        content: 'Working on a new React project using TypeScript. The type safety really makes a difference in large codebases! What are your favorite TypeScript features?',
      }
    }),
    prisma.post.create({
      data: {
        user_id: users[0].id,
        content: '💡 Pro tip: Always write tests for your code. Future you will thank present you! Just saved myself hours of debugging thanks to comprehensive unit tests.',
      }
    }),
    prisma.post.create({
      data: {
        user_id: users[1].id,
        content: '📢 We\'re hiring! Looking for talented Full Stack Developers to join our amazing team. Must have experience with React and Node.js. Remote-friendly! DM me for details. #Hiring #RemoteJobs',
      }
    }),
    prisma.post.create({
      data: {
        user_id: users[1].id,
        content: '🎯 Recruitment tip: Your resume should tell a story, not just list responsibilities. Focus on achievements and quantifiable results! #CareerAdvice #JobSearch',
      }
    }),
    prisma.post.create({
      data: {
        user_id: users[2].id,
        content: '🤖 Just finished implementing a neural network for image classification! Achieved 94% accuracy on the test set. Machine learning is fascinating! Here\'s what I learned...',
        image_url: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800'
      }
    }),
    prisma.post.create({
      data: {
        user_id: users[2].id,
        content: 'Python tip of the day: Use list comprehensions for cleaner, more Pythonic code. Example: [x**2 for x in range(10)] instead of a for loop. #Python #CodingTips',
      }
    }),
    prisma.post.create({
      data: {
        user_id: users[2].id,
        content: '📊 Data science project update: Built a predictive model for customer churn with 89% accuracy. The key was feature engineering and proper cross-validation. Happy to share my approach!',
      }
    }),
    prisma.post.create({
      data: {
        user_id: users[3].id,
        content: '🎨 Just completed a redesign of a mobile app! User testing showed a 40% improvement in task completion rates. Good UX design really does make a difference! #UXDesign #ProductDesign',
        image_url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=800'
      }
    }),
    prisma.post.create({
      data: {
        user_id: users[3].id,
        content: 'Design thinking workshop today was incredible! Remember: empathize, define, ideate, prototype, test. It\'s not linear, it\'s iterative! 🔄',
      }
    }),
    prisma.post.create({
      data: {
        user_id: users[3].id,
        content: '🖌️ Color theory matters! Just redesigned our dashboard using proper color contrast ratios. Not only does it look better, but accessibility scores improved by 30%. #A11y #DesignSystem',
      }
    }),
    prisma.post.create({
      data: {
        user_id: users[4].id,
        content: '☁️ Successfully migrated our infrastructure to Kubernetes! Response times improved by 50% and deployment is now 10x faster. DevOps for the win! #Kubernetes #CloudNative',
        image_url: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800'
      }
    }),
    prisma.post.create({
      data: {
        user_id: users[4].id,
        content: '🔧 DevOps best practice: Infrastructure as Code is not optional anymore. Use Terraform, CloudFormation, or similar tools. Your future self will thank you! #IaC #DevOps',
      }
    }),
    prisma.post.create({
      data: {
        user_id: users[4].id,
        content: 'Monitoring tip: Don\'t just monitor for failures. Track performance metrics, user behavior, and business KPIs. Observability is key! 📈 #Monitoring #SRE',
      }
    }),
  ]);

  console.log('✅ Created posts:', posts.length);

  // Create Post Likes
  const likes = await Promise.all([
    // Post 1 likes (John's Spring Boot post)
    prisma.postLike.create({ data: { post_id: posts[0].post_id, user_id: users[1].id } }),
    prisma.postLike.create({ data: { post_id: posts[0].post_id, user_id: users[2].id } }),
    prisma.postLike.create({ data: { post_id: posts[0].post_id, user_id: users[4].id } }),

    // Post 2 likes (John's TypeScript post)
    prisma.postLike.create({ data: { post_id: posts[1].post_id, user_id: users[2].id } }),
    prisma.postLike.create({ data: { post_id: posts[1].post_id, user_id: users[3].id } }),

    // Post 3 likes (John's testing post)
    prisma.postLike.create({ data: { post_id: posts[2].post_id, user_id: users[1].id } }),
    prisma.postLike.create({ data: { post_id: posts[2].post_id, user_id: users[4].id } }),

    // Post 4 likes (Jane's hiring post)
    prisma.postLike.create({ data: { post_id: posts[3].post_id, user_id: users[0].id } }),
    prisma.postLike.create({ data: { post_id: posts[3].post_id, user_id: users[2].id } }),
    prisma.postLike.create({ data: { post_id: posts[3].post_id, user_id: users[3].id } }),

    // Post 5 likes (Jane's resume tip)
    prisma.postLike.create({ data: { post_id: posts[4].post_id, user_id: users[0].id } }),
    prisma.postLike.create({ data: { post_id: posts[4].post_id, user_id: users[3].id } }),

    // Post 6 likes (Mike's ML post)
    prisma.postLike.create({ data: { post_id: posts[5].post_id, user_id: users[0].id } }),
    prisma.postLike.create({ data: { post_id: posts[5].post_id, user_id: users[1].id } }),
    prisma.postLike.create({ data: { post_id: posts[5].post_id, user_id: users[3].id } }),
    prisma.postLike.create({ data: { post_id: posts[5].post_id, user_id: users[4].id } }),

    // Post 7 likes (Mike's Python tip)
    prisma.postLike.create({ data: { post_id: posts[6].post_id, user_id: users[0].id } }),
    prisma.postLike.create({ data: { post_id: posts[6].post_id, user_id: users[4].id } }),

    // Post 8 likes (Mike's data science post)
    prisma.postLike.create({ data: { post_id: posts[7].post_id, user_id: users[1].id } }),
    prisma.postLike.create({ data: { post_id: posts[7].post_id, user_id: users[3].id } }),

    // Post 9 likes (Sarah's UX post)
    prisma.postLike.create({ data: { post_id: posts[8].post_id, user_id: users[0].id } }),
    prisma.postLike.create({ data: { post_id: posts[8].post_id, user_id: users[1].id } }),
    prisma.postLike.create({ data: { post_id: posts[8].post_id, user_id: users[2].id } }),

    // Post 10 likes (Sarah's design thinking)
    prisma.postLike.create({ data: { post_id: posts[9].post_id, user_id: users[0].id } }),
    prisma.postLike.create({ data: { post_id: posts[9].post_id, user_id: users[2].id } }),

    // Post 11 likes (Sarah's color theory)
    prisma.postLike.create({ data: { post_id: posts[10].post_id, user_id: users[2].id } }),
    prisma.postLike.create({ data: { post_id: posts[10].post_id, user_id: users[4].id } }),

    // Post 12 likes (David's Kubernetes post)
    prisma.postLike.create({ data: { post_id: posts[11].post_id, user_id: users[0].id } }),
    prisma.postLike.create({ data: { post_id: posts[11].post_id, user_id: users[1].id } }),
    prisma.postLike.create({ data: { post_id: posts[11].post_id, user_id: users[2].id } }),

    // Post 13 likes (David's IaC post)
    prisma.postLike.create({ data: { post_id: posts[12].post_id, user_id: users[0].id } }),
    prisma.postLike.create({ data: { post_id: posts[12].post_id, user_id: users[2].id } }),

    // Post 14 likes (David's monitoring post)
    prisma.postLike.create({ data: { post_id: posts[13].post_id, user_id: users[0].id } }),
    prisma.postLike.create({ data: { post_id: posts[13].post_id, user_id: users[3].id } }),
  ]);

  console.log('✅ Created post likes:', likes.length);

  // Create Comments
  const comments = await Promise.all([
    // Comments on Post 1 (John's Spring Boot post)
    prisma.comment.create({
      data: {
        post_id: posts[0].post_id,
        user_id: users[2].id,
        content: 'Congrats! For inter-service communication, I recommend looking into message queues like RabbitMQ or Kafka for async operations.'
      }
    }),
    prisma.comment.create({
      data: {
        post_id: posts[0].post_id,
        user_id: users[4].id,
        content: 'This is awesome! We\'re also using microservices. gRPC has been great for us for synchronous calls. Consider circuit breakers too!'
      }
    }),

    // Comments on Post 2 (John's TypeScript post)
    prisma.comment.create({
      data: {
        post_id: posts[1].post_id,
        user_id: users[3].id,
        content: 'TypeScript is a game changer! My favorite feature is definitely union types and type guards.'
      }
    }),
    prisma.comment.create({
      data: {
        post_id: posts[1].post_id,
        user_id: users[2].id,
        content: 'Agreed! The autocompletion and refactoring capabilities are amazing. Have you tried using strict mode?'
      }
    }),

    // Comments on Post 3 (John's testing post)
    prisma.comment.create({
      data: {
        post_id: posts[2].post_id,
        user_id: users[4].id,
        content: 'Absolutely! TDD has saved me countless times. What testing framework do you prefer? I\'m using Jest.'
      }
    }),

    // Comments on Post 4 (Jane's hiring post)
    prisma.comment.create({
      data: {
        post_id: posts[3].post_id,
        user_id: users[0].id,
        content: 'Interested! I have 5 years of experience with both React and Node. Can you share more details about the role?'
      }
    }),
    prisma.comment.create({
      data: {
        post_id: posts[3].post_id,
        user_id: users[2].id,
        content: 'This sounds great! Is the position fully remote or hybrid?'
      }
    }),

    // Comments on Post 6 (Mike's ML post)
    prisma.comment.create({
      data: {
        post_id: posts[5].post_id,
        user_id: users[0].id,
        content: '94% is impressive! What dataset did you use? I\'m also exploring computer vision.'
      }
    }),
    prisma.comment.create({
      data: {
        post_id: posts[5].post_id,
        user_id: users[3].id,
        content: 'Great work! Would love to hear more about your approach to data preprocessing and augmentation.'
      }
    }),

    // Comments on Post 7 (Mike's Python tip)
    prisma.comment.create({
      data: {
        post_id: posts[6].post_id,
        user_id: users[0].id,
        content: 'Love this! List comprehensions are so clean. Also check out generator expressions for memory efficiency with large datasets.'
      }
    }),

    // Comments on Post 9 (Sarah's UX post)
    prisma.comment.create({
      data: {
        post_id: posts[8].post_id,
        user_id: users[0].id,
        content: 'The design looks amazing! User-centered design always wins. What tools did you use for user testing?'
      }
    }),
    prisma.comment.create({
      data: {
        post_id: posts[8].post_id,
        user_id: users[2].id,
        content: '40% improvement is huge! Would love to see a case study on this. Any specific metrics you focused on?'
      }
    }),

    // Comments on Post 10 (Sarah's design thinking)
    prisma.comment.create({
      data: {
        post_id: posts[9].post_id,
        user_id: users[1].id,
        content: 'Great reminder! The iterative part is so important. Many people forget it\'s not a one-time process.'
      }
    }),

    // Comments on Post 12 (David's Kubernetes post)
    prisma.comment.create({
      data: {
        post_id: posts[11].post_id,
        user_id: users[0].id,
        content: 'This is on my learning list! Any resources you\'d recommend for getting started with K8s?'
      }
    }),
    prisma.comment.create({
      data: {
        post_id: posts[11].post_id,
        user_id: users[2].id,
        content: '50% improvement is fantastic! How did you handle the migration? Any downtime?'
      }
    }),

    // Comments on Post 13 (David's IaC post)
    prisma.comment.create({
      data: {
        post_id: posts[12].post_id,
        user_id: users[0].id,
        content: '100% agree! We use Terraform and it\'s been a lifesaver. Version control for infrastructure is essential.'
      }
    }),
  ]);

  // ---------------- COMPANIES ----------------
  const companies = await Promise.all([
    prisma.company.create({
      data: {
        name: "Spotify",
        description: "Music streaming platform used by millions worldwide.",
        website: "https://spotify.com",
        industry: "Music / Streaming",
        size: "1000+",
        logoUrl: "https://logo.clearbit.com/spotify.com",
      },
    }),
    prisma.company.create({
      data: {
        name: "Netflix",
        description: "Video streaming and entertainment platform.",
        website: "https://netflix.com",
        industry: "Entertainment",
        size: "5000+",
        logoUrl: "https://logo.clearbit.com/netflix.com",
      },
    }),
    prisma.company.create({
      data: {
        name: "Airbnb",
        description: "Marketplace for lodging and travel experiences.",
        website: "https://airbnb.com",
        industry: "Travel",
        size: "3000+",
        logoUrl: "https://logo.clearbit.com/airbnb.com",
      },
    }),
  ]);

  console.log("✅ Created companies:", companies.length);

  // ---------------- JOBS ----------------
  const jobs = await Promise.all([
    prisma.job.create({
      data: {
        recruiter_id: users[1].id, // Jane Smith (RECRUITER)
        company_id: companies[0].company_id,
        company_name: companies[0].name,
        job_title: "Senior Frontend Developer",
        description:
          "Work on scalable frontend applications used by millions of users.",
        requirements:
          "5+ years experience with React, TypeScript, and modern frontend tooling.",
        responsibilities:
          "Build UI features, optimize performance, collaborate with backend teams.",
        employment_type: "Full-time",
        experience_level: "Senior",
        salary_min: 120000,
        salary_max: 160000,
        location: "Remote",
        is_remote: true,
        skills_required: ["React", "TypeScript", "GraphQL"],
        status: "ACTIVE",
        expires_at: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      },
    }),

    prisma.job.create({
      data: {
        recruiter_id: users[1].id,
        company_id: companies[1].company_id,
        company_name: companies[1].name,
        job_title: "Backend Engineer",
        description:
          "Design and build high-scale backend systems for streaming services.",
        requirements:
          "Strong Java, Spring Boot, Microservices, and AWS experience.",
        responsibilities:
          "API design, database optimization, system scalability.",
        employment_type: "Full-time",
        experience_level: "Mid-Senior",
        salary_min: 150000,
        salary_max: 200000,
        location: "Los Gatos, CA",
        is_remote: false,
        skills_required: ["Java", "Spring Boot", "Kafka", "AWS"],
        status: "ACTIVE",
        expires_at: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      },
    }),

    prisma.job.create({
      data: {
        recruiter_id: users[1].id,
        company_id: companies[2].company_id,
        company_name: companies[2].name,
        job_title: "Product Designer",
        description:
          "Create intuitive and delightful product experiences.",
        requirements:
          "Strong UX fundamentals, Figma expertise, user research experience.",
        responsibilities:
          "Design workflows, prototypes, collaborate with engineers.",
        employment_type: "Full-time",
        experience_level: "Mid",
        salary_min: 100000,
        salary_max: 140000,
        location: "San Francisco, CA",
        is_remote: false,
        skills_required: ["Figma", "UX Research", "Prototyping"],
        status: "ACTIVE",
        expires_at: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
      },
    }),
  ]);

  console.log("✅ Created jobs:", jobs.length);

  // ---------------- APPLICATIONS ----------------
  await prisma.application.create({
    data: {
      job_id: jobs[0].job_id,
      candidate_id: users[0].id, // John Doe
      resume_url: "https://example.com/resume-john.pdf",
      cover_letter: "Excited to apply for this frontend role!",
      status: "PENDING",
    },
  });

  console.log("✅ Created job applications");


  console.log('✅ Created comments:', comments.length);

  console.log('\n🎉 Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - Users: ${users.length}`);
  console.log(`   - Profiles: ${users.length}`);
  console.log(`   - Posts: ${posts.length}`);
  console.log(`   - Likes: ${likes.length}`);
  console.log(`   - Comments: ${comments.length}`);
  console.log('\n🔑 Test Credentials (Password for all: password123):');
  console.log('   - john.doe@example.com (CANDIDATE - Full Stack Dev)');
  console.log('   - jane.smith@example.com (RECRUITER)');
  console.log('   - mike.wilson@example.com (CANDIDATE - ML Engineer)');
  console.log('   - sarah.jones@example.com (CANDIDATE - UI/UX Designer)');
  console.log('   - david.brown@example.com (CANDIDATE - DevOps Engineer)');
  console.log('   - admin@example.com (ADMIN)');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });