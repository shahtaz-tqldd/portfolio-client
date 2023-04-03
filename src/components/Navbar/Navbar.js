import React, { useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from '../../context/AuthProvider'
import { FiLogOut } from 'react-icons/fi'
import { toast } from 'react-hot-toast'

const Navbar = () => {
    const location = useLocation()
    const path = location?.pathname?.split('/')[1]
    const { user, logout } = useContext(AuthContext)
    const handleLogout = () => {
        logout()
            .then(() => { toast.success("You are logged out!") })
            .catch(err => console.error(err))
    }

    const navItems = [
        {
            icon: "https://cdn.lordicon.com/osuxyevn.json",
            link: "#home"
        },
        {
            icon: "https://cdn.lordicon.com/bhfjfgqz.json",
            link: "#about"
        },
        {
            icon: "https://cdn.lordicon.com/ofwpzftr.json",
            link: "#services"
        },
        {
            icon: "https://cdn.lordicon.com/svbmmyue.json",
            link: "#skills"
        },
        {
            icon: "https://cdn.lordicon.com/fpmskzsv.json",
            link: "#projects"
        },
        {
            icon: "https://cdn.lordicon.com/diihvcfp.json",
            link: "#contact"
        },
    ]

    for (let nav of navItems) {
        const scrollToSection = (e) => {
            e.preventDefault();
            const section = document.querySelector(`${nav?.link}`);
            section.scrollIntoView({ behavior: 'smooth' });
        };

        const link = document.querySelector(`a[href="${nav?.link}"]`);
        link?.addEventListener('click', scrollToSection);
    }

    return (
        <section className='flex flex-col gap-4 sticky top-16'>
            {((path === 'blogs') || (path === 'dashboard') || (path === 'projects') || (path === 'resource'))  &&
                <div className='px-3 py-2 border-[1px] border-accent rounded-full'>
                    <Link to='/' className='icon' data-title='Homepage'>
                        <lord-icon
                            src="https://cdn.lordicon.com/osuxyevn.json"
                            trigger="hover"
                            class="current-color"
                            style={{ width: "24px", height: "24px", paddingTop: "2px" }}>
                        </lord-icon>
                    </Link>
                </div>
            }
            {path === '' &&
                <div className='flex flex-col gap-3 py-6 px-3 border-[1px] border-accent rounded-full'>
                    {
                        navItems?.map(({ icon, link }, index) => <a key={index} href={link} className='icon' data-title={link?.split('#')[1]}>
                            <lord-icon
                                src={icon}
                                trigger="hover"
                                class="current-color"
                                style={{ width: "24px", height: "24px" }}>
                            </lord-icon>
                        </a>
                        )}
                </div>
            }
            {path === '' &&
                <div className='px-3 py-2 border-[1px] border-accent rounded-full'>
                    <a href='https://drive.google.com/file/d/1lV9dIwZU1Ede97Fao-GY1s3EjLPyjvO-/view?usp=share_link' target="_blank" rel="noreferrer" className='icon' data-title='Resume'>
                        <lord-icon
                            src="https://cdn.lordicon.com/winbdcbm.json"
                            trigger="hover"
                            class="current-color"
                            style={{ width: "24px", height: "24px", paddingTop: "2px" }}>
                        </lord-icon>
                    </a>
                </div>
            }

            {path === '' &&
                <div className='px-3 py-2 border-[1px] border-accent rounded-full'>
                    <Link to='/blogs' className='icon' data-title='Blogs'>
                        <lord-icon
                            src="https://cdn.lordicon.com/vufjamqa.json"
                            trigger="hover"
                            class="current-color"
                            style={{ width: "24px", height: "24px", paddingTop: "2px" }}>
                        </lord-icon>
                    </Link>
                </div>
            }
            {user &&
                <div className='flex flex-col gap-3 py-6 px-3 border-[1px] border-accent rounded-full'>
                    <Link to='/dashboard' className='icon' data-title='Dashboard'>
                        <lord-icon
                            src="https://cdn.lordicon.com/ynwbvguu.json"
                            trigger="hover"
                            class="current-color"
                            style={{ width: "24px", height: "24px", paddingTop: "2px" }}>
                        </lord-icon>
                    </Link>
                    <div data-title='Logout' >
                        <FiLogOut onClick={handleLogout} className='text-[24px] hover:text-error cursor-pointer' />
                    </div>

                </div>
            }
        </section>
    )
}

export default Navbar