import axios from 'axios';
import { SUGGESTION_CHIPS } from './presets';

// Helper to check what details are missing in user prompt
function analyzePromptLocally(description) {
  const text = description.toLowerCase();
  const missing = [];
  const suggestions = [];
  const checklist = ["Added prompt optimization for the selected AI model"];

  // 1. Lighting check
  const hasLighting = ['light', 'shadow', 'glow', 'illumination', 'sunlight', 'neon', 'bright', 'dark', 'dim', 'golden hour', 'studio'].some(kw => text.includes(kw));
  if (!hasLighting) {
    missing.push("Lighting information is missing.");
    suggestions.push(SUGGESTION_CHIPS[0]); // Cinematic Lighting
    suggestions.push(SUGGESTION_CHIPS[1]); // Golden Hour Glow
  } else {
    checklist.push("Added lighting details");
  }

  // 2. Camera check
  const hasCamera = ['shot', 'angle', 'camera', 'close-up', 'view', 'lens', 'focal', 'zoom', 'aperture', 'depth of field', 'macro', 'wide'].some(kw => text.includes(kw));
  if (!hasCamera) {
    missing.push("Camera angle could improve realism.");
    suggestions.push(SUGGESTION_CHIPS[2]); // Close-up
    suggestions.push(SUGGESTION_CHIPS[6]); // Depth of field
  } else {
    checklist.push("Added camera angle");
  }

  // 3. Background check
  const hasBg = ['background', 'backdrop', 'scenery', 'set in', 'backdrop', 'behind', 'underwater', 'forest', 'city', 'studio', 'minimalist'].some(kw => text.includes(kw));
  if (!hasBg) {
    missing.push("Background details would make the output stronger.");
    suggestions.push(SUGGESTION_CHIPS[3]); // Premium Background
  } else {
    checklist.push("Added background details");
  }

  // 4. Style check
  const hasStyle = ['style', 'anime', 'photorealistic', 'cartoon', 'render', 'illustration', 'watercolor', 'sketch', 'painting', 'minimal', 'cyberpunk', '3d'].some(kw => text.includes(kw));
  if (!hasStyle) {
    missing.push("Artistic style was not specified.");
    suggestions.push(SUGGESTION_CHIPS[5]); // High Detail
  } else {
    checklist.push("Added artistic style");
  }

  // Fallback defaults to fill suggestions
  while (suggestions.length < 4) {
    const randomChip = SUGGESTION_CHIPS[Math.floor(Math.random() * SUGGESTION_CHIPS.length)];
    if (!suggestions.some(s => s.label === randomChip.label)) {
      suggestions.push(randomChip);
    }
  }

  // Determine strength
  let strength = 'Good';
  if (missing.length >= 3) {
    strength = 'Needs Improvement';
  } else if (missing.length === 2) {
    strength = 'Needs More Details';
  } else if (missing.length === 0) {
    strength = 'Excellent';
  }

  return { missing, suggestions, checklist, strength };
}

// Client-side local prompt generator (fallback when API Key is missing)
export function getLocalFallbackEnhancement(description, { purpose, model, creativity, negativePrompt, keywords }) {
  const analysis = analyzePromptLocally(description);
  
  // Basic structure generator
  const subject = description;
  let style = "Photorealistic digital art";
  let lighting = "Cinematic volumetric lighting";
  let composition = "Center-focused, balanced framing";
  let camera = "Shallow depth of field, 85mm lens";
  let background = "Elegant subtle studio backdrop";
  let mood = "Professional, premium and clean";
  let rendering = "Octane Render, 8K resolution, raytracing details";

  // Customize based on purpose
  if (purpose === 'logo') {
    style = "Minimalist vector logo, flat design, modern branding icon";
    composition = "Centered vector element, clean negative space";
    background = "Solid clean white background";
    rendering = "Sharp vector lines, high contrast, SVG look";
  } else if (purpose === 'youtube') {
    style = "Vibrant high-contrast gaming concept art";
    lighting = "Bright glowing neon accent lighting";
    composition = "Dynamic close-up framing, YouTube safe-zones optimized";
    rendering = "Highly stylized 3D model look, saturated colors";
  } else if (purpose === 'linkedin') {
    style = "Professional clean abstract vector pattern";
    composition = "Landscape wide framing, perfect corporate aspect ratio";
    background = "Soft corporate blue and gray gradients";
  }

  // Customize based on model formatting
  let enhancedPrompt = "";
  const baseParts = [subject, style, lighting, composition, camera, background, mood, rendering];
  if (keywords) baseParts.push(keywords);
  const cleanParts = baseParts.filter(Boolean);

  if (model === 'midjourney') {
    let aspect = "--ar 16:9";
    if (purpose === 'instagram' || purpose === 'logo') aspect = "--ar 1:1";
    enhancedPrompt = `${cleanParts.join(', ')} --v 6.0 ${aspect}`;
  } else if (model === 'dalle') {
    enhancedPrompt = `A professional detailed image depicting: ${cleanParts.join('. ')}. Ensure composition is clean and premium, and textures are high fidelity.`;
  } else {
    enhancedPrompt = cleanParts.join(', ');
  }

  // Explanations for why improvements were made
  const explanations = [
    `Structured the subject text to emphasize the core idea: "${description}"`,
    `Adjusted the style tokens to target the "${model}" render engine.`,
    `Added professional composition keywords suitable for a "${purpose}" layout.`,
    `Appended advanced lighting and render detail tokens to match a "${creativity}" creativity setting.`
  ];

  return {
    enhancedPrompt,
    structuredPrompt: {
      Subject: subject,
      Style: style,
      Lighting: lighting,
      Composition: composition,
      Camera: camera,
      Background: background,
      Mood: mood,
      Rendering: rendering
    },
    quality: analysis.strength,
    strengthFeedback: analysis.missing.length > 0 ? analysis.missing : ["Your prompt is rich in details and follows proper structures."],
    suggestions: analysis.suggestions,
    explanations,
    checklist: analysis.checklist
  };
}

// Call Gemini API to enhance and analyze prompt
export async function enhancePromptWithGemini(description, options, apiKey) {
  if (!apiKey) {
    return getLocalFallbackEnhancement(description, options);
  }

  const { purpose, model, creativity, negativePrompt, keywords } = options;

  const systemInstruction = `You are ImagineFlow AI, an elite AI prompt engineering assistant. Your job is to convert a user's simple description into a structured, professional-grade image prompt.
You must output your response STRICTLY as a JSON object. Do not include markdown code blocks or wrapper text, just the raw JSON.
The JSON must follow this exact schema:
{
  "enhancedPrompt": "Complete merged prompt ready for copy-pasting to the image generator",
  "structuredPrompt": {
    "Subject": "Detailed subject descriptions, character attributes, textures",
    "Style": "Artistic medium, historical movement, or digital technique (e.g. 3D Render, Anime, Oil Painting, Photorealistic)",
    "Lighting": "Lighting setup, shadow styles, illumination sources (e.g. Golden hour, studio lighting, neon rim light)",
    "Composition": "Framing rules, positioning, depth (e.g. Rule of thirds, center-focused, dynamic low-angle)",
    "Camera": "Camera angles, lens choices, depth of field details (e.g. Macro lens, wide angle, f/1.8, 50mm)",
    "Background": "Backdrop environment scenery details",
    "Mood": "Emotional feel or tone (e.g. Playful, dark, luxury, professional)",
    "Rendering": "Engine-specific tags, resolution tokens, and render engines (e.g. Octane Render, Raytraced, 8k)"
  },
  "quality": "Excellent" | "Good" | "Needs More Details" | "Needs Improvement",
  "strengthFeedback": [
    "List details that are missing, e.g., 'Lighting information is missing', or praise if excellent"
  ],
  "suggestions": [
    { "label": "Short action suggestion, e.g., 'Add Golden Hour'", "fix": "the text to append to the prompt, e.g., ', golden hour light, soft orange sun beams'" }
  ],
  "explanations": [
    "Brief bullet points explaining why specific prompt engineering decisions were made"
  ],
  "checklist": [
    "Animated list of checklist items, e.g. 'Added lighting', 'Added camera angle', 'Added composition', 'Added rendering quality', 'Added background details', 'Added artistic style', 'Added prompt optimization for the selected AI model'"
  ]
}

Guidelines for Target Models:
- Midjourney: Add parameters like --ar 16:9, --stylize, or --v 6.0 based on settings. Join parameters with commas and append tags.
- DALL-E 3: Use descriptive, narrative sentences. Avoid technical flags like --ar.
- FLUX / Stable Diffusion: Use descriptive tags separated by commas.
- Gemini: Use rich, coherent natural language description.

Adjust the imaginative scale based on creativity:
- Precise: Stay close to the user's literal words.
- Balanced: Add realistic details and style enhancements.
- Creative: Make it extremely imaginative, cinematic, and artistically rich.`;

  const promptText = `User Description: "${description}"
Selected Purpose: ${purpose}
Target Model: ${model}
Creativity Level: ${creativity}
Additional Keywords: "${keywords || 'None'}"
Negative Prompt Constraints: "${negativePrompt || 'None'}"`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemInstruction}\n\nUser Input:\n${promptText}` }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: creativity === 'precise' ? 0.2 : creativity === 'balanced' ? 0.7 : 1.0
        }
      }
    );

    const jsonText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!jsonText) throw new Error("No output from Gemini API");

    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Gemini API call failed, falling back to local enhancement:", error);
    // Graceful fallback to local generator
    return getLocalFallbackEnhancement(description, options);
  }
}

// Call Gemini API to perform a rapid style rewrite on an existing prompt
export async function rewritePromptStyleWithGemini(promptText, styleLabel, targetModel, apiKey) {
  if (!apiKey) {
    // Simple local rewrite fallback
    return {
      enhancedPrompt: `${promptText}, rewritten in ${styleLabel} style, optimized for ${targetModel}`
    };
  }

  const systemInstruction = `You are a prompt editing assistant. Take the user's prompt and rewrite it to fit the requested style. Keep the core subject intact, but rewrite the rendering, style, lighting, and mood tokens to match the requested style.
Output your response strictly as a JSON object matching this schema:
{
  "enhancedPrompt": "The rewritten full prompt"
}`;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            role: 'user',
            parts: [{ text: `${systemInstruction}\n\nPrompt to rewrite: "${promptText}"\nNew Style: ${styleLabel}\nTarget Model: ${targetModel}` }]
          }
        ],
        generationConfig: {
          responseMimeType: "application/json"
        }
      }
    );

    const jsonText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!jsonText) throw new Error("No output from Gemini API");

    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Gemini rewrite failed:", error);
    return {
      enhancedPrompt: `${promptText}, ${styleLabel} style`
    };
  }
}
