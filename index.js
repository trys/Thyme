"use strict";

module.exports = class Thyme {
  constructor(raw) {
    if (!raw) raw = this.format(this.offset(new Date()))
    this.normalise(raw.toString().replace(/\//g, '-'))
  }

  offset(d) {
    return new Date(d.getTime() + (d.getTimezoneOffset() * 60000))
  }

  normalise(raw) {
    return this.raw = raw.substring(0, 10)
  }

  changeDate(n) {
    const offsetDate = this.offset(new Date(this.raw))
    offsetDate.setDate(offsetDate.getDate() + n)
    return this.normalise(this.format(offsetDate))
  }

  add(n = 1) {
    return this.changeDate(n)
  }

  remove(n = -1) {
    return this.changeDate(n)
  }

  format(d) {
    const double = digit => digit <= 9 ? '0' + digit : digit
    return `${d.getFullYear()}-${double(d.getMonth() + 1)}-${double(d.getDate())}`
  }

  toString() {
    return this.raw
  }

  till(end) {
    const dates = []
    end = new Thyme(end)
    if (end < this) return dates

    const now = new Thyme()
    let current = new Thyme(this)

    while (current <= end) {
      if (current > now) dates.push(current.toString())
      current.add()
    }

    return dates
  }

  getDay() {
    return this.offset(new Date(this.raw)).getDay()
  }

  getFullYear() {
    return this.raw.substring(0, 4)
  }

  getMonth() {
    return Number(this.raw.substring(5, 7))
  }

  getDate() {
    return Number(this.raw.substring(8, 10))
  }
}
