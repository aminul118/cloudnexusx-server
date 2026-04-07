/* eslint-disable no-console */
import mongoose from 'mongoose';
import { Service } from '../modules/Service/Service.model';
import config from '../config/env';

const services = [
  {
    title: 'Web Development',
    slug: 'web-development',
    description:
      'Custom, high-performance websites tailored to your business needs using modern technologies.',
    content:
      '<h1>Comprehensive Web Development</h1><p>Our web development services focus on creating fast, responsive, and secure websites that drive results. We specialize in Next.js, React, and Node.js to deliver cutting-edge digital experiences.</p>',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072',
    icon: 'Laptop',
  },
  {
    title: 'App Development',
    slug: 'app-development',
    description:
      'Transform your ideas into powerful mobile applications for iOS and Android platforms.',
    content:
      '<h1>Mobile App Innovation</h1><p>We build robust mobile applications that offer seamless user experiences and native performance. From concept to deployment, we cover the entire mobile lifecycle.</p>',
    image:
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2070',
    icon: 'Smartphone',
  },
  {
    title: 'Digital Strategy',
    slug: 'digital-strategy',
    description:
      'Data-driven digital strategies to help your brand grow and dominate the digital landscape.',
    content:
      '<h1>Strategic Digital Growth</h1><p>Navigate the complex digital world with confidence. Our digital strategy services include market analysis, competitive research, and long-term roadmap planning.</p>',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2026',
    icon: 'Compass',
  },
  {
    title: 'UI/UX Design',
    slug: 'ui-ux-design',
    description:
      'User-centric designs that are visually stunning and provide exceptional user experiences.',
    content:
      '<h1>Creative UI/UX Design</h1><p>Design is more than just looks; it is about how it works. We create intuitive interfaces that delight users and improve conversion rates through deep research and iterative testing.</p>',
    image:
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=2000',
    icon: 'Palette',
  },
  {
    title: 'Advanced SEO',
    slug: 'advanced-seo',
    description:
      'Improve your search engine rankings and drive organic traffic with our proven SEO techniques.',
    content:
      '<h1>Result-Orienter SEO</h1><p>Get found by the right audience. Our SEO services cover technical audits, keyword optimization, and high-quality backlink strategies to boost your visibility.</p>',
    image:
      'https://images.unsplash.com/photo-1571721795195-a2ca2d3370a9?q=80&w=2000',
    icon: 'TrendingUp',
  },
  {
    title: 'Cyber Security',
    slug: 'cyber-security',
    description:
      'Protect your digital assets and customer data with our comprehensive security solutions.',
    content:
      '<h1>Enterprise-Grade Security</h1><p>Stay ahead of threats with our cybersecurity services. We provide vulnerability assessments, security implementation, and continuous monitoring to keep your business safe.</p>',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070',
    icon: 'ShieldCheck',
  },
];

const seedServices = async () => {
  try {
    await mongoose.connect(config.DB_URL as string);
    console.log('Connected to database for seeding...');

    // Clear existing services (optional, but good for idempotency in development)
    await Service.deleteMany({});
    console.log('Cleared existing services.');

    const result = await Service.insertMany(services);
    console.log(`Successfully seeded ${result.length} services.`);

    await mongoose.disconnect();
    console.log('Disconnected from database.');
  } catch (error) {
    console.error('Error seeding services:', error);
    process.exit(1);
  }
};

seedServices();
