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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"card_icon":"pitch","card_title":"industry","card_description":"hospital"}],"primary":{"title":"silly","subtitle":"think","margin_top":false,"margin_bottom":false},"id":"_Default","slice_type":"cards_grid"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
