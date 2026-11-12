import { TechToolCategory } from '../types';

export const TOOLKIT_CATEGORIES: TechToolCategory[] = [
  {
    title: 'AI & Generative Tools',
    tools: [
      { name: 'ChatGPT', description: 'Conceptual ideation, script treatments & structural narrative angles' },
      { name: 'Claude', description: 'In-depth storytelling, metaphorical world-building & editorial treatments' },
      { name: 'Gemini', description: 'Multimodal visual analysis, creative benchmarking & trend scouting' },
      { name: 'Higgsfield', description: 'Generative character performance & stylized visual synthesis' }
    ]
  },
  {
    title: 'Image & Video Generation',
    tools: [
      { name: 'Google Flow', description: 'Spatial camera trajectories, neural lighting & volumetric atmosphere' },
      { name: 'Kling AI', description: 'High-precision physics simulation, macro fluid dynamics & motion coherence' },
      { name: 'Seedance', description: 'Dynamic movement choreography & kinetic styling' },
      { name: 'Emerging Video Models', description: 'Continuous integration of next-gen generative video frameworks' }
    ]
  },
  {
    title: 'Audio & Soundscapes',
    tools: [
      { name: 'ElevenLabs', description: 'Cinema-grade voice synthesis & emotional cadence direction' },
      { name: 'Suno AI', description: 'Custom generative orchestral scores & rhythmic atmospheric textures' }
    ]
  },
  {
    title: 'Post-Production & Polish',
    tools: [
      { name: 'Adobe Premiere Pro', description: 'Timeline pacing, surgical editing, color science & master exports' },
      { name: 'Canva', description: 'Typography layout, promotional frames & social design assets' }
    ]
  }
];

// Flat export for backwards compatibility
export const TECH_STACK = TOOLKIT_CATEGORIES.flatMap(cat => 
  cat.tools.map(t => ({
    category: cat.title as any,
    name: t.name,
    description: t.description
  }))
);
