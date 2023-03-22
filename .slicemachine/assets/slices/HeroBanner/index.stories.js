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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{}],"primary":{"title":[{"type":"heading1","text":"Section","spans":[]}],"title_mb":true,"subtitle":[{"type":"paragraph","text":"Occaecat pariatur amet duis ea labore pariatur. Qui proident sit deserunt nulla sint officia commodo. Quis labore nisi fugiat veniam et est et eiusmod incididunt eu proident sit.","spans":[]}],"background_image":{"dimensions":{"width":3958,"height":3958},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1579931794097-0ad001e51edb"},"background_image_blur":false,"margin_top":false,"margin_bottom":true,"cta_link":{"link_type":"Web","url":"http://twitter.com"},"cta_text":"greatly","enable_animation":true},"id":"_Default","slice_type":"hero_banner"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
