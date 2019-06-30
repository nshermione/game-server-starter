export const ObjectUtils = {
  merge: (oldModel, newModel) => {
    let keys = Object.keys(newModel);
    for (let key of keys) {
      if (oldModel[key] && typeof oldModel[key] == 'object') {
        this.merge(oldModel[key], newModel[key]);
      } else {
        oldModel[key] = newModel[key];
      }
    }
  },

  exist: (model) => {
    return model != null && model != undefined;
  }
};