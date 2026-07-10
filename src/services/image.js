import axios from 'axios';

// Get dimensions based on purpose and model
export function getImageDimensions(purpose) {
  switch (purpose) {
    case 'instagram':
    case 'logo':
      return { width: 1024, height: 1024 }; // 1:1 Square
    case 'linkedin':
      return { width: 1024, height: 400 }; // LinkedIn Banner
    case 'youtube':
      return { width: 1024, height: 576 }; // 16:9 HD
    case 'hero':
      return { width: 1024, height: 512 }; // Wide Banner
    case 'poster':
    case 'packaging':
      return { width: 768, height: 1024 }; // Portrait
    case 'blog':
      return { width: 1024, height: 600 };
    case 'presentation':
    default:
      return { width: 1024, height: 768 }; // 4:3
  }
}

// Generate 4 image urls with different seeds
export function getImageUrlVariations(prompt, purpose) {
  const { width, height } = getImageDimensions(purpose);
  const cleanPrompt = encodeURIComponent(prompt.trim());
  
  // Create 4 distinct seeds (we'll only use first 2 initially in the UI flow)
  const seeds = [
    Math.floor(Math.random() * 999999) + 1,
    Math.floor(Math.random() * 999999) + 1,
    Math.floor(Math.random() * 999999) + 1,
    Math.floor(Math.random() * 999999) + 1
  ];

  return seeds.map(seed => ({
    seed,
    url: `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&private=true&model=flux`
  }));
}

// Generate 2 additional image urls with different seeds
export function getMoreImageUrlVariations(prompt, purpose) {
  const { width, height } = getImageDimensions(purpose);
  const cleanPrompt = encodeURIComponent(prompt.trim());
  
  const seeds = [
    Math.floor(Math.random() * 999999) + 1,
    Math.floor(Math.random() * 999999) + 1
  ];

  return seeds.map(seed => ({
    seed,
    url: `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&private=true&model=flux`
  }));
}

// Generate a single image url replacement (for regenerating only one image)
export function getSingleImageUrl(prompt, purpose, seed) {
  const { width, height } = getImageDimensions(purpose);
  const cleanPrompt = encodeURIComponent(prompt.trim());
  const finalSeed = seed || (Math.floor(Math.random() * 999999) + 1);
  return {
    seed: finalSeed,
    url: `https://image.pollinations.ai/prompt/${cleanPrompt}?width=${width}&height=${height}&seed=${finalSeed}&nologo=true&private=true&model=flux`
  };
}

// Download image locally via Blob fetching
export async function downloadImage(url, filename = 'imagineflow-generation.jpg') {
  try {
    // If the image is already a local base64 data URL or a blob URL, download it directly
    if (url.startsWith('data:') || url.startsWith('blob:')) {
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      return true;
    }

    const response = await axios.get(url, { responseType: 'blob' });
    const blob = new Blob([response.data], { type: 'image/jpeg' });
    const blobUrl = window.URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = blobUrl;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(blobUrl);
    return true;
  } catch (error) {
    console.error('Failed to download image:', error);
    // Fallback: open in new tab
    window.open(url, '_blank');
    return false;
  }
}

// Generate variations using Puter SDK (Stable Diffusion) to prevent concurrency locks
export async function getImageUrlVariationsPuter(prompt, purpose) {
  const puter = window.puter;
  if (!puter || !puter.ai) {
    console.warn("Puter SDK not initialized, falling back to standard mock seeds");
    return getImageUrlVariations(prompt, purpose);
  }

  try {
    // Trigger two generations in parallel
    const [img1, img2] = await Promise.all([
      puter.ai.txt2img(prompt + " , high quality photography style"),
      puter.ai.txt2img(prompt + " , high quality photography style, alternative composition")
    ]);
    
    return [
      { seed: Math.floor(Math.random() * 999999) + 1, url: img1.src },
      { seed: Math.floor(Math.random() * 999999) + 1, url: img2.src }
    ];
  } catch (err) {
    console.error("Puter AI generation failed, falling back to Pollinations", err);
    return getImageUrlVariations(prompt, purpose);
  }
}

// Generate a single image variation using Puter
export async function getSingleImageUrlPuter(prompt, purpose) {
  const puter = window.puter;
  if (!puter || !puter.ai) {
    return getSingleImageUrl(prompt, purpose);
  }
  
  try {
    const img = await puter.ai.txt2img(prompt + " , high quality photography style, variation");
    return {
      seed: Math.floor(Math.random() * 999999) + 1,
      url: img.src
    };
  } catch (err) {
    console.error("Puter single generation failed, falling back to Pollinations", err);
    return getSingleImageUrl(prompt, purpose);
  }
}
