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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"data":"log","description":"excellent"}],"primary":{"margin_top":false,"margin_bottom":true,"title":"snake","subtitle":[{"type":"paragraph","text":"Ut eiusmod aute adipisicing eu laborum commodo nulla ex. In pariatur in quis duis ipsum. Fugiat consectetur cillum mollit irure quis irure aliquip deserunt incididunt aliqua exercitation fugiat.","spans":[]}]},"id":"_Default","slice_type":"statistics"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
