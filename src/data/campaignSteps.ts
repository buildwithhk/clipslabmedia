import { CampaignStep } from '../types';

export const CAMPAIGN_STEPS: CampaignStep[] = [
  {
    step: '01',
    name: 'Brand Discovery',
    tagline: 'Deconstruct the Product & Target Audience',
    description: 'We immerse ourselves into your product mechanics, audience psychographics, competitive landscape, and key emotional value proposition.',
    outputs: ['Brand Alignment Deck', 'Product USP Analysis', 'Audience Hook Matrix'],
    impact: 'Builds an unshakeable commercial foundation so every visual decision drives buyer desire.',
    duration: 'Day 1'
  },
  {
    step: '02',
    name: 'Creative Strategy',
    tagline: 'Architecting the Campaign World',
    description: 'We develop 2-3 bold creative concepts, core messaging taglines, and distinct visual treatments that set your brand apart in your category.',
    outputs: ['Campaign Treatment Document', 'Moodboards & Lighting R&D', 'Script & Dialogue Drafts'],
    impact: 'Selects the single highest-leverage narrative angle before a single frame is generated.',
    duration: 'Day 2'
  },
  {
    step: '03',
    name: 'Visual Development',
    tagline: 'Storyboarding & Neural Architecture',
    description: 'We translate selected concepts into granular visual frames, establishing 3D-inspired environments, color scripts, and hyper-detailed product references.',
    outputs: ['Visual Storyboard (Frame-by-Frame)', 'Environment & Material Archetypes', 'Style Reference Assets'],
    impact: 'Ensures absolute client alignment and eliminates guesswork prior to motion synthesis.',
    duration: 'Day 3'
  },
  {
    step: '04',
    name: 'Hero Film Production',
    tagline: 'Cinematic AI Generation & Pacing',
    description: 'We run multi-pass generative workflows across cutting-edge video synthesis models (Kling AI, Google Flow, Seedance), directing motion, lighting, and composition.',
    outputs: ['4K UHD Hero Commercial Master', 'Custom Sound Design & Sonic Identity', 'Broadcast Color Grade'],
    impact: 'Delivers an awe-inspiring, high-prestige centerpiece ad that stops viewers in their tracks.',
    duration: 'Day 4 - 5'
  },
  {
    step: '05',
    name: 'Campaign Asset Production',
    tagline: 'Multi-Channel Creative Multiplier',
    description: 'We spin the hero world into a high-converting ecosystem: vertical 9:16 cuts, high-energy 6-second bumpers, problem/solution hooks, and static editorial stills.',
    outputs: ['10-15 Platform Cutdowns (9:16, 1:1, 16:9)', 'High-Resolution 3D Editorial Stills', 'Short-Form Hook Variations'],
    impact: 'Provides your media buyers and social teams with a rich arsenal of creative assets.',
    duration: 'Day 6 - 7'
  },
  {
    step: '06',
    name: 'Final Delivery',
    tagline: 'Platform-Ready Deployment & Support',
    description: 'Assets are rendered, tagged, organized into cloud vaults with complete platform aspect ratios, closed captions, and clean audio stems ready for ad managers.',
    outputs: ['Master Asset Vault (ProRes & H.265)', 'Meta & TikTok Optimized Files', 'Ad Account Creative Guide'],
    impact: 'Seamless handover with zero technical friction so your campaign can launch immediately.',
    duration: 'Day 8'
  }
];
