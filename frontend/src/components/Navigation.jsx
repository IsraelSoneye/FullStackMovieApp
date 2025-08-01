import { IoIosHome } from "react-icons/io";
import { PiTelevisionFill } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";

export const navigations = [
        {
            label: 'TV Shows',
            href: 'tv',
            Icon: <PiTelevisionFill />
        },
        {
            label: 'Movies',
            href: 'movie',
            Icon: <BiSolidMoviePlay />
        }
    ]

export const MobileNav = [
    {
        label: "Home",
        href: "/",
        Icon: <IoIosHome/>
    },
    ...navigations,
    {
        label: "Search",
        href: "/search",
        Icon: <FaSearch />
    }
]