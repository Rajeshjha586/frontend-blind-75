let globalMap;

export default {
  getInstance() {
    if (globalMap === undefined) {
      globalMap = new Map();
    }

    return globalMap;
  },
};
