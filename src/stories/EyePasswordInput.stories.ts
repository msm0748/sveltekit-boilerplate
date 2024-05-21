import EyePasswordInput from '$lib/components/EyePasswordInput.svelte';
import type { Meta, StoryObj } from '@storybook/svelte';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
	title: 'Common/EyePasswordInput',
	component: EyePasswordInput,
	tags: ['autodocs'],
	argTypes: {
		label: { control: 'text' },
		value: { control: 'text' }
	}
} satisfies Meta<EyePasswordInput>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
	args: {
		label: 'Password',
		value: 'password'
	}
};
