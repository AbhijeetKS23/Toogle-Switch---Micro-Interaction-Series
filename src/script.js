const { interpolate } = tweenrex
const { easeOutBack, easeInBack, easeOutQuad, easeInQuad } = just.curves
Vue.component('btn', {
  template: '#button',
  data: () => ({
		text: 'OFF',
		flag: false,
    balls: 8,
    ballsize: 20,
    radius: 150,
    ballsAnim: null,
	}),
  mounted () {
    const
      container = this.$refs.balls,
      balls = this.query('.ball', container),
      width = container.clientWidth,
      height = container.clientHeight,
      step = (2 * Math.PI) / this.balls,
      angle = 0,
      tweens = balls.map((ball, i) => {
        return TweenRex({
          duration: 1200,
          subscribe: interpolate({
            targets: ball,
            easing: easeOutQuad,
            transform: [
              `translate3d(${Math.round(width / 2 + 0 - this.ballsize / 2)}px, ${Math.round(height / 2 + 0 - this.ballsize / 2)}px, 0) scale(1)`,
              `translate3d(${Math.round(width / 2 + this.radius * Math.cos(angle + (i * step)) - this.ballsize / 2)}px, ${Math.round(height / 2 + this.radius * Math.sin(angle + (i * step)) - this.ballsize / 2)}px, 0) scale(0)`,
            ],
          }),
        })
      }),
      tl = TweenRex()
    tl.add(tweens, { position: 50 })
    this.ballsAnim =  tl
  },
	methods: {
    query (selector, node) {
      if (typeof node === 'undefined') {
        node = document
      }
      return [].slice.call(node.querySelectorAll(selector))
    },
		toggle () {
			const
				el = this.$el,
				swtch = this.$refs.switch,
				txt = this.$refs.txt,

				tl = TweenRex()
			tl.add({
				duration: 600,
				subscribe: interpolate({
					targets: el,
					easing: this.flag ? easeInBack : easeOutBack,
					transform: ['scale(1)', 'scale(0.9)', 'scale(1)'],
				}),
			})
			tl.add({
				duration: 300,
				subscribe: interpolate({
					targets: swtch,
					easing: this.flag ? easeInQuad : easeOutQuad,
					transform: ['translateX(0rem)', 'translateX(5.9375rem)'],
				}),
			}, { position: this.flag ? 300 : 0 })
			tl.add({
				duration: 300,
				subscribe: [
					interpolate({
						targets: this,
						easing: this.flag ? easeInQuad : easeOutQuad,
						text: {
							value: ['OFF', 'ON'],
							type: 'discrete',
						},
						flag: {
							value: [false, true],
							type: 'discrete',
						},
					}),
					interpolate({
						targets: txt,
						easing: this.flag ? easeInQuad : easeOutQuad,
						transform: ['translate3d(0rem, -50%, 0)', 'translate3d(-5rem, -50%, 0)'],
					}),
				],
			}, { position: this.flag ? 300 : 0 })
			// player(tl)
			if (this.flag) {
				tl.reverse()
				tl.play()
			} else tl.play()
      
      this.ballsAnim.restart()
		},
	},
})
new Vue({
  el: '#app',
})