import { Link } from 'react-router-dom';
import styled from 'styled-components';

import HabitsPage from './HabitsPage';
import TodayPage from './TodayPage';
import HistoryPage from './HistoryPage';

function Footer() {
	return (
		<FooterContainer>
			<Link to='/habitos' element={<HabitsPage />}>
				<p>Hábitos</p>
			</Link>
			<Link to='/hoje' element={<TodayPage />}>
				<p>Hoje</p>
			</Link>
			<Link to='/historico' element={<HistoryPage />}>
				<p>Histórico</p>
			</Link>
		</FooterContainer>
	);
}

const FooterContainer = styled.footer`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 70px;
	background: #ffffff;
	position: fixed;
	left: 0;
	bottom: 0;
	z-index: 1;
	padding: 0 36px;

	p {
		font-size: 17.976px;
		line-height: 22px;
		color: #52b6ff;
	}
`;

export default Footer;
