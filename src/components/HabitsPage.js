import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import { ThreeDots } from 'react-loader-spinner';
import { IconContext } from 'react-icons/lib';
import { IoTrashOutline } from 'react-icons/io5';
import dayjs from 'dayjs';

import Header from './Header';
import Footer from './Footer';

import UserContext from '../contexts/UserContext';
import PercentageContext from '../contexts/PercentageContext';
import DailyHabitsContext from '../contexts/DailyHabitsContext';

function HabitsPage() {
	const navigate = useNavigate();
	const [habits, setHabits] = useState([]);
	const [newHabit, setNewHabit] = useState({ name: '', days: [] });
	const [isLoading, setIsLoading] = useState(false);
	const [isHabitCreationBoxOpen, setIsHabitCreationBoxOpen] = useState(false);
	const { userInfos } = useContext(UserContext);
	const { dailyHabits, setDailyHabits } = useContext(DailyHabitsContext);
	const { setPercentage } = useContext(PercentageContext);

	const daysOfTheWeek = [
		{ simbol: 'D' },
		{ simbol: 'S' },
		{ simbol: 'T' },
		{ simbol: 'Q' },
		{ simbol: 'Q' },
		{ simbol: 'S' },
		{ simbol: 'S' },
	];

	const weekdayNumber = dayjs().locale('pt-br').format('d');

	const config = {
		headers: {
			Authorization: `Bearer ${userInfos.token}`,
		},
	};

	useEffect(() => {
		const API = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';

		axios
			.get(API, config)
			.then((response) => {
				setHabits(response.data);
			})
			.catch(() => navigate('/'));
	}, []);

	const selectUnselectDay = (dayIndex) => {
		const isDaySelected = newHabit.days.some((day) => day.index === dayIndex);
		if (isDaySelected) {
			setNewHabit({ ...newHabit, days: newHabit.days.filter((day) => day.index !== dayIndex) });
		} else {
			setNewHabit({ ...newHabit, days: [...newHabit.days, { index: dayIndex }] });
		}
	};

	const saveNewHabit = () => {
		if (newHabit.name.trim() === '' || newHabit.days.length === 0) return;
		setIsLoading(true);

		const API = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits';
		const body = {
			name: newHabit.name,
			days: newHabit.days.map((day) => day.index),
		};

		axios
			.post(API, body, config)
			.then((response) => {
				setHabits([...habits, response.data]);
				setIsLoading(false);
				setIsHabitCreationBoxOpen(false);
				setNewHabit({ name: '', days: [] });

				const isNewDailyHabit = newHabit.days.some((day) => day.index === Number(weekdayNumber));
				const updatedDailyHabit = isNewDailyHabit ? [...dailyHabits, response.data] : [...dailyHabits];
				setDailyHabits(updatedDailyHabit);
				setPercentage(
					(updatedDailyHabit.filter((dailyHabit) => dailyHabit.done).length / updatedDailyHabit.length) * 100
				);
			})
			.catch(() => {
				setIsLoading(false);
				alert('Falha ao salvar o hábito!');
			});
	};

	const deleteHabit = (habitId, habitName) => {
		const API = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habitId}`;

		// eslint-disable-next-line no-restricted-globals
		if (confirm(`Você realmente deseja deletar o hábito '${habitName}'?`)) {
			axios
				.delete(API, config)
				.then(() => {
					setHabits(habits.filter((habit) => habit.id !== habitId));
					const updatedDailyHabit = dailyHabits.filter((dailyHabit) => dailyHabit.id !== habitId);
					setDailyHabits(updatedDailyHabit);
					setPercentage(
						(updatedDailyHabit.filter((dailyHabit) => dailyHabit.done).length / updatedDailyHabit.length) *
							100
					);
				})
				.catch(() => alert('Falha ao deletar o hábito!'));
		}
	};

	return (
		<Container>
			<Header />
			<SubHeader>
				<p>{'Meus hábitos'}</p>
				<div onClick={() => setIsHabitCreationBoxOpen(!isHabitCreationBoxOpen)}>+</div>
			</SubHeader>
			<Content>
				{isHabitCreationBoxOpen ? (
					<HabitCreationBox>
						<Input
							type='text'
							name='name'
							value={newHabit.name}
							onChange={(event) => setNewHabit({ ...newHabit, name: event.target.value })}
							placeholder='nome do hábito'
							readOnly={isLoading}
							required
							background={isLoading ? '#f2f2f2' : '#ffffff'}
							color={isLoading ? '#b3b3b3' : '#666666'}
						/>
						<Days>
							{daysOfTheWeek.map((day, index) => (
								<Day
									key={index}
									onClick={() => selectUnselectDay(index)}
									disabled={isLoading}
									background={newHabit.days.some((d) => d.index === index) ? '#cfcfcf' : '#ffffff'}
									color={newHabit.days.some((d) => d.index === index) ? '#ffffff' : '#dbdbdb'}
								>
									{day.simbol}
								</Day>
							))}
						</Days>
						<Buttons>
							<Button
								onClick={() => setIsHabitCreationBoxOpen(!isHabitCreationBoxOpen)}
								background={'#ffffff'}
								color={'#52B6FF'}
								disabled={isLoading}
							>
								Cancelar
							</Button>
							<Button
								onClick={saveNewHabit}
								background={'#52B6FF'}
								color={'#FFFFFF'}
								disabled={isLoading}
							>
								{isLoading ? <ThreeDots color='#ffffff' height={50} width={50} /> : 'Salvar'}
							</Button>
						</Buttons>
					</HabitCreationBox>
				) : null}
				{habits.length === 0 ? (
					<NoHabit>
						{'Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!'}
					</NoHabit>
				) : (
					habits.map((habit) => (
						<Habit key={habit.id}>
							<p>{habit.name}</p>
							<IconContext.Provider value={{ className: 'icon', color: '#666666', size: '20px' }}>
								<IoTrashOutline onClick={() => deleteHabit(habit.id, habit.name)} />
							</IconContext.Provider>
							<Days>
								{daysOfTheWeek.map((day, index) => (
									<Day
										key={index}
										background={habit.days.some((d) => d === index) ? '#cfcfcf' : '#ffffff'}
										color={habit.days.some((d) => d === index) ? '#ffffff' : '#dbdbdb'}
									>
										{day.simbol}
									</Day>
								))}
							</Days>
						</Habit>
					))
				)}
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
	margin-bottom: 105px;
`;

const HabitCreationBox = styled.div`
	height: 180px;
	background: #ffffff;
	border-radius: 5px;
	margin-bottom: 29px;
	padding: 18px;
`;

const Input = styled.input`
	width: 100%;
	height: 45px;
	background: ${(props) => props.background};
	border: 1px solid #d5d5d5;
	border-radius: 5px;
	padding: 0 11px;
	outline: none;
	font-size: 19.976px;
	line-height: 25px;
	color: ${(props) => props.color};
	margin-bottom: 8px;

	&::placeholder {
		color: #dbdbdb;
	}
`;

const Days = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
`;

const Day = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 30px;
	height: 30px;
	background: ${(props) => props.background};
	border: 1px solid #d5d5d5;
	border-radius: 5px;
	margin-right: 4px;
	font-size: 19.976px;
	line-height: 25px;
	color: ${(props) => props.color};
	cursor: pointer;
`;

const Buttons = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-end;
	margin-top: 29px;
`;

const Button = styled.button`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 84px;
	height: 35px;
	background: ${(props) => props.background};
	border: none;
	border-radius: 4.63636px;
	font-size: 15.976px;
	line-height: 20px;
	color: ${(props) => props.color};
	cursor: pointer;
`;

const NoHabit = styled.div`
	font-size: 17.976px;
	line-height: 22px;
	color: #666666;
`;

const Habit = styled.div`
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	justify-content: space-between;
	height: auto;
	background: #ffffff;
	border-radius: 5px;
	margin-bottom: 10px;
	padding: 13px 28px 13px 13px;
	position: relative;

	p {
		width: calc(100% - 20px);
		font-size: 19.976px;
		line-height: 25px;
		color: #666666;
		margin-bottom: 10px;
		word-wrap: break-word;
	}

	.icon {
		position: absolute;
		top: 15px;
		right: 15px;
		cursor: pointer;
	}
`;

const SubHeader = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	height: 77px;
	margin-top: 70px;
	padding: 0 18px;

	p {
		font-size: 22.976px;
		line-height: 29px;
		color: #126ba5;
	}

	div {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 35px;
		background: #52b6ff;
		border: none;
		border-radius: 4.63636px;
		font-size: 26.976px;
		line-height: 34px;
		color: #ffffff;
		cursor: pointer;
	}
`;

export default HabitsPage;
