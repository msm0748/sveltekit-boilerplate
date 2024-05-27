<script lang="ts">
	import { goto } from '$app/navigation';
	import EyePasswordInput from '$lib/components/EyePasswordInput.svelte';

	let email = '';
	let password = '';

	const onSubmit = async () => {
		const res = await fetch('/api/auth/signin', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ email, password })
		});
		if (res.ok) {
			goto('/', { invalidateAll: true });
		} else {
			const data = await res.json();
			alert(data.meta.message);
		}
	};
</script>

<h1>로그인</h1>
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
	<button type="submit">전송</button>
</form>
