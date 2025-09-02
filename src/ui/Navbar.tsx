import styled from 'styled-components'
import ButtonIcon from './ButtonIcon'
import { HiOutlineSun } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'

const Nav = styled.nav`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);

  display: flex;
  align-items: center;
  justify-content: space-between;
`

const BrandLogo = styled(NavLink)`
  font-weight: bold;
  font-size: 1.8rem;
`

const StyledNavbarMenu = styled.ul`
  display: flex;
  gap: 1.2rem;
`

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    color: var(--color-grey-600);
    font-size: 1.8rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-brand-600);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }
`

function Navbar() {
  return (
    <Nav>
      <BrandLogo to="/">Lalajo Trip</BrandLogo>
      <StyledNavbarMenu>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/travel-list">Trip</StyledNavLink>
        <ButtonIcon>
          <HiOutlineSun />
        </ButtonIcon>
      </StyledNavbarMenu>
    </Nav>
  )
}

export default Navbar
