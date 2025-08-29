import { Home, PeopleOutlined, Settings } from '@mui/icons-material'

export const pages = [
    // home
    {
        property: [
            {
                title: 'Home Page',
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
                icon: PeopleOutlined
            },
            {
                title: 'Teachers Management',
                path: 'teachers',
                icon: PeopleOutlined
            }, 
             {
                title: 'Staff Management',
                path: 'adminstrators',
                icon: PeopleOutlined
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
                icon: PeopleOutlined
            }, 
            {
                title: 'Academic Terms',
                path: 'academic-terms',
                icon: PeopleOutlined
            },
            {
                title: 'Classes',
                path: 'classes',
                icon: PeopleOutlined
            },
            {
                title: 'Sections',
                path: 'sections',
                icon: PeopleOutlined
            }, 
            {
                title: 'Time Slots',
                path: 'time-slots',
                icon: PeopleOutlined,
            },

        ]
    },
    // admin
    {
        name: "admin",
        property: [
            {
                title: 'Attendance',
                path: 'attendance',
                icon: PeopleOutlined,
            },
            {
                title: 'Subjects',
                path: 'subjects',
                icon: PeopleOutlined
            }, 
            {
                title: 'Tasks & Exams',
                path: 'tasks',
                icon: PeopleOutlined,
            },
            {
                title: 'Reports',
                path: 'reports',
                icon: PeopleOutlined,
            },
            {
                title: 'Library',
                path: 'library',
                icon: PeopleOutlined
            }
        ]
    },
    // communication
    {
        name: "Communication",
        property: [
            {
                title: 'Announcements',
                path: 'announcements',
                icon: PeopleOutlined,
            },
        ]
    },
    // settings
    {
        name: "Settings",
        property: [  
            {
                title: 'Profile',
                path: 'profile',
                icon: PeopleOutlined,
            } 
        ]

    },
]