import Vue from 'vue';
import Component from 'vue-class-component';
import { Cell } from '@/engine/main';

// You can declare a mixin as the same style as components.
@Component
export default class setActiveCell extends Vue {
	setActiveCell(cell: Cell) {
		// console.log(cell.toString());
	}
}
