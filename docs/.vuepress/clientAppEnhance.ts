import { defineClientAppEnhance } from '@vuepress/client'
import QisiCat from './components/QisiCat.vue'
import AbsoluteBox from './components/absolute-box.vue'
import MarkCheck from './components/mark-check.vue'
import MarkBox from './components/mark-box.vue'
import MarkCross from './components/mark-cross.vue'
import HighlightBox from './components/highlight-box.vue'
import MarkQuestion from './components/mark-question.vue'
import UnderlineBox from './components/underline-box.vue'

export default defineClientAppEnhance(({ app }) => {
  app.component('QisiCat', QisiCat)
  app.component('AbsoluteBox', AbsoluteBox)
  app.component('MarkCheck', MarkCheck)
  app.component('MarkBox', MarkBox)
  app.component('MarkCross',MarkCross)
  app.component('HighlightBox', HighlightBox)
  app.component('MarkQuestion', MarkQuestion)
  app.component('UnderlineBox', UnderlineBox)
})