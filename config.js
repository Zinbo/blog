module.exports = {
    pathPrefix: '/stack-to-basics',
    siteUrl: 'https://stacktobasics.com/',
    siteTitle: 'Stack to Basics',
    siteDescription: 'Going back to basics on software topics',
    author: 'Shane Jennings',
    postsForArchivePage: 3,
    defaultLanguage: 'en',
    googleAnalyticsID: 'UA-165280193-1', // GA tracking ID.
    disqusScript: 'https://stacktobasics-1.disqus.com/embed.js',
    pages: {
        home: '/',
        blog: 'blog',
        about: 'about',
        tag: 'tag',
        archive: 'archive',
    },
    social: {
        github: 'https://github.com/zinbo',
        linkedin: 'https://www.linkedin.com/in/shanepjennings/',
        rss: '/rss.xml',
    },
    tags: {
        angular: {
            description: 'Angular is an open source web application platform.',
        },
        electron: {
            description:
                'Electron is a framework for building cross-platform desktop applications with web technology.',
        },
        javascript: {
            description:
                'JavaScript is an object-oriented programming language used alongside HTML and CSS to give functionality to web pages.',
        },
        laravel: {
            description:
                'Laravel is a PHP framework for building web applications following the MVC pattern.',
        },
        nodejs: {
            name: 'Node.js',
            description:
                'Node.js is a tool for executing JavaScript in a variety of environments.',
        },
        rxjs: {
            name: 'RxJS',
            description:
                'RxJS is a library for reactive programming using Observables, to make it easier to compose asynchronous or callback-based code.',
        },
        sass: {
            description: 'Sass is a stable extension to classic CSS.',
        },
        typescript: {
            description:
                'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
        },
        react: {
            description:
                'React is an open source JavaScript library used for designing user interfaces.',
        },
        vuejs: {
            name: 'Vue.js',
            description:
                'Vue.js is a JavaScript framework for building interactive web applications.',
        },
        java: {
            description:
                'Java is a general-purpose programming language that is class-based, object-oriented, and designed to have as few implementation dependencies as possible.',
        },
        spring: {
            description:
                'The Spring Framework is an application framework and inversion of control container for the Java platform.',
        },
        kotlin: {
            description:
                'Kotlin is a cross-platform, statically typed, general-purpose programming language with type inference..',
        },
        jackson: {
            description:
                'Jackson is a high-performance JSON processor for Java.'
        },
        json: {
            description:
                'JSON (JavaScript Object Notation) is an open standard file format and data interchange format that uses human-readable text to store and transmit data objects consisting of attribute–value pairs and arrays (or other serializable values).'
        },
        "spring-boot": {
            description: 'Spring Boot makes it easy to create stand-alone, production-grade Spring based Applications that you can "just run".'

        },
        "spring-cloud": {
            description: 'Spring Cloud provides tools for developers to quickly build some of the common patterns in distributed systems (e.g. configuration management, service discovery, circuit breakers, intelligent routing, micro-proxy, control bus, one-time tokens, global locks, leadership election, distributed sessions, cluster state).'
        },
        nextjs: {
            description: 'Next.js is an open-source web development framework providing React-based web applications with server-side rendering and static website generation. '
        }
    },
}
