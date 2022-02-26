import { redirect, notify } from '@/common/utils/core/communication/index.js'
import Vue from 'vue'

Vue.prototype.$hsa.utils = { redirect, notify }
