import { Link } from 'react-router-dom';
import { useState, FormEvent } from 'react';
// @ts-ignore - JS component without TS types yet
import Input from '../components/Input';
// @ts-ignore - JS component without TS types yet
import Button from '../components/Button';
import fetchLogin from '../api/loginApi';

type LogInPageProps = {
	isLogged: boolean
	userLogin: string
	setIsLogged: (value: boolean) => void
	setUserLogin: (value: string) => void
}

function LogInPage({ isLogged, userLogin, setIsLogged, setUserLogin }: LogInPageProps) {
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
	async function handleSubmit(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();

		const loginToSend = trimmedLogin;
		const passwordToSend = trimmedPassword;

		if (!isFormValid || isLoading) return;

		setIsLoading(true);
		setError('');

		try {
			const data = await fetchLogin(isRegister, loginToSend, passwordToSend);

			// если сервер вернул токен — считаем пользователя авторизованным
			if (data.access_token) {
				setIsLogged(true);

				if (data.user && data.user.login) {
					setUserLogin(data.user.login);
				} else {
					setUserLogin(loginToSend);
				}
			} else {
				throw new Error(data.message || 'Ошибка авторизации');
			}

		} catch (err: unknown) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Произошла ошибка');
			}
		} finally {
			setIsLoading(false);
		}
	}

	function handleLogout() {
		// удаляем токен и логин из localStorage
		localStorage.removeItem('auth_token');

		// обновляем состояние приложения
		setIsLogged(false);
		setUserLogin('');
	}

	if (isLogged) {
		return (
			<>
			{/* <div className="login login_page"> */}
				<Link to="/3000-words/" className="ago-button button-48">
					←
				</Link>

				<div className="login__container">
					<h1 className="login__title">Здравствуйте, {userLogin}</h1>

					<Button
						text='Выйти'
						onclick={handleLogout}
						// type="submit"
					/>
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
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value)}
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
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
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