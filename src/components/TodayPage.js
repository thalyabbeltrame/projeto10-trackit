import { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import * as dayjs from 'dayjs';
import { IconContext } from 'react-icons/lib';
import { BsCheckLg } from 'react-icons/bs';

import Header from './Header';
import Footer from './Footer';

import TokenContext from '../contexts/TokenContext';
import PercentageContext from '../contexts/PercentageContext';

function TodayPage() {
	const [dailyHabits, setDailyHabits] = useState([]);
	const { token } = useContext(TokenContext);
	const { percentage, setPercentage } = useContext(PercentageContext);

	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	useEffect(() => {
		axios
			.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today', config)
			.then((response) => {
				setDailyHabits(response.data);
			});
	}, []);

	setPercentage((dailyHabits.filter((habit) => habit.done).length / dailyHabits.length) * 100);

	const unmarkHabitAsDone = (dailyHabit) => {
		axios
			.post(
				`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${dailyHabit.id}/uncheck`,
				null,
				config
			)
			.then(() => {
				dailyHabit.done = false;
				if (dailyHabit.highestSequence === dailyHabit.currentSequence) dailyHabit.highestSequence--;
				dailyHabit.currentSequence--;
				setDailyHabits(
					[...dailyHabits.filter((habit) => habit.id !== dailyHabit.id), dailyHabit].sort(
						(a, b) => a.id - b.id
					)
				);
			});
	};

	const markHabitAsDone = (dailyHabit) => {
		axios
			.post(
				`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${dailyHabit.id}/check`,
				null,
				config
			)
			.then(() => {
				dailyHabit.done = true;
				dailyHabit.currentSequence++;
				if (dailyHabit.highestSequence < dailyHabit.currentSequence)
					dailyHabit.highestSequence = dailyHabit.currentSequence;
				setDailyHabits(
					[...dailyHabits.filter((habit) => habit.id !== dailyHabit.id), dailyHabit].sort(
						(a, b) => a.id - b.id
					)
				);
			});
	};

	return (
		<Container>
			<Header />
			<SubHeader>
				<Title>{`${dayjs().format('dddd')}, ${dayjs().format('DD/MM')}`}</Title>
				<Percentage color={dailyHabits.filter((habit) => habit.done).length === 0 ? '#bababa' : '#8fc549'}>
					{dailyHabits.length && dailyHabits.filter((habit) => habit.done).length !== 0
						? `${percentage}% dos hábitos concluídos`
						: 'Nenhum hábito concluído ainda'}
				</Percentage>
			</SubHeader>
			<Content>
				{dailyHabits.length
					? dailyHabits.map((habit) => (
							<DailyHabit key={habit.id}>
								<Text>
									<h2>{habit.name}</h2>
									<div>
										{'Sequência atual:'}
										<NumberOfDays color={habit.done ? '#8fc549' : '#666666'}>{` ${
											habit.currentSequence
										} ${habit.currentSequence === 1 ? 'dia' : 'dias'}`}</NumberOfDays>
									</div>
									<div>
										{'Seu recorde:'}
										<NumberOfDays
											color={
												habit.done && habit.currentSequence === habit.highestSequence
													? '#8fc549'
													: '#666666'
											}
										>{` ${habit.highestSequence} ${
											habit.highestSequence === 1 ? 'dia' : 'dias'
										}`}</NumberOfDays>
									</div>
								</Text>
								<Button
									background={habit.done ? '#8fc549' : '#ebebeb'}
									border={habit.done ? 'none' : '1px solid #e7e7e7'}
								>
									<IconContext.Provider value={{ color: '#ffffff', size: '40px' }}>
										<BsCheckLg
											onClick={
												habit.done
													? () => unmarkHabitAsDone(habit)
													: () => markHabitAsDone(habit)
											}
										/>
									</IconContext.Provider>
								</Button>
							</DailyHabit>
					  ))
					: null}
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

const Content = styled.div`
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 0 18px;
	margin-bottom: 70px;
`;

const DailyHabit = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	height: auto;
	background: #ffffff;
	border-radius: 5px;
	margin-bottom: 10px;
	padding: 13px;
`;

const Text = styled.div`
	display: flex;
	flex-wrap: wrap;
	flex-direction: column;
	width: calc(100% - 79px);
	color: #666666;

	h2 {
		font-size: 19.976px;
		line-height: 25px;
		margin-bottom: 8px;
	}

	div {
		display: flex;
		flex-direction: row;
		font-size: 12.976px;
		line-height: 16px;
	}
`;

const NumberOfDays = styled.p`
	color: ${(props) => props.color};
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 69px;
	height: 69px;
	background: ${(props) => props.background};
	border: ${(props) => props.border};
	border-radius: 5px;
	cursor: pointer;
`;

const SubHeader = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: center;
	width: 100%;
	height: 107px;
	margin-top: 70px;
	padding: 0 18px;
`;

const Title = styled.h2`
	font-size: 22.976px;
	line-height: 29px;
	color: #126ba5;
`;

const Percentage = styled.p`
	font-size: 17.976px;
	line-height: 22px;
	color: ${(props) => props.color};
`;

export default TodayPage;
