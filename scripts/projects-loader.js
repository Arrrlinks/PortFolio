// Simple ES module loader that attaches the default export of projects-list.js to window.PROJECTS
import projects from '../projects-list.js';

// Expose as window.PROJECTS for non-module scripts
window.PROJECTS = projects;

// Also export for other modules if needed
export { projects as PROJECTS };
