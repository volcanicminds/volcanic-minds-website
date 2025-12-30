import Vue from 'vue'
import { library, config } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
	faAngleDown,
	faChevronRight,
	faArrowRight,
	faMinus,
	faPlus,
	faBars,
	faLaptopCode,
	faPeopleRoof,
	faChessKnight,
	faStaffSnake,
	faCalendar,
	faUsers,
	faBuildingColumns,
	faArrowTrendUp,
	faLeaf,
	faRectangleAd,
	faEnvelopesBulk,
	faBriefcase
} from '@fortawesome/free-solid-svg-icons'
import { faEnvelope } from '@fortawesome/free-regular-svg-icons'
import { faLinkedinIn, faGithub, faXTwitter, faFacebookF } from '@fortawesome/free-brands-svg-icons'

// This is important, we are going to let Nuxt.js worry about the CSS
config.autoAddCss = false

// You can add your icons directly in this plugin. See other examples for how you
// can add other styles or just individual icons.
library.add(
	faAngleDown,
	faChevronRight,
	faArrowRight,
	faMinus,
	faPlus,
	faBars,
	faLaptopCode,
	faPeopleRoof,
	faChessKnight,
	faStaffSnake,
	faCalendar,
	faUsers,
	faBuildingColumns,
	faArrowTrendUp,
	faLeaf,
	faRectangleAd,
	faEnvelopesBulk,
	faBriefcase,
	faEnvelope,
	faLinkedinIn,
	faGithub,
	faXTwitter,
	faFacebookF
)

// Register the component globally
Vue.component('FontAwesomeIcon', FontAwesomeIcon)
