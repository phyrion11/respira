import { QuizQuestion, ArchetypeResult } from '@/types/funnel';

export const quizQuestions: QuizQuestion[] = [
  {
    id: '1',
    question: 'Se você tivesse R$ 1.000 extras hoje, o que mais te animaria comprar?',
    options: [
      { 
        id: 'a', 
        text: 'Um novo smartphone ou gadget tecnológico', 
        archetype: 'tech-lover',
        points: 3 
      },
      { 
        id: 'b', 
        text: 'Uma viagem para um lugar incrível', 
        archetype: 'adventurer',
        points: 3 
      },
      { 
        id: 'c', 
        text: 'Algo especial para minha família', 
        archetype: 'family-first',
        points: 3 
      },
      { 
        id: 'd', 
        text: 'Uma peça de roupa ou acessório de marca', 
        archetype: 'luxury-seeker',
        points: 3 
      }
    ]
  },
  {
    id: '2',
    question: 'Qual dessas frases mais te representa?',
    options: [
      { 
        id: 'a', 
        text: 'Adoro estar sempre com os últimos lançamentos', 
        archetype: 'tech-lover',
        points: 2 
      },
      { 
        id: 'b', 
        text: 'Viver é colecionar experiências únicas', 
        archetype: 'adventurer',
        points: 2 
      },
      { 
        id: 'c', 
        text: 'Minha maior alegria é ver minha família feliz', 
        archetype: 'family-first',
        points: 2 
      },
      { 
        id: 'd', 
        text: 'Gosto de me destacar com estilo e qualidade', 
        archetype: 'luxury-seeker',
        points: 2 
      }
    ]
  },
  {
    id: '3',
    question: 'Em qual ambiente você se sente mais à vontade?',
    options: [
      { 
        id: 'a', 
        text: 'Uma loja de eletrônicos ou tech store', 
        archetype: 'tech-lover',
        points: 2 
      },
      { 
        id: 'b', 
        text: 'Um aeroporto pronto para embarcar', 
        archetype: 'adventurer',
        points: 2 
      },
      { 
        id: 'c', 
        text: 'Em casa com as pessoas que amo', 
        archetype: 'family-first',
        points: 2 
      },
      { 
        id: 'd', 
        text: 'Um shopping ou boutique elegante', 
        archetype: 'luxury-seeker',
        points: 2 
      }
    ]
  },
  {
    id: '4',
    question: 'O que te motiva mais a economizar dinheiro?',
    options: [
      { 
        id: 'a', 
        text: 'Comprar o próximo lançamento tecnológico', 
        archetype: 'tech-lover',
        points: 3 
      },
      { 
        id: 'b', 
        text: 'Conhecer novos destinos e culturas', 
        archetype: 'adventurer',
        points: 3 
      },
      { 
        id: 'c', 
        text: 'Proporcionar mais conforto para minha família', 
        archetype: 'family-first',
        points: 3 
      },
      { 
        id: 'd', 
        text: 'Ter acesso a produtos de alta qualidade', 
        archetype: 'luxury-seeker',
        points: 3 
      }
    ]
  },
  {
    id: '5',
    question: 'Quando você realiza um sonho, qual sentimento é mais forte?',
    options: [
      { 
        id: 'a', 
        text: 'Satisfação por ter a melhor tecnologia', 
        archetype: 'tech-lover',
        points: 2 
      },
      { 
        id: 'b', 
        text: 'Liberdade e sensação de aventura', 
        archetype: 'adventurer',
        points: 2 
      },
      { 
        id: 'c', 
        text: 'Felicidade por compartilhar com quem amo', 
        archetype: 'family-first',
        points: 2 
      },
      { 
        id: 'd', 
        text: 'Orgulho por ter algo exclusivo e especial', 
        archetype: 'luxury-seeker',
        points: 2 
      }
    ]
  }
];

export const archetypeResults: Record<string, ArchetypeResult> = {
  'tech-lover': {
    type: 'tech-lover',
    title: 'Amante da Tecnologia',
    description: 'Você é apaixonado por inovação e sempre quer estar na vanguarda tecnológica.',
    traits: ['Inovador', 'Conectado', 'Visionário', 'Atualizado'],
    icon: '📱'
  },
  'adventurer': {
    type: 'adventurer',
    title: 'Espírito Aventureiro',
    description: 'Sua paixão são as experiências únicas e descobrir novos horizontes.',
    traits: ['Corajoso', 'Curioso', 'Livre', 'Explorador'],
    icon: '🗺️'
  },
  'family-first': {
    type: 'family-first',
    title: 'Família em Primeiro',
    description: 'Seu maior prazer é proporcionar felicidade e conforto para quem você ama.',
    traits: ['Carinhoso', 'Protetor', 'Generoso', 'Dedicado'],
    icon: '👨‍👩‍👧‍👦'
  },
  'luxury-seeker': {
    type: 'luxury-seeker',
    title: 'Buscador de Luxo',
    description: 'Você valoriza qualidade, exclusividade e gosta de se destacar com estilo.',
    traits: ['Refinado', 'Exigente', 'Elegante', 'Exclusivo'],
    icon: '💎'
  }
};

export const socialProofStats = {
  'tech-lover': 34,
  'adventurer': 28,
  'family-first': 26,
  'luxury-seeker': 12
};