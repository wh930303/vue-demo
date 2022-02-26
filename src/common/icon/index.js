import Vue from 'vue'
import { library } from '@fortawesome/fontawesome-svg-core'
// solid
import {
  faUser,
  faYenSign,
  faSave,
  faPrint,
  faPlusSquare,
  faMinusSquare,
  faFolder,
  faFolderOpen
} from '@fortawesome/free-solid-svg-icons'
// regular
import { faWindowMaximize } from '@fortawesome/free-regular-svg-icons'
// vue
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(
  faYenSign,
  faUser,
  faSave,
  faPrint,
  faPlusSquare,
  faMinusSquare,
  faWindowMaximize,
  faFolder,
  faFolderOpen
)
Vue.component('font-awesome-icon', FontAwesomeIcon)
