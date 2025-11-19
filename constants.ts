
import { Project } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    title: 'MULTI-OMIC DATA INTEGRATION',
    description: 'Developed a multimodal learning framework to predict 5-year survivability and recurrence rates in head and neck tumor cases. Integrated whole-slide image features from CLAM with structured clinical data using ClinicalBERT and low-rank bilinear fusion, achieving an AUC of 0.75.',
    year: '2024',
    role: 'RESEARCHER',
    images: [
      'https://picsum.photos/800/600?random=20',
      'https://picsum.photos/800/600?random=21',
      'https://picsum.photos/800/600?random=22'
    ]
  },
  {
    id: 'p2',
    title: 'SURGICAL SCENE UNDERSTANDING',
    description: 'Designed an end-to-end system integrating surgical video data and panoptic segmentations. Trained an S2-Scaled SwinUNETR for segmentation across 21 classes and fine-tuned MedGemma using QLoRA for scene graph generation.',
    year: '2024',
    role: 'ML ENGINEER',
    images: [
      'https://picsum.photos/800/600?random=23',
      'https://picsum.photos/800/600?random=24',
      'https://picsum.photos/800/600?random=25'
    ]
  },
  {
    id: 'p3',
    title: 'C.A.R.E PROJECT',
    description: 'Collaborative AI Resources for Expectant Mothers. Built an accessible AI assistant on LLMs with RAG to help expectant mothers with gestational diabetes. Deployed via WhatsApp for inclusivity in low-resource settings.',
    year: '2024',
    role: 'LEAD DEV',
    images: [
      'https://picsum.photos/800/600?random=26',
      'https://picsum.photos/800/600?random=27'
    ]
  },
  {
    id: 'p4',
    title: 'MEDICAL GENERATIVE AI',
    description: 'Designed a super-resolution and denoising framework for CT scans to reduce radiation exposure. Implemented Deep Convolutional GANs to generate synthetic medical image data for self-supervised pre-training.',
    year: '2023',
    role: 'RESEARCHER',
    images: [
      'https://picsum.photos/800/600?random=28',
      'https://picsum.photos/800/600?random=29',
      'https://picsum.photos/800/600?random=30'
    ]
  }
];

export const GEMINI_MODEL_TEXT = 'gemini-3-pro-preview';
export const GEMINI_MODEL_VISION = 'gemini-3-pro-preview';
