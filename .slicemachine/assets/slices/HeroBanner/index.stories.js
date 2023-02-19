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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"prova_link":{"link_type":"Web","url":"http://google.com"},"testo":"court","immagine":{"dimensions":{"width":4000,"height":4000},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1591012911207-0dbac31f37da"},"richtext":[{"type":"paragraph","text":"Tempor deserunt aute irure do ullamco irure adipisicing ad adipisicing sit veniam reprehenderit.","spans":[]}]},"id":"_Default","slice_type":"hero_banner"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
