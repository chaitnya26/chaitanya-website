import { useState, memo } from 'react';

// --- COMPLETE TECHNOLOGY STACK WITH FALLBACK CAPABLE SLUGS ---
const allTech = {
  Python: 'python',
  TypeScript: 'typescript',
  JavaScript: 'javascript',
  Bash: 'gnubash',
  C: 'c',
  'C++': 'cplusplus',
  Rust: 'rust',
  FastAPI: 'fastapi',
  LangChain: 'langchain',
  FAISS: 'meta',
  Docker: 'docker',
  Supabase: 'supabase',
  'HuggingFace Transformers': 'huggingface',
  LLMs: 'openai',
  'Prompt Engineering': 'none',
  RAG: 'none',
  'Embedding Systems': 'EmbeddingSystems',
  'VS Code': 'visualstudiocode',
  Poetry: 'python',
  GitHub: 'github',
  Railway: 'railway',
  Vite: 'vite',
  'Next.js': 'nextdotjs',
  React: 'react',
  TailwindCSS: 'tailwindcss',
  'Framer Motion': 'framer',
  ShadCN: 'shadcnui',
  Vercel: 'vercel',
  'IBM SPSS': 'ibm',
  Excel: 'microsoftexcel',
  PowerPoint: 'microsoftpowerpoint',
  SQL: 'postgresql',
  CATIA: 'dassaultsystemes',
  SolidWorks: 'solidworks',
  ANSYS: 'ansys',
  AutoCAD: 'autocad',
  Maya: 'autodeskmaya',
  Openfoam: 'openfoam',
  Photoshop: 'adobephotoshop',
  Illustrator: 'adobeillustrator',
  'Siemens NX': 'siemens',
  Figma: 'figma',
  'Adobe XD': 'adobexd',
  Framer: 'framer',
  Sketch: 'sketch',
  Webflow: 'webflow',
  Spline: 'spline',
  Bootstrap: 'bootstrap',
  'Material-UI': 'material-ui',
  'Chakra UI': 'chakra-ui',
  'ThreeJs': 'three-js',
  GSAP: 'greensock',
  Storybook: 'storybook',
  Zeplin: 'zeplin',
  InVision: 'invision',
  Lottie: 'lottie',
  TensorFlow: 'tensorflow',
  PyTorch: 'pytorch',
  'Hugging Face Hub': 'huggingface',
  Keras: 'keras',
  spaCy: 'spacy',
  YOLO: 'yolo',
  OpenCV: 'opencv',
  DVC: 'dvc',
  'Label Studio': 'labelstudio',
  'Stable Diffusion': 'stablediffusion',
  MATLAB: 'matlab',
  Simulink: 'simulink',
  LabVIEW: 'labview',
  'Altium Designer': 'altiumdesigner',
  'COMSOL Multiphysics': 'comsol',
  XFLR5: 'xflr5',
  'Dassault Systèmes 3DEXPERIENCE': 'dassaultsystemes',
  Abaqus: 'abaqus',
  SimScale: 'simscale',
  OpenRocket: 'openrocket',
  HTML5: 'html5',
  CSS3: 'css3',
  Sass: 'sass',
  Less: 'less',
  PostCSS: 'postcss',
  Bulma: 'bulma',
  Foundation: 'foundation',
  'Ant Design': 'antdesign',
  RedwoodJS: 'redwoodjs',
  'Nuxt.js': 'nuxtdotjs',
  'GatsbyJS': 'gatsby',
  Svelte: 'svelte',
  'Ember.js': 'emberdotjs',
  'Alpine.js': 'alpinelinux',
  Tailwind: 'tailwindcss',
  Jenkins: 'jenkins',
  'Travis CI': 'travisci',
  'CircleCI': 'circleci',
  GitLab: 'gitlab',
  Bitbucket: 'bitbucket',
  AWS: 'amazonaws',
  'Google Cloud': 'googlecloud',
  Azure: 'microsoftazure',
  DigitalOcean: 'digitalocean',
  Heroku: 'heroku',
  Jupyter: 'jupyter',
  Pandas: 'pandas',
  NumPy: 'numpy',
  'scikit-learn': 'scikitlearn',
  Spark: 'apachespark',
};

const techKeys = Object.keys(allTech);
const midPoint = Math.ceil(techKeys.length / 2);
const techRow1 = techKeys.slice(0, midPoint);
const techRow2 = techKeys.slice(midPoint);

// --- TechItem with multi-step fallback for logos (horizontal layout) ---
const TechItem = memo(({ name }: { name: string }) => {
  const slug: string = (allTech as any)[name];
  const [imgFailed, setImgFailed] = useState(false);
  const [imgSrc, setImgSrc] = useState(
    slug && slug !== 'none' ? `https://cdn.simpleicons.org/${slug}` : ''
  );
  const [triedBackup, setTriedBackup] = useState(false);
  const [triedLocal, setTriedLocal] = useState(false);

  const handleImgError = () => {
    if (!triedBackup && slug && slug !== 'none') {
      setImgSrc(`https://cdn.jsdelivr.net/npm/simple-icons@latest/icons/${slug}.svg`);
      setTriedBackup(true);
    } else if (!triedLocal && slug && slug !== 'none') {
      setImgSrc(`/icons/${slug}.svg`);
      setTriedLocal(true);
    } else {
      setImgFailed(true);
    }
  };

  if (slug === 'none' || imgFailed || !slug) {
    return (
      <li
        className="flex flex-row items-center gap-3 sm:gap-8 px-4 py-3 sm:px-8 sm:py-6 rounded-2xl justify-center select-none cursor-default hover:shadow-lg hover:scale-105 transition bg-transparent"
        title={name}
        role="listitem"
      >
        <img
          src="/generic.svg"
          alt="Generic logo fallback"
          draggable={false}
          className="h-8 w-8 sm:h-24 sm:w-24 object-contain opacity-100"
          loading="lazy"
        />
        <span className="font-sans font-bold text-lg sm:text-6xl text-black ">{name}</span>
      </li>
    );
  }

  return (
    <li
      className="flex flex-row items-center px-4 py-3 sm:px-8 sm:py-6 rounded-2xl bg-transparent select-none cursor-default hover:shadow-lg hover:scale-105 transition"
      title={name}
      role="listitem"
    >
      <img
        src={imgSrc}
        alt={name}
        className="h-8 w-8 sm:h-24 sm:w-24 object-contain drop-shadow-md transition-transform duration-300 hover:scale-110"
        onError={handleImgError}
        draggable={false}
        loading="lazy"
      />
      <span className="font-sans font-bold text-lg sm:text-6xl text-black ">{name}</span>
    </li>
  );
});

// --- FullWidthScroller with pause on hover/focus and accessibility ---
const FullWidthScroller = ({
  items,
  direction = 'left',
}: {
  items: string[];
  direction?: 'left' | 'right';
}) => {
  const [paused, setPaused] = useState(false);

  return (
    <nav
      className="w-full max-w-screen overflow-hidden relative left-1/2 -ml-[50vw] -mr-[50vw]"
      aria-label="Scrolling list of technology logos"
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div
        className={`inline-flex flex-nowrap min-w-[200vw] ${
          direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'
        }`}
        style={{
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        <ul className="flex items-center justify-center w-max space-x-6 sm:space-x-12" role="list">
          {items.map((name) => (
            <TechItem key={name} name={name} />
          ))}
        </ul>
        <ul className="flex items-center justify-center w-max space-x-6 sm:space-x-12" role="list">
          {items.map((name) => (
            <TechItem key={`${name}-2`} name={name} />
          ))}
        </ul>
      </div>
    </nav>
  );
};

// --- Main TechStack Section ---
export default function TechStack() {
  return (
    <section
      id="skills"
      className="relative w-screen py-16 sm:py-32 flex flex-col justify-center overflow-visible bg-white/40"
      aria-label="Technology Stack"
      style={{
        top: '-1px',
        minHeight: '60vh', // enough vertical room
      }}
    >
      <div className="w-full space-y-12 sm:space-y-20 px-4 sm:px-12">
        <h2 className="text-center font-sans text-3xl sm:text-4xl font-bold uppercase tracking-widest text-black select-none">
          TACTICAL ARSENAL
        </h2>
        <div className="space-y-8 sm:space-y-12 py-8 sm:py-16" role="list">
          <FullWidthScroller items={techRow1} direction="right" />
          <FullWidthScroller items={techRow2} direction="left" />
        </div>
      </div>
    </section>
  );
}
