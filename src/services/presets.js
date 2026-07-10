// Preset Options for ImagineFlow AI

export const EXAMPLE_PROMPTS = [
  "Design a luxury perfume advertisement",
  "Create a futuristic gaming setup",
  "Design a premium coffee logo",
  "Generate an Instagram ad for sneakers",
  "Create a YouTube thumbnail for AI news",
  "Design a cyberpunk city skyline",
  "Create packaging for an organic skincare brand",
  "Design a modern SaaS landing page",
  "Design a luxury watch campaign",
  "Create a travel poster for Tokyo"
];

export const PURPOSES = [
  { id: "instagram", label: "Instagram Post" },
  { id: "linkedin", label: "LinkedIn Banner" },
  { id: "presentation", label: "Presentation" },
  { id: "advertisement", label: "Advertisement" },
  { id: "poster", label: "Poster" },
  { id: "blog", label: "Blog Cover" },
  { id: "hero", label: "Website Hero" },
  { id: "youtube", label: "YouTube Thumbnail" },
  { id: "flyer", label: "Business Flyer" },
  { id: "packaging", label: "Product Packaging" },
  { id: "social_campaign", label: "Social Media Campaign" },
  { id: "logo", label: "Business Logo" },
  { id: "marketing", label: "Marketing Campaign" }
];

export const MODELS = [
  { id: "gemini", label: "Gemini Image" },
  { id: "midjourney", label: "Midjourney v6" },
  { id: "dalle", label: "DALL-E 3" },
  { id: "sd", label: "Stable Diffusion 3" },
  { id: "flux", label: "FLUX.1 Schnell" }
];

export const REWRITE_STYLES = [
  { id: "professional", label: "Professional" },
  { id: "luxury", label: "Luxury" },
  { id: "marketing", label: "Marketing" },
  { id: "minimal", label: "Minimal" },
  { id: "photorealistic", label: "Photorealistic" },
  { id: "cinematic", label: "Cinematic" },
  { id: "anime", label: "Anime" },
  { id: "fantasy", label: "Fantasy" },
  { id: "cyberpunk", label: "Cyberpunk" },
  { id: "render", label: "3D Render" },
  { id: "editorial", label: "Editorial" },
  { id: "concept", label: "Concept Art" }
];

export const TEMPLATES = [
  {
    id: "headshot",
    label: "Professional Headshot",
    description: "Corporate headshot of a smiling professional in executive clothing, clean backdrop",
    purpose: "linkedin",
    model: "gemini",
    creativity: "precise"
  },
  {
    id: "logo",
    label: "Startup Logo",
    description: "Minimalist geometric logo icon for a futuristic software startup, vector graphic, flat colors",
    purpose: "logo",
    model: "flux",
    creativity: "precise"
  },
  {
    id: "perfume",
    label: "Luxury Product Shot",
    description: "An elegant glass perfume bottle resting on smooth wet basalt stones with subtle ripples in water",
    purpose: "marketing",
    model: "midjourney",
    creativity: "creative"
  },
  {
    id: "food",
    label: "Food Photography",
    description: "Freshly baked artisan sourdough bread on a wooden rustic board, flour dust, warm sunlight",
    purpose: "marketing",
    model: "dalle",
    creativity: "balanced"
  },
  {
    id: "architecture",
    label: "Architecture",
    description: "Modern concrete villa built into a green cliffside, infinity pool, warm evening lighting, sunset",
    purpose: "hero",
    model: "flux",
    creativity: "balanced"
  },
  {
    id: "character",
    label: "Fantasy Character",
    description: "Elven rogue wearing leather armor standing in a misty mystical forest, holding a glowing dagger",
    purpose: "poster",
    model: "midjourney",
    creativity: "creative"
  },
  {
    id: "editorial",
    label: "Fashion Editorial",
    description: "A high fashion model in a vibrant neon orange coat standing amidst concrete brutalist columns, studio pose",
    purpose: "instagram",
    model: "gemini",
    creativity: "creative"
  },
  {
    id: "travel",
    label: "Travel Poster",
    description: "Vintage retro style travel poster of Mount Fuji behind cherry blossom branches, minimalist vector",
    purpose: "poster",
    model: "flux",
    creativity: "balanced"
  },
  {
    id: "packaging",
    label: "Packaging Design",
    description: "Eco-friendly cosmetic cream paper bottle with botanical leaves illustration, product photography mockup",
    purpose: "packaging",
    model: "dalle",
    creativity: "precise"
  },
  {
    id: "thumbnail",
    label: "YouTube Thumbnail",
    description: "A high-tech VR headset emitting digital blue light waves into a dark neon cyberpunk room",
    purpose: "youtube",
    model: "flux",
    creativity: "creative"
  },
  {
    id: "ad",
    label: "Instagram Advertisement",
    description: "Close up shot of premium running shoes flying through orange powder explosion, dynamic motion",
    purpose: "marketing",
    model: "midjourney",
    creativity: "creative"
  },
  {
    id: "book",
    label: "Book Cover",
    description: "Intricate gold mechanical clockwork pocket watch floating in a celestial starry galaxy backdrop",
    purpose: "blog",
    model: "gemini",
    creativity: "balanced"
  },
  {
    id: "movie",
    label: "Movie Poster",
    description: "A lone astronaut standing on the edge of a massive rust-colored canyon on Mars, cinematic composition",
    purpose: "poster",
    model: "midjourney",
    creativity: "balanced"
  },
  {
    id: "hero_shot",
    label: "Landing Page Hero",
    description: "Clean abstract 3D clay render shapes floating gracefully on a modern light gray grid backdrop",
    purpose: "hero",
    model: "flux",
    creativity: "precise"
  },
  {
    id: "app",
    label: "App UI Mockup",
    description: "A clean minimalist smartphone showing a dark mode analytics dashboard interface, isometric view",
    purpose: "presentation",
    model: "dalle",
    creativity: "precise"
  },
  {
    id: "flyer",
    label: "Business Flyer",
    description: "Modern professional co-working office space with warm lighting, glass partitions, plants, clean view",
    purpose: "flyer",
    model: "gemini",
    creativity: "precise"
  },
  {
    id: "resume",
    label: "Resume Illustration",
    description: "Flat design isometric office desk with laptop, notebook, coffee cup, pastel colors, clean vector",
    purpose: "presentation",
    model: "sd",
    creativity: "balanced"
  },
  {
    id: "conference",
    label: "Tech Conference Poster",
    description: "Futuristic abstract human silhouette glowing with binary data streams, dark theme, deep violet gradient",
    purpose: "poster",
    model: "flux",
    creativity: "creative"
  }
];

export const DAILY_INSPIRATIONS = [
  {
    day: 0,
    title: "Eco-Friendly Motorcycle",
    description: "Design a futuristic eco-friendly electric motorcycle advertisement.",
    suggestion: "sleek silver body, green glowing accents, set in a clean solar-powered city street, shot in golden hour"
  },
  {
    day: 1,
    title: "Luxury Perfume Ad",
    description: "Design a luxury perfume advertisement with liquid ripples.",
    suggestion: "amber-tinted glass perfume bottle, set on marble, warm studio glow, elegant water splash, high-end branding"
  },
  {
    day: 2,
    title: "Martian Travel Poster",
    description: "Generate a retro travel poster for Mars exploring dome cities.",
    suggestion: "vintage travel illustration, huge red canyon, orange sky with two small moons, dome habitats in distance"
  },
  {
    day: 3,
    title: "Futuristic Coffee Shop",
    description: "Create a futuristic coffee shop with neon lights and robots.",
    suggestion: "cozy cyberpunk cafe, glowing neon counters, warm steam rising, holographic menus, clean metal finishes"
  },
  {
    day: 4,
    title: "Organic Skincare Brand",
    description: "Create packaging for an organic skincare brand inspired by bamboo.",
    suggestion: "minimalist glass lotion pump, bamboo forest background, soft natural lighting, morning dew, pastel green palette"
  },
  {
    day: 5,
    title: "Sneaker Drop Ad",
    description: "Generate an Instagram ad for futuristic running sneakers.",
    suggestion: "athletic sneakers floating, liquid chrome splashes around it, high contrast studio lighting, dark backdrop"
  },
  {
    day: 6,
    title: "AI News Thumbnail",
    description: "Create a YouTube thumbnail representing the dawn of agentic AI.",
    suggestion: "translucent glowing brain, digital circuits mapping out, abstract humanoid hologram, professional color grading"
  }
];

export const SUGGESTION_CHIPS = [
  { label: "Cinematic Lighting", fix: "dramatic cinematic lighting, golden hour shadows, movie-set atmosphere" },
  { label: "Golden Hour Glow", fix: "warm golden hour light, soft orange sun beams, long shadows" },
  { label: "Close-up Portrait", fix: "shot from a close-up angle, sharp focus, detailed facial textures" },
  { label: "Premium Studio", fix: "set against a clean minimalist studio backdrop, soft diffusion paper" },
  { label: "Soft Shadows", fix: "under soft ambient light with gentle gradient shadows, warm atmosphere" },
  { label: "Ultra High Detail", fix: "extremely detailed texture, photorealistic rendering, 8k resolution" },
  { label: "Depth of Field", fix: "shallow depth of field, sharp foreground subject, beautifully blurred background" }
];
