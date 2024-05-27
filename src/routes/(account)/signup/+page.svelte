<script lang="ts">
	import { goto } from '$app/navigation';
	import EyePasswordInput from '$lib/components/EyePasswordInput.svelte';

	let email = '';
	let password = '';

	const onSubmit = async () => {
		const res = await fetch('/api/auth/signup', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});

		const data = await res.json();

		if (res.ok) {
			alert(data.message);
			goto('/signin', { invalidateAll: true });
		} else {
			const data = await res.json();
			alert(data.meta.message);
		}
	};
</script>

<h1>회원가입</h1>
<form on:submit|preventDefault={onSubmit}>
	<div>
		<label>
			이메일
			<input type="email" bind:value={email} />
		</label>
	</div>
	<div>
		<label>
			비밀번호
			<input type="password" bind:value={password} />
		</label>
	</div>
	<button type="submit">회원가입</button>
</form>
