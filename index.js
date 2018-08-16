"use strict";

var Thyme = function () {
  function Thyme(raw) {
    if (!raw) raw = this._format(this._offset(new Date()));
    this._normalise(raw.toString().replace(/\//g, '-'));
  }

  Thyme.prototype._offset = function (d) {
    return new Date(d.getTime() + (d.getTimezoneOffset() * 60000))
  }

  Thyme.prototype._normalise = function (raw) {
    return this.raw = raw.substring(0, 10)
  }

  Thyme.prototype._format = function (d) {
    var double = function(digit) {
      return digit <= 9 ? '0' + digit : digit
    }
    return `${d.getFullYear()}-${double(d.getMonth() + 1)}-${double(d.getDate())}`
  }

  Thyme.prototype._alter = function (n) {
    var offsetDate = this._offset(new Date(this.raw))
    offsetDate.setDate(offsetDate.getDate() + n)
    return this._normalise(this._format(offsetDate))
  }

  Thyme.prototype.add = function (n = 1) {
    return this._alter(n)
  }

  Thyme.prototype.remove = function (n = 1) {
    return this._alter(0 - n)
  }

  Thyme.prototype.till = function (end) {
    var dates = []
    end = new Thyme(end)
    if (end < this) return dates

    var now = new Thyme(this)
    let current = new Thyme(this)

    while (current <= end) {
      if (current >= now) dates.push(new Thyme(current))
      current.add()
    }

    return this.range(dates)
  }

  Thyme.prototype.equals = function (t) {
    return this.raw === t.toString()
  }

  Thyme.prototype.getDay = function () {
    return this._offset(new Date(this.raw)).getDay()
  }

  Thyme.prototype.getFullYear = function () {
    return Number(this.raw.substring(0, 4))
  }

  Thyme.prototype.getMonth = function () {
    return Number(this.raw.substring(5, 7)) - 1
  }

  Thyme.prototype.getDate = function () {
    return Number(this.raw.substring(8, 10))
  }

  Thyme.prototype.format = function () {
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return `${this.getDate()} ${months[this.getMonth()]} ${this.getFullYear()}`
  }

  Thyme.prototype.range = function (dates) {
    dates = dates.map(function(d) {
      return typeof d === 'object' ? d : new Thyme(d)
    })

    dates.contains = function (d) {
      return !!this.find(function(a) {
        return a.toString() === d.toString()
      })
    }

    return dates
  }

  Thyme.prototype.valueOf = function () {
    return this.raw;
  };

  Thyme.prototype.toString = function () {
    return this.raw;
  };

  Thyme.prototype.toJSON = function () {
    return this.raw;
  };

  return Thyme;
}();

module.exports = Thyme
