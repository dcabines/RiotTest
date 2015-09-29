(function (riot) {
  var store = (function () {
    var inner = {
      clicks: 0,
      add: function () {
        inner.clicks += 1;
        inner.update();
      },
      auto: function (toggle) {
        res.running = toggle;
        inner[toggle ? 'startTimer' : 'stopTimer']();
      },
      startTimer: function () {
        clearInterval(inner.timer);
        inner.timer = setInterval(inner.add, 500);
        inner.update();
      },
      stopTimer: function () {
        clearInterval(inner.timer);
        inner.update();
      },
      update: function () {
        res.resources = inner.clicks;
        res.trigger('update');
      }
    };
    
    var res = riot.observable({
      resources: 0,
      running: false,
      add: inner.add,
      auto: inner.auto
    });

    return res;
  } ());

  riot.mount('clicker', {
    name: 'Resources',
    store: store
  });

  riot.mount('todo', {
    title: 'Todo',
    items: [
      { title: 'Avoid excessive caffeine', done: true },
      { title: 'Be less provocative', done: false },
      { title: 'Be nice to people', done: false }
    ]
  });
} (window.riot));