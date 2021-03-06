import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import logo from '../assets/images/logo.png';
import { ThreeDots } from 'react-loader-spinner';

import SignUpPage from './SignUpPage';

import UserContext from '../contexts/UserContext';

function SignInPage() {
	const navigate = useNavigate();
	const [loginInfos, setLoginInfos] = useState({ email: '', password: '' });
	const [isLoading, setIsLoading] = useState(false);
	const { setUserInfos } = useContext(UserContext);

	useEffect(() => {
		let userInfos = localStorage.getItem('userInfos');
		if (userInfos !== null) {
			userInfos = JSON.parse(userInfos);
			setUserInfos({ image: userInfos.image, token: userInfos.token });
			navigate('/hoje');
		}
	}, []);

	const login = (event) => {
		event.preventDefault();
		setIsLoading(true);

		const API = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login';

		axios
			.post(API, loginInfos)
			.then((response) => {
				const allUserInfos = JSON.stringify(response.data);
				localStorage.setItem('userInfos', allUserInfos);
				navigate('/hoje');
			})
			.catch((error) => {
				setIsLoading(false);
				alert('Usuário e/ou senha inválidos!');
			});
	};

	const handleInputChange = (event) => {
		setLoginInfos({ ...loginInfos, [event.target.name]: event.target.value });
	};

	return (
		<Container>
			<Logo src={logo} alt='TrackIt Logo' />
			<Form onSubmit={login}>
				<Input
					type='email'
					name='email'
					value={loginInfos.email}
					onChange={handleInputChange}
					placeholder='email'
					readOnly={isLoading}
					required
					background={isLoading ? '#f2f2f2' : '#ffffff'}
					color={isLoading ? '#afafaf' : '#666666'}
				/>
				<Input
					type='password'
					name='password'
					value={loginInfos.password}
					onChange={handleInputChange}
					placeholder='senha'
					minLength='8'
					readOnly={isLoading}
					required
					background={isLoading ? '#f2f2f2' : '#ffffff'}
					color={isLoading ? '#afafaf' : '#666666'}
				/>
				<Button type='submit' disabled={isLoading}>
					{isLoading ? <ThreeDots color='#ffffff' height={60} width={60} /> : 'Entrar'}
				</Button>
			</Form>
			<Link to='/cadastro' element={<SignUpPage />}>
				<SignUp>Não tem uma conta? Cadastre-se!</SignUp>
			</Link>
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background: #ffffff;
`;

const Logo = styled.img`
	width: 180px;
	height: 180px;
	margin-bottom: 40px;
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	align-items: center;
	margin-bottom: 25px;
`;

const Input = styled.input`
	width: 303px;
	height: 45px;
	background: ${(props) => props.background};
	border: 1px solid #d5d5d5;
	border-radius: 5px;
	padding: 0 11px;
	margin-bottom: 6px;
	font-size: 19.976px;
	line-height: 25px;
	color: ${(props) => props.color};

	&:focus {
		outline: none;
	}

	&::placeholder {
		color: #dbdbdb;
	}
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 303px;
	height: 45px;
	background: #52b6ff;
	border: none;
	border-radius: 4.63636px;
	font-size: 20.976px;
	line-height: 26px;
	color: #ffffff;
	cursor: pointer;
`;

const SignUp = styled.p`
	font-size: 13.976px;
	line-height: 17px;
	text-decoration-line: underline;
	color: #52b6ff;
	cursor: pointer;
`;

export default SignInPage;
