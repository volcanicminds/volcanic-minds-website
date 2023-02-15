import MyComponent from '../../../../slices/HeroBanner';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/HeroBanner'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"prova_link":{"link_type":"Web","url":"https://slicemachine.dev"}},"id":"_Default","slice_type":"hero_banner"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
