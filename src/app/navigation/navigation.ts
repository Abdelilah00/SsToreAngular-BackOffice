import {FuseNavigation} from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'applications',
        title: 'Applications',
        translate: 'NAV.APPLICATIONS',
        type: 'group',
        icon: 'apps',
        children: [
            {
                id: 'dashboards',
                title: 'Dashboards',
                translate: 'NAV.DASHBOARDS',
                type: 'collapsable',
                icon: 'dashboard',
                children: [
                    {
                        id: 'analytics',
                        title: 'Analytics',
                        type: 'item',
                        url: '/apps/dashboards/analytics'
                    },
                    {
                        id: 'project',
                        title: 'Project',
                        type: 'item',
                        url: '/apps/dashboards/project'
                    }
                ]
            },

            {
                id: 'products',
                title: 'Products',
                translate: 'NAV.ECOMMERCE',
                type: 'collapsable',
                icon: 'shopping_cart',
                children: [
                    {
                        id: 'product',
                        title: 'Product',
                        type: 'item',
                        url: '/apps/products/product',
                        exactMatch: true
                    },
                    {
                        id: 'category',
                        title: 'Category',
                        type: 'item',
                        url: '/apps/products/category',
                        exactMatch: true
                    },
                    {
                        id: 'shipping-method',
                        title: 'Shipping Method',
                        type: 'item',
                        url: '/apps/products/shipping-method',
                        exactMatch: true
                    },
                ]
            },
        ]
    },

    {
        id: 'pages',
        title: 'Pages',
        type: 'group',
        icon: 'pages',
        children: [
            {
                id: 'authentication',
                title: 'Authentication',
                type: 'collapsable',
                icon: 'lock',
                badge: {
                    title: '10',
                    bg: '#525e8a',
                    fg: '#FFFFFF'
                },
                children: [
                    {
                        id: 'login',
                        title: 'Login',
                        type: 'item',
                        url: '/pages/auth/login'
                    },
                    {
                        id: 'login-v2',
                        title: 'Login v2',
                        type: 'item',
                        url: '/pages/auth/login-2'
                    },
                    {
                        id: 'register',
                        title: 'Register',
                        type: 'item',
                        url: '/pages/auth/register'
                    },
                    {
                        id: 'register-v2',
                        title: 'Register v2',
                        type: 'item',
                        url: '/pages/auth/register-2'
                    },
                    {
                        id: 'forgot-password',
                        title: 'Forgot Password',
                        type: 'item',
                        url: '/pages/auth/forgot-password'
                    },
                    {
                        id: 'forgot-password-v2',
                        title: 'Forgot Password v2',
                        type: 'item',
                        url: '/pages/auth/forgot-password-2'
                    },
                    {
                        id: 'reset-password',
                        title: 'Reset Password',
                        type: 'item',
                        url: '/pages/auth/reset-password'
                    },
                    {
                        id: 'reset-password-v2',
                        title: 'Reset Password v2',
                        type: 'item',
                        url: '/pages/auth/reset-password-2'
                    },
                    {
                        id: 'lock-screen',
                        title: 'Lock Screen',
                        type: 'item',
                        url: '/pages/auth/lock'
                    },
                    {
                        id: 'mail-confirmation',
                        title: 'Mail Confirmation',
                        type: 'item',
                        url: '/pages/auth/mail-confirm'
                    }
                ]
            },
            {
                id: 'errors',
                title: 'Errors',
                type: 'collapsable',
                icon: 'error',
                children: [
                    {
                        id: '404',
                        title: '404',
                        type: 'item',
                        url: '/pages/errors/error-404'
                    },
                    {
                        id: '500',
                        title: '500',
                        type: 'item',
                        url: '/pages/errors/error-500'
                    }
                ]
            },

            {
                id: 'profile',
                title: 'Profile',
                type: 'item',
                icon: 'person',
                url: '/pages/profile'
            },
            {
                id: 'search',
                title: 'Search',
                type: 'collapsable',
                icon: 'search',
                children: [
                    {
                        id: 'search-classic',
                        title: 'Classic',
                        type: 'item',
                        url: '/pages/search/classic'
                    },
                    {
                        id: 'search-modern',
                        title: 'Modern',
                        type: 'item',
                        url: '/pages/search/modern'
                    }
                ]
            },
        ]
    },
];