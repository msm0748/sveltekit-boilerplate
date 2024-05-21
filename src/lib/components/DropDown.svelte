<script lang="ts">
	import type { FocusEventHandler } from 'svelte/elements';

	interface List {
		name: string;
		id: number;
	}
	export let list: List[] = [
		{ id: 2, name: 'completed' },
		{ id: 3, name: 'active' }
	];

	let isDropdownOpen = false;
	let selectedMenu = list[0].name;

	const toggleDropdown = () => {
		isDropdownOpen = !isDropdownOpen;
	};

	const closeDropdown = () => {
		isDropdownOpen = false;
	};

	const handleOptionChange = (name: string) => {
		selectedMenu = name;
	};

	const handleDropdownBlur: FocusEventHandler<HTMLDivElement> = ({
		relatedTarget,
		currentTarget
	}) => {
		if (relatedTarget instanceof HTMLElement && currentTarget.contains(relatedTarget)) return;
		closeDropdown();
	};
</script>

<div class="dropdown" on:focusout={handleDropdownBlur}>
	<button on:click={toggleDropdown}>
		<div class="dropdown-toggle-wrapper">
			<span>{selectedMenu}</span>
			<span class="icon" class:isOpen={isDropdownOpen}>
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"
					><path
						fill="none"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="m17 14l-5-5l-5 5"
					/></svg
				>
			</span>
		</div>
	</button>
	<ul class="dropdown-content" class:isOpen={isDropdownOpen}>
		{#each list as { id, name }}
			<li>
				<a href="/projects/{id}/dashboard" on:click={() => handleOptionChange(name)}>{name}</a>
			</li>
		{/each}
	</ul>
</div>

<style lang="scss">
	.dropdown {
		position: relative;

		button {
			width: 100%;
			padding: 5px 10px;
			background-color: #fff;
			border: 1px solid #ccc;
			border-radius: 8px;
			cursor: pointer;
		}
	}

	.dropdown-toggle-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.icon {
		color: #828282;
		transform: rotate(180deg);
	}

	.icon.isOpen {
		transform: rotate(0deg);
	}

	.dropdown-content {
		display: none;
		width: 100%;
		position: absolute;
		top: 100%;
		left: 0;
		z-index: 1;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
		border-radius: 0.25rem;

		a {
			display: block;
			padding: 10px;
			color: #333;
			text-decoration: none;
		}
	}

	.dropdown-content.isOpen {
		display: block;
	}
</style>
