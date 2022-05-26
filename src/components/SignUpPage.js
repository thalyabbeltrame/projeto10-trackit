import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import logo from '../assets/images/logo.png';
import LoginPage from './LoginPage';
import { ThreeDots } from 'react-loader-spinner';

function SignUpPage() {
	const navigate = useNavigate();
	const [signUpInfos, setSignUpInfos] = useState({
		email: '',
		name: '',
		image: '',
		password: '',
	});
	const [isLoading, setIsLoading] = useState(false);

	const signUp = (event) => {
		event.preventDefault();
		setIsLoading(true);
		axios
			.post('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up', signUpInfos)
			.then(() => navigate('/'))
			.catch(() => {
				setIsLoading(false);
				alert('Aconteceu um erro inesperado e seus dados não foram enviados com sucesso!');
			});
	};

	const handleInputChange = (event) => {
		setSignUpInfos({ ...signUpInfos, [event.target.name]: event.target.value });
	};

	return (
		<Container>
			<Logo src={logo} alt='TrackIt Logo' />
			<Form onSubmit={signUp}>
				<Input
					type='email'
					name='email'
					value={signUpInfos.email}
					onChange={handleInputChange}
					placeholder='email'
					readOnly={isLoading}
					required
					background={isLoading ? '#f2f2f2' : '#ffffff'}
					color={isLoading ? '#afafaf' : '#dbdbdb'}
				/>
				<Input
					type='password'
					name='password'
					value={signUpInfos.password}
					onChange={handleInputChange}
					placeholder='senha'
					minLength='8'
					readOnly={isLoading}
					required
					background={isLoading ? '#f2f2f2' : '#ffffff'}
					color={isLoading ? '#afafaf' : '#dbdbdb'}
				/>
				<Input
					type='text'
					name='name'
					value={signUpInfos.name}
					onChange={handleInputChange}
					placeholder='nome'
					readOnly={isLoading}
					required
					background={isLoading ? '#f2f2f2' : '#ffffff'}
					color={isLoading ? '#afafaf' : '#dbdbdb'}
				/>
				<Input
					type='text'
					name='image'
					value={signUpInfos.image}
					onChange={handleInputChange}
					placeholder='foto'
					readOnly={isLoading}
					required
					background={isLoading ? '#f2f2f2' : '#ffffff'}
					color={isLoading ? '#afafaf' : '#dbdbdb'}
				/>
				<Button type='submit' disabled={isLoading}>
					{isLoading ? <ThreeDots color='#ffffff' height={60} width={60} /> : 'Cadastrar'}
				</Button>
			</Form>
			<Link to='/' element={<LoginPage />}>
				<Login>Já tem uma conta? Faça login!</Login>
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

const Login = styled.p`
	font-size: 13.976px;
	line-height: 17px;
	text-decoration-line: underline;
	color: #52b6ff;
	cursor: pointer;

	&:hover {
		filter: contrast(100%);
	}
`;

export default SignUpPage;
