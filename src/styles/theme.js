import {
  PALLETE, ZINDEX, RADII, FONT_WEIGHTS,
  BOX_SHADOW, TYPOGRAPHY, BORDER
} from './config';

export default {
  PALLETE,
  zindex: ZINDEX,
  radii: RADII,
  fontWeight: FONT_WEIGHTS,
  fontSizes: TYPOGRAPHY,
  boxShadow: BOX_SHADOW,
  border: BORDER,

  components: {
    trigger: {
      background: PALLETE.lightBg,
      hover: PALLETE.greyHue
    },
    modal: {
      background: PALLETE.lightBg,
      overlayBg: 'rgba(0,0,0, .4)'
    },
    tooltip: {
      background: PALLETE.darkBg
    }
  },
  fontColors: {
    light: PALLETE.lightBg,
    primary: PALLETE.primaryFont
  }
}
