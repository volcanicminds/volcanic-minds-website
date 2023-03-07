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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"card_image":{"dimensions":{"width":6597,"height":4398},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f"},"card_title":"industry","card_description":"hospital"}],"primary":{"title":"silly","subtitle":"think","margin_top":false,"margin_bottom":false},"id":"_Default","slice_type":"cards_grid"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
