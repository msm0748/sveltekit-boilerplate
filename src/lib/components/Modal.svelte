<script lang="ts">
	export let showModal: boolean;
	export let shouldCloseOnOutsideClick = true;

	$: {
		if (typeof window !== 'undefined') {
			if (showModal) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = 'auto';
			}
		}
	}

	const closeModal = () => {
		if (shouldCloseOnOutsideClick) {
			showModal = false;
		}
	};
</script>

{#if showModal}
	<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
	<div class="modal-overlay" role="button" tabindex="0" on:click|self={closeModal}>
		<div class="modal-content">
			<slot />
		</div>
	</div>
{/if}

<style>
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 9999;
	}

	.modal-content {
		border-radius: 8px;
		background-color: white;
		padding: 32px;
	}
</style>
