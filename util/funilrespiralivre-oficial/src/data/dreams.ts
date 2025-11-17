import { DreamItem } from '@/types/funnel';

export const dreamCatalog: DreamItem[] = [
  // Tech Lover Dreams
  {
    id: 'iphone-15',
    name: 'iPhone 15 Pro',
    price: 7999,
    image: '/api/placeholder/400/300',
    category: 'tech-lover',
    description: 'O mais novo iPhone com tecnologia de ponta',
    emotionalBenefit: 'Esteja sempre conectado com o que há de mais avançado'
  },
  {
    id: 'macbook-air',
    name: 'MacBook Air M3',
    price: 12999,
    image: '/api/placeholder/400/300',
    category: 'tech-lover',
    description: 'Laptop ultra-rápido para criatividade sem limites',
    emotionalBenefit: 'Transforme suas ideias em realidade com performance máxima'
  },
  {
    id: 'airpods-pro',
    name: 'AirPods Pro 2ª Geração',
    price: 2499,
    image: '/api/placeholder/400/300',
    category: 'tech-lover',
    description: 'Som imersivo com cancelamento de ruído ativo',
    emotionalBenefit: 'Desconecte-se do mundo e mergulhe na sua música'
  },
  {
    id: 'ps5',
    name: 'PlayStation 5',
    price: 4199,
    image: '/api/placeholder/400/300',
    category: 'tech-lover',
    description: 'Console de nova geração para gaming épico',
    emotionalBenefit: 'Viva aventuras incríveis nos seus momentos livres'
  },

  // Adventurer Dreams
  {
    id: 'viagem-europa',
    name: 'Mochilão pela Europa',
    price: 15000,
    image: '/api/placeholder/400/300',
    category: 'adventurer',
    description: '21 dias explorando 8 países europeus',
    emotionalBenefit: 'Colecione memórias inesquecíveis e amplie seus horizontes'
  },
  {
    id: 'camera-profissional',
    name: 'Câmera Sony A7 IV',
    price: 18999,
    image: '/api/placeholder/400/300',
    category: 'adventurer',
    description: 'Capture cada momento com qualidade profissional',
    emotionalBenefit: 'Eternize suas aventuras com imagens deslumbrantes'
  },
  {
    id: 'prancha-surf',
    name: 'Prancha de Surf Premium',
    price: 3500,
    image: '/api/placeholder/400/300',
    category: 'adventurer',
    description: 'Prancha profissional para dominar as ondas',
    emotionalBenefit: 'Sinta a liberdade e adrenalina do mar'
  },
  {
    id: 'curso-mergulho',
    name: 'Curso de Mergulho PADI',
    price: 2800,
    image: '/api/placeholder/400/300',
    category: 'adventurer',
    description: 'Certificação completa para explorar o mundo submarino',
    emotionalBenefit: 'Descubra um universo mágico debaixo d\'água'
  },

  // Family First Dreams
  {
    id: 'smart-tv-75',
    name: 'Smart TV 75" 4K',
    price: 8999,
    image: '/api/placeholder/400/300',
    category: 'family-first',
    description: 'Cinema em casa para toda família',
    emotionalBenefit: 'Momentos especiais juntos assistindo filmes e séries'
  },
  {
    id: 'festa-aniversario',
    name: 'Festa de Aniversário Completa',
    price: 5000,
    image: '/api/placeholder/400/300',
    category: 'family-first',
    description: 'Celebração inesquecível para seu ente querido',
    emotionalBenefit: 'Veja o sorriso e felicidade de quem você ama'
  },
  {
    id: 'curso-criancas',
    name: 'Curso Anual para os Filhos',
    price: 3600,
    image: '/api/placeholder/400/300',
    category: 'family-first',
    description: 'Investimento no futuro e desenvolvimento das crianças',
    emotionalBenefit: 'Proporcione o melhor futuro para seus filhos'
  },
  {
    id: 'jantar-romantico',
    name: 'Jantar Romântico Especial',
    price: 800,
    image: '/api/placeholder/400/300',
    category: 'family-first',
    description: 'Noite especial em restaurante requintado',
    emotionalBenefit: 'Fortaleça os laços do seu relacionamento'
  },

  // Luxury Seeker Dreams
  {
    id: 'relogio-luxo',
    name: 'Relógio Omega Seamaster',
    price: 25000,
    image: '/api/placeholder/400/300',
    category: 'luxury-seeker',
    description: 'Relógio suíço de prestígio internacional',
    emotionalBenefit: 'Demonstre seu sucesso e bom gosto refinado'
  },
  {
    id: 'bolsa-gucci',
    name: 'Bolsa Gucci Original',
    price: 8500,
    image: '/api/placeholder/400/300',
    category: 'luxury-seeker',
    description: 'Bolsa de couro legítimo da marca italiana',
    emotionalBenefit: 'Eleve seu estilo com elegância inconfundível'
  },
  {
    id: 'terno-hugo-boss',
    name: 'Terno Hugo Boss',
    price: 4200,
    image: '/api/placeholder/400/300',
    category: 'luxury-seeker',
    description: 'Alfaiataria alemã de alta costura',
    emotionalBenefit: 'Projete confiança e profissionalismo'
  },
  {
    id: 'perfume-importado',
    name: 'Perfume Tom Ford',
    price: 1800,
    image: '/api/placeholder/400/300',
    category: 'luxury-seeker',
    description: 'Fragrância exclusiva e sofisticada',
    emotionalBenefit: 'Deixe sua marca com uma assinatura olfativa única'
  }
];

export const getUpgradeOptions = (currentDream: DreamItem): DreamItem[] => {
  const sameCategoryDreams = dreamCatalog.filter(
    dream => dream.category === currentDream.category && dream.price > currentDream.price
  );
  
  return sameCategoryDreams.slice(0, 3);
};