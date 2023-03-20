import * as Constants from '@/utils/constants'

export default ({ app }, inject) => {
	inject('constants', Constants)
}
