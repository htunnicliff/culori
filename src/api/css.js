import rgb from './rgb';
import round from './round';

let clamp = v => Math.round(Math.max(0, Math.min(v, 1)) * 255);

export default (c, format = 'rgb') => {

	let color = rgb(c);

	let r = clamp(color.r);
	let g = clamp(color.g);
	let b = clamp(color.b);

	if (format === 'hex') {
		return '#' + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
	}

	if (format === 'rgb') {
		if (color.alpha === undefined || color.alpha === 1) {
			// opaque color
			return `rgb(${r}, ${g}, ${b})`;
		} else {
			// transparent color
			return `rgba(${r}, ${g}, ${b}, ${ round(color.alpha, 2) })`;
		}
	}
}