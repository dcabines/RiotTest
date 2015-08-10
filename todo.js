riot.tag('todo', '<h3>{ opts.title }</h3> <ul> <li each="{ items.filter(notHidden) }"> <label class="{ completed: done }"> <input type="checkbox" __checked="{ done }" onclick="{ parent.toggle }"> { title } </label> </li> </ul> <form onsubmit="{ add }"> <input name="input" onkeyup="{ edit }"> <button __disabled="{ !text }"> Add #{ items.filter(notHidden).length + 1 } </button> <button __disabled="{ items.filter(onlyDone).length == 0 }" onclick="{ removeAllDone }"> X{ items.filter(onlyDone).length } </button> </form>', function (opts) {

  this.items = opts.items

  this.edit = function (e) {
    this.text = e.target.value;
  };

  this.add = function (e) {
    if (this.text) {
      this.items.push({ title: this.text });
      this.text = this.input.value = '';
    }
  };

  this.removeAllDone = function (e) {
    this.items = this.items.filter(this.notDone);
  };

  this.notHidden = function (item) {
    return !item.hidden;
  };

  this.onlyDone = function (item) {
    return item.done;
  };

  this.notDone = function (item) {
    return !item.done;
  };

  this.toggle = function (e) {
    var item = e.item;
    item.done = !item.done;
    return true;
  };
});
