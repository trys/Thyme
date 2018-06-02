"use strict";

class Thyme {
  constructor(raw) {
    if (!raw) raw = this._format(this._offset(new Date()))
    this._normalise(raw.toString().replace(/\//g, '-'))
  }

  _offset(d) {
    return new Date(d.getTime() + (d.getTimezoneOffset() * 60000))
  }

  _normalise(raw) {
    return this.raw = raw.substring(0, 10)
  }

  _format(d) {
    const double = digit => digit <= 9 ? '0' + digit : digit
    return `${d.getFullYear()}-${double(d.getMonth() + 1)}-${double(d.getDate())}`
  }

  _alter(n) {
    const offsetDate = this._offset(new Date(this.raw))
    offsetDate.setDate(offsetDate.getDate() + n)
    return this._normalise(this._format(offsetDate))
  }

  add(n = 1) {
    return this._alter(n)
  }

  remove(n = 1) {
    return this._alter(0 - n)
  }

  till(end) {
    const dates = []
    end = new Thyme(end)
    if (end < this) return dates

    const now = new Thyme()
    let current = new Thyme(this)

    while (current <= end) {
      if (current > now) dates.push(new Thyme(current))
      current.add()
    }

    return this.range(dates)
  }

  equals(t) {
    return this.raw === t.toString()
  }

  getDay() {
    return this._offset(new Date(this.raw)).getDay()
  }

  getFullYear() {
    return Number(this.raw.substring(0, 4))
  }

  getMonth() {
    return Number(this.raw.substring(5, 7)) - 1
  }

  getDate() {
    return Number(this.raw.substring(8, 10))
  }

  format() {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
    return `${this.getDate()} ${months[this.getMonth()]} ${this.getFullYear()}`
  }

  range(dates) {
    dates = dates.map(d => typeof d === 'object' ? d : new Thyme(d))

    dates.contains = function(d) {
      return !!this.find(a => a.toString() === d.toString())
    }

    return dates
  }
}

Thyme.prototype.valueOf = function () {
  return this.raw
}

Thyme.prototype.toString = function () {
  return this.raw
}

Thyme.prototype.toJSON = function () {
  return this.raw
}

module.exports = Thyme
