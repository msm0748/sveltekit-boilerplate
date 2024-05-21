import DropDown from '$lib/components/DropDown.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Example/DropDown',
	component: DropDown,
	tags: ['autodocs'],
	argTypes: {
		list: { control: 'object' }
	}
} satisfies Meta<DropDown>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		list: [
			{ id: 1, name: 'option-1' },
			{ id: 2, name: 'option-2' },
			{ id: 3, name: 'option-3' }
		]
	}
};
