import React from 'react'
import Link from 'next/link';
import Image from 'next/image'
import githublogo from '../public/github.png'

type Props = {}

const Nav = (props: Props) => {

    const links = [
        { href: '/', label: 'Home' },
        { href: '/reports', label: 'Reports' },
        { href: '/citylist', label: 'Citylist' },
        { href: '/explanation', label: 'surprise!' },
    ];
 return (
     <nav className="bg-orange-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                    <Link legacyBehavior href="/">
                            <Image
                                src="/sabbar.png"
                                alt="sabbar logo"
                                width={100}
                                height={70}
                            />
                    </Link>
                </div>
                <div className="hidden md:block">
                    <div className="ml-10 flex items-center space-x-8">
                        {links.map(({ href, label }) => (
                            <Link legacyBehavior key={href} href={href}>
                                <a className="text-white hover:bg-orange-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                                    {label}
                                </a>
                            </Link>
                        ))}
                    </div>
                </div>
                <div>
                <Link
                    legacyBehavior
                    href="https://github.com/abdallaamin"
                    target="_blank"
                    rel="noopener noreferrer">
                    <a style={{ color: 'white' }}>
                        <Image
                            src={githublogo}
                            alt="githublogo"
                            width={40}
                            height={40}
                        />
                    </a>
                </Link>
                </div>
            </div>
        </div>
    </nav>
 )
}

export default Nav


