import React, { useEffect, useState } from "react";

function login() {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [token, setToken] = React.useState(null);
	const [users, setUsers] = React.useState([]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		console.log(email, password);
		fetch(
			"https://traxion-documentos-gateway-1ctcj88b.uc.gateway.dev/v1/auth/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			}
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				setToken(data.access_token);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		if (!token) return;
		fetch(
			"https://traxion-documentos-gateway-1ctcj88b.uc.gateway.dev/v1/workers",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		)
			.then((res) => {
				return res.json();
			})
			.then((data) => {
				console.log(data);
				setUsers(data.users);
			})
			.catch((err) => console.log(err));
	}, [token]);

	/*
admin1234@example.com
admin1234
*/

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
				<button type="submit">Login</button>

				<p>{token}</p>
				{token &&
					users?.length > 0 &&
					users.map((user) => (
						<div key={user.email}>
							<p>{user.name}</p>
							<p>{user.email}</p>
						</div>
					))}
			</form>
		</div>
	);
}

export default login;
