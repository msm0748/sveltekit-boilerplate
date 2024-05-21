import Modal from '$lib/components/Modal.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Common/Modal',
	component: Modal,
	tags: ['autodocs'],
	argTypes: {
		shouldCloseOnOutsideClick: { control: 'boolean' },
		showModal: { control: 'boolean' }
	}
} satisfies Meta<Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		shouldCloseOnOutsideClick: true,
		showModal: true
	}
};
