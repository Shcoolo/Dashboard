import { AccessTime, Assessment, AssignmentInd, BarChartOutlined, CalendarTodayOutlined, CalendarViewWeek, Campaign, CommentBank, CoPresent, Hail, Home, LocalConvenienceStoreOutlined, People, PeopleOutline, PeopleOutlined, PieChartOutlineOutlined, School, Settings, Task, TimelineOutlined, ViewWeek } from '@mui/icons-material'

export const pages = [
    // home
    {
        property: [
            {
                title: 'Dashboard',
                path: '',
                icon: Home,
            }
        ]
    },
    {
        name: 'School Management',
        property: [
            {
                title: 'School profile',
                path: 'information',
                icon: Settings
            },
        ]
    },
    // management
    {
        name: 'Management',
        property: [
            {
                title: 'Students Managment',
                path: 'students',
                icon: Hail
            },
            {
                title: 'Teachers Management',
                path: 'teachers',
                icon: People
            }, 
             {
                title: 'Staff Management',
                path: 'adminstrators',
                icon: PeopleOutline
            },
        ]
    },
    // academices
    {
        name: "Academices",
        property: [
            {
                title: 'Academic years',
                path: 'academic-years',
                icon: CalendarViewWeek
            }, 
            {
                title: 'Academic Terms',
                path: 'academic-terms',
                icon: ViewWeek
            },
            {
                title: 'Time Slots',
                path: 'time-slots',
                icon: AccessTime,
            },
            {
                title: 'Classes',
                path: 'classes',
                icon: AssignmentInd
            },
            {
                title: 'Sections',
                path: 'sections',
                icon: LocalConvenienceStoreOutlined
            }, 
            {
                title: 'Calendar',
                path: 'calendar',
                icon: CalendarTodayOutlined
            },
        ]
    },
    // admin
    {
        name: "SuperVising",
        property: [
            {
                title: 'Attendance',
                path: 'attendance',
                icon: CoPresent,
            },
            {
                title: 'Subjects',
                path: 'subjects',
                icon: School
            }, 
            {
                title: 'Tasks & Exams',
                path: 'tasks',
                icon: Task,
            },
            {
                title: 'Reports',
                path: 'reports',
                icon: Assessment,
            },
        ]
    },
    // communication
    {
        name: "Communication",
        property: [
              {
                title: 'Teacher Announcements',
                path: 'teacher-announcements',
                icon: CommentBank,
            },
            {
                title: 'Student Announcements',
                path: 'student-announcements',
                icon: Campaign,
            },
        ]
    },
    // view 
    {
        name: "View",
        property: [
            {
                title: 'Chart',
                path: 'bar',
                icon: BarChartOutlined,
            },
            {
                title: 'Pie',
                path: 'pie',
                icon: PieChartOutlineOutlined,
            },
            {
                title: 'Line',
                path: 'line',
                icon: TimelineOutlined
            },
        ]
    }
]