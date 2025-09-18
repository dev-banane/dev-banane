export interface Project {
    id: number;
    title: string;
    description: string;
    type: string;
    typeColor: string;
    url: string;
    github: string | null;
    technologies: string[];
    featured: boolean;
    stats?: string;
    showOnHomepage: boolean;
}

export const projects: Project[] = [
    {
        id: 1,
        title: 'PFControl',
        description:
            'A web-based flight-strip management platform for Air Traffic Controllers on Project Flight.',
        type: 'Website',
        typeColor: 'orange',
        url: 'https://control.pfconnect.online',
        github: null,
        technologies: ['React', 'TailwindCSS', 'JavaScript', 'Node.js'],
        featured: true,
        stats: '4.500+ users',
        showOnHomepage: true
    },
    {
        id: 2,
        title: 'PFConnect Bot',
        description:
            'A comprehensive management bot for virtual aviation communities, providing features like flight logging, ticket management, and shift logging.',
        type: 'Discord',
        typeColor: 'purple',
        url: 'https://pfconnect.online',
        github: null,
        technologies: ['Discord.js', 'JavaScript', 'Node.js', 'MongoDB'],
        featured: true,
        stats: '250+ servers',
        showOnHomepage: true
    },
    {
        id: 3,
        title: 'PFConnect API',
        description:
            'A RESTful API for PFConnect, providing endpoints for the whole PFConnect ecosystem. Including a Statistics Dashboard and Documentation.',
        type: 'API',
        typeColor: 'blue',
        url: 'https://api.pfconnect.online',
        github: null,
        technologies: ['JavaScript', 'Node.js', 'Express', 'SQLite'],
        featured: true,
        showOnHomepage: true
    },
    {
        id: 4,
        title: 'Cephie API',
        description:
            'A powerful image upload API service providing fast and reliable file handling capabilities for applications and automated workflows.',
        type: 'API',
        typeColor: 'blue',
        url: 'https://api.cephie.app',
        github: null,
        technologies: ['React', 'TypeScript', 'Node.js', 'SQLite'],
        featured: false,
        showOnHomepage: false
    },
    {
        id: 5,
        title: 'Cephie Snap',
        description:
            'A web-based image sharing platform that allows users to upload pictures and receive instant, permanent URLs for easy sharing and integration.',
        type: 'Website',
        typeColor: 'orange',
        url: 'https://snap.cephie.app',
        github: null,
        technologies: ['React', 'TailwindCSS', 'TypeScript', 'Node.js'],
        featured: false,
        showOnHomepage: false
    },
    {
        id: 6,
        title: 'Web Dashboard',
        description:
            'A web-based dashboard for managing the PFConnect Bot, allowing users to configure settings and manage their virtual airline operations.',
        type: 'Website',
        typeColor: 'orange',
        url: 'https://pfconnect.online',
        github: null,
        technologies: ['React', 'TailwindCSS', 'JavaScript', 'Node.js'],
        featured: true,
        showOnHomepage: true
    },
];