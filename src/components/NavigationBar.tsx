import { NavLink } from 'react-router-dom';
import './NavigationBar.css';

const links = [
  { to: '/', label: 'Home' },
  { to: '/el', label: 'El' },
  { to: '/vand', label: 'Vand' },
  { to: '/braendstof', label: 'Brændstof' },
  { to: '/materialer', label: 'Materialer' },
  { to: '/affald', label: 'Affald' },
  { to: '/bygning', label: 'Bygning' },
  { to: '/oversigt', label: 'Oversigt' },
  { to: '/faktorer', label: 'Faktorer / Standard' },
];

export function NavigationBar() {
  return (
    <nav className="nav-bar">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          className={({ isActive }) =>
            isActive ? 'nav-item active' : 'nav-item'
          }
          end={link.to === '/'}
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );
}
