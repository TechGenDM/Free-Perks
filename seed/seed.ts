import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

// Import models directly (not using @/ alias since tsx doesn't resolve it)
import { Category } from '../lib/models/Category';
import { Tool } from '../lib/models/Tool';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/freeperks';

const categories = [
  { name: 'AI Tools', slug: 'ai-tools', icon: 'brain' },
  { name: 'Cloud Credits', slug: 'cloud-credits', icon: 'cloud' },
  { name: 'Hosting', slug: 'hosting', icon: 'server' },
  { name: 'Dev Software', slug: 'dev-software', icon: 'code' },
  { name: 'APIs', slug: 'apis', icon: 'plug' },
  { name: 'Learning', slug: 'learning', icon: 'book' },
];

const daysFromNow = (days: number): Date => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
};

const pastDate = (daysAgo: number): Date => daysFromNow(-daysAgo);

const seed = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    await Category.deleteMany({});
    await Tool.deleteMany({});
    console.log('Cleared existing data');

    const insertedCategories = await Category.insertMany(categories);
    const catMap = new Map(insertedCategories.map((c) => [c.slug, c._id]));
    console.log(`Seeded ${insertedCategories.length} categories`);

    const tools = [
      // ───── AI TOOLS ─────
      {
        title: 'GitHub Copilot', slug: 'github-copilot',
        description: 'AI pair programmer that suggests code completions in your editor. Free for verified students through GitHub Education.',
        url: 'https://github.com/features/copilot', category: catMap.get('ai-tools'),
        tags: ['ai', 'code-completion', 'editor', 'github'],
        eligibility: { studentEmailRequired: true, studentVerificationRequired: true, regions: [] },
        offer: { type: 'free', description: 'Free GitHub Copilot Individual plan' },
        verifiedAt: pastDate(5), verificationStatus: 'verified', expiresAt: null,
        status: 'active', is_featured: true, saves_count: 342,
      },
      {
        title: 'ChatGPT Edu', slug: 'chatgpt-edu',
        description: 'OpenAI ChatGPT access for educational institutions with GPT-4o. Available through participating universities.',
        url: 'https://openai.com/chatgpt/edu', category: catMap.get('ai-tools'),
        tags: ['ai', 'chatbot', 'openai', 'gpt'],
        eligibility: { studentEmailRequired: true, studentVerificationRequired: false, regions: [] },
        offer: { type: 'free', description: 'Free ChatGPT Plus through university' },
        verifiedAt: pastDate(12), verificationStatus: 'verified', expiresAt: null,
        status: 'active', is_featured: true, saves_count: 289,
      },
      {
        title: 'Notion AI', slug: 'notion-ai',
        description: 'AI writing assistant built into Notion. Free for students with the Education Plus plan.',
        url: 'https://www.notion.so/product/ai', category: catMap.get('ai-tools'),
        tags: ['ai', 'writing', 'productivity', 'notes'],
        eligibility: { studentEmailRequired: true, studentVerificationRequired: false, regions: [] },
        offer: { type: 'free', description: 'Free Notion Plus plan with AI for students' },
        verifiedAt: null, verificationStatus: 'needs-review', expiresAt: null,
        status: 'active', is_featured: false, saves_count: 156,
      },
      // ───── CLOUD CREDITS ─────
      {
        title: 'Azure for Students', slug: 'azure-for-students',
        description: 'Microsoft Azure gives students $100 in cloud credits with no credit card required. Access popular services including VMs, databases, and AI.',
        url: 'https://azure.microsoft.com/en-us/free/students/', category: catMap.get('cloud-credits'),
        tags: ['azure', 'microsoft', 'cloud', 'vm', 'credits'],
        eligibility: { studentEmailRequired: true, studentVerificationRequired: true, regions: [] },
        offer: { type: 'credit', description: '$100 Azure credit, renewable annually' },
        verifiedAt: pastDate(3), verificationStatus: 'verified', expiresAt: daysFromNow(365),
        status: 'active', is_featured: true, saves_count: 278,
      },
      {
        title: 'Google Cloud Student Credits', slug: 'google-cloud-student-credits',
        description: 'Google Cloud Platform credits for students via academic programs. Includes Compute Engine, BigQuery, and Cloud Functions.',
        url: 'https://cloud.google.com/edu', category: catMap.get('cloud-credits'),
        tags: ['gcp', 'google', 'cloud', 'credits'],
        eligibility: { studentEmailRequired: true, studentVerificationRequired: true, regions: [] },
        offer: { type: 'credit', description: 'GCP credits through faculty-sponsored program' },
        verifiedAt: pastDate(30), verificationStatus: 'needs-review', expiresAt: null,
        status: 'active', is_featured: false, saves_count: 201,
      },
      {
        title: 'AWS Educate', slug: 'aws-educate',
        description: 'AWS Educate provides cloud computing learning resources and AWS credits for students and educators.',
        url: 'https://aws.amazon.com/education/awseducate/', category: catMap.get('cloud-credits'),
        tags: ['aws', 'amazon', 'cloud', 'credits', 'education'],
        eligibility: { studentEmailRequired: true, studentVerificationRequired: false, regions: [] },
        offer: { type: 'credit', description: 'AWS credits via Educate program' },
        verifiedAt: pastDate(7), verificationStatus: 'verified', expiresAt: null,
        status: 'active', is_featured: false, saves_count: 195,
      },
      {
        title: 'DigitalOcean Student Credits', slug: 'digitalocean-student-credits',
        description: 'DigitalOcean provides $200 in cloud credits to students through the GitHub Student Developer Pack.',
        url: 'https://www.digitalocean.com/github-students', category: catMap.get('cloud-credits'),
        tags: ['digitalocean', 'cloud', 'credits', 'github'],
        eligibility: { studentEmailRequired: true, studentVerificationRequired: true, regions: [] },
        offer: { type: 'credit', description: '$200 DigitalOcean credit for 1 year' },
        verifiedAt: pastDate(2), verificationStatus: 'verified', expiresAt: daysFromNow(365),
        status: 'active', is_featured: false, saves_count: 167,
      },
      // ───── HOSTING ─────
      {
        title: 'Vercel', slug: 'vercel',
        description: 'Deploy frontend projects instantly with Vercel. The Hobby plan is free for personal projects — no student verification needed.',
        url: 'https://vercel.com', category: catMap.get('hosting'),
        tags: ['hosting', 'deploy', 'frontend', 'nextjs', 'serverless'],
        eligibility: { studentEmailRequired: false, studentVerificationRequired: false, regions: [] },
        offer: { type: 'free-tier', description: 'Free Hobby plan, unlimited deploys' },
        verifiedAt: pastDate(1), verificationStatus: 'verified', expiresAt: null,
        status: 'active', is_featured: true, saves_count: 412,
      },
      {
        title: 'Netlify', slug: 'netlify',
        description: 'Free static site hosting with CI/CD, serverless functions, and form handling. Great for student portfolios and projects.',
        url: 'https://www.netlify.com', category: catMap.get('hosting'),
        tags: ['hosting', 'static', 'deploy', 'serverless', 'ci-cd'],
        eligibility: { studentEmailRequired: false, studentVerificationRequired: false, regions: [] },
        offer: { type: 'free-tier', description: 'Free Starter plan with 100GB bandwidth' },
        verifiedAt: pastDate(1), verificationStatus: 'verified', expiresAt: null,
        status: 'active', is_featured: false, saves_count: 334,
      },
      {
        title: 'Railway', slug: 'railway',
        description: 'Deploy backend services, databases, and full-stack apps. Free trial plan with $5/month credit.',
        url: 'https://railway.app', category: catMap.get('hosting'),
        tags: ['hosting', 'backend', 'database', 'deploy', 'docker'],
        eligibility: { studentEmailRequired: false, studentVerificationRequired: false, regions: [] },
        offer: { type: 'free-tier', description: 'Trial plan with $5/month credit' },
        verifiedAt: pastDate(20), verificationStatus: 'needs-review', expiresAt: null,
        status: 'active', is_featured: false, saves_count: 198,
      },
      // ───── DEV SOFTWARE ─────
      {
        title: 'JetBrains All Products Pack', slug: 'jetbrains-student',
        description: 'All JetBrains IDEs (IntelliJ, PyCharm, WebStorm, etc.) free for students. Renewed annually with valid student status.',
        url: 'https://www.jetbrains.com/community/education/', category: catMap.get('dev-software'),
        tags: ['ide', 'jetbrains', 'intellij', 'pycharm', 'editor'],
        eligibility: { studentEmailRequired: true, studentVerificationRequired: true, regions: [] },
        offer: { type: 'free', description: 'All JetBrains IDEs free for 1 year, renewable' },
        verifiedAt: pastDate(2), verificationStatus: 'verified', expiresAt: daysFromNow(365),
        status: 'active', is_featured: true, saves_count: 389,
      },
      {
        title: 'Figma Education', slug: 'figma-education',
        description: 'Figma Professional plan free for students and educators. Includes unlimited files, projects, and collaboration features.',
        url: 'https://www.figma.com/education/', category: catMap.get('dev-software'),
        tags: ['design', 'ui', 'ux', 'prototyping', 'figma'],
        eligibility: { studentEmailRequired: true, studentVerificationRequired: true, regions: [] },
        offer: { type: 'free', description: 'Free Professional plan for 2 years' },
        verifiedAt: pastDate(8), verificationStatus: 'verified', expiresAt: null,
        status: 'active', is_featured: true, saves_count: 356,
      },
      {
        title: 'GitKraken Pro', slug: 'gitkraken-pro',
        description: 'GitKraken Git GUI Pro plan free through the GitHub Student Developer Pack. Visual Git client with merge conflict editor.',
        url: 'https://www.gitkraken.com/github-student-developer-pack', category: catMap.get('dev-software'),
        tags: ['git', 'gui', 'version-control', 'github'],
        eligibility: { studentEmailRequired: true, studentVerificationRequired: true, regions: [] },
        offer: { type: 'free', description: 'Free GitKraken Pro via GitHub Student Pack' },
        verifiedAt: pastDate(15), verificationStatus: 'verified', expiresAt: null,
        status: 'active', is_featured: false, saves_count: 145,
      },
      {
        title: 'Termius Premium', slug: 'termius-premium',
        description: 'Cross-platform SSH client with SFTP, port forwarding, and snippets. Premium free for students.',
        url: 'https://termius.com/education', category: catMap.get('dev-software'),
        tags: ['ssh', 'terminal', 'remote', 'devops'],
        eligibility: { studentEmailRequired: true, studentVerificationRequired: true, regions: [] },
        offer: { type: 'free', description: 'Free Premium plan via GitHub Student Pack' },
        verifiedAt: null, verificationStatus: 'needs-review', expiresAt: null,
        status: 'active', is_featured: false, saves_count: 89,
      },
      // ───── APIs ─────
      {
        title: 'Twilio Student Credits', slug: 'twilio-student-credits',
        description: 'Twilio provides SMS and voice API credits to students. Build communication features into your projects.',
        url: 'https://www.twilio.com/en-us/ahoy', category: catMap.get('apis'),
        tags: ['sms', 'voice', 'api', 'communication'],
        eligibility: { studentEmailRequired: false, studentVerificationRequired: false, regions: ['US', 'CA', 'UK'] },
        offer: { type: 'credit', description: '$50 Twilio credit for students' },
        verifiedAt: pastDate(45), verificationStatus: 'expired', expiresAt: pastDate(10),
        status: 'active', is_featured: false, saves_count: 112,
      },
      {
        title: 'MongoDB Atlas Free Tier', slug: 'mongodb-atlas-free',
        description: 'MongoDB Atlas offers a forever-free M0 cluster with 512MB storage. Perfect for student projects and prototypes.',
        url: 'https://www.mongodb.com/atlas/database', category: catMap.get('apis'),
        tags: ['database', 'mongodb', 'nosql', 'cloud', 'backend'],
        eligibility: { studentEmailRequired: false, studentVerificationRequired: false, regions: [] },
        offer: { type: 'free-tier', description: 'Free M0 cluster, 512MB, forever free' },
        verifiedAt: pastDate(1), verificationStatus: 'verified', expiresAt: null,
        status: 'active', is_featured: false, saves_count: 267,
      },
      {
        title: 'SendGrid Free Tier', slug: 'sendgrid-free',
        description: 'Send up to 100 emails/day with the SendGrid free tier. Great for transactional email in student projects.',
        url: 'https://sendgrid.com/en-us/free', category: catMap.get('apis'),
        tags: ['email', 'api', 'transactional', 'smtp'],
        eligibility: { studentEmailRequired: false, studentVerificationRequired: false, regions: [] },
        offer: { type: 'free-tier', description: '100 emails/day forever free' },
        verifiedAt: pastDate(10), verificationStatus: 'verified', expiresAt: null,
        status: 'active', is_featured: false, saves_count: 134,
      },
      // ───── LEARNING ─────
      {
        title: 'GitHub Student Developer Pack', slug: 'github-student-pack',
        description: 'The best developer tools, free for students. Includes 90+ offers from partners like JetBrains, Namecheap, DigitalOcean, and more.',
        url: 'https://education.github.com/pack', category: catMap.get('learning'),
        tags: ['github', 'education', 'tools', 'bundle', 'developer'],
        eligibility: { studentEmailRequired: true, studentVerificationRequired: true, regions: [] },
        offer: { type: 'free', description: '90+ free developer tools and services' },
        verifiedAt: pastDate(1), verificationStatus: 'verified', expiresAt: null,
        status: 'active', is_featured: true, saves_count: 523,
      },
      {
        title: 'freeCodeCamp', slug: 'freecodecamp',
        description: 'Free, self-paced coding curriculum covering web development, data science, and machine learning. Earn certifications.',
        url: 'https://www.freecodecamp.org', category: catMap.get('learning'),
        tags: ['learning', 'coding', 'curriculum', 'certification', 'free'],
        eligibility: { studentEmailRequired: false, studentVerificationRequired: false, regions: [] },
        offer: { type: 'free', description: 'Entirely free curriculum and certifications' },
        verifiedAt: pastDate(3), verificationStatus: 'verified', expiresAt: null,
        status: 'active', is_featured: false, saves_count: 445,
      },
      // ───── ARCHIVED EXAMPLE ─────
      {
        title: 'Heroku Student Credits', slug: 'heroku-student-credits',
        description: 'Heroku formerly offered $13/month platform credit for students through the GitHub Student Developer Pack. This offer has been discontinued.',
        url: 'https://www.heroku.com/students', category: catMap.get('hosting'),
        tags: ['hosting', 'heroku', 'paas', 'discontinued'],
        eligibility: { studentEmailRequired: true, studentVerificationRequired: true, regions: [] },
        offer: { type: 'credit', description: 'DISCONTINUED — $13/mo credit (was free)' },
        verifiedAt: pastDate(180), verificationStatus: 'expired', expiresAt: pastDate(90),
        status: 'archived', is_featured: false, saves_count: 78,
      },
    ];

    const insertedTools = await Tool.insertMany(tools);
    console.log(`Seeded ${insertedTools.length} tools`);

    for (const [slug, catId] of catMap) {
      const count = await Tool.countDocuments({ category: catId, status: 'active' });
      await Category.findByIdAndUpdate(catId, { tool_count: count });
    }
    console.log('Updated category tool counts');

    const verified = insertedTools.filter((t) => t.verificationStatus === 'verified').length;
    const needsReview = insertedTools.filter((t) => t.verificationStatus === 'needs-review').length;
    const expired = insertedTools.filter((t) => t.verificationStatus === 'expired').length;
    const archived = insertedTools.filter((t) => t.status === 'archived').length;
    const featured = insertedTools.filter((t) => t.is_featured).length;

    console.log('\n--- Seed Summary ---');
    console.log(`Total tools:    ${insertedTools.length}`);
    console.log(`Verified:       ${verified}`);
    console.log(`Needs review:   ${needsReview}`);
    console.log(`Expired:        ${expired}`);
    console.log(`Archived:       ${archived}`);
    console.log(`Featured:       ${featured}`);
    console.log(`Categories:     ${insertedCategories.length}`);
    console.log('-------------------\n');

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seed();
