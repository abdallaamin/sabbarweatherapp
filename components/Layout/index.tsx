import * as React from 'react';
import Nav from '../Nav'

export interface LayoutProps {
    children: any
}

export default function Layout({children}: LayoutProps) {
    return (
        <div>
            <Nav />
            <main>
                {children}
            </main>
        </div>
    );
}
