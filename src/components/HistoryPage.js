import { useEffect, useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import dayjs from 'dayjs';

import UserContext from '../contexts/UserContext';

import Header from './Header';
import Footer from './Footer';

function HistoryPage() {
	const { userInfos } = useContext(UserContext);
	const [history, setHistory] = useState([]);

	const config = {
		headers: {
			Authorization: `Bearer ${userInfos.token}`,
		},
	};

	useEffect(() => {
		const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/history/daily';

		axios.get(URL, config).then((response) => {
			setHistory(response.data);
		});
	}, [history]);

	const setTileStyle = (date) => {
		const localeDate = date.toLocaleDateString('pt-br');
		const habitsDay = history.filter((value) => value.day === localeDate);
		if (habitsDay.length) {
			if (habitsDay[0].habits.every((habit) => habit.done)) return 'done';
			else return 'not-done';
		} else {
			return '';
		}
	};

	return (
		<Container>
			<Header />
			<SubHeader>Histórico</SubHeader>
			<Content>
				<Calendar
					className='calendar'
					locale='pt-br'
					formatDay={(locale, date) => <p>{dayjs(date).format('DD')}</p>}
					tileClassName={({ date }) => `calendar-tile ${setTileStyle(date)}`}
				/>
			</Content>
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
	align-items: center;
	width: 100%;
	padding: 0 18px;
	margin-bottom: 70px;
	font-size: 17.976px;
	line-height: 22px;
	color: #666666;

	.calendar {
		border: none;
		border-radius: 10px;
		width: 100%;
		border-radius: 10px;
	}

	p {
		font-size: 16px;
	}

	.calendar-tile {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 16px;
		height: 40px;
		width: 40px;
		border-radius: 100%;

		&.done {
			background-color: green;
		}

		&.not-done {
			background-color: red;
		}
	}
`;

export default HistoryPage;
