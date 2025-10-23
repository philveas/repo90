
import type { ServiceKey } from '@/lib/service-icons';


export type Service = {
key: ServiceKey;
title: string;
blurb: string;
imageId: string; // id from placeholder-images.json
};


export const services: Service[] = [
{
key: 'noise-survey',
title: 'Noise Survey',
blurb: 'Low cost, accurate and comprehensive environmental noise, workplace noise and noise monitoring services across the UK',
imageId: 'service-noise-survey',
},
{
key: 'noise-impact-assessment',
title: 'Noise Impact Assessment',
blurb: 'Comprehensive noise assessments for all design and planning needs',
imageId: 'service-noise-impact-assessment',
},
{
key: 'acoustic-planning-support',
title: 'Acoustic Planning Support',
blurb: 'Expert acoustic support to help navigate the planning process',
imageId: 'service-acoustic-planning-support',
},
{
key: 'building-acoustics',
title: 'Building Acoustics',
blurb: 'Building acoustic design for all sectors of the built environment',
imageId: 'service-architectural-acoustics',
},
{
key: 'acoustic-consultant',
title: 'Acoustic Consultant',
blurb: 'Independent, practical and reliable acoustic consultancy from concept to completion',
imageId: 'service-acoustic-consultant',
},
];