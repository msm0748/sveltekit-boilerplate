<script lang="ts">
	import { v4 as uuidv4 } from 'uuid';

	export let label = '';
	export let value = '';

	let type = 'password';

	const inputToggle = () => {
		type = type === 'password' ? 'text' : 'password';
	};

	const id = uuidv4();

	const handleInput = (
		event: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		value = event.currentTarget.value;
	};
</script>

<div class="password-toggle">
	<input {type} {value} {id} on:input={handleInput} class="" required />
	<label for={id} class="input-label">{label}</label>
	<button type="button" on:click={inputToggle}>
		{#if type === 'password'}
			<i>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14px"
					height="14px"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M1 12C1 12 5 4 12 4C19 4 23 12 23 12"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M1 12C1 12 5 20 12 20C19 20 23 12 23 12"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<circle
						cx="12"
						cy="12"
						r="3"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</i>
		{:else}
			<i>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="14px"
					height="14px"
					viewBox="0 0 24 24"
					fill="none"
				>
					<path
						d="M2 2L22 22"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M6.71277 6.7226C3.66479 8.79527 2 12 2 12C2 12 5.63636 19 12 19C14.0503 19 15.8174 18.2734 17.2711 17.2884M11 5.05822C11.3254 5.02013 11.6588 5 12 5C18.3636 5 22 12 22 12C22 12 21.3082 13.3317 20 14.8335"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M14 14.2362C13.4692 14.7112 12.7684 15.0001 12 15.0001C10.3431 15.0001 9 13.657 9 12.0001C9 11.1764 9.33193 10.4303 9.86932 9.88818"
						stroke="#000000"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</i>
		{/if}
	</button>
</div>

<style lang="scss">
	.password-toggle {
		position: relative;

		input:focus {
			border: 1px solid #308fff;
		}

		input {
			height: 52px;
			width: 100%;
			font-size: 16px;
			border-radius: 6px;
			outline: none;
			padding: 14px 16px;
			border: 1px solid #d7dbdf;
			padding-right: 50px;

			&:is(:focus, :valid) + .input-label {
				top: -7px;
				padding: 0 4px;
				font-size: 12px;
				line-height: 18px;
				z-index: 10;
				bottom: initial;
			}

			&:valid + .input-label {
				color: #889096;
			}

			&:focus + .input-label {
				color: #308fff;
			}
		}

		.input-label {
			position: absolute;
			top: 18px;
			left: 13px;
			background-color: #fff;
			color: #889096;
			transition: 0.3s;
			cursor: text;
		}

		button {
			position: absolute;
			width: 24px;
			height: 24px;
			right: 16px;
			top: 0;
			bottom: 0;
			margin: auto;
			padding: 2px;
			cursor: pointer;

			i {
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
