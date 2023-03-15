import MyComponent from '../../../../slices/Statistics';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Statistics'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"data":"log","description":"excellent"}],"primary":{"margin_top":false,"margin_bottom":true},"id":"_Default","slice_type":"statistics"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
