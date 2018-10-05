import horInstanceFactory from './horInstanceFactory'

export default horInstanceFactory(function(x) {
  return this.concat(x)
})
