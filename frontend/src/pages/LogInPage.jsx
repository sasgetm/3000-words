import { Link } from 'react-router-dom';
import { useState } from 'react';
import Input from './../components/Input';
import Button from './../components/Button';
import fetchLogin from './../api/loginApi';

function LogInPage({ isLoggedIn, userLogin }) {
	const [isRegister, setIsRegister] = useState(false);
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState('');

	const trimmedLogin = login.trim();
	const trimmedPassword = password.trim();

	const loginRegex = /^[a-zA-Z0-9_]+$/;

	const isLoginValid =
		trimmedLogin.length >= 3 &&
		trimmedLogin.length <= 20 &&
		loginRegex.test(trimmedLogin);

	const isPasswordValid =
		trimmedPassword.length >= 6 &&
		trimmedPassword.length <= 20;

	const isFormValid = isLoginValid && isPasswordValid;

	function handleSetIsRegister () {
		setIsRegister(!isRegister);
	}

	async function handleSubmit(e) {
		e.preventDefault();

		const loginToSend = trimmedLogin;
		const passwordToSend = trimmedPassword;

		if (!isFormValid || isLoading) return;

		setIsLoading(true);
		setError('');

		try {
			const response = await fetchLogin(isRegister, loginToSend, passwordToSend)

			if (!response.ok) {
				const data = await response.json().catch(() => ({}));
				throw new Error(data.message || 'Ошибка авторизации');
			}

			const data = await response.json();

			// TODO: сохранить токен или данные пользователя
			console.log('Success:', data);

		} catch (err) {
			setError(err.message || 'Произошла ошибка');
		} finally {
			setIsLoading(false);
		}
	}

	if (isLoggedIn) {
		return (
			<>
			{/* <div className="login login_page"> */}
				<Link to="/3000-words/" className="ago-button button-48">
					←
				</Link>

				<div className="login__container">
					<h1 className="login__title">Здравствуйте, {userLogin}</h1>
				</div>


			{/* </div> */}
			</>
		)
	}

	return (
		<>
		{/* <div className="login login_page"> */}
			<Link to="/3000-words/" className="ago-button button-48">
				←
			</Link>

			<div className="login__container">
				<h1 className="login__title">{isRegister ? 'Регистрация' : 'Вход'}</h1>

				<form className="login__form" onSubmit={handleSubmit}>

					<div className="login__form-fields">
						<Input
							type='text'
							max={20}
							min={3}
							placeholder='Логин (не кириллица)'
							id='login'
							value={login}
							onChange={(e) => setLogin(e.target.value)}
							required={true}
							pattern="^[a-zA-Z0-9_]+$"
						/>
						<Input
							type='password'
							max={20}
							min={6}
							placeholder='Пароль (от 6 символов)'
							id='password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required={true}
						/>
					</div>
					<Button
						text={isLoading ? 'Загрузка...' : (isRegister ? 'Зарегистрироваться' : 'Войти')}
						type="submit"
						disabled={!isFormValid || isLoading}
					/>
					{error && (
						<p className="login__error">
							{error}
						</p>
					)}
				</form>
				<p className="login__extra">
					{isRegister ? 'Есть аккаунт?' : 'Нет аккаунта?'} <span className="link" onClick={handleSetIsRegister}>{isRegister ? 'Войти' : 'Зарегистрироваться'}</span>
				</p>

			</div>


		{/* </div> */}
		</>
	);
}

export default LogInPage;