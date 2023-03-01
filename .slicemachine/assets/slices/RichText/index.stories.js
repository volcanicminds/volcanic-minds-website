import MyComponent from '../../../../slices/RichText';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/RichText'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"text":[{"type":"paragraph","text":"Dolore velit reprehenderit laboris dolor laborum tempor.","spans":[]}],"text_align":"Centro","margin_top":true,"margin_bottom":true},"id":"_Default","slice_type":"rich_text"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
