import { Outlet } from 'react-router-dom'
import styled from 'styled-components'
import Navbar from './Navbar'

const StyledAppLayout = styled.div`
  position: relative;
  min-height: 100vh;
`

const Main = styled.main`
  background-color: var(--color-grey-50);
`

function AppLayout() {
  return (
    <StyledAppLayout>
      <Navbar />
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  )
}

export default AppLayout
