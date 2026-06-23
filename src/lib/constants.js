export const COLORS = {
  anthracite: '#2C2C2C',
  terracotta: '#D3612B',
  cyan: '#00D9FF',
  deepBlue: '#1A3A52',
  lightGray: '#F5F5F5',
  white: '#FFFFFF',
};

export const CONTACT_INFO = {
  phone: '+225 07 49 24 22 22',
  email: 'contact@nova-b.com',
  address: 'Abidjan, Côte d\'Ivoire',
  whatsapp: 'https://wa.me/2250748296768?text=Bonjour,%20je%20souhaite%20discuter%20d\'un%20projet.'
};

export const ANIMATION_CONFIG = {
  fadeIn: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  stagger: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { staggerChildren: 0.2 }
  }
};