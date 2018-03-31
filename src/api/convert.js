import hsi_to_rgb from '../converters/hsi_to_rgb';
import hsl_to_rgb from '../converters/hsl_to_rgb';
import hsv_to_rgb from '../converters/hsv_to_rgb';
import hwb_to_rgb from '../converters/hwb_to_rgb';
import rgb_to_hsi from '../converters/rgb_to_hsi';
import rgb_to_hsl from '../converters/rgb_to_hsl';
import rgb_to_hsv from '../converters/rgb_to_hsv';
import rgb_to_hwb from '../converters/rgb_to_hwb';
import lab_to_lch from '../converters/lab_to_lch';
import lch_to_lab from '../converters/lch_to_lab';
import lab_to_rgb from '../converters/lab_to_rgb';
import rgb_to_lab from '../converters/rgb_to_lab';

const converters = {
	hsi: { rgb: hsi_to_rgb },
	hsl: { rgb: hsl_to_rgb },
	hsv: { rgb: hsv_to_rgb },
	hwb: { rgb: hwb_to_rgb },
	lab: {
		lch: lab_to_lch,
		rgb: lab_to_rgb
	},
	lch: {
		lab: lch_to_lab,
		rgb: c => lch_to_lab(lab_to_rgb(c))
	},
	rgb: {
		hsi: rgb_to_hsi,
		hsl: rgb_to_hsl,
		hsv: rgb_to_hsv,
		hwb: rgb_to_hwb,
		lab: rgb_to_lab,
		lch: c => rgb_to_lab(lab_to_lch(c))
	}
};

export default (color, target_mode) => 
	color !== undefined ? 
		// if the color's mode corresponds to our target mode
		color.mode === target_mode ? 
			// then just return the color
			color
			// otherwise check to see if we have a dedicated
			// converter for the target mode
			: converters[color.mode][target_mode] ? 
				// and return its result...
				converters[color.mode][target_mode](color)
				// ...otherwise pass through RGB as an intermediary step.
				// if the target mode is RGB...
				: mode === 'rgb' ? 
					// just return the RGB
					converters[color.mode].rgb(color) 
					// otherwise convert color.mode -> RGB -> target_mode
					: converters.rgb[target_mode](converters[color.mode].rgb(color))
		: undefined;