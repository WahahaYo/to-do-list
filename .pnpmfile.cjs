module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.dependencies?.esbuild) {
        pkg.dependencies.esbuild = "^0.28.0";
      }
      if (pkg.peerDependencies?.esbuild) {
        pkg.peerDependencies.esbuild = "^0.28.0";
      }
      return pkg;
    }
  }
};
