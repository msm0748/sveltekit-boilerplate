<script lang="ts">
	import { goto } from '$app/navigation';
	import '$styles/reset.scss';
	import type { LayoutData } from './$types';

	export let data: LayoutData;

	const logout = async () => {
		const res = await fetch('/api/auth/signout', {
			method: 'POST'
		});
		if (res.ok) {
			goto('/', { invalidateAll: true });
		} else {
			const data = await res.json();
			alert(data.message);
		}
	};
</script>

<header>
	<div>
		<a href="/">홈</a>
	</div>
	<ul>
		{#if !data.user}
			<li>
				<a href="/signin">로그인</a>
			</li>
			<li>
				<a href="/signup">회원가입</a>
			</li>
		{:else}
			<li>
				<button on:click={logout}>로그아웃</button>
			</li>
		{/if}
	</ul>
</header>
<slot />

<style lang="scss">
	header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10px;
		background-color: #f8f9fa;

		ul {
			display: flex;
			gap: 10px;
		}

		a {
			text-decoration: none;
			color: #333;
		}
		button {
			border: none;
			background-color: transparent;
		}
	}
</style>
