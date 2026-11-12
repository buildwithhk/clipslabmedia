import { CreativeProcessStep, WorkflowStage } from '../types';

export const CREATIVE_PROCESS_STEPS: CreativeProcessStep[] = [
  {
    number: '01',
    title: 'IDEATION',
    subtitle: 'Concept & Aesthetic Research',
    description: 'Understanding the brief, researching references and developing the creative concept.',
    details: [
      'Deconstructing brand essence, target emotions, and core visual metaphors',
      'Curating cinematic references, moodboards, and light/material studies',
      'Authoring narrative treatments and scene-by-scene script breakdowns'
    ]
  },
  {
    number: '02',
    title: 'CREATIVE DIRECTION',
    subtitle: 'Visual Language & Architecture',
    description: 'Building the visual language, storyboard, shot design and cinematic direction.',
    details: [
      'Establishing framing ratios, color palette logic, and camera focal lengths',
      'Architecting visual storyboards and camera choreography guides',
      'Defining lighting aesthetics from soft volumetric fog to dramatic anamorphic flares'
    ]
  },
  {
    number: '03',
    title: 'AI PRODUCTION',
    subtitle: 'Neural Synthesis & Video Generation',
    description: 'Generating and refining visuals, characters, environments and motion using modern AI production tools.',
    details: [
      'Orchestrating state-of-the-art generative video models (Kling AI, Google Flow, Seedance, Higgsfield)',
      'Fine-tuning prompt syntax, seed variations, and physics simulations',
      'Synthesizing photorealistic textures, micro-fluids, and dynamic motion sequences'
    ]
  },
  {
    number: '04',
    title: 'POST-PRODUCTION',
    subtitle: 'Editing, Sound & Final Delivery',
    description: 'Editing, sound design, color grading and final delivery.',
    details: [
      'Precision pacing and editorial cutdowns inside Adobe Premiere Pro',
      'Custom foley effects, cinematic atmos, and sonic scoring (ElevenLabs & Suno AI)',
      'Cinema color grading and multi-platform 4K UHD masters (16:9, 9:16, 1:1)'
    ]
  }
];

export const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    id: 'ideation',
    title: '01 // Ideation',
    subtitle: 'Concept & Aesthetic Research',
    description: 'Understanding the brief, researching references and developing the creative concept.',
    deliverables: ['Moodboards', 'Narrative Treatments', 'Reference Benchmarks'],
    contribution: 'Locks in creative direction and artistic intent.'
  },
  {
    id: 'direction',
    title: '02 // Creative Direction',
    subtitle: 'Visual Language & Storyboard',
    description: 'Building the visual language, storyboard, shot design and cinematic direction.',
    deliverables: ['Frame Storyboard', 'Camera Trajectory Maps', 'Lighting Palette'],
    contribution: 'Maps out visual architecture before generative rendering.'
  },
  {
    id: 'ai-production',
    title: '03 // AI Production',
    subtitle: 'Generative Synthesis',
    description: 'Generating and refining visuals, characters, environments and motion using modern AI production tools.',
    deliverables: ['Generative Video Passes', 'Fluid Simulations', 'Coherent Shots'],
    contribution: 'Delivers impossible camera moves and high-concept imagery.'
  },
  {
    id: 'post-production',
    title: '04 // Post-Production',
    subtitle: 'Editing, Sound & Color',
    description: 'Editing, sound design, color grading and final delivery.',
    deliverables: ['Master 4K Video Files', 'Audio Stem Mix', 'Multi-Ratio Exports'],
    contribution: 'Transforms raw generative fragments into polished cinema.'
  }
];
