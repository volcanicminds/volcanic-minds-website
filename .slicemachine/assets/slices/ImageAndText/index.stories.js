import MyComponent from '../../../../slices/ImageAndText';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/ImageAndText'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"image":{"dimensions":{"width":6000,"height":4000},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1544731612-de7f96afe55f"},"title":"rock","subtitle":"its","description":[{"type":"paragraph","text":"Pariatur quis dolore fugiat eu tempor. Tempor laborum ut pariatur quis et aliqua deserunt. Mollit et deserunt anim proident enim laborum nisi aliquip cupidatat sint qui ipsum Lorem.","spans":[]}],"margin_top":false,"margin_bottom":true,"reverse":false,"cta_link":{"link_type":"Web","url":"https://prismic.io"},"cta_text":"center"},"id":"_Default","slice_type":"image_and_text"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
