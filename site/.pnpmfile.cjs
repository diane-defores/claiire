module.exports = {
  hooks: {
    readPackage: (pkg) => {
      if (pkg.name === '@vercel/routing-utils' && pkg.dependencies) {
        console.log('[pnpmfile] Intercepted @vercel/routing-utils, deleting path-to-regexp@6.1.0');
        if (pkg.dependencies['path-to-regexp'] === '6.1.0') {
          delete pkg.dependencies['path-to-regexp'];
        }
      }

      if (pkg.dependencies?.esbuild === '0.27.7') {
        console.log(`[pnpmfile] Intercepted ${pkg.name}, forcing esbuild@0.28.1`);
        pkg.dependencies.esbuild = '0.28.1';
      }

      if (pkg.optionalDependencies?.esbuild === '0.27.7') {
        console.log(`[pnpmfile] Intercepted ${pkg.name}, forcing optional esbuild@0.28.1`);
        pkg.optionalDependencies.esbuild = '0.28.1';
      }

      return pkg;
    }
  }
};
