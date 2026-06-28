module.exports = {
  hooks: {
    readPackage: (pkg) => {
      if (pkg.name === '@vercel/routing-utils' && pkg.dependencies) {
        console.log('[pnpmfile] Intercepted @vercel/routing-utils, deleting path-to-regexp@6.1.0');
        if (pkg.dependencies['path-to-regexp'] === '6.1.0') {
          delete pkg.dependencies['path-to-regexp'];
        }
      }
      return pkg;
    }
  }
};
