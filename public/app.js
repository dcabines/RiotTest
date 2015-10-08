(function (w) {
  var app = w.App = {
    ns: function ns(parent, name) {
      var parts = name.split('.');

      parts.forEach(function (part) {
        parent[part] = parent[part] || {};
        parent = parent[part];
      });

      return parent;
    },
    register: function (ns, key, value) {
      app.ns(app, ns)[key] = value;
    },
    state: function (obj, state, reducer){
      Object.assign(obj, {
      dispatch: function (action) {
        state = reducer(state, action);
        this.trigger('update');
      },
      getState: function () {
        return Object.assign({}, state);
      }
    })
    }
  };
} (window));