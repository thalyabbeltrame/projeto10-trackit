import styled from 'styled-components';

import Header from './Header';
import Footer from './Footer';

function HistoryPage() {
	return (
		<Container>
			<Header />
			<SubHeader>Histórico</SubHeader>
			<Content>Em breve você poderá ver o histórico dos seus hábitos aqui!</Content>
			<Footer />
		</Container>
	);
}

const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 100%;
	background: #f2f2f2;
`;

const SubHeader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	width: 100%;
	height: 74px;
	margin-top: 70px;
	padding: 0 18px;
	font-size: 22.976px;
	line-height: 29px;
	color: #126ba5;
`;

const Content = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0 18px;
	margin-bottom: 70px;
	font-size: 17.976px;
	line-height: 22px;
	color: #666666;
`;

export default HistoryPage;
