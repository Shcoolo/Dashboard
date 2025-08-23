import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';
// import '@fullcalendar/list/main.css';

const YearCalendar = () => {
  const handleDateClick = (info) => {
    alert(`Date clicked: ${info.dateStr}`);
  };

  const handleEventClick = (info) => {
    alert(`Event: ${info.event.title}`);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
      }}
      events={[
        { title: 'Meeting', date: '2025-08-15' },
        { title: 'Conference', date: '2025-08-20' },
      ]}
      dateClick={handleDateClick}
      eventClick={handleEventClick}
      selectable={true}
      editable={true}
    />
  );
};

export default YearCalendar;
