import { projects as defaultProjects, team as defaultTeam, articles as defaultArticles } from './data';

const DB_KEYS = {
  PROJECTS: 'nova_projects',
  TEAM: 'nova_team',
  ARTICLES: 'nova_articles',
  LEGAL: 'nova_legal',
  DIAGNOSTICS: 'nova_diagnostics'
};

const defaultLegal = {
  mentions: "Contenu par défaut des Mentions Légales...",
  confidentialite: "Contenu par défaut de la Politique de Confidentialité...",
  conditions: "Contenu par défaut des Conditions Générales..."
};

export const db = {
  getProjects: () => {
    const stored = localStorage.getItem(DB_KEYS.PROJECTS);
    return stored ? JSON.parse(stored) : defaultProjects;
  },
  saveProjects: (projects) => {
    localStorage.setItem(DB_KEYS.PROJECTS, JSON.stringify(projects));
  },
  
  getTeam: () => {
    const stored = localStorage.getItem(DB_KEYS.TEAM);
    return stored ? JSON.parse(stored) : defaultTeam;
  },
  saveTeam: (team) => {
    localStorage.setItem(DB_KEYS.TEAM, JSON.stringify(team));
  },

  getArticles: () => {
    const stored = localStorage.getItem(DB_KEYS.ARTICLES);
    return stored ? JSON.parse(stored) : defaultArticles;
  },
  saveArticles: (articles) => {
    localStorage.setItem(DB_KEYS.ARTICLES, JSON.stringify(articles));
  },

  getLegal: () => {
    const stored = localStorage.getItem(DB_KEYS.LEGAL);
    return stored ? JSON.parse(stored) : defaultLegal;
  },
  saveLegal: (pages) => {
    localStorage.setItem(DB_KEYS.LEGAL, JSON.stringify(pages));
  },

  getDiagnostics: () => {
    const stored = localStorage.getItem(DB_KEYS.DIAGNOSTICS);
    return stored ? JSON.parse(stored) : [];
  },
  saveDiagnostics: (diagnostics) => {
    localStorage.setItem(DB_KEYS.DIAGNOSTICS, JSON.stringify(diagnostics));
  },
  addDiagnostic: (diagnostic) => {
    const current = db.getDiagnostics();
    const newItem = { ...diagnostic, id: Date.now(), createdAt: new Date().toISOString() };
    const updated = [newItem, ...current];
    localStorage.setItem(DB_KEYS.DIAGNOSTICS, JSON.stringify(updated));
    return newItem;
  }
};