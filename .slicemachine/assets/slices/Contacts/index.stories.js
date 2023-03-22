import MyComponent from '../../../../slices/Contacts';
import SliceZone from 'vue-slicezone'

export default {
  title: 'slices/Contacts'
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
      mock: {"variation":"default","version":"sktwi1xtmkfgx8626","items":[{"face":{"dimensions":{"width":5848,"height":3899},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1499951360447-b19be8fe80f5"}}],"primary":{"background_1":{"dimensions":{"width":6597,"height":4398},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1601933973783-43cf8a7d4c5f"},"background_2":{"dimensions":{"width":3500,"height":2338},"alt":null,"copyright":null,"url":"https://images.unsplash.com/photo-1448932223592-d1fc686e76ea"},"title":"someone","text":[{"type":"paragraph","text":"Cillum culpa cillum ex consectetur magna proident aute exercitation nulla in veniam occaecat officia ut. Reprehenderit enim dolore excepteur ut consectetur commodo. Occaecat mollit cupidatat excepteur voluptate duis occaecat voluptate cupidatat nisi ipsum.","spans":[]}],"button_link":{"link_type":"Web","url":"http://google.com"},"button_label":"captain","margin_top":false,"margin_bottom":false,"enable_animation":true,"enable_bg":true},"id":"_Default","slice_type":"contacts"}
    }
  },
  template: '<SliceZone :slices="[mock]" :resolver="resolve" />'
})
_Default.storyName = ''
