import MyComponent from '../../../../slices/Partners';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Partners'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"logo":{"dimensions":{"width":3199,"height":3199},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1600804931749-2da4ce26c869"},"name":"hill"}],"primary":{"title":"away","margin_top":false,"margin_bottom":false},"id":"_Default","slice_type":"partners"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
