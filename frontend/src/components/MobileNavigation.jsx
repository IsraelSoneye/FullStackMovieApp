import { NavLink } from "react-router-dom";
import { MobileNav } from "./navigation";

const MobileNavigation = () => {
    return ( 
        <section className="lg:hidden h-15 bg-purple-900 bg-opacity-75 w-full fixed bottom-0">
            <div className="flex items-center justify-between px-4 h-full ">
                {MobileNav.map((nav, index) => {
                    return (
                        <NavLink key={nav.label+'MobileNav'} to={nav.href} className={({IsActive})=> `items-center text-neutral-200 flex flex-col hover:text-neutral-400 ${IsActive && `text-neutral-50`}`}>
                            <div className="text-2xl">
                                {nav.Icon}
                            </div>
                            <p className="text-sm">{nav.label}</p>
                        </NavLink>
                    )
                })}
            </div>
        </section>
     );
}
 
export default MobileNavigation;