import React, {MouseEvent, useEffect, useState} from "react"
import {Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider} from "@mui/material"

import {Calendar, dateFnsLocalizer, type Event} from "react-big-calendar"

import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import fr from "date-fns/locale/fr"
import "react-big-calendar/lib/css/react-big-calendar.css"

import EventInfo from "./EventInfo"
import AddEventModal from "./AddEventModal"
import EventInfoModal from "./EventInfoModal"
import {AddCategoryModal} from "./AddCategoryModal"
import AddDatePickerEventModal from "./AddDatePickerEventModal"
import config from "../../config";

const locales = {
    fr,
}

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
})
const messages = {
    previous: "←",
    next: "→",
    today: "Aujourd'hui",
    month: "Mois",
    week: "Semaine",
    day: "Jour",
    date: "Date",
};


export interface ICategory {
    _id: number
    title: string
    color?: string
}

export interface IEventInfo extends Event {
    _id: number
    description: string
    categoryId?: number
}

export interface EventFormData {
    title: string
    description: string
    categoryId?: number
}

export interface DatePickerEventFormData {
    title: string
    description: string
    category?: number
    allDay: boolean
    start_date?: Date
    end_date?: Date
    location?: string
    id_mission?: number
}

export const generateId = () => (Math.floor(Math.random() * 10000) + 1)

const initialEventFormState: EventFormData = {
    title: "",
    description: "",
    categoryId: undefined,
}

const initialDatePickerEventFormData: EventCreationData = {
    title: "",
    description: "",
    category: 1,
    allDay: false,
    start_date: undefined,
    end_date: undefined,
    location: undefined,
    id_mission: undefined
}

export interface EventCreationData {
    title: string,
    description: string,
    category?: number,
    start_date?: Date,
    end_date?: Date,
    location?: string,
    id_mission?: number,
    allDay: boolean
}
const EventCalendar = () => {
    const [openSlot, setOpenSlot] = useState(false)
    const [openDatepickerModal, setOpenDatepickerModal] = useState(false)
    const [openCategoryModal, setOpenCategoryModal] = useState(false)
    const [currentEvent, setCurrentEvent] = useState<Event | IEventInfo | null>(null)

    const [eventInfoModal, setEventInfoModal] = useState(false)

    const [events, setEvents] = useState<IEventInfo[]>([])
    const [categories, setCategories] = useState<ICategory[]>([])

    const [eventFormData, setEventFormData] = useState<EventFormData>(initialEventFormState)

    const [datePickerEventFormData, setDatePickerEventFormData] =
        useState<DatePickerEventFormData>(initialDatePickerEventFormData)

    const [existingEvents, setExistingEvents] = useState<IEventInfo[]>([])

    const handleSelectSlot = (event: Event) => {
        setOpenSlot(true)
        setCurrentEvent(event)
    }

    const categoryId = categories.map((category) => category._id);
    useEffect(() => {
        const token = localStorage.getItem("token");

        // Combine fetch requests
        Promise.all([
            fetch(`${config.apiUrl}/calendar/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }),
            fetch(`${config.apiUrl}/missions/association/`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token,
                },
            }),
        ]).then(([calendarResponse, missionsResponse]) => {
            // Handle the response for the calendar fetch
            if (calendarResponse.status === 200) {
                return calendarResponse.json().then((calendarData) => {
                    const formattedEvents = calendarData.map((task: any) => ({
                        title: task.title,
                        description: task.description,
                        start: new Date(task.start_date),
                        end: new Date(task.end_date),
                    }));
                    setEvents(formattedEvents);
                });
            }

            // Handle the response for the missions fetch
            if (missionsResponse.status === 200) {
                return missionsResponse.json().then((missionsData) => {
                    const formattedEvents = missionsData.map((task: any) => ({
                        title: task.title,
                        description: task.description,
                        start: new Date(task.start_date),
                        end: new Date(task.end_date),
                    }));
                    setEvents(formattedEvents);
                });
            }
        }).catch((error) => {
            console.error(error);
        });
}, []);

    const handleSelectEvent = (event: IEventInfo) => {
        setCurrentEvent(event)
        setEventInfoModal(true)
    }
    const handleClose = () => {
        setEventFormData(initialEventFormState)
        setOpenSlot(false)
    }

    const handleDatePickerClose = () => {
        setDatePickerEventFormData(initialDatePickerEventFormData)
        setOpenDatepickerModal(false)
    }

    const onAddEvent = (e: MouseEvent<HTMLButtonElement>) => {

        const data: IEventInfo = {
            ...eventFormData,
            _id: generateId(),
            start: currentEvent?.start,
            end: currentEvent?.end,
        }

        const newEvents = [...events, data]

        setEvents(newEvents)
        handleClose()
    }

    const onAddEventFromDatePicker = (e: MouseEvent<HTMLButtonElement>) => {

        const addHours = (date: Date | undefined, hours: number) => {
            return date ? date.setHours(date.getHours() + hours) : undefined
        }

        const setMinToZero = (date: any) => {
            return date
        }

        const data: IEventInfo = {
            ...datePickerEventFormData,
            _id: generateId(),
            start: setMinToZero(datePickerEventFormData.start_date),
            end: datePickerEventFormData.allDay
                ? addHours(datePickerEventFormData.start_date, 12)
                : setMinToZero(datePickerEventFormData.end_date),
        }

        const newEvents = [...events, data]
        createNewEvent();
        setEvents(newEvents)
        setDatePickerEventFormData(initialDatePickerEventFormData)
    }

    const onDeleteEvent = () => {
        setEvents(() => [...events].filter((e) => e._id !== (currentEvent as IEventInfo)._id!))
        setEventInfoModal(false)
    }

    const createNewEvent = () => {
        const token = localStorage.getItem("token");
        const body = {
            title: datePickerEventFormData?.title,
            description: datePickerEventFormData?.description,
            category: datePickerEventFormData?.category,
            start_date: datePickerEventFormData?.start_date,
            end_date: datePickerEventFormData?.end_date,
            location: datePickerEventFormData?.location,
            id_mission: datePickerEventFormData?.id_mission
        };
        fetch(`${config.apiUrl}/calendar/create`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + token, // localStorage.getItem("token")
            },
            body: JSON.stringify(body),
        })
            .then((response) => {
                console.log(response);
                if (response.status === 201) {
                    alert("Évènement créée");
                    return response.body;
                }
            })
            .then(
                (data) => {
                    data
                        ?.getReader()
                        .read()
                        .then(({ done, value }) => {
                            if (done) {
                                alert("Évènement créée");
                                return;
                            }
                        });
                },
                (error) => {
                    alert("Erreur lors de la création de l'évènement");
                }
            );
    };

    return (
        <Box
            mt={2}
            mb={2}
            component="main"
            sx={{
                flexGrow: 1,
                py: 8,
            }}
        >
            <Container maxWidth={false}>
                <Card>
                    <CardHeader title="Calendrier d'association" subheader="Créez des événements et des categories et gérez-les facilement" />
                    <Divider />
                    <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <ButtonGroup size="large" variant="contained" aria-label="outlined primary button group">
                                <Button onClick={() => setOpenDatepickerModal(true)} size="small" variant="contained">
                                    Ajouter un évènement
                                </Button>
                                <Button onClick={() => setOpenCategoryModal(true)} size="small" variant="contained">
                                    Créer une catégorie
                                </Button>
                            </ButtonGroup>
                        </Box>
                        <Divider style={{ margin: 10 }} />
                        <AddEventModal
                            open={openSlot}
                            handleClose={handleClose}
                            eventFormData={eventFormData}
                            setEventFormData={setEventFormData}
                            onAddEvent={onAddEvent}
                            categories={categories}
                        />
                        <AddDatePickerEventModal
                            open={openDatepickerModal}
                            handleClose={handleDatePickerClose}
                            datePickerEventFormData={datePickerEventFormData}
                            setDatePickerEventFormData={setDatePickerEventFormData}
                            onAddEvent={onAddEventFromDatePicker}
                            categories={categories}
                        />
                        <EventInfoModal
                            open={eventInfoModal}
                            handleClose={() => setEventInfoModal(false)}
                            onDeleteEvent={onDeleteEvent}
                            currentEvent={currentEvent as IEventInfo}
                        />
                        <AddCategoryModal
                            open={openCategoryModal}
                            handleClose={() => setOpenCategoryModal(false)}
                            categories={categories}
                            setCategories={setCategories}
                        />
                        <Calendar
                            localizer={localizer}
                            culture={"fr"}
                            events={events}
                            onSelectEvent={handleSelectEvent}
                            onSelectSlot={handleSelectSlot}
                            selectable
                            messages={messages}
                            startAccessor="start"
                            components={{ event: EventInfo }}
                            endAccessor="end"
                            defaultView="week"
                            eventPropGetter={(event) => {
                                const hasCategory = categories.find((category) => category._id === event.categoryId)
                                return {
                                    style: {
                                        backgroundColor: hasCategory ? hasCategory.color : "rgb(78,121,110)",
                                        borderColor: hasCategory ? hasCategory.color : "rgb(103,162,147)",
                                    },
                                }
                            }}
                            style={{
                                height: 900,
                            }}
                        />
                    </CardContent>
                </Card>
            </Container>
        </Box>
    )
}

export default EventCalendar