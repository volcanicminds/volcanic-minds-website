import MyComponent from '../../../../slices/CardsGrid';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/CardsGrid'
}


export const _Default = () => ({
  components: {
    MyComponent,
    SliceZone
  },
  methods: {
    resolve() {
      return MyComponent
    }
  },
  data() {
    return {
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"card_icon":"pitch","card_title":"industry","card_desc":[{"type":"paragraph","text":"Enim culpa ad consequat dolore pariatur dolore nulla labore et proident cupidatat ipsum eiusmod ex consequat.","spans":[]}]}],"primary":{"title":"silly","subtitle":"think","margin_top":false,"margin_bottom":false,"enable_animation":true},"id":"_Default","slice_type":"cards_grid"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
