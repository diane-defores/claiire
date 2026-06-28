module.exports = {
  hooks: {
    readPackage: (pkg) => {
      if (pkg.name === '@vercel/routing-utils' && pkg.dependencies) {
        if (pkg.dependencies['path-to-regexp'] === '6.1.0') {
          pkg.dependencies['path-to-regexp'] = '6.3.0';
        }
      }
      if (pkg.name === 'yaml-language-server' && pkg.dependencies) {
        if (pkg.dependencies['yaml'] && pkg.dependencies['yaml'] !== '2.8.3') {
          pkg.dependencies['yaml'] = '2.8.3';
        }
      }
      return pkg;
    }
  }
};
