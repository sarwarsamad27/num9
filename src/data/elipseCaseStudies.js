// Project imagery and factual summaries adapted from the linked Elipse Studio pages.
// Keep the site's existing case-study components; do not import source-site markup.
const images = import.meta.glob('../assets/caseStudies/elipse/imported/*.webp', {
  eager: true,
  import: 'default',
});

const projects = [
  {
    slug: 'volvo-configurator', name: 'Volvo S90', cardTitle: 'Volvo Configurator',
    title: 'Real-Time Automotive', subtitle: 'Configuration',
    tags: ['Unreal Engine 5', 'Pixel Streaming', '3D Configuration'],
    summary: 'An internal studio benchmark explores how a detailed Volvo S90 experience can reach everyday browsers through cloud rendering. Customers can inspect automotive materials and configure the vehicle without installing a desktop application.',
    challenge: 'Detailed vehicle geometry, reflective paint and interior materials are demanding for phone and laptop graphics hardware.',
    solution: 'Unreal Engine 5 renders the scene remotely, with WebRTC streaming the interactive experience to the browser. Lighting and material changes remain part of the live scene.',
    outcomes: ['Browser access to a detailed automotive scene.', 'Interactive vehicle exploration and material selection.', 'A studio capability demonstration rather than a claimed Volvo client commission.'],
  },
  {
    slug: 'byd-shark-6-configurator', name: 'BYD Shark 6', cardTitle: 'BYD Shark 6',
    title: 'BYD Shark 6', subtitle: '3D Configurator',
    tags: ['3D Configuration', 'Product Visualization', 'Interactive Web'],
    summary: 'A browser-based BYD Shark 6 configurator presents the vehicle as an interactive product experience. The project pairs a vehicle preview with configuration controls.',
    challenge: 'Vehicle options need to be understood visually, beyond a single static photograph.',
    solution: 'The configurator provides a digital space for exploring the pickup and previewing customization choices.',
    outcomes: ['Interactive vehicle presentation.', 'A dedicated browser-based configurator.'],
  },
  {
    slug: 'kia-configurator', name: 'Kia Sportage', cardTitle: 'Kia Sportage',
    title: 'Kia Sportage', subtitle: 'Interactive 3D',
    tags: ['PlayCanvas', 'WebGL', 'Vehicle Configuration'],
    summary: 'The Kia Sportage configurator brings exterior choices and interior exploration into a browser-based 3D experience. It combines paint and wheel selection with interactive vehicle details.',
    challenge: 'Deliver convincing automotive materials and responsive interaction without relying on a cloud-rendered video stream.',
    solution: 'A PlayCanvas implementation supports day, night and studio environments, animated doors and a panoramic cockpit view. Users can compare finishes while exploring the vehicle.',
    outcomes: ['Exterior paint and wheel previews.', 'Interactive doors and interior exploration.', 'Multiple lighting environments in a browser-native experience.'],
  },
  {
    slug: 'costa-carts', sourceSlug: 'Costa-cart', imageSlug: 'costa-cart', name: 'Costa Carts', cardTitle: 'Costa Carts',
    title: 'Build Your', subtitle: 'Golf Cart',
    tags: ['Product Configuration', '3D Visualization', 'Interactive Web'],
    summary: 'Costa Carts presents golf cart personalization as an interactive shopping experience. Customers can explore models, finishes and color combinations before deciding on their preferred configuration.',
    challenge: 'Help shoppers understand how individual choices will look together on a complete cart.',
    solution: 'Real-time product visualization connects customization controls to a clear cart preview, making options easier to compare.',
    outcomes: ['Visual comparison of cart configurations.', 'An accessible digital product preview.', 'A focused customization journey.'],
  },
  {
    slug: 'interactive-virtual-tour', sourceSlug: 'tim-barth', imageSlug: 'tim-barth', name: 'Interactive Virtual Tour', cardTitle: 'Interactive Virtual Tour',
    title: 'Explore Spaces', subtitle: 'From Anywhere',
    tags: ['Virtual Tour', 'Spatial Navigation', 'Architectural Visualization'],
    summary: 'An interactive virtual tour lets visitors explore a space remotely, discover important areas and inspect environmental details through a digital experience.',
    challenge: 'Make movement through a virtual space intuitive while maintaining a realistic sense of the environment.',
    solution: 'The experience combines architectural visuals with clear navigation so visitors can move between areas and examine the space at their own pace.',
    outcomes: ['Remote exploration of an architectural environment.', 'A visual alternative to static property photographs.', 'Self-directed navigation through key spaces.'],
  },
  {
    slug: 'ahmed-foods', name: 'Ahmed Foods', cardTitle: 'Ahmed Foods',
    title: 'Food Stories', subtitle: 'In CGI',
    tags: ['CGI Production', 'Product Animation', 'Fluid Simulation'],
    summary: 'Ahmed Foods product films use digital food styling, detailed packaging and animated ingredients to create commercial visuals for broadcast and online campaigns.',
    challenge: 'Physical food shoots introduce fragile ingredients, unpredictable splashes and costly reshoots when packaging or creative direction changes.',
    solution: 'A digital production pipeline combines product models, food textures, controlled lighting and fluid simulations. Reusable scenes support alternate camera angles and campaign formats.',
    outcomes: ['Product-focused commercial animations.', 'Reusable digital scenes for campaign variations.', 'Broadcast, social and still-image outputs.'],
  },
  {
    slug: 'malka-foods', name: 'Malka Foods', cardTitle: 'Malka Foods',
    title: 'Culinary Products', subtitle: 'In Motion',
    tags: ['3D Rendering', 'CGI Animation', 'Commercial Production'],
    summary: 'A CGI commercial presents Malka Foods packaging and culinary ingredients through detailed rendering and animated visual storytelling.',
    challenge: 'Give spice products and packaging a convincing material appearance while keeping the imagery energetic and visually clear.',
    solution: 'Digital lighting, ingredient simulations and camera movement bring the product range into a controlled commercial scene.',
    outcomes: ['Rendered packaging and ingredient visuals.', 'Animated content for television and digital campaigns.', 'A visual breakdown of the CGI production.'],
  },
  {
    slug: 'inverex-configurator', name: 'INVEREX EV Bike', cardTitle: 'Electric Motorcycle Launch',
    title: 'Electric Mobility', subtitle: 'In Interactive 3D',
    tags: ['WebGL', 'Product Visualization', '3D Configuration'],
    summary: 'The INVEREX electric bike is presented in a browser-based 3D configurator. Visitors can examine its shape and details from different viewpoints.',
    challenge: 'Provide a useful product preview for people who cannot inspect the motorcycle in a physical showroom.',
    solution: 'WebGL visualization lets visitors rotate the bike and explore its design directly in the browser.',
    outcomes: ['Multi-angle electric motorcycle visualization.', 'An interactive showroom-style product preview.', 'Browser access without a dedicated application.'],
  },
  {
    slug: 'rooh-afza', sourceSlug: 'anamorphic-animation', imageSlug: 'anamorphic-animation', name: 'Rooh Afza', cardTitle: 'Rooh Afza',
    title: 'A Landmark', subtitle: 'Anamorphic Experience',
    tags: ['Anamorphic CGI', 'Outdoor Advertising', 'Fluid Simulation'],
    summary: 'Created with lead agency Digitz, the Rooh Afza installation uses a corner LED display to turn beverage imagery into a forced-perspective outdoor experience.',
    challenge: 'The illusion depends on the relationship between screen dimensions and the audience viewing position.',
    solution: 'Storyboards establish the visual sequence, while surveyed sightlines inform a virtual scene matched to the two screen faces. Animated syrup and greenery provide depth and contrast.',
    outcomes: ['A site-specific corner-screen animation.', 'Beverage imagery with an apparent pop-out effect.', 'CGI footage adapted to the installation viewpoint.'],
  },
  {
    slug: 'lahore-zoo', name: 'Lahore Zoo & Safari', cardTitle: '3D Anamorphic Wildlife Display',
    title: 'Wildlife Beyond', subtitle: 'The Screen',
    tags: ['Anamorphic Animation', 'Creature CGI', 'Outdoor Experience'],
    summary: 'A corner-screen wildlife animation turns an urban display into a digital safari, revealing a jungle scene and a leopard through an architectural illusion.',
    challenge: 'A convincing forced-perspective effect requires accurate alignment with the screen and the pedestrian viewing position.',
    solution: 'On-site viewpoint research informed the virtual camera. Animated masonry, vegetation and creature movement combine to suggest depth beyond the flat display.',
    outcomes: ['A wildlife sequence designed for a specific LED installation.', 'Integrated creature animation and environmental effects.', 'A public-facing digital safari experience.'],
  },
  {
    slug: 'cap-configurator', name: 'Student Life', cardTitle: 'Student Life Cap Configurator',
    title: 'Your Graduation', subtitle: 'Your Cap',
    tags: ['PlayCanvas', 'Product Personalization', 'E-Commerce'],
    summary: 'Student Life brings Danish graduation-cap customization into an interactive 3D experience. Students can explore materials and personal details before ordering their keepsake.',
    challenge: 'Show the character of fabrics, emblems and embroidery while keeping the experience usable on both phones and desktop computers.',
    solution: 'Baked lighting and material shaders support the cap preview. Separate mobile and desktop builds connect customization, sizing and pricing to the purchase journey.',
    outcomes: ['Personalized cap previews.', 'Material, emblem and embroidery choices.', 'Customization connected to sizing and checkout.'],
  },
  {
    slug: 't-shirt-configurator', name: 'T-shirt Configurator', cardTitle: 'T-shirt Configurator',
    title: 'Apparel', subtitle: 'In Interactive 3D',
    tags: ['Apparel Visualization', 'Product Configuration', 'Interactive Web'],
    summary: 'An interactive T-shirt configurator presents apparel as a digital product preview, with controls for exploring a personalized design.',
    challenge: 'Make design choices easier to understand on a garment preview.',
    solution: 'The project combines a T-shirt visualization with configuration controls in a browser-based interface.',
    outcomes: ['An interactive apparel preview.', 'A dedicated product configurator experience.'],
  },
];

export const elipseCaseStudies = Object.fromEntries(projects.map((project) => {
  const imageSlug = project.imageSlug || project.slug;
  const gallery = Object.entries(images)
    .filter(([path]) => path.includes(`/${imageSlug}-`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, url]) => url);
  const hero = gallery[0];
  if (!hero) throw new Error(`Missing project imagery: ${project.slug}`);
  return [project.slug, {
    id: project.slug, slug: project.slug, name: project.name, breadcrumbName: project.name,
    sourceUrl: `https://elipsestudio.com/project/${project.sourceSlug || project.slug}`,
    hero: {
      subheading: `${project.name.toUpperCase()} CASE STUDY`,
      titleLine1: project.title, titleLine2: project.subtitle,
      bgImage: hero, accentColor: '#3FC000', tags: project.tags,
    },
    overviewSection: {
      summaryHeading: 'The summary', summaryText: project.summary,
      brandLabel: project.name, showcaseImage: hero,
      showcaseAlt: `${project.name} project preview`, projectTags: project.tags, showStats: false,
    },
    storySection: {
      about: { title: 'About', clientName: project.name, description: project.summary },
      challenge: { heading: 'The challenge', image: gallery[1] || hero, imageAlt: `${project.name} detail`, leftParagraphs: [project.challenge] },
      solution: { heading: 'The solution.', image: gallery[2] || hero, imageAlt: `${project.name} experience`, description: project.solution },
      services: { heading: 'Key Services Delivered.', items: project.tags },
      outcome: {
        heading: 'The outcome', intro: 'Project highlights:', bullets: project.outcomes, galleryFit: 'natural',
        galleryImages: Array.from({ length: 3 }, (_, i) => ({ src: gallery[i + 1] || gallery[i] || hero, title: project.name, subtitle: 'PROJECT SHOWCASE' })),
      },
    },
  }];
}));

export const elipseWorkLinks = Object.fromEntries(projects.map(project => [project.cardTitle, `case-study/${project.slug}`]));

export const additionalElipseWorks = projects.filter(project => ['cap-configurator', 't-shirt-configurator'].includes(project.slug)).map(project => ({
  title: project.cardTitle,
  image: elipseCaseStudies[project.slug].hero.bgImage,
  category: 'Interactive 3D Configurator',
  description: project.summary,
  link: `case-study/${project.slug}`,
}));
