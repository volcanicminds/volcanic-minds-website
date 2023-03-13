import MyComponent from '../../../../slices/Accordion';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Accordion'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"title":"teeth","description":[{"type":"paragraph","text":"Lorem ipsum aute aliqua anim nisi exercitation. Culpa consectetur quis sunt aute.","spans":[]}]}],"primary":{"title":"shorter","subtitle":"general","margin_top":true,"margin_bottom":true},"id":"_Default","slice_type":"accordion"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
