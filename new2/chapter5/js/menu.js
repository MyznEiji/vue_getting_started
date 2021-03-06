var PullDownMenu ={
  data: function(){
    return {
      isShown: false,
      name: 'メニュー',
      items: [
        '1-1',
        '1-2',
        '1-3'
      ]
    }
  },
  template: `
    <div @mouseleave="isShown=false">
      <p @mouseover="isShown=true"><a href="#" class="menu">{{ name }}</a></p>
      <transition
        @before-enter="beforeEnter"
        @enter="enter"
        @leave="leave"
        :css="false"
      >
        <ul v-if="isShown">
          <li v-for="item in items" :key="item">
            <a href="#" class="menu-item">{{ item }}</a>
          </li>
        </ul>
      </transition>
    </div>
  `,
  methods: {
    beforeEnter: function(el){
      // el: トランジションの対象となるDOM要素
      // アニメーションの初期状態(高さ透明度)の設定
      el.style.height = '0px'
      el.style.opacity = '0'
    },
    enter: function(el, done){
      // el: トランジションの対象となるDOM要素
      // 要素の高さを取得し、Anime.jsを用いてメニューを下に展開する
      // 3秒かけて、透明度と高さを変更して出現させる
      anime({
        targets: el,
        opacity: 1,
        height: el.scrollHeight + 'px',
        duration: 3000,
        complate: done
      })
    },
    leave: function(el, done){
      // el: トランジションの対象となるDOM要素
      anime({
        targets: el,
        opacity: 0,
        height: '0px',
        duration: 300,
        complate: done
      })
    }
  }
}

new Vue({
  el: '#app',
  components: {
    PullDownMenu: PullDownMenu
  }
})
