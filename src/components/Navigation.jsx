import React from 'react'
import { Link } from 'react-router-dom'
export default function Navigation() {
    return (
        <nav>
            <ul>
                <li>
                    <Link className='active' to={'/home'}>Home
                    </Link>
                </li>
                <li>
                    <form>
                        <input type='text' />
                        <input type="submit" value="Search" />
                    </form>
                </li>
                <li>
                    <Link className='active' to={'/service'}>Service
                    </Link>
                </li>
                <li>
                    <Link className='active' to={'/about'}>About
                    </Link>
                </li>
                <li>
                    <Link className='active' to={'/login'}>Log In
                    </Link>
                </li>
                <li>
                    <Link className='active' to={'/signup'}>Sign Up
                    </Link>
                </li>
            </ul>
        </nav>
    )
}