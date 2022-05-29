import { useContext } from 'react';
import styled from 'styled-components';

import UserContext from '../contexts/UserContext';

function Header() {
	const { userInfos } = useContext(UserContext);

	return (
		<HeaderContainer>
			<Title>{'TrackIt'}</Title>
			<UserImg src={userInfos.image} alt='' />
		</HeaderContainer>
	);
}

const HeaderContainer = styled.header`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 70px;
	background: #126ba5;
	box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
	padding: 0 18px;
	position: fixed;
	left: 0;
	top: 0;
	z-index: 1;
	font-family: 'Playball', cursive;
`;

const Title = styled.h1`
	font-size: 38.982px;
	line-height: 49px;
	color: #ffffff;
`;

const UserImg = styled.img`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 51px;
	height: 51px;
	border-radius: 98.5px;
	text-align: center;
	background: #fff;
`;

export default Header;
