import React, { MouseEvent, useEffect, useState } from "react";
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider } from "@mui/material";
import { Calendar, dateFnsLocalizer, type Event } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import fr from "date-fns/locale/fr";
import "react-big-calendar/lib/css/react-big-calendar.css";
import EventInfo from "./EventInfo";
import AddEventModal from "./AddEventModal";
import EventInfoModal from "./EventInfoModal";
import { AddCategoryModal } from "./AddCategoryModal";
import AddDatePickerEventModal from "./AddDatePickerEventModal";
import config from "../../config";
import ModifyDatePickerEventModal from "./ModifyDatePickerEventModal";

const locales = { fr };
const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales });
const messages = { previous: "←", next: "→", today: "Aujourd'hui", month: "Mois", week: "Semaine", day: "Jour", date: "Date" };

export interface ICategory { _id: number, title: string, color?: string }
export interface IEventInfo extends Event { _id: number, id?: number, title: string, description: string, start?: Date, end?: Date, allDay?: boolean, category?: number, categoryId?: number }
export interface EventFormData { title: string, description: string, categoryId?: number }
export interface DatePickerEventFormData { title: string, description: string, category?: number, allDay: boolean, start_date?: Date, end_date?: Date, location?: string, id_mission?: number }
export const generateId = () => (Math.floor(Math.random() * 10000) + 1);

const initialEventFormState: EventFormData = { title: "", description: "", categoryId: 1 }; // categoryId: 1 is default category
const initialDatePickerEventFormData: EventCreationData = { title: "", description: "", category: 1, allDay: false, start_date: undefined, end_date: undefined, location: undefined, id_mission: undefined };
export interface EventCreationData { title: string, description: string, category?: number, start_date?: Date, end_date?: Date, location?: string, id_mission?: number, allDay: boolean }

const EventCalendar = () => {
    const [openSlot, setOpenSlot] = useState(false);
    const [openDatepickerModal, setOpenDatepickerModal] = useState(false);
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<Event | IEventInfo | null>(null);
    const [eventInfoModal, setEventInfoModal] = useState(false);
    const [events, setEvents] = useState<IEventInfo[]>([]);
    const [missions, setMissions] = useState<IEventInfo[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [eventFormData, setEventFormData] = useState<EventFormData>(initialEventFormState);
    const [datePickerEventFormData, setDatePickerEventFormData] = useState<DatePickerEventFormData>(initialDatePickerEventFormData);
    const [, setExistingEvents] = useState<IEventInfo[]>([]);
    const [, setResponse] = useState<{ error: Boolean; message: string }>({ error: false, message: "" });
    const [modifyEventModalOpen, setModifyEventModalOpen] = useState(false);

    const handleSelectSlot = (event: Event) => {
        setOpenSlot(true);
        setCurrentEvent(event);
    };

    const handleModifyEventModalClose = () => {
        setModifyEventModalOpen(false);
    };

    const handleModifyEvent = (event: IEventInfo) => {
        setModifyEventModalOpen(true);
        setCurrentEvent(event);
        setDatePickerEventFormData({
            allDay: event?.allDay || false,
            category: event.category,
            description: event.description,
            end_date: event.end,
            start_date: event.start,
            title: event.title ?? "",
        });
    };

    useEffect(() => {
        fetch(`${config.apiUrl}/calendar/`, {
            method: 'GET',
            headers: {
              authorization: `Bearer ${localStorage.getItem('token')}`,
              'Content-Type': 'application/json',
            },
        }).then((calendarResponse) => {
            if (calendarResponse.status === 200) {
                return calendarResponse.json().then((calendarData) => {
                    const formattedEvents = calendarData.map((task: any) => ({
                        id: task.id,
                        title: task.title,
                        description: task.description,
                        start: new Date(task.start_date),
                        end: new Date(task.end_date),
                    }));
                    setMissions(formattedEvents);
                });
            }
        }).catch((error) => {
            console.error(error);
        });
    }, [
        setMissions
    ]);

    useEffect(() => {
        fetch(`${config.apiUrl}/missions/association/`, {
                method: 'GET',
                headers: {
                  authorization: `Bearer ${localStorage.getItem('token')}`,
                  'Content-Type': 'application/json',
                },
            }).then((missionsResponse) => {
                if (missionsResponse.status === 200) {
                    return missionsResponse.json().then((missionsData) => {
                        const formattedEvents = missionsData.active.map((task: any) => ({
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
            }
        );
    }, [
        setEvents,
        setCategories,
        setExistingEvents,
        setResponse,
        setModifyEventModalOpen,
    ]);

    
    const handleSelectEvent = (event: IEventInfo) => {
        setCurrentEvent(event);
        setEventInfoModal(true);
    };

    const handleClose = () => {
        setEventFormData(initialEventFormState);
        setOpenSlot(false);
    };

    const handleDatePickerClose = () => {
        setDatePickerEventFormData(initialDatePickerEventFormData);
        setOpenDatepickerModal(false);
    };

    const onAddEvent = (e: MouseEvent<HTMLButtonElement>): EventFormData => {
        const data: IEventInfo = {
            ...eventFormData,
            _id: generateId(),
            start: currentEvent?.start,
            end: currentEvent?.end,
        };

        const newEvents = [...events, data];
        createNewEvent();
        setEvents(newEvents);
        setEventFormData(initialEventFormState);
        handleClose();
        return eventFormData;
    };

    const onAddEventFromDatePicker = (e: MouseEvent<HTMLButtonElement>) => {
        const addHours = (date: Date | undefined, hours: number) => date ? date.setHours(date.getHours() + hours) : undefined;
        const setMinToZero = (date: any) => date;

        const data: IEventInfo = {
            ...datePickerEventFormData,
            _id: generateId(),
            start: setMinToZero(datePickerEventFormData.start_date),
            end: datePickerEventFormData.allDay
                ? addHours(datePickerEventFormData.start_date, 12)
                : setMinToZero(datePickerEventFormData.end_date),
        };

        const newEvents = [...events, data];
        createNewEvent();
        setEvents(newEvents);
        setDatePickerEventFormData(initialDatePickerEventFormData);
        handleDatePickerClose();
    };

    const onDeleteEvent = () => {
        setEvents((prevEvents) => prevEvents.filter((e) => e.id !== (currentEvent as IEventInfo).id!));
        setEventInfoModal(false);
    };

    const changeHours = (date: Date | undefined) => {
        const newDate = new Date(date as Date);
        newDate.setDate(newDate.getDate() + 1);
        return newDate;
    }

    const createNewEvent = () => {
        const token = localStorage.getItem("token");
        const body = {
            title: datePickerEventFormData?.title || eventFormData.title,
            description: datePickerEventFormData?.description || eventFormData.description,
            category: datePickerEventFormData?.category || eventFormData.categoryId,
            start_date: datePickerEventFormData?.start_date || currentEvent?.start,
            end_date: currentEvent?.allDay || datePickerEventFormData?.allDay ? changeHours(datePickerEventFormData?.start_date || currentEvent?.start) : datePickerEventFormData?.end_date || currentEvent?.end,
            location: datePickerEventFormData?.location,
            id_mission: datePickerEventFormData?.id_mission
        };
        
        fetch(`${config.apiUrl}/calendar/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
            body: JSON.stringify(body),
        })
        .then((response) => {
            if (response.status === 200) {
                setResponse({ error: false, message: "Évènement créé" });
                return response.json();
            } else {
                setResponse({ error: true, message: "Erreur lors de la création de l'évènement" });
            }
        })
        .then((data) => {
            if (data) {
                setEvents((prevEvents) => [...prevEvents, data]);
            }
        })
        .catch((error) => {
            setResponse({ error: true, message: "Erreur lors de la création de l'évènement" });
            alert("Erreur lors de la création de l'évènement");
        });
    };

    const useUpdateEvent = () => {
        const token = localStorage.getItem("token");
        const body = {
            id_event: (currentEvent as IEventInfo)?.id,
            title: datePickerEventFormData?.title || eventFormData.title,
            description: datePickerEventFormData?.description || eventFormData.description,
            category: datePickerEventFormData?.category || eventFormData.categoryId,
            start_date: datePickerEventFormData?.start_date || currentEvent?.start,
            end_date: datePickerEventFormData?.end_date || currentEvent?.end,
            location: datePickerEventFormData?.location,
            id_mission: datePickerEventFormData?.id_mission
        };

        fetch(`${config.apiUrl}/calendar/update`, {
            method: "PUT",
            headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
            body: JSON.stringify(body),
        })
        .then((response) => {
            if (response.status === 200) { 
                setResponse({ error: false, message: "Évènement modifié" });
                return response.json();
            } else {
                setResponse({ error: true, message: "Erreur lors de la modification de l'évènement" });
            }
        })
        .then((data) => {
            if (data) {
                setEvents((prevEvents) => prevEvents.map((event) => event._id === data._id ? { ...event, ...data } : event));
                setModifyEventModalOpen(false);
            }
        })
        .catch((error) => {
            setResponse({ error: true, message: "Erreur lors de la modification de l'évènement" });
        });
        window.location.reload();

    };

    return (
        <Box mt={2} mb={2} component="main" sx={{ flexGrow: 1, py: 8 }}>
            <Container maxWidth={false}>
                <Card>
                    <CardHeader title="Calendrier d'association" subheader="Créez des événements et des categories et gérez-les facilement" />
                    <Divider />
                    <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                            <ButtonGroup size="large" variant="contained" aria-label="outlined primary button group">
                                <Button onClick={() => setOpenDatepickerModal(true)} size="small" variant="contained">Ajouter un évènement</Button>
                                <Button onClick={() => setOpenCategoryModal(true)} size="small" variant="contained">Créer une catégorie</Button>
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
                            onModifyEvent={handleModifyEvent}
                            onDeleteEvent={onDeleteEvent}
                            currentEvent={currentEvent as IEventInfo}
                        />
                        <ModifyDatePickerEventModal
                            open={modifyEventModalOpen}
                            handleClose={handleModifyEventModalClose}
                            datePickerEventFormData={datePickerEventFormData}
                            setDatePickerEventFormData={setDatePickerEventFormData}
                            onEditEvent={useUpdateEvent}
                            currentEvent={currentEvent as IEventInfo}
                            categories={categories}
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
                            events={[...events, ...missions]}
                            onSelectEvent={handleSelectEvent}
                            onSelectSlot={handleSelectSlot}
                            selectable
                            messages={messages}
                            startAccessor="start"
                            components={{ event: EventInfo }}
                            endAccessor="end"
                            defaultView="week"
                            eventPropGetter={(event) => {
                                const hasCategory = categories.find((category) => category._id === event.categoryId);
                                return {
                                    style: {
                                        backgroundColor: hasCategory ? hasCategory.color : "rgb(78,121,110)",
                                        borderColor: hasCategory ? hasCategory.color : "rgb(103,162,147)",
                                    },
                                };
                            }}
                            style={{ height: 900 }}
                        />
                    </CardContent>
                </Card>
            </Container>
        </Box>
    );
};

export default EventCalendar;
